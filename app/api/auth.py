from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.user import (
    LoginRequest,
    Token,
    UserCreate,
    UserResponse,
)
from app.services.auth_service import (
    authenticate_user,
    generate_access_token,
    register_user,
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user_data: UserCreate,
    db: Session = Depends(get_db),
):
    return register_user(
        db,
        user_data,
    )


@router.post(
    "/login",
    response_model=Token,
)
def login(
    user_data: LoginRequest,
    db: Session = Depends(get_db),
):
    user = authenticate_user(
        db,
        user_data.email,
        user_data.password,
    )

    access_token = generate_access_token(user)

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }