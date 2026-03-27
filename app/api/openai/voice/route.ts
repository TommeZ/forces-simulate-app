import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI();

export async function POST(request: Request) {
  const body = await request.json();
  const { story } = body;

  try {
    const response = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "onyx",
      input: story,
      instructions: "Speak in a cheerful and positive tone.",
      response_format: "wav",
    });

    // convert to binary buffer and send as audio
    const buffer = Buffer.from(await response.arrayBuffer());
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "audio/wav",
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Failed to generate audio:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 },
    );
  }
}
