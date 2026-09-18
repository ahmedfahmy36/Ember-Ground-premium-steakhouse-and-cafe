"use client";

interface SectionLoaderProps {
  tone?: "dark" | "charcoal" | "light";
}

export function SectionLoader({ tone = "dark" }: SectionLoaderProps) {
  const bg =
    tone === "charcoal"
      ? "bg-charcoal-800"
      : tone === "light"
      ? "bg-cream-dark"
      : "bg-charcoal-700";

  return (
    <div className="py-32 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className={`w-8 h-px ${bg} animate-pulse`} />
        <p className="font-body text-xs tracking-widest uppercase text-smoke">
          Loading…
        </p>
      </div>
    </div>
  );
}

export function SectionError({ message = "Unable to load content. Please refresh." }: { message?: string }) {
  return (
    <div className="py-20 flex items-center justify-center">
      <p className="font-body text-sm text-smoke tracking-wide">{message}</p>
    </div>
  );
}
