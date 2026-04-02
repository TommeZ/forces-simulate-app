import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function HistoryPage() {
  let generations: Generation[] = [];

  try {
    generations = await prisma.generation.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch history:", error);
  }

  return (
    <div className="min-h-screen bg-zinc-950 font-mono text-zinc-100">
      {/* Top bar */}
      <div className="border-b border-zinc-800 px-8 py-3 flex items-center justify-between">
        <span className="text-xs tracking-[0.3em] text-zinc-500 uppercase">
          British Armed Forces
        </span>
        <Link
          href="/"
          className="text-xs tracking-[0.3em] text-zinc-600 uppercase hover:text-amber-400 transition-colors"
        >
          ← New Simulation
        </Link>
      </div>

      <main className="max-w-4xl mx-auto px-8 py-20">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.4em] text-amber-500 uppercase mb-4">
            {"// Mission Archive"}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-100 leading-tight mb-4">
            Previous <br />
            <span className="text-amber-400">Simulations</span>
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {generations.length} simulation{generations.length !== 1 ? "s" : ""}{" "}
            on record
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-xs tracking-[0.3em] text-zinc-600 uppercase">
            Personnel Records
          </span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        {/* Empty state */}
        {generations.length === 0 && (
          <div className="border border-zinc-800 p-12 text-center">
            <p className="text-zinc-600 text-sm">
              No simulations on record yet.
            </p>
            <Link
              href="/"
              className="text-amber-400 text-xs tracking-widest uppercase mt-4 inline-block hover:text-amber-300 transition-colors"
            >
              → Run your first simulation
            </Link>
          </div>
        )}

        {/* Generations grid */}
        <div className="flex flex-col gap-12">
          {generations.map((gen) => (
            <div key={gen.id} className="border border-zinc-800">
              {/* Record header */}
              <div className="border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-amber-400 font-bold text-sm tracking-wide">
                    {gen.name}
                  </span>
                  <span className="text-zinc-600 text-xs">—</span>
                  <span className="text-zinc-400 text-xs tracking-wider uppercase">
                    {gen.role.replace(/-/g, " ")}
                  </span>
                </div>
                <span className="text-zinc-600 text-xs">
                  {new Date(gen.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                {/* Image */}
                <div className="border-r border-zinc-800">
                  <Image
                    src={gen.imageUrl}
                    alt={`${gen.name} as ${gen.role}`}
                    width={500}
                    height={500}
                    className="w-full object-cover"
                  />
                </div>

                {/* Story + Audio */}
                <div className="flex flex-col justify-between p-6 gap-6">
                  <div>
                    <p className="text-xs tracking-[0.3em] text-amber-500 uppercase mb-3">
                      {"// Mission Report"}
                    </p>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {gen.story}
                    </p>
                  </div>

                  {gen.audioUrl && (
                    <div>
                      <p className="text-xs tracking-[0.3em] text-amber-500 uppercase mb-3">
                        {"// Mission Audio"}
                      </p>
                      <audio
                        controls
                        src={gen.audioUrl}
                        className="w-full h-8 accent-amber-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
