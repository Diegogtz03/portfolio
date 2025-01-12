"use client";

import MonitorText from "@/components/MonitorText/MonitorText";
import gsap from "gsap";

export default function Home() {
  const runPageTransition = (): void => {
    gsap.to(".this", {
      duration: 2,
      backgroundColor: "white",
    });
  };

  return (
    <main>
      <div className="flex bg-[rgb(56,56,56)] h-screen items-center justify-center shadow-monitor">
        <div className="this relative bg-[#031e11] w-[95%] h-[93%] rounded-[2rem] p-[40px] shadow-monitor-shadow">
          <div className="absolute w-full h-full top-0 left-0 bg-[#14fdce15] bg-monitor-lines backdrop-blur-[0.3px] shadow-monitor-lines rounded-[2rem]" />
          <MonitorText runPageTransition={runPageTransition} />
        </div>
      </div>
    </main>
  );
}
