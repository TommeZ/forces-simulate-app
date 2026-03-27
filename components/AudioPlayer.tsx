"use client";

import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  url: string;
}

export function AudioPlayer({ url }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // auto play when url arrives
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play();
  }, [url]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  }

  function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
    setProgress(ratio * 100);
  }

  return (
    <div className="border border-zinc-800 p-6">
      <p className="text-xs tracking-[0.3em] text-amber-500 uppercase mb-4">
        {"// Mission Audio"}
      </p>
      <audio
        ref={audioRef}
        src={url}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={() => {
          const audio = audioRef.current;
          if (audio) setProgress((audio.currentTime / audio.duration) * 100);
        }}
      />
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-8 h-8 flex items-center justify-center border border-zinc-700 text-amber-400 hover:border-amber-500 transition-colors"
        >
          {isPlaying ? "▐▐" : "▶"}
        </button>
        <div
          className="flex-1 h-1 bg-zinc-800 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-amber-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
