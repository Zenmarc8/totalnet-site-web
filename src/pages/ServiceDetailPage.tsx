import React from 'react';
import {
  Sparkles,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Check,
  HelpCircle,
  Wrench,
  Building,
  ArrowRight,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { SiteConfig, ServiceItem } from '../config/types';
import { OptimizedImage } from '../components/images/OptimizedImage';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';

interface ServiceDetailPageProps {
  slug: string;
  siteConfig: SiteConfig;
  onNavigate: (path: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  slug,
  siteConfig,
  onNavigate
}) => {
  const service = siteConfig.services.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Service non trouvé ou inactif</h2>
        <p className="text-sm text-slate-500">
          Le service demandé n’est pas configuré pour ce site ou a été désactivé.
        </p>
        <button
          onClick={() => onNavigate('/services')}
          className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
        >
          Retour aux services
        </button>
      </div>
    );
  }

  // Related other services (excluding current)
  const relatedServices = siteConfig.services
    .filter(s => s.isActive && s.slug !== slug)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Tous nos services', url: '/services' },
          { name: service.name, url: `/services/${service.slug}` }
        ]}
        onNavigate={onNavigate}
      />

      {/* Hero Section of Service */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 font-bold text-xs uppercase tracking-wider">
              {service.category}
            </span>
            {service.estimatedStartingPrice && (
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs">
                {service.estimatedStartingPrice}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {service.name}
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            {service.fullDescription}
          </p>

          {/* Key Advantages */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Ce qui est inclus dans notre prestation :
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct CTA Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate(`/soumission?service=${service.slug}`)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-blue-300" />
              Demander une soumission pour ce service
            </button>
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              Appeler le {siteConfig.contact.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Right Column: Visual & Quick Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl overflow-hidden border-4 border-white shadow-xl aspect-4/3 bg-slate-100">
            <OptimizedImage
              src={service.imageUrl}
              alt={service.imageAlt}
              width={800}
              height={600}
              priority={true}
              aspectRatio="4/3"
              className="w-full h-full"
            />
          </div>

          {/* Technical Specs box */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
            {service.equipmentUsed && service.equipmentUsed.length > 0 && (
              <div>
                <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                  <Wrench className="w-4 h-4 text-blue-700" />
                  Équipements & Produits déployés
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {service.equipmentUsed.map((eq, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium">
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {service.propertyTypes && service.propertyTypes.length > 0 && (
              <div className="pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                  <Building className="w-4 h-4 text-blue-700" />
                  Bâtiments & Propriétés desservies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {service.propertyTypes.map((pt, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium">
                      {pt}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                Intervention sous 24 à 48h
              </span>
              <span className="font-bold text-emerald-700">Assuré 2 000 000 $</span>
            </div>
          </div>
        </div>
      </div>

      {/* Service FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <div className="pt-8 border-t border-slate-200 max-w-4xl space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Foire aux questions</span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Questions fréquentes sur ce service
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                <h3 className="font-bold text-slate-900 text-sm flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Internal Linking: Related Services */}
      <div className="pt-8 border-t border-slate-200 space-y-6">
        <h3 className="text-xl font-bold text-slate-900">
          Services complémentaires recommandés
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {relatedServices.map(rel => (
            <button
              key={rel.id}
              onClick={() => onNavigate(`/services/${rel.slug}`)}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 text-left transition-all group shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <span className="font-bold text-slate-900 text-sm block group-hover:text-blue-800">
                  {rel.name}
                </span>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {rel.shortDescription}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 pt-3 mt-3 border-t border-slate-100">
                En savoir plus <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
