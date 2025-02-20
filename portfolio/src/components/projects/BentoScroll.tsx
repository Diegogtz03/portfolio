"use client";

import { SimplifiedProjectType } from "@/interfaces/projects";
import { motion } from "motion/react";
import Image from "next/image";

const image_url = "https://guti.sfo3.digitaloceanspaces.com/projects";
const row_span_sequence_lg = [5, 2, 3, 3, 2, 2, 3, 5, 3, 2, 5];

export default function BentoScroll({
  projects,
  setCurrentId,
}: {
  projects: SimplifiedProjectType[];
  setCurrentId: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`w-full h-full p-5 px-10 grid sm:grid-cols-[repeat(3,calc(99%/3))] grid-cols-[repeat(2,calc(99%/1))] sm:auto-cols-[calc(100%/3)] auto-cols-[calc(100%/1)] grid-flow-col grid-rows-5 gap-5 overflow-x-auto scroll-smooth no-scrollbar sm:mt-0 mt-4`}
    >
      {projects.map((project, i) => {
        const row_height = row_span_sequence_lg[i];

        return (
          <motion.div
            onClick={() => setCurrentId(project.id)}
            key={project.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 0.99, opacity: 0.9 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className={`w-full h-full rounded-2xl overflow-hidden relative w-fit col-span-1 shadow-sm hover:cursor-pointer`}
            style={{ gridRow: `span ${row_height}` }}
          >
            <div className="w-full h-full">
              <Image
                src={`${image_url}/${project.id}/${project.icon}`}
                priority
                width={200}
                height={200}
                alt={project.name}
                quality={75}
                className="h-[90px] w-auto absolute left-0 right-0 bottom-0 top-0 m-auto"
              />
              <Image
                src={`${image_url}/${project.id}/${project.backdrop}`}
                width={2912}
                height={1632}
                priority
                alt={project.name}
                quality={75}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
