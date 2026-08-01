import Link from "next/link";

type DepartmentListItem = {
  id: string;
  name: string;
  code: string;
  _count: {
    courses: number;
    instructors: number;
    students: number;
  };
};

export function DepartmentList({
  departments,
}: {
  departments: DepartmentListItem[];
}) {
  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Departments</h1>
        <Link href="/" className="text-sm text-blue-600 underline">
          Home
        </Link>
      </div>

      <div className="grid gap-4">
        {departments.map((department) => (
          <article
            key={department.id}
            className="rounded-xl border border-slate-200 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <Link
                  href={`/departments/${department.id}`}
                  className="text-xl font-semibold text-slate-900 hover:underline"
                >
                  {department.name}
                </Link>
                <p className="mt-1 text-sm uppercase tracking-[0.2em] text-slate-500">
                  {department.code}
                </p>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {department._count.courses} courses
              </div>
            </div>

            <ul className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-3">
              <li>Courses: {department._count.courses}</li>
              <li>Instructors: {department._count.instructors}</li>
              <li>Students: {department._count.students}</li>
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}
