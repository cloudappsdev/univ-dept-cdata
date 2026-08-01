import { notFound } from "next/navigation";
import { getDepartmentById } from "../../../lib/services/DepartmentDetail";
import { DepartmentDetail } from "./DepartmentDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DepartmentDetailPage({ params }: Props) {
  const { id } = await params;
  const department = await getDepartmentById(id);

  if (!department) {
    notFound();
  }

  return <DepartmentDetail department={department} />;
}
