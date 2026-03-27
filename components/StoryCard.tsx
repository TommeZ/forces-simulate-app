interface StoryCardProps {
  story: string;
  isLoading: boolean;
}

export function StoryCard({ story, isLoading }: StoryCardProps) {
  return (
    <div className="mt-10 border border-zinc-800 p-6">
      <p className="text-xs tracking-[0.3em] text-amber-500 uppercase mb-3">
        {"// Mission Report"}
      </p>
      {isLoading ? (
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-zinc-500">Generating your story...</p>
        </div>
      ) : (
        <p className="text-zinc-300 text-sm leading-relaxed">{story}</p>
      )}
    </div>
  );
}
