from fastapi import APIRouter, Depends, HTTPException
from app.database import get_supabase
from app.middleware.auth import get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.get("/me")
async def get_me(user=Depends(get_current_user)):
    db = get_supabase()
    profile = db.table("profiles").select("*").eq("id", user["id"]).single().execute()
    if not profile.data:
        raise HTTPException(status_code=404, detail="Profile not found")
    return {"data": profile.data}


@router.put("/profile")
async def update_profile(full_name: str = None, phone: str = None, user=Depends(get_current_user)):
    db = get_supabase()
    data = {}
    if full_name is not None:
        data["full_name"] = full_name
    if phone is not None:
        data["phone"] = phone

    if not data:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = db.table("profiles").update(data).eq("id", user["id"]).execute()
    return {"data": result.data[0], "message": "Profile updated"}
