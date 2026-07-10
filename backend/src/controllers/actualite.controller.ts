import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { prisma } from '../config/prisma';

// ── Routes publiques ──────────────────────────────────────────────

export async function getPublishedActualites(req: Request, res: Response) {
  try {
    const { categorie } = req.query;

    const where: Record<string, unknown> = { status: 'PUBLISHED' };
    if (categorie) where.categorie = categorie as string;

    const actualites = await prisma.actualite.findMany({
      where,
      select: {
        id: true,
        titre: true,
        contenu: true,
        resume: true,
        sourceUrl: true,
        categorie: true,
        imageUrl: true,
        publieLe: true,
        status: true,
        author: {
          select: { id: true, name: true },
        },
        createdAt: true,
      },
      orderBy: { publieLe: 'desc' },
    });

    return res.json(actualites);
  } catch (error) {
    console.error('Erreur getPublishedActualites:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function getActualiteById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const actualite = await prisma.actualite.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
    });

    if (!actualite) {
      return res.status(404).json({ message: 'Actualité non trouvée' });
    }

    return res.json(actualite);
  } catch (error) {
    console.error('Erreur getActualiteById:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

// ── Routes admin ──────────────────────────────────────────────────

export async function getAllActualitesAdmin(req: AuthRequest, res: Response) {
  try {
    const actualites = await prisma.actualite.findMany({
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(actualites);
  } catch (error) {
    console.error('Erreur getAllActualitesAdmin:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function createActualite(req: AuthRequest, res: Response) {
  try {
    const { titre, contenu, resume, sourceUrl, categorie, imageUrl, publieLe, status } = req.body;

    if (!titre || !contenu) {
      return res.status(400).json({ message: 'Titre et contenu sont requis' });
    }

    const actualite = await prisma.actualite.create({
      data: {
        titre,
        contenu,
        resume: resume || null,
        sourceUrl: sourceUrl || null,
        categorie: categorie || null,
        imageUrl: imageUrl || null,
        publieLe: publieLe ? new Date(publieLe) : null,
        status: status || 'DRAFT',
        authorId: req.user?.id || null,
      },
    });

    return res.status(201).json(actualite);
  } catch (error) {
    console.error('Erreur createActualite:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function updateActualite(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { titre, contenu, resume, sourceUrl, categorie, imageUrl, publieLe } = req.body;

    const existing = await prisma.actualite.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Actualité non trouvée' });
    }

    const actualite = await prisma.actualite.update({
      where: { id },
      data: {
        ...(titre !== undefined && { titre }),
        ...(contenu !== undefined && { contenu }),
        ...(resume !== undefined && { resume }),
        ...(sourceUrl !== undefined && { sourceUrl }),
        ...(categorie !== undefined && { categorie }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(publieLe !== undefined && { publieLe: publieLe ? new Date(publieLe) : null }),
      },
    });

    return res.json(actualite);
  } catch (error) {
    console.error('Erreur updateActualite:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function publishActualite(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;

    const existing = await prisma.actualite.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Actualité non trouvée' });
    }

    const actualite = await prisma.actualite.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
        publieLe: existing.publieLe || new Date(),
      },
    });

    return res.json(actualite);
  } catch (error) {
    console.error('Erreur publishActualite:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function unpublishActualite(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;

    const existing = await prisma.actualite.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Actualité non trouvée' });
    }

    const actualite = await prisma.actualite.update({
      where: { id },
      data: { status: 'DRAFT' },
    });

    return res.json(actualite);
  } catch (error) {
    console.error('Erreur unpublishActualite:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function deleteActualite(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;

    const existing = await prisma.actualite.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Actualité non trouvée' });
    }

    await prisma.actualite.delete({ where: { id } });

    return res.json({ message: 'Actualité supprimée avec succès' });
  } catch (error) {
    console.error('Erreur deleteActualite:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function bulkDeleteActualites(req: AuthRequest, res: Response) {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'IDs invalides ou manquants' });
    }

    const deleteResult = await prisma.actualite.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return res.json({
      message: `${deleteResult.count} actualité(s) supprimée(s) avec succès`,
      count: deleteResult.count,
    });
  } catch (error) {
    console.error('Erreur bulkDeleteActualites:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

