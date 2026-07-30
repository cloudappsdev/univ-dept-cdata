import { NextResponse } from "next/server";
import { getDepartmentById } from "../../../../lib/services/DepartmentDetail";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const department = await getDepartmentById(id);

    if (!department) {
      return NextResponse.json(
        { error: "Department not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(department);
  } catch (error) {
    console.error("Failed to fetch department", error);
    return NextResponse.json(
      { error: "Failed to fetch department" },
      { status: 500 },
    );
  }
}
