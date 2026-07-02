"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {redirect, useParams} from "next/navigation"
import { getSingleTodo, updateTodo } from "@/app/actions/todo-actions";

const EditSingleTodo = () => {

  const params = useParams()

  const [todo, setTodo] = useState({
    id: 0,
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    completed: false,
    userId: 0,
  })

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    completed: false
  })

  const todoId = String(params?.id)

  useEffect(() => {
    const fetchSingleTodo = async () => {
      const response = await getSingleTodo(todoId)
      const responseTodo = response?.todo
      const todoData = Array.isArray(responseTodo) ? responseTodo[0] : responseTodo

      if (!todoData) return

      const completed = todoData.completed ?? false

      setTodo({
        ...todoData,
        dueDate: todoData.dueDate ? String(todoData.dueDate) : "",
        completed,
        userId: todoData.userId ?? 0,
        priority: String(todoData.priority),
      })

      setFormData({
        title: String(todoData.title ?? ""),
        description: String(todoData.description ?? ""),
        priority: String(todoData.priority ?? "low"),
        dueDate: todoData.dueDate ? String(todoData.dueDate) : "",
        completed,
      })

      console.log("Single todo data:", todoData)
    }

    fetchSingleTodo()
  }, [])



  const handleTodoEdit = async (e: React.FormEvent<HTMLButtonElement>)=>{
    e.preventDefault()

    const updatedTodoData = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      updatedTodoData.append(key, String(value))
    })

    console.log("Updated todo data:", updatedTodoData);

    const response = await updateTodo(todoId, updatedTodoData);

    const updatedTodo = response?.data

    console.log("Updated todo response:", updatedTodo);

    redirect("/all-todos")

  }

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
                value={formData?.title}
                onChange={(e)=> setFormData({...formData, title: e.target.value})}
                className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-slate-300">
              Notes
              <textarea
                rows={4}
                name="description"
                value={formData?.description}
                onChange={(e)=> setFormData({...formData, description: e.target.value})}
                className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-slate-300">
                Priority
                <select name="priority" value={formData?.priority}
                onChange={(e)=> setFormData({...formData, priority: e.target.value})} className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20">
                  <option>medium</option>
                  <option>high</option>
                  <option>low</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm text-slate-300">
                Due date
                <input
                  type="date"
                  name="dueDate"
                  value={formData?.dueDate}
                  onChange={(e)=> setFormData({...formData, dueDate: e.target.value})}
                  className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                />
              </label>
            </div>

            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
                className="h-5 w-5 rounded border-slate-700 bg-slate-950 text-indigo-500 focus:ring-indigo-500"
              />
              Completed
            </label>

            <div className="flex gap-3">
              <button type="submit" onClick={handleTodoEdit} className="rounded-2xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400">Save changes</button>
              <Link href="/all-todos" className="ml-auto rounded-2xl border border-slate-700 bg-slate-800/90 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-600 hover:bg-slate-700">Back</Link>
            </div>
          </form>
        </section>
      </div>
    </main> 
  );
};

export default EditSingleTodo;