# 🛠️ Guide de Configuration Shopify - Étape par Étape

## 📋 Vue d'ensemble

Ce guide vous explique comment configurer Shopify pour que votre site Hydrogen affiche correctement les produits filtrés par catégorie.

---

## 🎯 Étape 1: Créer le Metafield "types_cheveux"

### 1.1 Accéder aux Métachamps

1. Connectez-vous à votre **Shopify Admin**
2. Dans le menu de gauche, cliquez sur **Paramètres** (Settings) en bas
3. Cliquez sur **Métachamps** (Metafields) dans la liste
4. Sélectionnez **Produits** (Products)

### 1.2 Créer le Métachamp

1. Cliquez sur **Ajouter une définition** (Add definition)
2. Remplissez les champs suivants:

   **Nom** (Name): `Types de cheveux`

   **Namespace et clé** (Namespace and key):
   - Namespace: `custom`
   - Key: `types_cheveux`

   **Type**: `Texte, ligne unique` (Single line text)

   **Description** (optionnel):
   ```
   Type de cheveux: hh pour naturel, sn pour synthétique
   ```

3. Cliquez sur **Enregistrer** (Save)

### 1.3 Vérification

✅ Vous devriez maintenant voir `custom.types_cheveux` dans la liste des métachamps pour les produits.

---

## 📦 Étape 2: Créer les Collections Automatiques

### 2.1 Collection "Naturelles"

1. Dans le menu de gauche, allez dans **Produits** → **Collections**
2. Cliquez sur **Créer une collection** (Create collection)
3. Remplissez les champs:

   **Titre**: `Naturelles`

   **Handle** (URL): `naturelles` (doit être exactement ça, en minuscules)

   **Description** (optionnel):
   ```
   Collection de produits en cheveux 100% naturels
   ```

4. Dans **Type de collection**, sélectionnez **Automatisé** (Automated)

5. Dans **Conditions**, configurez:
   - Cliquez sur **Ajouter une condition**
   - **Propriété**: Sélectionnez `custom.types_cheveux` (Métachamp)
   - **Condition**: `EST ÉGAL À` (is equal to)
   - **Valeur**: `hh`

6. Cliquez sur **Enregistrer** (Save)

### 2.2 Collection "Synthétique"

Répétez les mêmes étapes que ci-dessus avec:

   **Titre**: `Synthétique`

   **Handle**: `synthetique` (exactement ça, en minuscules)

   **Description** (optionnel):
   ```
   Collection de produits en cheveux synthétiques
   ```

   **Type**: **Automatisé** (Automated)

   **Condition**:
   - `custom.types_cheveux` `EST ÉGAL À` `sn`

### 2.3 Vérification

✅ Vous devriez maintenant avoir 2 collections automatiques:
- `naturelles` (filtre les produits avec `types_cheveux = hh`)
- `synthetique` (filtre les produits avec `types_cheveux = sn`)

---

## 🏷️ Étape 3: Configurer les Produits

### 3.1 Définir le Type de Produit

Pour chaque produit:

1. Allez dans **Produits** → Sélectionnez un produit
2. Trouvez le champ **Type de produit** (Product type)
3. Entrez **exactement** l'une de ces valeurs (en minuscules):
   - `perruques`
   - `bundle`
   - `closure`
   - `ponytail`
   - `bulk`

**⚠️ Important**: Respectez la casse exacte (tout en minuscules)

### 3.2 Définir le Métachamp "types_cheveux"

Pour chaque produit:

1. Toujours dans la page du produit, **scrollez vers le bas**
2. Trouvez la section **Métachamps** (Metafields)
3. Vous devriez voir le champ `Types de cheveux` que vous avez créé
4. Entrez **exactement** l'une de ces valeurs:
   - `hh` (pour cheveux naturels)
   - `sn` (pour cheveux synthétiques)

**⚠️ Important**:
- Utilisez uniquement `hh` ou `sn`
- Tout en minuscules
- Pas d'espaces

### 3.3 Exemple Complet

**Exemple 1: Perruque Naturelle**
```
Nom du produit: Perruque Lisse 22"
Type de produit: perruques
Métachamp types_cheveux: hh

→ Apparaîtra dans:
  ✅ /collections/naturelles
  ✅ /collections/naturelles/perruques
  ✅ /collections/perruques (section Naturelles)
```

**Exemple 2: Bundle Synthétique**
```
Nom du produit: Bundle Ondulé 3x18"
Type de produit: bundle
Métachamp types_cheveux: sn

→ Apparaîtra dans:
  ✅ /collections/synthetique
  ✅ /collections/synthetique/bundles
```

---

## 📊 Étape 4: Configuration en Masse (Optionnel)

Si vous avez beaucoup de produits, utilisez l'import CSV:

### 4.1 Exporter vos Produits

1. Allez dans **Produits**
2. Cliquez sur **Exporter** (Export) en haut à droite
3. Sélectionnez tous les produits
4. Téléchargez le fichier CSV

### 4.2 Modifier le CSV

Ouvrez le CSV dans Excel ou Google Sheets et ajoutez deux colonnes:

| Title | Handle | Product Type | Metafield: custom.types_cheveux [single_line_text_field] |
|-------|--------|--------------|----------------------------------------------------------|
| Perruque Lisse 22" | perruque-lisse-22 | perruques | hh |
| Bundle Ondulé 18" | bundle-ondule-18 | bundle | sn |
| Closure Lisse 4x4 | closure-lisse-4x4 | closure | hh |

**Important**: Le nom de la colonne métachamp doit être exactement:
```
Metafield: custom.types_cheveux [single_line_text_field]
```

### 4.3 Réimporter

1. Allez dans **Produits**
2. Cliquez sur **Importer** (Import)
3. Sélectionnez votre fichier CSV modifié
4. Cochez **Remplacer les produits existants** (Overwrite existing products)
5. Cliquez sur **Téléverser et continuer** (Upload and continue)

---

## ✅ Étape 5: Vérification et Tests

### 5.1 Vérifier les Collections Automatiques

1. Allez dans **Produits** → **Collections**
2. Cliquez sur la collection **Naturelles**
3. Vous devriez voir tous les produits avec `types_cheveux = hh`
4. Faites de même pour **Synthétique**

**Si aucun produit n'apparaît**:
- Vérifiez que les produits ont bien le métachamp défini
- Attendez quelques minutes (les collections automatiques peuvent prendre du temps à se mettre à jour)
- Rafraîchissez la page

### 5.2 Tester sur le Site Hydrogen

1. Ouvrez votre site: `http://localhost:5173/`
2. Testez ces URLs:

**Collections principales:**
- http://localhost:5173/collections/naturelles
- http://localhost:5173/collections/synthetique

**Sous-collections:**
- http://localhost:5173/collections/naturelles/perruques
- http://localhost:5173/collections/synthetique/bundles
- http://localhost:5173/collections/naturelles/closure
- etc.

**Page Perruques:**
- http://localhost:5173/collections/perruques

### 5.3 Vérifier les Logs

Ouvrez la console de votre serveur de développement et cherchez:

```
🔍 [Collection Main] Params: { main: 'naturelles', hairType: 'hh', ... }
📦 [Collection Main] Collection found: Yes
📦 [Collection Main] Products found: X
```

**Si vous voyez "Collection found: No"**:
- Vérifiez que les collections existent dans Shopify
- Vérifiez que les handles sont exactement `naturelles` et `synthetique`
- Vérifiez que les collections sont publiées sur votre canal de vente

---

## 🚨 Résolution de Problèmes

### Problème: Collections vides

**Symptôme**: Les collections existent mais ne contiennent aucun produit

**Solutions**:
1. ✅ Vérifiez que les produits ont le métachamp `custom.types_cheveux` défini
2. ✅ Vérifiez que la valeur est exactement `hh` ou `sn` (minuscules)
3. ✅ Attendez 5-10 minutes pour que Shopify mette à jour les collections
4. ✅ Dans Shopify Admin, éditez la collection et sauvegardez-la à nouveau

### Problème: "Collection not found"

**Symptôme**: Erreur 404 ou message "Collection non trouvée"

**Solutions**:
1. ✅ Vérifiez que le handle de la collection est exactement `naturelles` ou `synthetique`
2. ✅ Vérifiez que la collection est publiée sur votre canal de vente (Online Store)
3. ✅ Dans Shopify Admin → Collections → Cliquez sur la collection → Vérifiez "Sales channels"

### Problème: Tous les produits apparaissent partout

**Symptôme**: Les mêmes produits apparaissent dans toutes les catégories

**Solutions**:
1. ✅ Vérifiez que chaque produit a un métachamp `types_cheveux` différent
2. ✅ Vérifiez que le `product_type` est correctement défini sur chaque produit
3. ✅ Redémarrez le serveur de développement (`npm run dev`)

### Problème: Métachamp non visible

**Symptôme**: Le champ "Types de cheveux" n'apparaît pas dans la page produit

**Solutions**:
1. ✅ Vérifiez que vous avez créé le métachamp avec namespace `custom` et key `types_cheveux`
2. ✅ Rafraîchissez la page du produit
3. ✅ Scrollez tout en bas de la page produit (section Métachamps)

---

## 📝 Checklist Finale

Avant de déployer en production, vérifiez:

- [ ] Métachamp `custom.types_cheveux` créé
- [ ] Collection `naturelles` créée (automatique, condition: `types_cheveux = hh`)
- [ ] Collection `synthetique` créée (automatique, condition: `types_cheveux = sn`)
- [ ] Tous les produits ont un `product_type` défini
- [ ] Tous les produits ont un métachamp `types_cheveux` = `hh` ou `sn`
- [ ] Collections publiées sur le canal de vente
- [ ] Test de toutes les URLs de collection sur le site local
- [ ] Vérification des logs du serveur (Collection found: Yes)

---

## 🎯 Valeurs de Référence Rapide

### Métachamp
```
Namespace: custom
Key: types_cheveux
Valeurs possibles: hh | sn
```

### Collections (Handles)
```
naturelles
synthetique
```

### Types de Produit (Product Type)
```
perruques
bundle
closure
ponytail
bulk
```

### Mapping Complet
```
hh = Cheveux naturels (Naturelles)
sn = Cheveux synthétiques (Synthétique)

perruques = Perruques
bundle = Bundles (tissages)
closure = Closures/Frontals
ponytail = Ponytails (queues de cheval)
bulk = Bulk (cheveux en vrac)
```

---

## 📞 Besoin d'Aide?

Si vous rencontrez des problèmes:

1. Consultez les logs du serveur de développement
2. Vérifiez la documentation Shopify sur les métachamps
3. Assurez-vous d'avoir les permissions nécessaires dans Shopify Admin
4. Vérifiez que votre boutique Shopify est sur un plan qui supporte les métachamps

---

**Date de création**: 21 novembre 2024
**Version**: 1.0
**Auteur**: Configuration pour C'Line Hair Shopify
