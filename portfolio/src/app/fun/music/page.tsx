import { LiveMusicDisplay } from "@/components/fun/music/LiveMusicDisplay";
import { MusicCarrousel } from "@/components/fun/music/MusicCarrousel";
import { SongList } from "@/interfaces/music";
export default async function Music() {
  const songs = await fetch(`${process.env.API_ROOT_ROUTE}/music/spotify`, {
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

  let songsData: SongList = await songs.json();

  songsData.songs.sort((a, b) =>
    b.highlighted === a.highlighted ? 0 : b.highlighted ? 1 : -1
  );

  return (
    <main className="overflow-hidden w-screen h-screen">
      <div className="flex flex-col justify-center items-center gap-14 h-full">
        <LiveMusicDisplay />
        <div className="flex flex-col justify-center items-center gap-4 h-full">
          <MusicCarrousel songs={songsData.songs} />
        </div>
      </div>
    </main>
  );
}
