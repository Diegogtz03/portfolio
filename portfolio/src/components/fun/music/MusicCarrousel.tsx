"use client";

import { Song } from "@/interfaces/music";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function MusicCarrousel({ songs }: { songs: Song[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [songDetails, setSongDetails] = useState<Song>();

  const isPhone: boolean = window ? window.innerWidth <= 600 : false;

  const nextSong = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
  };

  const getVisibleSongs = () => {
    const prev = (currentIndex - 1 + songs.length) % songs.length;
    const next = (currentIndex + 1) % songs.length;
    return [prev, currentIndex, next];
  };

  const fetchSongDetails = async (songId: string) => {
    const response = await fetch(`/api/music/spotify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: 1,
        songId: songId,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setSongDetails(data.data);
    }
  };

  const handleCardClick = (index: number) => {
    setIsFlipped(true);
    setFlippedIndex(index);
    fetchSongDetails(songs[index].id);
  };

  const handleCloseCard = () => {
    setIsFlipped(false);
    setFlippedIndex(null);
    setSongDetails(undefined);
  };

  return (
    <>
      <motion.div
        animate={{
          backdropFilter: isFlipped ? "blur(3px)" : "blur(0px)",
          zIndex: isFlipped ? 10 : -1,
        }}
        onClick={() => handleCloseCard()}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 flex items-center justify-center w-screen h-screen m-auto z-10"
      />

      <div className="flex flex-col items-center gap-8 w-full max-w-[900px] pb-[15rem]">
        <div className="relative sm:h-[400px] h-[200px] w-full">
          <div className="absolute w-full h-full flex items-center justify-center">
            {getVisibleSongs().map((index, i) => (
              <AnimatePresence key={index} mode="wait">
                <motion.div
                  key={index}
                  initial={{
                    scale: 0.8,
                    rotate: i === 0 ? -15 : i === 2 ? 15 : 0,
                    x: i === 0 ? -100 : i === 2 ? 100 : 0,
                    y: i === 0 ? -100 : i === 2 ? 100 : 0,
                    zIndex: i === 2 ? 2 : 1,
                  }}
                  animate={{
                    scale: 1,
                    rotate: i === 0 ? -15 : i === 2 ? 15 : 0,
                    x:
                      i === 0
                        ? isPhone
                          ? -100
                          : -180
                        : i === 2
                        ? isPhone
                          ? 100
                          : 180
                        : 0,
                    y: i === 0 ? 20 : i === 2 ? 20 : -20,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -20,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{
                    scale: 1.1,
                  }}
                  exit={{
                    scale: 0.8,
                    opacity: 0,
                  }}
                  onClick={() => handleCardClick(index)}
                  className="absolute cursor-pointer border-2 border-gray-200 rounded-xl shadow-xl"
                  style={{
                    transformOrigin: "center center",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="relative sm:w-[380px] w-[180px] aspect-square">
                    <Image
                      src={songs[index].album_image}
                      alt={`Album art for music`}
                      className="w-full h-full object-cover rounded-lg shadow-xl"
                      width={300}
                      height={300}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8">
          <AnimatePresence mode="wait">
            {currentIndex > 0 && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={prevSong}
                  className="text-[40px] text-gray-300 hover:text-gray-200 select-none"
                >
                  &#8249;
                </motion.button>
              </>
            )}
            {currentIndex < songs.length - 3 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={nextSong}
                className="text-[40px] text-gray-300 hover:text-gray-200 select-none"
              >
                &#8250;
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2">
          {Array.from({ length: Math.ceil(songs.length - 2) }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-gray-300" : "bg-gray-300/50"
              }`}
            />
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isFlipped && (
          <SongCard song={songDetails} handleCloseCard={handleCloseCard} />
        )}
      </AnimatePresence>
    </>
  );
}

export function SongCard({
  song,
  handleCloseCard,
}: {
  song: Song | undefined;
  handleCloseCard: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: "120%" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, y: "120%" }}
      className="fixed inset-0 flex items-center justify-center z-50 rounded-3xl sm:w-[25em] w-[20em] h-[25em] bg-white border-2 border-gray-200 m-auto"
    >
      {!song ? (
        <div className="flex flex-col gap-4 p-4">
          <div className="w-full h-[250px] bg-gray-400 rounded-lg" />
          <div className="w-3/4 h-6 bg-gray-400 rounded" />
          <div className="w-1/2 h-4 bg-gray-400 rounded" />
          <div className="w-full h-16 bg-gray-400 rounded" />
        </div>
      ) : (
        <div className="flex flex-col gap-3 p-2 w-full h-full">
          <div className="relative w-full h-[180px]">
            <Image
              src={song.album_image}
              alt={`Album art for ${song.name}`}
              className="w-[100%] h-[170px] object-cover rounded-2xl shadow-xl"
              width={300}
              height={300}
            />
            <div className="absolute top-0 right-0 p-2">
              <Image
                src={"/media/icons/close.svg"}
                alt={`Close`}
                className="w-6 h-6 cursor-pointer bg-white rounded-full p-1"
                width={10}
                height={10}
                onClick={handleCloseCard}
              />
            </div>
          </div>
          <div className="flex flex-col gap-0 p-3 pt-0">
            <h3 className="text-4xl font-thin text-black truncate m-0">
              {song.name}
            </h3>
            <p className="text-gray-400 font-thin text-xl truncate">
              {song.artists}
            </p>

            <div className="w-full h-[1px] border-t-2 border-dashed border-gray-100 my-3"></div>

            {song.note && (
              <p className="text-gray-400 text-lg line-clamp-2">{song.note}</p>
            )}
          </div>

          <Image
            src={"/media/assets/spotify_logo.png"}
            alt={`Album art for ${song.name}`}
            className="object-cover rounded-2xl shadow-xl cursor-pointer absolute bottom-2 right-2"
            width={25}
            height={25}
            onClick={() => {
              window.open(song.song_url ?? "", "_blank");
            }}
          />
        </div>
      )}
    </motion.div>
  );
}
