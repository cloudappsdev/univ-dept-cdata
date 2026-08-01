import { getInstructors } from "../../lib/services/InstructorList";
import { InstructorList } from "./InstructorList";

export default async function InstructorsPage() {
  const instructors = await getInstructors();

  return <InstructorList instructors={instructors} />;
}
