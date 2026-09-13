import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";

type RankedJob = {
  job_id: number;
  title: string;
  company_id: number;
  match_score: number;
  matching_skills: string[];
};

function Matching() {
  const [jobs, setJobs] = useState<RankedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await api.get("/matching/jobs");
        setJobs(response.data);
      } catch (err: any) {
        console.error(
          "MATCHING ERROR:",
          err.response?.data || err,
        );

        setError(
          err.response?.data?.detail ||
            "Unable to calculate job matches.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent match";
    if (score >= 60) return "Strong match";
    if (score >= 40) return "Good match";
    return "Low match";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight"
          >
            Dev<span className="text-blue-500">Hire</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/dashboard"
              className="rounded-xl px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white sm:px-4"
            >
              Dashboard
            </Link>

            <Link
              to="/jobs"
              className="rounded-xl px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white sm:px-4"
            >
              Jobs
            </Link>

            <Link
              to="/profile"
              className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold transition hover:bg-blue-500 sm:px-4"
            >
              Profile
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <Link
          to="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </Link>

        <section className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-400">
            <Sparkles size={16} />
            AI-powered matching
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your Job Matches
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            DevHire compares your profile skills with active job
            requirements and ranks the most relevant opportunities.
          </p>
        </section>

        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm leading-6 text-red-400">
            {error}
          </div>
        )}

        {!error && jobs.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-10 text-center">
            <Target
              size={42}
              className="mx-auto mb-4 text-slate-600"
            />

            <h2 className="text-xl font-semibold">
              No matches available
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Complete your developer profile with relevant skills
              to start receiving job matches.
            </p>

            <Link
              to="/profile"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
            >
              Complete Profile
            </Link>
          </div>
        )}

        {!error && jobs.length > 0 && (
          <div className="space-y-5">
            {jobs.map((job) => (
              <article
                key={job.job_id}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:border-blue-500/30 sm:p-7"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                        <Target size={22} />
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold">
                          {job.title}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          Company #{job.company_id}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {job.matching_skills.length > 0 ? (
                        job.matching_skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400"
                          >
                            <CheckCircle2 size={13} />
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-600">
                          No matching skills yet
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 lg:w-64">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-400">
                        {getScoreLabel(job.match_score)}
                      </span>

                      <span className="text-2xl font-bold text-blue-400">
                        {job.match_score}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-blue-500 transition-all"
                        style={{
                          width: `${Math.min(
                            Math.max(job.match_score, 0),
                            100,
                          )}%`,
                        }}
                      />
                    </div>

                    <Link
                      to={`/jobs/${job.job_id}`}
                      className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Matching;