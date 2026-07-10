import { Request, Response } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';

// Utiliser une clé secrète dédiée pour le refresh token (fallback sur JWT_SECRET)
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || JWT_SECRET;

// Durées de vie des tokens
const ACCESS_TOKEN_EXPIRY = '15m'; // 15 minutes (court)
const REFRESH_TOKEN_EXPIRY_DAYS = 7; // 7 jours

// Options de cookie sécurisé pour le Refresh Token (Best Practices)
const COOKIE_OPTIONS = {
  httpOnly: true, // Protège contre le vol de cookies via XSS
  secure: process.env.NODE_ENV === 'production', // Uniquement HTTPS en production
  sameSite: 'lax' as const, // Protège contre les attaques CSRF
  path: '/api/auth', // Limite l'envoi du cookie uniquement aux routes d'authentification
  maxAge: REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000, // Durée de vie en ms
};

/**
 * Génère un Access Token court (15m)
 */
function generateAccessToken(userId: string, role: string): string {
  return jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

/**
 * Génère un Refresh Token (7j), l'enregistre en base et l'attache au cookie
 */
async function generateAndSetRefreshToken(res: Response, userId: string): Promise<string> {
  // Ajouter un nonce aléatoire pour garantir l'unicité même si deux tokens
  // sont générés dans la même seconde pour le même utilisateur
  const nonce = crypto.randomBytes(16).toString('hex');
  const token = jwt.sign({ id: userId, nonce }, JWT_REFRESH_SECRET, { expiresIn: `${REFRESH_TOKEN_EXPIRY_DAYS}d` });
  const expiresAt = new Date(Date.now() + COOKIE_OPTIONS.maxAge);

  // Nettoyer les anciens tokens expirés de cet utilisateur (éviter l'accumulation)
  await prisma.refreshToken.deleteMany({
    where: { userId, expiresAt: { lt: new Date() } },
  }).catch(() => {});

  // Enregistrer en base de données pour permettre la révocation
  await prisma.refreshToken.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  // Définir le cookie sécurisé
  res.cookie('refreshToken', token, COOKIE_OPTIONS);

  return token;
}

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, country } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nom, email et mot de passe requis' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Un compte avec cet email existe déjà' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        country: country || null,
      },
    });

    const accessToken = generateAccessToken(user.id, user.role);
    await generateAndSetRefreshToken(res, user.id);

    return res.status(201).json({
      token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        country: user.country,
      },
    });
  } catch (error) {
    console.error('Erreur register:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const accessToken = generateAccessToken(user.id, user.role);
    await generateAndSetRefreshToken(res, user.id);

    return res.json({
      token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        country: user.country,
      },
    });
  } catch (error) {
    console.error('Erreur login:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

/**
 * Route /api/auth/admin/login
 * Connexion réservée aux administrateurs — vérifie le rôle ADMIN
 */
export async function adminLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le rôle ADMIN
    if (user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Accès refusé — compte non administrateur' });
    }

    const accessToken = generateAccessToken(user.id, user.role);
    await generateAndSetRefreshToken(res, user.id);

    return res.json({
      token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        country: user.country,
      },
    });
  } catch (error) {
    console.error('Erreur adminLogin:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

/**
 * Route /api/auth/refresh
 * Échange un refresh token valide contre un nouvel access token (avec rotation de refresh token)
 *
 * Gère la concurrence : si deux requêtes arrivent avec le même refresh token,
 * on utilise deleteMany + une vérification du nombre de suppressions pour
 * s'assurer qu'une seule requête effectue la rotation.
 */
export async function refresh(req: Request, res: Response) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token manquant' });
    }

    // Trouver le token en BDD
    const dbToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    // Si le token n'existe pas ou est expiré
    if (!dbToken || dbToken.expiresAt < new Date()) {
      // Supprimer le token expiré si existant
      if (dbToken) {
        await prisma.refreshToken.delete({ where: { id: dbToken.id } }).catch(() => {});
      }
      res.clearCookie('refreshToken', COOKIE_OPTIONS);
      return res.status(401).json({ message: 'Session expirée' });
    }

    // Vérifier la signature JWT
    let payload: { id: string };
    try {
      payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { id: string };
    } catch (err) {
      // Token falsifié ou invalide, supprimer de la BDD
      await prisma.refreshToken.delete({ where: { id: dbToken.id } }).catch(() => {});
      res.clearCookie('refreshToken', COOKIE_OPTIONS);
      return res.status(401).json({ message: 'Token invalide' });
    }

    // --- ROTATION DU REFRESH TOKEN (avec protection contre la concurrence) ---
    // Utiliser deleteMany pour éviter l'erreur "record not found" si un autre
    // refresh concurrent a déjà supprimé ce token.
    const deleteResult = await prisma.refreshToken.deleteMany({
      where: { id: dbToken.id },
    });

    // Si aucun enregistrement n'a été supprimé, un refresh concurrent l'a déjà traité.
    // On renvoie 401 pour que le frontend utilise le nouveau token du premier refresh.
    if (deleteResult.count === 0) {
      return res.status(401).json({ message: 'Token déjà utilisé (refresh concurrent)' });
    }

    // Générer un nouvel Access Token et un nouveau Refresh Token
    const newAccessToken = generateAccessToken(dbToken.user.id, dbToken.user.role);
    await generateAndSetRefreshToken(res, dbToken.user.id);

    return res.json({
      token: newAccessToken,
      user: {
        id: dbToken.user.id,
        name: dbToken.user.name,
        email: dbToken.user.email,
        role: dbToken.user.role,
        country: dbToken.user.country,
      },
    });
  } catch (error) {
    console.error('Erreur refresh:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

/**
 * Route /api/auth/logout
 * Révoque la session (supprime de la BDD et vide le cookie)
 */
export async function logout(req: Request, res: Response) {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      // Supprimer de la BDD
      await prisma.refreshToken.delete({ where: { token: refreshToken } }).catch(() => {});
    }

    // Supprimer le cookie
    res.clearCookie('refreshToken', COOKIE_OPTIONS);

    return res.json({ message: 'Déconnexion réussie' });
  } catch (error) {
    console.error('Erreur logout:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
