from fastapi import APIRouter, Depends, HTTPException
from app.database import get_supabase
from app.middleware.auth import get_current_user
from app.models.order import OrderCreate, AddressCreate
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/orders", tags=["Orders"])


class CreateOrderRequest(BaseModel):
    address_id: str
    items: list[dict]  # [{product_id, quantity}]
    transaction_id: str
    payment_proof_url: Optional[str] = None


@router.get("")
async def list_orders(user=Depends(get_current_user)):
    db = get_supabase()
    result = (
        db.table("orders")
        .select("*, order_items(*, products(name, images, slug))")
        .eq("user_id", user["id"])
        .order("created_at", desc=True)
        .execute()
    )
    return {"data": result.data}


@router.get("/{order_id}")
async def get_order(order_id: str, user=Depends(get_current_user)):
    db = get_supabase()
    result = (
        db.table("orders")
        .select("*, order_items(*, products(name, images, slug, price)), addresses(*)")
        .eq("id", order_id)
        .eq("user_id", user["id"])
        .single()
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"data": result.data}


@router.post("")
async def create_order(order: CreateOrderRequest, user=Depends(get_current_user)):
    db = get_supabase()

    # Validate transaction ID
    if not order.transaction_id or len(order.transaction_id.strip()) < 6:
        raise HTTPException(status_code=400, detail="Valid transaction ID (UTR number) is required")

    # Calculate total from items
    total = 0
    order_items_data = []
    for item in order.items:
        product = db.table("products").select("price, stock_quantity").eq("id", item["product_id"]).single().execute()
        if not product.data:
            raise HTTPException(status_code=400, detail=f"Product {item['product_id']} not found")
        if product.data["stock_quantity"] < item["quantity"]:
            raise HTTPException(status_code=400, detail="Insufficient stock for product")

        price = product.data["price"]
        total += price * item["quantity"]
        order_items_data.append({
            "product_id": item["product_id"],
            "quantity": item["quantity"],
            "price": price,
        })

    # Create order with UPI payment details
    order_result = (
        db.table("orders")
        .insert({
            "user_id": user["id"],
            "address_id": order.address_id,
            "total_amount": total,
            "status": "pending",
            "payment_method": "UPI",
            "payment_status": "pending_verification",
            "transaction_id": order.transaction_id.strip(),
            "payment_proof_url": order.payment_proof_url,
        })
        .execute()
    )

    order_id = order_result.data[0]["id"]

    # Create order items
    for oi in order_items_data:
        oi["order_id"] = order_id
    db.table("order_items").insert(order_items_data).execute()

    # Update stock
    for item in order.items:
        product = db.table("products").select("stock_quantity").eq("id", item["product_id"]).single().execute()
        new_stock = product.data["stock_quantity"] - item["quantity"]
        db.table("products").update({"stock_quantity": new_stock}).eq("id", item["product_id"]).execute()

    # Clear cart
    db.table("cart_items").delete().eq("user_id", user["id"]).execute()

    return {"data": order_result.data[0], "message": "Order placed! Payment verification is pending."}


# --- Address endpoints ---

@router.get("/addresses/list")
async def list_addresses(user=Depends(get_current_user)):
    db = get_supabase()
    result = db.table("addresses").select("*").eq("user_id", user["id"]).order("is_default", desc=True).execute()
    return {"data": result.data}


@router.post("/addresses")
async def create_address(address: AddressCreate, user=Depends(get_current_user)):
    db = get_supabase()
    data = address.model_dump()
    data["user_id"] = user["id"]

    if data.get("is_default"):
        db.table("addresses").update({"is_default": False}).eq("user_id", user["id"]).execute()

    result = db.table("addresses").insert(data).execute()
    return {"data": result.data[0], "message": "Address added"}
