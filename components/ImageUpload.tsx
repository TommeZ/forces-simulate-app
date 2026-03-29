"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageUploadProps {
  onChange: (file: File, previewUrl: string) => void;
}

export function ImageUpload({ onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onChange(file, previewUrl);
    }
  }

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-amber-400 hover:border-amber-500 rounded-none h-11 transition-all"
        >
          {preview ? "↺ Change Photo" : "+ Choose Photo"}
        </Button>
        {preview && (
          <Image
            src={preview}
            alt="Uploaded preview"
            className="w-11 h-11 object-cover rounded-full border border-zinc-700 shrink-0"
            width={500}
            height={500}
          />
        )}
      </div>
    </div>
  );
}
