import Image from "next/image";
import Link from "next/link";
import { FolderSync, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-3">
          <FolderSync className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-bold text-white tracking-wide">
            <span className="text-primary-dark">መለኛ</span>App
          </h1>
        </div>
        <Link
          href="/login"
          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 font-medium"
        >
          Sign In
          <ArrowRight className="w-4 h-4" />
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                <FolderSync className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              <span className="text-primary-dark">መለኛ</span>App
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium mb-8 max-w-2xl">
              Your secure and reliable payment gateway for seamless transactions
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/login"
              className="flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-full hover:bg-gray-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
