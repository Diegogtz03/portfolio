"use client";

import { useEffect, useState } from "react";

export default function Listen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://open.spotify.com/user/diegogtz";
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <h1 className="text-red-600 text-5xl font-bold animate-pulse">
        🫵🏻 YOU&apos;VE BEEN HACKED 🫵🏻
      </h1>
    </div>
  );
}
