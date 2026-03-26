from fastapi import APIRouter, Depends, HTTPException
from app.database import get_supabase
from app.middleware.auth import get_current_user
from app.models.review import ReviewCreate, ReviewUpdate

router = APIRouter(prefix="/reviews", tags=["Reviews"])


@router.get("/product/{product_id}")
async def get_product_reviews(product_id: str):
    db = get_supabase()
    result = (
        db.table("reviews")
        .select("*, profiles(full_name, avatar_url)")
        .eq("product_id", product_id)
        .order("created_at", desc=True)
        .execute()
    )

    # Flatten user data
    reviews = []
    for r in result.data:
        review = {**r}
        if r.get("profiles"):
            review["user_name"] = r["profiles"].get("full_name", "Anonymous")
            review["user_avatar"] = r["profiles"].get("avatar_url")
        del review["profiles"]
        reviews.append(review)

    return {"data": reviews}


@router.post("")
async def create_review(review: ReviewCreate, user=Depends(get_current_user)):
    db = get_supabase()

    # Check for existing review (upsert)
    existing = (
        db.table("reviews")
        .select("id")
        .eq("user_id", user["id"])
        .eq("product_id", review.product_id)
        .execute()
    )

    data = review.model_dump()
    data["user_id"] = user["id"]

    if existing.data:
        result = (
            db.table("reviews")
            .update({"rating": review.rating, "comment": review.comment})
            .eq("id", existing.data[0]["id"])
            .execute()
        )
        return {"data": result.data[0], "message": "Review updated"}
    else:
        result = db.table("reviews").insert(data).execute()
        return {"data": result.data[0], "message": "Review created"}


@router.put("/{review_id}")
async def update_review(review_id: str, review: ReviewUpdate, user=Depends(get_current_user)):
    db = get_supabase()
    data = {k: v for k, v in review.model_dump().items() if v is not None}

    result = (
        db.table("reviews")
        .update(data)
        .eq("id", review_id)
        .eq("user_id", user["id"])
        .execute()
    )

    if not result.data:
        raise HTTPException(status_code=404, detail="Review not found")
    return {"data": result.data[0], "message": "Review updated"}


@router.delete("/{review_id}")
async def delete_review(review_id: str, user=Depends(get_current_user)):
    db = get_supabase()
    result = db.table("reviews").delete().eq("id", review_id).eq("user_id", user["id"]).execute()
    return {"message": "Review deleted"}
