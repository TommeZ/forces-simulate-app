import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  const body = await req.json();
  const { audio } = body;

  try {
    const upload = await cloudinary.uploader.upload(audio, {
      resource_type: "video",
      folder: "military-simulator",
    });

    return NextResponse.json({ url: upload.secure_url });
  } catch (error) {
    console.error("Failed to upload audio:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
