import { notFound } from "next/navigation";
import { getStudentById } from "../../../lib/services/StudentDetail";
import { StudentDetail } from "./StudentDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function StudentDetailPage({ params }: Props) {
  const { id } = await params;
  const student = await getStudentById(id);

  if (!student) {
    notFound();
  }

  return <StudentDetail student={student} />;
}
