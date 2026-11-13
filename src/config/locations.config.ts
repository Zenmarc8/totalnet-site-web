import { LocationItem } from './types';

export const locationsConfig: LocationItem[] = [
  {
    id: 'laval',
    slug: 'laval',
    name: 'Laval',
    region: 'Laval & Rive-Nord',
    postalPrefixes: ['H7A', 'H7B', 'H7C', 'H7E', 'H7G', 'H7H', 'H7J', 'H7K', 'H7L', 'H7M', 'H7N', 'H7P', 'H7R', 'H7S', 'H7T', 'H7V', 'H7W', 'H7X', 'H7Y'],
    shortDescription: 'Service de nettoyage complet résidentiel et commercial pour tous les quartiers de Laval.',
    fullDescription: 'Intervention rapide et professionnelle à travers toute l’île de Laval. Nos équipes mobiles sont basées localement afin d’assurer des délais de réponse records pour vos tapis, sofas, commerces et ménages résidentiels.',
    averageResponseTime: '24 heures (Urgences sous 2h)',
    isActive: true,
    isPrimaryHub: true,
    localPhone: '(450) 682-1990',
    featuredServices: [
      'nettoyage-de-tapis',
      'nettoyage-residentiel',
      'nettoyage-commercial',
      'nettoyage-de-meubles-rembourres',
      'nettoyage-apres-construction'
    ],
    keyNeighborhoods: [
      'Chomedey',
      'Laval-des-Rapides',
      'Sainte-Rose',
      'Duvernay',
      'Fabreville',
      'Vimont',
      'Laval-Ouest',
      'Auteuil',
      'Pont-Viau',
      'Sainte-Dorothée',
      'Saint-François',
      'Laval-sur-le-Lac'
    ]
  },
  {
    id: 'montreal',
    slug: 'montreal',
    name: 'Montréal',
    region: 'Grand Montréal',
    postalPrefixes: [
      'H1A', 'H1B', 'H1C', 'H1E', 'H1G', 'H1H', 'H1K', 'H1L', 'H1M', 'H1N', 'H1P', 'H1R', 'H1S', 'H1T', 'H1V', 'H1W', 'H1X', 'H1Y', 'H1Z',
      'H2A', 'H2B', 'H2C', 'H2E', 'H2G', 'H2H', 'H2J', 'H2K', 'H2L', 'H2M', 'H2N', 'H2P', 'H2R', 'H2S', 'H2T', 'H2V', 'H2W', 'H2X', 'H2Y', 'H2Z',
      'H3A', 'H3B', 'H3C', 'H3E', 'H3G', 'H3H', 'H3J', 'H3K', 'H3L', 'H3M', 'H3N', 'H3P', 'H3R', 'H3S', 'H3T', 'H3V', 'H3W', 'H3X', 'H3Y', 'H3Z',
      'H4A', 'H4B', 'H4C', 'H4E', 'H4G', 'H4H', 'H4J', 'H4K', 'H4L', 'H4M', 'H4N', 'H4P', 'H4R', 'H4S', 'H4T', 'H4V', 'H4W', 'H4X'
    ],
    shortDescription: 'Couverture complète des arrondissements de Montréal pour particuliers et gestionnaires d’immeubles.',
    fullDescription: 'Du centre-ville aux quartiers résidentiels, nous assurons des prestations de salubrité de haut calibre adaptées aux copropriétés, bureaux corporatifs, résidences unifamiliales et triplex montréalais.',
    averageResponseTime: '24 heures ouvrables',
    isActive: true,
    isPrimaryHub: true,
    localPhone: '(514) 875-1100',
    featuredServices: [
      'nettoyage-commercial',
      'entretien-dimmeubles',
      'nettoyage-de-tapis',
      'decapage-et-cirage-de-planchers',
      'nettoyage-residentiel'
    ],
    keyNeighborhoods: [
      'Ville-Marie / Centre-ville',
      'Plateau-Mont-Royal',
      'Rosemont–La Petite-Patrie',
      'Ahuntsic-Cartierville',
      'Côte-des-Neiges–Notre-Dame-de-Grâce',
      'Villeray–Saint-Michel–Parc-Extension',
      'Sud-Ouest & Griffintown',
      'Saint-Laurent',
      'Verdun',
      'Anjou',
      'Mercier–Hochelaga-Maisonneuve',
      'Outremont & Westmount'
    ]
  },
  {
    id: 'longueuil',
    slug: 'longueuil',
    name: 'Longueuil',
    region: 'Rive-Sud',
    postalPrefixes: ['J4G', 'J4H', 'J4J', 'J4K', 'J4L', 'J4M', 'J4N', 'J4P', 'J4R', 'J4S', 'J4T', 'J4V', 'J4W', 'J4X', 'J4Y', 'J4Z'],
    shortDescription: 'Entretien ménager et nettoyage de tapis et meubles sur toute la Rive-Sud de Montréal.',
    fullDescription: 'Service de proximité desservant les arrondissements du Vieux-Longueuil, Saint-Hubert et Greenfield Park. Équipes équipées pour le résidentiel comme pour les parcs industriels de la Rive-Sud.',
    averageResponseTime: '24 à 48 heures',
    isActive: true,
    localPhone: '(450) 674-8822',
    featuredServices: [
      'nettoyage-residentiel',
      'nettoyage-de-tapis',
      'nettoyage-de-meubles-rembourres',
      'nettoyage-commercial'
    ],
    keyNeighborhoods: [
      'Vieux-Longueuil',
      'Saint-Hubert',
      'Greenfield Park',
      'Parc industriel Roland-Therrien',
      'Zone aéroportuaire'
    ]
  },
  {
    id: 'terrebonne',
    slug: 'terrebonne',
    name: 'Terrebonne',
    region: 'Lanaudière & Rive-Nord',
    postalPrefixes: ['J6W', 'J6X', 'J6Y'],
    shortDescription: 'Nettoyage professionnel pour résidences, commerces et bâtiments neufs à Terrebonne.',
    fullDescription: 'Présents dans les secteurs de Lachenaie, La Plaine et Terrebonne centre. Une expertise éprouvée pour le nettoyage après construction, le lavage de vitres et le grand ménage saisonnier.',
    averageResponseTime: '24 à 48 heures',
    isActive: true,
    featuredServices: [
      'nettoyage-apres-construction',
      'nettoyage-residentiel',
      'nettoyage-de-vitres',
      'nettoyage-de-tapis'
    ],
    keyNeighborhoods: [
      'Vieux-Terrebonne',
      'Lachenaie',
      'La Plaine',
      'Carrefour des Fleurs'
    ]
  },
  {
    id: 'brossard',
    slug: 'brossard',
    name: 'Brossard',
    region: 'Rive-Sud',
    postalPrefixes: ['J4W', 'J4X', 'J4Y', 'J4Z'],
    shortDescription: 'Prestations de nettoyage haut de gamme pour résidences et commerces du secteur DIX30 et des environs.',
    fullDescription: 'Services rigoureux pour maisons unifamiliales, copropriétés de prestige et espaces commerciaux du Quartier DIX30 et du boulevard Taschereau.',
    averageResponseTime: '24 heures',
    isActive: true,
    featuredServices: [
      'nettoyage-residentiel',
      'nettoyage-de-tapis',
      'nettoyage-de-meubles-rembourres',
      'nettoyage-commercial'
    ],
    keyNeighborhoods: [
      'Quartier DIX30',
      'Secteurs A à T',
      'Secteur S (Solar Uniquartier)',
      'Brossard-sur-le-Parc'
    ]
  },
  {
    id: 'repentigny',
    slug: 'repentigny',
    name: 'Repentigny',
    region: 'Lanaudière',
    postalPrefixes: ['J5Y', 'J5Z', 'J6A'],
    shortDescription: 'Service d’entretien ménager et nettoyage de planchers et tapis pour Repentigny et Le Gardeur.',
    fullDescription: 'Intervention professionnelle pour familles, propriétaires et PME de Repentigny. Travail soigné et produits respectueux de l’environnement.',
    averageResponseTime: '24 à 48 heures',
    isActive: true,
    featuredServices: [
      'nettoyage-residentiel',
      'nettoyage-de-tapis',
      'lavage-a-pression'
    ],
    keyNeighborhoods: [
      'Repentigny centre',
      'Le Gardeur',
      'Valmont sur Parc',
      'Notre-Dame-des-Champs'
    ]
  },
  {
    id: 'blainville',
    slug: 'blainville',
    name: 'Blainville',
    region: 'Basses-Laurentides',
    postalPrefixes: ['J7B', 'J7C'],
    shortDescription: 'Nettoyage résidentiel et commercial certifié dans les Basses-Laurentides.',
    fullDescription: 'Des spécialistes à votre disposition pour le grand ménage des résidences, le lavage de tapis et l’entretien après rénovation à Blainville.',
    averageResponseTime: '24 heures',
    isActive: true,
    featuredServices: [
      'nettoyage-residentiel',
      'nettoyage-de-tapis',
      'nettoyage-apres-renovation'
    ],
    keyNeighborhoods: [
      'Chambéry',
      'Plan-Bouchard',
      'Fontainebleau',
      'Renaissance'
    ]
  },
  {
    id: 'saint-jerome',
    slug: 'saint-jerome',
    name: 'Saint-Jérôme',
    region: 'Laurentides',
    postalPrefixes: ['J7Y', 'J7Z'],
    shortDescription: 'Porte d’entrée des Laurentides : entretien commercial, institutions et résidences.',
    fullDescription: 'Équipes mobiles couvrant Saint-Jérôme, Bellefeuille, Lafontaine et Saint-Antoine. Solutions de salubrité pour cliniques, commerces et domiciles.',
    averageResponseTime: '24 à 48 heures',
    isActive: true,
    featuredServices: [
      'nettoyage-commercial',
      'nettoyage-de-tapis',
      'nettoyage-de-planchers'
    ],
    keyNeighborhoods: [
      'Centre-ville de Saint-Jérôme',
      'Bellefeuille',
      'Lafontaine',
      'Saint-Antoine'
    ]
  },
  {
    id: 'boucherville',
    slug: 'boucherville',
    name: 'Boucherville',
    region: 'Rive-Sud',
    postalPrefixes: ['J4B'],
    shortDescription: 'Nettoyage haut de gamme pour résidences du bord de l’eau et parcs industriels de Boucherville.',
    fullDescription: 'Expertise reconnue pour l’entretien ménager soigné, le nettoyage de meubles en cuir et velours, ainsi que la désinfection des installations corporatives.',
    averageResponseTime: '24 heures',
    isActive: true,
    featuredServices: [
      'nettoyage-residentiel',
      'nettoyage-de-meubles-rembourres',
      'nettoyage-industriel'
    ],
    keyNeighborhoods: [
      'Vieux-Boucherville',
      'Harmonie',
      'Parc industriel de Boucherville',
      'Quartier du Boisé'
    ]
  },
  {
    id: 'saint-jean-sur-richelieu',
    slug: 'saint-jean-sur-richelieu',
    name: 'Saint-Jean-sur-Richelieu',
    region: 'Montérégie',
    postalPrefixes: ['J2W', 'J2X', 'J3A', 'J3B'],
    shortDescription: 'Entretien résidentiel, commercial et nettoyage de tapis en Montérégie.',
    fullDescription: 'Couverture complète des secteurs Saint-Luc, Iberville et Saint-Jean. Devis gratuit et intervention rapide.',
    averageResponseTime: '48 heures',
    isActive: true,
    featuredServices: [
      'nettoyage-residentiel',
      'nettoyage-de-tapis',
      'nettoyage-commercial'
    ],
    keyNeighborhoods: [
      'Saint-Luc',
      'Iberville',
      'Saint-Jean centre',
      'Saint-Athanase'
    ]
  }
];

/**
 * Utility to check if a customer's postal code is in the served territory
 */
export function checkTerritoryCoverage(postalCode: string): {
  isCovered: boolean;
  matchedLocation?: LocationItem;
} {
  if (!postalCode) return { isCovered: false };
  const cleanPrefix = postalCode.replace(/\s+/g, '').slice(0, 3).toUpperCase();
  
  for (const location of locationsConfig) {
    if (!location.isActive) continue;
    if (location.postalPrefixes.includes(cleanPrefix)) {
      return { isCovered: true, matchedLocation: location };
    }
  }

  // Fallback heuristic: Any 'H' (Montréal/Laval) or 'J4'/'J6'/'J7' (Rive-Sud/Rive-Nord) is generally within greater region
  const firstLetter = cleanPrefix.charAt(0);
  if (firstLetter === 'H' || firstLetter === 'J') {
    return {
      isCovered: true,
      matchedLocation: locationsConfig[0]
    };
  }

  return { isCovered: false };
}
