import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI();

export async function POST(request: Request) {
  const body = await request.json();
  const { name, role } = body;

  try {
    const storyRes = await client.responses.create({
      model: "gpt-5.4",
      instructions:
        "Paint the picture and really sell this lifetime opportunity. Keep it to 3 sentences maximum.",
      input: `Write a story about what life would be like in the British military as a ${role} for ${name}`,
      max_output_tokens: 150,
    });

    const story = storyRes.output_text;

    if (!story) {
      return NextResponse.json(
        { error: "Story generation failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      story,
    });
  } catch (error) {
    console.error("Failed to generate:", error);

    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 },
    );
  }
}
