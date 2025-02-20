"use client";

import { getSimplifiedProjectList } from "@/helper/projectInfo";
import { SimplifiedProjectType } from "@/interfaces/projects";
import ClientWrapper from "@/components/projects/ClientWrapper";

export default function Projects() {
  const projects: SimplifiedProjectType[] = getSimplifiedProjectList();

  return projects ? (
    <ClientWrapper id={""} projects={projects} />
  ) : (
    <div>Loading skeleton...</div>
  );
}
