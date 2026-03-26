from fastapi import APIRouter, Depends, HTTPException
from app.database import get_supabase
from app.middleware.auth import require_admin

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.get("")
async def list_categories():
    db = get_supabase()
    result = db.table("categories").select("*").order("name").execute()
    return {"data": result.data}


@router.get("/{category_slug}")
async def get_category(category_slug: str):
    db = get_supabase()
    result = db.table("categories").select("*").eq("slug", category_slug).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"data": result.data}


@router.post("")
async def create_category(
    name: str, slug: str, description: str = None, image_url: str = None,
    user=Depends(require_admin)
):
    db = get_supabase()
    data = {"name": name, "slug": slug, "description": description, "image_url": image_url}
    result = db.table("categories").insert(data).execute()
    return {"data": result.data[0], "message": "Category created"}
