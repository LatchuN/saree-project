from fastapi import APIRouter, Depends, HTTPException, Query
from app.database import get_supabase
from app.middleware.auth import require_admin
from app.models.product import ProductCreate, ProductUpdate
from typing import Optional
import re

router = APIRouter(prefix="/products", tags=["Products"])


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return text.strip("-")


@router.get("")
async def list_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    sort_by: Optional[str] = "newest",
    featured: Optional[bool] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=50),
):
    db = get_supabase()
    offset = (page - 1) * limit

    # Use the view with ratings
    query = db.table("products_with_ratings").select("*")
    query = query.eq("is_active", True)

    if category:
        query = query.eq("category_slug", category)
    if search:
        query = query.ilike("name", f"%{search}%")
    if min_price is not None:
        query = query.gte("price", min_price)
    if max_price is not None:
        query = query.lte("price", max_price)
    if featured is not None:
        query = query.eq("is_featured", featured)

    # Sorting
    if sort_by == "price_asc":
        query = query.order("price", desc=False)
    elif sort_by == "price_desc":
        query = query.order("price", desc=True)
    elif sort_by == "rating":
        query = query.order("avg_rating", desc=True)
    else:
        query = query.order("created_at", desc=True)

    # Get total count
    count_query = db.table("products").select("id", count="exact").eq("is_active", True)
    if category:
        # Join with categories to filter by slug
        count_query = count_query.eq("category_id",
            db.table("categories").select("id").eq("slug", category).execute().data[0]["id"]
            if db.table("categories").select("id").eq("slug", category).execute().data else ""
        )
    count_result = count_query.execute()
    total = count_result.count or 0

    # Paginate
    query = query.range(offset, offset + limit - 1)
    result = query.execute()

    return {
        "data": result.data,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": (total + limit - 1) // limit if total > 0 else 0,
    }


@router.get("/{product_id}")
async def get_product(product_id: str):
    db = get_supabase()

    # Try by id first, then by slug
    result = db.table("products_with_ratings").select("*").eq("id", product_id).execute()
    if not result.data:
        result = db.table("products_with_ratings").select("*").eq("slug", product_id).execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Product not found")

    return {"data": result.data[0]}


@router.post("")
async def create_product(product: ProductCreate, user=Depends(require_admin)):
    db = get_supabase()
    slug = slugify(product.name)

    # Check slug uniqueness
    existing = db.table("products").select("id").eq("slug", slug).execute()
    if existing.data:
        slug = f"{slug}-{len(existing.data) + 1}"

    data = product.model_dump()
    data["slug"] = slug

    result = db.table("products").insert(data).execute()
    return {"data": result.data[0], "message": "Product created successfully"}


@router.put("/{product_id}")
async def update_product(product_id: str, product: ProductUpdate, user=Depends(require_admin)):
    db = get_supabase()
    data = {k: v for k, v in product.model_dump().items() if v is not None}

    if not data:
        raise HTTPException(status_code=400, detail="No fields to update")

    if "name" in data:
        data["slug"] = slugify(data["name"])

    result = db.table("products").update(data).eq("id", product_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Product not found")

    return {"data": result.data[0], "message": "Product updated successfully"}


@router.delete("/{product_id}")
async def delete_product(product_id: str, user=Depends(require_admin)):
    db = get_supabase()
    result = db.table("products").delete().eq("id", product_id).execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Product not found")

    return {"message": "Product deleted successfully"}
