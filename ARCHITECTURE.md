# ARCHITECTURE TECHNIQUE — SYSTÈME MULTISITE TOTALNET

Ce document détaille l'architecture logicielle, les flux de données et les principes directeurs du moteur maître conçu pour propulser plus de 30 sites Web de nettoyage Rank & Rent au Québec.

---

## 1. Principe de Séparation Fondamentale

Le système repose sur une séparation stricte en 6 couches distinctes :

```
┌────────────────────────────────────────────────────────┐
│ 1. CONFIGURATION (src/config/)                         │
│ Identité, Couleurs, Téléphones, Territoires, Services   │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 2. COMPOSANTS RÉUTILISABLES (src/components/)          │
│ Header, Footer, Wizard, Images, Bannières, Modales     │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 3. COUCHE MÉTIER & VALIDATION (src/lib/)               │
│ Formatage Québec, Codes postaux, Consentement Loi 25   │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 4. PAGES DYNAMIQUES (src/pages/)                       │
│ Accueil, /services/:slug, /secteurs-desservis/:slug    │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 5. DONNÉES STRUCTURÉES (src/components/seo/)           │
│ JSON-LD Schema.org CleaningService & Breadcrumbs       │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 6. SORTIES & INTÉGRATIONS EXTERNES                     │
│ Supabase (PostgreSQL RLS), GoHighLevel Webhooks, GA4   │
└────────────────────────────────────────────────────────┘
```

Cette séparation garantit qu'**aucune modification de contenu n'exige de modifier le code des composants ou du routage**.

---

## 2. Système de Configuration Centralisé (`src/config/`)

Chaque site déployé possède un objet conforme à l'interface `SiteConfig` (`src/config/types.ts`) :

- **`branding.config.ts` :** Définit les couleurs primaires (`primaryColor`, ex: `#05284F`), secondaires (`secondaryColor`, ex: `#76A8F9`), logos et image Hero. Les variables CSS racine (`--color-primary`, `--color-secondary`) sont injectées automatiquement.
- **`contact.config.ts` :** Numéro d'affichage québécois, format brut `tel:`, ligne d'urgence, adresses civiques et horaires d'ouverture.
- **`services.config.ts` :** Liste exhaustive des 20 services. Chaque service dispose de son flag `isActive`. Si un site spécialisé ne fait que du tapis, les 18 autres services sont désactivés par simple booléen sans casser les liens ni créer d'erreurs 404.
- **`locations.config.ts` :** Liste des municipalités avec préfixes postaux (`H7A`, `H7B`, `J4G`, etc.) et temps de réponse moyen.
- **`seo.config.ts` :** Paramètres de canonical, titre par défaut, métas, coordonnées GPS pour la fiche Google et indexabilité.
- **`integrations.config.ts` :** Identifiants et points de terminaison pour Supabase et GoHighLevel.
- **`legal.config.ts` :** Responsable officiel de la protection des renseignements personnels (RPRP), NEQ et délais de rétention prescrits par la Loi 25.
- **`cookie.config.ts` :** Catégorisation des témoins et durée de validité (13 mois).

---

## 3. Parcours de Qualification des Prospects (Leads)

Le composant `LeadQualificationWizard.tsx` orchestre le flux de capture des demandes :

1. **Étape 1 (Service) :** Choix du service parmi les services actifs du site.
2. **Étape 2 (Propriété) :** Maison, condo, bureau corporatif, commerce, etc.
3. **Étape 3 (Besoins dynamiques) :** Les options s'ajustent dynamiquement au service choisi (ex. Taches de café, urine animale pour le tapis ; joints de coulis pour les planchers).
4. **Étape 4 (Dimensions) :** Nombre de pièces, pi², étages.
5. **Étape 5 (Échéancier) :** Urgence, semaine en cours, 2 semaines, service récurrent.
6. **Étape 6 (Coordonnées & Territoire) :**
   - Téléphone formaté automatiquement au format canadien : `(514) 875-1100`.
   - Code postal validé selon le format canadien (`H7T 1A1`).
   - Vérification en direct de la desserte territoriale avec `checkTerritoryCoverage()` : si le code postal n'est pas dans la zone, un avis informatif poli prévient le visiteur que la disponibilité doit être confirmée manuellement.
   - Téléversement sécurisé de photos (jusqu'à 5 Mo).
   - Case de consentement obligatoire (Loi 25) + Case marketing facultative séparée et non cochée par défaut.

### Enregistrement & Expédition

À la soumission :
- Un identifiant unique traçable est généré (ex. `TN-20261112-4821`).
- L'objet complet `LeadSubmission` est persisté dans le stockage local pour consultation instantanée dans la console Rank & Rent.
- Si `VITE_GHL_WEBHOOK_URL` est configuré, un POST HTTP en JSON est transmis au CRM GoHighLevel pour déclencher les automatisations de notification SMS/courriel à l'entrepreneur affilié.
- Si Supabase est configuré, la ligne est insérée dans la table `leads_soumissions` protégée par Row Level Security.

---

## 4. Gouvernance des Données & Conformité Loi 25

1. **Consentement explicite aux témoins :**
   - Au premier chargement, aucun témoin non essentiel n'est activé.
   - Le composant `CookieConsentBanner.tsx` propose 3 choix de même niveau visuel : Accepter, Refuser non essentiels, Personnaliser.
   - En cas d'acceptation ou de refus, l'état est mémorisé avec horodatage et version.
   - Le lien « Gérer mes témoins (cookies) » présent dans le pied de page permet à tout visiteur de modifier ses choix à tout moment.
2. **Google Consent Mode v2 :**
   - Les balises `analytics_storage` et `ad_storage` restent en statut `denied` jusqu'à acceptation positive de la catégorie correspondante.
3. **Registre des incidents de confidentialité :**
   - Procédure intégrée dans la politique de gestion pour aviser la Commission d'accès à l'information (CAI) en cas de bris de sécurité présentant un risque sérieux de préjudice.

---

## 5. Performance Web & Core Vitals

- **LCP (Largest Contentful Paint) :** L'image principale du Hero utilise `loading="eager"` et `fetchPriority="high"` avec un ratio d'aspect prédéfini évitant tout décalage d'affichage.
- **CLS (Cumulative Layout Shift) :** Toutes les images utilisent `<OptimizedImage />` avec un conteneur d'aspect ratio fixe (`16/9`, `4/3` ou `1/1`).
- **INP (Interaction to Next Paint) :** Formulaire guidé léger, sans bibliothèques tierces superflues.
