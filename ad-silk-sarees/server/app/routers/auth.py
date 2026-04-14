from bson import ObjectId
from fastapi import APIRouter, HTTPException, status

from app.config import settings
from app.database import db, memory_users, normalize_document
from app.models.user import UserLogin, UserPublic, UserRegister
from app.security import create_token, hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=UserPublic)
async def register(payload: UserRegister):
    email = payload.email.lower()
    existing = None

    if db is not None:
        existing = await db.users.find_one({"email": email})
    else:
        existing = next((user for user in memory_users if user["email"] == email), None)

    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

    user_doc = {
        "name": payload.name,
        "email": email,
        "password_hash": hash_password(payload.password),
        "role": "customer",
    }
    if db is not None:
        result = await db.users.insert_one(user_doc)
        user_doc["id"] = str(result.inserted_id)
    else:
        user_doc["id"] = str(ObjectId())
        memory_users.append(user_doc)

    return UserPublic(id=user_doc["id"], name=user_doc["name"], email=user_doc["email"], role="customer")


@router.post("/login")
async def login(payload: UserLogin):
    email = payload.email.lower()
    if db is not None:
        user = await db.users.find_one({"email": email})
        user = normalize_document(user) if user else None
    else:
        user = next((item for item in memory_users if item["email"] == email), None)

    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    role = user.get("role", "customer")
    access_token = create_token(email, role, settings.access_token_minutes)
    refresh_token = create_token(email, role, settings.refresh_token_minutes)
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {"id": user.get("id"), "name": user.get("name"), "email": email, "role": role},
    }
