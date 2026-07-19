"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const fallbackImage =
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=80";

const slides = [
  {
    src: "/img/Acceuil1.png",
    alt: "Slide accueil 1 Mon Bac Français",
    objectPosition: "50% 42%",
  },
  {
    src: "/img/Acceuil2.png",
    alt: "Slide accueil 2 Mon Bac Français",
    objectPosition: "50% 40%",
  },
  {
    src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1400&q=80",
    alt: "Élève en révision",
    objectPosition: "50% 52%",
  },
  {
    src: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1400&q=80",
    alt: "Cours en salle de classe",
    objectPosition: "50% 45%",
  },
];

const serviceHighlights = [
  {
    icon: "award",
    title: "Avantages du Bac Français",
    description:
      "Reconnu mondialement, il facilite l'accès aux études supérieures en France et ailleurs.",
  },
  {
    icon: "users",
    title: "Équipe Pédagogique",
    description:
      "Des experts dans diverses matières assurent un encadrement solide vers la réussite.",
  },
  {
    icon: "layers",
    title: "Filières du Bac",
    description:
      "Découvrez les différentes filières adaptées à votre profil et vos objectifs.",
  },
  {
    icon: "globe",
    title: "Étudier en France",
    description:
      "Accédez à une éducation de qualité et préparez-vous à une carrière internationale.",
  },
 ] as const;

function ServiceIcon({ type }: { type: (typeof serviceHighlights)[number]["icon"] }) {
  const common = "h-5 w-5 text-[var(--primary-blue)]";

  if (type === "award") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 12 7 20l5-3 5 3-2-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "users") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
        <path d="M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="9.5" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M20 19v-1a3 3 0 0 0-2.2-2.9M16.5 5.2a3 3 0 0 1 0 5.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "layers") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
        <path d="m12 3 9 4.5-9 4.5L3 7.5 12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M4.5 7.5h15M4.5 16.5h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SlideImage({
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
      sizes="100vw"
      priority={src.includes("Acceuil1")}
    />
  );
}

export function HeroSwiper() {
  const modules = useMemo(() => [Autoplay, Pagination, Navigation], []);

  return (
    <section className="relative overflow-hidden border-b border-[var(--border-color)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(1, 48, 120,0.08),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(1, 48, 120,0.05),_transparent_35%)]" />
      <div className="relative w-full">
        <Swiper
          modules={modules}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          className="h-[36rem] w-full sm:h-[44rem] md:h-[52rem] lg:h-[52rem] xl:h-[43rem]"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.alt}>
              <div className="relative h-full w-full">
                <SlideImage
                  src={slide.src}
                  alt={slide.alt}
                  objectPosition={slide.objectPosition}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.3)_42%,rgba(0,0,0,0.1)_100%)]" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="pointer-events-none absolute inset-0 z-20 flex h-full w-full items-start pt-[240px] sm:pt-[250px] md:pt-[270px] lg:pt-[240px] xl:pt-[14.5rem] pb-16 md:pb-52 lg:pb-56 xl:pb-4 px-4 sm:px-6 lg:px-10 xl:px-12">
          <div className="pointer-events-auto max-w-2xl space-y-3 sm:space-y-4 rounded-2xl border border-[var(--border-color)] bg-[var(--white)]/90 px-5 py-5 sm:px-8 sm:py-6 shadow-xl backdrop-blur-md">
            <span className="inline-flex rounded-full border border-[var(--border-color)] bg-[var(--blue-pale)] px-4 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary-blue)]">
              Bac Français Candidat Libre
            </span>
            <h1 className="text-xl font-black tracking-tight text-[var(--text-primary)] sm:text-2xl lg:text-4xl leading-tight">
              Passer le Bac Français en candidat libre depuis l&apos;étranger
            </h1>
            <p className="text-[11px] leading-relaxed text-[var(--text-secondary)] sm:text-xs md:text-sm">
              Préparation bac français en ligne, accompagnement personnalisé et conseils
              pratiques pour sécuriser votre inscription et réussir vos épreuves.
            </p>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="/inscription"
                className="rounded-xl bg-[var(--primary-blue)] px-4 py-2.5 sm:px-5 sm:py-3 text-center text-xs font-bold uppercase tracking-wider text-[var(--white)] shadow-md hover:shadow-lg transition-all duration-200 hover:bg-[var(--blue-dark)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Commencer l&apos;inscription
              </Link>
              <Link
                href="/guide-bac-francais"
                className="rounded-xl border border-[var(--border-color)] bg-[var(--white)] px-4 py-2.5 sm:px-5 sm:py-3 text-center text-xs font-bold uppercase tracking-wider text-[var(--primary-red)] shadow-sm hover:shadow-md transition-all duration-200 hover:bg-[var(--red-light)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Voir le guide
              </Link>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 md:translate-y-6 lg:translate-y-4 xl:translate-y-4 z-30 hidden md:block">
          <div className="pointer-events-auto bg-gradient-to-t from-[var(--white)] via-[var(--white)]/90 to-transparent pt-16 pb-6">
            <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {serviceHighlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-[var(--border-color)] bg-[var(--white)]/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--primary-blue)] hover:bg-[var(--white)] group"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--blue-pale)] text-[var(--primary-blue)] shadow-sm transition-transform duration-300 group-hover:scale-110">
                      <ServiceIcon type={item.icon} />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[var(--text-primary)] sm:text-base">{item.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights for Mobile */}
      <div className="bg-white border-t border-[var(--border-color)] py-8 px-4 md:hidden">
        <div className="grid gap-4 grid-cols-1">
          {serviceHighlights.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[var(--border-color)] bg-[var(--white)] p-5 shadow-sm transition-all duration-300 hover:shadow-md group"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--blue-pale)] text-[var(--primary-blue)] shadow-sm">
                  <ServiceIcon type={item.icon} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

