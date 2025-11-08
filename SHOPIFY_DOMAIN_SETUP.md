# 🔧 Configuration du Domaine Shopify pour Cloudflare Workers

## ⚠️ Problème
Le checkout ne fonctionne pas car Shopify ne reconnaît pas le domaine Cloudflare Workers.

## ✅ Solution - Configurer le domaine dans Shopify

### Étape 1: Accéder aux Paramètres Shopify

1. Connectez-vous à votre admin Shopify: **https://admin.shopify.com/store/msjnp5-ww**
2. Allez dans **Settings** (Paramètres) → **Checkout**

### Étape 2: Ajouter le Domaine Cloudflare

Dans la section **Checkout URL patterns** ou **Domains**, ajoutez:

```
https://cline-shopify.antoine-22a.workers.dev
```

### Étape 3: Configurer les Apps Autorisées

1. Allez dans **Settings** → **Apps and sales channels**
2. Cliquez sur **Develop apps** (ou **Gérer les apps privées**)
3. Sélectionnez votre app (ou créez-en une si nécessaire)
4. Dans **Configuration** → **App setup**:
   - **Allowed redirection URL(s)**: Ajoutez `https://cline-shopify.antoine-22a.workers.dev/*`
   - **Application URL**: Ajoutez `https://cline-shopify.antoine-22a.workers.dev`

### Étape 4: Vérifier les Permissions

Assurez-vous que votre app Shopify a les permissions suivantes:
- ✅ `read_checkouts`
- ✅ `write_checkouts`
- ✅ `read_orders`
- ✅ `write_orders`

### Étape 5: Configurer CORS (si nécessaire)

Si le problème persiste, configurez les en-têtes CORS dans votre boutique:

1. **Settings** → **Domains**
2. Ajoutez votre domaine Workers comme domaine de confiance

## 🔄 Alternative: Utiliser un Domaine Personnalisé

Pour une meilleure expérience, configurez un domaine personnalisé:

### Option 1: Via Cloudflare Pages

1. Allez sur [Cloudflare Dashboard](https://dash.cloudflare.com)
2. **Workers & Pages** → Sélectionnez `cline-shopify`
3. **Settings** → **Domains & Routes**
4. Cliquez **Add Custom Domain**
5. Entrez votre domaine (ex: `shop.votredomaine.com`)
6. Suivez les instructions DNS

### Option 2: Via Routes

Ajoutez dans `wrangler.jsonc`:

```jsonc
{
  "routes": [
    {
      "pattern": "shop.votredomaine.com/*",
      "zone_name": "votredomaine.com"
    }
  ]
}
```

Puis redéployez: `npm run deploy`

## 🧪 Tester le Checkout

Une fois configuré, testez:

1. Allez sur: https://cline-shopify.antoine-22a.workers.dev
2. Ajoutez un produit au panier
3. Cliquez sur **Checkout**
4. Vous devriez être redirigé vers le checkout Shopify

## ❓ Problèmes Courants

### "Invalid domain" ou "Domain not allowed"
➡️ Vérifiez que le domaine est bien ajouté dans Shopify Settings → Checkout

### Le checkout se charge mais affiche une erreur
➡️ Vérifiez les permissions de l'app dans Shopify Admin

### Les images personnalisées ne s'affichent pas au checkout
➡️ C'est normal - Shopify n'affiche que les attributs texte au checkout final
➡️ Les images sont stockées dans les notes de commande pour traitement

## 📊 Vérifier la Configuration

Testez avec cette URL:
```
https://cline-shopify.antoine-22a.workers.dev/checkout
```

Si vous voyez une erreur, vérifiez les logs:
```bash
npm run cf-tail
```

## 🎯 Configuration Actuelle

Votre configuration actuelle:
- **Store**: `msjnp5-ww.myshopify.com`
- **Worker Domain**: `cline-shopify.antoine-22a.workers.dev`
- **Account ID**: `22a4a61e2774b2079bd41ff9ca804772`

---

**Besoin d'aide?** Consultez la [documentation Shopify](https://help.shopify.com/en/manual/online-store/domains)
