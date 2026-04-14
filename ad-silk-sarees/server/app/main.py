from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import db
from app.routers import admin, auth, orders, products, upload
from app.security import hash_password
from app.services.product_service import seeded_products

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix=settings.api_prefix)
app.include_router(orders.router, prefix=settings.api_prefix)
app.include_router(auth.router, prefix=settings.api_prefix)
app.include_router(upload.router, prefix=settings.api_prefix)
app.include_router(admin.router, prefix=settings.api_prefix)


@app.on_event("startup")
async def bootstrap_data():
    if db is None:
        return

    product_count = await db.products.count_documents({})
    if product_count == 0:
        await db.products.insert_many([item.model_dump() for item in seeded_products()])

    admin = await db.users.find_one({"email": settings.admin_email.lower()})
    if not admin:
        await db.users.insert_one(
            {
                "name": "Admin",
                "email": settings.admin_email.lower(),
                "password_hash": hash_password(settings.admin_password),
                "role": "admin",
            }
        )


@app.get("/")
async def health():
    return {"status": "ok", "service": settings.app_name}
