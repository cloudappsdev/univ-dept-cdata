import { notFound } from "next/navigation";
import { getInstructorById } from "../../../lib/services/InstructorDetail";
import { InstructorDetail } from "./InstructorDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function InstructorDetailPage({ params }: Props) {
  const { id } = await params;
  const instructor = await getInstructorById(id);

  if (!instructor) {
    notFound();
  }

  return <InstructorDetail instructor={instructor} />;
}
