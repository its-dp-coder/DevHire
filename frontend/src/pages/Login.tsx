import { useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowRight,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "access_token",
        response.data.access_token,
      );

      navigate("/dashboard");
    } catch (err: any) {
      console.error(
        "LOGIN ERROR:",
        err.response?.data || err,
      );

      setError(
        err.response?.data?.detail ||
          err.message ||
          "Unable to login. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 sm:px-6 lg:px-8">

        <header className="flex h-20 items-center">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight"
          >
            Dev<span className="text-blue-500">Hire</span>
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center py-10 sm:py-12">
          <div className="w-full max-w-md">

            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                <LockKeyhole size={25} />
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                Sign in to continue to your DevHire account.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">

              {error && (
                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-400">
                  {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

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
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold transition hover:bg-blue-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    "Signing in..."
                  ) : (
                    <>
                      Sign in

                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

              </form>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-800" />
                <span className="text-xs text-slate-600">
                  DEVHIRE
                </span>
                <div className="h-px flex-1 bg-slate-800" />
              </div>

              <p className="text-center text-sm text-slate-400">
                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="font-semibold text-blue-400 transition hover:text-blue-300"
                >
                  Create one
                </Link>
              </p>

            </div>

            <p className="mt-6 text-center text-xs text-slate-600">
              Secure authentication powered by DevHire API
            </p>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Login;