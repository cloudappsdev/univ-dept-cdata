import { NextResponse } from "next/server";
import { getSectionById } from "../../../../lib/services/SectionDetail";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const section = await getSectionById(id);

    if (!section) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    return NextResponse.json(section);
  } catch (error) {
    console.error("Failed to fetch section", error);
    return NextResponse.json(
      { error: "Failed to fetch section" },
      { status: 500 },
    );
  }
}
