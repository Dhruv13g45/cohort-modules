'use client';

import { loginUser } from '@/app/actions/auth-actions';
import Link from 'next/link';
import { useState } from 'react';

const UserLoginPage = () => {
  const initialFormData = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleLogin = async(formData: FormData) => {
    const result = await loginUser(formData)
    console.log(result)
    setFormData(initialFormData);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-slate-100">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-800/80 bg-slate-900/90 p-10 shadow-[0_20px_80px_rgba(15,23,42,0.65)] backdrop-blur-xl">
        <div className="mb-10 space-y-4">
          <p className="inline-flex rounded-full bg-indigo-500/15 px-4 py-1 text-sm font-medium uppercase tracking-[0.3em] text-indigo-300">
            Welcome back
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Log in to your account
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Access your todos and continue organizing your day in a calm, modern workspace.
          </p>
        </div>

        <form className="space-y-6" action={handleLogin}>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            Email address
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-slate-300">
            Password
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
          >
            Log in
          </button>

          <p className="text-center text-sm text-slate-400">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="font-semibold text-indigo-300 transition hover:text-indigo-200">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default UserLoginPage;