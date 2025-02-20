import { MediaList } from "@/interfaces/media";

export async function POST(request: Request) {
  const body = await request.json();

  const headers = new Headers();
  headers.append("X-API-Key", process.env.API_AUTH_TOKEN as string);
  headers.append("Content-Type", "application/json");

  const res = await fetch(`${process.env.API_ROOT_ROUTE}/media`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify(body),
    headers: headers,
  });

  const data = (await res.json()) as MediaList;

  return Response.json({ data });
}