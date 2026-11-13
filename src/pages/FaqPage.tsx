import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, Sparkles, Phone } from 'lucide-react';
import { SiteConfig } from '../config/types';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';

interface FaqPageProps {
  siteConfig: SiteConfig;
  onNavigate: (path: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ siteConfig, onNavigate }) => {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    {
      category: 'Général & Fonctionnement',
      question: 'Comment se déroule la réservation d’un service ?',
      answer: 'Vous commencez par remplir notre fiche de qualification en 6 étapes en ligne. Un conseiller étudie votre demande et vous transmet une soumission détaillée avec un prix fixe sous 24h. Après acceptation, nous convenons d’un créneau horaire fixe pour l’intervention de nos techniciens.'
    },
    {
      category: 'Général & Fonctionnement',
      question: 'Fournissez-vous les produits et le matériel ?',
      answer: 'Oui, sans exception. Nos unités mobiles arrivent munies de tous les équipements industriels (aspirateurs HEPA, extracteurs à eau chaude 500 PSI, générateurs de vapeur, autolaveuses) et de produits d’entretien certifiés ÉcoLogo.'
    },
    {
      category: 'Tapis & Ameublement',
      question: 'Combien de temps faut-il pour qu’un tapis nettoyé à la vapeur sèche ?',
      answer: 'Grâce à la puissance d’aspiration sous vide de notre équipement, l’humidité résiduelle est minimale. Le temps de séchage moyen se situe entre 4 et 6 heures selon la ventilation et la température ambiante de la pièce.'
    },
    {
      category: 'Tapis & Ameublement',
      question: 'Les taches d’animaux et les odeurs d’urine disparaissent-elles ?',
      answer: 'Oui. Contrairement aux produits ménagers courants qui masquent temporairement les odeurs, nous appliquons un pré-traitement enzymatique qui détruit les cristaux d’acide urique en profondeur dans le sous-tapis, éliminant ainsi définitivement la source olfactive.'
    },
    {
      category: 'Tarifs & Facturation',
      question: 'Le prix de la soumission peut-il changer le jour de l’intervention ?',
      answer: 'Non, nos prix sont garantis transparents. Si les informations fournies lors de la qualification (nombre de pièces, dimensions) correspondent à la réalité des lieux, le montant facturé correspond exactement au devis convenu.'
    },
    {
      category: 'Sécurité & Assurances',
      question: 'Quelle est la couverture de votre assurance responsabilité ?',
      answer: `${siteConfig.branding.siteName} détient une assurance responsabilité civile complète de 2 000 000 $ couvrant les biens confiés, les risques de bris accidentel et la responsabilité civile générale.`
    },
    {
      category: 'Loi 25 & Confidentialité',
      question: 'Que faites-vous des renseignements transmis dans le formulaire ?',
      answer: 'En stricte conformité avec la Loi 25 du Québec, vos coordonnées (nom, téléphone, courriel, adresse) sont uniquement utilisées pour établir votre soumission et coordonner l’équipe technique. Elles ne sont jamais vendues ni cédées à des courtiers ou annonceurs tiers.'
    }
  ];

  const filteredFaqs = faqItems.filter(item =>
    item.question.toLowerCase().includes(search.toLowerCase()) ||
    item.answer.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      <Breadcrumbs
        items={[{ name: 'Foire aux questions (FAQ)', url: '/faq' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Centre d'aide
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Foire aux questions
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Retrouvez les réponses à vos interrogations sur nos méthodes, délais d'intervention, équipements et politiques au Québec.
        </p>

        {/* Search */}
        <div className="pt-4 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une question (ex. séchage, assurance, tarif)..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden shadow-2xs"
          />
        </div>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-blue-700 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  <p>{faq.answer}</p>
                  <span className="inline-block mt-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Catégorie : {faq.category}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Support Box */}
      <div className="p-8 rounded-3xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Vous avez une autre question ?</h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Notre équipe vous répond avec plaisir par téléphone ou par courriel.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('/contact')}
            className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-100"
          >
            Nous écrire
          </button>
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 font-bold text-xs text-white flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            {siteConfig.contact.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
};
