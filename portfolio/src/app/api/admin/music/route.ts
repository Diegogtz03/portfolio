// Create a new song
export async function POST(request: Request) {
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/music`, {
    method: "POST",
    body: request.body,
  });

  return Response.json({ data: await res.json() });
}

// Delete a song
export async function DELETE(request: Request) {
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/music`, {
    method: "DELETE",
    body: request.body,
  });

  return Response.json({ data: await res.json() });
}

// Update a song
export async function PUT(request: Request) {
  const res = await fetch(`${process.env.API_ROOT_ROUTE}/music`, {
    method: "PUT",
    body: request.body,
  });

  return Response.json({ data: await res.json() });
}
