import { FormEvent, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", {
        full_name: fullName,
        email,
        password,
      });

      navigate("/login");
    } catch (err: any) {
      console.error(
        "REGISTER ERROR:",
        err.response?.data || err,
      );

      setError(
        err.response?.data?.detail ||
          err.message ||
          "Unable to create your account.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <header className="flex h-20 items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight"
          >
            Dev<span className="text-blue-500">Hire</span>
          </Link>

          <Link
            to="/login"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Already a member?{" "}
            <span className="font-semibold text-blue-400">
              Sign in
            </span>
          </Link>
        </header>

        {/* Main */}
        <main className="flex flex-1 items-center justify-center py-10 sm:py-12 lg:py-16">
          <div className="grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2">

            {/* Left Content */}
            <div className="hidden lg:block">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
                <CheckCircle2 size={16} />
                Join DevHire
              </div>

              <h1 className="text-5xl font-bold leading-tight tracking-tight">
                Build your career.
                <span className="block text-blue-500">
                  Find the right opportunity.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                Create your developer profile, discover relevant
                opportunities, and connect with companies using
                intelligent job matching.
              </p>

              <div className="mt-8 space-y-4">
                <Benefit text="AI-powered job matching" />
                <Benefit text="Professional developer profiles" />
                <Benefit text="Secure recruitment workflow" />
              </div>
            </div>

            {/* Register Card */}
            <div className="w-full max-w-md justify-self-center lg:max-w-lg">

              <div className="mb-7 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                  <UserRound size={25} />
                </div>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Create your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                  Start your journey with DevHire.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">

                {/* Error */}
                {error && (
                  <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-400">
                    {error}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Full name
                    </label>

                    <div className="relative">
                      <UserRound
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      />

                      <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(event) =>
                          setFullName(event.target.value)
                        }
                        required
                        autoComplete="name"
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Email address
                    </label>

                    <div className="relative">
                      <Mail
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      />

                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                          setEmail(event.target.value)
                        }
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      />

                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                          setPassword(event.target.value)
                        }
                        required
                        minLength={8}
                        autoComplete="new-password"
                        placeholder="Minimum 8 characters"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                      />
                    </div>

                    <p className="mt-2 text-xs text-slate-600">
                      Use at least 8 characters.
                    </p>
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold transition hover:bg-blue-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account

                        <ArrowRight
                          size={18}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="my-7 flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-800" />

                  <span className="text-xs text-slate-600">
                    DEVHIRE
                  </span>

                  <div className="h-px flex-1 bg-slate-800" />
                </div>

                <p className="text-center text-sm text-slate-400">
                  Already have an account?{" "}

                  <Link
                    to="/login"
                    className="font-semibold text-blue-400 transition hover:text-blue-300"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <p className="mt-6 text-center text-xs text-slate-600">
                Secure authentication powered by DevHire API
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-300">
      <CheckCircle2
        size={18}
        className="shrink-0 text-blue-500"
      />

      <span>{text}</span>
    </div>
  );
}


export default Register;