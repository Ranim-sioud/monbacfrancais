import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ContentPage } from "@/components/content-page";
import { InternalLinkHub } from "@/components/internal-link-hub";
import { TunisieMiniSlider } from "@/components/tunisie-mini-slider";
import { pageContents } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Bac français Tunisie",
  description:
    "Bac français Tunisie : centres, accompagnement et inscription bac français candidat libre depuis la Tunisie.",
  keywords: [
    "bac français tunisie",
    "bac français candidat libre",
    "inscription bac français candidat libre",
    "préparation bac français en ligne",
  ],
  openGraph: {
    title: "Bac français Tunisie",
    description:
      "Toutes les informations pour préparer et passer le bac français candidat libre depuis la Tunisie.",
    url: "/tunisie",
    type: "article",
  },
  alternates: {
    canonical: "/tunisie",
  },
};

const smartechMahdiaLogo =
  "https://scontent-fra5-2.xx.fbcdn.net/v/t39.30808-6/653711878_122165621582634245_5335472874411705687_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=109&ccb=1-7&_nc_sid=2a1932&_nc_ohc=MWgbu5Tdno4Q7kNvwF9otTh&_nc_oc=Adrs12y-Oj-2VthUklSzurJHgaTN2AStMf0iLQotJmRfizlOJ04iJ6BMY5cMN1eiPsM&_nc_zt=23&_nc_ht=scontent-lhr8-2.xx&_nc_gid=gceFUEzGarRLErGLQnMy4w&_nc_ss=7a389&oh=00_AfyfE5MHvPmdJmayWTAE9Mgxl2hvBSBSBmLV5XeVHx2COA&oe=69CB707C";
const smartechManoubaLogo =
  "https://scontent-lhr8-2.xx.fbcdn.net/v/t39.30808-6/613223673_122166437504684772_8063648262916785088_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=106&ccb=1-7&_nc_sid=2a1932&_nc_ohc=yR3q-LiLzX4Q7kNvwFnLNk5&_nc_oc=AdoJZjLKWCax2E2RVAF8jdaAkZCoksnu_i4gIuS5derM_KWjAVcwTwn40OdKlpeEZfc&_nc_zt=23&_nc_ht=scontent-lhr8-2.xx&_nc_gid=QTbLVgdC_P2Tgop_HfJQjQ&_nc_ss=7a30f&oh=00_AfzJwquPdQHsGNVxOyZ_F0hF52Mv15bq3rTzLuQRPfkv5w&oe=69CB92CE";

const smartechActivities = [
  "Soutien scolaire régulier du primaire au lycée",
  "BAC Français avec enseignants qualifiés",
  "Cours en ligne et ateliers informatiques",
  "Préparation concours nationaux et diplômes internationaux (DELF, ICDL...)",
];

interface Agence {
  id: string;
  nom: string;
  type: string | null;
  pays: string;
  ville: string | null;
  adresse: string | null;
  telephone: string | null;
  email: string | null;
  siteWeb: string | null;
  facebook: string | null;
  logoUrl: string | null;
  description: string | null;
  verified: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function getAgences(): Promise<Agence[]> {
  try {
    const res = await fetch(`${API_BASE}/agences?pays=Tunisie`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("Error fetching agences:", err);
    return [];
  }
}

const getSlug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default async function TunisiePage() {
  const agences = await getAgences();
  const hasSmartech = agences.some(a => a.nom.toLowerCase().includes("smartech"));

  const ctaCentersSection = (
    <section className="mx-auto w-full max-w-7xl pt-6 px-4 pb-8 sm:px-6 lg:px-8">
      <div className={`grid gap-6 ${agences.length === 1 ? "grid-cols-1 max-w-xl mx-auto" : "lg:grid-cols-2"}`}>
        {agences.map((a) => {
          const isSmartech = a.siteWeb?.includes("smartechacademy.com");
          const logoUrl = a.logoUrl || (a.nom.toLowerCase().includes("mahdia") ? smartechMahdiaLogo : (a.nom.toLowerCase().includes("manouba") ? smartechManoubaLogo : null));

          return (
            <article key={a.id} className="rounded-[2rem] border border-[var(--border-color)] bg-white p-6 shadow-[0_14px_36px_rgba(0,85,164,0.12)]">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-[var(--border-color)] bg-slate-50 flex items-center justify-center">
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={`Logo ${a.nom}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-3xl">🏢</span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                    {a.nom}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Centre partenaire - {a.type || a.ville || "Tunisie"}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {a.siteWeb && (
                  <Link
                    href={isSmartech ? "https://smartechacademy.com/inscription_bac_fr.html" : (a.siteWeb.startsWith("http") ? a.siteWeb : `https://${a.siteWeb}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[var(--primary-blue)]/30 bg-[linear-gradient(135deg,var(--blue-pale),var(--primary-blue))] px-5 py-2 text-sm font-semibold text-[var(--text-primary)] transition hover:brightness-105"
                  >
                    S&apos;inscrire
                  </Link>
                )}
                {a.siteWeb && (
                  <Link
                    href={a.siteWeb.startsWith("http") ? a.siteWeb : `https://${a.siteWeb}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[var(--primary-blue)]/30 bg-[var(--blue-pale)] px-5 py-2 text-sm font-semibold text-[var(--primary-blue)] transition hover:bg-[var(--blue-light)]"
                  >
                    Site officiel
                  </Link>
                )}
                {a.facebook && (
                  <Link
                    href={a.facebook.startsWith("http") ? a.facebook : `https://${a.facebook}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-red-200/70 bg-red-50 px-5 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"                  >
                    Facebook
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );

  return (
    <>
      <ContentPage content={pageContents.tunisie} insertAfterHero={ctaCentersSection} />
      <TunisieMiniSlider />

      {hasSmartech && (
        <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(234,244,255,0.92))] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary-blue)]">
              Informations Smartech Academy
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--text-primary)]">
              Activités principales (source : site officiel)
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {smartechActivities.map((activity) => (
                <div
                  key={activity}
                  className="rounded-xl border border-[var(--border-color)] bg-white px-4 py-3 text-sm text-[var(--text-secondary)]"
                >
                  {activity}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {agences.map((a) => {
        const slug = getSlug(a.nom);
        const isMahdia = a.nom.toLowerCase().includes("mahdia");
        const isManouba = a.nom.toLowerCase().includes("manouba");

        const description = a.description || "Un centre professionnel pour accompagner les candidats libres au Bac Français avec une approche structurée, humaine et orientée résultats.";
        const phones = a.telephone ? a.telephone.split(/[,;\/]/).map(t => t.trim()) : [];

        const features = [
          {
            title: "Présentation du centre",
            desc: isMahdia
              ? "Smartech Academy Mahdia accueille les élèves avec un cadre de travail sérieux, des outils pédagogiques modernes et un suivi de proximité."
              : isManouba
              ? "Smartech Academy Manouba propose un cadre sérieux et motivant, avec des ressources pédagogiques modernes et un accompagnement de proximité."
              : description,
            variant: "normal"
          },
          {
            title: isManouba ? "Préparation au Bac Français" : "Accompagnement Bac Français",
            desc: isManouba
              ? "Le programme est pensé pour les candidats libres avec une méthode claire : progression, planification et entraînement ciblé."
              : "Accompagnement dédié aux candidats libres : méthodologie, planification, préparation des épreuves et organisation des révisions.",
            variant: "normal"
          },
          {
            title: isManouba ? "Petits groupes" : "Professeurs expérimentés",
            desc: isManouba
              ? "Les séances en petits groupes favorisent l'interaction, la participation et une progression plus rapide."
              : "L'équipe pédagogique est composée de professeurs expérimentés pour encadrer chaque élève selon son niveau et ses objectifs.",
            variant: "cyan"
          },
          {
            title: "Examens blancs",
            desc: "Des examens blancs réguliers permettent d'évaluer la progression et d'habituer les élèves aux conditions réelles des épreuves.",
            variant: "normal"
          },
          {
            title: isManouba ? "Suivi personnalisé" : "Suivi des élèves",
            desc: isManouba
              ? "Chaque élève bénéficie d'un suivi individisé pour ajuster le rythme, renforcer les points faibles et consolider les acquis."
              : "Un suivi pédagogique individualisé est assuré pour maintenir la régularité et renforcer les points à améliorer.",
            variant: "red"
          }
        ];

        let photos = [
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=350&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=350&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=350&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=350&auto=format&fit=crop"
        ];

        if (isMahdia) {
          photos = [
            "https://scontent-fra5-2.xx.fbcdn.net/v/t39.30808-6/653711878_122165621582634245_5335472874411705687_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=109&ccb=1-7&_nc_sid=2a1932&_nc_ohc=MWgbu5Tdno4Q7kNvwF9otTh&_nc_oc=Adrs12y-Oj-2VthUklSzurJHgaTN2AStMf0iLQotJmRfizlOJ04iJ6BMY5cMN1eiPsM&_nc_zt=23&_nc_ht=scontent-fra5-2.xx&_nc_gid=gceFUEzGarRLErGLQnMy4w&_nc_ss=7a389&oh=00_AfyfE5MHvPmdJmayWTAE9Mgxl2hvBSBSBmLV5XeVHx2COA&oe=69CB707C",
            "https://scontent-fra5-2.xx.fbcdn.net/v/t39.30808-6/653711878_122165621582634245_5335472874411705687_n.jpg?stp=dst-jpg_fb50_s320x320_tt6&_nc_cat=109&ccb=1-7&_nc_sid=2a1932&_nc_ohc=MWgbu5Tdno4Q7kNvwF9otTh&_nc_oc=Adrs12y-Oj-2VthUklSzurJHgaTN2AStMf0iLQotJmRfizlOJ04iJ6BMY5cMN1eiPsM&_nc_zt=23&_nc_ht=scontent-fra5-2.xx&_nc_gid=gceFUEzGarRLErGLQnMy4w&_nc_ss=7a389&oh=00_AfxcNuI7wOSx5sSR75ElXnrhd1EPnseG7wp5v_p2RVOTPg&oe=69CB707C",
            "https://scontent-lhr6-1.xx.fbcdn.net/v/t39.30808-6/653789593_122171991890684772_7591202119198344650_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_ohc=_JXGz8bwQ8cQ7kNvwGpONkR&_nc_oc=AdqDVZ-1xl51Lsw89ztX8QeCV2Ed0I77xRQD7Aipsy6EVx9nSLUe4fLUPIMYibZEeVY&_nc_zt=23&_nc_ht=scontent-lhr6-1.xx&_nc_gid=vYYpzXqpmgVm7CeUx1jmBw&_nc_ss=7a30f&oh=00_Afygio5O2_9Zd7jvag4UhZuV6HO3o0N4OB6LH1ge7TCglQ&oe=69CB8C7A",
            "https://scontent-lhr6-1.xx.fbcdn.net/v/t39.30808-6/644340839_122170266818684772_4436413083902850776_n.jpg?stp=dst-jpg_s160x160_tt6&_nc_cat=110&ccb=1-7&_nc_sid=612081&_nc_ohc=7g5YnmHcaL8Q7kNvwFCSywM&_nc_oc=Adrp7yllc9Lg0ahrzX6dMtxeZe9NsUHGaKkiCODphHNj62RS6sfH6Ug0bn7ORsiVrDA&_nc_zt=23&_nc_ht=scontent-lhr6-1.xx&_nc_gid=QTbLVgdC_P2Tgop_HfJQjQ&_nc_ss=7a30f&oh=00_AfzDSREI-H1_9UhGeyhgbwm1TVIjELmdrMM3t1dhajGi6A&oe=69CB8B9C"
          ];
        } else if (isManouba) {
          photos = [
            "https://scontent-lhr6-1.xx.fbcdn.net/v/t39.30808-6/653789593_122171991890684772_7591202119198344650_n.jpg?stp=dst-jpg_s160x160_tt6&_nc_cat=110&ccb=1-7&_nc_sid=612081&_nc_ohc=_JXGz8bwQ8cQ7kNvwGpONkR&_nc_oc=AdqDVZ-1xl51Lsw89ztX8QeCV2Ed0I77xRQD7Aipsy6EVx9nSLUe4fLUPIMYibZEeVY&_nc_zt=23&_nc_ht=scontent-lhr6-1.xx&_nc_gid=QTbLVgdC_P2Tgop_HfJQjQ&_nc_ss=7a30f&oh=00_Afz41p9fNIHMgIJc8NYydThhIs75D-1Em-bAqAj2UIvFxQ&oe=69CB8C7A",
            "https://scontent-lhr6-1.xx.fbcdn.net/v/t39.30808-6/644340839_122170266818684772_4436413083902850776_n.jpg?stp=dst-jpg_s160x160_tt6&_nc_cat=110&ccb=1-7&_nc_sid=612081&_nc_ohc=7g5YnmHcaL8Q7kNvwFCSywM&_nc_oc=Adrp7yllc9Lg0ahrzX6dMtxeZe9NsUHGaKkiCODphHNj62RS6sfH6Ug0bn7ORsiVrDA&_nc_zt=23&_nc_ht=scontent-lhr6-1.xx&_nc_gid=QTbLVgdC_P2Tgop_HfJQjQ&_nc_ss=7a30f&oh=00_AfzDSREI-H1_9UhGeyhgbwm1TVIjELmdrMM3t1dhajGi6A&oe=69CB8B9C",
            "https://scontent-lhr6-1.xx.fbcdn.net/v/t39.30808-6/637193910_122169660212684772_9070932492718261755_n.jpg?stp=dst-jpg_s160x160_tt6&_nc_cat=109&ccb=1-7&_nc_sid=612081&_nc_ohc=eoXpASm9t-IQ7kNvwFwljf1&_nc_oc=AdpLFHUayuSF9yRmi3uhNko90PX7WOeiO7GpdmUC2YfSSQyUAkFFKRfEqLHZNBZFtUU&_nc_zt=23&_nc_ht=scontent-lhr6-1.xx&_nc_gid=QTbLVgdC_P2Tgop_HfJQjQ&_nc_ss=7a30f&oh=00_AfzzXuBhYKzgkNEGXHHJRAfnFJ2DgdntkCub8U5qdKvJRQ&oe=69CB8582",
            "https://scontent-lhr8-2.xx.fbcdn.net/v/t39.30808-6/634841221_122169419594684772_5100025703674648366_n.jpg?stp=dst-jpg_s160x160_tt6&_nc_cat=101&ccb=1-7&_nc_sid=612081&_nc_ohc=2dWDWwbZSiAQ7kNvwF5AFAu&_nc_oc=AdpJTNDon_3P55lh7XBl_BzdJZiz-Q-PxpG1r7uYIRUxG74ndYJaUngjzX13ZUYrniE&_nc_zt=23&_nc_ht=scontent-lhr8-2.xx&_nc_gid=QTbLVgdC_P2Tgop_HfJQjQ&_nc_ss=7a30f&oh=00_Afwg9NqDw-xaYvCCBkQnhrmrRIXYqV_Z4a4eHXQxRTTjMg&oe=69CB6D93"
          ];
        } else if (a.logoUrl) {
          photos = [a.logoUrl, a.logoUrl, a.logoUrl, a.logoUrl];
        }

        return (
          <section key={a.id} id={slug} className="mx-auto w-full max-w-7xl px-4 pb-20 scroll-mt-28 sm:px-6 lg:px-8">
            <div className="rounded-[2.2rem] border border-[var(--border-color)] bg-[linear-gradient(160deg,rgba(255,255,255,0.97),rgba(234,244,255,0.93))] p-8 shadow-[0_16px_44px_rgba(0,85,164,0.14)] sm:p-10">
              <div className="max-w-3xl space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary-blue)]">
                  Centre partenaire - {a.type || a.ville || "Tunisie"}
                </p>
                <h2 className="text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
                  {a.nom}
                </h2>
                <p className="text-base leading-8 text-[var(--text-secondary)]">
                  {description}
                </p>
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {features.map((f, idx) => {
                  let cardClass = "rounded-[1.8rem] border border-[var(--border-color)] bg-white p-6";
                  let titleClass = "text-xl font-semibold text-[var(--text-primary)]";
                  if (f.variant === "cyan") {
                    cardClass = "rounded-[1.8rem] border border-[var(--primary-blue)]/40 bg-[linear-gradient(160deg,rgba(0,85,164,0.15),rgba(255,255,255,0.98))] p-6";
                  } else if (f.variant === "red") {
                    cardClass = "rounded-[1.8rem] border border-[var(--primary-blue)]/30 bg-[var(--blue-pale)] p-6";
                    titleClass = "text-xl font-semibold text-[var(--primary-blue)]";
                  }
                  return (
                    <article key={idx} className={cardClass}>
                      <h3 className={titleClass}>{f.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                        {f.desc}
                      </p>
                    </article>
                  );
                })}
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
                <article className="rounded-[1.8rem] border border-[var(--border-color)] bg-white p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary-blue)]">
                    Coordonnées
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">
                    {a.nom}
                  </h3>
                  <div className="mt-5 space-y-5 text-sm text-[var(--text-secondary)]">
                    {a.adresse && (
                      <div>
                        <p className="font-semibold text-[var(--text-primary)]">Adresse</p>
                        <p className="mt-1 leading-7 whitespace-pre-line">
                          {a.adresse}
                        </p>
                      </div>
                    )}
                    {phones.length > 0 && (
                      <div>
                        <p className="font-semibold text-[var(--text-primary)]">Téléphones</p>
                        <ul className="mt-2 space-y-1">
                          {phones.map((phone, pi) => (
                            <li key={pi}>{phone}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {a.email && (
                      <div>
                        <p className="font-semibold text-[var(--text-primary)]">Email</p>
                        <p className="mt-1">{a.email}</p>
                      </div>
                    )}
                  </div>
                </article>

                <article className="rounded-[1.8rem] border border-[var(--border-color)] bg-white p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary-blue)]">
                    Liens et galerie
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">
                    Présence web et aperçu du centre
                  </h3>
                  <div className="mt-5 flex flex-col gap-3 text-sm">
                    {a.siteWeb && (
                      <Link
                        href={a.siteWeb.startsWith("http") ? a.siteWeb : `https://${a.siteWeb}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-[var(--primary-blue)]/30 bg-[var(--blue-pale)] px-4 py-3 font-medium text-[var(--primary-blue)] transition hover:bg-[var(--blue-light)]"
                      >
                        Site officiel - {a.siteWeb.replace(/(^\w+:|^)\/\//, "")}
                      </Link>
                    )}
                    {a.facebook && (
                      <Link
                        href={a.facebook.startsWith("http") ? a.facebook : `https://${a.facebook}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-[var(--primary-blue)]/30 bg-[var(--blue-pale)] px-4 py-3 font-medium text-[var(--primary-blue)] transition hover:bg-[var(--blue-light)]"
                      >
                        Facebook - {a.nom}
                      </Link>
                    )}
                  </div>
                  {photos.length > 0 && (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {photos.map((photo, phI) => (
                        <div key={phI} className="relative overflow-hidden rounded-lg h-28 w-full">
                          <Image
                            src={photo}
                            alt={`Photo ${a.nom} ${phI + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              </div>
            </div>
          </section>
        );
      })}

      <InternalLinkHub title="Poursuivre votre parcours bac français candidat libre" />
    </>
  );
}
