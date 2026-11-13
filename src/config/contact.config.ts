import { ContactConfig } from './types';

export const defaultContactConfig: ContactConfig = {
  phoneDisplay: '(514) 820-0368',
  phoneRaw: '+15148200368',
  emergencyPhone: '(514) 820-0368',
  email: 'total-net@videotron.ca',
  quotesEmail: 'total-net@videotron.ca',
  address: {
    street: '2761 Rue French',
    city: 'Montréal',
    province: 'QC',
    postalCode: 'H1L 4S2',
    country: 'CA'
  },
  businessHours: {
    mondayFriday: '7h00 à 20h00',
    saturday: '8h00 à 17h00',
    sunday: 'Sur rendez-vous commercial & urgences',
    emergency247: true
  }
};
