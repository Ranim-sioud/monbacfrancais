import axios from 'axios';
import * as cheerio from 'cheerio';
import { prisma } from '../../config/prisma';

// ═══════════════════════════════════════════════════════════════════════════════
//  CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const HTTP_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
};

const DELAY_MS = 800;

/**
 * Score minimum requis pour qu'une agence soit enregistrée en base.
 * En dessous de ce seuil, l'agence est considérée comme non pertinente
 * pour la préparation au bac français et est ignorée.
 */
const RELEVANCE_THRESHOLD = 20;

// ═══════════════════════════════════════════════════════════════════════════════
//  MOTEUR DE PERTINENCE — mots-clés pondérés liés au bac français
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Chaque groupe de mots-clés a un poids.
 * Le score final est la somme des poids de tous les groupes matchés.
 */
const RELEVANCE_KEYWORDS: { keywords: string[]; weight: number }[] = [
  // Mentions directes du bac français (poids très élevé)
  { keywords: ['bac francais', 'baccalaureat francais', 'bac de francais'], weight: 35 },
  { keywords: ['preparation bac', 'preparer le bac', 'preparation au bac'], weight: 30 },
  { keywords: ['epreuve anticipee', 'eaf'], weight: 25 },

  // Classes de lycée liées au bac
  { keywords: ['classe de premiere', 'classe de terminale', 'premiere generale', 'terminale generale'], weight: 20 },
  { keywords: ['premiere', 'terminale'], weight: 10 },

  // Soutien scolaire lycée
  { keywords: ['soutien scolaire lycee', 'cours lycee', 'accompagnement lycee'], weight: 20 },
  { keywords: ['soutien scolaire', 'cours particuliers', 'tutorat'], weight: 10 },

  // Épreuves spécifiques
  { keywords: ['oral de francais', 'ecrit de francais', 'commentaire de texte', 'dissertation'], weight: 20 },
  { keywords: ['grand oral', 'epreuve de philosophie', 'epreuve de specialite'], weight: 15 },

  // Termes du bac en général
  { keywords: ['baccalaureat', 'bac general', 'bac technologique'], weight: 15 },
  { keywords: ['revision bac', 'annales bac', 'corrige bac'], weight: 15 },

  // Programmes scolaires
  { keywords: ['programme scolaire francais', 'programme officiel', 'education nationale'], weight: 10 },
  { keywords: ['lycee francais', 'enseignement francais', 'systeme educatif francais'], weight: 10 },
  { keywords: ['homologation', 'aefe', 'mission laique'], weight: 15 },

  // Préparation aux examens
  { keywords: ['stage intensif', 'stage de revision', 'stage bac'], weight: 15 },
  { keywords: ['examen', 'diplome'], weight: 5 },

  // Langue française générale (faible poids — nécessaire mais pas suffisant)
  { keywords: ['langue francaise', 'francais langue maternelle', 'cours de francais'], weight: 5 },
];

// ═══════════════════════════════════════════════════════════════════════════════
//  ÉTABLISSEMENTS CONNUS — sources vérifiées liées au bac français
// ═══════════════════════════════════════════════════════════════════════════════

interface CuratedEstablishment {
  nom: string;
  type: string;
  pays: string;
  ville: string | null;
  adresse: string | null;
  telephone: string | null;
  email: string | null;
  siteWeb: string | null;
  description: string;
  relevanceScore: number;
}

/**
 * Liste curatée d'établissements reconnus pour la préparation au bac français.
 * Ces entrées ont un score de pertinence élevé garanti et sont insérées directement.
 */
const CURATED_ESTABLISHMENTS: CuratedEstablishment[] = [
  {
    nom: 'CNED – Centre National d\'Enseignement à Distance',
    type: 'Enseignement à distance',
    pays: 'France',
    ville: 'Chasseneuil-du-Poitou',
    adresse: 'Boulevard Nicéphore Niépce, Téléport 2, 86360 Chasseneuil-du-Poitou',
    telephone: '05 49 49 94 94',
    email: null,
    siteWeb: 'https://www.cned.fr',
    description:
      'Le CNED propose une préparation complète au baccalauréat général et technologique à distance, ' +
      'incluant toutes les épreuves anticipées de français (écrit et oral), la philosophie, le Grand oral ' +
      'et les épreuves de spécialité. Formation agréée par l\'Éducation nationale.',
    relevanceScore: 95,
  },
  {
    nom: 'Acadomia',
    type: 'Soutien scolaire',
    pays: 'France',
    ville: null,
    adresse: null,
    telephone: '01 44 01 46 00',
    email: null,
    siteWeb: 'https://www.acadomia.fr',
    description:
      'Leader du soutien scolaire en France, Acadomia propose des cours particuliers et stages intensifs ' +
      'de préparation au bac français, incluant des ateliers spécifiques pour l\'oral et l\'écrit de français ' +
      'en classe de Première, ainsi que des révisions pour toutes les épreuves terminales.',
    relevanceScore: 90,
  },
  {
    nom: 'Complétude',
    type: 'Soutien scolaire',
    pays: 'France',
    ville: null,
    adresse: null,
    telephone: '01 46 10 10 60',
    email: null,
    siteWeb: 'https://www.completude.com',
    description:
      'Complétude propose des cours particuliers à domicile et en ligne pour la préparation au bac français. ' +
      'Accompagnement personnalisé en Première et Terminale pour les épreuves anticipées de français, ' +
      'les spécialités et le Grand oral.',
    relevanceScore: 85,
  },
  {
    nom: 'Cours Legendre',
    type: 'Enseignement à distance',
    pays: 'France',
    ville: 'Paris',
    adresse: null,
    telephone: '01 42 71 92 57',
    email: null,
    siteWeb: 'https://www.cours-legendre.fr',
    description:
      'Cours par correspondance et stages de vacances pour la préparation au baccalauréat français. ' +
      'Programmes conformes à l\'Éducation nationale, avec suivi pédagogique individuel ' +
      'pour les classes de Première et Terminale.',
    relevanceScore: 85,
  },
  {
    nom: 'Groupe Réussite',
    type: 'Stage intensif',
    pays: 'France',
    ville: 'Paris',
    adresse: null,
    telephone: '01 44 32 32 09',
    email: null,
    siteWeb: 'https://www.groupe-reussite.fr',
    description:
      'Stages intensifs et cours particuliers de préparation au bac français et au Grand oral. ' +
      'Spécialisé dans l\'accompagnement des lycéens de Première et Terminale ' +
      'pour les épreuves du baccalauréat général.',
    relevanceScore: 85,
  },
  {
    nom: 'Cours Thalès',
    type: 'Stage intensif',
    pays: 'France',
    ville: 'Paris',
    adresse: null,
    telephone: '01 42 05 41 36',
    email: null,
    siteWeb: 'https://www.cours-thales.fr',
    description:
      'Stages de préparation au baccalauréat en petits groupes. Préparation aux épreuves de spécialité, ' +
      'au Grand oral et aux épreuves anticipées de français. Cours dispensés par des professeurs ' +
      'agrégés et normaliens.',
    relevanceScore: 85,
  },
  {
    nom: 'Les Bons Profs',
    type: 'Plateforme en ligne',
    pays: 'France',
    ville: null,
    adresse: null,
    telephone: null,
    email: null,
    siteWeb: 'https://www.lesbonsprofs.com',
    description:
      'Plateforme de révisions en ligne pour le baccalauréat français. Vidéos de cours, exercices corrigés ' +
      'et fiches de révision pour toutes les matières du bac général et technologique, ' +
      'y compris les épreuves anticipées de français.',
    relevanceScore: 80,
  },
  {
    nom: 'SchoolMouv',
    type: 'Plateforme en ligne',
    pays: 'France',
    ville: null,
    adresse: null,
    telephone: null,
    email: null,
    siteWeb: 'https://www.schoolmouv.fr',
    description:
      'Cours en ligne et fiches de révision pour les lycéens préparant le baccalauréat français. ' +
      'Programmes conformes à l\'Éducation nationale pour les classes de Première et Terminale.',
    relevanceScore: 80,
  },
  {
    nom: 'Mission laïque française',
    type: 'Réseau d\'écoles',
    pays: 'International',
    ville: null,
    adresse: null,
    telephone: null,
    email: null,
    siteWeb: 'https://www.mlfmonde.org',
    description:
      'Réseau d\'établissements scolaires français à l\'étranger préparant au baccalauréat français. ' +
      'Plus de 100 écoles dans 40 pays, dispensant un enseignement conforme aux programmes ' +
      'de l\'Éducation nationale française, de la maternelle au baccalauréat.',
    relevanceScore: 90,
  },
  {
    nom: 'AEFE – Agence pour l\'enseignement français à l\'étranger',
    type: 'Réseau d\'écoles',
    pays: 'International',
    ville: null,
    adresse: null,
    telephone: null,
    email: null,
    siteWeb: 'https://www.aefe.fr',
    description:
      'Réseau mondial de 580 établissements homologués par le ministère de l\'Éducation nationale, ' +
      'présent dans 139 pays. Tous les lycées du réseau AEFE préparent au baccalauréat français ' +
      '(général et technologique) avec des programmes identiques à ceux de la métropole.',
    relevanceScore: 95,
  },
  {
    nom: 'Ipécom Paris',
    type: 'École privée',
    pays: 'France',
    ville: 'Paris',
    adresse: '8 rue Benjamin Godard, 75016 Paris',
    telephone: '01 47 27 00 50',
    email: null,
    siteWeb: 'https://www.ipecom.com',
    description:
      'École privée parisienne spécialisée dans la préparation au baccalauréat français. ' +
      'Classes de Première et Terminale en effectifs réduits, stages intensifs ' +
      'de préparation aux épreuves écrites et orales du bac.',
    relevanceScore: 85,
  },
  {
    nom: 'Maxicours (Educlever)',
    type: 'Plateforme en ligne',
    pays: 'France',
    ville: null,
    adresse: null,
    telephone: null,
    email: null,
    siteWeb: 'https://www.maxicours.com',
    description:
      'Plateforme de soutien scolaire en ligne proposant des cours, exercices et annales corrigées ' +
      'pour la préparation au baccalauréat français. Contenus conformes aux programmes officiels ' +
      'pour les classes de Première et Terminale.',
    relevanceScore: 80,
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
//  FLAM SCRAPING (filtré)
// ═══════════════════════════════════════════════════════════════════════════════

const FLAM_BASE_URL = 'https://www.associations-flam.fr';
const FLAM_LIST_URL = `${FLAM_BASE_URL}/associations/liste`;
const FLAM_MAX_PAGES = 7;

// ═══════════════════════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Normalise une chaîne : minuscule, sans accents, sans ponctuation superflue.
 */
function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les diacritiques
    .replace(/['']/g, ' ')
    .replace(/[-–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calcule le score de pertinence d'un texte par rapport au bac français.
 * Retourne le score (0–100+) et la liste des mots-clés matchés.
 */
function calculateRelevanceScore(text: string): { score: number; matchedKeywords: string[] } {
  const normalizedText = normalize(text);
  let score = 0;
  const matchedKeywords: string[] = [];

  for (const group of RELEVANCE_KEYWORDS) {
    for (const keyword of group.keywords) {
      if (normalizedText.includes(keyword)) {
        score += group.weight;
        matchedKeywords.push(keyword);
        break; // Un seul match par groupe suffit
      }
    }
  }

  return { score: Math.min(score, 100), matchedKeywords };
}

// ═══════════════════════════════════════════════════════════════════════════════
//  FLAM SCRAPER — avec filtre de pertinence strict
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Récupère toutes les URLs des pages individuelles d'associations FLAM.
 */
async function getAllFLAMUrls(): Promise<string[]> {
  const urls: Set<string> = new Set();

  for (let page = 0; page < FLAM_MAX_PAGES; page++) {
    try {
      const pageUrl = `${FLAM_LIST_URL}?page=${page}`;
      console.log(`[Scraper Agences] FLAM — liste page ${page + 1}/${FLAM_MAX_PAGES}...`);

      const { data } = await axios.get(pageUrl, { headers: HTTP_HEADERS, timeout: 15000 });
      const $ = cheerio.load(data);

      $('a[href]').each((_, el) => {
        const href = $(el).attr('href') || '';
        if (
          href.startsWith('/associations/') &&
          !href.includes('/liste') &&
          href !== '/associations' &&
          href.split('/').length === 3
        ) {
          urls.add(`${FLAM_BASE_URL}${href}`);
        }
      });

      await sleep(DELAY_MS);
    } catch (err: any) {
      console.error(`[Scraper Agences] Erreur liste FLAM page ${page}:`, err?.message || err);
    }
  }

  console.log(`[Scraper Agences] ${urls.size} URLs FLAM trouvées`);
  return Array.from(urls);
}

/**
 * Scrape les détails d'une association FLAM et évalue sa pertinence.
 * Retourne null si l'association n'est pas pertinente pour le bac français.
 */
async function scrapeFLAMAssociation(url: string) {
  const { data } = await axios.get(url, { headers: HTTP_HEADERS, timeout: 15000 });
  const $ = cheerio.load(data);

  // Extraction des informations de base
  const nom = $('h1').first().text().trim();
  const adresse = $('.field--name--field-address-text').text().trim() || null;
  const pays = $('.field--name--field-country .field-item').text().trim();
  const telephone = $('.field--name--field-phone .field-item').text().trim() || null;
  const siteWeb = $('.field--name--field-website a').attr('href') || null;

  // Extraction du e-mail
  $('script').remove();
  const bodyText = $('body').text();
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const allEmails = bodyText.match(emailRegex) || [];
  const filteredEmails = allEmails.filter(
    (e) => !e.includes('associations-flam.fr') && !e.includes('w3.org'),
  );
  const email = filteredEmails.length > 0 ? filteredEmails[0] : null;

  // Extraction de la description complète (tout le texte visible de la page)
  const pageText = $('body').text().replace(/\s+/g, ' ').trim();

  // ── FILTRE DE PERTINENCE ──
  // On évalue le nom + le texte complet de la page
  const textToScore = `${nom} ${pageText}`;
  const { score, matchedKeywords } = calculateRelevanceScore(textToScore);

  if (score < RELEVANCE_THRESHOLD) {
    return null; // Pas assez pertinent pour le bac français
  }

  // Extraire une description pertinente depuis le contenu de la page
  const descriptionParagraphs: string[] = [];
  $('p, .field--name-body .field-item').each((_, el) => {
    const txt = $(el).text().trim();
    if (txt.length > 40 && txt.length < 600) {
      descriptionParagraphs.push(txt);
    }
  });
  const description = descriptionParagraphs.slice(0, 3).join(' ') || null;

  return {
    nom,
    type: 'Association FLAM',
    pays,
    ville: null as string | null,
    adresse,
    telephone: telephone && telephone !== '0' ? telephone : null,
    email,
    siteWeb,
    description,
    urlSource: url,
    relevanceScore: score,
    matchedKeywords,
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ENREGISTREMENT EN BASE
// ═══════════════════════════════════════════════════════════════════════════════

interface AgenceData {
  nom: string;
  type: string;
  pays: string;
  ville: string | null;
  adresse: string | null;
  telephone: string | null;
  email: string | null;
  siteWeb: string | null;
  description: string | null;
  urlSource: string | null;
  relevanceScore: number;
}

/**
 * Insère ou met à jour une agence dans la base de données.
 */
async function upsertAgence(
  agence: AgenceData,
  results: { created: number; updated: number; errors: number },
) {
  const existing = await prisma.agence.findFirst({
    where: { nom: agence.nom, pays: agence.pays },
  });

  if (existing) {
    await prisma.agence.update({
      where: { id: existing.id },
      data: {
        type: agence.type,
        adresse: agence.adresse,
        telephone: agence.telephone,
        email: agence.email,
        siteWeb: agence.siteWeb,
        description: agence.description,
        urlSource: agence.urlSource,
        relevanceScore: agence.relevanceScore,
        scrapeDate: new Date(),
        source: 'SCRAPED',
      },
    });
    results.updated++;
  } else {
    await prisma.agence.create({
      data: {
        nom: agence.nom,
        type: agence.type,
        pays: agence.pays,
        ville: agence.ville,
        adresse: agence.adresse,
        telephone: agence.telephone,
        email: agence.email,
        siteWeb: agence.siteWeb,
        description: agence.description,
        urlSource: agence.urlSource,
        relevanceScore: agence.relevanceScore,
        source: 'SCRAPED',
        scrapeDate: new Date(),
        verified: false,
      },
    });
    results.created++;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  NETTOYAGE — supprime les anciennes agences non pertinentes
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Supprime de la base toutes les agences scrapées qui ont un score
 * de pertinence insuffisant (héritées de l'ancien scraper sans filtre).
 */
async function purgeIrrelevantAgences(): Promise<number> {
  const result = await prisma.agence.deleteMany({
    where: {
      source: 'SCRAPED',
      relevanceScore: { lt: RELEVANCE_THRESHOLD },
    },
  });
  if (result.count > 0) {
    console.log(`[Scraper Agences] 🗑️  ${result.count} agences non pertinentes supprimées de la base`);
  }
  return result.count;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  POINT D'ENTRÉE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Scrape les agences et centres en lien avec le bac français.
 *
 * Architecture :
 * 1. Purge les anciennes agences non pertinentes
 * 2. Insère/met à jour les établissements connus et vérifiés
 * 3. Scrape les associations FLAM avec filtre de pertinence strict
 *
 * Seules les agences dont le score de pertinence ≥ RELEVANCE_THRESHOLD (20)
 * sont enregistrées dans la base de données.
 */
export async function scrapeAgences() {
  const results = { created: 0, updated: 0, errors: 0, purged: 0, flamIgnored: 0 };

  try {
    // ── Étape 1 : Purger les anciennes agences non pertinentes ──
    console.log('[Scraper Agences] Étape 1/3 — Purge des agences non pertinentes...');
    results.purged = await purgeIrrelevantAgences();

    // ── Étape 2 : Établissements connus et vérifiés ──
    console.log('[Scraper Agences] Étape 2/3 — Insertion des établissements connus...');
    for (const establishment of CURATED_ESTABLISHMENTS) {
      try {
        await upsertAgence(
          {
            nom: establishment.nom,
            type: establishment.type,
            pays: establishment.pays,
            ville: establishment.ville,
            adresse: establishment.adresse,
            telephone: establishment.telephone,
            email: establishment.email,
            siteWeb: establishment.siteWeb,
            description: establishment.description,
            urlSource: establishment.siteWeb,
            relevanceScore: establishment.relevanceScore,
          },
          results,
        );
        console.log(`[Scraper Agences] ✓ ${establishment.nom} (score: ${establishment.relevanceScore})`);
      } catch (err: any) {
        console.error(`[Scraper Agences] Erreur établissement ${establishment.nom}:`, err?.message);
        results.errors++;
      }
    }

    // ── Étape 3 : FLAM avec filtre de pertinence strict ──
    console.log('[Scraper Agences] Étape 3/3 — Scraping FLAM avec filtre de pertinence...');
    const flamUrls = await getAllFLAMUrls();

    for (const url of flamUrls) {
      try {
        const details = await scrapeFLAMAssociation(url);

        if (!details) {
          results.flamIgnored++;
          continue;
        }

        if (!details.nom || !details.pays) {
          console.warn(`[Scraper Agences] Données incomplètes pour ${url}, ignoré`);
          continue;
        }

        console.log(
          `[Scraper Agences] ✓ FLAM: ${details.nom} (${details.pays}) — score: ${details.relevanceScore} [${details.matchedKeywords.join(', ')}]`,
        );

        await upsertAgence(
          {
            nom: details.nom,
            type: details.type,
            pays: details.pays,
            ville: details.ville,
            adresse: details.adresse,
            telephone: details.telephone,
            email: details.email,
            siteWeb: details.siteWeb,
            description: details.description,
            urlSource: details.urlSource,
            relevanceScore: details.relevanceScore,
          },
          results,
        );

        await sleep(DELAY_MS);
      } catch (itemErr: any) {
        console.error(`[Scraper Agences] Erreur FLAM ${url}:`, itemErr?.message || itemErr);
        results.errors++;
      }
    }
  } catch (err: any) {
    console.error('[Scraper Agences] Erreur globale:', err?.message || err);
    results.errors++;
  }

  console.log('[Scraper Agences] ═══════════════════════════════════════════');
  console.log('[Scraper Agences] Résultats finaux :');
  console.log(`  → Créées      : ${results.created}`);
  console.log(`  → Mises à jour : ${results.updated}`);
  console.log(`  → FLAM ignorées (non pertinentes) : ${results.flamIgnored}`);
  console.log(`  → Purgées      : ${results.purged}`);
  console.log(`  → Erreurs      : ${results.errors}`);
  console.log('[Scraper Agences] ═══════════════════════════════════════════');

  return results;
}
