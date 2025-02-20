import { Media } from "@/interfaces/media";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface AdminProps {
  params: {
    id: string;
  };
}

export default async function AdminMedia({ params }: AdminProps) {
  const mediaId = params.id[0];

  const myHeaders = new Headers();
  myHeaders.append("X-API-Key", process.env.API_AUTH_TOKEN as string);
  myHeaders.append("Content-Type", "application/json");

  const media = await fetch(`${process.env.API_ROOT_ROUTE}/media`, {
    method: "POST",
    headers: myHeaders,
    cache: "no-store",
    body: JSON.stringify({
      type: 1,
      mediaId: mediaId,
    }),
  });

  const mediaData = (await media.json()) as Media;

  async function updateMedia(formData: FormData) {
    "use server";
    const stars = formData.get("stars");
    const note = formData.get("note");
    const highlighted = formData.get("highlighted") === "on";
    const is_tv_show = formData.get("isTvShow") === "on";

    const myHeaders = new Headers();
    myHeaders.append("X-API-Key", process.env.API_AUTH_TOKEN as string);
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${process.env.API_ROOT_ROUTE}/media`, {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        id: mediaId,
        stars: stars,
        note: note,
        highlighted: highlighted,
        is_tv_show: is_tv_show,
      }),
    });

    if (!response.ok) {
      return <div className="text-red-500">Failed to update media</div>;
    }

    redirect("/admin/fun/media");
  }

  async function deleteMedia() {
    "use server";
    const myHeaders = new Headers();
    myHeaders.append("X-API-Key", process.env.API_AUTH_TOKEN as string);
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${process.env.API_ROOT_ROUTE}/media`, {
      method: "DELETE",
      headers: myHeaders,
      body: JSON.stringify({ id: mediaId }),
    });

    if (!response.ok) {
      return <div className="text-red-500">Failed to delete media</div>;
    }

    redirect("/admin/fun/media");
  }

  return (
    <div className="flex flex-col gap-4 p-5 text-white items-center max-w-md mx-auto">
      <Link
        href="/admin/fun/media"
        className="text-blue-500 hover:text-blue-400"
      >
        &larr; Back to media
      </Link>
      <h1 className="text-2xl font-bold">{mediaData.title}</h1>
      <Image
        src={mediaData.poster_path}
        alt={mediaData.title ?? ""}
        width={200}
        height={200}
      />
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Overview</h2>
        <p className="text-sm">{mediaData.overview}</p>
      </div>

      <form action={updateMedia} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Stars</h2>
          <input
            type="number"
            name="stars"
            className="text-black p-2 rounded-md"
            defaultValue={mediaData.stars ?? ""}
            min={0}
            max={5}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Note</h2>
          <textarea
            name="note"
            className="text-black p-2 rounded-md"
            defaultValue={mediaData.note ?? ""}
          />
        </div>

        <div className="flex flex-row gap-4">
          <h2 className="text-xl font-bold">Highlighted</h2>
          <input
            type="checkbox"
            name="highlighted"
            className="text-black p-2 rounded-md"
            defaultChecked={mediaData.highlighted ?? false}
          />
        </div>

        <div className="flex flex-row gap-4">
          <h2 className="text-xl font-bold">Is TV Show</h2>
          <input
            type="checkbox"
            name="isTvShow"
            className="text-black p-2 rounded-md"
            defaultChecked={mediaData.is_tv_show ?? false}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Update Media
        </button>
      </form>

      <form action={deleteMedia}>
        <button type="submit" className="bg-red-500 text-white p-2 rounded-md">
          Delete Media
        </button>
      </form>
    </div>
  );
}
