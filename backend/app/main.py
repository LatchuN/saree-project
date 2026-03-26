from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.routers import products, categories, cart, wishlist, orders, payments, reviews, auth, admin, upload

settings = get_settings()


def create_app() -> FastAPI:
    app = FastAPI(
        title="Silk Saree Store API",
        description="Backend API for the Silk Saree e-commerce store",
        version="1.0.0",
    )

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[settings.frontend_url, "http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include routers — all prefixed with /api
    app.include_router(auth.router, prefix="/api")
    app.include_router(products.router, prefix="/api")
    app.include_router(categories.router, prefix="/api")
    app.include_router(cart.router, prefix="/api")
    app.include_router(wishlist.router, prefix="/api")
    app.include_router(orders.router, prefix="/api")
    app.include_router(payments.router, prefix="/api")
    app.include_router(reviews.router, prefix="/api")
    app.include_router(admin.router, prefix="/api")
    app.include_router(upload.router, prefix="/api")

    @app.get("/api/health")
    async def health_check():
        return {"status": "healthy", "service": "Silk Saree Store API"}

    return app


app = create_app()
