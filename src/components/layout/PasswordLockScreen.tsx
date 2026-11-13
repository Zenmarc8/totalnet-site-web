import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Phone, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { SiteConfig } from '../../config/types';

interface PasswordLockScreenProps {
  siteConfig: SiteConfig;
  expectedPassword: string;
  onUnlock: () => void;
}

export const PasswordLockScreen: React.FC<PasswordLockScreenProps> = ({
  siteConfig,
  expectedPassword,
  onUnlock
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === expectedPassword) {
      setError('');
      onUnlock();
    } else {
      setError('Mot de passe incorrect. Veuillez vérifier votre accès.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-[#031830] via-[#05284F] to-[#0a3b73] text-white relative overflow-hidden">
      {/* Subtle architectural background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#76A8F9]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#76A8F9]/10 blur-3xl"
      />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Emblem */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-white text-[#05284F] flex items-center justify-center font-black text-2xl shadow-xl ring-4 ring-[#76A8F9]/30">
            {siteConfig.branding.logoText.charAt(0)}
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-tight text-white block">
              {siteConfig.branding.logoText}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#76A8F9]">
              Nettoyage &amp; Salubrité
            </span>
          </div>
        </div>

        {/* Main Lock Card */}
        <div className="bg-white text-slate-800 rounded-3xl shadow-2xl border border-slate-200/80 p-7 sm:p-9 space-y-6">
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#05284F] text-[11px] font-bold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5 text-[#05284F]" />
              Accès restreint
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#05284F] leading-snug">
              Site en cours de mise à jour — TotalNet Nettoyage &amp; Salubrité
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Notre plateforme fait présentement l’objet d’une mise à jour planifiée. Veuillez saisir votre mot de passe d’accès pour consulter le site.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="maintenance-password"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                Mot de passe d’accès
              </label>
              <div className="relative">
                <input
                  id="maintenance-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Entrez le mot de passe"
                  className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#76A8F9] focus:border-[#05284F] focus:outline-hidden transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-[#05284F] hover:bg-[#07386d] text-white font-bold text-sm shadow-lg shadow-blue-950/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Accéder au site</span>
              <ArrowRight className="w-4 h-4 text-[#76A8F9]" />
            </button>
          </form>

          {/* Direct Contact Info */}
          <div className="pt-5 border-t border-slate-100 text-center space-y-2">
            <p className="text-xs text-slate-500">
              Besoin d’un service de nettoyage ou d’une soumission ?
            </p>
            <a
              href="tel:+15148200368"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#05284F] font-bold text-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>(514) 8200368</span>
            </a>
          </div>
        </div>

        {/* Footer note */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-[#76A8F9]" />
          <span>{siteConfig.legal.companyLegalName} • Québec</span>
        </div>
      </div>
    </div>
  );
};
