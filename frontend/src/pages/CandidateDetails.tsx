import { useEffect, useState } from "react";
import { ArrowLeft, FileText, MapPin, UserRound } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import api from "../services/api";

type CandidateProfile = {
  headline?: string;
  bio?: string;
  skills?: string;
  experience_years?: number;
  education?: string;
  location?: string;
  resume_url?: string;
};

type CandidateResponse = {
  candidate: {
    id: number;
    full_name: string;
    email: string;
  };
  profile: CandidateProfile;
};

function CandidateDetails() {
  const { candidateId } = useParams<{ candidateId: string }>();

  const [data, setData] = useState<CandidateResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCandidate = async () => {
      if (!candidateId) {
        setError("Candidate not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get<CandidateResponse>(
          `/recruiter/candidates/${candidateId}`,
        );

        setData(response.data);
      } catch (err: any) {
        console.error("Failed to load candidate:", err);

        setError(
          err.response?.data?.detail ||
            "Unable to load candidate profile.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadCandidate();
  }, [candidateId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-950 px-5 py-10 text-white">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/recruiter"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to recruiter dashboard
          </Link>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-400">
            {error || "Candidate not found."}
          </div>
        </div>
      </div>
    );
  }

  const { candidate, profile } = data;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight"
          >
            Dev<span className="text-blue-500">Hire</span>
          </Link>

          <Link
            to="/recruiter"
            className="rounded-xl px-4 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            Recruiter Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <Link
          to="/recruiter"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to recruiter dashboard
        </Link>

        {/* Candidate Header */}
        <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <UserRound size={30} />
            </div>

            <div className="min-w-0">
              <h1 className="text-3xl font-bold tracking-tight">
                {candidate.full_name}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                {candidate.email}
              </p>

              {profile.headline && (
                <p className="mt-4 text-lg text-blue-400">
                  {profile.headline}
                </p>
              )}

              {profile.location && (
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                  <MapPin size={16} />
                  {profile.location}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Profile */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold">
              About Candidate
            </h2>

            <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-400">
              {profile.bio || "No bio provided."}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold">
              Experience
            </h2>

            <p className="mt-4 text-3xl font-bold text-white">
              {profile.experience_years ?? 0}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              years of experience
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">
            Skills
          </h2>

          {profile.skills ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {profile.skills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean)
                .map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-sm text-blue-400"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              No skills provided.
            </p>
          )}
        </section>

        {/* Education */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold">
            Education
          </h2>

          <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-400">
            {profile.education || "No education information provided."}
          </p>
        </section>

        {/* Resume */}
        {profile.resume_url && (
          <section className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                  <FileText size={21} />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Resume
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Candidate resume
                  </p>
                </div>
              </div>

              <a
                href={`http://localhost:8000${profile.resume_url}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                View Resume
              </a>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default CandidateDetails;