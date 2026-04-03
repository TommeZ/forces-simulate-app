export async function fetchStory(name: string, role: string): Promise<string> {
  const res = await fetch("/api/openai/story", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, role }),
  });
  const data = await res.json();
  return data.story;
}

export async function fetchImage(formData: FormData): Promise<string> {
  const res = await fetch("/api/openai/image", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data.image;
}

export async function fetchAudio(story: string): Promise<Blob> {
  const res = await fetch("/api/openai/voice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ story }),
  });
  return res.blob();
}

export async function uploadInfo(
  name: string,
  role: string,
  story: string,
): Promise<void> {
  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role, story }),
    });

    if (!res.ok) {
      console.error("Info upload failed");
    }
  } catch (error) {
    console.error("Failed to upload info", error);
  }
}

export async function uploadImage(image: string): Promise<void> {
  try {
    const res = await fetch("/api/upload/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    });

    if (!res.ok) {
      console.error("Image upload Failed");
    }
  } catch (error) {
    console.error("Failed to uplaoad image", error);
  }
}

export async function uploadAudio(audio: string | null): Promise<void> {
  try {
    const res = await fetch("/api/upload/audio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ audio }),
    });

    if (!res.ok) {
      console.error("Audio upload Failed");
    }
  } catch (error) {
    console.error("Failed to upload audio", error);
  }
}
