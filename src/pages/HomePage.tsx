import React from 'react';
import {
  Sparkles,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Award,
  Users,
  Building,
  Home,
  Check,
  HelpCircle,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { SiteConfig, ServiceItem } from '../config/types';
import { OptimizedImage } from '../components/images/OptimizedImage';
import { LeadQualificationWizard } from '../components/forms/LeadQualificationWizard';

interface HomePageProps {
  siteConfig: SiteConfig;
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ siteConfig, onNavigate }) => {
  const activeServices = siteConfig.services.filter(s => s.isActive);
  const activeLocations = siteConfig.locations.filter(l => l.isActive);
  const primaryLocation = activeLocations.find(l => l.isPrimaryHub) || activeLocations[0];

  // Frequently Asked Questions
  const homeFaqs = [
    {
      q: 'Comment s’établit le tarif d’une soumission ?',
      a: 'Nos tarifs sont calculés de manière transparente en fonction de la superficie réelle (pi²), du type de tissu ou plancher, du niveau d’incrustation et du matériel nécessaire. Aucun frais caché : vous recevez un prix forfaitaire fixe avant tout début d’intervention.'
    },
    {
      q: 'Êtes-vous assurés en cas de bris ou dommage accidentel ?',
      a: `Oui, ${siteConfig.branding.siteName} détient une police d'assurance responsabilité civile commerciale complète de 2 000 000 $ protégeant l’ensemble de vos biens et installations pendant nos travaux.`
    },
    {
      q: 'Quel est votre délai moyen d’intervention ?',
      a: `Pour les demandes régulières, nos équipes interviennent sous 24 à 48 heures ouvrables. Pour les situations d’urgence (sinistre, dégât d’eau ou besoin commercial immédiat), nous disposons d’une ligne prioritaire disponible au ${siteConfig.contact.emergencyPhone || siteConfig.contact.phoneDisplay}.`
    },
    {
      q: 'Les produits de nettoyage utilisés sont-ils sécuritaires pour les enfants et animaux ?',
      a: 'Absolument. Nous privilégions des détergents écologiques biodégradables, sans composés organiques volatils (COV) agressifs ni résidus toxiques.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* SECTION 1: HERO */}
      <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden bg-gradient-to-b from-blue-50/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Value Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-bold tracking-wide">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>{siteConfig.branding.heroBadgeText}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                L’excellence en <span className="text-blue-800 underline decoration-blue-300">propreté professionnelle</span> pour vos espaces au Québec.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {siteConfig.branding.tagline}. Que ce soit pour un entretien résidentiel méticuleux, un nettoyage de tapis à l’eau chaude ou la salubrité de vos bureaux commerciaux, profitez d'une rigueur certifiée et de techniciens qualifiés.
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">Assurance 2 M$</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-semibold">Réponse sous 24h</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
                  <Award className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-semibold">Normes CNESST</span>
                </div>
              </div>

              {/* Direct CTAs & Phone */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                <a
                  href="#qualification-wizard"
                  className="px-7 py-4 rounded-xl font-bold text-sm text-white bg-[#05284F] hover:bg-blue-900 shadow-lg shadow-blue-950/20 text-center flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#76A8F9]" />
                  Demander une soumission
                </a>

                <button
                  onClick={() => onNavigate('/services')}
                  className="px-6 py-4 rounded-xl font-bold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs text-center transition-all cursor-pointer"
                >
                  Voir tous nos services
                </button>

                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="px-5 py-3 rounded-xl text-center text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>{siteConfig.contact.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hero High Quality Imagery */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 lg:aspect-square">
                <OptimizedImage
                  src={siteConfig.branding.heroImage.url}
                  alt={siteConfig.branding.heroImage.alt}
                  width={800}
                  height={800}
                  priority={true}
                  aspectRatio="1/1"
                  className="w-full h-full"
                />

                {/* Floating Experience Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-900">100 % Satisfaction Garantie</span>
                      <span className="block text-[11px] text-slate-500">Inspection minutieuse après travaux</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                    {primaryLocation?.name || 'Québec'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FICHE DE QUALIFICATION DES BESOINS (WIZARD) */}
      <section id="qualification-wizard" className="max-w-5xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Évaluation rapide en 2 minutes
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Fiche de qualification des besoins
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Répondez aux quelques questions ci-dessous pour obtenir une estimation précise adaptée à votre propriété.
          </p>
        </div>

        <LeadQualificationWizard siteConfig={siteConfig} />
      </section>

      {/* SECTION 3: SERVICES POPULAIRES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Nos domaines d'intervention
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Des services adaptés à chaque surface
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-1.5 font-bold text-sm text-blue-800 hover:text-blue-600 transition-colors"
          >
            Consulter l'ensemble des 20 services <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeServices.slice(0, 6).map(service => (
            <div
              key={service.id}
              className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <OptimizedImage
                  src={service.imageUrl}
                  alt={service.imageAlt}
                  width={600}
                  height={400}
                  aspectRatio="16/9"
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold">
                    {service.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {service.estimatedStartingPrice || 'Soumission gratuite'}
                  </span>
                  <button
                    onClick={() => onNavigate(`/services/${service.slug}`)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors"
                  >
                    Détails <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: POURQUOI NOUS CHOISIR (Vérifiable & Réaliste) */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Rigueur & Professionnalisme
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Pourquoi confier vos travaux à {siteConfig.branding.siteName} ?
            </h2>
            <p className="text-sm text-slate-400">
              Des engagements concrets et vérifiables pour vous garantir une tranquillité d'esprit totale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-white">Assurance complète 2 M$</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Protection civile commerciale certifiée couvrant vos biens résidentiels et locaux d’affaires sans compromis.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-white">Équipements industriels</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extracteurs vapeur à haute température, brosses rotatives et filtres HEPA certifiés pour une hygiène irréprochable.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-white">Respect des horaires</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Plages horaires fixes convenues à l’avance, soirs ou fins de semaine pour les entreprises, sans retards imprévus.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-white">Conformité Loi 25 & Québec</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Numéro d’entreprise du Québec (NEQ) en règle et protection rigoureuse de vos renseignements personnels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: TYPES DE CLIENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Secteurs d'activités
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Des solutions conçues pour vos réalités
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Propriétaires résidentiels', desc: 'Maisons, condos, chalets' },
            { label: 'PME & Bureaux', desc: 'Cabinets, cliniques, coworking' },
            { label: 'Syndicats de copropriété', desc: 'Halls, corridors, ascenseurs' },
            { label: 'Gestionnaires immobiliers', desc: 'Ménages de locataires' },
            { label: 'Commerces & Boutiques', desc: 'Vitrines, planchers de vente' },
            { label: 'Entrepreneurs généraux', desc: 'Nettoyage de fin de chantier' }
          ].map((type, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
              <span className="font-bold text-slate-900 text-xs block">{type.label}</span>
              <span className="text-[11px] text-slate-500 block">{type.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: TERRITOIRES DESSERVIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 bg-blue-50/50 p-8 sm:p-12 rounded-3xl border border-blue-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
              Couverture locale
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Secteurs et municipalités desservies
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Nos unités mobiles interviennent directement chez vous dans le Grand Montréal, à Laval, sur la Rive-Nord et la Rive-Sud. Vérifiez instantanément votre code postal dans notre formulaire !
            </p>
            <button
              onClick={() => onNavigate('/secteurs-desservis')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:text-blue-950 pt-2"
            >
              Voir la carte des municipalités <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {activeLocations.map(loc => (
              <button
                key={loc.id}
                onClick={() => onNavigate(`/secteurs-desservis/${loc.slug}`)}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 text-left transition-all group shadow-2xs"
              >
                <span className="font-bold text-slate-900 text-xs block group-hover:text-blue-800">
                  {loc.name}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Délai : {loc.averageResponseTime}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Questions fréquentes
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tout ce que vous devez savoir
          </h2>
        </div>

        <div className="space-y-4">
          {homeFaqs.map((faq, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                {faq.q}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: APPEL À L'ACTION FINAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto">
            Prêt à retrouver des espaces éclatants de propreté ?
          </h2>
          <p className="text-blue-200 text-sm sm:text-base max-w-xl mx-auto">
            Demandez votre soumission détaillée en quelques clics ou téléphonez directement à nos conseillers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#qualification-wizard"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-slate-900 bg-white hover:bg-slate-100 shadow-md transition-colors"
            >
              Remplir la fiche de soumission
            </a>
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Appeler le {siteConfig.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
