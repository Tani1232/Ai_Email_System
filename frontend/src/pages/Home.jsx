import { useState } from "react";
import api from "../services/api";

function Home() {
  const [email, setEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");
  const [objective, setObjective] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    const trimmed = email.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const response = await api.post("/generate-email", {
        email: trimmed,
        tone,
        length,
        objective,
        sender_name: senderName.trim(),
      });
      setGeneratedEmail(response.data.generated_email);
    } catch {
      setError("Something went wrong. Check the address and try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!generatedEmail) return;
    try {
      await navigator.clipboard.writeText(generatedEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") generate();
  };

  const fieldClass =
    "w-full rounded-xl border border-white/10 bg-zinc-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/25";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0c0f14] text-zinc-100">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-violet-600/25 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-cyan-500/15 blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[80px]"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-10 sm:px-8 sm:py-14">
        <header className="animate-fade-up mb-10 text-center sm:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-violet-200/90">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            Personalized outreach in seconds
          </div>
          <h1
            className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            AI Email Outreach
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
            Enter a prospect&apos;s email. We&apos;ll craft a tailored message
            you can send with confidence.
          </p>
        </header>

        <main className="animate-fade-up-delay flex flex-1 flex-col gap-6">
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20 backdrop-blur-md sm:p-8">
            <label
              htmlFor="prospect-email"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Prospect email
            </label>
            <div className="relative">
              <span
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                aria-hidden
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                  <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                </svg>
              </span>
              <input
                id="prospect-email"
                type="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="john.doe@company.com"
                className={`${fieldClass} pl-11`}
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="sender-name"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Your name
              </label>
              <input
                id="sender-name"
                type="text"
                autoComplete="name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Alex Morgan"
                className={fieldClass}
              />
              <p className="mt-1.5 text-xs text-zinc-500">
                Shown after &ldquo;Regards,&rdquo; in the generated email.
              </p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="tone"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Tone
                </label>
                <select
                  id="tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className={`${fieldClass} cursor-pointer`}
                >
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Formal</option>
                  <option>Sales</option>
                  <option>Technical</option>
                  <option>Executive</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="length"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Length
                </label>
                <select
                  id="length"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className={`${fieldClass} cursor-pointer`}
                >
                  <option>Short</option>
                  <option>Medium</option>
                  <option>Long</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="objective"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Objective
              </label>
              <textarea
                id="objective"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="Introduce our AI platform"
                rows={4}
                className={`${fieldClass} resize-y min-h-[6rem]`}
              />
            </div>

            <button
              type="button"
              onClick={generate}
              disabled={loading || !email.trim()}
              className="btn-shimmer mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none sm:w-auto sm:min-w-[12rem]"
            >
                {loading ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Generating…
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden
                    >
                      <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.154.75.75 0 0 0 0-1.115A28.897 28.897 0 0 0 3.105 2.288Z" />
                    </svg>
                    Generate email
                  </>
                )}
            </button>
            {error && (
              <p
                className="mt-3 text-sm text-rose-400"
                role="alert"
              >
                {error}
              </p>
            )}
          </section>

          <section className="animate-fade-up-delay-2 flex min-h-[320px] flex-1 flex-col rounded-2xl border border-white/10 bg-white/[0.03] shadow-xl shadow-black/20 backdrop-blur-md">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-zinc-300">
                  Draft preview
                </span>
                {generatedEmail && !loading && (
                  <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-300">
                    Ready
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={copyToClipboard}
                disabled={!generatedEmail}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {copied ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-3.5 w-3.5 text-emerald-400"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.895 3.893 7.482-9.817a.75.75 0 0 1 1.05-.143Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-3.5 w-3.5"
                      aria-hidden
                    >
                      <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .44 1.06V12.5A1.5 1.5 0 0 1 14.5 14h-1v1.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3.5 15v-7A1.5 1.5 0 0 1 5 6.5h1v-3Z" />
                      <path d="M5 7.5A1.5 1.5 0 0 1 6.5 6h7.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .44 1.06V14.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 6.5 13v-5.5Z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className="relative flex flex-1 flex-col p-5 sm:p-6">
              {!generatedEmail && !loading && (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] text-zinc-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-7 w-7"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                  </div>
                  <p className="max-w-xs text-sm text-zinc-500">
                    Your generated outreach will appear here. Add an email above
                    to get started.
                  </p>
                </div>
              )}

              {loading && (
                <div className="flex flex-1 flex-col gap-3 py-2">
                  <div className="h-3 w-3/4 animate-pulse rounded bg-white/10" />
                  <div className="h-3 w-full animate-pulse rounded bg-white/10" />
                  <div className="h-3 w-5/6 animate-pulse rounded bg-white/10" />
                  <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-white/10" />
                  <div className="h-3 w-full animate-pulse rounded bg-white/10" />
                  <p className="mt-4 text-center text-xs text-zinc-500">
                    Researching context and writing your draft…
                  </p>
                </div>
              )}

              {generatedEmail && !loading && (
                <textarea
                  readOnly
                  value={generatedEmail}
                  className="min-h-[280px] w-full flex-1 resize-none rounded-xl border border-white/5 bg-zinc-950/40 p-4 text-sm leading-relaxed text-zinc-200 outline-none"
                />
              )}
            </div>
          </section>
        </main>

        <footer className="mt-10 text-center text-xs text-zinc-600">
          Built for thoughtful cold outreach — review before you send.
        </footer>
      </div>
    </div>
  );
}

export default Home;
