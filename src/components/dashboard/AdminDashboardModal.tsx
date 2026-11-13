import React, { useState, useEffect } from 'react';
import {
  X,
  Database,
  Download,
  Trash2,
  FileCode,
  ShieldCheck,
  Server,
  Layers,
  Send,
  Eye,
  CheckCircle,
  Copy,
  BookOpen
} from 'lucide-react';
import { SiteConfig, LeadSubmission } from '../../config/types';
import { getStoredLeads, deleteLead, clearAllLeads, exportLeadsToCsv } from '../../lib/leadsStore';
import { formatQuebecDate } from '../../lib/utils';
import { getStoredConsent } from '../../lib/cookieConsent';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteConfig: SiteConfig;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  siteConfig
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'integrations' | 'schema' | 'docs'>('leads');
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLeads(getStoredLeads());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const consent = getStoredConsent();

  const handleDownloadCsv = () => {
    const csvData = exportLeadsToCsv(leads);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads-${siteConfig.siteId}-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(leads, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads-${siteConfig.siteId}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteOne = (id: string) => {
    deleteLead(id);
    setLeads(getStoredLeads());
  };

  const handleClearAll = () => {
    if (confirm('Voulez-vous supprimer toutes les soumissions de démonstration ?')) {
      clearAllLeads();
      setLeads([]);
    }
  };

  const sampleSchema = {
    '@context': 'https://schema.org',
    '@type': 'CleaningService',
    name: siteConfig.branding.siteName,
    url: siteConfig.seo.canonicalBaseUrl,
    telephone: siteConfig.contact.phoneRaw,
    address: siteConfig.contact.address,
    areaServed: siteConfig.seo.organizationSchema.areaServed
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs animate-fade-in"
    >
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                Console de Gestion Rank & Rent — {siteConfig.branding.siteName}
              </h2>
              <p className="text-xs text-slate-400">
                Domaine : <span className="text-blue-300 font-mono">{siteConfig.domain}</span> • ID : {siteConfig.siteId}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fermer"
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 bg-slate-50 text-xs font-bold">
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'leads'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            Demandes reçues ({leads.length})
          </button>

          <button
            onClick={() => setActiveTab('integrations')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'integrations'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Server className="w-4 h-4" />
            Supabase & GoHighLevel
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'schema'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode className="w-4 h-4" />
            Inspecteur SEO & Schema.org
          </button>

          <button
            onClick={() => setActiveTab('docs')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'docs'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Guide Multisite (30+ sites)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* TAB 1: LEADS TABLE */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Registre des soumissions de qualification
                  </h3>
                  <p className="text-xs text-slate-500">
                    Toutes les demandes reçues par le formulaire en 6 étapes sont enregistrées localement et prêtes pour transmission Supabase / GoHighLevel.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadCsv}
                    disabled={leads.length === 0}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Exporter CSV
                  </button>
                  <button
                    onClick={handleDownloadJson}
                    disabled={leads.length === 0}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    JSON
                  </button>
                  {leads.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Vider
                    </button>
                  )}
                </div>
              </div>

              {leads.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-3xl space-y-2">
                  <Layers className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="font-semibold text-slate-700">Aucune soumission enregistrée pour le moment</p>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Remplissez la fiche de qualification sur la page d'accueil ou sur la page Soumission pour tester le parcours complet.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-3">ID / Date</th>
                        <th className="p-3">Client</th>
                        <th className="p-3">Service</th>
                        <th className="p-3">Propriété</th>
                        <th className="p-3">Territoire</th>
                        <th className="p-3">Photos</th>
                        <th className="p-3">Loi 25</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {leads.map(lead => (
                        <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3">
                            <span className="font-mono font-bold text-blue-900 block">{lead.id}</span>
                            <span className="text-[10px] text-slate-400">{formatQuebecDate(lead.createdAt)}</span>
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-slate-900 block">{lead.customer.firstName} {lead.customer.lastName}</span>
                            <a href={`tel:${lead.customer.phone}`} className="text-blue-700 font-mono block hover:underline">
                              {lead.customer.phone}
                            </a>
                            <span className="text-slate-500 block truncate max-w-[150px]">{lead.customer.email}</span>
                          </td>
                          <td className="p-3">
                            <span className="font-semibold text-slate-800 block">{lead.serviceName}</span>
                            <span className="text-[10px] text-slate-500">{lead.timeframe}</span>
                          </td>
                          <td className="p-3 text-slate-700">
                            {lead.propertyType}
                          </td>
                          <td className="p-3">
                            <span className="font-medium text-slate-800 block">{lead.customer.city}</span>
                            <span className="font-mono text-slate-500">{lead.customer.postalCode}</span>
                            {lead.isOutOfTerritory && (
                              <span className="text-[10px] text-amber-700 font-bold block">Hors zone habituelle</span>
                            )}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                              {lead.photosCount} photo(s)
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="space-y-0.5">
                              <span className="text-[10px] text-emerald-700 font-bold block">Traitement: Oui</span>
                              <span className="text-[10px] text-slate-500 block">
                                Marketing: {lead.marketingConsentAccepted ? 'Oui' : 'Non'}
                              </span>
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeleteOne(lead.id)}
                              className="text-slate-400 hover:text-rose-600 p-1 rounded"
                              title="Supprimer cette demande"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INTEGRATIONS */}
          {activeTab === 'integrations' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Supabase Box */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 flex items-center gap-2">
                      <Database className="w-4 h-4 text-emerald-600" />
                      Base de données Supabase
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Prêt à connecter
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Stockage permanent PostgreSQL avec sécurité RLS pour cloisonner les demandes de chacun de vos 30+ sites.
                  </p>
                  <div className="bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-[11px] space-y-1">
                    <div>Table : <span className="text-emerald-400">leads_soumissions</span></div>
                    <div>RLS : <span className="text-blue-400">Activée (INSERT public, SELECT admin)</span></div>
                    <div>Fichier SQL : <span className="text-slate-400">/supabase/migrations/01_leads_table.sql</span></div>
                  </div>
                </div>

                {/* GoHighLevel Box */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 flex items-center gap-2">
                      <Send className="w-4 h-4 text-blue-600" />
                      CRM & Automatisations GoHighLevel
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Webhook configurable
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Déclenche instantanément la notification SMS/courriel à l'entrepreneur partenaire et crée l'opportunité dans le pipeline GHL.
                  </p>
                  <div className="bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-[11px] space-y-1">
                    <div>Webhook URL : <span className="text-amber-400">VITE_GHL_WEBHOOK_URL</span></div>
                    <div>Format : <span className="text-blue-400">JSON standardisé</span></div>
                    <div>Champs : <span className="text-slate-400">contact, service, siteId, territory</span></div>
                  </div>
                </div>
              </div>

              {/* Law 25 compliance check */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  État de conformité Loi 25 (Québec)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block">Responsable RPRP :</span>
                    <span className="font-bold text-slate-800">{siteConfig.legal.privacyOfficer.name}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block">Consentement témoins :</span>
                    <span className="font-bold text-emerald-700">
                      {consent.hasAnswered ? 'Exprimé' : 'En attente première visite'}
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block">Conservation maximale :</span>
                    <span className="font-bold text-slate-800">{siteConfig.legal.dataRetentionMonths} mois</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SCHEMA.ORG */}
          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Données structurées JSON-LD générées en direct
                  </h3>
                  <p className="text-xs text-slate-500">
                    Conformes aux spécifications de Google Rich Results pour les entreprises de nettoyage local au Québec.
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(sampleSchema, null, 2));
                    setCopiedText(true);
                    setTimeout(() => setCopiedText(false), 2000);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedText ? 'Copié !' : 'Copier JSON-LD'}
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto max-h-96">
                {JSON.stringify(sampleSchema, null, 2)}
              </pre>
            </div>
          )}

          {/* TAB 4: MULTISITE GUIDE */}
          {activeTab === 'docs' && (
            <div className="space-y-4 text-xs leading-relaxed text-slate-600">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-blue-900">
                <h4 className="font-bold text-sm mb-1">Comment lancer un nouveau site à partir de ce moteur :</h4>
                <p>
                  L'architecture a été conçue pour que vous n'ayez jamais besoin de refaire le code. Pour déployer le site numéro 2, 3 ou 30 :
                </p>
              </div>

              <ol className="list-decimal list-inside space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <li>
                  <strong>Dupliquez ou configurez le preset</strong> dans <code className="bg-slate-200 px-1 py-0.5 rounded">src/config/multisite-presets.ts</code> avec le nouveau nom, la palette (#couleur), le téléphone et le courriel.
                </li>
                <li>
                  <strong>Définissez les services actifs</strong> : pour un site de tapis, activez seulement <code className="bg-slate-200 px-1 py-0.5 rounded">nettoyage-de-tapis</code>, <code className="bg-slate-200 px-1 py-0.5 rounded">nettoyage-de-meubles</code>, etc. Les 18 autres services disparaîtront automatiquement de la navigation sans créer d'erreurs 404.
                </li>
                <li>
                  <strong>Définissez les secteurs prioritaires</strong> : ciblez une ville spécifique (ex. Laval) pour personnaliser les balises Title, Meta descriptions et codes postaux autorisés.
                </li>
                <li>
                  <strong>Connectez le domaine sur Vercel</strong> : pointez le DNS et configurez la variable <code className="bg-slate-200 px-1 py-0.5 rounded">SITE_ID</code> dans l'environnement de production.
                </li>
              </ol>

              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 font-mono text-[11px] text-slate-700">
                Documentation complète disponible dans les fichiers racines :
                <br />• <strong>ARCHITECTURE.md</strong> : Schéma technique complet et flux de données
                <br />• <strong>CONTENT-GUIDE.md</strong> : Guide éditorial pour rédiger de nouveaux services/territoires
                <br />• <strong>DEPLOYMENT.md</strong> : Instructions de déploiement GitHub + Vercel + Supabase
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>TotalNet Moteur d'Architecture v1.0 • Québec</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
