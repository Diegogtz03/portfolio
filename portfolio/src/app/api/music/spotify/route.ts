import { SongList } from "@/interfaces/music";

export async function POST(request: Request) {
  const body = await request.json();

  const headers = new Headers();
  headers.append("X-API-Key", process.env.API_AUTH_TOKEN as string);
  headers.append("Content-Type", "application/json");

  const res = await fetch(`${process.env.API_ROOT_ROUTE}/music/spotify`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify(body),
    headers: headers,
  });

  const data = (await res.json()) as SongList;

  return Response.json({ data });
}

export async function PUT(request: Request) {
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/music/spotify`, {
    method: "PUT",
    body: request.body,
  });

  const data = (await res.json()) as SongList;

  return Response.json({ data });
}

export async function DELETE(request: Request) {
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/music/spotify`, {
    method: "DELETE",
    body: request.body,
  });
}