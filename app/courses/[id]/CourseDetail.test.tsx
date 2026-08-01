import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CourseDetail } from "./CourseDetail";

describe("CourseDetail", () => {
  it("renders the course metadata and the related section list with instructor context", () => {
    render(
      <CourseDetail
        course={{
          id: "course-1",
          course_number: "CS101",
          title: "Intro to Algorithms",
          description: "Fundamentals of algorithm design and analysis.",
          credits: 3,
          department: { id: "dept-1", name: "Computer Science", code: "CS" },
          sections: [
            {
              id: "section-1",
              term: "Fall 2026",
              section_number: "101",
              schedule: "MWF 09:00",
              instructor: {
                id: "inst-1",
                first_name: "Ada",
                last_name: "Lovelace",
              },
              enrollments: [
                {
                  id: "enr-1",
                  student: {
                    id: "student-1",
                    first_name: "Alan",
                    last_name: "Turing",
                  },
                },
              ],
            },
          ],
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: /intro to algorithms/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/computer science/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /fall 2026/i })).toHaveAttribute(
      "href",
      "/sections/section-1",
    );
    expect(screen.getByText(/ada lovelace/i)).toBeInTheDocument();
    expect(screen.getByText(/alan turing/i)).toBeInTheDocument();
  });
});
