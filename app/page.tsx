import Image from "next/image";
import { DepartmentList } from "./departments/DepartmentList";
import DepartmentsPage from "./departments/page";

export default function Home() {
  return (
    <>
      <span>Howdy</span>
      <DepartmentsPage />
    </>
  );
}
