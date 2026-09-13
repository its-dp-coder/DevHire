import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
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

function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs");
        setJobs(response.data);
      } catch (err: any) {
        console.error("JOBS ERROR:", err.response?.data || err);
        setError(
          err.response?.data?.detail ||
            "Unable to load jobs. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const query = search.toLowerCase();

    return (
      job.title.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query) ||
      job.required_skills.toLowerCase().includes(query) ||
      (job.location || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            Dev<span className="text-blue-500">Hire</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="rounded-xl px-4 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              to="/jobs"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold transition hover:bg-blue-500"
            >
              Jobs
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="mb-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
            <Sparkles size={16} />
            Developer opportunities
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Find your next
            <span className="text-blue-500"> opportunity.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Explore developer roles and discover opportunities that match your
            skills and experience.
          </p>
        </section>

        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search jobs, skills, or locations..."
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 py-4 pl-12 pr-5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />
          </div>
        </div>

        {loading && (
          <div className="flex min-h-60 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
          </div>
        )}

        {error && !loading && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && filteredJobs.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-10 text-center">
            <BriefcaseBusiness
              size={40}
              className="mx-auto mb-4 text-slate-600"
            />

            <h2 className="text-xl font-semibold">
              No jobs found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try a different search term.
            </p>
          </div>
        )}

        {!loading && !error && filteredJobs.length > 0 && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1 ? "job" : "jobs"} available
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {filteredJobs.map((job) => {
                const skills = job.required_skills
                  .split(/[,;\n]/)
                  .map((skill) => skill.trim())
                  .filter(Boolean);

                return (
                  <article
                    key={job.id}
                    className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-slate-900"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex min-w-0 gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                          <BriefcaseBusiness size={22} />
                        </div>

                        <div className="min-w-0">
                          <h2 className="truncate text-xl font-semibold">
                            {job.title}
                          </h2>

                          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                            {job.location && (
                              <span className="flex items-center gap-1.5">
                                <MapPin size={15} />
                                {job.location}
                              </span>
                            )}

                            <span>{job.employment_type}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-400">
                      {job.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {skills.slice(0, 6).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
                      <span className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-400">
                        {job.experience_level}
                      </span>

                      <Link
                        to={`/jobs/${job.id}`}
                        className="text-sm font-semibold text-blue-400 transition hover:text-blue-300"
                      >
                        View details →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Jobs;