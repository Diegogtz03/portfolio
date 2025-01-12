import { SimplifiedProjectList } from "@/interfaces/projects";
import ProjectEditor from "@/components/admin/ProjectEditor/ProjectEditor";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    redirect("/admin");
  }

  const myHeaders = new Headers();
  myHeaders.append("X-API-Key", process.env.API_AUTH_TOKEN as string);

  let projectsResult = await fetch(`${process.env.API_ROOT_ROUTE}/projects`, {
    method: "GET",
    cache: "no-store",
    headers: myHeaders,
  });

  if (!projectsResult.ok) {
    return (
      <div className="flex flex-col gap-4 p-5 text-white">
        Failed to fetch projects
      </div>
    );
  }

  let projects = (await projectsResult.json()) as SimplifiedProjectList;

  return (
    <div className="flex flex-col gap-4 p-10">
      <ProjectEditor projects={projects} />
    </div>
  );
}
