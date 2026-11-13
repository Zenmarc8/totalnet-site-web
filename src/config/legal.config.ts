import { LegalConfig } from './types';

export const defaultLegalConfig: LegalConfig = {
  companyLegalName: 'TotalNet Services de Propreté Inc.',
  quebecEnterpriseNumber: '1178942365', // NEQ Québec exemple officiel
  privacyOfficer: {
    name: 'Marc-André Tremblay',
    title: 'Responsable de la protection des renseignements personnels (Loi 25)',
    email: 'confidentialite@totalnet-quebec.ca',
    phone: '(514) 875-1100 poste 104',
    address: '3200 Boulevard Saint-Martin Ouest, Suite 410, Laval (Québec) H7T 1A1'
  },
  law25Notice: 'Conformément à la Loi modernisant des dispositions législatives en matière de protection des renseignements personnels (Loi 25 du Québec), nous recueillons uniquement les renseignements nécessaires pour traiter votre demande de soumission et planifier le service.',
  dataRetentionMonths: 24, // Conservation maximale des devis sans suite (2 ans)
  incidentRegisterMaintained: true,
  cancellationPolicy: 'Toute annulation doit être transmise par écrit ou par téléphone au moins 24 heures ouvrables avant l’heure prévue de l’intervention.',
  insuranceCoverage: 'Police d’assurance responsabilité civile complète de 2 000 000 $ couvrant les biens sous notre garde.'
};
