type Props = {
  params: Promise<{ id: string }>;
};

export default async function StudentDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Student Details</h1>
      <p className="mt-2 text-gray-600">Viewing student with id: {id}</p>
    </main>
  );
}
