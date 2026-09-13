import { useEffect, useState } from "react";
import {
  CheckCircle2,
  FileText,
  Loader2,
  Upload,
} from "lucide-react";

import api from "../services/api";

type ResumeItem = {
  id: number;
  file_name: string;
  file_url: string;
  file_type: string;
  created_at: string;
};

function Resume() {
  const [resumes, setResumes] = useState<ResumeItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchResumes = async () => {
    try {
      setFetching(true);
      setError("");

      const response = await api.get<ResumeItem[]>("/resumes");

      setResumes(response.data);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Failed to load your resumes.",
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a PDF or DOCX file.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const formData = new FormData();

      formData.append("file", selectedFile);

      await api.post("/resumes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Resume uploaded successfully.");
      setSelectedFile(null);

      const fileInput = document.getElementById(
        "resume-file",
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }

      await fetchResumes();
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Failed to upload resume.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <FileText size={24} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Resume
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Upload your latest resume to keep your developer profile
            up to date.
          </p>
        </div>

        {/* Upload Card */}
        <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Upload Resume
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Supported formats: PDF and DOCX.
            </p>
          </div>

          <div className="rounded-xl border border-dashed border-white/15 bg-slate-950/50 p-6">
            <label
              htmlFor="resume-file"
              className="flex cursor-pointer flex-col items-center justify-center text-center"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                <Upload size={25} />
              </div>

              <p className="font-medium text-slate-200">
                Choose your resume
              </p>

              <p className="mt-1 text-sm text-slate-500">
                PDF or DOCX
              </p>

              <input
                id="resume-file"
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="mt-5 block w-full max-w-sm cursor-pointer rounded-lg border border-white/10 bg-slate-900 text-sm text-slate-400 file:mr-4 file:border-0 file:bg-blue-600 file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-white hover:file:bg-blue-500"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;

                  setSelectedFile(file);
                  setError("");
                  setSuccess("");
                }}
              />
            </label>
          </div>

          {selectedFile && (
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
              <FileText className="h-5 w-5 shrink-0 text-blue-400" />

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-200">
                  {selectedFile.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">
              <CheckCircle2 size={18} />
              {success}
            </div>
          )}

          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || loading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={18} />
                Upload Resume
              </>
            )}
          </button>
        </section>

        {/* Resume List */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Your Resumes
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Resumes uploaded to your DevHire profile.
            </p>
          </div>

          {fetching ? (
            <div className="flex items-center justify-center py-10 text-slate-500">
              <Loader2
                size={22}
                className="mr-2 animate-spin"
              />
              Loading resumes...
            </div>
          ) : resumes.length === 0 ? (
            <div className="rounded-xl border border-white/5 bg-slate-950/40 px-5 py-10 text-center">
              <FileText
                size={30}
                className="mx-auto text-slate-600"
              />

              <p className="mt-3 text-sm font-medium text-slate-400">
                No resumes uploaded yet.
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Upload your resume above to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="flex flex-col gap-4 rounded-xl border border-white/10 bg-slate-950/50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                      <FileText size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-200">
                        {resume.file_name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {resume.file_type || "Resume"} •{" "}
                        {new Date(
                          resume.created_at,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`http://localhost:8000${resume.file_url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center justify-center rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                  >
                    View Resume
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Resume;