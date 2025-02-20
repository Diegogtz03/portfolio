"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ProjectImage } from "@/interfaces/projects";

export const image_url = "https://guti.sfo3.digitaloceanspaces.com/projects";

export default function PictureHover({
  images,
  id,
}: {
  images: ProjectImage[];
  id: string;
}) {
  return (
    <motion.div className="flex flex-row gap-5 mb-8 relative">
      {images.map((image, i) => {
        return <HoveredPicture key={i} image={image} index={i} id={id} />;
      })}
    </motion.div>
  );
}

function HoveredPicture({
  image,
  index,
  id,
}: {
  image: ProjectImage;
  index: number;
  id: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (isHovered) {
      setIsExpanded(true);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  return (
    <div className="w-fill h-fill">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{ opacity: 1, scale: 1, backgroundColor: "#00000040" }}
            exit={{ opacity: 0, scale: 0.8, backgroundColor: "transparent" }}
            className="fixed inset-0 flex items-center justify-center z-[1000]"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={`${image_url}/${id}/${image.src}`}
                width={image.width}
                height={image.height}
                alt="Project picture"
                className="rounded-xl shadow-lg max-h-[80vh] w-auto border-2 border-gray-300"
                style={{ aspectRatio: image.aspect_ratio }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          rotate: Math.floor(Math.random() * 30) - 15,
          scale: 0.5,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          display: isHovered ? "block" : "none",
          rotate: isHovered
            ? Math.floor(Math.random() * 10) - 5
            : Math.floor(Math.random() * 10) - 5,
          scale: isHovered ? 1 : 0.5,
        }}
        className="absolute bottom-[200%] h-fill left-0 right-0 m-auto z-[100] w-fill"
        onClick={handleClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Image
          src={`${image_url}/${id}/${image.src}`}
          width={image.width}
          height={image.height}
          alt="Project picture"
          className="rounded-xl shadow-lg max-w-none border-2 border-gray-300 z-[100] cursor-zoom-in sm:max-h-[24rem] sm:max-w-[24rem] max-h-[14rem] w-auto max-w-[14rem]"
          style={{ aspectRatio: image.aspect_ratio }}
        />
      </motion.div>
      <motion.h1
        initial={{ opacity: 1 }}
        whileHover={{ opacity: 0.4, rotate: 8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="text-2xl font-[50] text-gray-400 cursor-pointer select-none z-[301] pt-2 pb-5"
      >
        {"{ "}
        {index + 1}
        {" }"}
      </motion.h1>
    </div>
  );
}
