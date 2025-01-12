export async function POST(req: Request) {
  const { username, password } = await req.json()

  if (username === "admin" && password === "admin") {
    return Response.json({ user: { id: "1", name: "admin" } })
  }

  return Response.json({ user: null }, { status: 401 })
}