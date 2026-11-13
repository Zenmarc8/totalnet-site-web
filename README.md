# TotalNet — Moteur Maître d'Architecture Rank & Rent (30+ Sites Québec)

> **Moteur multisite haute performance, modulaire et évolutif** conçu pour déployer et opérer un réseau de 30+ sites Web de nettoyage spécialisés et généralistes au Québec (Laval, Grand Montréal, Rive-Nord, Rive-Sud).

---

## 🚀 Caractéristiques Clés du Moteur

- **Moteur indépendant du contenu :** Modification du nom, logo, palette CSS (`#05284F`, `#76A8F9`), coordonnées, services actifs, territoires, avis légaux et intégrations depuis un unique dossier de configuration (`src/config/`).
- **Fiche de qualification en 6 étapes :** Formulaire guidé à conversion maximale avec sélection de services, types de bâtisses, besoins spécifiques modulaires, superficie, délais, téléversement de photos et validation en direct du code postal québécois.
- **Conformité stricte Loi 25 (Québec) :**
  - Bandeau et centre granulaire de gestion des témoins (Cookies) avec refus des témoins non essentiels par défaut.
  - Case de consentement obligatoire distincte de la case marketing (non cochée par défaut, conformité LCAP).
  - Politique de confidentialité, politique de gouvernance des renseignements personnels, registre des incidents et coordonnées officielles du Responsable RPRP.
- **SEO & Schema.org LocalBusiness :**
  - Données structurées JSON-LD complètes (`CleaningService`, `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`).
  - Zéro contenu dupliqué sur les pages territoriales et services.
  - Balises méta dynamiques et Canonical auto-généré.
- **Gestion optimisée des images :** Composant `<OptimizedImage />` avec ratios d'aspect fixes pour éliminer le CLS, chargement différé (lazy loading) et priorité LCP sur le Hero.
- **Intégrations prêtes pour l'automatisation :**
  - **Supabase :** Schéma PostgreSQL avec politiques de sécurité RLS incluses (`/supabase/migrations/01_leads_table.sql`).
  - **GoHighLevel :** Déclenchement de webhooks avec payload standardisé pour alimentation de vos pipelines CRM.
  - **Google Consent Mode v2 :** Blocage systématique de GA4 et GTM avant acceptation de l'utilisateur.

---

## 📂 Architecture des Dossiers

```
├── .env.example                       # Variables d'environnement documentées
├── ARCHITECTURE.md                    # Schéma technique et flux de données
├── CONTENT-GUIDE.md                   # Guide de rédaction pour nouvelles pages (Claude / ChatGPT)
├── DEPLOYMENT.md                      # Guide de déploiement GitHub, Vercel & Supabase
├── metadata.json                      # Métadonnées de l'application
├── package.json                       # Dépendances & scripts de build
├── supabase/
│   └── migrations/
│       └── 01_leads_table.sql         # Table leads_soumissions avec RLS
└── src/
    ├── config/                        # ⚡ CŒUR DU SYSTÈME MULTISITE
    │   ├── types.ts                   # Interfaces TypeScript
    │   ├── site.config.ts             # Point d'entrée de la configuration
    │   ├── branding.config.ts         # Couleurs, logos, polices
    │   ├── contact.config.ts          # Téléphones, courriels, adresses
    │   ├── services.config.ts         # Les 20 services configurables
    │   ├── locations.config.ts        # Municipalités et préfixes postaux
    │   ├── seo.config.ts              # Schema.org et balises de base
    │   ├── integrations.config.ts     # Supabase, GHL, GA4
    │   ├── legal.config.ts            # Loi 25 et responsable RPRP
    │   ├── cookie.config.ts           # Catégories de témoins
    │   └── multisite-presets.ts       # 4 configurations de sites prêts à l'emploi
    ├── components/
    │   ├── layout/                    # Header, Footer, SiteSwitcherBanner
    │   ├── forms/                     # LeadQualificationWizard, LeadSuccessModal
    │   ├── cookies/                   # CookieConsentBanner, CookiePreferencesModal
    │   ├── seo/                       # JsonLd, Breadcrumbs
    │   ├── images/                    # OptimizedImage (Core Web Vitals)
    │   └── dashboard/                 # AdminDashboardModal (Gestion des leads)
    ├── lib/
    │   ├── cookieConsent.ts           # Gestionnaire d'événements de consentement
    │   ├── leadsStore.ts              # Sauvegarde et export CSV/JSON des prospects
    │   └── utils.ts                   # Validateurs de téléphone et code postal québécois
    └── pages/
        ├── HomePage.tsx               # Accueil & Fiche de qualification
        ├── ServicesIndexPage.tsx      # Catalogue des 20 services
        ├── ServiceDetailPage.tsx      # Page individuelle de service
        ├── LocationsIndexPage.tsx     # Répertoire des villes desservies
        ├── LocationDetailPage.tsx     # Page locale par ville
        ├── QuotePage.tsx              # Page /soumission dédiée
        ├── AboutPage.tsx              # Page /a-propos
        ├── ContactPage.tsx            # Page /contact
        ├── FaqPage.tsx                # Page /faq
        ├── NotFoundPage.tsx           # Page 404
        └── legal/                     # 7 pages de conformité Loi 25
```

---

## 🧪 Préréglages Multisites Inclus

Vous pouvez basculer instantanément entre 4 exemples de sites pré-configurés via le sélecteur situé en haut de page ou dans la console d'administration :

1. **TotalNet (Général Québec) :** Site complet avec l'ensemble des 20 services et toutes les municipalités.
2. **Tapis Expert Laval :** Site spécialisé dans le nettoyage de tapis, carpettes et ameublement à Laval.
3. **ProCommercial Rive-Sud :** Site B2B axé sur les bureaux, commerces et décapage de planchers (Longueuil, Brossard, Boucherville).
4. **Vitres Pro Montréal :** Site spécialisé en lavage de fenêtres résidentiel et commercial à l’eau déionisée pure.

---

## 🛠️ Commandes Utiles

- `npm run dev` : Démarre le serveur de développement local.
- `npm run build` : Compile le projet pour la production.
- `npm run lint` : Vérifie la rigueur du typage TypeScript sans émission.
