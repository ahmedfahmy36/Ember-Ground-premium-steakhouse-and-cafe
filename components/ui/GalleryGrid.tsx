"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, A11y, EffectFade, Thumbs, FreeMode, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { GalleryItem } from "@/lib/content";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

interface GalleryGridProps {
  items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center aspect-[21/9] border border-border-ink">
        <p className="font-body text-sm text-ink-muted tracking-widest uppercase">
          No images available
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Slider */}
      <div className="relative group">
        <Swiper
          modules={[Navigation, Keyboard, A11y, EffectFade, Thumbs, Autoplay]}
          effect="fade"
          keyboard={{ enabled: true }}
          a11y={{ enabled: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          navigation={{ prevEl: "#gallery-prev", nextEl: "#gallery-next" }}
          className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden swiper-grab"
        >
          {items.map((item) => (
            <SwiperSlide key={`main-${item.id}`}>
              <div className="relative w-full h-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                  <span className="font-body text-xs tracking-widest uppercase text-brass block mb-1">
                    {item.category}
                  </span>
                  <p className="font-body text-sm text-cream-warm max-w-xs leading-relaxed">
                    {item.alt}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          id="gallery-prev"
          aria-label="Previous image"
          className="
            absolute left-4 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 border border-cream/30 text-cream
            flex items-center justify-center
            hover:border-brass hover:text-brass
            transition-colors duration-200
            opacity-0 group-hover:opacity-100
          "
        >
          ←
        </button>
        <button
          id="gallery-next"
          aria-label="Next image"
          className="
            absolute right-4 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 border border-cream/30 text-cream
            flex items-center justify-center
            hover:border-brass hover:text-brass
            transition-colors duration-200
            opacity-0 group-hover:opacity-100
          "
        >
          →
        </button>
      </div>

      {/* Thumbs Slider */}
      <div className="w-full">
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Navigation, Thumbs]}
          spaceBetween={16}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          breakpoints={{
            320: { slidesPerView: 3, spaceBetween: 8 },
            768: { slidesPerView: 5, spaceBetween: 16 },
            1024: { slidesPerView: 6, spaceBetween: 16 },
          }}
          className="h-24 md:h-32 thumbs-slider"
        >
          {items.map((item) => (
            <SwiperSlide 
              key={`thumb-${item.id}`} 
              className="cursor-pointer opacity-50 hover:opacity-100 [&.swiper-slide-thumb-active]:opacity-100 transition-opacity duration-300"
            >
              <div className="relative w-full h-full border border-transparent [&.swiper-slide-thumb-active]:border-bronze transition-colors duration-300">
                <Image
                  src={item.src}
                  alt={`Thumbnail: ${item.alt}`}
                  fill
                  sizes="(max-width: 768px) 33vw, 16vw"
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
