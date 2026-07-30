import { NextResponse } from "next/server";
import { getDepartments } from "../../../lib/services/DepartmentList";

export async function GET() {
  try {
    const departments = await getDepartments();
    return NextResponse.json(departments);
  } catch (error) {
    console.error("Failed to fetch departments", error);
    return NextResponse.json(
      { error: "Failed to fetch departments" },
      { status: 500 },
    );
  }
}
