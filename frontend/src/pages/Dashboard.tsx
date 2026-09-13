import {
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LogOut,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const stats = [
    {
      label: "Applications",
      value: "0",
      icon: FileText,
    },
    {
      label: "Recommended Jobs",
      value: "0",
      icon: Sparkles,
    },
    {
      label: "Profile Views",
      value: "0",
      icon: UserRound,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-slate-900/70 lg:flex lg:flex-col">
          <div className="flex h-20 items-center border-b border-white/10 px-6">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight"
            >
              Dev<span className="text-blue-500">Hire</span>
            </Link>
          </div>

          <nav className="flex-1 space-y-2 p-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 rounded-xl bg-blue-600/10 px-4 py-3 text-sm font-medium text-blue-400"
            >
              <LayoutDashboard size={19} />
              Dashboard
            </Link>

            <Link
              to="/jobs"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <BriefcaseBusiness size={19} />
              Jobs
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <UserRound size={19} />
              My Profile
            </Link>
          </nav>

          <div className="border-t border-white/10 p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut size={19} />
              Logout
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          {/* Mobile Header */}
          <header className="flex h-20 items-center justify-between border-b border-white/10 px-5 lg:hidden">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight"
            >
              Dev<span className="text-blue-500">Hire</span>
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-xl p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-red-400"
            >
              <LogOut size={20} />
            </button>
          </header>

          <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
            {/* Heading */}
            <div className="mb-8">
              <p className="mb-2 text-sm font-medium text-blue-400">
                Developer Hiring Platform
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome to DevHire 👋
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Discover opportunities, build your developer profile,
                and let AI help you find better job matches.
              </p>
            </div>

            {/* Mobile Navigation */}
            <div className="mb-8 grid grid-cols-3 gap-3 lg:hidden">
              <Link
                to="/dashboard"
                className="flex flex-col items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 p-3 text-xs font-medium text-blue-400"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>

              <Link
                to="/jobs"
                className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-slate-900 p-3 text-xs font-medium text-slate-400"
              >
                <BriefcaseBusiness size={18} />
                Jobs
              </Link>

              <Link
                to="/profile"
                className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-slate-900 p-3 text-xs font-medium text-slate-400"
              >
                <UserRound size={18} />
                Profile
              </Link>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                        <Icon size={20} />
                      </div>

                      <span className="text-xs text-slate-600">
                        Coming soon
                      </span>
                    </div>

                    <p className="text-3xl font-bold">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <section className="mt-8">
              <div className="mb-4">
                <h2 className="text-xl font-bold">
                  Quick Actions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Start building your developer profile and explore jobs.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Link
                  to="/jobs"
                  className="group rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-slate-900"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <Search size={22} />
                    </div>

                    <ChevronRight
                      size={20}
                      className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-blue-400"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    Explore Jobs
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Browse developer opportunities and find roles
                    matching your skills.
                  </p>
                </Link>

                <Link
                  to="/profile"
                  className="group rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-slate-900"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                      <UserRound size={22} />
                    </div>

                    <ChevronRight
                      size={20}
                      className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-violet-400"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    Complete Your Profile
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Add your skills, experience, education, and resume
                    to improve your AI job matches.
                  </p>
                </Link>
              </div>
            </section>

            {/* AI Banner */}
            <section className="mt-8 overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-slate-900 to-violet-500/10 p-6 sm:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <Sparkles size={21} />
                  </div>

                  <h2 className="text-2xl font-bold">
                    AI-powered hiring is coming.
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                    DevHire will analyze developer skills and job
                    requirements to calculate intelligent candidate-job
                    matches.
                  </p>
                </div>

                <div className="shrink-0">
                  <div className="rounded-xl border border-white/10 bg-slate-950/60 px-5 py-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      AI Matching
                    </p>

                    <p className="mt-1 text-lg font-semibold text-blue-400">
                      Coming Soon
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Company CTA */}
            <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900/50 p-6 sm:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Building2 size={21} />
                  </div>

                  <div>
                    <h2 className="font-semibold">
                      Are you hiring developers?
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Create a company and publish developer jobs.
                    </p>
                  </div>
                </div>

                <Link
                  to="/jobs"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold transition hover:bg-white/5"
                >
                  View Jobs
                  <ChevronRight size={17} />
                </Link>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-600">
              © {new Date().getFullYear()} DevHire. AI-powered developer
              hiring platform.
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;