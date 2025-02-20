import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

const ROTATION_MAX = 15;
const ROTATION_MIN = -15;

export default function Media({
  url,
  isVideo = false,
}: {
  url: string;
  isVideo: boolean;
}) {
  const [mediaRotation, setMediaRotation] = useState<number>(
    Math.random() * (ROTATION_MAX - ROTATION_MIN) + ROTATION_MIN
  );

  return isVideo ? (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: mediaRotation }}
      className="rounded-xl border-2 border-btn-gn sm:h-40 sm:w-80 h-10 w-20 overflow-hidden p-1 shadow-xl backdrop-blur-sm"
    >
      <video
        src={`https://guti.sfo3.digitaloceanspaces.com/hobbies/${url}`}
        autoPlay
        loop
        muted
        className="rounded-lg h-full w-full object-cover"
      />
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: mediaRotation }}
      className="rounded-xl border-2 border-btn-gn sm:h-full sm:w-full min-w-30 overflow-hidden p-1 shadow-xl backdrop-blur-sm"
    >
      <Image
        src={`https://guti.sfo3.digitaloceanspaces.com/hobbies/${url}`}
        alt="Film Camera Picture"
        width={200}
        height={200}
        draggable={false}
        priority
        className="h-fit w-fit select-none rounded-lg overflow-hidden"
      />
    </motion.div>
  );
}
