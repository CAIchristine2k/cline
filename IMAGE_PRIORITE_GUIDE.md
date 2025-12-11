# 📸 Guide de Priorité des Images - C'Line Hair

## 🎯 Règle Absolue

**Pour TOUS les produits affichés sur le site, utiliser TOUJOURS `product.featuredImage` en priorité.**

Cette règle garantit que **la photo principale définie dans Shopify Admin** est toujours affichée en premier, indépendamment des variantes ou des images secondaires.

---

## ✅ Implémentation Actuelle

### 1. Page Produit (`products.$handle.tsx`)

**Ligne 778-780** :
```typescript
// PRIORITÉ 1: Featured Image (photo principale définie dans Shopify)
if (product.featuredImage?.url) {
  console.log('✅ Using Shopify FEATURED image:', product.featuredImage.url);
  setActiveImage(product.featuredImage);
}
```

**Ordre de priorité :**
1. ✅ `product.featuredImage` (photo principale Shopify)
2. ⚠️ `allProductImages[0]` (première image dans images.nodes)
3. ⚠️ `newVariantImages[0]` (images custom de la variante)
4. ⚠️ `currentVariant.image` (image de la variante)

**Comportement :**
- Au chargement d'un nouveau produit : Affiche `product.featuredImage`
- Lors d'un changement de variante/couleur : **Ne change PAS** l'image principale

---

### 2. Panier (`CartLineItem.tsx`)

**Ligne 332-335** :
```typescript
// Determine what image to display - ALWAYS use featured image for ALL products
// PRIORITÉ ABSOLUE: product.featuredImage (photo principale définie dans Shopify)
let displayImageUrl = product?.featuredImage?.url || merchandise?.image?.url || '';
let displayImageType = 'FEATURED_IMAGE';
```

**Ligne 403-407** (Vérification finale) :
```typescript
// VÉRIFICATION FINALE: Si on n'a toujours pas d'image et qu'on a product.featuredImage, l'utiliser
if (!displayImageUrl && product?.featuredImage?.url) {
  displayImageUrl = product.featuredImage.url;
  displayImageType = 'FEATURED_FALLBACK';
}
```

**Ordre de priorité :**
1. ✅ `product.featuredImage.url` (photo principale Shopify)
2. ⚠️ `merchandise.image.url` (image de la variante, fallback)
3. ⚠️ Custom design images (pour produits personnalisés)

---

### 3. Cartes Produit (`ProductCard.tsx`)

**Ligne 64** :
```typescript
const productImage = featuredImage || (firstVariant as any)?.image || null;
```

**Ordre de priorité :**
1. ✅ `featuredImage` (photo principale Shopify)
2. ⚠️ `firstVariant.image` (fallback)

---

### 4. Liste Produit (`ProductItem.tsx`)

**Ligne 42** :
```typescript
const featuredImage = 'featuredImage' in product ? product.featuredImage : ('image' in product ? product.image : undefined);
```

**Ordre de priorité :**
1. ✅ `product.featuredImage`
2. ⚠️ `product.image` (fallback pour collections)

---

## 📊 Queries GraphQL

### Fragment Cart (`app/lib/fragments.ts`)

**Lignes 45-58** :
```graphql
product {
  handle
  title
  id
  vendor
  description
  featuredImage {
    id
    url
    altText
    width
    height
  }
}
```

✅ **`featuredImage` est bien récupéré dans le panier**

---

### Query Product Details (`products.$handle.tsx`)

**Lignes 1614-1620** :
```graphql
featuredImage {
  id
  url(transform: {maxWidth: 800, maxHeight: 800, crop: CENTER})
  altText
  width
  height
}
```

✅ **`featuredImage` est bien récupéré dans la page produit**

---

### Query Collections

Toutes les queries de collections (`collections.$handle.tsx`, `products._index.tsx`, etc.) incluent :
```graphql
featuredImage {
  id
  url
  altText
  width
  height
}
```

✅ **`featuredImage` est bien récupéré partout**

---

## 🔧 Checklist pour Nouveaux Produits

Quand vous ajoutez un nouveau produit dans Shopify Admin :

1. **Uploader toutes les photos du produit**
2. **Définir la photo principale** :
   - Dans Shopify Admin → Produits → [Votre Produit]
   - Glisser-déposer la photo principale EN PREMIER dans la liste des médias
   - La première image devient automatiquement `featuredImage`
3. **Vérifier l'affichage** :
   - Page produit : ✅ Affiche la première image
   - Panier : ✅ Affiche la première image
   - Cartes produit : ✅ Affiche la première image
4. **Ne PAS définir d'image spécifique pour chaque variante** (sauf si vraiment nécessaire)

---

## 🚨 Erreurs à Éviter

### ❌ NE JAMAIS faire :

```typescript
// ❌ MAUVAIS : Utilise l'image de la variante en premier
const image = currentVariant.image?.url || product.featuredImage?.url;

// ❌ MAUVAIS : Utilise merchandise.image en premier
const image = merchandise.image?.url || product.featuredImage?.url;

// ❌ MAUVAIS : Utilise images.nodes[0] sans vérifier featuredImage
const image = product.images.nodes[0]?.url;
```

### ✅ TOUJOURS faire :

```typescript
// ✅ BON : Utilise featuredImage en premier
const image = product.featuredImage?.url || currentVariant.image?.url;

// ✅ BON : Utilise featuredImage en priorité absolue
const image = product.featuredImage?.url || merchandise.image?.url || '';

// ✅ BON : Vérifie featuredImage d'abord
if (product.featuredImage?.url) {
  setActiveImage(product.featuredImage);
}
```

---

## 🎨 Cas Spéciaux

### Produits avec Images par Couleur

Pour les produits avec des images spécifiques à chaque couleur (ex: MELISSA, SOLEIL) :

1. **Photo principale** : Image "neutre" ou image de la couleur la plus populaire
2. **Images secondaires** : Images des autres couleurs
3. **Affichage** :
   - Page produit : Affiche `featuredImage` par défaut
   - Changement de couleur : L'image principale reste la même
   - Galerie : Toutes les images sont accessibles via les thumbnails

### Produits Personnalisables (Custom Designs)

Pour les produits avec designs personnalisés :

1. **Priorité 1** : Custom design de l'utilisateur (si existe)
2. **Priorité 2** : `product.featuredImage` (photo du produit vierge)
3. **Fallback** : `merchandise.image`

---

## 🧪 Tests de Vérification

Pour tester que tout fonctionne correctement :

1. **Test page produit** :
   ```
   - Aller sur une page produit
   - Vérifier que la première image affichée = photo principale Shopify
   - Changer de couleur/variante
   - Vérifier que l'image principale ne change PAS
   ```

2. **Test panier** :
   ```
   - Ajouter un produit au panier
   - Ouvrir le panier
   - Vérifier que l'image affichée = photo principale Shopify
   ```

3. **Test cartes produit** :
   ```
   - Aller sur une page collection
   - Vérifier que toutes les cartes affichent la photo principale
   ```

4. **Logs de debug** :
   ```
   - Ouvrir la console navigateur (F12)
   - Chercher "🖼️ [IMAGE DEBUG]"
   - Vérifier "✅ Using Shopify FEATURED image"
   ```

---

## 📋 Résumé

| Composant | Priorité 1 | Priorité 2 | Priorité 3 |
|-----------|------------|------------|------------|
| Page Produit | `product.featuredImage` | `allProductImages[0]` | `currentVariant.image` |
| Panier | `product.featuredImage` | `merchandise.image` | Custom design |
| ProductCard | `featuredImage` | `firstVariant.image` | - |
| ProductItem | `product.featuredImage` | `product.image` | - |

**Règle d'Or** : `product.featuredImage` TOUJOURS en premier ! 🏆

---

**Date de création :** 2025-12-11
**Dernière mise à jour :** 2025-12-11
**Version :** 1.0

*Guide créé pour C'Line Hair - Shopify Hydrogen + Cloudflare Workers*
