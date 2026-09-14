import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import api from "../services/api";

type Application = {
  id: number;
  job_id: number;
  candidate_id: number;
  cover_letter?: string;
  status: string;
};

function RecruiterDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get<Application[]>(
          "/applications/recruiter",
        );

        setApplications(response.data);
      } catch (err: any) {
        console.error(
          "RECRUITER APPLICATION ERROR:",
          err.response?.data || err,
        );

        setError(
          err.response?.data?.detail ||
            "Unable to load applications.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const updateStatus = async (
    applicationId: number,
    status: string,
  ) => {
    try {
      setError("");

      const response = await api.patch<Application>(
        `/applications/${applicationId}/status`,
        { status },
      );

      setApplications((current) =>
        current.map((application) =>
          application.id === applicationId
            ? response.data
            : application,
        ),
      );
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Unable to update application status.",
      );
    }
  };

  const hiredCount = applications.filter(
    (application) => application.status === "hired",
  ).length;

  const reviewingCount = applications.filter(
    (application) => application.status === "reviewing",
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight"
          >
            Dev<span className="text-blue-500">Hire</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="rounded-xl px-4 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              to="/jobs"
              className="rounded-xl px-4 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              Jobs
            </Link>

            <Link
              to="/company"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <Building2 size={16} />
              Company
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        {/* Heading */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <Users size={23} />
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Recruiter Dashboard
            </h1>

            <p className="mt-3 text-sm text-slate-400 sm:text-base">
              Manage candidate applications, companies, and
              recruitment activity.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/company"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <Building2 size={17} />
              Manage Company
            </Link>

            <Link
              to="/recruiter/jobs/new"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
            >
              <BriefcaseBusiness size={17} />
              Post a Job
            </Link>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-400">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <BriefcaseBusiness
              size={22}
              className="text-blue-400"
            />

            <p className="mt-5 text-sm text-slate-500">
              Applications
            </p>

            <p className="mt-1 text-3xl font-bold">
              {applications.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <CheckCircle2
              size={22}
              className="text-emerald-400"
            />

            <p className="mt-5 text-sm text-slate-500">
              Hired
            </p>

            <p className="mt-1 text-3xl font-bold">
              {hiredCount}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <Users
              size={22}
              className="text-violet-400"
            />

            <p className="mt-5 text-sm text-slate-500">
              Under Review
            </p>

            <p className="mt-1 text-3xl font-bold">
              {reviewingCount}
            </p>
          </div>
        </div>

        {/* Recruiter Actions */}
        <section className="mb-8 grid gap-5 md:grid-cols-2">
          <Link
            to="/company"
            className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:-translate-y-0.5 hover:border-emerald-500/30 hover:bg-slate-900"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Building2 size={21} />
              </div>

              <span className="text-sm text-slate-600 transition group-hover:text-emerald-400">
                Manage →
              </span>
            </div>

            <h2 className="mt-5 text-lg font-semibold">
              Company Management
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Create and manage your company profile before
              publishing developer jobs.
            </p>
          </Link>

          <Link
            to="/recruiter/jobs/new"
            className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-slate-900"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <BriefcaseBusiness size={21} />
              </div>

              <span className="text-sm text-slate-600 transition group-hover:text-blue-400">
                Create →
              </span>
            </div>

            <h2 className="mt-5 text-lg font-semibold">
              Post Developer Job
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Publish a new developer opportunity and start
              receiving applications.
            </p>
          </Link>
        </section>

        {/* Applications */}
        <section className="rounded-2xl border border-white/10 bg-slate-900/60">
          <div className="border-b border-white/10 p-6">
            <h2 className="text-xl font-semibold">
              Candidate Applications
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review and update application status.
            </p>
          </div>

          {loading ? (
            <div className="flex min-h-48 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
            </div>
          ) : applications.length === 0 ? (
            <div className="p-10 text-center">
              <Users
                size={40}
                className="mx-auto mb-4 text-slate-700"
              />

              <h3 className="font-semibold">
                No applications yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Candidate applications will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="min-w-0">
                    <h3 className="font-semibold">
                      Application #{application.id}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Candidate #{application.candidate_id}
                      {" · "}
                      Job #{application.job_id}
                    </p>

                    {application.cover_letter && (
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                        {application.cover_letter}
                      </p>
                    )}
                  </div>

                  <select
                    value={application.status}
                    onChange={(event) =>
                      updateStatus(
                        application.id,
                        event.target.value,
                      )
                    }
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  >
                    <option value="applied">
                      Applied
                    </option>

                    <option value="reviewing">
                      Reviewing
                    </option>

                    <option value="shortlisted">
                      Shortlisted
                    </option>

                    <option value="rejected">
                      Rejected
                    </option>

                    <option value="hired">
                      Hired
                    </option>
                  </select>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} DevHire. AI-powered
          developer hiring platform.
        </footer>
      </main>
    </div>
  );
}

export default RecruiterDashboard;