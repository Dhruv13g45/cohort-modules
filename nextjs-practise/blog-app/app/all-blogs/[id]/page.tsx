import React from 'react'
import Link from 'next/link'

const SingleBlogPage = async({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  
  // TODO: Fetch blog data by id
  const blog = {
    id,
    title: "Blog Title",
    content: "Blog content goes here"
  };

  return (
    <div className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Blog Post Container */}
        <article className="bg-gray-800 border-t-4 border-orange-500 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-orange-500/10 mb-8">
          {/* Blog Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-500 mb-6">
            {blog.title}
          </h1>

          {/* Blog Meta Info */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-700">
            <span>Blog ID: {id}</span>
          </div>

          {/* Blog Content */}
          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </p>
          </div>
        </article>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Link href={`/all-blogs`}>
            <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl border-2 border-gray-600 hover:border-gray-500 bg-gray-800 px-8 py-3 text-base font-semibold text-gray-300 hover:text-gray-100 transition">
              ← Back to Blogs
            </button>
          </Link>
          
          <Link href={`/all-blogs/${id}/edit`}>
            <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-orange-500 hover:bg-orange-600 px-8 py-3 text-base font-semibold text-gray-900 transition hover:shadow-lg hover:shadow-orange-500/30">
              ✎ Edit Blog
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SingleBlogPage