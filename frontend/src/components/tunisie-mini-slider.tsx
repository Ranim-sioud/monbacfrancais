"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const slides = [
  { src: "/img/Tunisie1.jpg", alt: "Tunisie - photo 1", objectPosition: "50% 45%" },
  { src: "/img/Tunisie2.jpg", alt: "Tunisie - photo 2", objectPosition: "50% 48%" },
  { src: "/img/Tunisie3.jpg", alt: "Tunisie - photo 3", objectPosition: "50% 42%" },
];

const fallbackImage =
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1400&q=80";

function MiniSlide({
  src,
  alt,
  objectPosition,
}: {
  src: string;
  alt: string;
  objectPosition: string;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      className="object-cover"
      style={{ objectPosition }}
      onError={() => setCurrentSrc(fallbackImage)}
      sizes="(max-width: 1024px) 100vw, 900px"
    />
  );
}

export function TunisieMiniSlider() {
  const modules = useMemo(() => [Autoplay, Pagination], []);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-lg border border-[var(--border-color)] bg-[var(--white)] shadow-[var(--shadow-md)]">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary-blue)]">
            Galerie Tunisie
          </p>
          <p className="text-xs text-[var(--text-secondary)]">Smartech Academy</p>
        </div>

        <Swiper
          modules={modules}
          loop
          autoplay={{ delay: 3200, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="h-56 w-full sm:h-64 lg:h-72"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.alt}>
              <div className="relative h-full w-full">
                <MiniSlide src={slide.src} alt={slide.alt} objectPosition={slide.objectPosition} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.15)_100%)]" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
