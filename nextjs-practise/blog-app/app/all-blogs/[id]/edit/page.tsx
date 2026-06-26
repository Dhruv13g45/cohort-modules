"use client";
import React, { useState, useEffect } from 'react';

const EditSingleBlog = ({ params }: { params: Promise<{ id: string }> }) => {
  const [id, setId] = useState<string | null>(null);
  const [titleCount, setTitleCount] = useState(0);
  const [contentCount, setContentCount] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchParams = async () => {
      const { id } = await params;
      setId(id);
      // TODO: Fetch blog data by id and populate formData
    };
    fetchParams();
  }, [params]);

  const handleFormSubmission = async (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Call updateBlog action with formData
  };

  return (
    <div className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-gray-800 border-t-4 border-orange-500 rounded-3xl p-8 shadow-2xl shadow-orange-500/10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-500 mb-3">
            Edit Blog Post
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl">
            Update your story with bold orange accents and a sleek dark layout.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleFormSubmission}>
          <div>
            <label htmlFor="blogTitle" className="block text-sm font-semibold text-gray-300 mb-2">
              Blog Title
            </label>
            <input
              type="text"
              name="blogTitle"
              id="blogTitle"
              placeholder="Enter the title of the blog"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                setTitleCount(e.target.value.length);
              }}
              className="w-full rounded-2xl border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
              <span className="text-gray-400">Title length</span>
              <span className="text-orange-500 font-semibold">{titleCount} chars</span>
            </div>
          </div>

          <div>
            <label htmlFor="blogContent" className="block text-sm font-semibold text-gray-300 mb-2">
              Blog Content
            </label>
            <textarea
              name="blogContent"
              id="blogContent"
              placeholder="Enter the content of the blog"
              value={formData.content}
              onChange={(e) => {
                setFormData({ ...formData, content: e.target.value });
                setContentCount(e.target.value.length);
              }}
              className="w-full min-h-[220px] rounded-2xl border border-gray-700 bg-gray-900 px-4 py-4 text-gray-100 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            ></textarea>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
              <span className="text-gray-400">Content length</span>
              <span className="text-orange-500 font-semibold">{contentCount} chars</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-gray-400">Total characters: <span className="text-orange-500 font-semibold">{titleCount + contentCount}</span></p>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-6 py-3 text-base font-semibold text-gray-900 transition hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30"
            >
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSingleBlog;