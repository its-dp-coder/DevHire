import re


def normalize_skills(skills: str) -> set[str]:
    return {
        skill.strip().lower()
        for skill in re.split(r"[,;\n]", skills)
        if skill.strip()
    }


def calculate_match_score(
    candidate_skills: str,
    required_skills: str,
) -> float:
    candidate = normalize_skills(candidate_skills)
    required = normalize_skills(required_skills)

    if not required:
        return 0.0

    matched_skills = candidate.intersection(required)

    return round(
        (len(matched_skills) / len(required)) * 100,
        2,
    )


def get_matching_skills(
    candidate_skills: str,
    required_skills: str,
) -> list[str]:
    candidate = normalize_skills(candidate_skills)
    required = normalize_skills(required_skills)

    return sorted(
        candidate.intersection(required)
    )


def rank_jobs_for_candidate(
    candidate_skills: str,
    jobs: list,
) -> list[dict]:
    ranked_jobs = []

    for job in jobs:
        score = calculate_match_score(
            candidate_skills,
            job.required_skills,
        )

        matching_skills = get_matching_skills(
            candidate_skills,
            job.required_skills,
        )

        ranked_jobs.append(
            {
                "job_id": job.id,
                "title": job.title,
                "company_id": job.company_id,
                "match_score": score,
                "matching_skills": matching_skills,
            }
        )

    return sorted(
        ranked_jobs,
        key=lambda item: item["match_score"],
        reverse=True,
    )