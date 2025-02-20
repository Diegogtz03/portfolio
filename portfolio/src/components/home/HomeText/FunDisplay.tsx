"use client";

import { useState, useEffect, useRef } from "react";
// @ts-ignore
import { FlapDisplay, Presets } from "react-split-flap-effect";
import { motion } from "framer-motion";
import { VT323 } from "next/font/google";

const TITLES = [
  "Software Engineer",
  "Full Stack Developer",
  "Designer?",
  "Student",
  "Cat Lover",
];

const THEMES = [
  {
    name: "old monitor",
    component: MonitorTheme,
  },
  {
    name: "flapper",
    component: FlapperTheme,
  },
  // {
  //   name: "handwritten",
  //   component: HandwrittenTheme,
  // },
];

type Theme = {
  name: string;
  component: React.ComponentType<{
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
  }>;
};

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
});

export default function FunDisplay() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [currentThemeIndex, setCurrentThemeIndex] = useState<number | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const randomThemeIndex = Math.floor(Math.random() * THEMES.length);
    const randomTheme = THEMES[randomThemeIndex];
    setCurrentTheme(randomTheme);
    setCurrentThemeIndex(randomThemeIndex);

    const handleClick = () => {
      if (currentThemeIndex === null) return;

      setCurrentThemeIndex((prev: number | null) => {
        if (prev === null) return null;

        const nextThemeIndex = prev === THEMES.length - 1 ? 0 : prev + 1;
        setCurrentTheme(THEMES[nextThemeIndex]);
        return nextThemeIndex;
      });
    };

    ref.current?.addEventListener("click", handleClick);

    return () => {
      ref.current?.removeEventListener("click", handleClick);
    };
  }, [ref.current]);

  return (
    <div className="flex flex-row items-center justify-center gap-2" ref={ref}>
      {currentTheme && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5 }}
        >
          <currentTheme.component
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </motion.div>
      )}
    </div>
  );
}

export function MonitorTheme({
  currentIndex,
  setCurrentIndex,
}: {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Handle text cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        currentIndex === TITLES.length - 1 ? 0 : currentIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Handle typing animation
  useEffect(() => {
    const targetText = TITLES[currentIndex];
    setIsTyping(true);
    setDisplayText("");

    let currentText = "";
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex < targetText.length) {
        currentText += targetText[charIndex];
        setDisplayText(currentText);
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentIndex]);

  return (
    <div className="bg-[#cbba97] rounded-md p-2 shadow-lg select-none hover:cursor-pointer border border-[#8cc58c]/30 relative overflow-hidden">
      <div className="bg-[#28461b]/90 p-3 px-4 rounded-sm flex items-center justify-start min-w-[300px] max-w-[300px] min-h-[60px] shadow-inner overflow-hidden">
        {/* CRT screen effect overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Scan lines */}
          <div className="w-full h-full bg-[linear-gradient(transparent_50%,_rgba(0,255,0,0.03)_50%)] bg-[length:100%_2px]" />
          {/* Vignette effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_10%,_rgba(0,0,0,0.3)_90%)]" />
          {/* Screen flicker */}
          <div className="absolute inset-0 bg-[#00ff00]/5 animate-[pulse_2s_ease-in-out_infinite]" />
          {/* Random noise */}
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
            <div className="w-full h-full bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAElBMVEUAAAD///////////////////8+Uq06AAAABnRSTlMAECAwQGCg4q+MAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAN0lEQVQ4jWNgQAP8DAzMDAyM4QwMTCEMDKxBDAycoQwMXAEMDDxhDAz84QwMghEMDEJRDAyYAAC8YgRJ2kzDpgAAAABJRU5ErkJggg==')] animate-[noise_.2s_steps(4,end)_infinite]" />
          </div>
        </div>

        <div className="relative z-10 whitespace-nowrap overflow-hidden">
          <div
            className={`${vt323.className} text-[#00ff00] text-3xl tracking-wide drop-shadow-[0_0_3px_#00ff00]`}
          >
            {displayText}
            <span className="inline-block w-2 h-5 bg-[#00ff00] text-4xl ml-1 animate-[blink_1s_steps(2)_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FlapperTheme({
  currentIndex,
  setCurrentIndex,
}: {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}) {
  const FLAPPER_DISPLAY_CHARACTERS = 11;
  const PART_CHANGE_DELAY = 3000;
  const WORD_CHANGE_DELAY = 5000;
  const [textParts, setTextParts] = useState<string[]>([""]);
  const [textPartIndex, setTextPartIndex] = useState<number>(0);
  const [shouldChangeWord, setShouldChangeWord] = useState(false);

  // Effect to split text into parts and reset part index when title changes
  useEffect(() => {
    const currentTitle = TITLES[currentIndex];

    // Split text into parts of max 13 chars, trying to split on spaces
    const parts: string[] = [];
    let remaining = currentTitle;

    while (remaining.length > 0) {
      if (remaining.length <= FLAPPER_DISPLAY_CHARACTERS) {
        parts.push(remaining);
        break;
      }

      let splitIndex = FLAPPER_DISPLAY_CHARACTERS;
      const lastSpace = remaining
        .substring(0, FLAPPER_DISPLAY_CHARACTERS)
        .lastIndexOf(" ");

      if (lastSpace !== -1) {
        splitIndex = lastSpace;
      }

      parts.push(remaining.substring(0, splitIndex));
      remaining = remaining.substring(splitIndex).trim();
    }

    setTextParts(parts);
    setTextPartIndex(0);
    setShouldChangeWord(false);
  }, [currentIndex]);

  // Effect to handle cycling through parts of the same word
  useEffect(() => {
    const interval = setInterval(() => {
      if (textPartIndex >= textParts.length - 1) {
        const nextIndex =
          currentIndex === TITLES.length - 1 ? 0 : currentIndex + 1;
        setTimeout(() => {
          setCurrentIndex(nextIndex);
        }, 0);
        return;
      }
      setTextPartIndex((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [textParts, currentIndex, textPartIndex]);

  // Separate effect to handle changing to next word
  useEffect(() => {
    if (!shouldChangeWord) return;

    const wordInterval = setTimeout(() => {
      setCurrentIndex(
        currentIndex === TITLES.length - 1 ? 0 : currentIndex + 1
      );
    }, WORD_CHANGE_DELAY - PART_CHANGE_DELAY); // Subtract PART_CHANGE_DELAY to account for the last part's display time

    return () => clearTimeout(wordInterval);
  }, [shouldChangeWord, currentIndex]);

  return (
    <div className="bg-gray-300 rounded-lg p-2 shadow-lg select-none hover:cursor-pointer w-max">
      <div className="bg-[#222222] p-3 rounded flex flex-row items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-red-500 mr-2 shadow-red-500 animate-pulse" />
        {textParts[textPartIndex] && (
          <FlapDisplay
            chars={Presets.ALPHANUM + ",!-?"}
            length={FLAPPER_DISPLAY_CHARACTERS}
            value={textParts[textPartIndex]}
            className="darkBordered M will-change-transform"
          />
        )}
      </div>
    </div>
  );
}

export function HandwrittenTheme({
  currentIndex,
  setCurrentIndex,
}: {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}) {
  return (
    <div>
      <h1>Handwritten Theme</h1>
    </div>
  );
}
