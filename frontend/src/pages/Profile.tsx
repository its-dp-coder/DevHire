import { useEffect, useState } from "react";
import type { FormEvent } from "react";import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  MapPin,
  Save,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";

type Profile = {
  id?: number;
  user_id?: number;
  headline: string;
  bio: string;
  skills: string;
  experience_years: number;
  education: string;
  location: string;
  resume_url: string;
};

const emptyProfile: Profile = {
  headline: "",
  bio: "",
  skills: "",
  experience_years: 0,
  education: "",
  location: "",
  resume_url: "",
};

function Profile() {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/candidate-profile");
        setProfile({
          ...emptyProfile,
          ...response.data,
        });
      } catch (err: any) {
        if (err.response?.status !== 404) {
          setError(
            err.response?.data?.detail ||
              "Unable to load your profile.",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]:
        name === "experience_years"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = profile.id
        ? await api.put("/candidate-profile", profile)
        : await api.post("/candidate-profile", profile);

      setProfile({
        ...emptyProfile,
        ...response.data,
      });

      setMessage("Profile saved successfully.");
    } catch (err: any) {
      console.error(
        "PROFILE ERROR:",
        err.response?.data || err,
      );

      setError(
        err.response?.data?.detail ||
          "Unable to save your profile.",
      );
    } finally {
      setSaving(false);
    }
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

        <div className="mb-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <UserRound size={23} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My Developer Profile
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Build your developer profile so DevHire can recommend
            better opportunities and calculate AI-powered job matches.
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
                Professional Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Tell recruiters what you do and what you're good at.
              </p>
            </div>

            <div className="grid gap-6">
              <div>
                <label
                  htmlFor="headline"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Professional headline
                </label>

                <input
                  id="headline"
                  name="headline"
                  value={profile.headline}
                  onChange={handleChange}
                  placeholder="e.g. Python Backend Developer"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Bio
                </label>

                <textarea
                  id="bio"
                  name="bio"
                  rows={5}
                  value={profile.bio}
                  onChange={handleChange}
                  placeholder="Tell recruiters about yourself, your experience, and what you build..."
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="skills"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Skills
                </label>

                <textarea
                  id="skills"
                  name="skills"
                  rows={3}
                  value={profile.skills}
                  onChange={handleChange}
                  placeholder="Python, FastAPI, PostgreSQL, Docker, React, Machine Learning"
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />

                <p className="mt-2 text-xs text-slate-600">
                  Separate skills with commas. These skills are used
                  by the AI matching engine.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="experience_years"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Experience (years)
                  </label>

                  <input
                    id="experience_years"
                    name="experience_years"
                    type="number"
                    min="0"
                    max="50"
                    value={profile.experience_years}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Location
                  </label>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      id="location"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      placeholder="e.g. Delhi, India"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="education"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Education
                </label>

                <textarea
                  id="education"
                  name="education"
                  rows={3}
                  value={profile.education}
                  onChange={handleChange}
                  placeholder="B.Tech in Computer Science, XYZ University"
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-8">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <FileText size={21} />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Resume
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Add your resume URL. File upload can be connected to
                  the resume service later.
                </p>
              </div>
            </div>

            <input
              id="resume_url"
              name="resume_url"
              type="url"
              value={profile.resume_url}
              onChange={handleChange}
              placeholder="https://example.com/my-resume.pdf"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/dashboard"
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
                  Saving...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Profile
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
          <div className="flex gap-3">
            <Sparkles
              size={20}
              className="mt-0.5 shrink-0 text-blue-400"
            />

            <div>
              <h3 className="font-semibold">
                Better profile = better matches
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Add accurate skills and experience so DevHire can
                calculate more relevant job matches for you.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;