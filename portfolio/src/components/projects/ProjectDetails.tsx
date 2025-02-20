"use client";
import { ProjectType } from "@/interfaces/projects";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import PictureHover from "./PictureHover";

export const image_url = "https://guti.sfo3.digitaloceanspaces.com/projects";

export function ProjectDetails({
  project = null,
  setIsOpen,
}: {
  project: ProjectType | null;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <motion.div
      initial={{ translateY: "100%" }}
      animate={{ translateY: "0" }}
      exit={{ translateY: "100%" }}
      transition={{ duration: 0.4, damping: 300, type: "tween" }}
      className="absolute w-full h-full top-5 pb-5 z-[1000] sm:px-4 px-2 overflow-hidden"
    >
      <div className="w-full h-full bg-btn-bg rounded-2xl p-5 pt-10 border-4 border-gray-200 overflow-scroll no-scrollbar scroll-smooth flex justify-center relative">
        <div
          onClick={() => setIsOpen(false)}
          className="fixed bg-black/60 w-11 h-11 sm:right-10 right-8 sm:top-10 top-8 rounded-full items-center flex justify-center cursor-pointer z-[20]"
        >
          <Image
            src={"/media/icons/close.svg"}
            width={18}
            height={18}
            alt="close button"
          />
        </div>
        {project ? (
          <div className="flex flex-col items-center gap-5 sm:max-w-[58vw] max-w-[78vw] h-fit">
            {/* Top Image */}
            <div className="h-fit w-fit relative">
              <Image
                src={`${image_url}/${project.id}/${project.icon}`}
                priority
                width={200}
                height={200}
                alt={project.name}
                quality={75}
                className="sm:h-[90px] h-[70px] w-auto absolute left-0 right-0 bottom-0 top-0 m-auto"
              />
              <div className="py-2 px-4 bg-gray-100 rounded-full absolute -bottom-[5%] -right-[4%] border-2 overflow-visible">
                <p style={{ color: `${project.accentColor}` }}>{project.tag}</p>
              </div>
              <Image
                src={`${image_url}/${project.id}/${project.backdrop}`}
                width={2912}
                height={1632}
                priority
                alt={project.name}
                quality={75}
                className="h-fill w-fill object-cover sm:max-w-[58vw] max-w-[78vw] max-h-[30vh] rounded-2xl overflow-hidden"
              />
            </div>

            {/* Title */}
            <div className="flex flex-col items-center">
              <h1 className="font-[50] text-gray-300 text-[4rem] h-fit -mb-3">
                {project.name}
              </h1>
              <p className="text-gray-300 font-[50] opacity-60 text-[20px]">
                {project.date}
              </p>
            </div>

            {/* Description */}
            <div className="flex sm:flex-row flex-col w-full h-full sm:gap-20 gap-5 items-center sm:items-start">
              <p className="text-lg text-gray-400 w-full whitespace-pre-line">
                {project.description}
              </p>
              {/* Links */}
              <div className="flex flex-col w-fit h-fit text-right items-end">
                {project.links.map((link, i) => {
                  return (
                    <Link
                      href={link.link}
                      target="_blank"
                      key={i}
                      className="flex flex-row items-center gap-2 w-max"
                    >
                      <p className="text-gray-300 text-lg select-none">
                        {link.name}
                      </p>
                      <Image
                        src={"/media/icons/up-right-arrow.svg"}
                        alt={link.name}
                        height={30}
                        width={30}
                        className="w-fit h-fit"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

            {project.images.length != 0 && (
              <PictureHover images={project.images} id={project.id} />
            )}
          </div>
        ) : (
          <p>No project found</p>
        )}
      </div>
    </motion.div>
  );
}
