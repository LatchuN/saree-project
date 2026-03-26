from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float = Field(gt=0)
    compare_price: Optional[float] = None
    category_id: Optional[str] = None
    images: list[str] = []
    stock_quantity: int = Field(ge=0, default=0)
    is_featured: bool = False
    is_active: bool = True
    metadata: dict = {}


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    compare_price: Optional[float] = None
    category_id: Optional[str] = None
    images: Optional[list[str]] = None
    stock_quantity: Optional[int] = None
    is_featured: Optional[bool] = None
    is_active: Optional[bool] = None
    metadata: Optional[dict] = None


class ProductResponse(ProductBase):
    id: str
    slug: str
    avg_rating: Optional[float] = 0
    review_count: Optional[int] = 0
    category_name: Optional[str] = None
    category_slug: Optional[str] = None
    created_at: datetime
    updated_at: datetime
