import { SkillDataList } from "@/interfaces/admin";

export async function GET(request: Request) {
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/skills`, {
    method: "GET",
  });

  const data = (await res.json()) as SkillDataList;

  return Response.json({ data });
}

export async function POST(request: Request) {
  const data = await request.json();

  const res = await fetch(`${process.env.API_ROOT_ROUTE}/skills`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();

  return Response.json({ response });
}
