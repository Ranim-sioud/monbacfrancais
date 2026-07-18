import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import agenceRoutes from './routes/agence.routes';
import actualiteRoutes from './routes/actualite.routes';
import scraperRoutes from './routes/scraper.routes';
import inscriptionRoutes from './routes/inscription.routes';
import contactRoutes from './routes/contact.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares globaux
app.use(cors({
  origin: process.env.NODE_ENV === 'development'
    ? [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
    ]
    : process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  res.on('finish', () => {
    console.log(`[${new Date().toISOString()}] Response: ${res.statusCode} ${req.method} ${req.url}`);
  });
  next();
});

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/agences', agenceRoutes);
app.use('/api/actualites', actualiteRoutes);
app.use('/api/admin/scraper', scraperRoutes);
app.use('/api/inscriptions', inscriptionRoutes);
app.use('/api/contact', contactRoutes);

// Route de santé
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Backend Mon Bac Français démarré sur http://localhost:${PORT}`);
});

export default app;
