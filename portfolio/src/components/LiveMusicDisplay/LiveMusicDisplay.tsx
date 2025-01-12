"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { LiveMusic, ErrorMessage } from "@/interfaces/music";

export const LiveMusicDisplay = () => {
  const [liveMusic, setLiveMusic] = useState<LiveMusic | undefined>(undefined);

  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    let intervalTime = 2000;

    const fetchLatestTrack = async () => {
      fetch("/api/spotify")
        .then((res) => res.json())
        .then((data) => {
          if (!("name" in data)) {
            setIsRotating(false);
            setLiveMusic(undefined);
            return;
          }

          setLiveMusic(data);

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
  }, []);

  return (
    <div className="w-[20rem] h-[10rem] rounded-lg bg-white overflow-hidden relative bg-opacity-10">
      {/* STATUS LED */}
      <div
        className={`w-3 h-3 rounded-full absolute top-2 left-2 z-20 flex place-items-center place-content-center ${
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

      <div className="flex flex-col h-full pl-3 absolute right-5 top-3">
        <p className="text-white text-sm font-semibold">
          {liveMusic == undefined ? "Inactive" : liveMusic.name}
        </p>
        <p className="text-white text-xs">
          {liveMusic == undefined ? "" : liveMusic.artists}
        </p>
      </div>

      {/* CD WITH ALBUM */}
      <div
        className={`rounded-full w-[10rem] h-[10rem] absolute -left-14 -bottom-14 overflow-hidden ${
          isRotating && "animate-spin-slow"
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
          className="select-none"
        />
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
          src="/media/assets/spotify_logo.png"
          width={20}
          height={20}
          alt="Spotify Logo"
          quality={100}
        />
      </a>
    </div>
  );
};
