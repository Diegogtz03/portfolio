"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { LiveMusic, ErrorMessage } from "@/interfaces/music";
import { motion, AnimatePresence } from "framer-motion";

export const LiveMusicDisplay = () => {
  const [liveMusic, setLiveMusic] = useState<LiveMusic | undefined>(undefined);
  const [isRotating, setIsRotating] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [prevMusic, setPrevMusic] = useState<LiveMusic | undefined>(undefined);
  const [isTextScrolling, setIsTextScrolling] = useState(false);

  useEffect(() => {
    let intervalTime = 2000;
    const fetchLatestTrack = async () => {
      fetch("/api/spotify")
        .then((res) => res.json())
        .then((data) => {
          if (!("name" in data)) {
            if (!liveMusic) return;
            setIsRotating(false);
            setIsSliding(true);
            setTimeout(() => {
              setPrevMusic(undefined);
              setLiveMusic(undefined);
              setIsSliding(false);
            }, 300);
            return;
          }
          if (data.name !== liveMusic?.name) {
            setIsSliding(true);

            setTimeout(() => {
              setPrevMusic(liveMusic);
              setLiveMusic(data);
            }, 200);

            setTimeout(() => {
              // setPrevMusic(liveMusic);
              // setLiveMusic(data);
              setIsSliding(false);
            }, 2000);
          } else {
            setLiveMusic(data);
          }
          data.is_playing ? setIsRotating(true) : setIsRotating(false);
        });
    };
    // Fetch the track immediately when the component mounts
    fetchLatestTrack();
    // Set up the interval to fetch the track every X seconds
    const intervalId = setInterval(() => {
      fetchLatestTrack();
    }, intervalTime);
    // Cleanup function: Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [liveMusic?.name]);

  useEffect(() => {
    // Toggle text scrolling every 4 seconds if text is too long
    const titleElement = document.getElementById("song-title");
    if (
      titleElement &&
      titleElement.scrollWidth > titleElement.clientWidth - 500
    ) {
      const intervalId = setInterval(() => {
        setIsTextScrolling((prev) => !prev);
      }, 4000);
      return () => clearInterval(intervalId);
    }
  }, [liveMusic?.name]);

  return (
    <div className="w-[18rem] h-[8rem] rounded-xl bg-gray-200 border-2 border-gray-200 overflow-hidden relative bg-opacity-10 backdrop-blur-sm">
      {/* STATUS LED */}
      <div
        className={`w-3 h-3 rounded-full absolute top-2 right-3 z-20 flex place-items-center place-content-center ${
          !liveMusic
            ? "bg-red-500"
            : liveMusic.is_playing
            ? "bg-green-500"
            : "bg-red-500"
        }`}
      >
        {liveMusic?.is_playing && (
          <div
            className={`w-2.5 h-2.5 rounded-full z-10 animate-ping bg-green-500`}
          />
        )}
      </div>

      {/* TITLE, ARTIST */}
      <div className="flex flex-col h-full pl-3 absolute left-20 top-3 pr-8">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={liveMusic?.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              id="song-title"
              className={`text-dark-text text-2xl font-thin whitespace-nowrap transition-[translate] select-none ${
                isTextScrolling ? "animate-marquee" : ""
              }`}
              style={{
                transform: isTextScrolling ? "translate(-50%)" : "translate(0)",
              }}
            >
              {liveMusic == undefined ? "Inactive" : liveMusic.name}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={liveMusic?.artists}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-dark-text text-xs font-thin truncate select-none"
            >
              {liveMusic == undefined ? "" : liveMusic.artists}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* CD WITH ALBUM */}
      <div
        className={`rounded-full w-[8rem] h-[8rem] absolute bottom-0 top-0 m-auto overflow-hidden shadow-lg border-2 border-gray-200 transition-all
 ${isSliding ? "-left-[8rem]" : "-left-14"} ${
          isRotating ? "animate-spin-slow" : "rotate-0"
        } select-none`}
      >
        <Image
          src={
            !liveMusic ? "/media/assets/blank_cd.png" : liveMusic.album_image
          }
          width={160}
          height={160}
          alt="Album Image"
          quality={100}
          className="select-none transform-none"
        />
        {liveMusic && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-200 rounded-full border-2 border-gray-300" />
        )}
      </div>

      {/* LINK TO SONG */}
      <a
        href={
          !liveMusic
            ? "https://open.spotify.com/user/diegogtz"
            : liveMusic?.song_url
        }
        target="_blank"
        className="absolute bottom-2 right-2 text-white text-xs font-semibold cursor-pointer"
      >
        <Image
          src="/media/icons/spotify.svg"
          width={23}
          height={23}
          alt="Spotify Logo"
          quality={100}
          className="select-none transform-none opacity-80"
        />
      </a>
    </div>
  );
};
