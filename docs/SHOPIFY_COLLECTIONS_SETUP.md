# 📦 Configuration des Collections Shopify Automatiques

## 🎯 Objectif
Créer un système de collections automatiques basé sur :
- **Metafield produit** : Type de cheveux (custom.types_cheveux)
- **Product Type** : Type de produit Shopify

---

## 🔧 ÉTAPE 1: Créer le Metafield Produit

### Dans Shopify Admin:
1. Aller dans **Paramètres** → **Métachamps**
2. Cliquer sur **Produits**
3. Cliquer sur **Ajouter une définition**
4. Configurer:
   - **Nom**: Type de cheveux
   - **Namespace et clé**: `custom.types_cheveux`
   - **Type**: Texte (ligne unique)
   - **Description**: Définit si le produit est naturel (hh) ou synthétique (sn)
5. Sauvegarder

### Valeurs à utiliser pour chaque produit:
- `hh` = Cheveux naturels
- `sn` = Cheveux synthétiques

---

## 📂 ÉTAPE 2: Créer les Collections Automatiques

### Collections Principales (2)

#### 1. Collection: Naturelles
- **Handle**: `naturelles`
- **Type**: Automatique
- **Condition**:
  ```
  Produit metafield.custom.types_cheveux EST ÉGAL À hh
  ```
- **Description**: Tous les produits à base de cheveux naturels

#### 2. Collection: Synthétique
- **Handle**: `synthetique`
- **Type**: Automatique
- **Condition**:
  ```
  Produit metafield.custom.types_cheveux EST ÉGAL À sn
  ```
- **Description**: Tous les produits à base de cheveux synthétiques

---

### Collections par Type de Produit (5)

#### 3. Collection: Perruques
- **Handle**: `perruques`
- **Type**: Automatique
- **Condition**:
  ```
  Type de produit EST ÉGAL À perruques
  ```
- **Description**: Toutes les perruques (naturelles et synthétiques)

#### 4. Collection: Bundles
- **Handle**: `bundles`
- **Type**: Automatique
- **Condition**:
  ```
  Type de produit EST ÉGAL À bundle
  ```
- **Description**: Tous les bundles/tissages

#### 5. Collection: Closure
- **Handle**: `closure`
- **Type**: Automatique
- **Condition**:
  ```
  Type de produit EST ÉGAL À closure
  ```
- **Description**: Tous les closures et frontals

#### 6. Collection: Ponytail
- **Handle**: `ponytail`
- **Type**: Automatique
- **Condition**:
  ```
  Type de produit EST ÉGAL À ponytail
  ```
- **Description**: Toutes les ponytails/queues de cheval

#### 7. Collection: Bulk
- **Handle**: `bulk`
- **Type**: Automatique
- **Condition**:
  ```
  Type de produit EST ÉGAL À bulk
  ```
- **Description**: Tous les produits en vrac (bulk)

---

## 📝 ÉTAPE 3: Configuration des Produits

### Pour chaque produit dans Shopify:

1. **Définir le Type de produit** (product_type):
   - Choisir parmi: `perruques`, `bundle`, `closure`, `ponytail`, `bulk`

2. **Définir le Metafield Type de cheveux**:
   - Aller dans le produit → Section **Métachamps**
   - Trouver "Type de cheveux"
   - Entrer: `hh` (naturel) OU `sn` (synthétique)

### Exemple de configuration:
```
Produit: "Perruque Lisse 22 pouces"
├── Type de produit: perruques
└── Type de cheveux: hh

→ Apparaîtra dans:
  - /collections/naturelles
  - /collections/perruques
  - /collections/naturelles/perruques ✓
```

---

## 🌐 URLS Générées par Hydrogen

### URLs Principales:
- `/collections/naturelles` → Tous les produits naturels (hh)
- `/collections/synthetique` → Tous les produits synthétiques (sn)

### URLs Combinées (Naturelles):
- `/collections/naturelles/perruques` → Perruques naturelles (hh + perruques)
- `/collections/naturelles/bundles` → Bundles naturels (hh + bundle)
- `/collections/naturelles/closure` → Closures naturels (hh + closure)
- `/collections/naturelles/ponytail` → Ponytails naturels (hh + ponytail)
- `/collections/naturelles/bulk` → Bulk naturel (hh + bulk)

### URLs Combinées (Synthétique):
- `/collections/synthetique/perruques` → Perruques synthétiques (sn + perruques)
- `/collections/synthetique/bundles` → Bundles synthétiques (sn + bundle)
- `/collections/synthetique/closure` → Closures synthétiques (sn + closure)
- `/collections/synthetique/ponytail` → Ponytails synthétiques (sn + ponytail)
- `/collections/synthetique/bulk` → Bulk synthétique (sn + bulk)

---

## 🔍 Mapping des Paramètres

### Main → Hair Type:
```typescript
{
  "naturelles": "hh",
  "synthetique": "sn"
}
```

### Sub → Product Type:
```typescript
{
  "perruques": "perruques",
  "bundles": "bundle",
  "closure": "closure",
  "ponytail": "ponytail",
  "bulk": "bulk"
}
```

---

## ✅ Checklist de Configuration

- [ ] Créer le metafield `custom.types_cheveux`
- [ ] Créer les 2 collections principales (naturelles, synthetique)
- [ ] Créer les 5 collections par type de produit
- [ ] Configurer tous les produits avec:
  - [ ] Type de produit (product_type)
  - [ ] Type de cheveux (metafield custom.types_cheveux)
- [ ] Tester les collections dans Shopify Admin
- [ ] Déployer le code Hydrogen
- [ ] Tester toutes les URLs

---

## 🐛 Dépannage

### Les produits n'apparaissent pas dans les collections:
1. Vérifier que le metafield est bien défini sur le produit
2. Vérifier que le product_type correspond exactement
3. Attendre quelques minutes (les collections automatiques peuvent prendre du temps)
4. Rafraîchir la page de la collection dans Shopify Admin

### Les URLs combinées ne fonctionnent pas:
1. Vérifier que les routes Hydrogen sont déployées
2. Vérifier que le mapping dans `collectionConfig.ts` est correct
3. Vérifier les logs dans la console du développeur
