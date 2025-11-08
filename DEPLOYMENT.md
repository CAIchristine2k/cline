# Guide de Déploiement Cloudflare Workers

Ce guide explique comment déployer votre site Cline Shop sur Cloudflare Workers.

## 📋 Prérequis

- Un compte Cloudflare (gratuit) : https://dash.cloudflare.com/sign-up
- Node.js 18+ installé
- Les dépendances du projet installées (`npm install`)

## 🔐 Étape 1: Configuration de l'authentification Cloudflare

### 1.1 Connexion à Cloudflare CLI

```bash
npm run cf-login
```

Cette commande ouvrira votre navigateur pour vous connecter à Cloudflare.

### 1.2 Vérifier votre connexion

```bash
npm run cf-whoami
```

Cette commande affichera:
- Votre email Cloudflare
- Votre **Account ID** (copiez-le!)
- Vos permissions

### 1.3 Ajouter votre Account ID

Ouvrez le fichier `wrangler.jsonc` et ajoutez votre Account ID:

```jsonc
{
  "name": "cline-shopify",
  "account_id": "VOTRE_ACCOUNT_ID_ICI",  // ← Collez votre Account ID ici
  // ...
}
```

## 🚀 Étape 2: Premier Déploiement

### 2.1 Build et déploiement

```bash
npm run deploy
```

Cette commande va:
1. ✅ Générer le code GraphQL (`npm run codegen`)
2. ✅ Builder l'application (`react-router build`)
3. ✅ Déployer sur Cloudflare Workers (`wrangler deploy`)

### 2.2 Résultat

Après le déploiement, vous verrez:
```
✨ Success! Uploaded 1 files (X.XX sec)
Published cline-shopify (X.XX sec)
  https://cline-shopify.YOUR-SUBDOMAIN.workers.dev
```

Votre site est maintenant en ligne! 🎉

## 🔑 Étape 3: Configuration des Variables d'Environnement (Secrets)

### 3.1 Upload des secrets depuis .env

```bash
npm run deploy:secrets
```

Cette commande uploadera automatiquement toutes les variables de votre fichier `.env` vers Cloudflare.

**⚠️ Important:** Les secrets incluent:
- `PRIVATE_STOREFRONT_API_TOKEN`
- `CLOUDINARY_URL`
- `KLING_ACCESS_KEY`
- `KLING_SECRET_KEY`
- `RESEND_API_KEY`
- Etc.

### 3.2 Ajouter/Modifier un secret manuellement

Pour ajouter ou modifier un secret individuel:

```bash
npx wrangler secret put NOM_DU_SECRET
```

Puis entrez la valeur du secret quand demandé.

### 3.3 Lister les secrets

```bash
npx wrangler secret list
```

## 📦 Commandes de Déploiement Disponibles

### Déploiement Standard
```bash
npm run deploy
```
Build + Deploy (sans upload des secrets)

### Déploiement Complet
```bash
npm run deploy:full
```
Build + Upload des secrets + Deploy

### Upload uniquement des secrets
```bash
npm run deploy:secrets
```

### Voir les logs en temps réel
```bash
npm run cf-tail
```

## 🌐 Étape 4: Domaine Personnalisé (Optionnel)

### 4.1 Ajouter votre domaine dans Cloudflare

1. Allez sur https://dash.cloudflare.com
2. Ajoutez votre domaine (par ex: `cline.shop`)
3. Suivez les instructions pour changer vos DNS

### 4.2 Configurer le domaine dans wrangler.jsonc

Décommentez et modifiez la section `routes`:

```jsonc
{
  "routes": [
    {
      "pattern": "cline.shop/*",
      "zone_name": "cline.shop"
    }
  ]
}
```

### 4.3 Redéployer

```bash
npm run deploy
```

Votre site sera maintenant accessible sur votre domaine personnalisé!

## 🔍 Debugging et Monitoring

### Voir les logs en temps réel

```bash
npm run cf-tail
```

### Voir le dashboard Cloudflare

1. Allez sur https://dash.cloudflare.com
2. Cliquez sur "Workers & Pages"
3. Sélectionnez "cline-shopify"
4. Vous verrez:
   - Statistiques d'utilisation
   - Logs
   - Métriques de performance

## 🛠️ Dépannage

### Erreur: "Missing account_id"

➡️ Ajoutez votre Account ID dans `wrangler.jsonc` (voir Étape 1.3)

### Erreur: "Not authenticated"

➡️ Exécutez `npm run cf-login` pour vous reconnecter

### Erreur de build

➡️ Testez localement d'abord:
```bash
npm run build
```

### Variables d'environnement manquantes

➡️ Uploadez vos secrets:
```bash
npm run deploy:secrets
```

## 📊 Limites du Plan Gratuit

Cloudflare Workers offre généreusement:
- ✅ **100,000 requêtes/jour** (gratuit)
- ✅ Déploiements illimités
- ✅ Custom domains
- ✅ SSL automatique
- ✅ CDN global

Si vous dépassez 100k requêtes/jour, vous pouvez passer au plan payant (Workers Paid) à $5/mois pour 10 millions de requêtes.

## 🔗 Ressources Utiles

- [Documentation Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Documentation Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [React Router Documentation](https://reactrouter.com/)
- [Shopify Hydrogen Documentation](https://shopify.dev/docs/storefronts/headless/hydrogen)

## 💡 Conseils

1. **Testez localement** avant de déployer:
   ```bash
   npm run dev
   ```

2. **Vérifiez les types** avant de déployer:
   ```bash
   npm run typecheck
   ```

3. **Nettoyez** les builds précédents si vous rencontrez des problèmes:
   ```bash
   npm run clean
   npm run build
   ```

4. **Sauvegardez** votre `.env` dans un endroit sûr (mais ne le committez JAMAIS dans git!)

5. **Utilisez** `npm run cf-tail` pour voir les erreurs en production en temps réel

---

**Besoin d'aide?** Consultez les logs avec `npm run cf-tail` ou visitez le [Discord Cloudflare Developers](https://discord.gg/cloudflaredev)
