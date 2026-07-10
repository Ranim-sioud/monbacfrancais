import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import cloudinary from '../config/cloudinary';

// Stocker temporairement en mémoire (pas de fichier sur le disque)
const storage = multer.memoryStorage();

// Filtrer uniquement les images
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers images sont acceptés (jpg, png, webp, svg)'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
});

/**
 * Upload un buffer (fichier en mémoire) vers Cloudinary
 * Retourne l'URL sécurisée de l'image (avec un timeout de 10s pour éviter les blocages)
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  folder: string = 'monbacfrancais/agences'
): Promise<string> {
  const uploadPromise = new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { width: 400, height: 400, crop: 'limit', quality: 'auto', format: 'webp' },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result!.secure_url);
      }
    );
    uploadStream.end(buffer);
  });

  const timeoutPromise = new Promise<string>((_, reject) =>
    setTimeout(() => reject(new Error('Timeout de 10 secondes lors de l\'upload Cloudinary')), 10000)
  );

  return Promise.race([uploadPromise, timeoutPromise]);
}

/**
 * Supprime une image Cloudinary via son URL (avec un timeout de 5s pour éviter les blocages)
 */
export async function deleteFromCloudinary(imageUrl: string): Promise<void> {
  try {
    // Extraire le public_id de l'URL Cloudinary
    const parts = imageUrl.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return;
    // public_id = tout après "upload/vXXXX/" sans l'extension
    const pathAfterUpload = parts.slice(uploadIndex + 2).join('/');
    const publicId = pathAfterUpload.replace(/\.[^/.]+$/, '');

    const deletePromise = cloudinary.uploader.destroy(publicId);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout de 5 secondes lors de la suppression Cloudinary')), 5000)
    );

    await Promise.race([deletePromise, timeoutPromise]);
  } catch (err) {
    console.error('Erreur suppression Cloudinary:', err);
  }
}
