import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, role, story } = body;

  if (!name || !role || !story) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const generation = await prisma.generation.create({
      data: {
        name,
        role,
        story,
      },
    });

    return NextResponse.json({ success: true, id: generation.id });
  } catch (error) {
    console.error("Failed to upload info:", error);
    return NextResponse.json(
      { error: "Failed to upload info" },
      { status: 500 },
    );
  }
}
