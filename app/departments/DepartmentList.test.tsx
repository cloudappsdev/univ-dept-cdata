import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DepartmentList } from "./DepartmentList";

describe("DepartmentList", () => {
  it("renders a department summary with counts and navigation", () => {
    render(
      <DepartmentList
        departments={[
          {
            id: "dept-1",
            name: "Computer Science",
            code: "CS",
            _count: { courses: 3, instructors: 2, students: 8 },
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("heading", { name: /departments/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /computer science/i }),
    ).toHaveAttribute("href", "/departments/dept-1");
    expect(screen.getByText(/courses: 3/i)).toBeInTheDocument();
    expect(screen.getByText(/instructors: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/students: 8/i)).toBeInTheDocument();
  });
});
