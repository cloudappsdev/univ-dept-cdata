import { getDepartments } from "../../lib/services/DepartmentList";
import { DepartmentList } from "./DepartmentList";

export default async function DepartmentsPage() {
  const departments = await getDepartments();
  return <DepartmentList departments={departments} />;
}
