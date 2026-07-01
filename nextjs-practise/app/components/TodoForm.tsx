"use client"

import React, { useState } from "react";
// import { addTodo } from "../actions/todo-actions";

const TodoForm = () => {


    const initialFormData = {
        title: "",
        description: "",
        priority: "Normal"
    }

    const [formData, setFormData] = useState(initialFormData);

    const handleFormSubmit = (formDataObj: FormData) =>{
      // addTodo(formDataObj)

      setFormData(initialFormData)
    }


  return (
    <section className="rounded-3xl border border-slate-800/80 bg-slate-900/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.55)] backdrop-blur-xl max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="inline-flex rounded-full bg-indigo-500/15 px-4 py-1 text-sm font-medium uppercase tracking-[0.3em] text-indigo-300">
          New todo
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-50">Add a task in seconds</h2>
        <p className="mt-2 max-w-xl text-slate-400">
          Create a quick todo, set the priority, and keep your daily workflow organized with a clean dark input experience.
        </p>
      </div>

      <form className="space-y-5" action={handleFormSubmit}>
        <div className="grid gap-4 sm:grid-cols-[1.5fr_0.8fr]">
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            Task
            <input
              type="text"
              name="title"
              placeholder="e.g. Plan sprint meeting"
              className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
              value={formData.title}
              onChange={(e)=> setFormData({...formData, [e.target.name]: e.target.value})}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            Priority
            <select 
              className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
              value={formData.priority}
              name="priority"
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value})}
            >
              <option>Normal</option>
              <option>High</option>
              <option>Low</option>
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Notes
          <textarea
            rows={4}
            placeholder="Add any notes or details for this task"
            className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value})}
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="submit" className="rounded-2xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
            >
              Add task
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default TodoForm;