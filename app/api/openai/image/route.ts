import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI();

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const file = formData.get("file") as File;

  try {
    const imageRes = await client.images.edit({
      model: "gpt-image-1",
      image: file,
      prompt: `
        Transform this person into a ${role} in the British military.
        They are wearing realistic uniform with their name: ${name} on a badge and placed in an authentic environment.
        Keep facial features as similar as possible.
        Cinematic, highly realistic.
      `,
      size: "1024x1024",
    });

    const image = imageRes.data?.[0]?.b64_json;

    if (!image) {
      return NextResponse.json(
        { error: "Image generation failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      image,
    });
  } catch (error) {
    console.error("Failed to generate:", error);

    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 },
    );
  }
}
