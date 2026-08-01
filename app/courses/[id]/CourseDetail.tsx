import Link from "next/link";

type CourseSection = {
  id: string;
  term: string;
  section_number: string;
  schedule: string | null;
  instructor: {
    id: string;
    first_name: string;
    last_name: string;
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

type CourseDetailData = {
  id: string;
  course_number: string;
  title: string;
  description: string | null;
  credits: number;
  department: {
    id: string;
    name: string;
    code: string;
  };
  sections: CourseSection[];
};

export function CourseDetail({ course }: { course: CourseDetailData }) {
  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            {course.department.code}
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            {course.title}
          </h1>
        </div>
        <Link href="/courses" className="text-sm text-blue-600 underline">
          Back to courses
        </Link>
      </div>

      <section className="mb-6 rounded-xl border border-slate-200 p-4">
        <p className="text-sm font-medium text-slate-600">
          {course.course_number}
        </p>
        <p className="mt-2 text-slate-700">
          {course.description ?? "No description provided."}
        </p>
        <p className="mt-3 text-sm text-slate-600">Credits: {course.credits}</p>
        <Link
          href={`/departments/${course.department.id}`}
          className="mt-3 inline-block text-blue-600 hover:underline"
        >
          {course.department.name}
        </Link>
      </section>

      <section className="rounded-xl border border-slate-200 p-4">
        <h2 className="mb-3 text-xl font-semibold">Sections</h2>
        <div className="space-y-4">
          {course.sections.length ? (
            course.sections.map((section) => (
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
                <p className="text-sm text-slate-600">
                  Schedule: {section.schedule ?? "TBA"}
                </p>
                <p className="mt-2 text-sm">
                  Instructor:{" "}
                  <Link
                    href={`/instructors/${section.instructor.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {section.instructor.first_name}{" "}
                    {section.instructor.last_name}
                  </Link>
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
            <p className="text-slate-500">No sections available.</p>
          )}
        </div>
      </section>
    </main>
  );
}
