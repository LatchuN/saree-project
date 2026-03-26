from fastapi import APIRouter, Depends
from app.database import get_supabase
from app.middleware.auth import require_admin

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/dashboard")
async def get_dashboard(user=Depends(require_admin)):
    db = get_supabase()

    products = db.table("products").select("id", count="exact").execute()
    orders = db.table("orders").select("id, total_amount, status", count="exact").execute()
    users = db.table("profiles").select("id", count="exact").execute()

    total_revenue = sum(o["total_amount"] for o in orders.data if o.get("total_amount")) if orders.data else 0

    status_counts = {}
    for o in (orders.data or []):
        s = o.get("status", "unknown")
        status_counts[s] = status_counts.get(s, 0) + 1

    recent_orders = (
        db.table("orders")
        .select("*, profiles(full_name, email)")
        .order("created_at", desc=True)
        .limit(10)
        .execute()
    )

    return {
        "data": {
            "total_products": products.count or 0,
            "total_orders": orders.count or 0,
            "total_users": users.count or 0,
            "total_revenue": total_revenue,
            "order_status_counts": status_counts,
            "recent_orders": recent_orders.data,
        }
    }


@router.get("/orders")
async def admin_list_orders(user=Depends(require_admin)):
    db = get_supabase()
    result = (
        db.table("orders")
        .select("*, profiles(full_name, email), order_items(*, products(name))")
        .order("created_at", desc=True)
        .execute()
    )
    return {"data": result.data}


@router.put("/orders/{order_id}")
async def admin_update_order(order_id: str, status: str = None, payment_status: str = None, user=Depends(require_admin)):
    db = get_supabase()
    data = {}
    if status:
        data["status"] = status
    if payment_status:
        data["payment_status"] = payment_status

    result = db.table("orders").update(data).eq("id", order_id).execute()
    return {"data": result.data[0], "message": "Order updated"}


@router.get("/users")
async def admin_list_users(user=Depends(require_admin)):
    db = get_supabase()
    result = db.table("profiles").select("*").order("created_at", desc=True).execute()
    return {"data": result.data}
