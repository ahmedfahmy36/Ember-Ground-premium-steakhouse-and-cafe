"use client";

import { useEffect, useRef } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Safari sometimes pauses autoplaying videos on initial load.
    // This forces it to play as soon as the component mounts.
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignore play errors (e.g. low power mode strict blocking)
      });
    }
  }, []);
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/20" />

      <div className="hero-spacer" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pt-32 pb-20 md:pt-32 lg:pt-40 md:pb-24 lg:pb-32">
        <div className="max-w-2xl">
          <p className="font-body text-xs tracking-ultra-wide uppercase text-white my-6">
            Wood-Fired Steakhouse &amp; Café &mdash; Shoreditch, London
          </p>

          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-bold text-cream leading-[0.9] tracking-tight mb-8">
            Where the
            <br />
            <em className="not-italic text-brass">fire decides.</em>
          </h1>

          <p className="font-body text-base text-smoke-light max-w-sm leading-relaxed mb-10">
            26 covers. A wood hearth that burns all day.
            Dry-aged beef from three farms we trust.
          </p>

          <div className="flex flex-col xs:flex-row gap-4">
            <a
              href="#reservations"
              id="hero-reserve-cta"
              className="inline-block font-body text-sm tracking-widest uppercase bg-brass text-charcoal px-8 py-4 hover:bg-brass-light transition-colors duration-200"
            >
              Reserve a Table
            </a>
            <a
              href="#about"
              className="inline-block font-body text-sm tracking-widest uppercase border border-cream/30 text-cream px-8 py-4 hover:border-cream/70 transition-colors duration-200"
            >
              Our Story
            </a>
          </div>
        </div>

        <div className="mb-16 pt-6  flex flex-wrap gap-8">
          {[
            { label: "Kitchen", value: "Open Tue – Sun" },
            { label: "The Ground", value: "Open Daily" },
            { label: "Reservations", value: "+44 207 123 4567" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="font-body text-xs tracking-widest uppercase text-smoke">{label}</p>
              <p className="font-body text-sm text-cream-warm mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
