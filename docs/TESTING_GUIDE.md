# 🧪 Guide de Test du Système de Collections

## ✅ CHECKLIST COMPLÈTE DE CONFIGURATION

### Étape 1: Configuration Shopify (Admin)

#### 1.1 Créer le Metafield
- [ ] Aller dans **Paramètres** → **Métachamps** → **Produits**
- [ ] Créer: `custom.types_cheveux` (Texte, ligne unique)
- [ ] Sauvegarder

#### 1.2 Créer les Collections Automatiques

**Collections Principales:**
- [ ] Créer `naturelles` avec condition: `metafield.custom.types_cheveux EST ÉGAL À hh`
- [ ] Créer `synthetique` avec condition: `metafield.custom.types_cheveux EST ÉGAL À sn`

**Collections par Type:**
- [ ] Créer `perruques` avec condition: `product_type EST ÉGAL À perruques`
- [ ] Créer `bundles` avec condition: `product_type EST ÉGAL À bundle`
- [ ] Créer `closure` avec condition: `product_type EST ÉGAL À closure`
- [ ] Créer `ponytail` avec condition: `product_type EST ÉGAL À ponytail`
- [ ] Créer `bulk` avec condition: `product_type EST ÉGAL À bulk`

#### 1.3 Configurer les Produits

Pour chaque produit:
- [ ] Définir le **Type de produit** (product_type)
- [ ] Définir le **Metafield** `custom.types_cheveux`

**Exemple de produit test:**
```
Nom: Perruque Lisse 22"
Type de produit: perruques
Type de cheveux: hh

→ Devrait apparaître dans:
  ✓ /collections/naturelles
  ✓ /collections/naturelles/perruques
```

---

### Étape 2: Déploiement du Code Hydrogen

#### 2.1 Vérifier les Fichiers Créés
```bash
ls -la app/routes/($locale).collections.$main.tsx
ls -la app/routes/($locale).collections.$main.$sub.tsx
ls -la app/utils/collectionConfig.ts
```

#### 2.2 Vérifier les Imports
Dans `collectionConfig.ts`:
```bash
grep -n "export function resolveCollectionParams" app/utils/collectionConfig.ts
```

#### 2.3 Build et Déploiement
```bash
# Test local
npm run dev

# Build production
npm run build

# Déployer
npm run deploy
```

---

### Étape 3: Tests des Routes

#### 3.1 Test des Catégories Principales

**Test 1: Naturelles**
- [ ] Aller sur: `http://localhost:5173/collections/naturelles`
- [ ] Vérifier: Titre = "Naturelles"
- [ ] Vérifier: Produits affichés ont `custom.types_cheveux = hh`
- [ ] Vérifier: Breadcrumb fonctionne
- [ ] Vérifier: Section "Explorer par type" visible

**Test 2: Synthétique**
- [ ] Aller sur: `http://localhost:5173/collections/synthetique`
- [ ] Vérifier: Titre = "Synthétique"
- [ ] Vérifier: Produits affichés ont `custom.types_cheveux = sn`
- [ ] Vérifier: Breadcrumb fonctionne
- [ ] Vérifier: Section "Explorer par type" visible

#### 3.2 Test des Sous-Catégories Naturelles

**Test 3: Perruques Naturelles**
- [ ] Aller sur: `http://localhost:5173/collections/naturelles/perruques`
- [ ] Vérifier: Titre = "Naturelles - Perruques"
- [ ] Vérifier: Produits ont `custom.types_cheveux = hh` ET `product_type = perruques`
- [ ] Vérifier: Bouton "Retour à Naturelles" fonctionne
- [ ] Vérifier: Navigation vers autres types fonctionne

**Test 4: Bundles Naturels**
- [ ] Aller sur: `http://localhost:5173/collections/naturelles/bundles`
- [ ] Vérifier: Titre = "Naturelles - Bundles"
- [ ] Vérifier: Produits ont `custom.types_cheveux = hh` ET `product_type = bundle`

**Test 5: Closure Naturels**
- [ ] Aller sur: `http://localhost:5173/collections/naturelles/closure`
- [ ] Vérifier: Filtrage correct

**Test 6: Ponytail Naturels**
- [ ] Aller sur: `http://localhost:5173/collections/naturelles/ponytail`
- [ ] Vérifier: Filtrage correct

**Test 7: Bulk Naturel**
- [ ] Aller sur: `http://localhost:5173/collections/naturelles/bulk`
- [ ] Vérifier: Filtrage correct

#### 3.3 Test des Sous-Catégories Synthétique

**Test 8-12: Répéter les tests 3-7 pour synthétique**
- [ ] `/collections/synthetique/perruques`
- [ ] `/collections/synthetique/bundles`
- [ ] `/collections/synthetique/closure`
- [ ] `/collections/synthetique/ponytail`
- [ ] `/collections/synthetique/bulk`

---

### Étape 4: Test de la Navigation

#### 4.1 Test du Header Desktop
- [ ] Ouvrir le site en vue desktop (>1024px)
- [ ] Cliquer sur "NATURELLES"
- [ ] Vérifier: Menu déroulant apparaît
- [ ] Cliquer sur "Perruques" → Redirige vers `/collections/naturelles/perruques`
- [ ] Répéter pour "SYNTHÉTIQUE"

#### 4.2 Test du Header Mobile
- [ ] Ouvrir le site en vue mobile (<768px)
- [ ] Cliquer sur l'icône menu hamburger
- [ ] Cliquer sur "NATURELLES" → Expand le sous-menu
- [ ] Cliquer sur "Perruques" → Redirige correctement
- [ ] Fermer le menu mobile → Fonctionne

#### 4.3 Test des Liens de Navigation Interne
- [ ] Sur `/collections/naturelles` → Cliquer sur "Perruques" dans "Explorer par type"
- [ ] Sur `/collections/naturelles/perruques` → Cliquer sur "Voir tous les produits naturels"
- [ ] Vérifier: Tous les liens internes fonctionnent

---

### Étape 5: Test des Cas d'Erreur

#### 5.1 URLs Invalides
**Test: Collection principale invalide**
- [ ] Aller sur: `/collections/invalide`
- [ ] Vérifier: Erreur 404

**Test: Sous-catégorie invalide**
- [ ] Aller sur: `/collections/naturelles/invalide`
- [ ] Vérifier: Erreur 404

**Test: Combinaison invalide**
- [ ] Aller sur: `/collections/invalide/perruques`
- [ ] Vérifier: Erreur 404

#### 5.2 Collections Vides
**Test: Collection sans produits**
- [ ] Créer une collection vide dans Shopify
- [ ] Visiter l'URL
- [ ] Vérifier: Message "Aucun produit disponible" s'affiche
- [ ] Vérifier: Bouton retour fonctionne

---

### Étape 6: Test des Performances

#### 6.1 Vitesse de Chargement
```bash
# Test avec Lighthouse
npm run build
npm run preview
# Ouvrir DevTools → Lighthouse → Run audit
```

**Cibles:**
- [ ] Performance > 80
- [ ] SEO > 90
- [ ] Accessibility > 90

#### 6.2 Test de Cache
- [ ] Visiter `/collections/naturelles`
- [ ] Vérifier: Cache-Control headers présents
- [ ] Revisiter la même page
- [ ] Vérifier: Chargement plus rapide

---

### Étape 7: Test SEO

#### 7.1 Balises Meta
```bash
curl -s http://localhost:5173/collections/naturelles | grep "<title>"
curl -s http://localhost:5173/collections/naturelles | grep "description"
```

- [ ] Vérifier: Title tag présent et correct
- [ ] Vérifier: Meta description présente
- [ ] Vérifier: H1 présent avec bon texte

#### 7.2 Structured Data
- [ ] Ouvrir Google Rich Results Test
- [ ] Tester une URL de collection
- [ ] Vérifier: Pas d'erreurs critiques

---

### Étape 8: Test Cross-Browser

**Browsers à tester:**
- [ ] Chrome (dernière version)
- [ ] Firefox (dernière version)
- [ ] Safari (dernière version)
- [ ] Edge (dernière version)
- [ ] Safari iOS (mobile)
- [ ] Chrome Android (mobile)

**Points à vérifier:**
- [ ] Navigation fonctionne
- [ ] Styles s'affichent correctement
- [ ] Pas d'erreurs console
- [ ] Responsive design OK

---

## 🐛 DÉPANNAGE

### Problème: "Collection non trouvée" (404)

**Causes possibles:**
1. Handle de collection incorrect
2. Route Hydrogen pas déployée
3. Typo dans l'URL

**Solution:**
```bash
# Vérifier les routes
ls app/routes/($locale).collections.*

# Vérifier la config
cat app/utils/collectionConfig.ts | grep -A 5 "MAIN_CATEGORIES"

# Redémarrer le serveur
npm run dev
```

### Problème: Produits ne s'affichent pas

**Causes possibles:**
1. Metafield pas défini sur les produits
2. Query GraphQL incorrecte
3. Collections Shopify mal configurées

**Solution:**
```bash
# Tester la query directement
# Dans Shopify Admin → Apps → GraphiQL

query {
  products(first: 5, query: "(custom.types_cheveux:hh)") {
    nodes {
      title
      metafields(namespace: "custom", keys: ["types_cheveux"]) {
        key
        value
      }
    }
  }
}
```

### Problème: Menu ne s'affiche pas

**Causes possibles:**
1. Header.tsx pas mis à jour
2. Cache du navigateur
3. Erreur JavaScript

**Solution:**
```bash
# Vider le cache
Cmd+Shift+R (Mac) ou Ctrl+Shift+R (Windows)

# Vérifier les erreurs console
# Ouvrir DevTools → Console

# Vérifier le Header
cat app/components/Header.tsx | grep -A 20 "menuItems"
```

---

## 📊 RAPPORT DE TEST

Après avoir complété tous les tests, remplir ce rapport:

### Résumé
- Date du test: _______________
- Environnement: □ Local □ Staging □ Production
- Testeur: _______________

### Résultats
- Tests réussis: ___ / 50
- Tests échoués: ___ / 50
- Bugs critiques: ___
- Bugs mineurs: ___

### Actions Requises
- [ ] Corriger les bugs critiques
- [ ] Mettre à jour la documentation
- [ ] Former l'équipe
- [ ] Déployer en production

---

## 🎯 PROCHAIN DÉPLOIEMENT

### Pre-deployment Checklist
- [ ] Tous les tests passent
- [ ] Code review complété
- [ ] Documentation à jour
- [ ] Backup de la base de données
- [ ] Plan de rollback prêt

### Déploiement
```bash
# 1. Build
npm run build

# 2. Test du build
npm run preview

# 3. Deploy
npm run deploy

# 4. Vérifier le déploiement
curl -I https://votre-site.com/collections/naturelles

# 5. Smoke test
# Tester manuellement les URLs principales
```

### Post-deployment
- [ ] Vérifier que toutes les URLs fonctionnent
- [ ] Monitorer les erreurs dans Shopify Analytics
- [ ] Vérifier Google Search Console
- [ ] Informer l'équipe du déploiement réussi
