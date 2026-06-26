import React from "react";
import Link from "next/link.js";
import { blogs } from "../data";

const AllBlogsPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-500 mb-12 text-center">
          All Blogs
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.map((blog) => {
            return (
              <div
                key={blog?.id}
                className="bg-gray-800 border-t-4 border-orange-500 rounded-lg p-6 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col"
              >
                <Link href={`all-blogs/${blog?.id}`}>
                  <h1 className="text-2xl font-bold text-orange-500 hover:text-orange-400 transition-colors duration-200 mb-3 cursor-pointer line-clamp-2">
                    {blog?.title}
                  </h1>
                </Link>
                <p className="text-gray-300 leading-relaxed line-clamp-4 flex-grow mb-4">
                  {blog?.content}
                </p>
                <Link href={`all-blogs/${blog?.id}`}>
                  <span className="inline-block text-orange-500 hover:text-orange-400 font-semibold transition-colors duration-200">
                    Read More →
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllBlogsPage;
