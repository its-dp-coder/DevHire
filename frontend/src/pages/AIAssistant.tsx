import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowLeft,
  Bot,
  Loader2,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

import api from "../services/api";

type RAGResponse = {
  answer: string;
  sources: string[];
};

type Job = {
  id: number;
  title: string;
  required_skills?: string | null;
  description?: string | null;
};

function AIAssistant() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const response = await api.get<Job[]>("/jobs");

        const jobs = Array.isArray(response.data)
          ? response.data
          : [];

        const generatedSuggestions: string[] = [];

        jobs.forEach((job) => {
          if (!job.title) {
            return;
          }

          generatedSuggestions.push(
            `Find candidates for ${job.title}`,
          );

          if (job.required_skills) {
            const skills = job.required_skills
              .split(/[,;\n]/)
              .map((skill) => skill.trim())
              .filter(Boolean);

            if (skills.length > 0) {
              generatedSuggestions.push(
                `Find candidates with ${skills[0]} skills`,
              );
            }

            if (skills.length > 1) {
              generatedSuggestions.push(
                `Which candidates match the ${job.title} role?`,
              );
            }
          }
        });

        const uniqueSuggestions = [
          ...new Set(generatedSuggestions),
        ];

        setSuggestions(uniqueSuggestions.slice(0, 4));
      } catch {
        setSuggestions([
          "Which jobs are currently available?",
          "Find candidates with relevant skills",
          "Which candidates match my jobs?",
          "Help me review the available candidates",
        ]);
      }
    };

    loadSuggestions();
  }, []);

  const askAssistant = async (question: string) => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      setAnswer("");
      setSources([]);
      setSubmittedQuery(trimmedQuestion);

      const response = await api.post<RAGResponse>("/ai/ask", {
        query: trimmedQuestion,
      });

      setAnswer(response.data.answer);
      setSources(response.data.sources);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Unable to get a response from the AI assistant.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const currentQuery = query;
    setQuery("");

    await askAssistant(currentQuery);
  };

  const handleSuggestion = async (suggestion: string) => {
    setQuery("");
    await askAssistant(suggestion);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
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

      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        {/* Hero */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
            <Bot size={28} />
          </div>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
            <Sparkles size={13} />
            AI Recruitment Assistant
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ask DevHire AI
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Ask questions about jobs and candidates using DevHire's
            hiring data.
          </p>
        </div>

        {/* Dynamic Suggestions */}
        {!answer && !loading && suggestions.length > 0 && (
          <div className="mb-8 grid gap-3 sm:grid-cols-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSuggestion(suggestion)}
                className="rounded-xl border border-white/10 bg-slate-900/60 p-4 text-left text-sm text-slate-400 transition hover:border-blue-500/30 hover:bg-slate-900 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <Sparkles
                    size={16}
                    className="shrink-0 text-blue-400"
                  />

                  <span>{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Chat */}
        <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 sm:p-7">
          {/* User Query */}
          {submittedQuery && (
            <div className="mb-6 flex justify-end">
              <div className="flex max-w-3xl items-start gap-3">
                <div className="rounded-2xl rounded-tr-md bg-blue-600 px-5 py-3 text-sm leading-6 text-white">
                  {submittedQuery}
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                  <User size={17} />
                </div>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-950/50 p-5 text-sm text-slate-400">
              <Loader2
                size={20}
                className="animate-spin text-blue-400"
              />

              DevHire AI is analyzing the hiring data...
            </div>
          )}

          {/* Answer */}
          {answer && !loading && (
            <div className="mb-6">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <Bot size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-200">
                      DevHire AI
                    </span>

                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                      GROUNDED
                    </span>
                  </div>

                  <div className="rounded-2xl rounded-tl-md border border-white/10 bg-slate-950/60 p-5 text-sm leading-7 text-slate-300 whitespace-pre-wrap">
                    {answer}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sources */}
          {sources.length > 0 && !loading && (
            <div className="mb-6 ml-12">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Retrieved Sources
              </p>

              <div className="space-y-2">
                {sources.map((source, index) => (
                  <div
                    key={`${source}-${index}`}
                    className="rounded-xl border border-white/5 bg-slate-950/40 p-4 text-xs leading-5 text-slate-500"
                  >
                    <span className="mr-2 font-semibold text-blue-400">
                      Source {index + 1}
                    </span>

                    {source}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-400">
              {error}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ask about candidates, jobs, skills..."
              disabled={loading}
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50 disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <Send size={18} />
              )}

              Ask AI
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AIAssistant;