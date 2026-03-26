from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from app.database import get_supabase
from app.middleware.auth import require_admin
from app.config import get_settings
import uuid

router = APIRouter(prefix="/upload", tags=["Upload"])


@router.post("/image")
async def upload_image(file: UploadFile = File(...), user=Depends(require_admin)):
    db = get_supabase()
    settings = get_settings()

    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/webp", "image/avif"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid file type. Use JPEG, PNG, or WebP.")

    # Generate unique filename
    ext = file.filename.split(".")[-1] if file.filename else "jpg"
    filename = f"products/{uuid.uuid4()}.{ext}"

    # Read file content
    content = await file.read()

    # Upload to Supabase Storage
    result = db.storage.from_("product-images").upload(
        filename,
        content,
        {"content-type": file.content_type},
    )

    # Get public URL
    public_url = db.storage.from_("product-images").get_public_url(filename)

    return {"url": public_url}
