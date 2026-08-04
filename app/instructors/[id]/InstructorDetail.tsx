import Link from "next/link";

type InstructorSection = {
  id: string;
  term: string;
  section_number: string;
  schedule: string | null;
  course: {
    id: string;
    course_number: string;
    title: string;
  };
  enrollments: {
    id: string;
    student: {
      id: string;
      first_name: string;
      last_name: string;
    };
  }[];
};

type InstructorDetailData = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  department: {
    id: string;
    name: string;
    code: string;
  };
  sections: InstructorSection[];
};

export function InstructorDetail({
  instructor,
}: {
  instructor: InstructorDetailData;
}) {
  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Instructor
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            {instructor.first_name} {instructor.last_name}
          </h1>
        </div>
        <Link href="/instructors" className="text-sm text-blue-600 underline">
          Back to instructors
        </Link>
      </div>

      <section className="mb-6 rounded-xl border border-slate-200 p-4">
        <p className="text-slate-700">Email: {instructor.email}</p>
        <p className="mt-2 text-slate-700">
          Department:{" "}
          <Link
            href={`/departments/${instructor.department.id}`}
            className="text-blue-600 hover:underline"
          >
            {instructor.department.name}
          </Link>
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 p-4">
        <h2 className="mb-3 text-xl font-semibold">Teaching schedule</h2>
        <div className="space-y-4">
          {instructor.sections.length ? (
            instructor.sections.map((section) => (
              <article key={section.id} className="rounded-lg bg-slate-50 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <Link
                    href={`/sections/${section.id}`}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {section.term}
                  </Link>
                  <span className="text-sm text-slate-500">
                    Section {section.section_number}
                  </span>
                </div>

                <Link
                  href={`/courses/${section.course.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {section.course.title}
                </Link>
                <p className="mt-2 text-sm text-slate-600">
                  Schedule: {section.schedule ?? "TBA"}
                </p>

                <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
                  {section.enrollments.length ? (
                    section.enrollments.map((enrollment) => (
                      <li key={enrollment.id}>
                        <Link
                          href={`/students/${enrollment.student.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {enrollment.student.first_name}{" "}
                          {enrollment.student.last_name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li>No students enrolled.</li>
                  )}
                </ul>
              </article>
            ))
          ) : (
            <p className="text-slate-500">No sections assigned.</p>
          )}
        </div>
      </section>
    </main>
  );
}
