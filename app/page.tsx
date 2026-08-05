import DepartmentsPage from "./departments/page";

export default function Home() {
  return (
    <>
      <div className="home-header">
        Welcome to the University Department Curriculum Project
      </div>
      <div className="header-byline">
        Click around to see the departments, courses, instructors, and students.
      </div>
      <DepartmentsPage />
    </>
  );
}
