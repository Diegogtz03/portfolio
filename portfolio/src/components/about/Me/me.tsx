"use client";

import LanguageScroll from "./LanguageScroll";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Me() {
  return (
    <div className="flex flex-col gap-4 w-full h-full items-center justify-center">
      <motion.div className="flex flex-col gap-10 w-full h-full items-center justify-center max-w-[500px] mt-10 sm:mt-0">
        <div className="flex flex-col gap-2 sm:h-[250px] sm:w-[250px] h-[180px] w-[180px]">
          <Image
            src="https://guti.sfo3.digitaloceanspaces.com/about/me.jpg"
            priority
            alt="me"
            loading="eager"
            width={250}
            height={250}
            className="w-full h-full aspect-square object-cover rounded-2xl shadow-xl"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="sm:text-lg text-[15px] text-gray-400 text-center font-light px-10">
            Hi! I&apos;m Diego (or &quot;Guti&quot; as most call me). I&apos;m a
            4th year Computer Science student at Tecnologico de Monterrey.
            I&apos;m currently working as a Software Engineer Intern at
            Microsoft. My interests vary from software development to design and
            everything in between.
          </p>
        </div>
        <LanguageScroll />
      </motion.div>
    </div>
  );
}
