import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-orange-500 mb-6">
          Welcome to My Blog
        </h1>
        <p className="text-xl text-gray-300 mb-12 leading-relaxed">
          Explore insightful articles and stories. Discover new perspectives and ideas shared through carefully crafted blog posts.
        </p>
        <Link href={`all-blogs/`}>
          <button className="bg-orange-500 hover:bg-orange-600 text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/50 text-lg">
            Read Blogs
          </button>
        </Link>
      </div>
    </div>
  );
}
