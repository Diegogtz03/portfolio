import Link from "next/link";

export default function Admin() {
  return (
    <div className="flex flex-col gap-4 p-5 text-white max-w-4xl mx-auto">
      <Link href="/admin" className="text-blue-500 hover:text-blue-400">
        &larr; Back to admin
      </Link>
      <Link
        href="/admin/fun/music"
        className="text-blue-500 hover:text-blue-400"
      >
        Music
      </Link>
      <Link
        href="/admin/fun/media"
        className="text-blue-500 hover:text-blue-400"
      >
        Media
      </Link>
    </div>
  );
}
