import { notFound } from "next/navigation";
import { getCourseById } from "../../../lib/services/CourseDetail";
import { CourseDetail } from "./CourseDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  return <CourseDetail course={course} />;
}
