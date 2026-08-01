import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DepartmentDetail } from "./DepartmentDetail";

describe("DepartmentDetail", () => {
  it("renders a department and its related course, instructor, and student lists", () => {
    render(
      <DepartmentDetail
        department={{
          id: "dept-1",
          name: "Computer Science",
          code: "CS",
          courses: [
            {
              id: "course-1",
              title: "Intro to Algorithms",
              course_number: "CS101",
            },
            {
              id: "course-2",
              title: "Operating Systems",
              course_number: "CS220",
            },
          ],
          instructors: [
            { id: "inst-1", first_name: "Ada", last_name: "Lovelace" },
            { id: "inst-2", first_name: "Grace", last_name: "Hopper" },
          ],
          students: [
            { id: "student-1", first_name: "Alan", last_name: "Turing" },
            { id: "student-2", first_name: "Linus", last_name: "Torvalds" },
          ],
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: /computer science/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/^CS$/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /intro to algorithms/i }),
    ).toHaveAttribute("href", "/courses/course-1");
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByText("Linus Torvalds")).toBeInTheDocument();
  });
});
