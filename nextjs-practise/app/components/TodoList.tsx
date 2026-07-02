"use client";
import React, { useEffect } from "react";
import { getAlltodos } from "../actions/todo-actions";
import { redirect } from "next/navigation";

const TodoList = () => {
  const [todos, setTodos] = React.useState<any[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getAlltodos();
      console.log("All todos fetched from the database:", response);

      if (typeof response !== "string" && Array.isArray(response.todos)) {
        setTodos(response.todos);
      } else {
        setTodos([]);
      }
    };

    fetchTodos();
  }, []);

  return (
    <section className="rounded-3xl border border-slate-800/80 bg-slate-900/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.55)]">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-indigo-300">
            Your tasks
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-100">
            Active todo list
          </h2>
        </div>
        <p className="text-sm text-slate-400 max-w-md">
          View your current tasks in a calm, distraction-free list with status
          and due dates clearly highlighted.
        </p>
      </div>

      <div className="space-y-4">
        {todos.map((todo) => (
          <article key={todo.id} className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-5 shadow-[0_12px_35px_rgba(15,23,42,0.3)] transition hover:border-slate-700">
            <div className="flex flex-col gap-4 sm:items-center sm:justify-between sm:flex-row">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-100">{todo.title}</h3>
                <p className="text-slate-400 leading-7">{todo.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                <span className={`rounded-2xl border px-3 py-2 text-slate-100 ${
                  todo.priority === "High"
                    ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
                    : todo.priority === "Low"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                    : "border-slate-600/70 bg-slate-700/80 text-slate-200"
                }`}>
                  {todo.priority}
                </span>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <span className={`rounded-full px-3 py-1 font-medium ${todo.completed ? "bg-emerald-500/10 text-emerald-300" : "bg-indigo-500/10 text-indigo-300"}`}>
                {todo.completed ? "Completed" : "In progress"}
              </span>
              <button className="ml-auto rounded-2xl border border-slate-700 bg-slate-800/90 px-4 py-2 text-slate-100 transition hover:border-slate-600 hover:bg-slate-700" onClick={() => redirect(`/all-todos/${todo.id}`)}>
                Manage
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TodoList;
