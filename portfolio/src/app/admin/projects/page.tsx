import { SimplifiedProjectList } from "@/interfaces/projects";
import { DemoProjectCreator } from "@/components/DemoProjectCreator/DemoProjectCreator";

export default async function Home() {
  let data = await fetch('http://localhost:8080/projects', {
    method:"GET",
    cache: "no-store"
  })
  let projects = await data.json() as SimplifiedProjectList

  return (
    <main>
      <p className="text-white">
        LENGTH: {projects.projects.length}
      </p>

      <DemoProjectCreator />
    </main>
  );
}
