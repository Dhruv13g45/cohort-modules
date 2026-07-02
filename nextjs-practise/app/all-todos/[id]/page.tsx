"use client"
import React, { useEffect, useState } from "react";
import TodoCard from "../../components/TodoCard";
import Link from "next/link";
import { getSingleTodo } from "@/app/actions/todo-actions";
import { useParams } from "next/navigation";

const ViewSingleTodo =  () => {

  const [todo, setTodo] = useState<any>({});

  const params = useParams()

  const todoId = String(params?.id)

  useEffect(() => {
    const fetchSingleTodo = async () => {
      const response = await getSingleTodo(todoId)

      const todoData = response?.todo

      console.log("Single todo data:", todoData);

      if(todoData.length === 0){
        setTodo({})
      }

      setTodo(todoData[0])
    }

    fetchSingleTodo()
  }, [todoId])


  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-12">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.55)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="inline-flex rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-indigo-300">
                Task detail
              </p>
              <h1 className="mt-3 text-2xl font-semibold text-slate-100">View todo</h1>
            </div>
            <Link
              href="/all-todos"
              className="rounded-2xl border border-slate-700 bg-slate-800/90 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-600 hover:bg-slate-700"
            >
              Back
            </Link>
          </div>

          {todo && <TodoCard todo={todo} />}
        </div>
      </div>
    </main>
  );
};

export default ViewSingleTodo;