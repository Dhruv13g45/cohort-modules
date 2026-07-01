import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl rounded-3xl border border-slate-800/80 bg-slate-900/90 p-10 shadow-[0_20px_80px_rgba(15,23,42,0.65)] backdrop-blur-xl">
        <div className="mb-10 space-y-6">
          <p className="inline-flex rounded-full bg-indigo-500/15 px-4 py-1 text-sm font-medium uppercase tracking-[0.3em] text-indigo-300">
            Productivity first
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Build better habits with a clean, fast todo experience.
          </h1>
          <p className="max-w-2xl text-slate-300 text-lg leading-8">
            Manage your tasks with confidence and clarity. Log in to sync your todos or create a new account and start organizing your day with a modern dark-themed planner.
          </p>
        </div>

        <div className="grid gap-4 sm:max-w-sm sm:grid-cols-2">
          <Link
            href="/auth/login"
            className="flex items-center justify-center rounded-2xl bg-indigo-500 px-5 py-4 text-base font-semibold text-white transition hover:bg-indigo-400"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/90 px-5 py-4 text-base font-semibold text-slate-100 transition hover:border-slate-600 hover:bg-slate-700"
          >
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
