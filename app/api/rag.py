from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.db.database import get_db
from app.models.user import User
from app.schemas.rag import RAGQueryRequest, RAGQueryResponse
from app.services.rag_service import generate_rag_response


router = APIRouter(
    prefix="/ai",
    tags=["AI Recruitment Assistant"],
)


@router.post(
    "/ask",
    response_model=RAGQueryResponse,
)
def ask_recruitment_assistant(
    request: RAGQueryRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    answer, sources = generate_rag_response(
        db,
        request.query,
    )

    return {
        "answer": answer,
        "sources": sources,
    }