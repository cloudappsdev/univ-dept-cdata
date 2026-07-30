import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: { last_name: "asc" },
      include: {
        major_department: true,
        _count: {
          select: { enrollments: true },
        },
      },
    });

    return NextResponse.json(students);
  } catch (error) {
    console.error("Failed to fetch students", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 },
    );
  }
}
