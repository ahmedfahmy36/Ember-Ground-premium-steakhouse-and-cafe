import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { MenuCard } from "@/components/ui/MenuCard";
import { MenuItem } from "@/lib/content";

interface CafeProps {
  items: MenuItem[];
}

export function Cafe({ items }: CafeProps) {
  return (
    <Section id="cafe" tone="cafe">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-center mb-20">
        <div>
          <p className="font-body text-xs tracking-ultra-wide uppercase text-terracotta mb-3">
            The Ground
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-espresso leading-tight tracking-tight mb-6">
            The Café Side
          </h2>
          <p className="font-body text-base text-charcoal-500 leading-relaxed max-w-md">
            Open from half seven every morning. We roast in-house on Tuesdays.
            The menu is short on purpose — we'd rather do six things well than twenty things adequately.
          </p>
        </div>

        <div className="relative h-72 lg:h-96 overflow-hidden">
          <Image
            src="/images/gallery-coffee.jpg"
            alt="Flat white and croissant at The Ground café"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-terracotta" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-x-16 border-t border-cream-dark">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} tone="light" />
        ))}
      </div>

      <p className="font-body text-xs text-charcoal-400 mt-8 leading-relaxed">
        The Ground is open Monday to Sunday, 07:30 — 15:00 (16:00 weekends).
        Walk-ins only — we don&apos;t take reservations for the café.
      </p>
    </Section>
  );
}
