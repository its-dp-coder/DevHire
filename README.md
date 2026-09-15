# DevHire 🚀

AI-Powered Developer Hiring Platform built for modern technical recruitment.

DevHire connects recruiters with developers through structured job posting, candidate applications, profile discovery, skill-based matching, and an AI-powered hiring assistant.

## 🌐 Live Demo

**Frontend:** https://dev-hire-xi.vercel.app/

**Backend API:** https://devhire-3nqt.onrender.com/

**API Documentation:** https://devhire-3nqt.onrender.com/docs

---

## 📌 Overview

DevHire is a full-stack hiring platform designed to demonstrate production-oriented backend engineering, AI integration, authentication, relational database design, background processing, testing, and cloud deployment.

The platform supports two primary roles:

- Candidate
- Recruiter

Candidates can create profiles, upload resumes, browse jobs, and apply.

Recruiters can create companies, publish jobs, review applications, view candidate profiles, and use AI-assisted hiring features.

---

## ✨ Features

### Authentication & Authorization

- JWT-based authentication
- Secure password hashing
- Role-based access control
- Candidate and recruiter authorization
- Protected API routes

### Candidate Features

- Candidate registration/login
- Developer profile creation
- Skills and experience management
- Resume upload
- Job browsing
- Job applications
- Profile view tracking

### Recruiter Features

- Recruiter registration/login
- Company management
- Job creation and management
- Application management
- Candidate profile discovery
- Candidate profile view tracking
- AI hiring assistant

### AI Features

- Candidate-job matching
- Skill-based relevance scoring
- Hiring data retrieval
- AI-generated recruitment responses
- Context-grounded AI responses using retrieved hiring data

---

## 🧠 AI Matching vs RAG

DevHire uses two different AI concepts.

### Candidate Matching

Matching is a structured ranking problem.

Candidate profiles and job requirements are compared using relevant attributes such as:

- Skills
- Experience
- Job requirements
- Candidate profile information

The system produces a relevance-oriented candidate/job ranking.

### RAG

The AI assistant follows a retrieval-augmented workflow:

```text
User Query
    ↓
Hiring Data Retrieval
    ↓
Relevant Jobs / Candidates
    ↓
Context Construction
    ↓
LLM
    ↓
Grounded Response
```

The LLM receives retrieved hiring information and generates a response based on that context.

🏗️ Architecture
┌──────────────────────┐
│ React Frontend │
│ TypeScript + UI │
└──────────┬───────────┘
│
│ HTTPS / REST API
▼
┌──────────────────────┐
│ FastAPI Backend │
│ Authentication │
│ Business Logic │
│ AI / Matching │
└───────┬───────┬──────┘
│ │
┌──────────┘ └──────────┐
▼ ▼
┌─────────────────┐ ┌─────────────────┐
│ PostgreSQL │ │ Redis │
│ Relational Data │ │ Queue / Caching │
└─────────────────┘ └────────┬────────┘
│
▼
┌─────────────────────┐
│ Background Worker │
│ RQ │
└─────────────────────┘

                         AI Layer
                            │
                            ▼
                    ┌─────────────────┐
                    │      Gemini     │
                    │   AI Assistant  │
                    └─────────────────┘

🛠️ Tech Stack

Frontend

React
TypeScript
Vite
Tailwind CSS
Axios
React Router
Vitest
React Testing Library

Backend

Python
FastAPI
SQLAlchemy
Pydantic
JWT
pwdlib
PyJWT
Database
PostgreSQL
Alembic

AI

Google Gemini
Retrieval-Augmented Generation
Structured candidate/job matching

Infrastructure

Redis
RQ
Docker
Docker Compose
GitHub

Deployment

Vercel — Frontend
Render — Backend
PostgreSQL — Production Database
Redis — Production Queue/Cache

📂 Project Structure
DevHire/
│
├── app/
│ ├── api/
│ │ ├── application.py
│ │ ├── auth.py
│ │ ├── candidate_profile.py
│ │ ├── company.py
│ │ ├── health.py
│ │ ├── job.py
│ │ ├── matching.py
│ │ ├── profile_view.py
│ │ ├── rag.py
│ │ ├── recruiter_candidates.py
│ │ └── resume.py
│ │
│ ├── core/
│ ├── db/
│ ├── models/
│ ├── repositories/
│ ├── schemas/
│ └── services/
│
├── alembic/
├── frontend/
│ ├── src/
│ ├── package.json
│ └── vercel.json
│
├── tests/
├── Dockerfile
├── docker-compose.yml
├── alembic.ini
├── requirements.txt
└── README.md
