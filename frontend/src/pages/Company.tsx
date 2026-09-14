import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  Building2,
  CheckCircle2,
  Globe,
  Loader2,
  Plus,
} from "lucide-react";

import api from "../services/api";

type Company = {
  id: number;
  name: string;
  description: string | null;
  website: string | null;
  owner_id: number;
  created_at: string;
};

function Company() {
  const [companies, setCompanies] = useState<Company[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchCompanies = async () => {
    try {
      setFetching(true);
      setError("");

      const response = await api.get<Company[]>("/companies");

      setCompanies(response.data);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Failed to load companies.",
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCreateCompany = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Company name is required.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/companies", {
        name: name.trim(),
        description: description.trim() || null,
        website: website.trim() || null,
      });

      setName("");
      setDescription("");
      setWebsite("");

      setSuccess("Company created successfully.");

      await fetchCompanies();
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Failed to create company.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <Building2 size={24} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Company Management
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Create your company profile and use it to publish
            developer opportunities on DevHire.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* Create Company */}
          <section className="h-fit rounded-2xl border border-white/10 bg-slate-900/70 p-6 sm:p-7">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                Create Company
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Set up your recruiter company profile.
              </p>
            </div>

            <form
              onSubmit={handleCreateCompany}
              className="space-y-5"
            >
              {/* Company Name */}
              <div>
                <label
                  htmlFor="company-name"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Company Name
                </label>

                <input
                  id="company-name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="e.g. TechNova"
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="company-description"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Description
                </label>

                <textarea
                  id="company-description"
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Tell developers about your company..."
                  rows={5}
                  className="w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50"
                />
              </div>

              {/* Website */}
              <div>
                <label
                  htmlFor="company-website"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Website
                </label>

                <div className="relative">
                  <Globe
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                  />

                  <input
                    id="company-website"
                    type="url"
                    value={website}
                    onChange={(event) =>
                      setWebsite(event.target.value)
                    }
                    placeholder="https://example.com"
                    className="w-full rounded-xl border border-white/10 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">
                  <CheckCircle2 size={18} />
                  {success}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Create Company
                  </>
                )}
              </button>
            </form>
          </section>

          {/* Company List */}
          <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 sm:p-7">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                Companies
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Companies available on the DevHire platform.
              </p>
            </div>

            {fetching ? (
              <div className="flex items-center justify-center py-12 text-slate-500">
                <Loader2
                  size={22}
                  className="mr-2 animate-spin"
                />
                Loading companies...
              </div>
            ) : companies.length === 0 ? (
              <div className="rounded-xl border border-white/5 bg-slate-950/40 px-5 py-12 text-center">
                <Building2
                  size={32}
                  className="mx-auto text-slate-600"
                />

                <p className="mt-3 text-sm font-medium text-slate-400">
                  No companies found.
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  Create your first company using the form.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {companies.map((company) => (
                  <div
                    key={company.id}
                    className="rounded-xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-emerald-500/20"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                        <Building2 size={20} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-slate-100">
                          {company.name}
                        </h3>

                        <p className="mt-1 text-xs text-slate-600">
                          Company #{company.id}
                        </p>
                      </div>
                    </div>

                    {company.description && (
                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-400">
                        {company.description}
                      </p>
                    )}

                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition hover:text-blue-300"
                      >
                        <Globe size={15} />
                        Visit Website
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Company;