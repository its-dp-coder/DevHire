import { useState } from "react";
import type { FormEvent } from "react";
import {
  AlertCircle,
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

function CreateJob() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("full-time");
  const [experienceLevel, setExperienceLevel] = useState("mid");
  const [requiredSkills, setRequiredSkills] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Job title is required.");
      return;
    }

    if (!description.trim()) {
      setError("Job description is required.");
      return;
    }

    if (!requiredSkills.trim()) {
      setError("Required skills are required.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/jobs", {
        title: title.trim(),
        description: description.trim(),
        location: location.trim() || null,
        employment_type: employmentType,
        experience_level: experienceLevel,
        required_skills: requiredSkills.trim(),
      });

      setSuccess("Job posted successfully.");

      setTimeout(() => {
        navigate("/recruiter");
      }, 800);
    } catch (err: any) {
      const detail = err?.response?.data?.detail;

      if (detail === "Company not found") {
        setError(
          "You need to create a company before posting a job.",
        );
        return;
      }

      setError(
        detail ||
          "Unable to create the job. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight"
          >
            Dev<span className="text-blue-500">Hire</span>
          </Link>

          <Link
            to="/recruiter"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft size={17} />
            Recruiter Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        {/* Heading */}
        <div className="mb-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <BriefcaseBusiness size={24} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Post a Developer Job
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Publish a new opportunity and find skilled developers
            through DevHire.
          </p>
        </div>

        {/* Form */}
        <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 sm:p-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Job Title */}
            <div>
              <label
                htmlFor="job-title"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Job Title
              </label>

              <input
                id="job-title"
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="e.g. Python Backend Developer"
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="job-description"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Job Description
              </label>

              <textarea
                id="job-description"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Describe the role, responsibilities, and expectations..."
                rows={7}
                className="w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="job-location"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Location
              </label>

              <input
                id="job-location"
                type="text"
                value={location}
                onChange={(event) =>
                  setLocation(event.target.value)
                }
                placeholder="e.g. Remote / Bangalore / Delhi"
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50"
              />
            </div>

            {/* Employment + Experience */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="employment-type"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Employment Type
                </label>

                <select
                  id="employment-type"
                  value={employmentType}
                  onChange={(event) =>
                    setEmploymentType(event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50"
                >
                  <option value="full-time">
                    Full-time
                  </option>

                  <option value="part-time">
                    Part-time
                  </option>

                  <option value="contract">
                    Contract
                  </option>

                  <option value="internship">
                    Internship
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="experience-level"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Experience Level
                </label>

                <select
                  id="experience-level"
                  value={experienceLevel}
                  onChange={(event) =>
                    setExperienceLevel(event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50"
                >
                  <option value="entry">
                    Entry Level
                  </option>

                  <option value="mid">
                    Mid Level
                  </option>

                  <option value="senior">
                    Senior Level
                  </option>

                  <option value="lead">
                    Lead
                  </option>
                </select>
              </div>
            </div>

            {/* Required Skills */}
            <div>
              <label
                htmlFor="required-skills"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Required Skills
              </label>

              <textarea
                id="required-skills"
                value={requiredSkills}
                onChange={(event) =>
                  setRequiredSkills(event.target.value)
                }
                placeholder="e.g. Python, FastAPI, PostgreSQL, Redis, Docker"
                rows={4}
                className="w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50"
                required
              />

              <p className="mt-2 text-xs text-slate-600">
                Separate skills using commas.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-400">
                <AlertCircle
                  size={19}
                  className="mt-0.5 shrink-0"
                />

                <span>{error}</span>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">
                <CheckCircle2 size={19} />
                {success}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
              <Link
                to="/recruiter"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Publishing...
                  </>
                ) : (
                  <>
                    <BriefcaseBusiness size={18} />
                    Publish Job
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default CreateJob;