import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Clock3,
  FileText,
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

function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/applications/my");
        setApplications(response.data);
      } catch (err: any) {
        console.error(
          "APPLICATIONS ERROR:",
          err.response?.data || err,
        );

        setError(
          err.response?.data?.detail ||
            "Unable to load your applications.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "applied":
        return "Applied";
      case "reviewing":
        return "Reviewing";
      case "shortlisted":
        return "Shortlisted";
      case "rejected":
        return "Rejected";
      case "hired":
        return "Hired";
      default:
        return status;
    }
  };

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
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <Link
          to="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </Link>

        <div className="mb-10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <BriefcaseBusiness size={23} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My Applications
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
            Track the jobs you've applied for and monitor your
            application status.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex min-h-60 items-center justify-center">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
          </div>
        ) : applications.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-10 text-center">
            <BriefcaseBusiness
              size={42}
              className="mx-auto mb-4 text-slate-700"
            />

            <h2 className="text-xl font-semibold">
              No applications yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Explore available developer jobs and apply to the
              opportunities that match your skills.
            </p>

            <Link
              to="/jobs"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {applications.map((application) => (
              <article
                key={application.id}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-blue-500/30"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <BriefcaseBusiness size={22} />
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-xl font-semibold">
                        Job #{application.job_id}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Application #{application.id}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-400">
                    <Clock3 size={14} />
                    {getStatusLabel(application.status)}
                  </span>
                </div>

                {application.cover_letter && (
                  <div className="mt-6 border-t border-white/5 pt-5">
                    <div className="flex gap-3">
                      <FileText
                        size={18}
                        className="mt-0.5 shrink-0 text-slate-500"
                      />

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                          Cover Letter
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {application.cover_letter}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 border-t border-white/5 pt-5">
                  <Link
                    to={`/jobs/${application.job_id}`}
                    className="text-sm font-semibold text-blue-400 transition hover:text-blue-300"
                  >
                    View Job →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Applications;