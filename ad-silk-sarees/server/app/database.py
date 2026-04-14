from typing import Any, Optional

from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient

from app.config import settings
from app.models.order import Order
from app.models.product import Product
from app.services.product_service import seeded_products
from app.security import hash_password

mongo_uri = settings.mongo_uri.strip()
use_mongo = bool(mongo_uri) and not mongo_uri.startswith("your_")
client = AsyncIOMotorClient(mongo_uri) if use_mongo else None
db = client[settings.mongo_db_name] if client else None

memory_products: list[dict[str, Any]] = [
    {**product.model_dump(), "id": str(ObjectId())} for product in seeded_products()
]
memory_orders: list[dict[str, Any]] = []
memory_users: list[dict[str, Any]] = [
    {
        "id": str(ObjectId()),
        "name": "Admin",
        "email": settings.admin_email.lower(),
        "password_hash": hash_password(settings.admin_password),
        "role": "admin",
    }
]


def object_id_or_none(value: str) -> Optional[ObjectId]:
    if ObjectId.is_valid(value):
        return ObjectId(value)
    return None


def normalize_document(document: dict[str, Any]) -> dict[str, Any]:
    if not document:
        return document
    normalized = dict(document)
    raw_id = normalized.pop("_id", None)
    if raw_id is not None:
        normalized["id"] = str(raw_id)
    return normalized
