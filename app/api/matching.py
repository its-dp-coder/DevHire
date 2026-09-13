from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.db.database import get_db
from app.models.candidate_profile import CandidateProfile
from app.models.job import Job
from app.models.user import User
from app.schemas.matching import MatchingResponse, RankedJobResponse
from app.services.matching_service import (
    calculate_match_score,
    get_matching_skills,
    rank_jobs_for_candidate,
)


router = APIRouter(
    prefix="/matching",
    tags=["AI Matching"],
)


@router.get(
    "/jobs/{job_id}",
    response_model=MatchingResponse,
)
def match_candidate_with_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    profile = (
        db.query(CandidateProfile)
        .filter(CandidateProfile.user_id == current_user.id)
        .first()
    )

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate profile not found",
        )

    job = (
        db.query(Job)
        .filter(Job.id == job_id, Job.is_active.is_(True))
        .first()
    )

    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Active job not found",
        )

    candidate_skills = profile.skills or ""

    return {
        "match_score": calculate_match_score(
            candidate_skills,
            job.required_skills,
        ),
        "matching_skills": get_matching_skills(
            candidate_skills,
            job.required_skills,
        ),
    }


@router.get(
    "/jobs",
    response_model=list[RankedJobResponse],
)
def rank_jobs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    profile = (
        db.query(CandidateProfile)
        .filter(CandidateProfile.user_id == current_user.id)
        .first()
    )

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate profile not found",
        )

    jobs = (
        db.query(Job)
        .filter(Job.is_active.is_(True))
        .order_by(Job.created_at.desc())
        .all()
    )

    return rank_jobs_for_candidate(
        profile.skills or "",
        jobs,
    )