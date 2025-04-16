"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Google Icon Component
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
    />
    <path
      fill="#34A853"
      d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09Z"
    />
    <path
      fill="#EA4335"
      d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96Z"
    />
  </svg>
);

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDemo = async () => {
    setIsLoading(true);
    // Simulate loading for demo
    setTimeout(() => {
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-black/50 backdrop-blur-sm p-8 rounded-2xl border border-gold/20">
          <div className="text-center mb-8">
            <Image
              src="/logo.png"
              alt="Aurora Elegance"
              width={80}
              height={80}
              className="mx-auto mb-4 rounded-full border-2 border-gold/20"
            />
            <h1 className="text-3xl font-bold gold-text mb-2">Welcome Back</h1>
            <p className="text-gold/60">Sign in to access admin dashboard</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDemo}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <GoogleIcon />
            <span className="font-medium">
              {isLoading ? "Signing in..." : "Sign in with Google"}
            </span>
          </motion.button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gold/40">
              Only authorized administrators can access this area
            </p>
            <Link
              href="/"
              className="inline-block mt-4 text-gold hover:text-gold/80 text-sm"
            >
              ← Return to website
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
