from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class OrderItem(BaseModel):
    sku: str
    name: str
    quantity: int
    price: float


class Order(BaseModel):
    id: Optional[str] = None
    customer_email: str = "guest@adsilk.in"
    items: List[OrderItem]
    total: float
    shipping_address: dict
    payment_method: str = "razorpay"
    payment_status: str = "pending"
    order_status: str = "placed"
    created_at: datetime = Field(default_factory=datetime.utcnow)
