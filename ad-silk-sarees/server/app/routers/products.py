from datetime import datetime
from typing import Optional
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, Query

from app.database import db, memory_products, normalize_document, object_id_or_none
from app.models.product import Product, ProductStatus
from app.security import require_admin

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("")
async def list_products(
    silk_type: Optional[str] = None,
    status: Optional[str] = Query(default=ProductStatus.ACTIVE.value),
    search: Optional[str] = None,
):
    if db is not None:
        query = {}
        if silk_type:
            query["silk_type"] = silk_type
        if status:
            query["status"] = status
        if search:
            query["$or"] = [
                {"name": {"$regex": search, "$options": "i"}},
                {"short_description": {"$regex": search, "$options": "i"}},
            ]
        documents = await db.products.find(query).to_list(length=100)
        return {"items": [normalize_document(doc) for doc in documents], "count": len(documents)}

    items = memory_products
    if silk_type:
        items = [p for p in items if p["silk_type"] == silk_type]
    if status:
        items = [p for p in items if p["status"] == status]
    if search:
        query = search.lower()
        items = [p for p in items if query in p["name"].lower() or query in p["short_description"].lower()]
    return {"items": items, "count": len(items)}


@router.get("/{slug}")
async def get_product(slug: str):
    if db is not None:
        product = await db.products.find_one({"slug": slug})
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return normalize_document(product)

    product = next((p for p in memory_products if p["slug"] == slug), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.post("", response_model=Product)
async def create_product(payload: Product, _: dict = Depends(require_admin)):
    payload.id = str(uuid4())
    payload.created_at = datetime.utcnow()
    payload.updated_at = payload.created_at
    if db is not None:
        doc = payload.model_dump(exclude={"id"})
        result = await db.products.insert_one(doc)
        payload.id = str(result.inserted_id)
        return payload
    memory_products.append(payload.model_dump())
    return payload


@router.put("/{product_id}", response_model=Product)
async def update_product(product_id: str, payload: Product, _: dict = Depends(require_admin)):
    payload.id = product_id
    payload.updated_at = datetime.utcnow()
    if db is not None:
        object_id = object_id_or_none(product_id)
        if not object_id:
            raise HTTPException(status_code=404, detail="Product not found")
        updated = await db.products.update_one({"_id": object_id}, {"$set": payload.model_dump(exclude={"id"})})
        if not updated.matched_count:
            raise HTTPException(status_code=404, detail="Product not found")
        return payload

    for idx, item in enumerate(memory_products):
        if item["id"] == product_id:
            memory_products[idx] = payload.model_dump()
            return payload
    raise HTTPException(status_code=404, detail="Product not found")


@router.delete("/{product_id}")
async def archive_product(product_id: str, _: dict = Depends(require_admin)):
    if db is not None:
        object_id = object_id_or_none(product_id)
        if not object_id:
            raise HTTPException(status_code=404, detail="Product not found")
        updated = await db.products.update_one(
            {"_id": object_id},
            {"$set": {"status": ProductStatus.ARCHIVED.value, "updated_at": datetime.utcnow()}},
        )
        if not updated.matched_count:
            raise HTTPException(status_code=404, detail="Product not found")
        return {"message": "Product archived"}

    for item in memory_products:
        if item["id"] == product_id:
            item["status"] = ProductStatus.ARCHIVED.value
            item["updated_at"] = datetime.utcnow()
            return {"message": "Product archived"}
    raise HTTPException(status_code=404, detail="Product not found")
