from fastapi import APIRouter, Depends, HTTPException

from app.database import db, memory_orders, normalize_document, object_id_or_none
from app.security import require_admin

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/analytics")
async def analytics(_: dict = Depends(require_admin)):
    if db is not None:
        docs = await db.orders.find({}).to_list(length=200)
        revenue = sum(doc.get("total", 0) for doc in docs)
        return {"orders": len(docs), "revenue": revenue, "period": "30 days"}
    revenue = sum(order["total"] for order in memory_orders)
    return {"orders": len(memory_orders), "revenue": revenue, "period": "30 days"}


@router.put("/orders/{order_id}")
async def update_order_status(order_id: str, status: str, _: dict = Depends(require_admin)):
    if db is not None:
        object_id = object_id_or_none(order_id)
        if not object_id:
            raise HTTPException(status_code=404, detail="Order not found")
        result = await db.orders.update_one({"_id": object_id}, {"$set": {"order_status": status}})
        if not result.matched_count:
            raise HTTPException(status_code=404, detail="Order not found")
        updated = await db.orders.find_one({"_id": object_id})
        return {"message": "Order updated", "order": normalize_document(updated)}

    for order in memory_orders:
        if order["id"] == order_id:
            order["order_status"] = status
            return {"message": "Order updated", "order": order}
    raise HTTPException(status_code=404, detail="Order not found")
