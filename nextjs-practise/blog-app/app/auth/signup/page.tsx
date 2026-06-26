"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import Link from "next/link"

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    console.log("Sign up data:", formData)
  }

  return (
    <div className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 border-t-4 border-orange-500 rounded-3xl p-8 shadow-2xl shadow-orange-500/10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-500 mb-3">Create account</h1>
          <p className="text-gray-300 text-lg sm:text-xl">Start your journey with a secure account and unlock blogging tools.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter a strong password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-2xl bg-orange-500 px-6 py-3 text-base font-semibold text-gray-900 transition hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30"
          >
            Sign up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-semibold text-orange-500 hover:text-orange-400">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage
