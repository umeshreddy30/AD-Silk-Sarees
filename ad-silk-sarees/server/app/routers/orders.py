from uuid import uuid4

import razorpay
from fastapi import APIRouter, Depends

from app.config import settings
from app.database import db, memory_orders, normalize_document
from app.models.order import Order
from app.security import require_admin, require_auth

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.get("")
async def get_orders(payload: dict = Depends(require_auth)):
    email = payload["sub"]
    if db is not None:
        docs = await db.orders.find({"customer_email": email}).to_list(length=100)
        return {"items": [normalize_document(doc) for doc in docs], "count": len(docs)}
    customer_orders = [order for order in memory_orders if order["customer_email"] == email]
    return {"items": customer_orders, "count": len(customer_orders)}


@router.get("/all")
async def get_all_orders(_: dict = Depends(require_admin)):
    if db is not None:
        docs = await db.orders.find({}).to_list(length=200)
        return {"items": [normalize_document(doc) for doc in docs], "count": len(docs)}
    return {"items": memory_orders, "count": len(memory_orders)}


@router.post("", response_model=Order)
async def create_order(payload: Order, auth_payload: dict = Depends(require_auth)):
    payload.id = str(uuid4())
    payload.customer_email = auth_payload["sub"]
    if db is not None:
        doc = payload.model_dump(exclude={"id"})
        result = await db.orders.insert_one(doc)
        payload.id = str(result.inserted_id)
        return payload
    memory_orders.append(payload.model_dump())
    return payload


@router.post("/razorpay/order")
async def create_razorpay_order(amount: int, receipt: str, _: dict = Depends(require_auth)):
    if not (settings.razorpay_key_id and settings.razorpay_key_secret):
        return {"message": "Add Razorpay keys in .env", "amount": amount, "receipt": receipt}
    client = razorpay.Client(auth=(settings.razorpay_key_id, settings.razorpay_key_secret))
    order = client.order.create({"amount": amount, "currency": "INR", "receipt": receipt})
    return order
