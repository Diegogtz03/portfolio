"use client";

import Timeline from "@/interfaces/about";
import TimelineSlider from "@/components/about/TimelineSlider";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Page Components
import Me from "@/components/about/Me/me";
import Hobbies from "@/components/about/hobbies";

export default function About() {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const TimelineData: Timeline[] = [
    {
      id: 0,
      title: "me",
      content: <Me />,
    },
    {
      id: 1,
      title: "hobbies",
      content: <Hobbies />,
    },
  ];

  return (
    <main className="overflow-hidden w-screen h-screen pb-40">
      <div className="flex flex-col justify-center items-center gap-14 h-full">
        <AnimatePresence mode="wait">
          {activeTabIndex === 0 && (
            <motion.h1
              key={activeTabIndex}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="sm:text-[90px] text-[70px] font-[10] absolute mt-8 sm:mt-0 top-12 left-0 right-0 m-auto text-center text-black opacity-50 w-fit overflow-hidden"
            >
              me
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full mt-10 mb-20"
          >
            {TimelineData[activeTabIndex].content}
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col gap-4 w-full h-fit absolute bottom-10 left-1/2 -translate-x-1/2">
          <TimelineSlider
            timeline={TimelineData}
            setActiveTabIndex={setActiveTabIndex}
          />
        </div>
      </div>
    </main>
  );
}
