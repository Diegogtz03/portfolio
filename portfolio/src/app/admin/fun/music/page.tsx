import { SongList } from "@/interfaces/music";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminFun() {
  const session = await getServerSession();

  if (!session) {
    redirect("/admin");
  }

  const myHeaders = new Headers();
  myHeaders.append("X-API-Key", process.env.API_AUTH_TOKEN as string);
  myHeaders.append("Content-Type", "application/json");

  let songsResult = await fetch(`${process.env.API_ROOT_ROUTE}/music/spotify`, {
    method: "POST",
    cache: "no-store",
    headers: myHeaders,
    body: JSON.stringify({
      type: 1,
    }),
  });

  if (!songsResult.ok) {
    return (
      <div className="flex flex-col gap-4 p-5 text-white">
        Failed to fetch songs
      </div>
    );
  }

  let songs = (await songsResult.json()) as SongList;

  async function addSong(formData: FormData) {
    "use server";
    const songId = formData.get("songId");
    const highlighted = formData.get("highlighted");
    const note = formData.get("note");

    const myHeaders = new Headers();
    myHeaders.append("X-API-Key", process.env.API_AUTH_TOKEN as string);
    myHeaders.append("Content-Type", "application/json");

    const res = await fetch(`${process.env.API_ROOT_ROUTE}/music/spotify/add`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        song_uuid: songId,
        highlighted: highlighted === "on",
        note: note,
      }),
    });

    if (!res.ok) {
      console.error("Failed to add song");
    }

    redirect("/admin/fun/music");
  }

  return (
    <main className="flex flex-col gap-4 p-5 text-white items-center">
      <Link href="/admin/fun" className="text-blue-500 hover:text-blue-400">
        &larr; Back to fun
      </Link>
      <h1 className="text-4xl font-bold text-white">Songs</h1>
      <form action={addSong} className="flex flex-col gap-4 p-5 text-white">
        <input
          type="text"
          name="songId"
          placeholder="Song UUID"
          className="bg-gray-800 text-white p-2 rounded-md"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="highlighted"
            id="highlighted"
            className="bg-gray-800 text-white p-2 rounded-md"
          />
          <label htmlFor="highlighted" className="text-white">
            Highlighted
          </label>
        </div>
        <textarea
          name="note"
          placeholder="Note"
          className="bg-gray-800 text-white p-2 rounded-md"
          rows={4}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Add Song
        </button>
      </form>
      <div className="flex flex-col gap-4 p-5 text-white">
        {songs.songs.map((song) => (
          <Link
            key={song.id}
            href={`/admin/fun/music/${song.id}`}
            className={`${
              song.highlighted ? "bg-blue-500" : "bg-gray-800"
            } p-2 rounded-md hover:opacity-80 flex items-center gap-4`}
          >
            <img
              src={song.album_image}
              alt={`Album art for ${song.name}`}
              className="w-12 h-12 rounded-md"
            />
            {song.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
