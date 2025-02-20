"use client";

import { Media } from "@/interfaces/media";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function MediaCarrousel({ media }: { media: Media[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [mediaDetails, setMediaDetails] = useState<Media>();

  const isPhone: boolean = window ? window.innerWidth <= 600 : false;

  const nextMedia = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const prevMedia = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + media.length) % media.length
    );
  };

  const getVisibleMedia = () => {
    const prev = (currentIndex - 1 + media.length) % media.length;
    const next = (currentIndex + 1) % media.length;
    return [prev, currentIndex, next];
  };

  const fetchMediaDetails = async (mediaId: string) => {
    const response = await fetch(`/api/media`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: 1,
        mediaId: mediaId,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setMediaDetails(data.data);
    }
  };

  const handleCardClick = (index: number) => {
    setIsFlipped(true);
    setFlippedIndex(index);
    fetchMediaDetails(media[index].id);
  };

  const handleCloseCard = () => {
    setIsFlipped(false);
    setFlippedIndex(null);
    setMediaDetails(undefined);
  };

  return (
    <>
      <motion.div
        animate={{
          backdropFilter: isFlipped ? "blur(3px)" : "blur(0px)",
          zIndex: isFlipped ? 15 : -10,
          display: isFlipped ? "block" : "none",
        }}
        onClick={handleCloseCard}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 flex items-center justify-center w-screen h-screen m-auto"
      />
      <div className="flex flex-col gap-4 z-10 items-center justify-center ">
        {getVisibleMedia().map((index, i) => (
          <AnimatePresence key={index} mode="wait">
            <motion.div
              key={index}
              initial={{
                scale: 0.8,
                rotate: i === 0 ? -1 : i === 2 ? 10 : 0,
                x: i === 0 ? -100 : i === 2 ? 100 : 0,
                y: i === 0 ? -100 : i === 2 ? 100 : 0,
                zIndex: i === 2 ? 2 : 1,
              }}
              animate={{
                scale: 1,
                rotate: i === 0 ? -13 : i === 2 ? 13 : 0,
                x:
                  i === 0
                    ? isPhone
                      ? -80
                      : -140
                    : i === 2
                    ? isPhone
                      ? 80
                      : 140
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
              className="absolute cursor-pointer border-2 border-gray-200 rounded-xl shadow-xl select-none"
              style={{
                transformOrigin: "center center",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
            >
              <Image
                src={media[index].poster_path}
                alt={""}
                className="sm:w-full sm:h-full w-[130px] object-cover rounded-lg shadow-xl select-none"
                width={300}
                height={300}
              />
            </motion.div>
          </AnimatePresence>
        ))}
        <div className="flex items-end gap-8 h-full sm:pt-10 pt-[260px] -mb-20">
          <AnimatePresence mode="wait">
            {currentIndex > 0 && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={prevMedia}
                  className="text-[40px] text-gray-300 hover:text-gray-200 select-none"
                >
                  &#8249;
                </motion.button>
              </>
            )}
            {currentIndex < media.length - 3 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={nextMedia}
                className="text-[40px] text-gray-300 hover:text-gray-200 select-none"
              >
                &#8250;
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isFlipped && (
          <MediaCard media={mediaDetails} handleCloseCard={handleCloseCard} />
        )}
      </AnimatePresence>
    </>
  );
}

function MediaCard({
  media,
  handleCloseCard,
}: {
  media: Media | undefined;
  handleCloseCard: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: "120%" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, y: "120%" }}
      className="fixed inset-0 flex items-center justify-center z-50 rounded-3xl bg-white border-2 border-gray-200 m-auto sm:h-[65vh] sm:w-[25vw] md:w-[35vw] md:h-[75vh] shadow-xl p-2 overflow-hidden h-[65vh] w-[85vw] overflow-scroll"
    >
      {!media ? (
        <div className="flex flex-col gap-4 p-4 pulse">
          <div className="w-full h-[250px] bg-gray-400 rounded-lg" />
          <div className="w-3/4 h-6 bg-gray-400 rounded" />
          <div className="w-1/2 h-4 bg-gray-400 rounded" />
          <div className="w-full h-16 bg-gray-400 rounded" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 h-full">
          <div className="relative">
            <Image
              src={media.backdrop_path ?? media.poster_path}
              alt={media.title ?? ""}
              quality={100}
              className="w-full object-cover rounded-xl shadow-xl"
              width={1000}
              height={1000}
            />
            <div className="absolute top-0 right-0 p-3 z-[100]">
              <Image
                src={"/media/icons/close.svg"}
                alt={`Close`}
                className="w-6 h-6 cursor-pointer bg-white rounded-full p-1"
                width={10}
                height={10}
                onClick={handleCloseCard}
              />
            </div>
            <div className="absolute bottom-0 w-full rounded-lg overflow-hidden bg-gradient-to-t from-black/50 to-transparent">
              <h3 className="text-white text-center font-[50] sm:text-[75px] text-[55px] z-20 select-none">
                {media.title}
              </h3>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 pt-0 h-full">
            {/* Starts */}
            <div className="flex flex-col gap-4 items-center">
              <div className="flex flex-row gap-2">
                <div className="flex flex-row gap-2">
                  {Array.from({ length: media.stars ?? 0 }).map((_, index) => (
                    <Image
                      key={index}
                      src={"/media/icons/star.svg"}
                      alt={`Star`}
                      width={10}
                      height={10}
                      className="w-6 h-6 bg-white rounded-full p-1"
                    />
                  ))}
                </div>
              </div>
              {/* Genres */}
              <div className="flex flex-row gap-2">
                {media.genres?.map((genre) => (
                  <div className="flex flex-row gap-2 rounded-full bg-gray-200 p-2 w-fit px-3">
                    <h3 className="text-gray-700 text-sm select-none">
                      {genre}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Overview */}
            <p className="text-gray-500">{media.overview}</p>

            {/* division, note */}
            <div className="w-full h-[1px] border-t-2 border-dashed border-gray-100 my-3" />

            <div className="flex-grow">
              <p className="text-gray-500 text-lg">{media.note}</p>
            </div>

            {/* Link to homepage */}
            <div className="flex justify-center">
              <a
                href={media.homepage ?? ""}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full font-thin text-gray-500 text-lg"
              >
                Watch
                <Image
                  src="/media/icons/arrow.svg"
                  alt="External link"
                  width={14}
                  height={14}
                  className="w-4 h-4"
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
