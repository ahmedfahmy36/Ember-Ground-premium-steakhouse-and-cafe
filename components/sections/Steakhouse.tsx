import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { MenuCard } from "@/components/ui/MenuCard";
import { MenuItem } from "@/lib/content";

interface SteakhouseProps {
  items: MenuItem[];
}

export function Steakhouse({ items }: SteakhouseProps) {
  return (
    <Section id="steakhouse" tone="linen-muted">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-center mb-20 border-b border-border-ink pb-12 lg:border-0 lg:pb-0">
        <div>
          <p className="font-body text-xs tracking-ultra-wide uppercase text-bronze mb-3">
            The Cuts
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-ink leading-tight tracking-tight mb-6">
            The Steakhouse
          </h2>
          <p className="font-body text-base text-ink-muted leading-relaxed max-w-md">
            All beef sourced from three farms. All cuts cooked over seasoned oak or aged oak charcoal. Sides ordered separately at the table.
          </p>
        </div>

        <div className="relative h-72 lg:h-96 overflow-hidden">
          <Image
            src="/images/gallery-tomahawk.jpg"
            alt="Tomahawk steak"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-bronze" />
        </div>
      </div>

      <div>
        {items.map((item) => (
          <MenuCard key={item.id} item={item} tone="light" />
        ))}
      </div>

      <p className="font-body text-xs text-ink-muted mt-8 leading-relaxed">
        Prices shown are per portion. For parties of 6 or more, a 12.5% discretionary service charge applies.
        Allergies &amp; dietary requirements — please speak with your server before ordering.
      </p>
    </Section>
  );
}
