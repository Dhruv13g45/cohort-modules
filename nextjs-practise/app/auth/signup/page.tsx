"use client"
import { signUpUser } from "@/app/actions/auth-actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

const SignUpForm = () => {

  const initialFormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "", 
  }

  const [formData, setFormData] = useState(initialFormData)

  const handleSignUp = async(formData: FormData) =>{
    const result = await signUpUser(formData)
    console.log(result)
    setFormData(initialFormData)
    redirect("/all-todos")
  }


  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl rounded-3xl border border-slate-800/80 bg-slate-900/90 p-10 shadow-[0_20px_80px_rgba(15,23,42,0.65)] backdrop-blur-xl">
        <div className="mb-10 space-y-4">
          <p className="inline-flex rounded-full bg-indigo-500/15 px-4 py-1 text-sm font-medium uppercase tracking-[0.3em] text-indigo-300">
            New account
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Create your account
          </h1>
          <p className="max-w-2xl text-slate-400 leading-7">
            Sign up to start organizing your todos in a clean, fast, and modern dark interface.
          </p>
        </div>

        <form className="space-y-6" action={handleSignUp}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              Full name
              <input
                type="text"
                name="name"
                placeholder="Jane Doe"
                className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                value={formData.name}
                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              Email address
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                value={formData.email}
                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              Password
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                value={formData.password}
                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              Confirm password
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
          >
            Create account
          </button>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-semibold text-indigo-300 transition hover:text-indigo-200">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default SignUpForm;