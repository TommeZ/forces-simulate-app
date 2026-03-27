"use client";

import { ImageUpload } from "@/components/ImageUpload";
import { RoleSelect } from "@/components/RoleSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { ImageCard } from "@/components/ImageCard";
import { StoryCard } from "@/components/StoryCard";
import { fetchStory, fetchImage, fetchAudio } from "@/lib/api";
import { StatusMessage } from "@/components/StatusMessage";

export default function Home() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [story, setStory] = useState("");
  const [image, setImage] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [storyLoading, setStoryLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const isGenerating = storyLoading || imageLoading;

  async function handleSubmit(file: File) {
    if (isGenerating) return;

    setStory("");
    setImage("");
    setAudioUrl(null);
    setStoryLoading(true);
    setImageLoading(true);

    let storyText = "";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("role", role);

    const storyPromise = fetchStory(name, role).then((story) => {
      storyText = story;
      setStory(story);
      setStoryLoading(false);
    });

    const imagePromise = fetchImage(formData).then((image) => {
      setImage(`data:image/png;base64,${image}`);
      setImageLoading(false);
    });

    Promise.all([storyPromise, imagePromise]).then(async () => {
      const blob = await fetchAudio(storyText);
      setAudioUrl(URL.createObjectURL(blob));
    });
  }

  return (
    <div className="min-h-screen bg-zinc-950 font-mono text-zinc-100">
      {/* Top bar */}
      <div className="border-b border-zinc-800 px-8 py-3 flex items-center justify-between">
        <span className="text-xs tracking-[0.3em] text-zinc-500 uppercase">
          British Armed Forces
        </span>
        <span className="text-xs tracking-[0.3em] text-zinc-600 uppercase">
          Recruitment Simulator
        </span>
      </div>

      <main className="max-w-2xl mx-auto px-8 py-20">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-100 leading-tight mb-4">
            See yourself in
            <br />
            <span className="text-amber-400">the Armed Forces</span>
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
            Enter your details below. Our system will generate a personalised
            portrait and brief you on life in your chosen role.
          </p>
          <div className="mt-6 flex gap-4 text-xs text-zinc-600">
            <a
              href="https://recruitment.raf.mod.uk/find-your-role"
              className="hover:text-amber-400 transition-colors tracking-wider uppercase"
            >
              → Royal Air Force
            </a>
            <a
              href="https://jobs.army.mod.uk/regular-army/types-of-roles/"
              className="hover:text-amber-400 transition-colors tracking-wider uppercase"
            >
              → Army
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-xs tracking-[0.3em] text-zinc-600 uppercase">
            Personnel Data
          </span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        {/* Form */}
        <div className="flex flex-col gap-8">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs tracking-[0.2em] uppercase text-zinc-400">
              01 — Full Name
            </Label>
            <Input
              placeholder="e.g. James Henderson"
              onChange={(e) => setName(e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500 focus:ring-amber-500 rounded-none h-11"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs tracking-[0.2em] uppercase text-zinc-400">
              02 — Desired Role
            </Label>
            <RoleSelect onChange={(value) => setRole(value)} />
          </div>

          {/* Image */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs tracking-[0.2em] uppercase text-zinc-400">
              03 — Upload Photo
            </Label>
            <ImageUpload onChange={(file) => setFile(file)} />
          </div>

          {/* Divider */}
          <div className="h-px bg-zinc-800" />

          {/* Submit */}
          <div className="flex items-center justify-between">
            <StatusMessage name={name} role={role} file={file} />

            <Button
              disabled={
                Boolean(!name || !role || !file) ||
                isGenerating ||
                (!!story && !audioUrl)
              }
              className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold tracking-widest uppercase text-xs px-8 h-11 rounded-none disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              onClick={() => file && handleSubmit(file)}
            >
              {image && story ? "Regenerate" : "Generate"}
            </Button>
          </div>
          {/* Story card */}
          {(storyLoading || story) && (
            <StoryCard story={story} isLoading={storyLoading} />
          )}

          {/* Image card */}
          {(imageLoading || image) && (
            <ImageCard isLoading={imageLoading} image={image} />
          )}
          {audioUrl && <AudioPlayer url={audioUrl} />}
        </div>
      </main>
    </div>
  );
}
