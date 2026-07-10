import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { scrapeAgences } from '../services/scraper/agence.scraper';
import { scrapeActualites } from '../services/scraper/actualite.scraper';

export async function runAgenceScraper(req: AuthRequest, res: Response) {
  try {
    const results = await scrapeAgences();
    return res.json({
      message: 'Scraping des agences terminé',
      ...results,
    });
  } catch (error) {
    console.error('Erreur runAgenceScraper:', error);
    return res.status(500).json({ message: 'Erreur lors du scraping des agences' });
  }
}

export async function runActualiteScraper(req: AuthRequest, res: Response) {
  try {
    const results = await scrapeActualites();
    return res.json({
      message: 'Scraping des actualités terminé',
      ...results,
    });
  } catch (error) {
    console.error('Erreur runActualiteScraper:', error);
    return res.status(500).json({ message: 'Erreur lors du scraping des actualités' });
  }
}
