from fastapi import APIRouter, Depends, HTTPException
from app.database import get_supabase
from app.middleware.auth import get_current_user

router = APIRouter(prefix="/cart", tags=["Cart"])


@router.get("")
async def get_cart(user=Depends(get_current_user)):
    db = get_supabase()
    result = (
        db.table("cart_items")
        .select("*, products(*)")
        .eq("user_id", user["id"])
        .order("created_at", desc=True)
        .execute()
    )
    return {"data": result.data}


@router.post("")
async def add_to_cart(product_id: str, quantity: int = 1, user=Depends(get_current_user)):
    db = get_supabase()

    # Check if item already in cart
    existing = (
        db.table("cart_items")
        .select("*")
        .eq("user_id", user["id"])
        .eq("product_id", product_id)
        .execute()
    )

    if existing.data:
        # Update quantity
        new_qty = existing.data[0]["quantity"] + quantity
        result = (
            db.table("cart_items")
            .update({"quantity": new_qty})
            .eq("id", existing.data[0]["id"])
            .execute()
        )
    else:
        result = (
            db.table("cart_items")
            .insert({"user_id": user["id"], "product_id": product_id, "quantity": quantity})
            .execute()
        )

    return {"data": result.data[0], "message": "Added to cart"}


@router.put("/{item_id}")
async def update_cart_item(item_id: str, quantity: int, user=Depends(get_current_user)):
    db = get_supabase()

    if quantity <= 0:
        db.table("cart_items").delete().eq("id", item_id).eq("user_id", user["id"]).execute()
        return {"message": "Item removed from cart"}

    result = (
        db.table("cart_items")
        .update({"quantity": quantity})
        .eq("id", item_id)
        .eq("user_id", user["id"])
        .execute()
    )

    if not result.data:
        raise HTTPException(status_code=404, detail="Cart item not found")

    return {"data": result.data[0], "message": "Cart updated"}


@router.delete("/{item_id}")
async def remove_from_cart(item_id: str, user=Depends(get_current_user)):
    db = get_supabase()
    result = (
        db.table("cart_items")
        .delete()
        .eq("id", item_id)
        .eq("user_id", user["id"])
        .execute()
    )
    return {"message": "Removed from cart"}
