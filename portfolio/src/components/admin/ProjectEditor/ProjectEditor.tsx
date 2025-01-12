"use client";

import {
  SimplifiedProjectList,
  SimplifiedProject,
} from "@/interfaces/projects";
import { useRouter } from "next/navigation";

export default function ProjectEditor({
  projects,
}: {
  projects: SimplifiedProjectList;
}) {
  const router = useRouter();

  const handleCreateNewProject = () => {
    router.push("/admin/projects/new");
  };

  const handleEditProject = (project: SimplifiedProject) => {
    router.push(`/admin/projects/${project.id}`);
  };

  return (
    <>
      <p className="text-white">LENGTH: {projects.projects.length}</p>

      <button
        className="bg-white text-black p-2 rounded-md"
        onClick={handleCreateNewProject}
      >
        Create New Project
      </button>

      <div className="flex flex-wrap gap-10 overflow-y-auto">
        {projects.projects.map((project: SimplifiedProject) => (
          <div
            key={project.id}
            className="flex flex-col gap-4 border border-white p-4 rounded-md cursor-pointer w-fit min-w-[300px]"
            onClick={() => handleEditProject(project)}
          >
            <p className="text-white">{project.title}</p>
            <p className="text-white">{project.tags}</p>
            <p className="text-white">{project.date}</p>
          </div>
        ))}
      </div>

      {/* Create a new project */}
    </>
  );
}
