export default function Home({ params }: { params: { id: string } }) {
  return (
    <main>
      <p className="text-white">
        Project {params.id}
      </p>
    </main>
  );
}
