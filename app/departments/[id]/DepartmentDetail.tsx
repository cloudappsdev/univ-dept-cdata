import Link from "next/link";

type DepartmentCourse = { id: string; title: string; course_number: string };
type DepartmentInstructor = {
  id: string;
  first_name: string;
  last_name: string;
};
type DepartmentStudent = { id: string; first_name: string; last_name: string };

type DepartmentDetailData = {
  id: string;
  name: string;
  code: string;
  courses: DepartmentCourse[];
  instructors: DepartmentInstructor[];
  students: DepartmentStudent[];
};

export function DepartmentDetail({
  department,
}: {
  department: DepartmentDetailData;
}) {
  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            {department.code}
          </p>
          <h1 id="dnamm" className="text-3xl font-semibold text-slate-900">
            {department.name}
          </h1>
        </div>
        <Link href="/departments" className="text-sm text-blue-600 underline">
          Back to departments
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl border border-slate-200 p-4">
          <h2 className="mb-3 text-lg font-semibold">Courses</h2>
          <ul className="space-y-2">
            {department.courses.length ? (
              department.courses.map((course) => (
                <li key={course.id}>
                  <Link
                    href={`/courses/${course.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {course.title}
                  </Link>
                  <span className="ml-2 text-sm text-slate-500">
                    {course.course_number}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-slate-500">No courses assigned.</li>
            )}
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 p-4">
          <h2 className="mb-3 text-lg font-semibold">Instructors</h2>
          <ul className="space-y-2">
            {department.instructors.length ? (
              department.instructors.map((instructor) => (
                <li key={instructor.id}>
                  <Link
                    href={`/instructors/${instructor.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {instructor.first_name} {instructor.last_name}
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-slate-500">No instructors assigned.</li>
            )}
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 p-4">
          <h2 className="mb-3 text-lg font-semibold">Students</h2>
          <ul className="space-y-2">
            {department.students.length ? (
              department.students.map((student) => (
                <li key={student.id}>
                  <Link
                    href={`/students/${student.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {student.first_name} {student.last_name}
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-slate-500">No students enrolled.</li>
            )}
          </ul>
        </section>
      </div>
    </main>
  );
}
