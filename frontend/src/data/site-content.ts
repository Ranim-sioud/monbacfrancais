export type NavItem = {
  href: string;
  label: string;
};

export type Track = {
  title: string;
  href: string;
  description: string;
  bullets: string[];
};

export type InfoSection = {
  title: string;
  text: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type PageContent = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  stats: { label: string; value: string }[];
  sections: InfoSection[];
  faqs: FAQItem[];
};

export const siteUrl = "https://monbacfrancais.com";

export const navigationItems: NavItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/en-ligne", label: "En ligne" },
  { href: "/afrique", label: "Afrique" },
  { href: "/europe", label: "Europe" },
  { href: "/autres-pays", label: "Autres pays" },
  { href: "/guide-bac-francais", label: "Guide du Bac Français" },
  { href: "/inscription-candidat-libre", label: "Inscription candidat libre" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
];

export const primaryTracks: Track[] = [
  {
    title: "En ligne",
    href: "/en-ligne",
    description:
      "Une préparation à distance pensée pour les élèves expatriés qui veulent organiser leur Bac Français avec un accompagnement clair.",
    bullets: [
      "Préparation flexible selon votre fuseau horaire",
      "Ressources numériques et méthodologie d'examen",
      "Suivi régulier sur les échéances et les dossiers",
    ],
  },
  {
    title: "Afrique",
    href: "/afrique",
    description:
      "Un espace dédié aux familles et élèves en Afrique avec des repères pratiques sur les centres, les démarches et le calendrier.",
    bullets: [
      "Repères concrets pour les candidats installés en Afrique",
      "Aide sur la constitution du dossier d'inscription",
      "Conseils logistiques pour anticiper les convocations",
    ],
  },
  {
    title: "Europe",
    href: "/europe",
    description:
      "Un espace dédié aux familles et élèves en Europe avec des repères pratiques sur les centres, les démarches et le calendrier.",
    bullets: [
      "Repères concrets pour les candidats installés en Europe",
      "Aide sur la constitution du dossier d'inscription",
      "Conseils logistiques pour anticiper les convocations",
    ],
  },
  {
    title: "Autres pays",
    href: "/autres-pays",
    description:
      "Des conseils adaptés aux situations internationales pour identifier la bonne procédure selon votre pays de résidence.",
    bullets: [
      "Orientation par zone géographique",
      "Lecture simplifiée des démarches administratives",
      "Feuille de route pour préparer votre examen sereinement",
    ],
  },
];

export const keyFigures = [
  { label: "Parcours de préparation", value: "4" },
  { label: "Étapes d'inscription clarifiées", value: "7" },
  { label: "Objectif principal", value: "100%" },
];

export const homeBenefits = [
  "Un parcours clair pour comprendre les démarches du Bac Français à l'étranger",
  "Un ton rassurant et professionnel pour aider les familles à passer à l'action",
  "Des pages conçues pour transformer l'intérêt en prise de contact ou inscription",
];

export const roadmapSteps = [
  {
    title: "Comprendre votre situation",
    description:
      "Choisissez le parcours qui correspond à votre résidence : préparation en ligne, Afrique, Europe ou autre pays.",
  },
  {
    title: "Préparer le dossier",
    description:
      "Accédez aux repères essentiels pour réunir les pièces, respecter les dates et éviter les erreurs administratives.",
  },
  {
    title: "Avancer avec confiance",
    description:
      "Recevez une méthode structurée pour planifier l'année, les épreuves et les démarches de candidat libre.",
  },
];

export const featuredArticles = [
  {
    title: "Calendrier du Bac Français à l'étranger : les dates à surveiller",
    excerpt:
      "Une synthèse des échéances essentielles pour éviter les oublis pendant l'inscription et la préparation.",
    category: "Guide pratique",
  },
  {
    title: "Candidat libre : les erreurs de dossier les plus fréquentes",
    excerpt:
      "Documents incomplets, mauvais choix d'académie, calendrier mal anticipé : les points à vérifier avant validation.",
    category: "Inscription",
  },
  {
    title: "Réussir son organisation depuis l'étranger",
    excerpt:
      "Méthodes, planning et priorités pour préparer le Bac Français avec une routine réaliste et efficace.",
    category: "Méthodologie",
  },
];

export const commonFaqs: FAQItem[] = [
  {
    question: "À qui s'adresse la plateforme Mon Bac Français ?",
    answer:
      "La plateforme s'adresse aux élèves étrangers, expatriés ou binationaux qui souhaitent préparer et passer le Bac Français en candidat libre depuis leur pays de résidence.",
  },
  {
    question: "Le site remplace-t-il l'inscription officielle ?",
    answer:
      "Non. Le site a pour vocation d'expliquer, guider et accompagner les démarches. L'inscription officielle dépend toujours des organismes compétents et du calendrier en vigueur.",
  },
  {
    question: "Puis-je préparer tout mon parcours à distance ?",
    answer:
      "Oui, une grande partie de la préparation peut être structurée à distance. Certaines démarches et épreuves dépendent ensuite du centre d'examen et du pays concerné.",
  },
  {
    question: "Le bac obtenu en candidat libre a-t-il la même valeur ?",
    answer:
      "Oui, le diplôme est strictement identique. Il n'y a aucune mention 'candidat libre' figurant sur le parchemin. Le Bac obtenu en candidat libre a la même valeur que celui obtenu en étant scolarisé.",
  },
  {
    question: "Puis-je repasser uniquement les matières où j'ai échoué ?",
    answer:
      "Non. Il faut distinguer deux situations : le rattrapage (session en cours, accessible si la moyenne est entre 8 et 10/20, permet de repasser 2 matières maximum à l'oral) et le redoublement/nouvelle session complète (implique de repasser l'ensemble des épreuves).",
  },
];

export const pageContents: Record<string, PageContent> = {
  "en-ligne": {
    eyebrow: "Préparation flexible",
    title: "Préparer le Bac Français en ligne depuis l'étranger",
    description:
      "Une solution pensée pour les candidats libres qui veulent avancer à leur rythme avec des repères fiables, une méthode claire et un accompagnement digital.",
    highlights: [
      "Parcours 100% digital",
      "Organisation compatible avec les fuseaux horaires",
      "Méthodologie pour l'écrit et l'oral",
      "Suivi des échéances administratives",
    ],
    stats: [
      { label: "Format", value: "À distance" },
      { label: "Approche", value: "Guidée" },
      { label: "Priorité", value: "Autonomie" },
    ],
    sections: [
      {
        title: "Une préparation structurée",
        text: "Le parcours en ligne aide les élèves à planifier les révisions, comprendre les épreuves et bâtir une routine de travail efficace sans dépendre d'un établissement sur place.",
      },
      {
        title: "Une méthode compatible avec l'international",
        text: "Les contenus sont pensés pour les contraintes des familles à l'étranger : décalage horaire, calendrier différent, besoin d'autonomie et centralisation des informations.",
      },
      {
        title: "Un accompagnement orienté résultats",
        text: "L'objectif est d'éviter les zones floues, d'avancer étape par étape et de transformer une procédure souvent complexe en parcours accessible.",
      },
    ],
    faqs: commonFaqs,
  },
  tunisie: {
    eyebrow: "Parcours localisé",
    title: "Passer le Bac Français en candidat libre depuis la Tunisie",
    description:
      "Une page dédiée aux élèves et familles en Tunisie pour mieux comprendre les centres, les délais et les démarches à anticiper.",
    highlights: [
      "Repères administratifs localisés",
      "Aide à la préparation du dossier",
      "Vision claire des échéances",
      "Conseils de logistique et d'organisation",
    ],
    stats: [
      { label: "Zone", value: "Tunisie" },
      { label: "Focus", value: "Démarches" },
      { label: "Objectif", value: "Clarté" },
    ],
    sections: [
      {
        title: "Comprendre l'environnement local",
        text: "La page Tunisie centralise les informations utiles pour les familles qui veulent identifier le bon interlocuteur, préparer l'inscription et anticiper les modalités d'examen.",
      },
      {
        title: "Anticiper les délais",
        text: "Les candidats libres ont besoin d'un calendrier très lisible. Cette rubrique met l'accent sur l'ordre des démarches afin de réduire le stress et les oublis.",
      },
      {
        title: "Sécuriser son parcours",
        text: "En clarifiant les pièces à réunir et les points de vigilance, la plateforme aide à sécuriser l'inscription puis la préparation académique.",
      },
    ],
    faqs: commonFaqs,
  },
  afrique: {
    eyebrow: "Parcours localisé",
    title: "Passer le Bac Français en candidat libre depuis l'Afrique",
    description:
      "Une page dédiée aux élèves et familles en Afrique pour mieux comprendre les centres, les délais et les démarches à anticiper.",
    highlights: [
      "Repères administratifs localisés",
      "Aide à la préparation du dossier",
      "Vision claire des échéances",
      "Conseils de logistique et d'organisation",
    ],
    stats: [
      { label: "Zone", value: "Afrique" },
      { label: "Focus", value: "Démarches" },
      { label: "Objectif", value: "Clarté" },
    ],
    sections: [
      {
        title: "Comprendre l'environnement local",
        text: "La page Afrique centralise les informations utiles pour les familles qui veulent identifier le bon interlocuteur, préparer l'inscription et anticiper les modalités d'examen.",
      },
      {
        title: "Anticiper les délais",
        text: "Les candidats libres ont besoin d'un calendrier très lisible. Cette rubrique met l'accent sur l'ordre des démarches afin de réduire le stress et les oublis.",
      },
      {
        title: "Sécuriser son parcours",
        text: "En clarifiant les pièces à réunir et les points de vigilance, la plateforme aide à sécuriser l'inscription puis la préparation académique.",
      },
    ],
    faqs: commonFaqs,
  },
  europe: {
    eyebrow: "Parcours localisé",
    title: "Passer le Bac Français en candidat libre depuis l'Europe",
    description:
      "Une page dédiée aux élèves et familles en Europe pour mieux comprendre les centres, les délais et les démarches à anticiper.",
    highlights: [
      "Repères administratifs localisés",
      "Aide à la préparation du dossier",
      "Vision claire des échéances",
      "Conseils de logistique et d'organisation",
    ],
    stats: [
      { label: "Zone", value: "Europe" },
      { label: "Focus", value: "Démarches" },
      { label: "Objectif", value: "Clarté" },
    ],
    sections: [
      {
        title: "Comprendre l'environnement local",
        text: "La page Europe centralise les informations utiles pour les familles qui veulent identifier le bon interlocuteur, préparer l'inscription et anticiper les modalités d'examen.",
      },
      {
        title: "Anticiper les délais",
        text: "Les candidats libres ont besoin d'un calendrier très lisible. Cette rubrique met l'accent sur l'ordre des démarches afin de réduire le stress et les oublis.",
      },
      {
        title: "Sécuriser son parcours",
        text: "En clarifiant les pièces à réunir et les points de vigilance, la plateforme aide à sécuriser l'inscription puis la préparation académique.",
      },
    ],
    faqs: commonFaqs,
  },
  "autres-pays": {
    eyebrow: "Accompagnement international",
    title: "Préparer son Bac Français depuis d'autres pays",
    description:
      "Des repères pour les candidats libres installés hors Tunisie : démarches, organisation et adaptation selon votre zone géographique.",
    highlights: [
      "Approche adaptée à la diversité des pays",
      "Méthode pour identifier la bonne procédure",
      "Conseils pour coordonner démarches et préparation",
      "Vision claire du parcours candidat libre",
    ],
    stats: [
      { label: "Couverture", value: "Internationale" },
      { label: "Approche", value: "Pragmatique" },
      { label: "Bénéfice", value: "Sérénité" },
    ],
    sections: [
      {
        title: "Une lecture simplifiée des situations complexes",
        text: "Chaque pays peut présenter des modalités particulières. La rubrique Autres pays aide à structurer la recherche d'information et à prioriser les bonnes démarches.",
      },
      {
        title: "Préparer sans se disperser",
        text: "L'enjeu est de garder un cap clair entre administratif et révisions. Le contenu proposé aide à articuler ces deux dimensions avec méthode.",
      },
      {
        title: "Un parcours pensé pour les familles mobiles",
        text: "Que vous soyez expatrié, en mobilité ou hors réseau scolaire français, la plateforme vous aide à prendre les bonnes décisions au bon moment.",
      },
    ],
    faqs: commonFaqs,
  },
  "guide-bac-francais": {
    eyebrow: "Guide complet",
    title: "Guide du Bac Français en candidat libre",
    description:
      "Une base claire pour comprendre les épreuves, le calendrier, l'organisation de l'année et les attentes académiques du Bac Français.",
    highlights: [
      "Vue d'ensemble des épreuves",
      "Repères de calendrier",
      "Conseils de planification",
      "Méthode de préparation progressive",
    ],
    stats: [
      { label: "Format", value: "Guide" },
      { label: "Usage", value: "Référence" },
      { label: "But", value: "Compréhension" },
    ],
    sections: [
      {
        title: "Comprendre le cadre général",
        text: "Cette rubrique aide les candidats à visualiser l'ensemble du parcours : calendrier, matières, modalités d'évaluation et attentes principales.",
      },
      {
        title: "Structurer son année",
        text: "Le guide propose une logique de progression pour répartir les révisions, préparer les oraux et éviter l'accumulation de dernière minute.",
      },
      {
        title: "Mieux décider",
        text: "Avec une vision synthétique des étapes, l'élève et sa famille peuvent prendre des décisions plus sereines sur l'inscription, le rythme de travail et l'organisation globale.",
      },
    ],
    faqs: commonFaqs,
  },
  "inscription-candidat-libre": {
    eyebrow: "Étape décisive",
    title: "Réussir son inscription en candidat libre",
    description:
      "Une feuille de route pour préparer les documents, comprendre les délais et éviter les erreurs lors de l'inscription au Bac Français.",
    highlights: [
      "Checklist des pièces utiles",
      "Ordre logique des démarches",
      "Conseils pour éviter les refus ou retards",
      "Approche rassurante pour les familles",
    ],
    stats: [
      { label: "Niveau d'aide", value: "Concret" },
      { label: "Format", value: "Checklist" },
      { label: "Objectif", value: "Validation" },
    ],
    sections: [
      {
        title: "Préparer le dossier sans stress",
        text: "La page détaille les étapes clés pour constituer un dossier plus robuste, en mettant l'accent sur les oublis fréquents et les points de vigilance.",
      },
      {
        title: "Gagner en lisibilité",
        text: "L'inscription au Bac Français peut sembler complexe lorsqu'on vit à l'étranger. Cette rubrique transforme les informations dispersées en parcours lisible.",
      },
      {
        title: "Passer à l'action",
        text: "L'objectif est d'aider les familles à avancer rapidement, avec une logique orientée conversion : comprendre, vérifier, agir.",
      },
    ],
    faqs: commonFaqs,
  },
};
