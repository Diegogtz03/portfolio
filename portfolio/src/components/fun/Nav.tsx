"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="mb-8">
      <ul className="flex sm:gap-8 gap-4">
        <motion.li whileHover={{ opacity: 0.8 }} transition={{ duration: 0.2 }}>
          <Link href="/fun/music">
            <span
              className={`sm:text-[72px] text-[52px] font-[50] transition-colors duration-300 ${
                pathname === "/fun/music" ? "text-black" : "text-gray-300"
              }`}
            >
              music
            </span>
          </Link>
        </motion.li>
        <li className="flex items-center translate-y-[8px]">
          <svg
            width="2"
            height="48"
            viewBox="0 0 2 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto"
          >
            <rect width="2" height="48" rx="1" fill="#E5E7EB" />
          </svg>
        </li>
        <motion.li whileHover={{ opacity: 0.8 }} transition={{ duration: 0.2 }}>
          <Link href="/fun/media">
            <span
              className={`sm:text-[72px] text-[52px] font-[50] transition-colors duration-300 ${
                pathname === "/fun/media" ? "text-black" : "text-gray-300"
              }`}
            >
              media
            </span>
          </Link>
        </motion.li>
      </ul>
    </nav>
  );
}
