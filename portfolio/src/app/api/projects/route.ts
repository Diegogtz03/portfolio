import { ProjectList } from "@/interfaces/projects";

export async function GET(request: Request) {
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/projects`, {
    method: "GET",
    cache: "no-store",
  });

  console.log(res);

  const data = (await res.json()) as ProjectList;

  return Response.json({ data });
}
