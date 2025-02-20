"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

let COLORS = ["#54AEF6"];
export const ROTATION_MAX = 15;
export const ROTATION_MIN = -15;

export default function Folder({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [folderColor, setFolderColor] = useState<string>(
    COLORS[Math.floor(Math.random() * COLORS.length)]
  );
  const [folderRotation, setFolderRotation] = useState<number>(
    Math.random() * (ROTATION_MAX - ROTATION_MIN) + ROTATION_MIN
  );

  const redirectToPage = () => {
    router.push(link);
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
        rotate: folderRotation,
        backgroundColor: folderColor,
      }}
      className={`sm:h-32 sm:w-40 rounded-xl relative shadow-xl h-28 w-32`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ backgroundColor: folderColor }}
        animate={{ backgroundColor: folderColor }}
        transition={{ duration: 0 }}
        className={`w-[40%] h-10 rounded-[8px] -translate-y-4`}
      />
      <div className="absolute top-0 h-full w-full">
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            key={i}
            initial={{
              x: 0,
              y: 20,
              rotate: 0,
            }}
            animate={{
              x: isHovered ? i * 27 - 27 : i * 23 - 23,
              y: i == 1 ? (isHovered ? -17 : -8) : isHovered ? -10 : -3,
              // y: i == 1 ? (isHovered ? -17 : 25) : isHovered ? -10 : 25,
              zIndex: i == 1 ? 1 : 0,
              rotate:
                i == 1
                  ? 0
                  : i == 0
                  ? isHovered
                    ? -10
                    : -7
                  : isHovered
                  ? 10
                  : 7,
            }}
            transition={{
              duration: 0.3,
            }}
            className="w-[60%] bg-white h-[50%] border-2 rounded-lg shadow m-auto absolute left-0 right-0 cursor-pointer"
            onClick={redirectToPage}
          />
        ))}
      </div>
      <motion.div
        initial={{ backgroundColor: folderColor }}
        animate={{ backgroundColor: folderColor }}
        transition={{ duration: 0 }}
        className={`bg-[${folderColor}] shadow-xl w-full h-[87%] rounded-xl shadow-[rgba(0,0,15,0.15)_0px_-4px_5px_1px] absolute bottom-0 z-10 transition-all`}
      >
        <div className="flex flex-col gap-1 h-fit w-full absolute bottom-3">
          <p className="text-white font-bold sm:text-[23px] px-3 text-[20px]">
            {title}
          </p>
          <motion.div
            initial={{ backgroundColor: folderColor }}
            animate={{ backgroundColor: folderColor }}
            className={`h-1 w-full bg-[${folderColor}] brightness-[90%]`}
          />
          <motion.div
            initial={{ backgroundColor: folderColor }}
            animate={{ backgroundColor: folderColor }}
            className={`h-1 w-full bg-[${folderColor}] brightness-[90%]`}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
