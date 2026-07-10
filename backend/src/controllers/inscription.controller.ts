import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const inscriptionController = {
  async create(req: Request, res: Response) {
    try {
      const { nom, email, pays, ville, classe, specialites, message, packType } = req.body;

      // Calculer le prix
      const prixOriginal = packType === 'MENSUEL' ? 190 : 1850;
      const reduction = 20;
      const prixFinal = prixOriginal * (1 - reduction / 100);

      const inscription = await prisma.inscription.create({
        data: {
          nom,
          email,
          pays,
          ville,
          classe,
          specialites,
          message,
          packType,
          prixOriginal,
          prixFinal,
          reduction,
        },
      });

      res.status(201).json({
        success: true,
        message: 'Inscription créée avec succès',
        data: inscription,
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'inscription:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la création de l\'inscription',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const inscriptions = await prisma.inscription.findMany({
        orderBy: { createdAt: 'desc' },
      });

      res.status(200).json({
        success: true,
        data: inscriptions,
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des inscriptions:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des inscriptions',
      });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const inscription = await prisma.inscription.findUnique({
        where: { id },
      });

      if (!inscription) {
        return res.status(404).json({
          success: false,
          message: 'Inscription non trouvée',
        });
      }

      res.status(200).json({
        success: true,
        data: inscription,
      });
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'inscription:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération de l\'inscription',
      });
    }
  },

  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const inscription = await prisma.inscription.update({
        where: { id },
        data: { status },
      });

      res.status(200).json({
        success: true,
        message: 'Statut mis à jour avec succès',
        data: inscription,
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour du statut',
      });
    }
  },
};
