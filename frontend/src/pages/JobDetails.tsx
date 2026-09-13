import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

type Job = {
  id: number;
  title: string;
  description: string;
  location?: string;
  employment_type: string;
  experience_level: string;
  required_skills: string;
  company_id: number;
  is_active: boolean;
};

function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/jobs/${jobId}`);
        setJob(response.data);
      } catch (err: any) {
        console.error("JOB DETAILS ERROR:", err.response?.data || err);

        setError(
          err.response?.data?.detail ||
            "Unable to load this job.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const handleApply = async () => {
    if (!job) return;

    setApplying(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/applications", {
        job_id: job.id,
        cover_letter: coverLetter,
      });

      setSuccess("Application submitted successfully.");
      setCoverLetter("");
    } catch (err: any) {
      console.error(
        "APPLICATION ERROR:",
        err.response?.data || err,
      );

      setError(
        err.response?.data?.detail ||
          "Unable to submit your application.",
      );
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="min-h-screen bg-slate-950 px-5 py-10 text-white">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/jobs"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to jobs
          </Link>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-400">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  const skills = job.required_skills
    .split(/[,;\n]/)
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90">
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
              className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold transition hover:bg-blue-500 sm:px-4"
            >
              Jobs
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <Link
          to="/jobs"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to jobs
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Job Information */}
          <section>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                  <BriefcaseBusiness size={26} />
                </div>

                <div className="min-w-0">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {job.is_active ? "Active position" : "Closed"}
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {job.title}
                  </h1>

                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                    {job.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={16} />
                        {job.location}
                      </span>
                    )}

                    <span>{job.employment_type}</span>

                    <span>{job.experience_level}</span>
                  </div>
                </div>
              </div>

              <div className="my-8 h-px bg-white/10" />

              <div>
                <h2 className="text-xl font-semibold">
                  About this role
                </h2>

                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-400 sm:text-base">
                  {job.description}
                </p>
              </div>

              <div className="mt-10">
                <div className="flex items-center gap-2">
                  <Sparkles size={19} className="text-blue-400" />

                  <h2 className="text-xl font-semibold">
                    Required skills
                  </h2>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-medium text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Apply */}
          <aside>
            <div className="sticky top-6 rounded-2xl border border-white/10 bg-slate-900/70 p-6">
              <div className="mb-6">
                <p className="text-sm text-slate-500">
                  Interested in this role?
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Apply to {job.title}
                </h2>
              </div>

              {success && (
                <div className="mb-5 flex gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-400">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{success}</span>
                </div>
              )}

              {error && job && (
                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-400">
                  {error}
                </div>
              )}

              <label
                htmlFor="coverLetter"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Cover letter
              </label>

              <textarea
                id="coverLetter"
                value={coverLetter}
                onChange={(event) =>
                  setCoverLetter(event.target.value)
                }
                rows={7}
                placeholder="Tell the recruiter why you're a good fit..."
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />

              <button
                onClick={handleApply}
                disabled={applying || !job.is_active}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {applying ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-transparent" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={17} />
                    Apply Now
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-600">
                Your application will be securely submitted through
                the DevHire API.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate("/jobs")}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Browse more jobs
          </button>
        </div>
      </main>
    </div>
  );
}

export default JobDetails;