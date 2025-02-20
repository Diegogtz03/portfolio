"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

const navItems = [
  {
    label: "about",
    href: "/about",
  },
  {
    label: "experience",
    href: "/experience",
  },
  {
    label: "projects",
    href: "/projects",
  },
  {
    label: "fun",
    href: "/fun",
  },
];

export default function NavBar() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasPreviewed, setHasPreviewed] = useState<boolean>(false);
  const [isHome, setIsHome] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const indicatorElement = document.getElementById("nav-indicator");
      const indicatorRect = indicatorElement?.getBoundingClientRect();

      if (
        indicatorRect &&
        e.clientX >= indicatorRect.left - 100 &&
        e.clientX <= indicatorRect.right + 100 &&
        e.clientY >= indicatorRect.top - 50 &&
        e.clientY <= indicatorRect.bottom
      ) {
        setIsVisible(true);

        if (!hasPreviewed) {
          setHasPreviewed((prev) => true);
        }
      } else if (e.clientY < window.innerHeight - 150) {
        setIsVisible(false);
      }
    };

    if (window) {
      if (window.location.pathname.split("/")[1] == "home") {
        setIsHome(true);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <nav
        className={`fixed bottom-12 left-1/2 -translate-x-1/2 transition-all duration-300 z-[200] ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <div className="flex gap-2 p-2 bg-btn-bg dark:bg-gray-800 rounded-xl shadow-lg border border-btn-stroke">
          {navItems.map((item) => {
            const isCurrentPage =
              typeof window !== "undefined" &&
              window.location.pathname.split("/")[1] ===
                item.href.split("/")[1];

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-4 py-2 text-dark-text dark:text-light-text rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  isCurrentPage ? "opacity-50" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
      <AnimatePresence mode="wait">
        {!hasPreviewed && isHome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-fit w-fit z-[150]"
          >
            <motion.iframe
              src="https://cdn.lottielab.com/l/chu2FzKjGoCMd0.html"
              width="200"
              height="200"
              className="fixed bottom-2 left-1/2 -translate-x-1/2 w-20 h-20 max-h-15 overflow-hidden aspect-square [clip-path:inset(0_0_20%_0)] z-[150]"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        id="nav-indicator"
        className={`fixed -bottom-5 left-1/2 -translate-x-1/2 w-72 h-10 bg-gray-300 dark:bg-gray-800 border-2 border-gray-200 rounded-full transition-all duration-300 z-[200] ${
          isVisible ? "opacity-0" : "opacity-100"
        }`}
      />
    </>
  );
}
