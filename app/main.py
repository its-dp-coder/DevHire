from fastapi import FastAPI

from app.api.auth import router as auth_router
from app.api.company import router as company_router
from app.core.config import settings


app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
)


app.include_router(auth_router)
app.include_router(company_router)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": settings.app_name,
    }