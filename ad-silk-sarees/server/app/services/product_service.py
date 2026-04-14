from typing import List

from app.models.product import (
    CraftDetails,
    Product,
    ProductImage,
    SilkAuthenticity,
    SilkType,
    WeaveType,
)


def seeded_products() -> List[Product]:
    return [
        Product(
            sku="ADS-KCH-001",
            name="Kanchipuram Bridal Grand",
            slug="kanchipuram-bridal-grand",
            short_description="Temple border bridal pure silk saree.",
            long_description="A grand Kanchipuram silk with rich zari border inspired by temple architecture.",
            silk_type=SilkType.KANCHIPURAM,
            category="Bridal",
            tags=["bridal", "zari", "handwoven"],
            craft_details=CraftDetails(weave_type=WeaveType.KORVAI, loom_type="Pit Loom", motif_name="Temple Border"),
            color_primary="Maroon",
            authenticity=SilkAuthenticity(silk_mark_certified=True, gi_tag_certified=True, silk_mark_id="SM-2026-KCH-001"),
            price=28999,
            original_price=32999,
            discount_percent=12,
            images=[ProductImage(url="https://images.unsplash.com/photo-1610030469668-06a8f01c4e4d?auto=format&fit=crop&w=900&q=80", alt="Kanchipuram bridal silk", is_primary=True)],
            stock_quantity=3,
        ),
        Product(
            sku="ADS-BNR-002",
            name="Banarasi Crimson Brocade",
            slug="banarasi-crimson-brocade",
            short_description="Royal Banarasi brocade with floral jangla.",
            long_description="Banarasi handloom saree in crimson with classic brocade pallu and floral motifs.",
            silk_type=SilkType.BANARASI,
            category="Festive",
            tags=["festive", "banarasi", "brocade"],
            craft_details=CraftDetails(weave_type=WeaveType.BROCADE, loom_type="Frame Loom", motif_name="Floral Jangla"),
            color_primary="Crimson",
            authenticity=SilkAuthenticity(silk_mark_certified=True, gi_tag_certified=False),
            price=22499,
            images=[ProductImage(url="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80", alt="Banarasi brocade saree", is_primary=True)],
            stock_quantity=4,
        ),
    ]
