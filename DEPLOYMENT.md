# GUIDE DE DÉPLOIEMENT & MULTI-TENANT (DEPLOYMENT GUIDE)

Ce document fournit les instructions opérationnelles pour déployer le site maître et connecter jusqu'à 30+ domaines Rank & Rent distincts hébergés sur Vercel avec persistance Supabase et automatisation GoHighLevel.

---

## 1. Déploiement Initial sur Vercel

### Étape 1 : Dépôt GitHub
1. Poussez votre code source propre sur votre dépôt GitHub (ex. `github.com/votre-compte/totalnet-multisite`).

### Étape 2 : Création du projet Vercel
1. Rendez-vous sur votre tableau de bord [Vercel](https://vercel.com).
2. Cliquez sur **Add New... > Project** et importez le dépôt GitHub.
3. Conservez les paramètres de build par défaut :
   - **Framework Preset :** Vite
   - **Build Command :** `npm run build`
   - **Output Directory :** `dist`
4. Déployez le projet.

---

## 2. Configuration des Domaines Personnalisés

Pour connecter un domaine (ex. `totalnet-quebec.ca` ou `nettoyage-tapis-laval.ca`) :

1. Dans le projet Vercel, allez dans **Settings > Domains**.
2. Entrez votre domaine personnalisé (ex. `totalnet-quebec.ca`).
3. Configurez les enregistrements DNS chez votre registraire (GoDaddy, Namecheap, Cloudflare) :
   - **Enregistrement A :**
     - Type : `A`
     - Nom : `@`
     - Valeur : `76.76.21.21`
   - **Enregistrement CNAME (pour les sous-domaines ou www) :**
     - Type : `CNAME`
     - Nom : `www`
     - Valeur : `cname.vercel-dns.com`
4. Le certificat SSL Let's Encrypt sera émis automatiquement par Vercel en quelques minutes.

---

## 3. Configuration de la Base de Données Supabase

1. Créez un projet gratuit ou Pro sur [Supabase](https://supabase.com).
2. Rendez-vous dans le **SQL Editor**.
3. Copiez et exécutez le script contenu dans le fichier du projet :
   ```
   supabase/migrations/01_leads_table.sql
   ```
4. Ce script crée la table `leads_soumissions` avec :
   - La structure complète des champs du formulaire en 6 étapes.
   - Les politiques de sécurité **Row Level Security (RLS)** autorisant l'insertion publique des soumissions avec consentement Loi 25 tout en interdisant formellement la lecture des données sans authentification admin.
   - Les index de performance sur `site_id`, `created_at` et `customer_postal_code`.
5. Récupérez vos clés d'API dans **Project Settings > API** :
   - `URL` : `https://xxxxxxxx.supabase.co`
   - `anon public key` : `eyJhbGciOi...`
6. Renseignez ces valeurs dans Vercel :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

---

## 4. Intégration CRM GoHighLevel (GHL)

1. Dans votre compte GoHighLevel (sous-compte de l'agence ou de l'entrepreneur partenaire) :
   - Créez un **Workflow d'automatisation**.
   - Choisissez le déclencheur : **Inbound Webhook**.
   - Copiez l'URL du webhook générée (ex. `https://services.leadconnectorhq.com/hooks/...`).
2. Renseignez cette URL dans votre configuration Vercel :
   - Variable : `VITE_GHL_WEBHOOK_URL`
3. Le formulaire enverra alors le prospect avec tous ses champs :
   - Prénom, nom, téléphone canadien, courriel, ville, code postal.
   - Service spécifique, dimensions, photos jointes.
   - Étiquette de consentement Loi 25 et consentement marketing.

---

## 5. Comment Déployer les 30+ Sites Rank & Rent

Il existe deux méthodes recommandées selon votre organisation :

### Méthode A : Multi-Projets Vercel (Recommandée)
1. Créez un nouveau projet Vercel pointant vers le **même dépôt GitHub maître**.
2. Dans les variables d'environnement de ce nouveau projet, définissez simplement :
   ```bash
   VITE_SITE_ID=tapis-expert-laval
   ```
3. Connectez le domaine spécifique (ex. `nettoyage-tapis-laval.ca`).
4. À chaque mise à jour du moteur maître sur GitHub, tous vos 30 sites bénéficient instantanément des améliorations de performance, des correctifs et des nouvelles fonctionnalités sans duplication de code !

### Méthode B : Multi-domaines sur un seul projet
Le code peut également détecter automatiquement `window.location.hostname` ou le domaine actif pour charger le preset correspondant défini dans `src/config/multisite-presets.ts`.

---

## 6. Liste de Contrôle Pré-Lancement

Avant de rendre public un nouveau site du réseau, vérifiez :
- [ ] Le numéro de téléphone réel répond ou redirige correctement.
- [ ] Le nom du Responsable de la protection des renseignements personnels est à jour dans `legal.config.ts`.
- [ ] Le webhook GoHighLevel reçoit le prospect de test et envoie la notification SMS au partenaire.
- [ ] Les balises Schema.org JSON-LD sont valides sur l'outil de test des résultats enrichis de Google.
- [ ] Le bandeau de témoins bloque bien GA4 avant consentement explicite.
