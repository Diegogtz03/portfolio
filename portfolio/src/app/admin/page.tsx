"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signIn("credentials", {
      username,
      password,
      callbackUrl: `/admin`,
      redirect: false,
    });
  };

  return (
    <main className="flex justify-center items-center h-screen bg-dark-bg">
      {status === "authenticated" ? (
        <div className="flex flex-col gap-4 text-white">
          {/* <Link
            href="/admin/projects"
            className="bg-gray-800 text-white rounded-md p-2 hover:bg-gray-700"
          >
            Projects
          </Link> */}
          {/* <Link
            href="/admin/skills"
            className="bg-gray-800 text-white rounded-md p-2 hover:bg-gray-700"
          >
            Skills
          </Link> */}
          {/* <Link
            href="/admin/contact"
            className="bg-gray-800 text-white rounded-md p-2 hover:bg-gray-700"
          >
            Contact
          </Link> */}
          {/* <Link
            href="/admin/blog"
            className="bg-gray-800 text-white rounded-md p-2 hover:bg-gray-700"
          >
            Blog
          </Link> */}
          <Link
            href="/admin/fun"
            className="bg-gray-800 text-white rounded-md p-2 hover:bg-gray-700"
          >
            Fun
          </Link>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <p className="text-white text-2xl font-bold">ADMIN</p>
          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="bg-gray-800 text-white rounded-md p-2"
            />
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="bg-gray-800 text-white rounded-md p-2"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white rounded-md p-2 hover:bg-gray-700"
            >
              Sign In
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
