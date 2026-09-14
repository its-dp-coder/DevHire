import {
  ArrowRight,
  Brain,
  BriefcaseBusiness,
  CheckCircle2,
  Menu,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import Dashboard from "./pages/Dashboard";
import JobDetails from "./pages/JobDetails";
import Profile from "./pages/Profile";
import Matching from "./pages/Matching";
import Resume from "./pages/Resume";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CreateJob from "./pages/CreateJob";
import Applications from "./pages/Applications";
import Company from "./pages/Company";
import AIAssistant from "./pages/AIAssistant";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="text-2xl font-bold tracking-tight"
        >
          Dev<span className="text-blue-500">Hire</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="/#features"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="/#how-it-works"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            How it works
          </a>

          <Link
            to="/jobs"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Jobs
          </Link>

          <Link
            to="/login"
            className="text-sm font-medium text-slate-300 transition hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-500"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-white/10 p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-950 px-5 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            <a
              href="/#features"
              onClick={() => setOpen(false)}
              className="text-slate-300"
            >
              Features
            </a>

            <a
              href="/#how-it-works"
              onClick={() => setOpen(false)}
              className="text-slate-300"
            >
              How it works
            </a>

            <Link
              to="/jobs"
              onClick={() => setOpen(false)}
              className="text-slate-300"
            >
              Jobs
            </Link>

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="text-slate-300"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <Navbar />

      <main>
        <section className="relative px-5 pb-20 pt-36 sm:px-6 sm:pt-40 lg:px-8 lg:pt-48">
          <div className="absolute left-1/2 top-20 -z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
                <Sparkles size={16} />
                AI-Powered Developer Hiring Platform
              </div>

              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
                Hire the right
                <span className="block text-blue-500">
                  developers.
                </span>
                <span className="block">
                  Build faster.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
                DevHire helps companies discover, evaluate,
                and hire developers using intelligent matching,
                candidate profiles, recruitment workflows,
                and AI-powered hiring assistance.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold transition hover:bg-blue-500"
                >
                  Start Hiring
                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/jobs"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-white/[0.02] px-6 py-3.5 font-semibold transition hover:border-slate-600 hover:bg-white/[0.05]"
                >
                  <Search size={18} />
                  Explore Jobs
                </Link>
              </div>
            </div>

            <div className="mt-20 grid gap-4 sm:grid-cols-3">
              <StatCard
                icon={<Brain size={21} />}
                value="AI"
                label="Smart matching"
              />

              <StatCard
                icon={<Sparkles size={21} />}
                value="RAG"
                label="Recruitment assistant"
              />

              <StatCard
                icon={<BriefcaseBusiness size={21} />}
                value="Fast"
                label="Hiring workflow"
              />
            </div>
          </div>
        </section>

        <section
          id="features"
          className="border-y border-white/5 bg-slate-900/30 px-5 py-24 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                Everything you need
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                A modern hiring workflow
              </h2>

              <p className="mt-4 text-slate-400">
                From discovering candidates to making the final
                hiring decision, DevHire keeps the workflow simple.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Brain />}
                title="AI Job Matching"
                description="Automatically compare candidate skills against job requirements and rank relevant opportunities."
              />

              <FeatureCard
                icon={<Users />}
                title="Candidate Profiles"
                description="Create structured developer profiles with skills, experience, education, and resumes."
              />

              <FeatureCard
                icon={<BriefcaseBusiness />}
                title="Recruitment Workflow"
                description="Manage jobs, applications, candidate status, and hiring decisions in one platform."
              />

              <FeatureCard
                icon={<Sparkles />}
                title="AI Recruitment Assistant"
                description="Ask questions about hiring data and get grounded answers using the recruitment knowledge base."
              />

              <FeatureCard
                icon={<CheckCircle2 />}
                title="Secure Authentication"
                description="JWT authentication and role-based access keep candidate and recruiter actions protected."
              />

              <FeatureCard
                icon={<Search />}
                title="Developer Discovery"
                description="Give developers a clean way to discover active opportunities that match their skills."
              />
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="px-5 py-24 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                Simple process
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                How DevHire works
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              <StepCard
                number="01"
                title="Create your profile"
                description="Developers showcase their skills, experience, education, and resume."
              />

              <StepCard
                number="02"
                title="Find the right match"
                description="Our matching engine compares developer skills with active job requirements."
              />

              <StepCard
                number="03"
                title="Apply and hire"
                description="Candidates apply while recruiters manage applications through the hiring pipeline."
              />
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/20 via-slate-900 to-slate-900 p-8 sm:p-12 lg:p-16">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                Ready to build better teams?
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
                Find your next developer with DevHire.
              </h2>

              <p className="mt-5 text-slate-400">
                Create an account and experience the complete
                AI-powered hiring workflow.
              </p>

              <Link
                to="/register"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold transition hover:bg-blue-500"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 px-5 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 DevHire. Built for modern developer hiring.
          </p>

          <p>
            AI • FastAPI • React • PostgreSQL
          </p>
        </div>
      </footer>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition hover:-translate-y-1 hover:border-blue-500/30">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
          {icon}
        </div>

        <div>
          <p className="text-xl font-bold">
            {value}
          </p>

          <p className="text-sm text-slate-500">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-slate-900">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition group-hover:bg-blue-500/20">
        {icon}
      </div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-7">
      <span className="text-sm font-bold text-blue-500">
        {number}
      </span>

      <h3 className="mt-5 text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}

function App() {
  return (
<Routes>
  <Route path="/" element={<Home />} />

  <Route path="/login" element={<Login />} />

  <Route path="/register" element={<Register />} />

  <Route path="/dashboard" element={<Dashboard />} />

  <Route path="/recruiter" element={<RecruiterDashboard />} />
<Route path="/recruiter/jobs/new" element={<CreateJob />} />
  <Route path="/profile" element={<Profile />} />

  <Route path="/matching" element={<Matching />} />

  <Route path="/resume" element={<Resume />} />
<Route path="/applications" element={<Applications />} />
<Route path="/company" element={<Company />} />
<Route path="/ai-assistant" element={<AIAssistant />} />
  <Route path="/jobs" element={<Jobs />} />

  <Route path="/jobs/:jobId" element={<JobDetails />} />

  <Route
    path="*"
    element={<Navigate to="/" replace />}
  />
</Routes>
  );

}

export default App;