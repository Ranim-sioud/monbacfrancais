# Instructions pour le système d'inscription

## Résumé des changements

### Backend (Express + Prisma)

1. **Modèle Prisma** (`backend/prisma/schema.prisma`)
   - Ajout des enums: `Classe`, `PackType`, `SubscriptionStatus`
   - Ajout du modèle `Inscription` avec les champs:
     - nom, email, pays, ville
     - classe (PREMIERE ou TERMINALE)
     - specialites (text)
     - message (optionnel)
     - packType (MENSUEL ou ANNUEL)
     - prixOriginal, prixFinal, reduction (20% par défaut)
     - status (PENDING par défaut)

2. **API Routes** (`backend/src/routes/inscription.routes.ts`)
   - POST `/api/inscriptions` - Créer une inscription

3. **Controller** (`backend/src/controllers/inscription.controller.ts`)
   - create: Crée une inscription avec calcul automatique du prix
   - getAll: Récupère toutes les inscriptions
   - getById: Récupère une inscription par ID
   - updateStatus: Met à jour le statut d'une inscription

4. **Middleware** (`backend/src/middlewares/inscription.middleware.ts`)
   - Validation des champs du formulaire

5. **App** (`backend/src/app.ts`)
   - Ajout de la route `/api/inscriptions`

### Frontend (Next.js)

1. **Page d'inscription** (`frontend/src/app/inscription/page.tsx`)
   - Page dédiée avec formulaire complet
   - Tous les champs demandés: nom, email, pays, ville, classe (Première/Terminale), spécialités, message
   - Sélection de pack (Mensuel 190€ / Annuel 1850€)
   - Affichage du prix avec réduction de 20%
   - Validation et envoi des données
   - Message de succès après inscription
   - Bouton de retour à l'accueil

2. **API Route** (`frontend/src/app/api/inscriptions/route.ts`)
   - Proxy vers le backend Express

3. **Header** (`frontend/src/components/site-header.tsx`)
   - Le bouton "S'inscrire" navigue maintenant vers la page `/inscription`

## Étapes pour terminer la configuration

### 1. Redémarrer le backend

La migration Prisma a été appliquée avec succès. Vous devez redémarrer le backend pour que le client Prisma soit régénéré automatiquement:

```bash
cd backend
npm run dev
```

### 2. Démarrer le frontend

```bash
cd frontend
npm run dev
```

### 3. Tester l'inscription

1. Ouvrez le site dans votre navigateur
2. Cliquez sur le bouton "S'inscrire" dans le header
3. Remplissez le formulaire:
   - Nom complet
   - Email
   - Pays
   - Ville
   - Classe (Première ou Terminale)
   - Spécialités
   - Message (optionnel)
4. Sélectionnez un pack:
   - **Pack Mensuel**: 190€ → 152€ (après -20%)
   - **Pack Annuel**: 1850€ → 1480€ (après -20%)
5. Cliquez sur "S'inscrire"

## Prix des packs

- **Pack Mensuel**: 190€ (réduction 20% = 152€)
- **Pack Annuel**: 1850€ (réduction 20% = 1480€)

## Structure de la base de données

Table `Inscription`:
- `id`: UUID (clé primaire)
- `nom`: String
- `email`: String
- `pays`: String
- `ville`: String
- `classe`: Enum (PREMIERE, TERMINALE)
- `specialites`: Text
- `message`: Text (nullable)
- `packType`: Enum (MENSUEL, ANNUEL)
- `prixOriginal`: Float
- `prixFinal`: Float
- `reduction`: Float (20 par défaut)
- `status`: Enum (PENDING, ACTIVE, CANCELLED)
- `createdAt`: DateTime
- `updatedAt`: DateTime

## API Endpoints

### Backend (Express)
- `POST /api/inscriptions` - Créer une inscription
- `GET /api/inscriptions` - Récupérer toutes les inscriptions
- `GET /api/inscriptions/:id` - Récupérer une inscription par ID
- `PATCH /api/inscriptions/:id` - Mettre à jour le statut

### Frontend (Next.js)
- `POST /api/inscriptions` - Proxy vers le backend

## Variables d'environnement

Assurez-vous que le fichier `.env` du frontend contient:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

## Notes importantes

- La réduction de 20% est appliquée automatiquement sur les deux packs
- Le formulaire est accessible depuis le bouton "S'inscrire" dans le header
- Les données sont validées avant l'envoi
- Un message de succès s'affiche après l'inscription réussie
- Le modal se ferme automatiquement après 2 secondes en cas de succès
