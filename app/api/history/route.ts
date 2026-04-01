import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.generation.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch history:", error);

    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 },
    );
  }
}
