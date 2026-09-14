import {
  Bot,
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
              to="/applications"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <FileText size={19} />
              My Applications
            </Link>

            <Link
              to="/matching"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <Sparkles size={19} />
              AI Job Matching
            </Link>

            <Link
              to="/ai-assistant"
              className="flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-400 transition hover:bg-blue-500/15 hover:text-blue-300"
            >
              <Bot size={19} />
              AI Assistant
            </Link>

            <Link
              to="/resume"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <FileText size={19} />
              Resume
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
            <div className="mb-8 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:hidden">
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
                to="/applications"
                className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-slate-900 p-3 text-xs font-medium text-slate-400"
              >
                <FileText size={18} />
                Applications
              </Link>

              <Link
                to="/matching"
                className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-slate-900 p-3 text-xs font-medium text-slate-400"
              >
                <Sparkles size={18} />
                Matching
              </Link>

              <Link
                to="/ai-assistant"
                className="flex flex-col items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 p-3 text-xs font-medium text-blue-400"
              >
                <Bot size={18} />
                AI Assistant
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
                  Manage your developer profile, applications,
                  resume, and AI-powered job matches.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Explore Jobs */}
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

                {/* Profile */}
                <Link
                  to="/profile"
                  className="group rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:-translate-y-0.5 hover:border-violet-500/30 hover:bg-slate-900"
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
                    Add your skills, experience, education, and
                    resume to improve your AI job matches.
                  </p>
                </Link>

                {/* Applications */}
                <Link
                  to="/applications"
                  className="group rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:-translate-y-0.5 hover:border-emerald-500/30 hover:bg-slate-900"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                      <FileText size={22} />
                    </div>

                    <ChevronRight
                      size={20}
                      className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-emerald-400"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    My Applications
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Track the jobs you have applied for and monitor
                    your application status.
                  </p>
                </Link>

                {/* AI Matching */}
                <Link
                  to="/matching"
                  className="group rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-slate-900"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <Sparkles size={22} />
                    </div>

                    <ChevronRight
                      size={20}
                      className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-blue-400"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    AI Job Matching
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Get developer jobs ranked according to your
                    skills and see your match score.
                  </p>
                </Link>

                {/* AI Assistant */}
                <Link
                  to="/ai-assistant"
                  className="group rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 transition hover:-translate-y-0.5 hover:border-blue-500/40 hover:bg-blue-500/10"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <Bot size={22} />
                    </div>

                    <Sparkles
                      size={20}
                      className="text-blue-400 transition group-hover:scale-110"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    AI Recruitment Assistant
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Ask AI about candidates, jobs, skills, and
                    recruitment data using grounded hiring context.
                  </p>
                </Link>

                {/* Resume */}
                <Link
                  to="/resume"
                  className="group rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:-translate-y-0.5 hover:border-amber-500/30 hover:bg-slate-900"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                      <FileText size={22} />
                    </div>

                    <ChevronRight
                      size={20}
                      className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-amber-400"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    Manage Resume
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Upload your latest resume and keep your
                    candidate profile up to date.
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
                    AI-powered developer tools are ready.
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                    Use AI job matching to discover relevant roles,
                    or ask the AI Recruitment Assistant questions
                    about DevHire hiring data.
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                  <Link
                    to="/matching"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
                  >
                    View Matches
                    <ChevronRight size={17} />
                  </Link>

                  <Link
                    to="/ai-assistant"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/20"
                  >
                    <Bot size={17} />
                    Ask AI
                  </Link>
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