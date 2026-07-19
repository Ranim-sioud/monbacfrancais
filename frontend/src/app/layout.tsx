import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

import "./globals.css";

import { PublicShell } from "@/components/public-shell";
import { siteUrl } from "@/data/site-content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bac Français candidat libre | Mon Bac Français",
    template: "%s | Mon Bac Français",
  },
  description:
    "Mon Bac Français accompagne les élèves pour préparer et réussir le bac français candidat libre en ligne, en Tunisie et depuis l'étranger.",
  keywords: [
    "bac français candidat libre",
    "bac français étranger",
    "bac français tunisie",
    "inscription bac français candidat libre",
    "préparation bac français en ligne",
  ],
  category: "education",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Bac Français candidat libre | Mon Bac Français",
    description:
      "Préparez le bac français candidat libre : inscription, guide, préparation en ligne et accompagnement depuis la Tunisie ou l'étranger.",
    url: siteUrl,
    siteName: "Mon Bac Français",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bac Français candidat libre | Mon Bac Français",
    description:
      "Inscription bac français candidat libre, préparation bac français en ligne et ressources pour les candidats à l'étranger.",
  },
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Mon Bac Français" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${manrope.variable} bg-[var(--bg-primary)] text-[var(--text-primary)]`}
        suppressHydrationWarning
      >
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}

