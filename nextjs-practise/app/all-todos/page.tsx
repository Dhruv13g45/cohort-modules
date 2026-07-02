import React from "react";
import Link from "next/link";
import TodoList from "../components/TodoList";

const AllTodos = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-12">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <section className="rounded-3xl border border-slate-800/80 bg-slate-900/90 p-10 shadow-[0_20px_80px_rgba(15,23,42,0.65)] backdrop-blur-xl">
          <div className="mb-6 space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="inline-flex rounded-full bg-indigo-500/15 px-4 py-1 text-sm font-medium uppercase tracking-[0.3em] text-indigo-300">
                  All todos
                </p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Your todo dashboard</h1>
              </div>
              <Link
                href="/all-todos/new"
                className="inline-flex items-center justify-center rounded-2xl border border-indigo-500 bg-indigo-500/15 px-5 py-3 text-sm font-semibold text-indigo-100 transition hover:border-indigo-400 hover:bg-indigo-500/20"
              >
                Create new todo
              </Link>
            </div>
            <p className="max-w-3xl text-slate-400 leading-7">
              Browse every task in one place with clear priorities, due dates, and status badges.
              Keep your workflow focused with a clean dark layout built for productive task management.
            </p>
          </div>
        </section>

        <TodoList />
      </div>
    </main>
  );
};

export default AllTodos;
