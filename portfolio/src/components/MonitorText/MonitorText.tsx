"use client";

import { VT323 } from "next/font/google";
import { useState, useEffect } from "react";
import {
  exectuteTransition,
  endTransition,
  skipAnimation,
} from "@/helper/introMediaPlayer";
import gsap from "gsap";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
});

const TEXT_TO_WRITE = `import { About } from 'Diego';
  import { Projects } from 'Diego/Projects';
  import { Skills } from 'Diego/Skills';
  import { Contact } from 'Diego/Contact';

  cd ~/Documents
  cd People
  cd Diego

  bun run Diego.ts
`;

// time in ms to wait before writing next character (random selection)
const MIN_TIME = 50;
const MAX_TIME = 150;

const MonitorText = ({
  runPageTransition,
}: {
  runPageTransition: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [monitorText, setMonitorText] = useState("");

  const keydownHandler = async (e: globalThis.KeyboardEvent) => {
    if (isLoading && e.key === " ") {
      exectuteTransition();

      gsap.to(".loading-monitor-text", {
        duration: 1,
        opacity: 0,
      });

      setTimeout(async () => {
        setIsLoading(false);

        setTimeout(async () => {
          for (var i = 0; i < TEXT_TO_WRITE.length; i++) {
            // set the current text to the monitor
            setMonitorText((prevText) => {
              return (prevText += TEXT_TO_WRITE[i]);
            });

            // await a random time before writing the next character
            await new Promise((r) =>
              setTimeout(
                r,
                Math.floor(Math.random() * (MAX_TIME - MIN_TIME + 1) + MIN_TIME)
              )
            );
          }

          endTransition();
          runPageTransition();
        }, 2500);
      }, 1000);
    } else if (isLoading && e.key === "Escape") {
      gsap.to(".loading-monitor-text", {
        duration: 1,
        opacity: 0,
      });
      
      skipAnimation();
      runPageTransition();

      // REDIRECT TO /home with transition
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  });

  return (
    <div className={`${vt323.className} text-[#14fdce] text-2xl`}>
      {isLoading ? (
        <div className="loading-monitor-text">
          <h1 className="text-[3rem] font-bold after:animate-dots">LOADING</h1>

          <h3 className="font-bold mt-10 text-[1.6rem]">
            Press &apos;SPACE&apos; to begin &nbsp; || &nbsp; &apos;ESC&apos; to
            skip
          </h3>
        </div>
      ) : (
        <p className="whitespace-pre-line">{monitorText}</p>
      )}
    </div>
  );
};

export default MonitorText;
