import { ContactConfig } from './types';

export const defaultContactConfig: ContactConfig = {
  phoneDisplay: '(514) 875-1100',
  phoneRaw: '+15148751100',
  emergencyPhone: '(450) 682-1990',
  email: 'contact@totalnet-quebec.ca',
  quotesEmail: 'soumissions@totalnet-quebec.ca',
  address: {
    street: '3200 Boulevard Saint-Martin Ouest, Suite 410',
    city: 'Laval',
    province: 'QC',
    postalCode: 'H7T 1A1',
    country: 'CA'
  },
  businessHours: {
    mondayFriday: '7h00 à 20h00',
    saturday: '8h00 à 17h00',
    sunday: 'Sur rendez-vous commercial & urgences',
    emergency247: true
  }
};
