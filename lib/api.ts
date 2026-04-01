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

export async function saveGeneration(
  name: string,
  role: string,
  story: string,
  imageUrl: string,
  audioUrl: string | null,
): Promise<void> {
  try {
    const res = await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role, story, imageUrl, audioUrl }),
    });

    if (!res.ok) {
      console.error("Save failed");
    }
  } catch (error) {
    console.error("Failed to save generation", error);
  }
}
