import Image from "next/image";
import { Ref } from "react";

interface ImageCardProps {
  isLoading: boolean;
  image: string;
  currentRef: Ref<HTMLDivElement> | undefined;
}

export function ImageCard({ isLoading, image, currentRef }: ImageCardProps) {
  return (
    <div ref={currentRef} className="mt-6 border border-zinc-800 p-6">
      <p className="text-xs tracking-[0.3em] text-amber-500 uppercase mb-3">
        {"// Personnel Portrait"}
      </p>
      {isLoading ? (
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-zinc-500">Generating your portrait...</p>
        </div>
      ) : (
        <Image
          src={image}
          width={500}
          height={500}
          alt="Generated military portrait"
          className="w-full object-cover"
        />
      )}
    </div>
  );
}
