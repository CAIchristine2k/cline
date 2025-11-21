# 📦 Configuration des Collections Shopify - Guide Complet

## 🎯 Approche Simplifiée

✅ **Toute la logique de filtrage se fait dans Shopify** (via les conditions de collection automatiques)
✅ **Hydrogen affiche simplement** les produits de chaque collection
❌ **Aucune logique de filtrage dans le code** Hydrogen

---

## 📋 Liste Complète des Collections à Créer

### 1️⃣ Collections Principales (3)

#### Collection: Naturelles
- **Handle**: `naturelles`
- **Type**: Automatique
- **Condition**:
  ```
  Produit metafield custom.types_cheveux est égal à hh
  ```
- **URL**: `/collections/naturelles`

#### Collection: Synthétique
- **Handle**: `synthetique`
- **Type**: Automatique
- **Condition**:
  ```
  Produit metafield custom.types_cheveux est égal à sn
  ```
- **URL**: `/collections/synthetique`

#### Collection: Perruques (Toutes)
- **Handle**: `perruques`
- **Type**: Automatique
- **Condition**:
  ```
  Type de produit est égal à perruques
  ```
- **URL**: `/collections/perruques`

---

### 2️⃣ Collections Naturelles + Type (5)

#### Collection: Naturelles - Perruques
- **Handle**: `naturelles-perruques`
- **Type**: Automatique
- **Conditions**:
  ```
  Produit metafield custom.types_cheveux est égal à hh
  ET
  Type de produit est égal à perruques
  ```
- **URL**: `/collections/naturelles-perruques`

#### Collection: Naturelles - Bundles
- **Handle**: `naturelles-bundles`
- **Type**: Automatique
- **Conditions**:
  ```
  Produit metafield custom.types_cheveux est égal à hh
  ET
  Type de produit est égal à bundle
  ```
- **URL**: `/collections/naturelles-bundles`

#### Collection: Naturelles - Closure
- **Handle**: `naturelles-closure`
- **Type**: Automatique
- **Conditions**:
  ```
  Produit metafield custom.types_cheveux est égal à hh
  ET
  Type de produit est égal à closure
  ```
- **URL**: `/collections/naturelles-closure`

#### Collection: Naturelles - Ponytail
- **Handle**: `naturelles-ponytail`
- **Type**: Automatique
- **Conditions**:
  ```
  Produit metafield custom.types_cheveux est égal à hh
  ET
  Type de produit est égal à ponytail
  ```
- **URL**: `/collections/naturelles-ponytail`

#### Collection: Naturelles - Bulk
- **Handle**: `naturelles-bulk`
- **Type**: Automatique
- **Conditions**:
  ```
  Produit metafield custom.types_cheveux est égal à hh
  ET
  Type de produit est égal à bulk
  ```
- **URL**: `/collections/naturelles-bulk`

---

### 3️⃣ Collections Synthétique + Type (5)

#### Collection: Synthétique - Perruques
- **Handle**: `synthetique-perruques`
- **Type**: Automatique
- **Conditions**:
  ```
  Produit metafield custom.types_cheveux est égal à sn
  ET
  Type de produit est égal à perruques
  ```
- **URL**: `/collections/synthetique-perruques`

#### Collection: Synthétique - Bundles
- **Handle**: `synthetique-bundles`
- **Type**: Automatique
- **Conditions**:
  ```
  Produit metafield custom.types_cheveux est égal à sn
  ET
  Type de produit est égal à bundle
  ```
- **URL**: `/collections/synthetique-bundles`

#### Collection: Synthétique - Closure
- **Handle**: `synthetique-closure`
- **Type**: Automatique
- **Conditions**:
  ```
  Produit metafield custom.types_cheveux est égal à sn
  ET
  Type de produit est égal à closure
  ```
- **URL**: `/collections/synthetique-closure`

#### Collection: Synthétique - Ponytail
- **Handle**: `synthetique-ponytail`
- **Type**: Automatique
- **Conditions**:
  ```
  Produit metafield custom.types_cheveux est égal à sn
  ET
  Type de produit est égal à ponytail
  ```
- **URL**: `/collections/synthetique-ponytail`

#### Collection: Synthétique - Bulk
- **Handle**: `synthetique-bulk`
- **Type**: Automatique
- **Conditions**:
  ```
  Produit metafield custom.types_cheveux est égal à sn
  ET
  Type de produit est égal à bulk
  ```
- **URL**: `/collections/synthetique-bulk`

---

### 4️⃣ Collection Best Sellers (Optionnelle)

#### Collection: Best Sellers
- **Handle**: `best-sellers`
- **Type**: Manuelle ou Automatique
- **Condition** (si automatique):
  ```
  Produit tag contient "best-seller"
  ```
- **URL**: `/collections/best-sellers`

---

## 🔧 Étape 1: Créer le Metafield

Avant de créer les collections, configurez le metafield produit :

1. Aller dans **Paramètres** → **Métachamps**
2. Cliquer sur **Produits**
3. Cliquer sur **Ajouter une définition**
4. Configurer:
   - **Nom**: Type de cheveux
   - **Namespace et clé**: `custom.types_cheveux`
   - **Type**: Texte (ligne unique)
   - **Valeurs possibles**:
     - `hh` = Cheveux naturels
     - `sn` = Cheveux synthétiques

---

## 📝 Étape 2: Configuration des Produits

Pour chaque produit dans Shopify :

1. **Type de produit** (Product Type):
   - Choisir parmi: `perruques`, `bundle`, `closure`, `ponytail`, `bulk`

2. **Metafield Type de cheveux**:
   - Aller dans le produit → Section **Métachamps**
   - Trouver "Type de cheveux"
   - Entrer: `hh` (naturel) OU `sn` (synthétique)

### Exemple de configuration:

```
Produit: "Perruque Lisse 22 pouces"
├── Type de produit: perruques
└── Type de cheveux: hh

→ Apparaîtra automatiquement dans:
  ✅ Collection "Naturelles" (/collections/naturelles)
  ✅ Collection "Perruques" (/collections/perruques)
  ✅ Collection "Naturelles - Perruques" (/collections/naturelles-perruques)
```

---

## ✅ Checklist de Configuration

### Shopify Admin
- [ ] Créer le metafield `custom.types_cheveux`
- [ ] Créer les 3 collections principales (naturelles, synthetique, perruques)
- [ ] Créer les 5 collections Naturelles + Type
- [ ] Créer les 5 collections Synthétique + Type
- [ ] Créer la collection Best Sellers (optionnel)

### Produits
- [ ] Définir le `Type de produit` sur chaque produit
- [ ] Définir le metafield `Type de cheveux` sur chaque produit
- [ ] Vérifier que les produits apparaissent dans les bonnes collections

### Test
- [ ] Tester toutes les URLs de collections
- [ ] Vérifier que les produits s'affichent correctement
- [ ] Tester la navigation dans le header

---

## 🎯 Résumé

**Total: 14 collections à créer**
- 3 collections principales
- 5 collections Naturelles + Type
- 5 collections Synthétique + Type
- 1 collection Best Sellers (optionnel)

**Toute la logique est dans Shopify !**
Hydrogen se contente d'afficher `collection.products` pour chaque handle.

---

## 🐛 Dépannage

### Les produits n'apparaissent pas :
1. Vérifier le metafield `custom.types_cheveux` sur le produit
2. Vérifier le `Type de produit` sur le produit
3. Attendre 1-2 minutes (les collections automatiques peuvent prendre du temps)
4. Rafraîchir la collection dans Shopify Admin

### Une URL ne fonctionne pas :
1. Vérifier que la collection existe dans Shopify
2. Vérifier que le handle correspond exactement (ex: `naturelles-perruques`)
3. Vérifier les logs du serveur de développement
