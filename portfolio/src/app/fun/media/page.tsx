import MediaCarrousel from "@/components/fun/media/MediaCarrousel";
import { MediaList } from "@/interfaces/media";

export default async function Media() {
  const response = await fetch(`${process.env.API_ROOT_ROUTE}/media`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({
      type: 0,
    }),
    headers: {
      "X-API-Key": process.env.API_AUTH_TOKEN as string,
      "Content-Type": "application/json",
    },
  });

  let mediaData: MediaList = await response.json();

  let movies = mediaData.media.filter((media) => media.is_tv_show === false);
  let tvShows = mediaData.media.filter((media) => media.is_tv_show === true);

  return (
    <main className="overflow-hidden w-screen h-screen">
      <div className="w-full h-[-webkit-fill-available] absolute top-[50%] right-[50%] translate-x-1/2 -translate-y-1/2 sm:gap-14 gap-[60px] md:gap-40 flex sm:flex-row flex-col justify-evenly">
        <MediaCarrousel media={movies} />

        <MediaCarrousel media={tvShows} />
      </div>
    </main>
  );
}
