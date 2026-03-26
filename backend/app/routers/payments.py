from fastapi import APIRouter, Depends, HTTPException
from app.database import get_supabase
from app.middleware.auth import get_current_user, require_admin
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/payments", tags=["Payments"])


class VerifyPaymentRequest(BaseModel):
    order_id: str
    status: str  # "verified" or "rejected"
    admin_note: Optional[str] = None


@router.post("/verify")
async def verify_payment(req: VerifyPaymentRequest, user=Depends(require_admin)):
    """Admin verifies or rejects a UPI payment."""
    db = get_supabase()

    if req.status not in ("verified", "rejected"):
        raise HTTPException(status_code=400, detail="Status must be 'verified' or 'rejected'")

    update_data = {"payment_status": req.status}

    if req.status == "verified":
        update_data["status"] = "confirmed"
    elif req.status == "rejected":
        update_data["status"] = "cancelled"

    result = (
        db.table("orders")
        .update(update_data)
        .eq("id", req.order_id)
        .execute()
    )

    if not result.data:
        raise HTTPException(status_code=404, detail="Order not found")

    return {"data": result.data[0], "message": f"Payment {req.status} successfully"}


@router.get("/pending")
async def get_pending_payments(user=Depends(require_admin)):
    """Get all orders with pending payment verification."""
    db = get_supabase()
    result = (
        db.table("orders")
        .select("*, profiles(full_name, email), order_items(*, products(name))")
        .eq("payment_status", "pending_verification")
        .order("created_at", desc=True)
        .execute()
    )
    return {"data": result.data}
