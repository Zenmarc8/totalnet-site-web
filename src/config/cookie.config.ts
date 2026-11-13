import { CookieConfig } from './types';

export const defaultCookieConfig: CookieConfig = {
  consentVersion: '2026.1-Loi25',
  validityDays: 395, // ~13 mois selon la réglementation québécoise
  categories: [
    {
      id: 'essential',
      label: 'Témoins strictement nécessaires (Essentiels)',
      description: 'Ces témoins garantissent le fonctionnement de base du site, la mémorisation de votre progression dans le formulaire de soumission et la sécurité du serveur. Ils ne peuvent pas être désactivés.',
      required: true,
      defaultState: true
    },
    {
      id: 'analytics',
      label: 'Témoins analytiques & mesure d’audience',
      description: 'Nous permettent d’analyser le volume de visites et les pages les plus consultées de manière anonyme afin d’optimiser l’expérience utilisateur.',
      required: false,
      defaultState: false // Désactivé par défaut selon la Loi 25
    },
    {
      id: 'performance',
      label: 'Témoins de performance & préférences',
      description: 'Mémorisent vos préférences de navigation (ville préférée, taille de police) pour faciliter vos futures consultations.',
      required: false,
      defaultState: false
    },
    {
      id: 'marketing',
      label: 'Témoins publicitaires & réseaux sociaux',
      description: 'Utilisés pour mesurer la pertinence de nos campagnes de référencement payant (Google Ads) et vous proposer des offres adaptées sur d’autres plateformes.',
      required: false,
      defaultState: false
    }
  ]
};
