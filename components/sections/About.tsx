"use client";

import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionLoader, SectionError } from "@/components/ui/SectionLoader";
import { useFetch } from "@/lib/hooks/useFetch";
import { AboutData } from "@/lib/content";

export function About() {
  const { data, loading, error } = useFetch<AboutData>("/api/about");

  if (loading) return <Section id="about" tone="linen"><SectionLoader tone="light" /></Section>;
  if (error || !data) return <Section id="about" tone="linen"><SectionError /></Section>;

  const [line1, line2] = data.headline.split("\n");

  return (
    <Section id="about" tone="linen" maxWidth="2xl">
      <div className="flex flex-col mb-16 pb-8 border-b border-border-ink">
        <p className="font-body text-xs tracking-ultra-wide uppercase text-bronze mb-3">
          About
        </p>
        <h2 className="font-display text-5xl md:text-6xl font-bold text-ink leading-tight tracking-tight">
          Ember &amp; Ground
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-center mb-24">
        <div className="relative h-[480px] lg:h-[600px] overflow-hidden">
          <Image
            src="/images/about-grill.jpg"
            alt="Ribeye over live wood fire on the Ember & Ground hearth"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-bronze" />
        </div>

        <div>
          <p className="font-body text-xs tracking-ultra-wide uppercase text-bronze mb-6">
            Est. 2019 &mdash; Shoreditch
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-ink leading-[1] tracking-tight mb-8">
            {line1}
            {line2 && (
              <>
                <br />
                <em className="not-italic text-bronze">{line2}</em>
              </>
            )}
          </h2>

          <div className="space-y-4">
            {data.story.map((para, i) => (
              <p key={i} className="font-body text-base text-ink-dark leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 pt-16 border-t border-border-ink">
        <div>
          <p className="font-body text-xs tracking-widest uppercase text-bronze mb-6">
            How we work
          </p>
          <ul className="space-y-4">
            {data.philosophy.map((point, i) => (
              <li key={i} className="flex gap-4">
                <span className="text-bronze font-display text-lg mt-0.5">—</span>
                <p className="font-body text-base text-ink-dark leading-relaxed">{point}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 content-start">
          {data.stats.map((stat) => (
            <div key={stat.label}>
              <span className="font-display text-4xl font-bold text-bronze">{stat.value}</span>
              <p className="font-body text-xs tracking-widest uppercase text-ink-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
