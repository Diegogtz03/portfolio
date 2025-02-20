import Image from "next/image";
import { motion } from "framer-motion";

export default function SVGSticker({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <div className={`${className}`}>
      <motion.div
        className={`relative overflow-hidden rounded-full opacity-0 shadow-lg p-2 items-center justify-center flex aspect-square`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="relative z-10 p-[3px] object-contain"
        />

        {/* Shimmer effect overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
            animation: "shimmer 2s infinite",
            animationDelay: `${(Math.random() * 3).toFixed(2)}s`,
          }}
        />

        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </motion.div>
    </div>
  );
}
