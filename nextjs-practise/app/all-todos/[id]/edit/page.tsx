import React from "react";
import Link from "next/link";

const EditSingleTodo = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <section className="rounded-3xl border border-slate-800/80 bg-slate-900/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.55)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="inline-flex rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-indigo-300">
                Edit task
              </p>
              <h1 className="mt-3 text-2xl font-semibold text-slate-100">Edit todo</h1>
            </div>
            <Link href="/all-todos" className="rounded-2xl border border-slate-700 bg-slate-800/90 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-600 hover:bg-slate-700">
              Cancel
            </Link>
          </div>

          <form className="space-y-5">
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              Title
              <input
                type="text"
                name="title"
                defaultValue="Review design assets"
                className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-slate-300">
              Notes
              <textarea
                rows={4}
                name="description"
                defaultValue="Finalize the UI details and push the latest updates to the todo workflow."
                className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-slate-300">
                Priority
                <select name="priority" defaultValue="Normal" className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20">
                  <option>Normal</option>
                  <option>High</option>
                  <option>Low</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm text-slate-300">
                Due date
                <input
                  type="text"
                  name="dueDate"
                  defaultValue="Today"
                  className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                />
              </label>
            </div>

            <div className="flex gap-3">
              <button type="submit" className="rounded-2xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400">Save changes</button>
              <Link href="/all-todos" className="ml-auto rounded-2xl border border-slate-700 bg-slate-800/90 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-600 hover:bg-slate-700">Back</Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default EditSingleTodo;