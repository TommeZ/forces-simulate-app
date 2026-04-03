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
  image: string,
  audio: string | null,
): Promise<void> {
  await fetch("/api/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      role,
      story,
      image,
      audio,
    }),
  });
}

export async function uploadImage(image: string): Promise<string> {
  const res = await fetch("/api/upload/image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image }),
  });

  const data = await res.json();
  return data.url;
}

export async function uploadAudio(
  audio: string | null,
): Promise<string | null> {
  if (!audio) return null;

  const res = await fetch("/api/upload/audio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ audio }),
  });

  const data = await res.json();
  return data.url;
}
