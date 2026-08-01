import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StudentDetail } from "./StudentDetail";

describe("StudentDetail", () => {
  it("renders the student's major department and course schedule with instructor context", () => {
    render(
      <StudentDetail
        student={{
          id: "student-1",
          first_name: "Alan",
          last_name: "Turing",
          email: "alan@example.com",
          major_department: {
            id: "dept-1",
            name: "Computer Science",
            code: "CS",
          },
          enrollments: [
            {
              id: "enr-1",
              grade: "A",
              section: {
                id: "section-1",
                term: "Fall 2026",
                section_number: "101",
                course: {
                  id: "course-1",
                  title: "Intro to Algorithms",
                  course_number: "CS101",
                },
                instructor: {
                  id: "inst-1",
                  first_name: "Ada",
                  last_name: "Lovelace",
                },
              },
            },
          ],
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: /alan turing/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/computer science/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /intro to algorithms/i }),
    ).toHaveAttribute("href", "/courses/course-1");
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByText("Grade: A")).toBeInTheDocument();
  });
});
