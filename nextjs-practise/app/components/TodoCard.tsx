import React from "react";

interface TodoCardProps {
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: "Low" | "Normal" | "High";
  completed?: boolean;
}

const TodoCard = ({
  title = "Review design assets",
  description = "Finalize the UI details and push the latest updates to the todo workflow.",
  dueDate = "Today",
  priority = "Normal",
  completed = false,
}: TodoCardProps) => {
  const priorityStyles = {
    Low: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    Normal: "bg-slate-700/80 text-slate-100 border-slate-600/80",
    High: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  };

  return (
    <article className="rounded-3xl border border-slate-800/80 bg-slate-900/90 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.55)] transition hover:-translate-y-0.5 hover:border-slate-700">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-950/70 px-3 py-1 font-medium text-slate-300">
              {completed ? "Completed" : "Pending"}
            </span>
            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${priorityStyles[priority]}`}>
              {priority}
            </span>
          </div>
          <h3 className="text-2xl font-semibold text-slate-100">{title}</h3>
          <p className="max-w-xl text-slate-400 leading-7">{description}</p>
        </div>
        <div className="text-right text-sm text-slate-400">
          <p className="text-slate-200 font-semibold">Due</p>
          <p className="mt-1 text-lg">{dueDate}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button className="rounded-2xl border border-slate-700 bg-slate-800/90 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-600 hover:bg-slate-700">
          Edit
        </button>
        <button className="rounded-2xl border border-slate-700 bg-slate-800/90 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-600 hover:bg-slate-700">
          Delete
        </button>
        <span className="ml-auto rounded-2xl bg-slate-950/90 px-4 py-2 text-sm text-slate-300">
          {completed ? "Saved" : "Work in progress"}
        </span>
      </div>
    </article>
  );
};

export default TodoCard;
