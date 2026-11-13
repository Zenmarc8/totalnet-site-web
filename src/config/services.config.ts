import { ServiceItem } from './types';

export const servicesConfig: ServiceItem[] = [
  {
    id: 'nettoyage-residentiel',
    slug: 'nettoyage-residentiel',
    name: 'Nettoyage résidentiel complet',
    shortDescription: 'Entretien ménager en profondeur pour maisons, condos et appartements avec produits écoresponsables.',
    fullDescription: 'Service de nettoyage résidentiel minutieux adapté aux résidences québécoises. Nos équipes interviennent pour le grand ménage saisonnier, l’emménagement ou l’entretien complet des cuisines, salles de bain, chambres et aires de vie.',
    category: 'residentiel',
    icon: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Équipe effectuant un nettoyage résidentiel professionnel dans un salon propre',
    isActive: true,
    isPopular: true,
    benefits: [
      'Nettoyage désinfectant de cuisine et électroménagers',
      'Détartrage des salles de bain et douches vitrées',
      'Aspiration en profondeur et lavage des planchers',
      'Produits certifiés sans danger pour les enfants et animaux'
    ],
    equipmentUsed: ['Aspirateurs HEPA professionnels', 'Microfibres à code couleur', 'Vapeur sèche à haute température'],
    propertyTypes: ['Maison unifamiliale', 'Condo', 'Appartement', 'Maison de ville'],
    faqs: [
      {
        question: 'Fournissez-vous les produits et équipements de nettoyage ?',
        answer: 'Oui, nos professionnels arrivent équipés de tous les produits certifiés écologiques et du matériel industriel nécessaire.'
      },
      {
        question: 'Dois-je être présent pendant le service ?',
        answer: 'Votre présence n’est pas obligatoire. Vous pouvez nous accueillir au début ou prévoir un accès sécurisé convenu à l’avance.'
      }
    ],
    estimatedStartingPrice: 'À partir de 180 $',
    priceNote: 'Selon la superficie et le niveau de saleté'
  },
  {
    id: 'nettoyage-commercial',
    slug: 'nettoyage-commercial',
    name: 'Nettoyage commercial & bureaux',
    shortDescription: 'Entretien régulier ou ponctuel pour bureaux d’affaires, cliniques, commerces et espaces de travail.',
    fullDescription: 'Solutions de salubrité et de propreté commerciale conçues pour refléter l’image de rigueur de votre entreprise. Protocoles stricts de désinfection des postes de travail, aires communes, sanitaires et halls d’accueil.',
    category: 'commercial',
    icon: 'Building2',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Bureaux d’entreprise modernes et impeccablement entretenus',
    isActive: true,
    isPopular: true,
    benefits: [
      'Horaires flexibles : soirs, nuits ou fins de semaine',
      'Désinfection systématique des surfaces de contact',
      'Gestion complète des déchets et du recyclage',
      'Cahier des charges personnalisé selon vos normes'
    ],
    equipmentUsed: ['Chariots de conciergerie', 'Auto-laveuses compactes', 'Produits antibactériens homologués Santé Canada'],
    propertyTypes: ['Bureaux administratifs', 'Cliniques médicales', 'Boutiques', 'Espaces partagés (coworking)'],
    faqs: [
      {
        question: 'Pouvez-vous intervenir en dehors de nos heures d’ouverture ?',
        answer: 'Absolument. La majorité de nos contrats commerciaux sont exécutés le soir ou la nuit pour ne pas perturber vos opérations.'
      }
    ],
    estimatedStartingPrice: 'Soumission personnalisée sur mesure'
  },
  {
    id: 'entretien-menager-regulier',
    slug: 'entretien-menager-regulier',
    name: 'Entretien ménager régulier',
    shortDescription: 'Planification hebdomadaire, aux deux semaines ou mensuelle avec la même équipe dédiée.',
    fullDescription: 'Conservez un milieu de vie ou de travail impeccable toute l’année grâce à un forfait d’entretien récurrent. Contrôle de qualité rigoureux et constance garantie.',
    category: 'residentiel',
    icon: 'CalendarCheck',
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Entretien régulier méticuleux d’une résidence',
    isActive: true,
    benefits: [
      'Même équipe assignée pour une constance maximale',
      'Fréquence ajustable sans contrat à long terme contraignant',
      'Liste de contrôle détaillée à chaque passage'
    ],
    equipmentUsed: ['Aspirateurs silencieux', 'Matériel de désinfection écologique'],
    propertyTypes: ['Résidences', 'Condos', 'Petits cabinets professionnels'],
    faqs: [
      {
        question: 'Quelle est la fréquence la plus populaire ?',
        answer: 'Le service aux deux semaines (bimensuel) représente le choix privilégié de 70 % de nos clients réguliers.'
      }
    ]
  },
  {
    id: 'nettoyage-de-tapis',
    slug: 'nettoyage-de-tapis',
    name: 'Nettoyage de tapis à la vapeur',
    shortDescription: 'Extraction à l’eau chaude haute pression pour tapis mur à mur résidentiels et commerciaux.',
    fullDescription: 'Élimination en profondeur des acariens, allergènes, taches tenaces et odeurs incrustées dans les fibres de tapis. Notre équipement camion-usine et nos extracteurs portatifs garantissent un temps de séchage rapide.',
    category: 'specialise',
    icon: 'Layers',
    imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Appareil professionnel d’extraction vapeur nettoyant un tapis texturé',
    isActive: true,
    isPopular: true,
    benefits: [
      'Extraction haute température éliminant 99 % des bactéries',
      'Traitement ciblé antitaches : café, vin, graisse, encre',
      'Temps de séchage accéléré (4 à 6 heures)',
      'Neutralisation durable des odeurs d’animaux'
    ],
    equipmentUsed: ['Camion-usine haute puissance', 'Extracteur à injection-extraction 500 PSI', 'Brosses rotatives douces'],
    propertyTypes: ['Maisons', 'Condos', 'Bureaux corporatifs', 'Hôtels'],
    faqs: [
      {
        question: 'Combien de temps faut-il pour que le tapis sèche ?',
        answer: 'En moyenne entre 4 et 6 heures selon la ventilation et le taux d’humidité ambiant.'
      },
      {
        question: 'Le traitement retire-t-il les odeurs d’animaux de compagnie ?',
        answer: 'Oui, nous appliquons un traitement enzymatique spécifique qui neutralise l’acide urique à la racine de la fibre.'
      }
    ],
    estimatedStartingPrice: 'À partir de 120 $',
    priceNote: 'Pour une pièce standard (jusqu’à 200 pi²)'
  },
  {
    id: 'nettoyage-de-carpettes',
    slug: 'nettoyage-de-carpettes',
    name: 'Nettoyage de carpettes & tapis fins',
    shortDescription: 'Soin spécialisé pour carpettes délicates, orientales, en laine ou fibres synthétiques.',
    fullDescription: 'Traitement personnalisé selon la composition textile de vos carpettes (laine, soie, viscose, polypropylène). Lavage délicat préservant l’éclat des couleurs et l’intégrité des franges.',
    category: 'specialise',
    icon: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Nettoyage méticuleux d’une carpette d’art décorative',
    isActive: true,
    benefits: [
      'Test préalable de stabilité des teintures',
      'Nettoyage à plat avec produits au pH neutre',
      'Soin délicat des franges et bordures'
    ],
    equipmentUsed: ['Extracteurs basse pression contrôlée', 'Produits pH neutre laine certifiée'],
    propertyTypes: ['Résidentiel', 'Galeries', 'Salons de réception'],
    faqs: [
      {
        question: 'Pouvez-vous nettoyer une carpette sur place ?',
        answer: 'Oui, nous protégeons les planchers de bois environnants avec des toiles imperméables avant l’intervention.'
      }
    ]
  },
  {
    id: 'nettoyage-de-meubles-rembourres',
    slug: 'nettoyage-de-meubles-rembourres',
    name: 'Nettoyage de meubles rembourrés & canapés',
    shortDescription: 'Nettoyage vapeur et détachage de sofas, fauteuils, chaises de salle à manger et divans sectionnels.',
    fullDescription: 'Redonnez éclat et fraîcheur à votre mobilier rembourré. Nos techniciens qualifiés identifient le code textile (W, S, WS, X) afin d’appliquer la méthode exacte sans rétrécir ni décolorer les tissus.',
    category: 'specialise',
    icon: 'Armchair',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Sofa contemporain propre et revitalisé',
    isActive: true,
    isPopular: true,
    benefits: [
      'Élimination des acariens et de la transpiration incrustée',
      'Protection antitaches Teflon/Scotchgard en option',
      'Traitement sécuritaire pour tissus délicats et cuir'
    ],
    equipmentUsed: ['Buses manuelles en acier inoxydable', 'Vapeur basse humidité'],
    propertyTypes: ['Salons résidentiels', 'Salles d’attente médicales', 'Hôtellerie'],
    faqs: [
      {
        question: 'Nettoyez-vous également les meubles en cuir ?',
        answer: 'Oui, nous réalisons un nettoyage manuel doux suivi d’un traitement nourrissant pour prévenir les craquelures.'
      }
    ],
    estimatedStartingPrice: 'À partir de 110 $',
    priceNote: 'Pour un sofa 2 ou 3 places'
  },
  {
    id: 'nettoyage-de-matelas',
    slug: 'nettoyage-de-matelas',
    name: 'Désinfection & nettoyage de matelas',
    shortDescription: 'Assainissement vapeur haute température contre les acariens, squames et taches biologiques.',
    fullDescription: 'Un tiers de notre vie se passe au lit. Notre protocole d’assainissement de matelas détruit les colonies d’acariens et élimine les allergènes responsables de troubles respiratoires nocturnes.',
    category: 'specialise',
    icon: 'BedDouble',
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Chambre à coucher saine avec matelas nettoyé en profondeur',
    isActive: true,
    benefits: [
      'Destruction thermique des acariens et bactéries à 130°C',
      'Atténuation des cernes et auréoles de transpiration',
      'Séchage en moins de 3 heures'
    ],
    equipmentUsed: ['Générateur de vapeur sèche', 'Filtre HEPA anti-allergènes'],
    propertyTypes: ['Résidences', 'Résidences pour aînés', 'Auberges et chalets'],
    faqs: [
      {
        question: 'Le procédé traite-t-il les punaises de lit ?',
        answer: 'La vapeur à très haute température tue les punaises au contact, mais une infestation complète requiert une coordination avec un exterminateur certifié.'
      }
    ]
  },
  {
    id: 'nettoyage-de-planchers',
    slug: 'nettoyage-de-planchers',
    name: 'Nettoyage en profondeur des planchers',
    shortDescription: 'Lavage spécialisé des coulis de céramique, tuiles de vinyle, béton et planchers de bois.',
    fullDescription: 'Récupération de la couleur originale de vos joints de coulis et délogement des saletés emprisonnées dans les microporosités des tuiles et parquets.',
    category: 'specialise',
    icon: 'Grid',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Plancher de céramique poli et joints parfaitement nettoyés',
    isActive: true,
    benefits: [
      'Nettoyage haute pression rotative sans éclaboussures',
      'Restauration de la blancheur ou de la teinte initiale des joints',
      'Scellant protecteur pour coulis en option'
    ],
    equipmentUsed: ['Polisseuse orbitale', 'Outil Turbo-Force pour coulis', 'Aspirateur d’eau lourd'],
    propertyTypes: ['Cuisines résidentielles', 'Halls d’entrée', 'Restaurants', 'Cliniques'],
    faqs: [
      {
        question: 'Les joints noircis peuvent-ils retrouver leur éclat ?',
        answer: 'Oui, notre tête rotative sous pression dissout les huiles et saletés accumulées dans les joints poreux.'
      }
    ]
  },
  {
    id: 'decapage-et-cirage-de-planchers',
    slug: 'decapage-et-cirage-de-planchers',
    name: 'Décapage & cirage de planchers VCT',
    shortDescription: 'Remise à neuf, décapage chimique sécuritaire et application de 3 à 5 couches de cire lustrée.',
    fullDescription: 'Procédé commercial complet pour tuiles de vinyle composite (VCT). Retrait de la vieille cire jaunie, neutralisation du pH et application de cire à haute teneur en solides pour un fini miroir durable.',
    category: 'commercial',
    icon: 'ShieldCheck',
    imageUrl: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Plancher commercial VCT lustré avec reflet impeccable',
    isActive: true,
    benefits: [
      'Protection contre les marques de talons et éraflures',
      'Fini lustré effet mouillé améliorant la luminosité',
      'Cire antidérapante homologuée pour la sécurité des usagers'
    ],
    equipmentUsed: ['Polisseuse 175 RPM basse vitesse', 'Polisseuse haute vitesse Burnisher 2000 RPM', 'Cire 22% solides'],
    propertyTypes: ['Écoles', 'Épiceries', 'Pharmacies', 'Bureaux gouvernementaux'],
    faqs: [
      {
        question: 'Combien de couches de cire appliquez-vous ?',
        answer: 'Nous appliquons systématiquement un scellant d’adhésion suivi de 4 à 5 couches de finition protectrice.'
      }
    ]
  },
  {
    id: 'nettoyage-de-vitres',
    slug: 'nettoyage-de-vitres',
    name: 'Lavage de vitres intérieur & extérieur',
    shortDescription: 'Lavage professionnel sans traces pour fenêtres résidentielles, verrières et vitrines commerciales.',
    fullDescription: 'Laissez entrer la lumière grâce à notre méthode de lavage au racloir traditionnel et au système à l’eau pure déionisée. Nettoyage méticuleux des cadrages, rails et moustiquaires.',
    category: 'exterieur',
    icon: 'Sun',
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Vitres limpides avec vue extérieure dégagée',
    isActive: true,
    benefits: [
      'Résultat sans traces ni coulisses',
      'Nettoyage inclus des moustiquaires et rails',
      'Système à perches télescopiques atteignant jusqu’à 4 étages sans échafaudage'
    ],
    equipmentUsed: ['Perches en fibre de carbone', 'Système d’osmose inversée / eau pure', 'Raclures professionnelles Unger'],
    propertyTypes: ['Maisons à étages', 'Vitrines de magasins', 'Immeubles à condos'],
    faqs: [
      {
        question: 'Nettoyez-vous également les moustiquaires ?',
        answer: 'Oui, nous brossons et rinçons chaque moustiquaire avant de les réinstaller délicatement.'
      }
    ]
  },
  {
    id: 'nettoyage-apres-construction',
    slug: 'nettoyage-apres-construction',
    name: 'Nettoyage après construction',
    shortDescription: 'Dépoussiérage minutieux, élimination du plâtre, de la sciure et décapage des résidus de colle.',
    fullDescription: 'Le ménage final après travaux exige une rigueur extrême pour capter la poussière fine de gypse qui s’infiltre partout. Préparation clé en main avant livraison aux propriétaires ou locataires.',
    category: 'specialise',
    icon: 'HardHat',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Espace rénové avec finitions impeccables prêt pour occupation',
    isActive: true,
    isPopular: true,
    benefits: [
      'Captation intégrale de la poussière volatile de gypse',
      'Nettoyage intérieur/extérieur des armoires neuves',
      'Retrait des autocollants, rubans et résidus de silicone sur les vitres'
    ],
    equipmentUsed: ['Aspirateurs de chantier HEPA certifiés 99.97%', 'Épurateurs d’air à pression négative'],
    propertyTypes: ['Constructions neuves', 'Condos modèles', 'Bâtiments commerciaux'],
    faqs: [
      {
        question: 'En combien de phases intervenez-vous ?',
        answer: 'Nous pouvons effectuer un dégrossissage à mi-chantier suivi d’un nettoyage final de finition avant inspection.'
      }
    ],
    estimatedStartingPrice: 'Estimation personnalisée selon plans'
  },
  {
    id: 'nettoyage-apres-renovation',
    slug: 'nettoyage-apres-renovation',
    name: 'Nettoyage après rénovation résidentielle',
    shortDescription: 'Remise en état de vos pièces après travaux de cuisine, salle de bain ou agrandissement.',
    fullDescription: 'Après des semaines de rénovations, retrouvez le confort d’un domicile sain débarrassé de la sciure et des résidus de ponçage.',
    category: 'residentiel',
    icon: 'Hammer',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Cuisine fraîchement rénovée et brillante de propreté',
    isActive: true,
    benefits: [
      'Aspiration des conduits de ventilation et plinthes électriques',
      'Nettoyage en profondeur des luminaires et ventilateurs',
      'Protection des nouveaux matériaux installés'
    ],
    equipmentUsed: ['Aspirateurs avec pré-filtres cycloniques', 'Microfibres électrostatiques'],
    propertyTypes: ['Maisons', 'Condos rénovés', 'Chalets'],
    faqs: [
      {
        question: 'Faut-il nettoyer avant ou après la peinture finale ?',
        answer: 'Idéalement une fois toutes les couches de peinture et joints de coulis parfaitement secs.'
      }
    ]
  },
  {
    id: 'nettoyage-apres-sinistre',
    slug: 'nettoyage-apres-sinistre',
    name: 'Nettoyage après sinistre & urgence',
    shortDescription: 'Intervention d’urgence rapide suite à un incendie, refoulement d’égout ou contamination.',
    fullDescription: 'Intervention rapide et structurée pour limiter les dommages secondaires. Décontamination, neutralisation de la suie grasse et assainissement conforme aux critères des compagnies d’assurances québécoises.',
    category: 'sinistre',
    icon: 'Flame',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Technicien professionnel équipé pour la décontamination après sinistre',
    isActive: true,
    benefits: [
      'Intervention rapide sur appel d’urgence',
      'Dossier photographique complet pour votre assureur',
      'Décontamination certifiée des surfaces affectées'
    ],
    equipmentUsed: ['Éponges chimiques à suie', 'Nébulisateurs antimicrobiens', 'Ventilateurs axiaux de séchage'],
    propertyTypes: ['Bâtiments résidentiels', 'Commerces', 'Entrepôts'],
    faqs: [
      {
        question: 'Traitez-vous directement avec ma compagnie d’assurance ?',
        answer: 'Oui, nous fournissons les devis détaillés et rapports exigés par les experts en sinistre du Québec.'
      }
    ]
  },
  {
    id: 'nettoyage-apres-degat-deau',
    slug: 'nettoyage-apres-degat-deau',
    name: 'Assèchement & nettoyage après dégât d’eau',
    shortDescription: 'Extraction d’eau résiduelle, déshumidification industrielle et prévention contre les moisissures.',
    fullDescription: 'En cas de bris de tuyau ou de refoulement pluvial, chaque heure compte. Nos techniciens procèdent à l’extraction immédiate et au contrôle hygrométrique rigoureux pour éviter la prolifération fongique.',
    category: 'sinistre',
    icon: 'Droplets',
    imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Équipement d’assèchement industriel et déshumidificateurs professionnels',
    isActive: true,
    benefits: [
      'Mesures d’humidité non destructives par caméra thermique',
      'Extraction sous vide des tapis et sous-planchers',
      'Traitement préventif fongicide et antimicrobien'
    ],
    equipmentUsed: ['Déshumidificateurs LGR basse consommation', 'Ventilateurs turbo-sécheurs', 'Capteurs d’humidité Flir'],
    propertyTypes: ['Sous-sols résidentiels', 'Garages', 'Bureaux'],
    faqs: [
      {
        question: 'Pourquoi agir dans les premières 48 heures ?',
        answer: 'C’est le délai critique avant que les spores de moisissure ne commencent à coloniser les cloisons sèches et sous-planchers.'
      }
    ]
  },
  {
    id: 'nettoyage-des-odeurs',
    slug: 'nettoyage-des-odeurs',
    name: 'Neutralisation professionnelle des odeurs',
    shortDescription: 'Élimination durable des odeurs de fumée, tabac, cannabis, humidité ou animaux par traitement à l’ozone.',
    fullDescription: 'Nous ne masquons pas les odeurs avec des parfums artificiels : nous détruisons les molécules olfactives à leur source grâce au choc thermique et à la photocatalyse/ozone sécurisée.',
    category: 'specialise',
    icon: 'Wind',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Air pur et ambiance saine dans un intérieur traité',
    isActive: true,
    benefits: [
      'Destruction moléculaire définitive sans parfum de masquage',
      'Efficace contre la fumée de cigarette, cannabis et odeurs d’animaux',
      'Protocole sécurisé avec contrôle de réintégration des lieux'
    ],
    equipmentUsed: ['Générateurs d’ozone industriels', 'Appareils de brumisation thermique thermo-fogger'],
    propertyTypes: ['Logements locatifs', 'Véhicules', 'Condos', 'Chambres d’hôtel'],
    faqs: [
      {
        question: 'Faut-il quitter les lieux pendant le traitement ?',
        answer: 'Oui, les personnes et les animaux doivent évacuer pendant la durée du traitement à l’ozone et l’aération subséquente.'
      }
    ]
  },
  {
    id: 'nettoyage-specialise',
    slug: 'nettoyage-specialise',
    name: 'Nettoyage technique & spécialisé',
    shortDescription: 'Interventions sur mesure pour situations complexes, encombrements majeurs et espaces confinés.',
    fullDescription: 'Protocoles adaptés pour les cas exigeant une discrétion absolue, des équipements de protection individuelle de niveau supérieur ou des désinfections de pointe.',
    category: 'specialise',
    icon: 'Wrench',
    imageUrl: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Nettoyage technique approfondi avec équipement spécialisé',
    isActive: true,
    benefits: [
      'Discrétion totale et véhicules non identifiés sur demande',
      'Respect strict des normes CNESST de sécurité',
      'Évacuation et tri écologique des encombrants'
    ],
    equipmentUsed: ['EPI intégraux avec masques P100', 'Brumisateurs électrostatiques'],
    propertyTypes: ['Résidences spécifiques', 'Archives', 'Locaux techniques'],
    faqs: [
      {
        question: 'Intervenez-vous avec discrétion ?',
        answer: 'Oui, notre équipe sait faire preuve d’une réserve absolue et s’adapte aux demandes de confidentialité.'
      }
    ]
  },
  {
    id: 'lavage-a-pression',
    slug: 'lavage-a-pression',
    name: 'Lavage à pression haute performance',
    shortDescription: 'Décapage et nettoyage à haute pression pour pavé uni, allées d’asphalte, béton et parements extérieurs.',
    fullDescription: 'Éliminez la mousse, le lichen, les taches d’huile tenaces et les dépôts de pollution sur vos surfaces extérieures. Ajout de sable polymère protecteur pour pavé uni disponible.',
    category: 'exterieur',
    icon: 'Waves',
    imageUrl: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Nettoyage à jet haute pression sur un dallage extérieur',
    isActive: true,
    benefits: [
      'Restauration spectaculaire du pavé uni et murets',
      'Élimination sécuritaire des moisissures sur vinyle et brique',
      'Pression variable ajustée pour ne pas endommager les matériaux'
    ],
    equipmentUsed: ['Nettoyeur à pression eau chaude 4000 PSI', 'Nettoyeur rotatif de surface'],
    propertyTypes: ['Entrées de garage', 'Terrasses et patios', 'Façades commerciales'],
    faqs: [
      {
        question: 'Le jet risque-t-il d’endommager le crépi ou le bois ?',
        answer: 'Non, nous employons le procédé « soft wash » à basse pression combiné à des agents dégraissants doux pour les surfaces fragiles.'
      }
    ]
  },
  {
    id: 'nettoyage-exterieur',
    slug: 'nettoyage-exterieur',
    name: 'Nettoyage extérieur global',
    shortDescription: 'Entretien saisonnier extérieur : gouttières, soffites, patios et mobilier de jardin.',
    fullDescription: 'Préparez votre propriété pour le printemps ou l’hiver québécois. Vidange complète des gouttières, déblocage des descentes pluviales et lavage des contours extérieurs.',
    category: 'exterieur',
    icon: 'TreePine',
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Propriété résidentielle avec aménagement et gouttières bien entretenus',
    isActive: true,
    benefits: [
      'Prévention des infiltrations d’eau par les gouttières obstruées',
      'Lavage des soffites et fascias sans abîmer les joints',
      'Évacuation responsable des débris organiques'
    ],
    equipmentUsed: ['Aspirateur de gouttières avec caméra de contrôle', 'Échelles stabilisées avec protecteurs de corniche'],
    propertyTypes: ['Maisons unifamiliales', 'Duplex/Triplex', 'Immeubles à condos'],
    faqs: [
      {
        question: 'À quelle fréquence doit-on vider les gouttières ?',
        answer: 'Deux fois par an : à la fin du printemps après la floraison des arbres, et à la fin de l’automne après la chute des feuilles.'
      }
    ]
  },
  {
    id: 'entretien-dimmeubles',
    slug: 'entretien-dimmeubles',
    name: 'Entretien d’immeubles & syndicats de copropriété',
    shortDescription: 'Conciergerie et gestion de la propreté des aires communes pour copropriétés et édifices multilocatifs.',
    fullDescription: 'Partenaire fiable des gestionnaires d’immeubles et conseils d’administration de copropriétés. Entretien régulier des vestibules, cages d’escaliers, ascenseurs, corridors et locaux à rebuts.',
    category: 'commercial',
    icon: 'Building',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Corridor d’immeuble à logements moderne et bien entretenu',
    isActive: true,
    benefits: [
      'Visites planifiées avec registre de contrôle sur place',
      'Désinfection des poignées de portes, boutons d’ascenseurs et interphones',
      'Nettoyage et désodorisation des chutes à déchets et salles de poubelles'
    ],
    equipmentUsed: ['Équipement ergonomique silencieux', 'Produits concentrés certifiés ÉcoLogo'],
    propertyTypes: ['Immeubles de 4 à 200+ unités', 'Tours à condos', 'Résidences étudiantes'],
    faqs: [
      {
        question: 'Offrez-vous des rapports mensuels pour le conseil d’administration ?',
        answer: 'Oui, nous pouvons vous transmettre un compte-rendu numérique périodique confirmant les interventions et signalant les anomalies.'
      }
    ]
  },
  {
    id: 'nettoyage-industriel',
    slug: 'nettoyage-industriel',
    name: 'Nettoyage industriel & entrepôts',
    shortDescription: 'Dégraissage lourd, nettoyage de dalles de béton et dépoussiérage de structures en hauteur.',
    fullDescription: 'Solutions de nettoyage pour usines, centres de distribution et ateliers de fabrication. Nos équipes certifiées respectent les directives strictes de sécurité au travail et d’hygiène industrielle.',
    category: 'commercial',
    icon: 'Factory',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Grand entrepôt industriel avec planchers dégagés et propres',
    isActive: true,
    benefits: [
      'Balayage et récurage automatisé de grandes superficies au sol',
      'Dépoussiérage des conduits aériens et poutres métalliques',
      'Dégraissage écologique des postes de production'
    ],
    equipmentUsed: ['Auto-laveuses autoportées industrielles', 'Nacelles élévatrices homologuées CNESST'],
    propertyTypes: ['Entrepôts logistiques', 'Usines de transformation', 'Hangars et ateliers'],
    faqs: [
      {
        question: 'Vos techniciens possèdent-ils les cartes de sécurité pour nacelles élévatrices ?',
        answer: 'Oui, nos opérateurs sont formés et certifiés pour le travail en hauteur conformément aux normes de la CNESST.'
      }
    ],
    estimatedStartingPrice: 'Estimation personnalisée sur visite technique'
  }
];
