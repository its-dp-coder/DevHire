from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.application import router as application_router
from app.api.auth import router as auth_router
from app.api.candidate_profile import router as candidate_profile_router
from app.api.company import router as company_router
from app.api.health import router as health_router
from app.api.job import router as job_router
from app.api.matching import router as matching_router
from app.api.rag import router as rag_router
from app.api.resume import router as resume_router
from app.core.config import settings


app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
)


app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(company_router)
app.include_router(job_router)
app.include_router(application_router)
app.include_router(candidate_profile_router)
app.include_router(resume_router)
app.include_router(matching_router)
app.include_router(rag_router)
app.include_router(health_router)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": settings.app_name,
    }