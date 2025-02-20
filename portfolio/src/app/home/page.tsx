"use client";

import HomeText from "@/components/home/HomeText/HomeText";
import FloatingItems from "@/components/home/FloatingItems/FloatingItems";

import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<any>();

  return (
    <main className="overflow-hidden w-screen h-screen" ref={containerRef}>
      <FloatingItems containerRef={containerRef} />
      <div className="w-fit h-fit absolute top-[50%] right-[50%] translate-x-1/2 -translate-y-1/2 z-20">
        <HomeText />
      </div>
    </main>
  );
}
