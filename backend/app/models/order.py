from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class OrderCreate(BaseModel):
    address_id: str
    items: list[dict]  # [{product_id, quantity}]


class OrderUpdate(BaseModel):
    status: Optional[str] = None
    payment_status: Optional[str] = None


class OrderItemResponse(BaseModel):
    id: str
    product_id: str
    quantity: int
    price: float
    product: Optional[dict] = None


class OrderResponse(BaseModel):
    id: str
    user_id: str
    address_id: Optional[str] = None
    total_amount: float
    status: str
    payment_method: str = "UPI"
    payment_status: str
    transaction_id: Optional[str] = None
    payment_proof_url: Optional[str] = None
    items: list[OrderItemResponse] = []
    created_at: datetime
    updated_at: datetime


class AddressCreate(BaseModel):
    full_name: str
    phone: str
    address_line: str
    city: str
    state: Optional[str] = None
    pincode: str
    is_default: bool = False


class AddressResponse(AddressCreate):
    id: str
    user_id: str
    created_at: datetime
