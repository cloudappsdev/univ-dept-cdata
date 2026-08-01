import Link from "next/link";

type SectionStudent = {
  id: string;
  first_name: string;
  last_name: string;
};

type SectionDetailData = {
  id: string;
  term: string;
  section_number: string;
  schedule: string | null;
  course: {
    id: string;
    course_number: string;
    title: string;
  };
  instructor: {
    id: string;
    first_name: string;
    last_name: string;
  };
  enrollments: {
    id: string;
    student: SectionStudent;
  }[];
};

export function SectionDetail({ section }: { section: SectionDetailData }) {
  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            {section.term}
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            {section.course.title}
          </h1>
        </div>
        <Link href="/courses" className="text-sm text-blue-600 underline">
          Back to courses
        </Link>
      </div>

      <section className="mb-6 rounded-xl border border-slate-200 p-4">
        <p className="text-sm text-slate-600">
          {section.course.course_number} • Section {section.section_number}
        </p>
        <p className="mt-2 text-slate-700">
          Schedule: {section.schedule ?? "TBA"}
        </p>
        <p className="mt-2 text-slate-700">
          Instructor:{" "}
          <Link
            href={`/instructors/${section.instructor.id}`}
            className="text-blue-600 hover:underline"
          >
            {section.instructor.first_name} {section.instructor.last_name}
          </Link>
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 p-4">
        <h2 className="mb-3 text-xl font-semibold">Enrolled students</h2>
        <ul className="space-y-2">
          {section.enrollments.length ? (
            section.enrollments.map((enrollment) => (
              <li key={enrollment.id}>
                <Link
                  href={`/students/${enrollment.student.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {enrollment.student.first_name} {enrollment.student.last_name}
                </Link>
              </li>
            ))
          ) : (
            <li className="text-slate-500">No students enrolled.</li>
          )}
        </ul>
      </section>
    </main>
  );
}
