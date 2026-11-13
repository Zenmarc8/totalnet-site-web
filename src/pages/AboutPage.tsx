import React from 'react';
import { ShieldCheck, Award, Users, HeartHandshake, Sparkles, Phone, ArrowRight } from 'lucide-react';
import { SiteConfig } from '../config/types';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { OptimizedImage } from '../components/images/OptimizedImage';

interface AboutPageProps {
  siteConfig: SiteConfig;
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ siteConfig, onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-16">
      <Breadcrumbs
        items={[{ name: 'À propos', url: '/a-propos' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Qui sommes-nous ?
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Une entreprise québécoise dédiée à l'hygiène et à la salubrité de vos espaces.
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Fondée au Québec, <strong className="text-slate-900">{siteConfig.branding.siteName}</strong> s'est donné pour mission d'élever les standards de l'industrie du nettoyage et de la conciergerie. Loin des méthodes improvisées, nous misons sur des protocoles scientifiques, des équipements industriels de pointe et une formation rigoureuse de nos techniciens.
          </p>

          <div className="grid grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 text-sm block">Immatriculation officielle</span>
              <span className="text-slate-500">NEQ : {siteConfig.legal.quebecEnterpriseNumber}</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 text-sm block">Couverture d'assurance</span>
              <span className="text-emerald-700 font-semibold">{siteConfig.legal.insuranceCoverage}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
              alt="Équipe professionnelle TotalNet"
              width={800}
              height={600}
              priority={true}
              aspectRatio="4/3"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Values & Principles */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-center">
          Nos 4 piliers d'excellence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Transparence tarifaire</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nos soumissions sont détaillées au dollar près. Aucun surplus surprise à la fin des travaux.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Produits Éco-certifiés</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nous utilisons en priorité des solutions biodégradables, sans danger pour la santé des occupants et des animaux.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Personnel qualifié</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Techniciens vérifiés, formés aux techniques d'extraction, au décapage et aux normes de santé et sécurité au travail (CNESST).
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Conformité Loi 25</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Politiques strictes de gouvernance de données et responsable officiel de la protection des renseignements personnels.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-5">
        <h3 className="text-2xl sm:text-3xl font-bold">Besoin d'un partenaire fiable pour vos espaces ?</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Contactez notre équipe de coordination ou remplissez votre demande en ligne sans frais.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('/soumission')}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white"
          >
            Faire une demande de soumission
          </button>
          <button
            onClick={() => onNavigate('/contact')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-xs text-slate-200"
          >
            Nous contacter
          </button>
        </div>
      </div>
    </div>
  );
};
