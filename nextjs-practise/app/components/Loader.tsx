import React from "react";

const Loader = () => {
  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.5)]">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 p-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-400" />
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-100">Loading your todos</p>
          <p className="text-sm text-slate-400">Hang tight while we fetch your tasks and prepare the dashboard.</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
