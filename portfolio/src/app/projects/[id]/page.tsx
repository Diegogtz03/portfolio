"use client";

import { usePathname } from "next/navigation";
import { getSimplifiedProjectList } from "@/helper/projectInfo";
import { SimplifiedProjectType } from "@/interfaces/projects";
import ClientWrapper from "@/components/projects/ClientWrapper";

export default function Projects() {
  const pathname = usePathname();
  const projects: SimplifiedProjectType[] = getSimplifiedProjectList();

  return projects ? (
    <ClientWrapper id={pathname.split("/projects/")[1]} projects={projects} />
  ) : (
    <div>Loading skeleton...</div>
  );
}
