# Données textuelles et informationnelles du site Mon Bac Français

Ce document sert de référence de contrôle avant refonte graphique. Il recense les contenus textuels, informationnels, SEO, liens, données dynamiques et libellés fonctionnels présents dans le site actuel. Les éléments de design, classes CSS, couleurs, animations et mise en page sont exclus.

## Sources transversales

### Configuration globale

- Page concernée : toutes les pages publiques
- Fichier source : `frontend/src/data/site-content.ts`
- Type de donnée : constante globale, base d'URL
- Contenu :
  - `siteUrl` : `https://monbacfrancais.com`

### Métadonnées globales

- Page concernée : toutes les pages
- Fichier source : `frontend/src/app/layout.tsx`
- Type de donnée : métadonnées SEO globales, OpenGraph, Twitter, robots, langue HTML
- Contenu :
  - Langue HTML : `fr`
  - Title par défaut : `Bac Français candidat libre | Mon Bac Français`
  - Template title : `%s | Mon Bac Français`
  - Description : `Mon Bac Français accompagne les élèves pour préparer et réussir le bac français candidat libre en ligne, en Tunisie et depuis l'étranger.`
  - Keywords :
    - `bac français candidat libre`
    - `bac français étranger`
    - `bac français tunisie`
    - `inscription bac français candidat libre`
    - `préparation bac français en ligne`
  - Category : `education`
  - Robots : index et follow autorisés ; Googlebot index/follow, max-snippet `-1`, max-image-preview `large`, max-video-preview `-1`
  - OpenGraph :
    - Title : `Bac Français candidat libre | Mon Bac Français`
    - Description : `Préparez le bac français candidat libre : inscription, guide, préparation en ligne et accompagnement depuis la Tunisie ou l'étranger.`
    - URL : `https://monbacfrancais.com`
    - Site name : `Mon Bac Français`
    - Locale : `fr_FR`
    - Type : `website`
  - Twitter :
    - Card : `summary_large_image`
    - Title : `Bac Français candidat libre | Mon Bac Français`
    - Description : `Inscription bac français candidat libre, préparation bac français en ligne et ressources pour les candidats à l'étranger.`
  - Canonical : `/`
  - Author : `Mon Bac Français`

### Navigation principale

- Page concernée : header, footer, sitemap, navigation mobile
- Fichiers sources : `frontend/src/data/site-content.ts`, `frontend/src/components/site-header.tsx`, `frontend/src/components/site-footer.tsx`, `frontend/src/app/sitemap.ts`
- Type de donnée : liens internes, libellés de navigation
- Contenu :
  - `/` : `Accueil`
  - `/en-ligne` : `En ligne`
  - `/tunisie` : `Tunisie`
  - `/autres-pays` : `Autres pays`
  - `/guide-bac-francais` : `Guide du Bac Français`
  - `/inscription-candidat-libre` : `Inscription candidat libre`
  - `/actualites` : `Actualités`
  - `/contact` : `Contact`

### Header public

- Page concernée : toutes les pages publiques
- Fichier source : `frontend/src/components/site-header.tsx`
- Type de donnée : texte statique, lien interne, attribut image
- Contenu :
  - Alt logo : `Logo Mon Bac Français`
  - Fallback logo : `MBF`
  - Marque : `monbacfrancais.com`
  - Sous-titre : `Bac Français en candidat libre`
  - Bouton principal : `S'inscrire`
  - Lien du bouton principal : `/inscription-candidat-libre`

### Footer public

- Page concernée : toutes les pages publiques
- Fichier source : `frontend/src/components/site-footer.tsx`
- Type de donnée : texte statique, liens internes, tags
- Contenu :
  - Logo texte : `MBF`
  - Marque : `monbacfrancais.com`
  - Description courte : `La plateforme dédiée au Bac Français en candidat libre depuis l'étranger.`
  - Paragraphe : `Une présence digitale pensée pour informer, rassurer et convertir les élèves étrangers qui souhaitent préparer leur Bac Français avec clarté, méthode et confiance.`
  - Tags : `Luxe académique`, `International`, `Candidat libre`
  - Titre bloc navigation : `Navigation premium`
  - Liens : mêmes éléments que la navigation principale.

### Hub de maillage interne

- Page concernée : pages publiques qui utilisent `InternalLinkHub`
- Fichier source : `frontend/src/components/internal-link-hub.tsx`
- Type de donnée : liens internes SEO, texte statique
- Contenu :
  - Eyebrow : `Maillage interne`
  - Titre par défaut : `Ressources liées`
  - Liens :
    - `/en-ligne` : `Préparation bac français en ligne`
    - `/inscription-candidat-libre` : `Inscription bac français candidat libre`
    - `/tunisie` : `Bac français Tunisie`
    - `/autres-pays` : `Bac français étranger`
    - `/guide-bac-francais` : `Guide du bac français candidat libre`

### Hero générique de page

- Page concernée : pages utilisant `PageHero`
- Fichier source : `frontend/src/components/page-hero.tsx`
- Type de donnée : texte statique de composant, liens internes
- Contenu :
  - Bouton : `Inscription` vers `/inscription-candidat-libre`
  - Bouton : `Nous appeler` vers `/contact`
  - Titre bloc points : `Points clés`
  - Les `eyebrow`, `title`, `description` et `highlights` sont fournis par chaque page.

### CTA générique

- Page concernée : pages utilisant `CtaBanner`
- Fichier source : `frontend/src/components/cta-banner.tsx`
- Type de donnée : texte statique de composant, liens CTA
- Contenu :
  - Eyebrow : `Signature premium`
  - Les titres, descriptions et boutons sont fournis par chaque page.

### Robots et sitemap

- Page concernée : `/robots.txt`, `/sitemap.xml`
- Fichiers sources : `frontend/src/app/robots.ts`, `frontend/src/app/sitemap.ts`
- Type de donnée : métadonnée technique SEO
- Contenu :
  - Robots : user-agent `*`, allow `/`
  - Sitemap : `https://monbacfrancais.com/sitemap.xml`
  - Sitemap URLs : toutes les URLs issues de `navigationItems`
  - `changeFrequency` : `weekly` pour `/`, `monthly` pour les autres
  - `priority` : `1` pour `/`, `0.8` pour les autres

## Page `/`

### Métadonnées

- Fichier source : `frontend/src/app/page.tsx`
- Type de donnée : métadonnée SEO
- Contenu :
  - Title : `Bac Français candidat libre depuis l'étranger`
  - Description : `Bac français candidat libre : préparation bac français en ligne, bac français Tunisie et accompagnement pour les élèves à l'étranger.`
  - Keywords : `bac français candidat libre`, `bac français étranger`, `bac français tunisie`, `inscription bac français candidat libre`, `préparation bac français en ligne`
  - OpenGraph title : `Bac Français candidat libre depuis l'étranger`
  - OpenGraph description : `Préparation bac français en ligne et accompagnement des candidats libres en Tunisie et à l'étranger.`
  - OpenGraph URL : `/`
  - OpenGraph type : `website`
  - Canonical : `/`

### JSON-LD

- Fichier source : `frontend/src/app/page.tsx`
- Type de donnée : donnée structurée JSON-LD
- Contenu :
  - `@context` : `https://schema.org`
  - `@type` : `EducationalOrganization`
  - `name` : `Mon Bac Français`
  - `url` : `https://monbacfrancais.com`
  - `description` : `Plateforme dédiée aux élèves étrangers qui souhaitent passer le Bac Français en candidat libre.`
  - `areaServed` : `International`

### Hero accueil

- Fichier source : `frontend/src/components/hero-swiper.tsx`
- Type de donnée : texte statique, attributs alt, liens internes
- Contenu :
  - Slides :
    - `/img/Acceuil1.png`, alt `Slide accueil 1 Mon Bac Français`
    - `/img/Acceuil2.png`, alt `Slide accueil 2 Mon Bac Français`
    - Unsplash, alt `Élève en révision`
    - Unsplash, alt `Cours en salle de classe`
  - Badge : `Bac Français Candidat Libre`
  - H1 : `Passer le Bac Français en candidat libre depuis l'étranger`
  - Description : `Préparation bac français en ligne, accompagnement personnalisé et conseils pratiques pour sécuriser votre inscription et réussir vos épreuves.`
  - CTA primaire : `Commencer l'inscription` vers `/inscription-candidat-libre`
  - CTA secondaire : `Voir le guide` vers `/guide-bac-francais`
  - Services :
    - `Avantages du Bac Français` : `Reconnu mondialement, il facilite l'accès aux études supérieures en France et ailleurs.`
    - `Équipe Pédagogique` : `Des experts dans diverses matières assurent un encadrement solide vers la réussite.`
    - `Filières du Bac` : `Découvrez les différentes filières adaptées à votre profil et vos objectifs.`
    - `Étudier en France` : `Accédez à une éducation de qualité et préparez-vous à une carrière internationale.`

### Chiffres clés

- Fichier source : `frontend/src/data/site-content.ts`
- Type de donnée : contenu structuré
- Contenu :
  - `Parcours de préparation` : `3`
  - `Étapes d'inscription clarifiées` : `7`
  - `Objectif principal` : `100%`

### Trois rubriques principales

- Fichiers sources : `frontend/src/app/page.tsx`, `frontend/src/data/site-content.ts`
- Type de donnée : titres, descriptions, listes, liens internes
- Contenu :
  - Eyebrow : `Trois rubriques principales`
  - Titre : `Choisissez le parcours le plus adapté à votre situation`
  - Texte : `Le site met en avant les trois univers les plus importants pour capter le bon profil dès la page d'accueil et l'orienter vers la bonne page de conversion.`
  - Label récurrent : `Parcours premium`
  - Bouton récurrent : `Découvrir la rubrique`
  - Parcours `En ligne`, lien `/en-ligne` :
    - Description : `Une préparation à distance pensée pour les élèves expatriés qui veulent organiser leur Bac Français avec un accompagnement clair.`
    - Bullets : `Préparation flexible selon votre fuseau horaire`, `Ressources numériques et méthodologie d'examen`, `Suivi régulier sur les échéances et les dossiers`
  - Parcours `Tunisie`, lien `/tunisie` :
    - Description : `Un espace dédié aux familles et élèves en Tunisie avec des repères pratiques sur les centres, les démarches et le calendrier.`
    - Bullets : `Repères concrets pour les candidats installés en Tunisie`, `Aide sur la constitution du dossier d'inscription`, `Conseils logistiques pour anticiper les convocations`
  - Parcours `Autres pays`, lien `/autres-pays` :
    - Description : `Des conseils adaptés aux situations internationales pour identifier la bonne procédure selon votre pays de résidence.`
    - Bullets : `Orientation par zone géographique`, `Lecture simplifiée des démarches administratives`, `Feuille de route pour préparer votre examen sereinement`

### Manifeste visuel

- Fichiers sources : `frontend/src/app/page.tsx`, `frontend/src/data/site-content.ts`
- Type de donnée : texte statique, liste
- Contenu :
  - Eyebrow : `Manifeste visuel`
  - Titre : `Une identité plus premium, plus jeune et plus ambitieuse`
  - Texte : `La nouvelle template assume une présence éditoriale forte, des contrastes plus luxueux et une lecture plus fluide pour capter l'attention dès les premières secondes.`
  - Bénéfices :
    - `Un parcours clair pour comprendre les démarches du Bac Français à l'étranger`
    - `Un ton rassurant et professionnel pour aider les familles à passer à l'action`
    - `Des pages conçues pour transformer l'intérêt en prise de contact ou inscription`

### Parcours utilisateur

- Fichiers sources : `frontend/src/app/page.tsx`, `frontend/src/data/site-content.ts`
- Type de donnée : étapes structurées
- Contenu :
  - Eyebrow : `Parcours utilisateur`
  - Titre : `Comment l'expérience accompagne les candidats`
  - Étape 01 `Comprendre votre situation` : `Choisissez le parcours qui correspond à votre résidence : préparation en ligne, Tunisie ou autre pays.`
  - Étape 02 `Préparer le dossier` : `Accédez aux repères essentiels pour réunir les pièces, respecter les dates et éviter les erreurs administratives.`
  - Étape 03 `Avancer avec confiance` : `Recevez une méthode structurée pour planifier l'année, les épreuves et les démarches de candidat libre.`

### Actualités et contenu

- Fichiers sources : `frontend/src/app/page.tsx`, `frontend/src/data/site-content.ts`
- Type de donnée : textes statiques, cartes éditoriales, lien interne, contenu dynamique API
- Contenu :
  - Eyebrow : `Actualités et contenu`
  - Titre : `Des contenus SEO pour informer et rassurer`
  - Bouton : `Voir les actualités` vers `/actualites`
  - Articles statiques :
    - Catégorie `Guide pratique`, titre `Calendrier du Bac Français à l'étranger : les dates à surveiller`, extrait `Une synthèse des échéances essentielles pour éviter les oublis pendant l'inscription et la préparation.`
    - Catégorie `Inscription`, titre `Candidat libre : les erreurs de dossier les plus fréquentes`, extrait `Documents incomplets, mauvais choix d'académie, calendrier mal anticipé : les points à vérifier avant validation.`
    - Catégorie `Méthodologie`, titre `Réussir son organisation depuis l'étranger`, extrait `Méthodes, planning et priorités pour préparer le Bac Français avec une routine réaliste et efficace.`
  - Sidebar dynamique :
    - Titre : `Les dernières actualités`
    - Champs affichés depuis API `/actualites` : `categorie`, `publieLe` ou `createdAt`, `titre`, `resume` ou `contenu`
    - Lien détail : `/actualites/{id}`
    - Bouton : `Voir toutes les actualités`
    - Message vide : `Aucune actualité publiée pour le moment.`

### FAQ accueil

- Fichiers sources : `frontend/src/app/page.tsx`, `frontend/src/data/site-content.ts`
- Type de donnée : FAQ statique
- Contenu :
  - Eyebrow : `FAQ`
  - Titre : `Les réponses les plus utiles avant de se lancer`
  - Question : `À qui s'adresse la plateforme Mon Bac Français ?`
    - Réponse : `La plateforme s'adresse aux élèves étrangers, expatriés ou binationaux qui souhaitent préparer et passer le Bac Français en candidat libre depuis leur pays de résidence.`
  - Question : `Le site remplace-t-il l'inscription officielle ?`
    - Réponse : `Non. Le site a pour vocation d'expliquer, guider et accompagner les démarches. L'inscription officielle dépend toujours des organismes compétents et du calendrier en vigueur.`
  - Question : `Puis-je préparer tout mon parcours à distance ?`
    - Réponse : `Oui, une grande partie de la préparation peut être structurée à distance. Certaines démarches et épreuves dépendent ensuite du centre d'examen et du pays concerné.`

### CTA bas de page

- Fichier source : `frontend/src/app/page.tsx`
- Type de donnée : CTA, liens internes
- Contenu :
  - Titre : `Passez du projet au plan d'inscription`
  - Description : `Une présence web claire et premium pour guider les familles vers la bonne démarche et les encourager à prendre contact.`
  - CTA primaire : `Commencer maintenant` vers `/inscription-candidat-libre`
  - CTA secondaire : `Nous contacter` vers `/contact`

## Page `/en-ligne`

### Métadonnées

- Fichier source : `frontend/src/app/en-ligne/page.tsx`
- Type de donnée : métadonnée SEO
- Contenu :
  - Title : `Préparation bac français en ligne`
  - Description : `Préparation bac français en ligne pour candidats libres : cours en visioconférence, suivi pédagogique, examens blancs et inscription.`
  - Keywords : `préparation bac français en ligne`, `bac français candidat libre`, `inscription bac français candidat libre`, `bac français étranger`
  - OpenGraph title : `Préparation bac français en ligne`
  - OpenGraph description : `Accompagnement à distance pour préparer le bac français candidat libre depuis l'étranger.`
  - OpenGraph URL : `/en-ligne`
  - OpenGraph type : `article`
  - Canonical : `/en-ligne`

### Hero

- Fichier source : `frontend/src/app/en-ligne/page.tsx`
- Type de donnée : texte statique, liste
- Contenu :
  - Eyebrow : `Préparation à distance`
  - Title : `Passer le Bac Français en candidat libre à distance`
  - Description : `Une page dédiée au parcours en ligne pour comprendre le fonctionnement, découvrir l'accompagnement et s'inscrire facilement depuis l'étranger.`
  - Highlights : `Inscription 100% en ligne`, `Cours en visioconférence`, `Professeurs disponibles`, `Suivi pédagogique et examens blancs`

### Fonctionnement

- Fichier source : `frontend/src/app/en-ligne/page.tsx`
- Type de donnée : titres, texte statique, cartes structurées
- Contenu :
  - Eyebrow : `Comment cela fonctionne`
  - Titre : `Une préparation du Bac Français conçue pour l'enseignement à distance`
  - Texte : `La formule en ligne permet aux candidats libres de suivre un accompagnement complet sans dépendre d'un établissement local. L'objectif est de rendre la préparation accessible, lisible et performante depuis n'importe quel pays.`
  - `Fonctionnement clair` : `Le parcours est conçu pour les élèves de Première et Terminale qui souhaitent préparer le Bac Français à distance, avec une organisation simple, progressive et adaptée à la vie à l'étranger.`
  - `Inscription en ligne` : `L'entrée dans le programme se fait en ligne via un formulaire complet. Cela permet de comprendre rapidement votre profil, votre niveau et vos besoins avant de proposer un accompagnement adapté.`
  - `Professeurs disponibles` : `Les élèves bénéficient d'une équipe pédagogique disponible pour répondre aux questions, ajuster le rythme de travail et sécuriser les étapes importantes de la préparation.`

### Modules pédagogiques

- Fichier source : `frontend/src/app/en-ligne/page.tsx`
- Type de donnée : cartes structurées
- Contenu :
  - Label : `Accompagnement`
  - `Cours en visioconférence` : `Des séances à distance structurées pour travailler les notions, la méthode et la préparation aux épreuves dans un cadre interactif.`
  - `Suivi pédagogique` : `Un accompagnement régulier pour suivre la progression, identifier les points de blocage et maintenir une dynamique de travail constante.`
  - `Examens blancs` : `Des entraînements dans les conditions de l'examen pour évaluer le niveau, gagner en confiance et corriger les points faibles avant les épreuves officielles.`

### Parcours élève

- Fichier source : `frontend/src/app/en-ligne/page.tsx`
- Type de donnée : étapes structurées
- Contenu :
  - Eyebrow : `Parcours élève`
  - Titre : `Trois étapes pour démarrer sereinement`
  - Étape 01 `Vous candidatez en ligne` : `Vous complétez le formulaire avec vos informations scolaires, votre pays, votre ville et vos spécialités pour présenter votre situation.`
  - Étape 02 `Nous analysons votre profil` : `L'équipe pédagogique identifie vos objectifs, vos contraintes et le niveau d'accompagnement nécessaire pour construire un parcours cohérent.`
  - Étape 03 `Vous démarrez à distance` : `Les cours en visioconférence, le suivi pédagogique et les examens blancs s'articulent dans une organisation claire et rassurante.`

### Formulaire d'inscription en ligne

- Fichier source : `frontend/src/app/en-ligne/page.tsx`
- Type de donnée : libellés de formulaire, placeholders, option de sélection
- Contenu :
  - Eyebrow : `Inscription en ligne`
  - Titre : `Demandez votre accompagnement`
  - Badge : `Première / Terminale`
  - Champs :
    - `Nom`, placeholder `Votre nom complet`
    - `Email`, placeholder `vous@exemple.com`
    - `Pays`, placeholder `Votre pays`
    - `Ville`, placeholder `Votre ville`
    - `Classe`, options `Première`, `Terminale`
    - `Spécialités`, placeholder `Ex : Maths, SES, Physique`
    - `Message`, placeholder `Décrivez votre situation, vos objectifs et vos questions.`
  - Bouton : `Envoyer ma demande`

### Valeurs

- Fichier source : `frontend/src/app/en-ligne/page.tsx`
- Type de donnée : liste de textes
- Contenu :
  - `Une expérience 100% en ligne pensée pour les familles à l'international`
  - `Une méthode premium inspirée des meilleures plateformes éducatives`
  - `Une logique de conversion claire entre information, confiance et inscription`

### Galerie pédagogique

- Fichier source : `frontend/src/app/en-ligne/page.tsx`
- Type de donnée : titres, images externes, attributs alt
- Contenu :
  - Eyebrow : `Galerie pédagogique`
  - Titre : `Cours en ligne et accompagnement`
  - Images :
    - Unsplash, alt `Cours à distance sur ordinateur`
    - Unsplash, alt `Élèves en visioconférence`
    - Unsplash, alt `Professeur expliquant un cours`

### Disponibilité

- Fichier source : `frontend/src/app/en-ligne/page.tsx`
- Type de donnée : texte statique, lien interne
- Contenu :
  - Eyebrow : `Disponibilité et accompagnement`
  - Titre : `Une approche humaine derrière la plateforme`
  - Texte : `La disponibilité des professeurs, la régularité du suivi et les examens blancs permettent de transformer une préparation isolée en parcours structuré.`
  - Lien : `Poser une question` vers `/contact`

### CTA

- Fichier source : `frontend/src/app/en-ligne/page.tsx`
- Type de donnée : CTA, liens internes
- Contenu :
  - Hub title : `Liens utiles pour l'inscription candidat libre`
  - CTA title : `Préparez votre Bac Français à distance avec un cadre clair`
  - CTA description : `La page En ligne est pensée comme une landing page de conversion moderne, inspirée des plateformes éducatives premium.`
  - CTA primaire : `Contacter l'équipe` vers `/contact`
  - CTA secondaire : `Voir le guide` vers `/guide-bac-francais`

## Page `/tunisie`

### Métadonnées

- Fichier source : `frontend/src/app/tunisie/page.tsx`
- Type de donnée : métadonnée SEO
- Contenu :
  - Title : `Bac français Tunisie`
  - Description : `Bac français Tunisie : centres, accompagnement et inscription bac français candidat libre depuis la Tunisie.`
  - Keywords : `bac français tunisie`, `bac français candidat libre`, `inscription bac français candidat libre`, `préparation bac français en ligne`
  - OpenGraph title : `Bac français Tunisie`
  - OpenGraph description : `Toutes les informations pour préparer et passer le bac français candidat libre depuis la Tunisie.`
  - OpenGraph URL : `/tunisie`
  - OpenGraph type : `article`
  - Canonical : `/tunisie`

### Contenu principal centralisé

- Fichiers sources : `frontend/src/app/tunisie/page.tsx`, `frontend/src/data/site-content.ts`, `frontend/src/components/content-page.tsx`
- Type de donnée : contenu structuré de page, FAQ, statistiques
- Contenu :
  - Eyebrow : `Parcours localisé`
  - Title : `Passer le Bac Français en candidat libre depuis la Tunisie`
  - Description : `Une page dédiée aux élèves et familles en Tunisie pour mieux comprendre les centres, les délais et les démarches à anticiper.`
  - Highlights : `Repères administratifs localisés`, `Aide à la préparation du dossier`, `Vision claire des échéances`, `Conseils de logistique et d'organisation`
  - Stats :
    - `Zone` : `Tunisie`
    - `Focus` : `Démarches`
    - `Objectif` : `Clarté`
  - Sections :
    - `Comprendre l'environnement local` : `La page Tunisie centralise les informations utiles pour les familles qui veulent identifier le bon interlocuteur, préparer l'inscription et anticiper les modalités d'examen.`
    - `Anticiper les délais` : `Les candidats libres ont besoin d'un calendrier très lisible. Cette rubrique met l'accent sur l'ordre des démarches afin de réduire le stress et les oublis.`
    - `Sécuriser son parcours` : `En clarifiant les pièces à réunir et les points de vigilance, la plateforme aide à sécuriser l'inscription puis la préparation académique.`
  - FAQ : voir `commonFaqs` dans la page `/`.

### Contenu dynamique des agences tunisiennes

- Fichier source : `frontend/src/app/tunisie/page.tsx`
- Type de donnée : données dynamiques API, coordonnées, liens externes, textes conditionnels
- Source API : `${NEXT_PUBLIC_API_URL || http://localhost:4000/api}/agences?pays=Tunisie`
- Champs affichés :
  - `nom`, `type`, `pays`, `ville`, `adresse`, `telephone`, `email`, `siteWeb`, `facebook`, `logoUrl`, `description`, `verified`
  - Téléphones séparés par virgule, point-virgule ou slash.
- Libellés statiques :
  - `Centre partenaire - {type || ville || "Tunisie"}`
  - `S'inscrire`
  - `Site officiel`
  - `Facebook`
  - `Présentation du centre`
  - `Accompagnement Bac Français` ou `Préparation au Bac Français`
  - `Professeurs expérimentés` ou `Petits groupes`
  - `Examens blancs`
  - `Suivi des élèves` ou `Suivi personnalisé`
  - `Coordonnées`, `Adresse`, `Téléphones`, `Email`
  - `Liens et galerie`
  - `Présence web et aperçu du centre`
  - `Site officiel - {siteWeb sans protocole}`
  - `Facebook - {nom}`
- Lien spécial Smartech : si `siteWeb` contient `smartechacademy.com`, le bouton `S'inscrire` pointe vers `https://smartechacademy.com/inscription_bac_fr.html`
- Description fallback agence : `Un centre professionnel pour accompagner les candidats libres au Bac Français avec une approche structurée, humaine et orientée résultats.`
- Texte Smartech Mahdia :
  - `Smartech Academy Mahdia accueille les élèves avec un cadre de travail sérieux, des outils pédagogiques modernes et un suivi de proximité.`
- Texte Smartech Manouba :
  - `Smartech Academy Manouba propose un cadre sérieux et motivant, avec des ressources pédagogiques modernes et un accompagnement de proximité.`
  - `Le programme est pensé pour les candidats libres avec une méthode claire : progression, planification et entraînement ciblé.`
  - `Les séances en petits groupes favorisent l'interaction, la participation et une progression plus rapide.`
  - `Chaque élève bénéficie d'un suivi individisé pour ajuster le rythme, renforcer les points faibles et consolider les acquis.`
- Textes génériques agence :
  - `Accompagnement dédié aux candidats libres : méthodologie, planification, préparation des épreuves et organisation des révisions.`
  - `L'équipe pédagogique est composée de professeurs expérimentés pour encadrer chaque élève selon son niveau et ses objectifs.`
  - `Des examens blancs réguliers permettent d'évaluer la progression et d'habituer les élèves aux conditions réelles des épreuves.`
  - `Un suivi pédagogique individualisé est assuré pour maintenir la régularité et renforcer les points à améliorer.`

### Informations Smartech Academy

- Fichier source : `frontend/src/app/tunisie/page.tsx`
- Type de donnée : liste conditionnelle
- Condition : affichée si une agence contient `smartech`
- Contenu :
  - Eyebrow : `Informations Smartech Academy`
  - Titre : `Activités principales (source : site officiel)`
  - Activités :
    - `Soutien scolaire régulier du primaire au lycée`
    - `BAC Français avec enseignants qualifiés`
    - `Cours en ligne et ateliers informatiques`
    - `Préparation concours nationaux et diplômes internationaux (DELF, ICDL...)`

### Galerie Tunisie

- Fichier source : `frontend/src/components/tunisie-mini-slider.tsx`
- Type de donnée : texte statique, images, attributs alt
- Contenu :
  - Titre : `Galerie Tunisie`
  - Sous-titre : `Smartech Academy`
  - Slides :
    - `/img/Tunisie1.jpg`, alt `Tunisie - photo 1`
    - `/img/Tunisie2.jpg`, alt `Tunisie - photo 2`
    - `/img/Tunisie3.jpg`, alt `Tunisie - photo 3`

### CTA et hub

- Fichiers sources : `frontend/src/components/content-page.tsx`, `frontend/src/app/tunisie/page.tsx`
- Type de donnée : CTA, maillage interne
- Contenu :
  - CTA commun ContentPage :
    - Titre : `Transformez votre projet d'inscription en plan d'action concret`
    - Description : `Mon Bac Français aide les élèves étrangers à clarifier les démarches, structurer la préparation et avancer avec confiance.`
    - Primaire : `Contacter l'équipe` vers `/contact`
    - Secondaire : `Voir l'inscription` vers `/inscription-candidat-libre`
  - Hub title : `Poursuivre votre parcours bac français candidat libre`

## Page `/autres-pays`

### Métadonnées

- Fichier source : `frontend/src/app/autres-pays/page.tsx`
- Type de donnée : métadonnée SEO
- Contenu :
  - Title : `Bac français étranger`
  - Description : `Bac français étranger : inscription via Cyclades, préparation CNED, centres d'examen internationaux et accompagnement en ligne.`
  - Keywords : `bac français étranger`, `bac français candidat libre`, `inscription bac français candidat libre`, `préparation bac français en ligne`
  - OpenGraph title : `Bac français étranger`
  - OpenGraph description : `Guide pratique pour passer le bac français candidat libre depuis l'étranger.`
  - OpenGraph URL : `/autres-pays`
  - OpenGraph type : `article`
  - Canonical : `/autres-pays`

### Hero

- Fichier source : `frontend/src/app/autres-pays/page.tsx`
- Type de donnée : texte statique, liste
- Contenu :
  - Eyebrow : `Préparation internationale`
  - Title : `Passer le Bac Français en candidat libre depuis l'étranger`
  - Description : `Toutes les informations essentielles pour comprendre les démarches, choisir sa préparation et réussir le Bac Français depuis le Canada, le Maroc, le Qatar, les EAU et bien d'autres pays.`
  - Highlights : `Inscription officielle via Cyclades`, `Préparation avec le CNED ou en ligne`, `Centres d'examen dans plus de 130 pays`, `Accompagnement personnalisé à distance`

### Les 4 piliers

- Fichier source : `frontend/src/app/autres-pays/page.tsx`
- Type de donnée : section éditoriale, cartes structurées
- Contenu :
  - Eyebrow : `Comprendre le dispositif`
  - Titre : `Les 4 piliers pour passer le Bac depuis l'étranger`
  - Texte : `Que vous soyez au Canada, au Qatar ou en Italie, le parcours repose sur les mêmes fondamentaux : une inscription officielle, une préparation solide et un centre d'examen accessible.`
  - Pilier 01 `Inscription via Cyclades` : `La plateforme Cyclades est le portail officiel d'inscription aux examens de l'Éducation nationale. Depuis l'étranger, les candidats libres doivent créer un compte, sélectionner l'académie de rattachement et déposer leur dossier dans les délais fixés chaque année.`
  - Pilier 02 `Préparation avec le CNED` : `Le Centre National d'Enseignement à Distance (CNED) propose des formations réglementées et libres pour préparer le Bac Français. Il fournit des cours structurés, des devoirs corrigés et un suivi adapté aux élèves hors du territoire français.`
  - Pilier 03 `Centres d'examen internationaux` : `Les épreuves du Bac Français peuvent être passées dans des centres d'examen à l'étranger rattachés aux académies françaises. Chaque pays dispose de centres spécifiques, souvent hébergés dans des lycées français ou des institutions partenaires.`
  - Pilier 04 `Accompagnement en ligne` : `Des plateformes spécialisées comme Mon Bac Français offrent un accompagnement complémentaire : visioconférences, suivi pédagogique, examens blancs et conseils d'organisation pour réussir le Bac depuis n'importe quel pays.`

### Parcours candidat libre

- Fichier source : `frontend/src/app/autres-pays/page.tsx`
- Type de donnée : étapes structurées
- Contenu :
  - Eyebrow : `Parcours candidat libre`
  - Titre : `De l'inscription aux épreuves en 4 étapes`
  - Étape 01 `Vérifiez votre académie de rattachement` : `Chaque pays est rattaché à une académie française qui gère les inscriptions. Identifiez la vôtre pour ne pas manquer les délais.`
  - Étape 02 `Inscrivez-vous sur Cyclades` : `Créez votre compte, remplissez le dossier de candidature et téléchargez les pièces justificatives demandées avant la date limite.`
  - Étape 03 `Préparez-vous avec méthode` : `CNED, accompagnement en ligne ou préparation autonome : choisissez la formule adaptée et structurez votre année avec un planning réaliste.`
  - Étape 04 `Passez les épreuves dans votre centre` : `Présentez-vous au centre d'examen désigné avec votre convocation. Les épreuves écrites et orales sont organisées selon le calendrier officiel.`

### Informations par pays

- Fichier source : `frontend/src/app/autres-pays/page.tsx`
- Type de donnée : données structurées par pays, informations administratives
- Contenu :
  - Eyebrow : `Par pays`
  - Titre : `Informations spécifiques par zone géographique`
  - Texte : `Chaque pays a ses spécificités : académie de rattachement, centres d'examen disponibles et options de préparation. Retrouvez ci-dessous les repères essentiels pour chaque destination.`
  - Canada :
    - Académie : `Académie de rattachement : Nantes ou Bordeaux`
    - Centres : `Centres d'examen à Montréal, Ottawa et Toronto via le réseau des lycées français (Lycée Claudel, Lycée Marie-de-France).`
    - Notes : `Le CNED est accessible depuis le Canada. L'inscription via Cyclades doit être faite avant la date limite de l'académie de rattachement.`
  - Maroc :
    - Académie : `Académie de rattachement : Bordeaux`
    - Centres : `Nombreux centres d'examen à Casablanca, Rabat, Marrakech et Tanger via l'AEFE et les lycées français du réseau.`
    - Notes : `Le Maroc dispose d'un large réseau de lycées français. Les candidats libres hors de ces établissements suivent la procédure Cyclades.`
  - Algérie :
    - Académie : `Académie de rattachement : Aix-Marseille`
    - Centres : `Centres d'examen principalement à Alger (Lycée Alexandre-Dumas), Oran et Annaba.`
    - Notes : `L'inscription en candidat libre est possible. Le CNED peut compléter la préparation pour les élèves non scolarisés dans le réseau AEFE.`
  - Qatar :
    - Académie : `Académie de rattachement : Nantes`
    - Centres : `Centre d'examen à Doha via le Lycée Bonaparte et les établissements partenaires de l'AEFE.`
    - Notes : `Les candidats libres peuvent passer les épreuves dans la zone Golfe. Le calendrier peut varier selon le fuseau horaire et le centre affecté.`
  - Émirats Arabes Unis :
    - Académie : `Académie de rattachement : Nantes`
    - Centres : `Centres d'examen à Abu Dhabi (Lycée Louis-Massignon) et Dubaï (Lycée Français International Georges-Pompidou).`
    - Notes : `Forte communauté francophone aux EAU. L'accompagnement en ligne est particulièrement adapté pour compléter la préparation locale.`
  - Allemagne :
    - Académie : `Académie de rattachement : Strasbourg`
    - Centres : `Centres d'examen à Berlin, Munich, Francfort et Düsseldorf via les lycées français et les sections AbiBac.`
    - Notes : `L'Allemagne offre aussi le double diplôme AbiBac. Les candidats libres hors de ce dispositif suivent la voie Cyclades classique.`
  - Italie :
    - Académie : `Académie de rattachement : Nice ou Grenoble`
    - Centres : `Centres d'examen à Rome (Lycée Chateaubriand), Milan et Naples via le réseau AEFE.`
    - Notes : `L'Italie fait partie du dispositif EsaBac (double diplôme franco-italien), mais les candidats libres classiques peuvent également s'inscrire via Cyclades.`
  - Carte autre pays :
    - Titre : `Votre pays n'est pas listé ?`
    - Texte : `Contactez-nous pour obtenir les informations spécifiques à votre situation géographique.`
    - Lien : `Nous contacter` vers `/contact`

### CTA

- Fichier source : `frontend/src/app/autres-pays/page.tsx`
- Type de donnée : CTA, liens internes
- Contenu :
  - Hub title : `Pages à consulter pour réussir votre bac français candidat libre`
  - CTA title : `Préparez votre Bac Français depuis n'importe quel pays`
  - CTA description : `Mon Bac Français vous guide à chaque étape : inscription Cyclades, préparation CNED ou en ligne, et accompagnement jusqu'aux épreuves.`
  - CTA primaire : `Découvrir la préparation en ligne` vers `/en-ligne`
  - CTA secondaire : `Poser une question` vers `/contact`

## Page `/guide-bac-francais`

### Métadonnées

- Fichier source : `frontend/src/app/guide-bac-francais/page.tsx`
- Type de donnée : métadonnée SEO
- Contenu :
  - Title : `Guide bac français candidat libre`
  - Description : `Guide bac français candidat libre : voie générale, spécialités, matières, fonctionnement Première/Terminale, notes et coefficients.`
  - Keywords : `bac français candidat libre`, `guide bac français candidat libre`, `bac français étranger`, `préparation bac français en ligne`
  - OpenGraph title : `Guide bac français candidat libre`
  - OpenGraph description : `Explications claires sur les matières, spécialités et coefficients du bac français candidat libre.`
  - OpenGraph URL : `/guide-bac-francais`
  - OpenGraph type : `article`
  - Canonical : `/guide-bac-francais`

### Hero et sommaire

- Fichier source : `frontend/src/app/guide-bac-francais/page.tsx`
- Type de donnée : texte statique, ancres internes
- Contenu :
  - Eyebrow : `Guide pédagogique`
  - Title : `Guide du Bac Français (voie générale)`
  - Description : `Comprendre le Bac Français, les matières, les spécialités, le fonctionnement Première/Terminale, et la logique de notes et coefficients. Un guide clair, pensé pour les candidats libres et les familles à l'international.`
  - Highlights : `Voie générale : tronc commun + spécialités`, `Première / Terminale : étapes clés`, `Système de notes (40/60) et coefficients`, `Matières détaillées (Français, Philo, Grand Oral...)`
  - Sommaire :
    - `#bac-francais` : `Explication du Bac Français`
    - `#voie-generale` : `Voie générale`
    - `#premiere-terminale` : `Première / Terminale`
    - `#systeme-notes` : `Système de notes`
    - `#coefficients` : `Coefficients`
    - `#matieres` : `Matières (détails)`
  - Encadré :
    - Titre : `Bon réflexe`
    - Texte : `Les modalités et calendriers peuvent évoluer. Utilisez ce guide comme repère, puis vérifiez toujours les informations officielles au moment de votre inscription.`

### Sections pédagogiques

- Fichier source : `frontend/src/app/guide-bac-francais/page.tsx`
- Type de donnée : contenu pédagogique, tableaux, listes
- Contenu :
  - `Le Bac Français, en clair` : `Le Bac Français (baccalauréat) valide la fin du lycée. En voie générale, il combine un tronc commun, des spécialités choisies par l'élève, et des épreuves passées sur deux années : Première et Terminale.`
  - `Pour qui ?` : `Élèves scolarisés ou candidats libres (inscription officielle selon votre situation et votre académie de rattachement).`
  - `Ce qui compte` : `Des notes sur 20, une part de contrôle continu, des épreuves terminales, et des coefficients qui donnent plus de poids à certaines matières.`
  - `Tronc commun + spécialités` : `La voie générale s'organise autour de matières communes (Histoire-Géo, langues, enseignement scientifique, EPS, etc.) et de spécialités choisies. Les spécialités ont un poids déterminant dans la note finale.`
  - Cartes voie générale :
    - `Spécialités` : `Choix stratégique : elles orientent le niveau d'exigence et pèsent le plus dans la note finale.`
    - `Méthode` : `Une progression hebdomadaire, des entraînements type bac, et des bilans réguliers.`
    - `Candidat libre` : `Priorité : clarifier le parcours administratif et sécuriser la préparation (planning + entraînements).`
  - `Deux années, deux rythmes` :
    - Première : `Bases + épreuves anticipées`, `3 spécialités choisies`, `Français (écrit + oral) en fin d'année`, `Contrôle continu sur le tronc commun`
    - Terminale : `Spécialités + Philosophie + Grand Oral`, `2 spécialités conservées (épreuves terminales)`, `Philosophie (épreuve terminale)`, `Grand Oral (épreuve terminale)`
  - `La logique 40/60` : `La note finale du Bac général repose sur 40% de contrôle continu et 60% d'épreuves terminales. Les notes sont sur 20, puis pondérées par des coefficients.`
  - `Contrôle continu (40)` : `Moyennes annuelles (Première + Terminale) sur le tronc commun + la spécialité abandonnée après la Première.`
  - `Épreuves terminales (60)` : `Français (anticipé), Philosophie, Grand Oral et les deux spécialités conservées en Terminale.`
  - `Ce qui pèse le plus` : `Repères courants du Bac général : contrôle continu = 40 et épreuves terminales = 60. Les spécialités conservées concentrent une part très importante du total.`
  - Tableau coefficients :
    - `Épreuves terminales` / `Spécialité 1 (Terminale)` / `16`
    - `Épreuves terminales` / `Spécialité 2 (Terminale)` / `16`
    - `Épreuves terminales` / `Grand Oral` / `10`
    - `Épreuves terminales` / `Français (écrit + oral, Première)` / `10`
    - `Épreuves terminales` / `Philosophie` / `8`
    - `Contrôle continu` / `Tronc commun (Première + Terminale)` / `40 (total)`
  - Astuce coefficients : `Astuce : pour optimiser la préparation, commencez par sécuriser les spécialités (volume et méthode), puis structurez Français/Philo/Grand Oral, et enfin le tronc commun en contrôle continu.`

### Matières

- Fichier source : `frontend/src/app/guide-bac-francais/page.tsx`
- Type de donnée : fiches matières structurées
- Contenu :
  - Introduction : `Voici les repères essentiels pour comprendre chaque matière et construire une préparation efficace.`
  - `Français (Première)`, badge `Épreuves anticipées` :
    - Contenu : `En voie générale, le Français est évalué en fin de Première avec une épreuve écrite et une épreuve orale. La réussite repose sur la méthode (plans, analyses, citations) et la régularité (lectures, entraînements et corrections).`
    - Bullets : `Écrit + oral en fin de Première`, `Méthode : lecture, analyse, entraînement régulier`, `Objectif : maîtrise de l'argumentation et des œuvres`
  - `Philosophie (Terminale)`, badge `Épreuve terminale` :
    - Contenu : `La Philosophie est une épreuve terminale en Terminale. L'enjeu principal est de construire une réflexion structurée : problématique, arguments, exemples, et rédaction claire.`
    - Bullets : `Dissertation ou explication de texte`, `Méthode : problématiser, argumenter, illustrer`, `S'entraîner sur des sujets type bac`
  - `Histoire-Géographie`, badge `Contrôle continu` :
    - Contenu : `L'Histoire-Géographie est évaluée en contrôle continu. Pour progresser, privilégiez des fiches de repères, des entraînements à l'analyse de documents et une méthode solide pour les compositions.`
    - Bullets : `Moyennes de Première + Terminale`, `Méthode : repères, composition, analyse de documents`, `Travail régulier sur cartes et dates clés`
  - `Langues vivantes (LVA / LVB)`, badge `Contrôle continu` :
    - Contenu : `Les langues vivantes sont principalement évaluées via le contrôle continu. Les progrès les plus rapides viennent de routines courtes mais quotidiennes : compréhension (audio/texte) et expression (oral/écrit).`
    - Bullets : `Compréhension + expression (écrit/oral)`, `Routines : lecture, écoute, prise de parole`, `Objectif : aisance et précision`
  - `Grand Oral`, badge `Épreuve terminale` :
    - Contenu : `Le Grand Oral évalue votre capacité à présenter une question, argumenter, et dialoguer. Il se prépare comme une performance : contenu solide, structure, et entraînement régulier à l'oral.`
    - Bullets : `Deux questions préparées (liées aux spécialités)`, `Évaluer : clarté, argumentation, posture`, `S'entraîner à voix haute, avec timing`
  - `Spécialités (voie générale)`, badge `Coefficients majeurs` :
    - Contenu : `Les spécialités sont le cœur de la voie générale. En Première, vous choisissez 3 spécialités puis vous en conservez 2 en Terminale : ce sont elles qui ont les coefficients les plus importants à l'examen.`
    - Bullets : `3 spécialités en Première, 2 conservées en Terminale`, `Épreuves terminales sur les 2 spécialités gardées`, `La spécialité abandonnée pèse en contrôle continu`

### CTA

- Fichier source : `frontend/src/app/guide-bac-francais/page.tsx`
- Type de donnée : CTA, liens internes
- Contenu :
  - Hub title : `Continuer vers l'inscription et la préparation en ligne`
  - CTA title : `Vous préparez le Bac Français en candidat libre ?`
  - CTA description : `Nous pouvons vous aider à structurer l'année, clarifier les démarches, et organiser une préparation à distance (visioconférence, suivi, examens blancs).`
  - CTA primaire : `Découvrir la préparation en ligne` vers `/en-ligne`
  - CTA secondaire : `Poser une question` vers `/contact`

## Page `/inscription-candidat-libre`

### Métadonnées

- Fichier source : `frontend/src/app/inscription-candidat-libre/page.tsx`
- Type de donnée : métadonnée SEO
- Contenu :
  - Title : `Inscription bac français candidat libre`
  - Description : `Inscription bac français candidat libre : guide étape par étape avec Cyclades, documents nécessaires, dates importantes et centres d'examen.`
  - Keywords : `inscription bac français candidat libre`, `bac français candidat libre`, `bac français étranger`, `bac français tunisie`
  - OpenGraph title : `Inscription bac français candidat libre`
  - OpenGraph description : `Toutes les étapes pour s'inscrire au bac français candidat libre via Cyclades.`
  - OpenGraph URL : `/inscription-candidat-libre`
  - OpenGraph type : `article`
  - Canonical : `/inscription-candidat-libre`

### Contenu

- Fichier source : `frontend/src/app/inscription-candidat-libre/page.tsx`
- Type de donnée : guide, checklist, lien externe
- Contenu :
  - Hero eyebrow : `Inscription officielle`
  - Hero title : `Inscription Bac Français en candidat libre`
  - Hero description : `Un guide simple et clair pour s'inscrire correctement : qui peut candidater, quelles étapes suivre, comment utiliser Cyclades, quels documents fournir, et comment anticiper les dates et les centres d'examen.`
  - Highlights : `Processus expliqué étape par étape`, `Plateforme Cyclades`, `Documents, dates et centres d'examen`, `Guide visuel pour éviter les erreurs`
  - `1. Qui peut s'inscrire` / `Conditions d'éligibilité` :
    - `Élèves hors établissement scolaire français souhaitant passer le Bac en candidat libre`
    - `Élèves expatriés ou résidant à l'étranger rattachés à une académie française`
    - `Candidats qui remplissent les conditions administratives de leur académie de rattachement`
    - `Candidats capables de suivre une préparation autonome ou accompagnée à distance`
  - `2. Les étapes d'inscription` / `Processus complet` :
    - `Le plus sûr est d'avancer dans l'ordre : vérification de l'éligibilité, création du compte, dépôt des pièces, validation du dossier puis suivi des convocations.`
  - `3. Plateforme Cyclades` / `Portail officiel` :
    - `Cyclades centralise l'inscription et les convocations. Vérifiez toujours que votre académie de rattachement est correcte avant de valider.`
    - Lien externe : `Ouvrir Cyclades` vers `https://cyclades.education.gouv.fr/`
  - Timeline :
    - `Vérifier qui peut s'inscrire` : `Confirmez votre éligibilité : situation scolaire, pays de résidence et académie de rattachement.`
    - `Créer votre compte Cyclades` : `Accédez à la plateforme Cyclades, créez un compte candidat puis lancez votre inscription.`
    - `Renseigner votre dossier` : `Indiquez vos informations personnelles, vos spécialités et votre centre d'examen souhaité si demandé.`
    - `Déposer les documents nécessaires` : `Téléversez toutes les pièces demandées dans les délais pour éviter tout blocage du dossier.`
    - `Suivre les dates importantes` : `Respectez le calendrier académique : inscriptions, convocations et périodes d'épreuves.`
    - `Passer les épreuves au centre` : `Présentez-vous au centre d'examen indiqué sur la convocation avec les documents requis.`
  - Documents nécessaires :
    - `Pièce d'identité en cours de validité`
    - `Justificatif de domicile (ou de résidence à l'étranger)`
    - `Relevés de notes / certificats scolaires selon votre parcours`
    - `Choix des spécialités et informations sur la série (voie générale)`
    - `Pièces spécifiques demandées par votre académie sur Cyclades`
  - Dates importantes :
    - `Septembre - octobre` : `Ouverture habituelle des inscriptions sur Cyclades (selon académie).`
    - `Novembre - décembre` : `Clôture des inscriptions et vérification des pièces justificatives.`
    - `Mars - mai` : `Révisions intensives, convocations et préparation logistique.`
    - `Juin - juillet` : `Épreuves écrites, orales, Grand Oral et publication des résultats.`
  - Centres d'examen :
    - Titre : `Identifier le bon centre`
    - Texte : `Le centre d'examen dépend de votre académie et de votre pays de résidence. La convocation officielle reçue via Cyclades confirme le lieu exact des épreuves.`
    - Astuce : `Astuce : anticipez la logistique (déplacements, hébergement si nécessaire, pièces à présenter le jour J).`
  - Hub title : `Liens utiles avant de valider votre inscription`
  - CTA title : `Besoin d'aide pour finaliser votre inscription ?`
  - CTA description : `Nous vous aidons à vérifier votre dossier, anticiper les dates et préparer votre parcours candidat libre sans stress.`
  - CTA primaire : `Contacter l'équipe` vers `/contact`
  - CTA secondaire : `Voir le guide du Bac` vers `/guide-bac-francais`

## Page `/actualites`

### Métadonnées

- Fichier source : `frontend/src/app/actualites/page.tsx`
- Type de donnée : métadonnée SEO
- Contenu :
  - Title : `Actualités bac français candidat libre`
  - Description : `Actualités bac français candidat libre : calendrier du bac, dates examens, résultats, réformes et évolution des spécialités.`
  - Keywords : `bac français candidat libre`, `bac français étranger`, `préparation bac français en ligne`, `inscription bac français candidat libre`
  - OpenGraph title : `Actualités bac français candidat libre`
  - OpenGraph description : `Calendrier, examens, résultats et réformes du bac français pour les candidats libres.`
  - OpenGraph URL : `/actualites`
  - OpenGraph type : `article`
  - Canonical : `/actualites`

### Contenu statique et fallback

- Fichier source : `frontend/src/app/actualites/page.tsx`
- Type de donnée : contenu éditorial, liens externes, contenu dynamique API
- Contenu :
  - Hero eyebrow : `Magazine Bac Français`
  - Hero title : `Actualités Bac Français`
  - Hero description : `Un espace éditorial moderne pour suivre les informations essentielles : calendrier du bac, dates d'examens, résultats, réformes et évolution des spécialités.`
  - Highlights : `Calendrier et dates clés`, `Résultats et procédures`, `Réformes officielles`, `Veille sur les spécialités`
  - Section `À la une` :
    - Titre : `Le fil d'actualité du Bac Français`
    - Texte : `Retrouvez les informations clés, les dates importantes, les réformes et les décryptages officiels récoltés pour vous par notre équipe.`
  - Données dynamiques depuis API `/actualites` :
    - Champs : `id`, `titre`, `contenu`, `resume`, `sourceUrl`, `categorie`, `imageUrl`, `publieLe`, `createdAt`
    - Bouton carte : `Lire l'actualité`
    - Lien source : `Source d'origine ↗`
  - Fallback statique si aucune actualité :
    - `Calendrier du bac` : `Repérez les grandes étapes de l'année scolaire et les périodes à anticiper.`
    - `Dates examens` : `Retrouvez les fenêtres de passage des épreuves écrites, orales et Grand Oral.`
    - `Résultats` : `Comprenez les dates de publication et les étapes après les résultats.`
    - Bouton : `Lire`
  - Calendrier :
    - `Septembre - octobre` / `Ouverture des inscriptions` : `Début des inscriptions selon académie. Vérification des informations candidat et des pièces nécessaires.`
    - `Novembre - décembre` / `Clôture des candidatures` : `Finalisation des dossiers, contrôles administratifs et confirmation de l'inscription.`
    - `Mars - mai` / `Convocations et phase finale de préparation` : `Révisions intensives, entraînements ciblés et réception progressive des convocations.`
    - `Juin - juillet` / `Épreuves et résultats` : `Passage des examens, publication des résultats, puis rattrapages et démarches post-bac.`
  - `Dates examens` : `Les dates exactes sont publiées chaque année. Les convocations reçues via la plateforme officielle restent la référence finale pour votre planning.`
  - `Résultats` : `Résultats, éventuel oral de rattrapage et démarches post-bac : anticipez chaque étape pour éviter les délais de dernière minute.`
  - `Réformes` : `Programmes, modalités d'évaluation, organisation des épreuves : les réformes influencent la préparation. Une veille régulière est indispensable.`
  - Cartes réforme :
    - `Ajustements de programmes` : `Des ajustements peuvent intervenir selon les matières pour mieux aligner contenus et objectifs de compétences.`
    - `Modalités d'évaluation` : `L'équilibre entre contrôle continu et épreuves terminales reste central, avec des précisions publiées chaque année.`
    - `Organisation des épreuves` : `Les consignes d'organisation et les calendriers peuvent être adaptés selon le contexte national et international.`
  - Évolution des spécialités :
    - Introduction : `Les choix de spécialités évoluent selon les projets d'orientation et les attentes des formations supérieures. Voici des tendances observées.`
    - `Mathématiques / Physique-Chimie` : `Toujours très demandées` ; `Parcours cohérent pour les profils scientifiques et filières sélectives.`
    - `SES / HGGSP` : `Forte progression` ; `Combinaison appréciée pour les études en économie, sciences sociales et géopolitique.`
    - `LLCER / Humanités` : `Diversification des profils` ; `Choix valorisé pour les parcours littéraires, communication et relations internationales.`
  - Sources officielles :
    - `Le baccalauréat général (source officielle)` : `Présentation générale du diplôme, des épreuves terminales et des principes d'évaluation.`, lien `https://www.education.gouv.fr/reussir-au-lycee/le-baccalaureat-general-10457`, label `Consulter la page`
    - `Calendrier 2026 (Bac, Brevet, CAP, Parcoursup)` : `Référence officielle pour les grandes échéances de la session 2026.`, lien `https://www.education.gouv.fr/reussir-au-lycee/baccalaureat-brevet-cap-parcoursup-le-calendrier-2026-341384`, label `Voir le calendrier`
  - Repère 2026 : `les épreuves écrites de remplacement sont annoncées sur la période du lundi 7 au jeudi 10 septembre 2026 selon les sources officielles de calendrier.`
  - Hub title : `Explorer les pages clés du bac français candidat libre`
  - CTA title : `Recevez les prochaines actualités du Bac Français`
  - CTA description : `Restez à jour sur les dates, les résultats et les évolutions officielles pour préparer votre parcours candidat libre avec séeinité.`
  - CTA primaire : `Poser une question` vers `/contact`
  - CTA secondaire : `Voir le guide` vers `/guide-bac-francais`

## Page `/actualites/[id]`

- Fichier source : `frontend/src/app/actualites/[id]/page.tsx`
- Type de donnée : page dynamique API, métadonnées dynamiques, liens internes et externes
- Source API : `${NEXT_PUBLIC_API_URL || http://localhost:4000/api}/actualites/{id}`
- Champs affichés : `id`, `titre`, `contenu`, `resume`, `sourceUrl`, `categorie`, `imageUrl`, `publieLe`, `createdAt`
- Métadonnées :
  - Si article absent : title `Actualité non trouvée`
  - Si article présent : title `{article.titre} | MonBacFrançais`
  - Description : `article.resume` ou les 160 premiers caractères de `article.contenu`
- Contenu statique :
  - Lien retour : `← Retour aux actualités`
  - Date : `Publié le {date}`
  - Bloc points clés si un paragraphe commence par `📌`
  - Titre bloc : `Informations clés de cette actualité`
  - Bloc source :
    - Titre : `Envie d'en savoir plus ?`
    - Texte : `Consultez l'intégralité de cet article sur le site officiel de sa source.`
    - Bouton : `Lire l'article d'origine ↗`
  - Sidebar :
    - `À propos du site`
    - `MonBacFrançais vous propose des actualités sélectionnées et validées pour vous aider dans votre parcours de révisions et vos démarches pour le Bac de Français.`
    - `Candidat Libre ?`
    - `Accédez à nos guides spécialisés et nos fiches de révisions gratuites pour maximiser vos chances de réussite.`
    - Bouton : `Accéder au guide` vers `/guide-bac-francais`
  - Hub title : `Consultez également nos fiches thématiques`
  - CTA title : `Préparez votre Bac de Français avec sérénité`
  - CTA description : `Trouvez des réponses à toutes vos questions sur les coefficients, les épreuves et les œuvres au programme.`
  - CTA primaire : `Nous contacter` vers `/contact`
  - CTA secondaire : `Découvrir le guide` vers `/guide-bac-francais`

## Page `/contact`

### Métadonnées

- Fichier source : `frontend/src/app/contact/page.tsx`
- Type de donnée : métadonnée SEO
- Contenu :
  - Title : `Contact bac français candidat libre`
  - Description : `Contact bac français candidat libre : posez vos questions sur l'inscription, la préparation en ligne et les démarches depuis l'étranger.`
  - Keywords : `bac français candidat libre`, `inscription bac français candidat libre`, `préparation bac français en ligne`, `bac français étranger`
  - OpenGraph title : `Contact bac français candidat libre`
  - OpenGraph description : `Échangez avec Mon Bac Français pour préparer votre parcours candidat libre.`
  - OpenGraph URL : `/contact`
  - OpenGraph type : `website`
  - Canonical : `/contact`

### Contenu

- Fichier source : `frontend/src/app/contact/page.tsx`
- Type de donnée : texte statique, formulaire, CTA
- Contenu :
  - Hero eyebrow : `Prise de contact`
  - Hero title : `Échangez avec Mon Bac Français`
  - Hero description : `Une page contact premium pour rassurer les familles, capter les demandes qualifiées et encourager le passage à l'action.`
  - Highlights : `Formulaire simple et lisible`, `Message clair pour les familles`, `Approche professionnelle`, `CTA orienté conversion`
  - Formulaire :
    - Eyebrow : `Formulaire de contact`
    - `Nom complet`, placeholder `Votre nom`
    - `Adresse e-mail`, placeholder `vous@exemple.com`
    - `Pays de résidence`, placeholder `Tunisie, Maroc, Espagne...`
    - `Votre message`, placeholder `Décrivez votre situation, votre niveau et vos questions principales.`
    - Bouton : `Envoyer la demande`
  - Cartes :
    - Label commun : `Relation de confiance`
    - `Réponse personnalisée` : `Expliquez votre situation, votre pays de résidence et vos objectifs pour obtenir une orientation adaptée.`
    - `Parcours clarifié` : `Nous vous aidons à identifier la bonne rubrique et les prochaines étapes les plus utiles.`
    - `Accompagnement rassurant` : `Le site est conçu pour transformer une demande d'information en échange concret et professionnel.`
  - Hub title : `Pages à consulter avant de nous contacter`
  - CTA title : `Besoin d'un premier échange avant l'inscription ?`
  - CTA description : `Cette page est pensée pour convertir les visiteurs hésitants en demandes qualifiées avec un ton rassurant et premium.`
  - CTA primaire : `Voir l'inscription` vers `/inscription-candidat-libre`
  - CTA secondaire : `Explorer le guide` vers `/guide-bac-francais`

## Contenus centralisés non directement utilisés comme page complète

- Fichier source : `frontend/src/data/site-content.ts`
- Type de donnée : contenu structuré de pages génériques
- Contenu :
  - `pageContents.en-ligne` :
    - Eyebrow : `Préparation flexible`
    - Title : `Préparer le Bac Français en ligne depuis l'étranger`
    - Description : `Une solution pensée pour les candidats libres qui veulent avancer à leur rythme avec des repères fiables, une méthode claire et un accompagnement digital.`
    - Highlights : `Parcours 100% digital`, `Organisation compatible avec les fuseaux horaires`, `Méthodologie pour l'écrit et l'oral`, `Suivi des échéances administratives`
    - Stats : `Format`/`À distance`, `Approche`/`Guidée`, `Priorité`/`Autonomie`
    - Sections : `Une préparation structurée`, `Une méthode compatible avec l'international`, `Un accompagnement orienté résultats`
  - `pageContents.autres-pays` :
    - Eyebrow : `Accompagnement international`
    - Title : `Préparer son Bac Français depuis d'autres pays`
    - Description : `Des repères pour les candidats libres installés hors Tunisie : démarches, organisation et adaptation selon votre zone géographique.`
    - Highlights : `Approche adaptée à la diversité des pays`, `Méthode pour identifier la bonne procédure`, `Conseils pour coordonner démarches et préparation`, `Vision claire du parcours candidat libre`
    - Stats : `Couverture`/`Internationale`, `Approche`/`Pragmatique`, `Bénéfice`/`Sérénité`
  - `pageContents.guide-bac-francais` :
    - Eyebrow : `Guide complet`
    - Title : `Guide du Bac Français en candidat libre`
    - Description : `Une base claire pour comprendre les épreuves, le calendrier, l'organisation de l'année et les attentes académiques du Bac Français.`
    - Highlights : `Vue d'ensemble des épreuves`, `Repères de calendrier`, `Conseils de planification`, `Méthode de préparation progressive`
    - Stats : `Format`/`Guide`, `Usage`/`Référence`, `But`/`Compréhension`
  - `pageContents.inscription-candidat-libre` :
    - Eyebrow : `Étape décisive`
    - Title : `Réussir son inscription en candidat libre`
    - Description : `Une feuille de route pour préparer les documents, comprendre les délais et éviter les erreurs lors de l'inscription au Bac Français.`
    - Highlights : `Checklist des pièces utiles`, `Ordre logique des démarches`, `Conseils pour éviter les refus ou retards`, `Approche rassurante pour les familles`
    - Stats : `Niveau d'aide`/`Concret`, `Format`/`Checklist`, `Objectif`/`Validation`

## Données dynamiques backend

### Modèles de données

- Page concernée : `/tunisie`, `/actualites`, `/actualites/[id]`, pages admin
- Fichier source : `backend/prisma/schema.prisma`
- Type de donnée : modèle informationnel base de données
- Contenu :
  - `User` : `id`, `name`, `email`, `passwordHash`, `role`, `country`, `createdAt`, `updatedAt`
  - `Agence` : `id`, `nom`, `type`, `pays`, `ville`, `adresse`, `telephone`, `email`, `siteWeb`, `facebook`, `logoUrl`, `description`, `urlSource`, `source`, `scrapeDate`, `verified`, `relevanceScore`, `createdAt`, `updatedAt`
  - `Actualite` : `id`, `titre`, `contenu`, `resume`, `sourceUrl`, `categorie`, `imageUrl`, `publieLe`, `scrapeDate`, `status`, `authorId`, `createdAt`, `updatedAt`
  - Rôles : `ADMIN`, `USER`
  - Source agence : `MANUAL`, `SCRAPED`
  - Statut article : `DRAFT`, `PUBLISHED`

### Seed utilisateur admin

- Page concernée : administration
- Fichier source : `backend/src/config/seed.ts`
- Type de donnée : données initiales backend
- Contenu :
  - Nom : `Administrateur`
  - Email : `sioudranim@gmail.com`
  - Mot de passe seed : `MonBac2026!`
  - Rôle : `ADMIN`
  - Pays : `FR`
  - Log console : `Admin créé :`

### Seed actualités

- Page concernée : `/actualites`, `/actualites/[id]`, `/admin/actualites`
- Fichier source : `backend/src/config/seed_actualites.ts`
- Type de donnée : données initiales backend
- Contenu :
  - `Bac de français : décryptage des épreuves de l'oral`
    - Contenu : `Comment se déroule l'explication linéaire ? Comment réagir aux questions de l'entretien ? Nos coachs vous guident étape par étape pour assurer une note maximale.`
    - Résumé : `Conseils pratiques pour réussir son oral.`
    - Catégorie : `Cours`
    - Statut : `PUBLISHED`
    - Date : `2026-06-23`
  - `Les courants littéraires indispensables du bac`
    - Contenu : `Humanisme, Pléiade, Lumières, Romantisme, Réalisme... Le récapitulatif complet de tous les mouvements littéraires à mentionner dans vos copies.`
    - Résumé : `Fiche mémo sur les mouvements littéraires.`
    - Catégorie : `Cours`
    - Statut : `PUBLISHED`
    - Date : `2026-06-24`
  - `Session candidat libre 2026 : les centres à l'étranger`
    - Contenu : `Pour les candidats résidant en Tunisie, au Maroc, ou ailleurs : découvrez la liste des lycées français homologués faisant office de centres d'examen.`
    - Résumé : `Centres d'examen pour les candidats de l'étranger.`
    - Catégorie : `Infos`
    - Statut : `PUBLISHED`
    - Date : `2026-06-25`
  - `Dissertation de français : exemples de plans rédigés`
    - Contenu : `Consultez nos exemples rédigés sur les œuvres au programme. Apprenez à structurer une dissertation dialectique ou thématique en trois parties.`
    - Résumé : `Exemples concrets de plans de dissertation.`
    - Catégorie : `Méthodologie`
    - Statut : `PUBLISHED`
    - Date : `2026-06-26`
  - Log console : `Additional mock articles seeded successfully!`

## Administration

### `/admin/login`

- Fichier source : `frontend/src/app/admin/login/page.tsx`
- Type de donnée : libellés d'interface, formulaire, messages
- Contenu :
  - Marque : `MBF`
  - Titre : `Administration`
  - Sous-titre : `Espace réservé aux administrateurs`
  - Champs : `Adresse email`, `Mot de passe`
  - Placeholders : `admin@monbacfrancais.com`, `••••••••••`
  - Toggle mot de passe : `Masquer`, `Afficher`
  - Bouton : `Connexion Admin`
  - État chargement : `Connexion en cours…`
  - Erreur fallback : `Erreur de connexion`
  - Footer : `© {année} Mon Bac Français — Espace administration`

### Header admin

- Fichier source : `frontend/src/components/admin-header.tsx`
- Type de donnée : navigation admin, libellés
- Contenu :
  - Marque : `MBF`
  - Titre : `Administration`
  - Sous-titre : `Mon Bac Français`
  - Navigation :
    - `/admin/dashboard` : `Dashboard`
    - `/admin/agences` : `Agences`
    - `/admin/actualites` : `Actualités`
    - `/admin/utilisateurs` : `Utilisateurs`
    - `/admin/scraper` : `Scraper`
  - Lien externe interne : `Site` vers `/`
  - Bouton : `Déconnexion`

### `/admin/dashboard`

- Fichier source : `frontend/src/app/admin/dashboard/page.tsx`
- Type de donnée : textes admin, liens internes
- Contenu :
  - Eyebrow : `Bienvenue`
  - Titre : `Bonjour, {user.name}`
  - Texte : `Gérez les agences, les actualités et les utilisateurs depuis cet espace.`
  - Cartes :
    - `Agences` : `Gérer les agences partenaires et les résultats de scraping.`
    - `Actualités` : `Publier, modifier et gérer les articles et brouillons.`
    - `Utilisateurs` : `Gérer les comptes et les rôles des utilisateurs.`
    - `Scraper` : `Lancer le scraping automatique des agences et actualités.`

### `/admin/agences`

- Fichier source : `frontend/src/app/admin/agences/page.tsx`
- Type de donnée : CRUD admin, formulaire, messages de confirmation
- Contenu :
  - Titre : `Agences`
  - Compteur : `{n} agence(s) — {n} vérifiée(s)`
  - Bouton : `+ Nouvelle agence`
  - Modale : `Modifier l'agence` ou `Créer une agence`
  - Champs/placeholders : `Nom *`, `Type d'établissement (ex: Lycée, AEFE, etc.)`, `Pays *`, `Ville`, `Téléphone`, `Email`, `Site web officiel`, `Lien Facebook`, `Adresse complète`, `Logo de l'établissement`, `Description`
  - Aperçu : `Aperçu logo`, `Logo actuel`
  - Boutons : `Enregistrement…`, `Mettre à jour`, `Créer`, `Annuler`
  - Sélection : `Sélectionner tout`, `{n} sélectionnée(s)`, `Annuler la sélection`, `Supprimer la sélection`
  - Message vide : `Aucune agence enregistrée`
  - Badges : `✓ Vérifiée`, `Non vérifiée`, `SCRAPED`, `MANUAL`
  - Liens : `Site Officiel`, `Facebook`
  - Actions : `✓ Vérifier`, `Modifier`, `Supprimer`
  - Confirmations/erreurs : `Supprimer les {n} agences sélectionnées ?`, `Supprimer l'agence "{nom}" ?`, `Erreur lors de la suppression groupée`, `Erreur lors de l'enregistrement`, `Erreur lors de la vérification`, `Erreur lors de la suppression`

### `/admin/actualites`

- Fichier source : `frontend/src/app/admin/actualites/page.tsx`
- Type de donnée : CRUD admin actualités, formulaire, pagination
- Contenu :
  - Titre : `Actualités`
  - Compteur : `{n} article(s) — {n} publié(s), {n} brouillon(s)`
  - Filtres : `Tous`, `Publiés`, `Brouillons`
  - Bouton : `+ Nouvel article`
  - Sélection : `Sélectionner tout`, `{n} sélectionné(s)`, `Annuler la sélection`, `Supprimer les sélectionnés`
  - Modale : `Modifier l'article` ou `Créer un article`
  - Champs/placeholders : `Titre *`, `Catégorie`, `URL source`, `URL image`, `Résumé`, `Contenu complet *`
  - Boutons formulaire : `Annuler`, `Enregistrement…`, `Mettre à jour`, `Enregistrer brouillon`
  - Message vide : `Aucun article trouvé`
  - Badges/actions : `Publié`, `Brouillon`, `Scrapé`, `Source ↗`, `Publier`, `Retirer`, `Modifier`, `Supprimer`
  - Auteur fallback : `Système`
  - Pagination : `Affichage de {début} à {fin} sur {total} article(s)`, `Précédent`, `Suivant`
  - Confirmations/erreurs : `Supprimer les {n} articles sélectionnés ?`, `Supprimer l'article "{titre}" ?`, `Erreur lors de la suppression groupée`, `Erreur lors de l'enregistrement`, `Erreur lors de la publication`, `Erreur lors du retrait`, `Erreur lors de la suppression`

### `/admin/utilisateurs`

- Fichier source : `frontend/src/app/admin/utilisateurs/page.tsx`
- Type de donnée : tableau admin utilisateurs, actions
- Contenu :
  - Titre : `Utilisateurs`
  - Compteur : `{n} compte(s) enregistré(s)`
  - Message vide : `Aucun utilisateur trouvé`
  - Colonnes : `Nom`, `Email`, `Rôle`, `Pays`, `Inscrit le`, `Actions`
  - Pays fallback : `—`
  - Actions : `→ User`, `→ Admin`, `Supprimer`
  - Confirmations/erreurs : `Changer le rôle de {name} en {newRole} ?`, `Supprimer définitivement {name} ({email}) ?`, `Erreur lors du changement de rôle`, `Erreur lors de la suppression`

### `/admin/scraper`

- Fichier source : `frontend/src/app/admin/scraper/page.tsx`
- Type de donnée : interface admin, actions API, messages résultat
- Contenu :
  - Titre : `Scraper`
  - Description : `Lancer le scraping automatique pour importer du contenu externe`
  - `Scraping Agences` : `Importer les agences depuis les sources configurées. Les nouvelles agences sont marquées comme SCRAPED et non vérifiées.`
  - `Scraping Actualités` : `Importer les actualités depuis les sources configurées. Les nouveaux articles sont créés en BROUILLON pour validation manuelle.`
  - Bouton : `Lancer le scraping`
  - État : `Scraping en cours…`
  - Résultat : `{message}`, `Créé(s)`, `Mis à jour`, `Erreur(s)`
  - Erreurs fallback : `Erreur lors du scraping des agences`, `Erreur lors du scraping des actualités`
  - Conseil : `Conseil : Après chaque scraping, rendez-vous sur les pages Agences ou Actualités pour vérifier et publier le contenu importé.`

## Notes de contrôle après refonte

- Toute donnée SEO listée dans ce fichier doit être conservée ou volontairement modifiée avec validation.
- Les contenus dynamiques ne sont pas tous présents dans le code frontend : vérifier les champs API `Agence` et `Actualite`, ainsi que les seeds backend.
- Les textes de design ou de positionnement interne actuellement visibles comme `premium`, `template`, `conversion`, `Manifeste visuel`, `Signature premium` sont recensés parce qu'ils apparaissent dans l'interface actuelle ; ils peuvent être modifiés uniquement si la refonte prévoit aussi une réécriture éditoriale.
