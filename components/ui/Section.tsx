import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "dark" | "charcoal" | "light" | "cream" | "cafe" | "linen" | "linen-muted" | "oxblood";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  tone?: Tone;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  noPadding?: boolean;
}

const toneClasses: Record<Tone, string> = {
  dark: "bg-charcoal text-cream",
  charcoal: "bg-charcoal-800 text-cream",
  light: "bg-cream text-charcoal",
  cream: "bg-cream-warm text-charcoal",
  cafe: "bg-[#F2EBD9] text-espresso",
  linen: "bg-linen text-ink-dark",
  "linen-muted": "bg-linen-muted text-ink-dark",
  oxblood: "bg-oxblood-deep text-cream",
};

const maxWidthClasses = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-8xl",
  full: "max-w-none",
};

export function Section({
  id,
  tone = "dark",
  maxWidth = "xl",
  noPadding = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(toneClasses[tone], className)}
      {...props}
    >
      <div
        className={cn(
          "mx-auto w-full",
          maxWidthClasses[maxWidth],
          !noPadding && "px-6 py-16 md:px-12 md:py-20"
        )}
      >
        {children}
      </div>
    </section>
  );
}
