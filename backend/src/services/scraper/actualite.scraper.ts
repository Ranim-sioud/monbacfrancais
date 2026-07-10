import axios from 'axios';
import * as cheerio from 'cheerio';
import { execSync } from 'child_process';
import path from 'path';
import { prisma } from '../../config/prisma';

// Flux RSS ciblés pour récupérer des informations importantes sur le Bac Français
const RSS_FEEDS = [
  {
    url: 'https://news.google.com/rss/search?q=Bac%20de%20francais&hl=fr&gl=FR&ceid=FR:fr',
    categorie: 'Épreuves du Bac de Français',
  },
  {
    url: 'https://news.google.com/rss/search?q=Bac%20francais%20candidat%20libre&hl=fr&gl=FR&ceid=FR:fr',
    categorie: 'Bac Français - Candidat Libre',
  },
  {
    url: 'https://news.google.com/rss/search?q=Calendrier%20dates%20examens%20bac%20francais&hl=fr&gl=FR&ceid=FR:fr',
    categorie: 'Calendrier & Dates des Examens',
  },
  {
    url: 'https://news.google.com/rss/search?q=Reforme%20changements%20bac%20francais&hl=fr&gl=FR&ceid=FR:fr',
    categorie: 'Réformes & Changements Officiels',
  },
  {
    url: 'https://news.google.com/rss/search?q=Specialites%20bac%20francais&hl=fr&gl=FR&ceid=FR:fr',
    categorie: 'Évolution des Spécialités',
  },
  {
    url: 'https://www.lemonde.fr/bac-lycee/rss_full.xml',
    categorie: 'Le Monde - Lycée & Bac',
  },
];

// Pages HTML statiques officielles à scraper directement
const STATIC_PAGES = [
  {
    url: 'https://www.education.gouv.fr/reussir-au-lycee/le-baccalaureat-general-10457',
    categorie: 'Réformes & Changements Officiels',
    defaultTitle: 'Le baccalauréat général (Épreuves et Modalités)',
  }
];

const HTTP_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
};

/**
 * Nettoie le texte (CDATA, tags HTML, espaces multiples).
 */
function cleanText(raw: string): string {
  return raw
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Nettoie le titre pour supprimer le suffixe du nom du journal.
 */
function cleanArticleTitle(title: string): string {
  const parts = title.split(' - ');
  if (parts.length > 1) {
    parts.pop(); // Enlève le dernier élément (le nom du média)
    return parts.join(' - ').trim();
  }
  return title.trim();
}

/**
 * Normalise une chaîne en enlevant les accents et en mettant en minuscule
 */
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Vérifie si l'actualité est importante pour le bac de français
 */
function isRelevantArticle(title: string, description: string): boolean {
  const content = normalizeString(`${title} ${description}`);
  const keywords = [
    'bac',
    'francais',
    'lycee',
    'oeuvre',
    'programme',
    'candidat',
    'oral',
    'ecrit',
    'corrige',
    'sujet',
    'epreuve',
    'note',
    'calendrier',
    'convocation',
    'date',
    'reforme',
    'specialite',
    'modalite',
    'examen',
    'changement'
  ];
  return keywords.some(keyword => content.includes(keyword));
}

/**
 * Extrait les points clés d'information principale à partir des paragraphes de l'article.
 */
function extractKeyPoints(paragraphs: string[]): string {
  const keyPoints: string[] = [];
  const normalizedKeywords = [
    'oral', 'ecrit', 'sujet', 'corrige', 'coefficient', 'date', 
    'calendrier', 'inscription', 'note', 'epreuve', 'programme', 'oeuvre'
  ];

  for (const p of paragraphs) {
    if (keyPoints.length >= 4) break;
    const normalized = normalizeString(p);
    const hasNumbers = /\d+/.test(p);
    const hasKeyword = normalizedKeywords.some(kw => normalized.includes(kw));

    if ((hasNumbers || hasKeyword) && p.length > 40 && p.length < 220) {
      keyPoints.push(p);
    }
  }

  // Si on n'a pas trouvé de points ciblés, on prend les 2 premiers paragraphes significatifs
  if (keyPoints.length < 2) {
    for (const p of paragraphs) {
      if (keyPoints.length >= 3) break;
      if (p.length > 35 && p.length < 250 && !keyPoints.includes(p)) {
        keyPoints.push(p);
      }
    }
  }

  if (keyPoints.length > 0) {
    return `📌 **Informations clés de cette actualité :**\n${keyPoints.map(pt => `• ${pt}`).join('\n')}\n\n`;
  }
  return '';
}

/**
 * Découpe une description courte en phrases pour en faire des points clés de secours.
 */
function extractKeyPointsFromDescription(description: string, title: string): string {
  if (!description) return '';
  const sentences = description
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 20 && s.length < 400 && s.toLowerCase() !== title.toLowerCase() && !title.toLowerCase().includes(s.toLowerCase()) && !s.toLowerCase().includes(title.toLowerCase()));

  if (sentences.length > 0) {
    return `📌 **Informations clés de cette actualité :**\n${sentences.map(s => `• ${s}.`).join('\n')}\n\n`;
  }
  return '';
}

/**
 * Résout le lien Google News redirigé en lien direct vers l'éditeur de presse
 * en appelant le script Python googlenewsdecoder.
 */
function resolveGoogleNewsUrl(googleUrl: string): string {
  try {
    const scriptPath = path.join(__dirname, 'resolve_url.py');
    const stdout = execSync(`python "${scriptPath}" "${googleUrl}"`, {
      encoding: 'utf-8',
      timeout: 12000,
    });
    return stdout.trim() || googleUrl;
  } catch (err) {
    console.warn(`[Scraper] Impossible de décoder le lien Google News (utilisation du lien d'origine)`);
    return googleUrl;
  }
}

/**
 * Récupère le contenu textuel complet et l'image d'un article à partir de son URL d'origine.
 */
async function fetchFullArticleContent(url: string): Promise<{ contenu: string; paragraphs: string[]; imageUrl: string | null }> {
  try {
    const targetUrl = url.includes('news.google.com/rss/articles')
      ? resolveGoogleNewsUrl(url)
      : url;

    let htmlContent = '';

    // Fallback local pour contourner la protection Cloudflare WAF
    if (targetUrl.includes('education.gouv.fr/reussir-au-lycee/le-baccalaureat-general-10457')) {
      const fs = require('fs');
      const localFilePath = path.join(__dirname, 'le-baccalaureat-general.html');
      if (fs.existsSync(localFilePath)) {
        console.log(`[Scraper] Chargement de la page locale pour contourner Cloudflare : ${localFilePath}`);
        htmlContent = fs.readFileSync(localFilePath, 'utf8');
      }
    }

    if (!htmlContent) {
      console.log(`[Scraper] Téléchargement de la page : ${targetUrl}`);
      const { data } = await axios.get(targetUrl, {
        headers: HTTP_HEADERS,
        timeout: 10000,
      });
      htmlContent = data;
    }

    const $ = cheerio.load(htmlContent);

    // Supprimer les éléments publicitaires, scripts, styles et navigation pour un texte propre
    $('script, style, iframe, nav, footer, header, .ads, .advertisement, .social-share, .cookie-consent, form, button, input, .comments').remove();

    // Récupération de l'image de couverture (meta og:image)
    const ogImage = $('meta[property="og:image"]').attr('content') || null;

    // Détermination du conteneur de l'article principal par pertinence
    const selectors = [
      'article .article-content',
      'article .content',
      'article [itemprop="articleBody"]',
      '.article__content',
      '.entry-content',
      '.article-body',
      'article',
      '.main-content',
      'main'
    ];

    let contentContainer = null;
    for (const selector of selectors) {
      const el = $(selector);
      if (el.length > 0 && el.text().trim().length > 300) {
        contentContainer = el;
        break;
      }
    }

    if (!contentContainer) {
      contentContainer = $('body');
    }

    // Extraction des paragraphes significatifs
    const paragraphs: string[] = [];
    contentContainer.find('p, h2, h3, li').each((_, el) => {
      const txt = $(el).text().trim();
      if (
        txt.length > 35 &&
        !txt.toLowerCase().includes('copier le lien') &&
        !txt.toLowerCase().includes('partager sur') &&
        !txt.toLowerCase().includes('bloqueur de publicité') &&
        !txt.toLowerCase().includes('cookie')
      ) {
        paragraphs.push(txt);
      }
    });

    const contenu = paragraphs.join('\n\n');

    return {
      contenu: contenu.length > 200 ? contenu : '',
      paragraphs: contenu.length > 200 ? paragraphs : [],
      imageUrl: ogImage,
    };
  } catch (err: any) {
    console.warn(`[Scraper] Impossible de lire l'article complet sur ${url}: ${err.message}`);
    return { contenu: '', paragraphs: [], imageUrl: null };
  }
}

/**
 * Scrape les actualités et les guides sur le Bac Français.
 * Résout les redirections de presse Google News et extrait le texte complet de l'article original.
 */
export async function scrapeActualites() {
  const results = { created: 0, updated: 0, errors: 0 };

  for (const feed of RSS_FEEDS) {
    try {
      console.log(`[Scraper] Lecture du flux : ${feed.url}`);

      const { data } = await axios.get(feed.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; MonBacFrancaisBot/1.0)',
          'Accept': 'application/rss+xml, application/xml, text/xml',
        },
        timeout: 15000,
      });

      const $ = cheerio.load(data, { xml: true });
      const items = $('item').toArray();

      console.log(`[Scraper] ${items.length} articles identifiés dans "${feed.categorie}"`);

      for (const item of items) {
        try {
          const rawTitle = $(item).find('title').text();
          const cleanTitle = cleanText(rawTitle);
          const titre = cleanArticleTitle(cleanTitle);

          const rawDesc = $(item).find('description').text();
          const description = cleanText(rawDesc);

          // Filtrage intelligent : Ne garder que les articles jugés importants pour le Bac de Français
          if (!isRelevantArticle(titre, description)) {
            console.log(`[Scraper] Article ignoré (non pertinent) : "${titre}"`);
            continue;
          }

          const sourceUrl =
            $(item).find('link').text().trim() ||
            $(item).find('guid').text().trim() ||
            feed.url;

          const pubDateStr = $(item).find('pubDate').text().trim();
          const publieLe = pubDateStr ? new Date(pubDateStr) : new Date();

          // Image du flux RSS par défaut
          let imageUrl =
            $(item).find('media\\:content, content').attr('url') ||
            $(item).find('enclosure').attr('url') ||
            null;

          if (!titre || titre.length < 10) continue;

          // Vérifier si l'article existe déjà pour éviter le double scraping
          const existing = await prisma.actualite.findFirst({
            where: { titre },
          });

          // Si l'article existe déjà et contient déjà un texte complet (> 400 caractères), on le met juste à jour (scrapeDate)
          if (existing && existing.contenu && existing.contenu.length > 400) {
            await prisma.actualite.update({
              where: { id: existing.id },
              data: { scrapeDate: new Date() },
            });
            results.updated++;
            continue;
          }

          // Sinon (nouvel article OU ancien article incomplet/stub), on effectue le scraping complet
          console.log(`[Scraper] Récupération du contenu pour : "${titre}"`);
          const fullContent = await fetchFullArticleContent(sourceUrl);

          const rawContenu = fullContent.contenu || description || titre;
          
          // Récupérer les points clés (à partir des paragraphes, ou à défaut de la description courte)
          let keyPointsText = extractKeyPoints(fullContent.paragraphs);
          if (!keyPointsText && description) {
            keyPointsText = extractKeyPointsFromDescription(description, titre);
          }
          
          // Formater le contenu en y ajoutant les points clés
          const finalContenu = keyPointsText + rawContenu;
          
          const finalImageUrl = fullContent.imageUrl || imageUrl;
          const resume = description ? description.substring(0, 500) : rawContenu.substring(0, 250);

          if (existing) {
            // Mettre à jour l'ancien stub incomplet
            await prisma.actualite.update({
              where: { id: existing.id },
              data: {
                contenu: finalContenu,
                resume,
                imageUrl: finalImageUrl,
                scrapeDate: new Date(),
              },
            });
            results.updated++;
          } else {
            // Créer un nouvel article
            await prisma.actualite.create({
              data: {
                titre,
                contenu: finalContenu,
                resume,
                sourceUrl,
                categorie: feed.categorie,
                imageUrl: finalImageUrl,
                publieLe,
                scrapeDate: new Date(),
                status: 'DRAFT', // L'admin valide et publie
              },
            });
            results.created++;
          }
        } catch (itemErr: any) {
          console.error('[Scraper] Erreur sur l\'article :', itemErr.message || itemErr);
          results.errors++;
        }
      }
    } catch (feedErr: any) {
      console.error(`[Scraper] Erreur sur le flux ${feed.url}:`, feedErr.message || feedErr);
      results.errors++;
    }
  }

  // Scraper les pages HTML statiques officielles
  for (const page of STATIC_PAGES) {
    try {
      console.log(`[Scraper] Récupération de la page statique officielle : ${page.url}`);
      
      const fullContent = await fetchFullArticleContent(page.url);
      if (!fullContent.contenu) {
        console.warn(`[Scraper] Impossible d'extraire le contenu de la page : ${page.url}`);
        continue;
      }

      // Déterminer le titre (dynamique ou par défaut)
      let titre = page.defaultTitle;
      try {
        const { data } = await axios.get(page.url, { headers: HTTP_HEADERS, timeout: 15000 });
        const $ = cheerio.load(data);
        const pageTitle = $('h1').first().text().trim();
        if (pageTitle && pageTitle.length > 5) {
          titre = pageTitle;
        }
      } catch (tErr) {
        // Fallback au titre par défaut
      }

      const existing = await prisma.actualite.findFirst({
        where: { titre },
      });

      // Point clés
      let keyPointsText = extractKeyPoints(fullContent.paragraphs);
      const finalContenu = keyPointsText + fullContent.contenu;
      const resume = fullContent.contenu.substring(0, 400);

      if (existing) {
        await prisma.actualite.update({
          where: { id: existing.id },
          data: {
            contenu: finalContenu,
            resume,
            imageUrl: fullContent.imageUrl || existing.imageUrl,
            scrapeDate: new Date(),
          },
        });
        results.updated++;
      } else {
        await prisma.actualite.create({
          data: {
            titre,
            contenu: finalContenu,
            resume,
            sourceUrl: page.url,
            categorie: page.categorie,
            imageUrl: fullContent.imageUrl,
            publieLe: new Date(),
            scrapeDate: new Date(),
            status: 'PUBLISHED', // Directement publié car source officielle
          },
        });
        results.created++;
      }
    } catch (pageErr: any) {
      console.error(`[Scraper] Erreur sur la page statique ${page.url}:`, pageErr.message || pageErr);
      results.errors++;
    }
  }

  console.log('[Scraper] Bilan actualités :', results);
  return results;
}
