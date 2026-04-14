from datetime import datetime
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field


class SilkType(str, Enum):
    KANCHIPURAM = "Kanchipuram"
    BANARASI = "Banarasi"
    MYSORE = "Mysore Silk"
    PATOLA = "Patola"
    CHANDERI = "Chanderi"
    TUSSAR = "Tussar"


class WeaveType(str, Enum):
    KORVAI = "Korvai"
    KADHUA = "Kadhua"
    BROCADE = "Brocade"
    JAMDANI = "Jamdani"
    PLAIN_WEAVE = "Plain Weave"


class ProductStatus(str, Enum):
    ACTIVE = "active"
    SOLD_OUT = "sold_out"
    MADE_TO_ORDER = "made_to_order"
    ARCHIVED = "archived"


class SilkAuthenticity(BaseModel):
    silk_mark_certified: bool = False
    silk_mark_id: Optional[str] = None
    gi_tag_certified: bool = False
    handwoven: bool = True
    zari_type: str = "No Zari"


class CraftDetails(BaseModel):
    weave_type: WeaveType
    loom_type: str
    motif_name: Optional[str] = None
    motif_description: Optional[str] = None


class ProductImage(BaseModel):
    url: str
    alt: str
    is_primary: bool = False


class ProductDimensions(BaseModel):
    length_meters: float = 6.0
    width_inches: float = 44.0
    blouse_piece_included: bool = True
    blouse_piece_meters: float = 0.8


class Product(BaseModel):
    id: Optional[str] = None
    sku: str
    name: str
    slug: str
    short_description: str
    long_description: str
    silk_type: SilkType
    category: str
    tags: List[str] = Field(default_factory=list)
    craft_details: CraftDetails
    color_primary: str
    authenticity: SilkAuthenticity
    dimensions: ProductDimensions = Field(default_factory=ProductDimensions)
    price: float
    original_price: Optional[float] = None
    discount_percent: Optional[float] = None
    currency: str = "INR"
    images: List[ProductImage] = Field(default_factory=list)
    stock_quantity: int = 1
    status: ProductStatus = ProductStatus.ACTIVE
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
