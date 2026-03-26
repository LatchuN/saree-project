from fastapi import APIRouter, Depends, HTTPException
from app.database import get_supabase
from app.middleware.auth import get_current_user

router = APIRouter(prefix="/wishlist", tags=["Wishlist"])


@router.get("")
async def get_wishlist(user=Depends(get_current_user)):
    db = get_supabase()
    result = (
        db.table("wishlist")
        .select("*, products(*)")
        .eq("user_id", user["id"])
        .order("created_at", desc=True)
        .execute()
    )
    return {"data": result.data}


@router.post("")
async def add_to_wishlist(product_id: str, user=Depends(get_current_user)):
    db = get_supabase()

    existing = (
        db.table("wishlist")
        .select("*")
        .eq("user_id", user["id"])
        .eq("product_id", product_id)
        .execute()
    )

    if existing.data:
        return {"data": existing.data[0], "message": "Already in wishlist"}

    result = (
        db.table("wishlist")
        .insert({"user_id": user["id"], "product_id": product_id})
        .execute()
    )
    return {"data": result.data[0], "message": "Added to wishlist"}


@router.delete("/{item_id}")
async def remove_from_wishlist(item_id: str, user=Depends(get_current_user)):
    db = get_supabase()
    db.table("wishlist").delete().eq("id", item_id).eq("user_id", user["id"]).execute()
    return {"message": "Removed from wishlist"}
