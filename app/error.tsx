"use client";

import { RotateCcw, ShieldAlert } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative grid min-h-screen place-items-center px-5 py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--accent)]/15 blur-3xl" />
      </div>
      <div className="glass relative w-full max-w-lg rounded-3xl p-8 text-center sm:p-10">
        <span className="eyebrow mx-auto">
          <ShieldAlert className="h-3.5 w-3.5" aria-hidden />
          Gangguan sistem
        </span>
        <h1 className="mt-5 text-balance text-3xl font-black tracking-tight sm:text-4xl">
          Ada yang tidak beres
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Dashboard gagal memuat bagian ini. Coba lagi — data dan preferensi tema kamu tetap aman.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#8b5cf6_0%,#6366f1_44%,#22d3ee_100%)] px-5 text-sm font-semibold text-white shadow-[0_10px_30px_-14px_rgba(99,102,241,0.95)] transition hover:brightness-110 active:scale-[0.97]"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Coba lagi
        </button>
      </div>
    </main>
  );
}
