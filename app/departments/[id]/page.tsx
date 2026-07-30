type Props = {
  params: Promise<{ id: string }>;
};

export default async function DepartmentDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Department Details</h1>
      <p className="mt-2 text-gray-600">Viewing department with id: {id}</p>
    </main>
  );
}
