import { Song } from "@/interfaces/music";
import { redirect } from "next/navigation";

interface AdminProps {
  params: {
    id: string;
  };
}

export default async function Admin({ params }: AdminProps) {
  const songId = params.id[0];

  const myHeaders = new Headers();
  myHeaders.append("X-API-Key", process.env.API_AUTH_TOKEN as string);
  myHeaders.append("Content-Type", "application/json");

  const song = await fetch(`${process.env.API_ROOT_ROUTE}/music/spotify`, {
    method: "POST",
    cache: "no-store",
    headers: myHeaders,
    body: JSON.stringify({
      type: 1,
      songId: songId,
    }),
  });

  const songData: Song = await song.json();

  console.log(songData);

  async function updateSong(formData: FormData) {
    "use server";
    const note = formData.get("note");
    const highlighted = formData.get("highlighted") === "on";

    const myHeaders = new Headers();
    myHeaders.append("X-API-Key", process.env.API_AUTH_TOKEN as string);
    myHeaders.append("Content-Type", "application/json");

    const res = await fetch(`${process.env.API_ROOT_ROUTE}/music/spotify`, {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        id: songId,
        note: note,
        highlighted: highlighted,
      }),
    });

    if (!res.ok) {
      console.error("Failed to update song");
    }

    redirect("/admin/fun/music");
  }

  async function deleteSong() {
    "use server";
    const songId = params.id[0];

    console.log(songId);

    const myHeaders = new Headers();
    myHeaders.append("X-API-Key", process.env.API_AUTH_TOKEN as string);
    myHeaders.append("Content-Type", "application/json");

    const res = await fetch(`${process.env.API_ROOT_ROUTE}/music/spotify`, {
      method: "DELETE",
      headers: myHeaders,
      body: JSON.stringify({
        id: songId,
      }),
    });

    if (!res.ok) {
      console.error("Failed to delete song");
    }

    redirect("/admin/fun/music");
  }

  return (
    <div className="flex flex-col gap-4 p-5 text-white max-w-4xl mx-auto">
      <a href="/admin/fun/music" className="text-blue-500 hover:text-blue-400">
        &larr; Back to songs
      </a>

      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-white">
          {songData.name} - {songData.artists}
        </h1>

        <img
          src={songData.album_image}
          alt={`Album art for ${songData.name}`}
          className="w-48 h-48 rounded-md"
        />
        <form action={updateSong} className="flex flex-col gap-4">
          <textarea
            name="note"
            placeholder="Note"
            className="bg-gray-800 text-white p-2 rounded-md"
            defaultValue={songData.note ?? ""}
            rows={4}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="highlighted"
              id="highlighted"
              className="bg-gray-800 text-white p-2 rounded-md"
              defaultChecked={songData.highlighted ?? false}
            />
            <label htmlFor="highlighted" className="text-white">
              Highlighted
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </form>
        <form action={deleteSong}>
          <button
            type="submit"
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
