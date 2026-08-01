import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionDetail } from "./SectionDetail";

describe("SectionDetail", () => {
  it("renders section schedule with course, instructor, and enrollment context", () => {
    render(
      <SectionDetail
        section={{
          id: "section-1",
          term: "Fall 2026",
          section_number: "101",
          schedule: "MWF 09:00",
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
          enrollments: [
            {
              id: "enr-1",
              student: {
                id: "student-1",
                first_name: "Alan",
                last_name: "Turing",
              },
            },
            {
              id: "enr-2",
              student: {
                id: "student-2",
                first_name: "Linus",
                last_name: "Torvalds",
              },
            },
          ],
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: /intro to algorithms/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ada lovelace/i })).toHaveAttribute(
      "href",
      "/instructors/inst-1",
    );
    expect(screen.getByText(/fall 2026/i)).toBeInTheDocument();
    expect(screen.getByText(/mwf 09:00/i)).toBeInTheDocument();
    expect(screen.getByText(/alan turing/i)).toBeInTheDocument();
    expect(screen.getByText(/linus torvalds/i)).toBeInTheDocument();
  });
});
