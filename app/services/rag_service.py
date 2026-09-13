from sqlalchemy.orm import Session

from app.models.candidate_profile import CandidateProfile
from app.models.job import Job


def retrieve_context(
    db: Session,
    query: str,
) -> list[str]:
    query_lower = query.lower()

    contexts = []

    jobs = db.query(Job).filter(Job.is_active.is_(True)).all()

    for job in jobs:
        searchable_text = " ".join(
            [
                job.title or "",
                job.description or "",
                job.required_skills or "",
                job.location or "",
                job.employment_type or "",
                job.experience_level or "",
            ]
        ).lower()

        if any(
            keyword in searchable_text
            for keyword in query_lower.split()
        ):
            contexts.append(
                f"Job: {job.title}. "
                f"Required skills: {job.required_skills}. "
                f"Location: {job.location}. "
                f"Experience: {job.experience_level}."
            )

    profiles = db.query(CandidateProfile).all()

    for profile in profiles:
        searchable_text = " ".join(
            [
                profile.headline or "",
                profile.bio or "",
                profile.skills or "",
                profile.education or "",
                profile.location or "",
            ]
        ).lower()

        if any(
            keyword in searchable_text
            for keyword in query_lower.split()
        ):
            contexts.append(
                f"Candidate: {profile.headline}. "
                f"Skills: {profile.skills}. "
                f"Experience: {profile.experience_years} years. "
                f"Education: {profile.education}."
            )

    return contexts[:10]


def generate_rag_response(
    db: Session,
    query: str,
) -> tuple[str, list[str]]:
    contexts = retrieve_context(db, query)

    if not contexts:
        return (
            "I could not find relevant information in the hiring data.",
            [],
        )

    answer = (
        "Based on the available hiring data:\n\n"
        + "\n".join(
            f"- {context}"
            for context in contexts
        )
    )

    return answer, contexts