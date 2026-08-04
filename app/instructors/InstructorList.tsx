import Link from "next/link";

type InstructorListItem = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  department: {
    id: string;
    name: string;
    code: string;
  };
  _count: {
    sections: number;
  };
};

export function InstructorList({
  instructors,
}: {
  instructors: InstructorListItem[];
}) {
  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Instructors</h1>
        <Link href="/" className="text-sm text-blue-600 underline">
          Home
        </Link>
      </div>

      <div className="grid gap-4">
        {instructors.map((instructor) => (
          <article
            key={instructor.id}
            className="rounded-xl border border-slate-200 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <Link
                  href={`/instructors/${instructor.id}`}
                  className="text-xl font-semibold text-slate-900 hover:underline"
                >
                  {instructor.first_name} {instructor.last_name}
                </Link>
                <p className="mt-1 text-sm text-slate-600">
                  {instructor.email}
                </p>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {instructor._count.sections} sections
              </div>
            </div>

            <div className="mt-3 text-sm text-slate-700">
              <span className="font-medium">Department:</span>{" "}
              <Link
                href={`/departments/${instructor.department.id}`}
                className="text-blue-600 hover:underline"
              >
                {instructor.department.name}
              </Link>
              <span className="ml-2 text-slate-500">
                ({instructor.department.code})
              </span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
