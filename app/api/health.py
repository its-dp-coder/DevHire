from fastapi import APIRouter

from app.core.redis import redis_client


router = APIRouter(
    prefix="/health",
    tags=["Health"],
)


@router.get("/redis")
def redis_health_check():
    try:
        redis_client.ping()

        return {
            "status": "ok",
            "redis": "connected",
        }

    except Exception:
        return {
            "status": "error",
            "redis": "disconnected",
        }