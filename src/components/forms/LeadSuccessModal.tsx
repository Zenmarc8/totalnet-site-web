import React from 'react';
import { CheckCircle2, Phone, Calendar, ShieldCheck, Download, ArrowRight, X } from 'lucide-react';
import { LeadSubmission, SiteConfig } from '../../config/types';

interface LeadSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: LeadSubmission | null;
  siteConfig: SiteConfig;
}

export const LeadSuccessModal: React.FC<LeadSuccessModalProps> = ({
  isOpen,
  onClose,
  lead,
  siteConfig
}) => {
  if (!isOpen || !lead) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top celebratory header */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-6 sm:p-8 text-center relative">
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-3 ring-8 ring-emerald-500/10">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Demande reçue avec succès !</h2>
          <p className="text-blue-200 text-sm mt-1">
            Numéro de suivi officiel : <span className="font-mono font-bold text-white bg-white/10 px-2.5 py-1 rounded-md">{lead.id}</span>
          </p>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-5 text-sm text-slate-700">
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3.5">
            <Calendar className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Prochaine étape dans les 24 heures</p>
              <p className="text-xs text-slate-600 mt-0.5">
                Un conseiller <strong className="text-slate-800">{siteConfig.branding.siteName}</strong> vous contactera par téléphone ou courriel pour valider votre soumission et fixer votre créneau.
              </p>
            </div>
          </div>

          {/* Lead recap */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-slate-500 block">Service demandé :</span>
              <span className="font-bold text-slate-800 text-sm">{lead.serviceName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Type de propriété :</span>
              <span className="font-bold text-slate-800 text-sm">{lead.propertyType}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Client :</span>
              <span className="font-medium text-slate-800">{lead.customer.firstName} {lead.customer.lastName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Territoire :</span>
              <span className="font-medium text-slate-800">{lead.customer.city} ({lead.customer.postalCode})</span>
            </div>
          </div>

          {lead.isOutOfTerritory && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <strong>Note sur votre secteur :</strong> Votre code postal se situe en limite de notre zone habituelle. Notre coordonnateur évaluera la disponibilité d'une équipe mobile dans votre secteur.
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold text-xs"
            >
              <Phone className="w-4 h-4" />
              Une urgence ? {siteConfig.contact.phoneDisplay}
            </a>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors"
            >
              Fermer et retourner au site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
