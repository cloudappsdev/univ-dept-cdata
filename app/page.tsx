import Image from "next/image";
import { DepartmentList } from "./departments/DepartmentList";
import DepartmentsPage from "./departments/page";

export default function Home() {
  return (
    <>
      <div className="home-header">
        Welcome to the University Departments Curriculum Project
      </div>
      <div className="header-byline">
        Click around to see the departments, courses, instructors, and students.
      </div>
      <DepartmentsPage />
    </>
  );
}
