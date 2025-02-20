"use client";

import Image from "next/image";
import { ThemeButton } from "./ThemeButton";
import { ContactButton } from "./ContactButton";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="flex justify-between items-center sm:px-8 px-4 sm:py-4 py-3 bg-transparent z-[200]">
      <div className="halftone z-[100]" />
      <motion.div
        initial={{ zIndex: 100, opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Image
          src="/media/logo.svg"
          alt="logo"
          width={60}
          height={60}
          priority
          className="cursor-pointer z-[100] sm:h-auto h-[60px]"
          onClick={() => router.push("/home")}
        />
      </motion.div>

      <div className="flex items-center gap-4 z-[100]">
        <ThemeButton />
        <ContactButton />
      </div>
    </header>
  );
};
