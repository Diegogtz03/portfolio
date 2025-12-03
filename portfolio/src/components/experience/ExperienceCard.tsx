"use client";

import { Experience } from "@/interfaces/experience";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SVGSticker from "./SVGSticker";

const generalExperience = `I will be joining Bloomberg as a Software Engineer in New York City. In the last couple of years I have worked in multiple positions that have expanded my knowledge across various domains of technology.

My journey includes exciting internships at leading tech companies - I previously interned at Microsoft, Oracle, and completed a Site Reliability Engineering Fellowship with Meta & MLH. I've also taken on leadership roles, serving as a Project Leader at ITESM where I led development initiatives. Through these experiences, I've discovered my passion for innovation and versatility - from development and AI to design and everything in between. I'm particularly excited about roles where I can explore cutting-edge technologies while combining technical excellence with creative problem-solving.`;

export default function ExperienceCard({
  experiences,
}: {
  experiences: Experience[];
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleResumeDownload = () => {
    // TODO: Download resume
    window.open(
      "https://guti.sfo3.digitaloceanspaces.com/resume.pdf",
      "_blank"
    );
  };

  return (
    <motion.div
      className="flex flex-col gap-4 border-4 border-gray-100 rounded-3xl sm:p-8 p-0 w-full sm:w-3/4 h-3/4 shadow-lg relative min-h-fit md:w-[90vw] mt-10 sm:mt-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row gap-4 p-5 h-[620px] sm:h-fit overflow-scroll overflow-x-hidden no-scrollbar">
        <div className="flex flex-col gap-4 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={
                selectedIndex !== null
                  ? `title-${experiences[selectedIndex].company}`
                  : "title-brief"
              }
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h2 className="text-4xl font-medium mb-4">
                {selectedIndex !== null
                  ? experiences[selectedIndex].company
                  : "Brief Experience"}
              </motion.h2>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={
                selectedIndex !== null
                  ? `description-${experiences[selectedIndex].company}`
                  : "description-brief"
              }
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              {selectedIndex !== null ? (
                <div className="flex flex-col gap-4 whitespace-pre-wrap sm:pr-0 pr-20">
                  <p className="text-sm sm:text-lg text-gray-600 whitespace-pre-wrap sm:pr-10 pr-0">
                    {experiences[selectedIndex].description}
                  </p>
                </div>
              ) : (
                <div className="whitespace-normal whitespace-pre-wrap">
                  <p className="text-lg text-gray-600 sm:pr-10 pr-0">
                    {generalExperience}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-2 mt-4 ml-4 p-4 w-full">
          <p className="text-gray-400 mb-3">work experience</p>
          {experiences.map((experience, index) => (
            <>
              <motion.div
                key={experience.id}
                className={`rounded-2xl cursor-pointer transition-all
              ${selectedIndex === index && "opacity-50"}`}
                onClick={() =>
                  setSelectedIndex(index === selectedIndex ? null : index)
                }
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex flex-row items-center gap-4 w-full relative">
                  <div className="flex flex-col gap-0 w-fit relative pl-4">
                    <span className="font-medium sm:text-lg text-[17px] w-max">
                      {experience.company}
                    </span>
                    <span className="text-gray-500 sm:text-[17px] text-[13px] w-max">
                      {experience.position}
                    </span>
                    <SVGSticker
                      src={experience.company_logo}
                      alt={experience.company}
                      width={100}
                      height={100}
                      className={`absolute sm:-left-16 -left-14 top-0 bottom-0 m-auto sm:h-16 sm:w-16 h-12 w-12 sm:ml-0 ml-3`}
                    />
                  </div>
                  <span className="text-gray-400 sm:text-lg text-sm w-full text-end">
                    {experience.startDate} - {experience.endDate}
                  </span>
                </div>
              </motion.div>

              <div className="w-full h-[1px] border-t-2 border-dashed border-gray-200 my-3"></div>
            </>
          ))}
        </div>
      </div>

      <div className="flex flex-row gap-4 p-2 justify-end fixed bottom-0 right-0 absolute">
        <button
          onClick={handleResumeDownload}
          className="text-gray-400 text-lg flex flex-row items-center gap-2 rounded-full p-2 px-4 bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          resume
          <Image
            src="/media/icons/arrow.svg"
            alt="download"
            width={20}
            height={20}
          />
        </button>
      </div>
    </motion.div>
  );
}
