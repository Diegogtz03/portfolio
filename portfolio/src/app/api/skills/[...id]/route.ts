import { SkillData } from "@/interfaces/admin";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/skills/${params.id}`, {
    method: "GET",
  });

  const data = (await res.json()) as SkillData;

  return Response.json({ data });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/skills/${params.id}`, {
    method: "DELETE",
  });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();

  const res = await fetch(`${process.env.API_ROOT_ROUTE}/skills/${params.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return Response.json({ res });
}
