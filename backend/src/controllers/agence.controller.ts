import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { prisma } from '../config/prisma';
import { uploadToCloudinary, deleteFromCloudinary } from '../middlewares/upload.middleware';

// ── Routes publiques ──────────────────────────────────────────────

export async function getAllAgences(req: Request, res: Response) {
  try {
    const { pays, ville, verified, type } = req.query;

    const where: Record<string, unknown> = {};
    if (pays) where.pays = pays as string;
    if (ville) where.ville = { contains: ville as string };
    if (type) where.type = type as string;
    if (verified !== undefined) where.verified = verified === 'true';

    const agences = await prisma.agence.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return res.json(agences);
  } catch (error) {
    console.error('Erreur getAllAgences:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function getAgenceById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const agence = await prisma.agence.findUnique({ where: { id } });
    if (!agence) {
      return res.status(404).json({ message: 'Agence non trouvée' });
    }

    return res.json(agence);
  } catch (error) {
    console.error('Erreur getAgenceById:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

// ── Routes admin ──────────────────────────────────────────────────

// Convertit les chaînes vides (envoyées par FormData) en null
function emptyToNull(val: unknown): string | null {
  if (typeof val === 'string' && val.trim() === '') return null;
  return val as string | null;
}

export async function createAgence(req: AuthRequest, res: Response) {
  try {
    const { nom, type, pays, ville, adresse, telephone, email, siteWeb, facebook, description } = req.body;

    if (!nom || !pays) {
      return res.status(400).json({ message: 'Nom et pays sont requis' });
    }

    // Upload du logo vers Cloudinary si un fichier est envoyé
    let logoUrl: string | null = null;
    if (req.file) {
      try {
        logoUrl = await uploadToCloudinary(req.file.buffer, 'monbacfrancais/agences');
      } catch (uploadErr) {
        console.error('Erreur upload Cloudinary (ignorée):', uploadErr);
        // On continue sans logo plutôt que de bloquer la création
      }
    }

    const agence = await prisma.agence.create({
      data: {
        nom,
        type: emptyToNull(type),
        pays,
        ville: emptyToNull(ville),
        adresse: emptyToNull(adresse),
        telephone: emptyToNull(telephone),
        email: emptyToNull(email),
        siteWeb: emptyToNull(siteWeb),
        facebook: emptyToNull(facebook),
        logoUrl,
        description: emptyToNull(description),
        source: 'MANUAL',
      },
    });

    return res.status(201).json(agence);
  } catch (error: any) {
    console.error('Erreur createAgence:', error);
    return res.status(500).json({ message: error?.message || 'Erreur serveur' });
  }
}

export async function updateAgence(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { nom, type, pays, ville, adresse, telephone, email, siteWeb, facebook, description } = req.body;

    console.log('updateAgence received body:', req.body);
    console.log('updateAgence file:', req.file);

    const existing = await prisma.agence.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Agence non trouvée' });
    }

    // Upload du nouveau logo si envoyé
    let logoUrl: string | undefined = undefined;
    if (req.file) {
      try {
        // Supprimer l'ancien logo de Cloudinary
        if (existing.logoUrl) {
          await deleteFromCloudinary(existing.logoUrl);
        }
        logoUrl = await uploadToCloudinary(req.file.buffer, 'monbacfrancais/agences');
      } catch (uploadErr) {
        console.error('Erreur upload Cloudinary (ignorée):', uploadErr);
      }
    }

    const agence = await prisma.agence.update({
      where: { id },
      data: {
        ...(nom !== undefined && { nom: emptyToNull(nom) || existing.nom }),
        ...(type !== undefined && { type: emptyToNull(type) }),
        ...(pays !== undefined && { pays: emptyToNull(pays) || existing.pays }),
        ...(ville !== undefined && { ville: emptyToNull(ville) }),
        ...(adresse !== undefined && { adresse: emptyToNull(adresse) }),
        ...(telephone !== undefined && { telephone: emptyToNull(telephone) }),
        ...(email !== undefined && { email: emptyToNull(email) }),
        ...(siteWeb !== undefined && { siteWeb: emptyToNull(siteWeb) }),
        ...(facebook !== undefined && { facebook: emptyToNull(facebook) }),
        ...(description !== undefined && { description: emptyToNull(description) }),
        ...(logoUrl !== undefined && { logoUrl }),
      },
    });

    return res.json(agence);
  } catch (error: any) {
    console.error('Erreur updateAgence:', error);
    return res.status(500).json({ message: error?.message || 'Erreur serveur' });
  }
}

export async function verifyAgence(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;

    const existing = await prisma.agence.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Agence non trouvée' });
    }

    const agence = await prisma.agence.update({
      where: { id },
      data: { verified: true },
    });

    return res.json(agence);
  } catch (error) {
    console.error('Erreur verifyAgence:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function deleteAgence(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;

    const existing = await prisma.agence.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Agence non trouvée' });
    }

    // Supprimer le logo de Cloudinary
    if (existing.logoUrl) {
      await deleteFromCloudinary(existing.logoUrl);
    }

    await prisma.agence.delete({ where: { id } });

    return res.json({ message: 'Agence supprimée avec succès' });
  } catch (error) {
    console.error('Erreur deleteAgence:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function bulkDeleteAgences(req: AuthRequest, res: Response) {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'IDs invalides ou manquants' });
    }

    // Récupérer les agences pour supprimer leurs logos de Cloudinary
    const existingAgences = await prisma.agence.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        logoUrl: true,
      },
    });

    for (const agence of existingAgences) {
      if (agence.logoUrl) {
        try {
          await deleteFromCloudinary(agence.logoUrl);
        } catch (cloudinaryErr) {
          console.error('Erreur suppression Cloudinary bulk-delete agence:', cloudinaryErr);
        }
      }
    }

    const deleteResult = await prisma.agence.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return res.json({
      message: `${deleteResult.count} agence(s) supprimée(s) avec succès`,
      count: deleteResult.count,
    });
  } catch (error) {
    console.error('Erreur bulkDeleteAgences:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
