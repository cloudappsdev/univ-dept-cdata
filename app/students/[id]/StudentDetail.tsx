import Link from "next/link";

type StudentEnrollment = {
  id: string;
  grade: string | null;
  section: {
    id: string;
    term: string;
    section_number: string;
    course: {
      id: string;
      course_number: string;
      title: string;
    };
    instructor: {
      id: string;
      department_id: string;
      first_name: string;
      last_name: string;
      email: string;
    };
  };
};

type StudentDetailData = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  major_department: {
    id: string;
    name: string;
    code: string;
  } | null;
  enrollments: StudentEnrollment[];
};

export function StudentDetail({ student }: { student: StudentDetailData }) {
  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Student
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            {student.first_name} {student.last_name}
          </h1>
        </div>
        <Link href="/students" className="text-sm text-blue-600 underline">
          Back to students
        </Link>
      </div>

      <section className="mb-6 rounded-xl border border-slate-200 p-4">
        <p className="text-slate-700">Email: {student.email}</p>
        <p className="mt-2 text-slate-700">
          Major:{" "}
          {student.major_department ? (
            <Link
              href={`/departments/${student.major_department.id}`}
              className="text-blue-600 hover:underline"
            >
              {student.major_department.name}
            </Link>
          ) : (
            "Undeclared"
          )}
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 p-4">
        <h2 className="mb-3 text-xl font-semibold">Course schedule</h2>
        <div className="space-y-4">
          {student.enrollments.length ? (
            student.enrollments.map((enrollment) => (
              <article
                key={enrollment.id}
                className="rounded-lg bg-slate-50 p-3"
              >
                <div className="flex items-center justify-between gap-4">
                  <Link
                    href={`/courses/${enrollment.section.course.id}`}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {enrollment.section.course.title}
                  </Link>
                  <span className="text-sm text-slate-500">
                    Grade: {enrollment.grade ?? "In progress"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {enrollment.section.term} • Section{" "}
                  {enrollment.section.section_number}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Instructor:{" "}
                  <Link
                    href={`/instructors/${enrollment.section.instructor.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {enrollment.section.instructor.first_name}{" "}
                    {enrollment.section.instructor.last_name}
                  </Link>
                </p>
              </article>
            ))
          ) : (
            <p className="text-slate-500">No enrollments yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
