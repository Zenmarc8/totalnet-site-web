# GUIDE DE RÉDACTION & D'INTÉGRATION DE CONTENU (CONTENT GUIDE)

Ce document s'adresse aux rédacteurs et aux intelligences artificielles (Claude, ChatGPT, etc.) appelées à ajouter ou enrichir des pages de services ou de villes dans le réseau TotalNet **sans modifier une seule ligne du code technique**.

---

## 1. Règle Fondamentale pour une Autre IA

> **Consigne à donner à l'IA :**
> « Rédige le contenu pour le service [Nom du service] ou la ville [Nom de la ville] sous forme d'objet TypeScript conforme à l'interface `ServiceItem` ou `LocationItem` définie dans `src/config/types.ts`. Ne modifie aucun composant React ni fichier de mise en page. »

Le moteur s'occupe automatiquement du rendu, des balises SEO, du schéma Schema.org, des breadcrumbs et des liens internes.

---

## 2. Ton & Style Éditorial au Québec

- **Français québécois naturel et rigoureux :** Utilisez le vocabulaire usuel au Québec (ex. « soumission » au lieu de « devis », « tapis mur à mur », « carpettes », « condo », « maison unifamiliale », « grand ménage », « dégât d’eau »).
- **Ton professionnel et rassurant :** L'entreprise doit projeter l'image d'une PME établie, digne de confiance et rigoureuse.
- **Transparence et crédibilité :**
  - **INTERDICTION** d'inventer des avis clients fictifs avec fausses étoiles ou faux noms.
  - **INTERDICTION** d'inventer des années d'expérience exagérées ou des affiliations trompeuses.
  - **INTERDICTION** de répéter artificiellement des mots-clés (bourrage / keyword stuffing).
  - Présentez les faits réels : équipements (camion-usine, filtres HEPA), assurance responsabilité civile (2 000 000 $), respect des normes CNESST et conformité à la Loi 25.

---

## 3. Modèle pour Ajouter un Nouveau Service (`src/config/services.config.ts`)

Pour ajouter un 21ᵉ service ou modifier un service existant, insérez un objet dans le tableau `servicesConfig` :

```typescript
{
  id: 'nom-du-service-slug',
  slug: 'nom-du-service-slug',
  name: 'Titre clair du service (H1)',
  shortDescription: '1 à 2 phrases percutantes résumant la prestation (affichées sur les cartes de la page d’accueil).',
  fullDescription: '2 à 3 paragraphes explicatifs détaillant la méthode de nettoyage, les bénéfices concrets et les résultats attendus.',
  category: 'residentiel' | 'commercial' | 'specialise' | 'sinistre' | 'exterieur',
  icon: 'Home' | 'Building2' | 'Layers' | 'Sun' | 'HardHat' | 'Flame', // Nom de l'icône Lucide
  imageUrl: 'https://images.unsplash.com/... (Image haute résolution)',
  imageAlt: 'Texte alternatif descriptif en français pour l’accessibilité et Google Images',
  isActive: true, // true pour afficher, false pour masquer
  isPopular: false,
  benefits: [
    'Bénéfice concret numéro 1 (ex. Détartrage en profondeur sans produits corrosifs)',
    'Bénéfice concret numéro 2',
    'Bénéfice concret numéro 3',
    'Bénéfice concret numéro 4'
  ],
  equipmentUsed: [
    'Extracteur à injection-extraction 500 PSI',
    'Produits certifiés ÉcoLogo biodégradables'
  ],
  propertyTypes: [
    'Maisons unifamiliales',
    'Condos',
    'Bureaux d’affaires'
  ],
  faqs: [
    {
      question: 'Question fréquente et réaliste posée par les clients ?',
      answer: 'Réponse concise, rassurante et précise (environ 2 à 4 phrases).'
    }
  ],
  estimatedStartingPrice: 'À partir de 150 $', // Optionnel
  priceNote: 'Selon la superficie et l’état des surfaces'
}
```

---

## 4. Modèle pour Ajouter une Nouvelle Ville (`src/config/locations.config.ts`)

Pour ajouter une nouvelle municipalité, insérez un objet dans le tableau `locationsConfig` :

```typescript
{
  id: 'nom-ville-slug',
  slug: 'nom-ville-slug',
  name: 'Nom officiel de la municipalité',
  region: 'Grand Montréal' | 'Laval' | 'Rive-Nord' | 'Rive-Sud' | 'Laurentides' | 'Lanaudière',
  postalPrefixes: ['J7B', 'J7C'], // Les 3 premiers caractères des codes postaux canadiens
  shortDescription: 'Description courte et distinctive pour la région.',
  fullDescription: 'Texte détaillé et unique sur les interventions dans cette ville. Évitez le copier-coller d’une autre ville ! Mentionnez les réalités locales (quartiers résidentiels, zones industrielles, types de bâtiments).',
  averageResponseTime: '24 heures (Urgences sous 2h)',
  isActive: true,
  isPrimaryHub: false,
  localPhone: '(450) 682-1990', // Numéro local si disponible
  featuredServices: [
    'nettoyage-de-tapis',
    'nettoyage-residentiel',
    'nettoyage-commercial'
  ],
  keyNeighborhoods: [
    'Nom de quartier 1',
    'Nom de quartier 2',
    'Nom de quartier 3'
  ]
}
```

---

## 5. Règles Anti-Slop & Qualité Visuelle

1. **Images :** Toujours fournir une image nette, de ratio 16:9 ou 4:3, montrant de vraies situations de nettoyage (tapis propres, techniciens en uniforme soigné, bureaux lumineux). Jamais d'images déformées ou d'illustrations clip-art bon marché.
2. **Textes alternatifs :** Décrivez précisément ce qui est visible (ex. « Équipe professionnelle TotalNet effectuant le lavage à l'eau chaude d'un tapis à Laval » plutôt que simplement « tapis »).
3. **Zéro terme d'agence :** Ne parlez pas de « synergie omnicanale » ou de « solutions 360 ». Utilisez des termes clairs de l'industrie québécoise de la propreté.
