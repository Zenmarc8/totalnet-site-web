import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SiteConfig, LeadSubmission } from '../config/types';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { formatQuebecPhone, generateLeadId } from '../lib/utils';
import { submitLead } from '../lib/leadsStore';

interface ContactPageProps {
  siteConfig: SiteConfig;
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ siteConfig, onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Renseignements généraux');
  const [message, setMessage] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentAccepted || isSubmitting) return;

    setIsSubmitting(true);

    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || name.trim();
    const lastName = nameParts.slice(1).join(' ') || '-';

    const lead: LeadSubmission = {
      id: generateLeadId(),
      createdAt: new Date().toISOString(),
      siteId: siteConfig.siteId,
      serviceId: 'contact-general',
      serviceName: `Contact : ${subject}`,
      propertyType: 'Non spécifié (Formulaire Contact)',
      specificNeeds: [subject],
      dimensions: {
        notes: message,
      },
      timeframe: 'Dès que possible',
      customer: {
        firstName,
        lastName,
        phone,
        email,
        city: 'Grand Montréal',
        postalCode: 'H1L 4S2',
        notes: message,
      },
      photosCount: 0,
      photoNames: [],
      isOutOfTerritory: false,
      privacyConsentAccepted: consentAccepted,
      marketingConsentAccepted: false,
      status: 'transmis_supabase',
    };

    await submitLead(lead);

    setIsSubmitting(false);
    setSentSuccess(true);
  };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      <Breadcrumbs
        items={[{ name: 'Contact', url: '/contact' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Nous joindre
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Une équipe à votre écoute partout au Québec
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Pour une question sur nos services, une demande commerciale ou planifier une visite technique, nos répartiteurs vous répondent avec diligence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-base">Coordonnées principales</h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-500 block">Ligne générale :</span>
                  <a href={`tel:${siteConfig.contact.phoneRaw}`} className="font-bold text-slate-900 hover:text-blue-700 text-sm">
                    {siteConfig.contact.phoneDisplay}
                  </a>
                  {siteConfig.contact.emergencyPhone && (
                    <span className="text-[11px] text-emerald-700 block mt-0.5">
                      Urgences : {siteConfig.contact.emergencyPhone}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-500 block">Courriel de contact :</span>
                  <a href={`mailto:${siteConfig.contact.email}`} className="font-bold text-slate-900 hover:text-blue-700">
                    {siteConfig.contact.email}
                  </a>
                  <span className="text-[11px] text-slate-400 block">
                    Soumissions : {siteConfig.contact.quotesEmail}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-500 block">Siège social :</span>
                  <span className="font-medium text-slate-800">
                    {siteConfig.contact.address.street}
                    <br />
                    {siteConfig.contact.address.city} ({siteConfig.contact.address.province}) {siteConfig.contact.address.postalCode}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-500 block">Heures d'ouverture :</span>
                  <span className="font-medium text-slate-800 block">
                    Lundi au vendredi : {siteConfig.contact.businessHours.mondayFriday}
                  </span>
                  <span className="text-slate-500 block">
                    Samedi : {siteConfig.contact.businessHours.saturday}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-blue-950 space-y-2">
            <span className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              Protection de vos données (Loi 25)
            </span>
            <p className="leading-relaxed">
              Pour joindre notre Responsable de la protection des renseignements personnels (RPRP), écrivez à <a href={`mailto:${siteConfig.legal.privacyOfficer.email}`} className="underline font-medium">{siteConfig.legal.privacyOfficer.email}</a>.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            {sentSuccess ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Message envoyé avec succès !</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Notre équipe a bien reçu votre demande et vous répondra sous 24 heures ouvrables.
                </p>
                <button
                  onClick={() => setSentSuccess(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="text-base font-bold text-slate-900">
                  Formulaire de contact direct
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Nom complet <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Téléphone <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(formatQuebecPhone(e.target.value))}
                      placeholder="(514) 875-1100"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Courriel <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nom@exemple.ca"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Sujet de la demande
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    >
                      <option value="Renseignements généraux">Renseignements généraux</option>
                      <option value="Soumission commerciale">Soumission commerciale B2B</option>
                      <option value="Suivi de service">Suivi d'un service existant</option>
                      <option value="Facturation">Question sur la facturation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Votre message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={consentAccepted}
                    onChange={(e) => setConsentAccepted(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 shrink-0 mt-0.5 cursor-pointer"
                  />
                  <span className="text-slate-600 leading-snug text-[11px]">
                    J’accepte que mes renseignements soient traités pour répondre à mon message conformément à la Politique de confidentialité (Loi 25).
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Transmettre mon message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
