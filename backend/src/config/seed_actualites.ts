import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const additionalArticles = [
  {
    titre: "Bac de français : décryptage des épreuves de l'oral",
    contenu: "Comment se déroule l'explication linéaire ? Comment réagir aux questions de l'entretien ? Nos coachs vous guident étape par étape pour assurer une note maximale.",
    resume: "Conseils pratiques pour réussir son oral.",
    categorie: "Cours",
    status: "PUBLISHED" as const,
    publieLe: new Date('2026-06-23'),
  },
  {
    titre: "Les courants littéraires indispensables du bac",
    contenu: "Humanisme, Pléiade, Lumières, Romantisme, Réalisme... Le récapitulatif complet de tous les mouvements littéraires à mentionner dans vos copies.",
    resume: "Fiche mémo sur les mouvements littéraires.",
    categorie: "Cours",
    status: "PUBLISHED" as const,
    publieLe: new Date('2026-06-24'),
  },
  {
    titre: "Session candidat libre 2026 : les centres à l'étranger",
    contenu: "Pour les candidats résidant en Tunisie, au Maroc, ou ailleurs : découvrez la liste des lycées français homologués faisant office de centres d'examen.",
    resume: "Centres d'examen pour les candidats de l'étranger.",
    categorie: "Infos",
    status: "PUBLISHED" as const,
    publieLe: new Date('2026-06-25'),
  },
  {
    titre: "Dissertation de français : exemples de plans rédigés",
    contenu: "Consultez nos exemples rédigés sur les œuvres au programme. Apprenez à structurer une dissertation dialectique ou thématique en trois parties.",
    resume: "Exemples concrets de plans de dissertation.",
    categorie: "Méthodologie",
    status: "PUBLISHED" as const,
    publieLe: new Date('2026-06-26'),
  }
];

async function main() {
  const admin = await prisma.user.findFirst({
    where: { role: 'ADMIN' }
  });

  for (const art of additionalArticles) {
    const existing = await prisma.actualite.findFirst({ where: { titre: art.titre } });
    if (!existing) {
      await prisma.actualite.create({
        data: {
          ...art,
          authorId: admin?.id,
        }
      });
    }
  }
  console.log("Additional mock articles seeded successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
