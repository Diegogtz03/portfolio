import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import router from "next/router";
import Link from "next/link";

export default async function AdminMedia() {
  const session = await getServerSession();

  if (!session) {
    redirect("/admin");
  }

  const myHeaders = new Headers();
  myHeaders.append("X-API-Key", process.env.API_AUTH_TOKEN as string);
  myHeaders.append("Content-Type", "application/json");

  let mediaResult = await fetch(`${process.env.API_ROOT_ROUTE}/media`, {
    method: "POST",
    headers: myHeaders,
    cache: "no-store",
    body: JSON.stringify({
      type: 0,
    }),
  });

  let media = await mediaResult.json();
  media = media.media;

  console.log(media);

  async function addMedia(formData: FormData) {
    "use server";
    const mediaId = formData.get("mediaId");
    const highlighted = formData.get("highlighted") === "on";
    const note = formData.get("note");
    const stars = formData.get("stars");
    const isTvShow = formData.get("isTvShow") === "on";

    const myHeaders = new Headers();
    myHeaders.append("X-API-Key", process.env.API_AUTH_TOKEN as string);
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${process.env.API_ROOT_ROUTE}/media/add`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        media_uuid: mediaId,
        highlighted: highlighted,
        note: note,
        is_tv_show: isTvShow,
        stars: stars,
      }),
    });

    if (!response.ok) {
      console.error("Failed to add media");
    }

    redirect("/admin/fun/media");
  }

  return (
    <div className="flex flex-col gap-4 p-5 text-white items-center">
      <Link href="/admin/fun" className="text-blue-500 hover:text-blue-400">
        &larr; Back to fun
      </Link>
      <h1 className="text-2xl font-bold">Media</h1>

      <form action={addMedia} className="flex flex-col gap-2 max-w-md">
        <input
          type="text"
          name="mediaId"
          placeholder="Media ID"
          className="text-black p-2 rounded-md"
        />
        <div className="flex flex-row gap-2">
          <label htmlFor="highlighted">Highlighted</label>
          <input
            type="checkbox"
            name="highlighted"
            placeholder="Highlighted"
            className="text-black p-2 rounded-md"
          />
        </div>
        <div className="flex flex-row gap-2">
          <label htmlFor="isTvShow">Is TV Show</label>
          <input
            type="checkbox"
            name="isTvShow"
            placeholder="Is TV Show"
            className="text-black p-2 rounded-md"
          />
        </div>
        <textarea
          name="note"
          placeholder="Note"
          className="text-black p-2 rounded-md"
        />
        <input
          type="number"
          min={0}
          max={5}
          name="stars"
          placeholder="Stars"
          className="text-black p-2 rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Add Media
        </button>
      </form>

      <div className="flex flex-row gap-4">
        {media.map((media: any) => (
          <Link
            key={media.id}
            href={`/admin/fun/media/${media.id}`}
            className={`bg-gray-800 text-white rounded-md ${
              media.highlighted
                ? "border-4 border-yellow-500"
                : "border-4 border-blue-800"
            }`}
          >
            <Image
              src={media.poster_path}
              className="rounded-md"
              alt={media.title}
              width={200}
              height={200}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
