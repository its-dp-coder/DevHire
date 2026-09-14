import re

import os

from openai import OpenAI
from sqlalchemy.orm import Session

from app.models.candidate_profile import CandidateProfile
from app.models.job import Job


def _tokenize_query(query: str) -> list[str]:
    return re.findall(r"\b[a-zA-Z0-9+#.-]+\b", query.lower())


def retrieve_context(db: Session, query: str) -> list[str]:
    keywords = _tokenize_query(query)

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

        if any(keyword in searchable_text for keyword in keywords):
            contexts.append(
                f"Job: {job.title}. "
                f"Required skills: {job.required_skills}. "
                f"Location: {job.location}. "
                f"Experience: {job.experience_level}. "
                f"Description: {job.description}"
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

        if any(keyword in searchable_text for keyword in keywords):
            contexts.append(
                f"Candidate headline: {profile.headline}. "
                f"Skills: {profile.skills}. "
                f"Experience: {profile.experience_years} years. "
                f"Education: {profile.education}. "
                f"Location: {profile.location}. "
                f"Bio: {profile.bio}"
            )

    return contexts[:10]


def generate_rag_response(db: Session, query: str) -> tuple[str, list[str]]:
    contexts = retrieve_context(db, query)

    if not contexts:
        return (
            "I could not find relevant information in the hiring data.",
            [],
        )

    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        answer = (
            "Relevant hiring information:\n\n"
            + "\n".join(f"- {context}" for context in contexts)
        )

        return answer, contexts

    client = OpenAI(api_key=api_key)

    context_text = "\n\n".join(contexts)

    prompt = f"""
You are DevHire's AI Recruitment Assistant.

Answer the recruiter's question using ONLY the provided hiring data.

If the information is not available in the context, say that it is not available.

Do not invent candidates, jobs, skills, companies, or experience.

Hiring data:
{context_text}

Recruiter question:
{query}
"""

    response = client.responses.create(
        model="gpt-4.1-mini",
        input=prompt,
    )

    return response.output_text, contexts