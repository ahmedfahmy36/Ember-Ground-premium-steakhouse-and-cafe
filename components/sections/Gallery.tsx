"use client";

import { Section } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/ui/GalleryGrid";
import { SectionLoader, SectionError } from "@/components/ui/SectionLoader";
import { useFetch } from "@/lib/hooks/useFetch";
import { GalleryItem } from "@/lib/content";

export function Gallery() {
  const { data, loading, error } = useFetch<GalleryItem[]>("/api/gallery");

  return (
    <Section id="gallery" tone="linen">
      <div className="mb-12">
        <p className="font-body text-xs tracking-ultra-wide uppercase text-bronze mb-3">
          Gallery
        </p>
        <h2 className="font-display text-5xl md:text-6xl font-bold text-ink leading-tight tracking-tight">
          Inside Ember &amp; Ground
        </h2>
      </div>

      {loading && <SectionLoader tone="light" />}
      {error && <SectionError />}
      {data && <GalleryGrid items={data} />}
    </Section>
  );
}
