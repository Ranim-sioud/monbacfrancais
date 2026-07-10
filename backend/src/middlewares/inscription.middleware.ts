import { Request, Response, NextFunction } from 'express';

export const validateInscription = (req: Request, res: Response, next: NextFunction) => {
  const { nom, email, pays, ville, classe, specialites, message, packType } = req.body;

  // Validation des champs requis
  if (!nom || typeof nom !== 'string' || nom.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Le nom est requis et doit contenir au moins 2 caractères',
    });
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'L\'email est requis et doit être valide',
    });
  }

  if (!pays || typeof pays !== 'string' || pays.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Le pays est requis',
    });
  }

  if (!ville || typeof ville !== 'string' || ville.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'La ville est requise',
    });
  }

  if (!classe || !['PREMIERE', 'TERMINALE'].includes(classe)) {
    return res.status(400).json({
      success: false,
      message: 'La classe doit être PREMIERE ou TERMINALE',
    });
  }

  if (!specialites || typeof specialites !== 'string' || specialites.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Les spécialités sont requises',
    });
  }

  if (!packType || !['MENSUEL', 'ANNUEL'].includes(packType)) {
    return res.status(400).json({
      success: false,
      message: 'Le pack doit être MENSUEL ou ANNUEL',
    });
  }

  // Le message est optionnel
  if (message && typeof message !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Le message doit être une chaîne de caractères',
    });
  }

  next();
};
