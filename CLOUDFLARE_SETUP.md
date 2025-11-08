# ⚡ Configuration Rapide Cloudflare

Guide ultra-simplifié pour déployer en 5 minutes.

## 🎯 Déploiement en 3 Étapes

### 1️⃣ Se connecter à Cloudflare

```bash
npm run cf-login
```

Une page web s'ouvrira → connectez-vous avec votre compte Cloudflare (créez-en un si besoin).

### 2️⃣ Obtenir votre Account ID

```bash
npm run cf-whoami
```

Vous verrez quelque chose comme:
```
Account Name: Votre Nom
Account ID: abc123def456...  ← COPIEZ CECI
```

Ouvrez `wrangler.jsonc` et collez votre Account ID:
```jsonc
{
  "account_id": "abc123def456...",  ← ICI
}
```

### 3️⃣ Déployer!

```bash
npm run deploy
```

✨ **C'est tout!** Votre site sera accessible sur:
```
https://cline-shopify.VOTRE-SUBDOMAIN.workers.dev
```

## 🔑 Upload des Secrets (Variables d'environnement)

**Important:** Pour que votre site fonctionne complètement, uploadez vos secrets:

```bash
npm run deploy:secrets
```

Cela uploadera automatiquement:
- ✅ Clés API Shopify
- ✅ Clés Cloudinary
- ✅ Clés KlingAI
- ✅ Toutes les variables de votre `.env`

## 📋 Commandes Utiles

| Commande | Description |
|----------|-------------|
| `npm run deploy` | Build + Deploy |
| `npm run deploy:full` | Build + Secrets + Deploy (tout en un) |
| `npm run deploy:secrets` | Upload uniquement les secrets |
| `npm run cf-tail` | Voir les logs en temps réel |
| `npm run cf-whoami` | Voir vos infos Cloudflare |

## ❓ Problèmes Courants

### "Missing account_id"
➡️ Ajoutez votre Account ID dans `wrangler.jsonc` (étape 2)

### "Not authenticated"
➡️ Reconnectez-vous: `npm run cf-login`

### Le site ne fonctionne pas correctement
➡️ Uploadez vos secrets: `npm run deploy:secrets`

### Voir les erreurs
➡️ Logs en temps réel: `npm run cf-tail`

## 🎉 Prochaines Étapes

1. **Testez votre site** sur l'URL `.workers.dev`
2. **Ajoutez un domaine personnalisé** (voir `DEPLOYMENT.md`)
3. **Configurez votre Shopify** pour utiliser le nouveau domaine

---

**Plus de détails?** → Consultez `DEPLOYMENT.md` pour le guide complet.
