import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const baseUrl = "https://guti.sfo3.digitaloceanspaces.com/hobbies";

const hobbies = [
  {
    name: "Analog Photography",
    image: `analog.png`,
    className: "col-span-2 row-span-2",
  },
  {
    name: "Watching Series",
    image: `series.png`,
    className: "col-span-1 row-span-2",
  },
  {
    name: "Design",
    image: `design.mp4`,
    className: "col-span-1 row-span-2",
  },
  {
    name: "Music",
    image: `music.png`,
    className: "col-span-1 row-span-2",
  },
  {
    name: "Video Editing",
    image: `video-editing.gif`,
    className: "col-span-1 row-span-2",
  },
];

export default function Hobbies() {
  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-4 w-full h-full sm:pb-20 pb-10 sm:px-20 px-4">
      {hobbies.map((hobby, index) => (
        <HobbieCard key={index} hobby={hobby} index={index} />
      ))}
    </div>
  );
}

function HobbieCard({ hobby, index }: { hobby: any; index: number }) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <motion.div
      key={hobby.name}
      className={`relative overflow-hidden rounded-2xl bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ${hobby.className} group`}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-gray-900/20 flex items-center justify-center z-[51]"
      >
        <p className="text-white text-[100px] font-[50] select-none text-center">
          {hobby.name}
        </p>
      </motion.div>
      <motion.div
        className="absolute z-[50] w-full h-full rounded-2xl"
        initial={{ opacity: 0, display: "hidden" }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          WebkitFilter: `pixelate(${16}px)`,
          filter: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='pixelate' x='0' y='0'%3E%3CfeFlood x='4' y='4' height='2' width='2'/%3E%3CfeComposite width='${12}' height='${12}'/%3E%3CfeTile result='a'/%3E%3CfeComposite in='SourceGraphic' in2='a' operator='in'/%3E%3CfeMorphology operator='dilate' radius='${
            12 / 2
          }'/%3E%3C/filter%3E%3C/svg%3E#pixelate")`,
          imageRendering: "pixelated",
          backdropFilter: `blur(${15}px)`,
        }}
      />
      {hobby.image.endsWith(".mp4") ? (
        <video
          src={`${baseUrl}/${hobby.image}`}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover transition-[filter] duration-300 group-hover:[filter:url(#pixelate)] transition-all"
        />
      ) : (
        <Image
          src={`${baseUrl}/${hobby.image}`}
          alt={hobby.name}
          fill
          className="object-cover transition-[filter] duration-300 group-hover:[filter:url(#pixelate)] transition-all"
        />
      )}
    </motion.div>
  );
}
