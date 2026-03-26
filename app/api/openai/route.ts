import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI();

export async function POST(request: Request) {
  const body = await request.json();
  const { name, role } = body;

  try {
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      instructions:
        "Paint the picture and really sell this lifetime opportunity. Keep it to 3 sentences maximum.",
      input: `Write a story about what life would be like in the British military as a ${role} for ${name}`,
      max_output_tokens: 150,
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
