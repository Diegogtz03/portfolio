export default function Home({ params }: { params: { id: string } }) {
  return (
    <main className="flex flex-col gap-4 ">
      <p className="text-white">
        Project {params.id}
      </p>
    </main>
  );
}
