import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, role, story, image, audio } = body;

  if (!name || !role || !story || !image) {
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
        imageUrl: image,
        audioUrl: audio ?? null,
      },
    });

    return NextResponse.json({ success: true, id: generation.id });
  } catch (error) {
    console.error("Failed to save generation:", error);
    return NextResponse.json(
      { error: "Failed to save generation" },
      { status: 500 },
    );
  }
}
