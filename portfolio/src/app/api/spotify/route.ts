import { LiveMusic, ErrorMessage } from "@/interfaces/music"

export async function GET(request: Request) {
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/music/current`, {
    method: "GET",
    cache: "no-cache",
  })

  const data = (await res.json()) as LiveMusic | ErrorMessage

  return Response.json(data)
}
