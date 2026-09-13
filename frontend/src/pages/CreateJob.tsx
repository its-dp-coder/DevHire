import { useState } from "react";
import type { FormEvent } from "react";import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  Plus,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

type JobForm = {
  title: string;
  description: string;
  location: string;
  employment_type: string;
  experience_level: string;
  required_skills: string;
};

const initialForm: JobForm = {
  title: "",
  description: "",
  location: "",
  employment_type: "full-time",
  experience_level: "entry",
  required_skills: "",
};

function CreateJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState<JobForm>(initialForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      await api.post("/jobs", form);

      setMessage("Job created successfully.");

      setTimeout(() => {
        navigate("/recruiter");
      }, 700);
    } catch (err: any) {
      console.error(
        "CREATE JOB ERROR:",
        err.response?.data || err,
      );

      setError(
        err.response?.data?.detail ||
          "Unable to create job.",
      );
    } finally {
      setSaving(false);
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

          <Link
            to="/recruiter"
            className="rounded-xl px-4 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            Recruiter Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <Link
          to="/recruiter"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to recruiter dashboard
        </Link>

        <div className="mb-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <BriefcaseBusiness size={23} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Create Job
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
            Publish a developer opportunity and start receiving
            applications.
          </p>
        </div>

        {message && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">
            <CheckCircle2 size={18} />
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold">
                Job Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Provide the details candidates need to understand the
                role.
              </p>
            </div>

            <div className="grid gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Job title
                </label>

                <input
                  id="title"
                  name="title"
                  required
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Python Backend Developer"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  required
                  rows={7}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the role, responsibilities, and expectations..."
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="required_skills"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Required skills
                </label>

                <textarea
                  id="required_skills"
                  name="required_skills"
                  required
                  rows={3}
                  value={form.required_skills}
                  onChange={handleChange}
                  placeholder="Python, FastAPI, PostgreSQL, Docker"
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />

                <p className="mt-2 text-xs text-slate-600">
                  Separate skills with commas.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="location"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Location
                  </label>

                  <input
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Remote / Delhi"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="employment_type"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Employment type
                  </label>

                  <select
                    id="employment_type"
                    name="employment_type"
                    value={form.employment_type}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none focus:border-blue-500"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="experience_level"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Experience level
                </label>

                <select
                  id="experience_level"
                  name="experience_level"
                  value={form.experience_level}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none focus:border-blue-500"
                >
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="lead">Lead</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/recruiter"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 px-6 py-3.5 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-transparent" />
                  Publishing...
                </>
              ) : (
                <>
                  <Plus size={17} />
                  Publish Job
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CreateJob;