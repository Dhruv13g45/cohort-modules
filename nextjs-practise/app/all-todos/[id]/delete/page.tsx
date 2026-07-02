"use client"
import React from "react";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { deleteTodo } from "@/app/actions/todo-actions";

const DeleteTodoConfirmationPage = () => {

  const params = useParams()

  const handleDelete = async() => {


    const todoId = String(params?.id)

    const response = await deleteTodo(todoId)

    console.log("Delete response:", response.message);

    redirect("/all-todos")

  }
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <section className="rounded-3xl border border-slate-800/80 bg-slate-900/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.55)]">
          <div className="mb-4">
            <p className="inline-flex rounded-full bg-rose-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-rose-300">
              Danger zone
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-slate-100">Delete todo</h1>
            <p className="mt-2 text-sm text-slate-400">This action cannot be undone. Confirm below to permanently remove this todo.</p>
          </div>


          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-2xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
              onClick={handleDelete}
            >
              Delete permanently
            </button>

            <Link href="/all-todos" className="ml-auto rounded-2xl border border-slate-700 bg-slate-800/90 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-600 hover:bg-slate-700">
              Cancel
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default DeleteTodoConfirmationPage;