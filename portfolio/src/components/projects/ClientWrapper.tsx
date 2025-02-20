"use client";

import { getProject } from "@/helper/projectInfo";
import { SimplifiedProjectType, ProjectType } from "@/interfaces/projects";
import BentoScroll from "@/components/projects/BentoScroll";
import { ProjectDetails } from "@/components/projects/ProjectDetails";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export default function ClientWrapper({
  id,
  projects,
}: {
  id: string;
  projects: SimplifiedProjectType[];
}) {
  const [currentId, setCurrentId] = useState<string>(id);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [projectInfo, setProjectInfo] = useState<ProjectType | null>(null);

  const getProjectDetails = async () => {
    const response: ProjectType | null = await getProject(currentId);
    setProjectInfo(response);
  };

  useEffect(() => {
    if (currentId != "") {
      getProjectDetails();
      setIsOpened(true);
    }
  }, [currentId]);

  useEffect(() => {
    if (!isOpened) {
      // remove url
      window && window.history.replaceState({}, "", "/projects/");
      setCurrentId("");
    } else {
      // set current url
      window && window.history.replaceState({}, "", `/projects/${currentId}`);
    }
  }, [isOpened]);

  return projects ? (
    <motion.div className="h-screen w-full pb-40 overflow-hidden">
      <motion.div
        animate={{
          filter: isOpened ? "blur(10px)" : "blur(0px)",
          scale: isOpened ? 0.98 : 1,
        }}
        transition={{ duration: 0.4 }}
        className="h-full w-full"
      >
        <BentoScroll projects={projects} setCurrentId={setCurrentId} />
      </motion.div>
      <AnimatePresence mode="wait">
        {isOpened && projectInfo && (
          <ProjectDetails project={projectInfo} setIsOpen={setIsOpened} />
        )}
      </AnimatePresence>
    </motion.div>
  ) : (
    <div>Loading skeleton...</div>
  );
}
