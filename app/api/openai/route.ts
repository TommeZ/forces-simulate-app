import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI();

export async function POST(request: Request) {
  const body = await request.json();
  const { name, role } = body;

  try {
    const response = await client.responses.create({
      model: "gpt-5-mini",
      instructions:
        "Paint the picture and really sell this lifetime opportunity. Be vivid, emotional, and immersive. Write in second person.",
      input: `British military role: ${role}. Person: ${name}. Write a compelling story of their future.`,
    });

    console.log(response.output_text);

    return NextResponse.json({ story: response.output_text });
  } catch (error) {
    console.error("Failed to fetch from OpenAI:", error);
    return NextResponse.json(
      { error: "Failed to generate story" },
      { status: 500 },
    );
  }
}
