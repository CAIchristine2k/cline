# 📸 Gestion des Assets - C'LINE HAIR

## 📋 Vue d'ensemble

Tous les chemins d'images et assets sont centralisés dans un seul fichier de configuration pour faciliter la maintenance et éviter les images manquantes.

## 🗂️ Structure

### Fichier de Configuration Principal
**`app/utils/assetsConfig.ts`**

Ce fichier contient:
- 💳 Logos de paiement (Visa, Mastercard, Apple Pay, etc.)
- 🏢 Logos de la marque (principal, footer)
- 📁 Images de catégories
- 👤 Avatars/Images clients
- 📢 Assets marketing (livraison gratuite, tips, etc.)
- 🎠 Images de carrousel/hero

### Composant SafeImage
**`app/components/SafeImage.tsx`**

Composant React avec gestion automatique des fallbacks:
- Affiche un placeholder SVG si l'image n'existe pas
- Support de plusieurs niveaux de fallback
- Peut masquer l'image gracieusement ou afficher un placeholder

## 🎯 Utilisation

### Import Simple

```typescript
import {PAYMENT_LOGOS, CATEGORY_IMAGES, MARKETING_ASSETS} from '~/utils/assetsConfig';
import {SafeImage} from '~/components/SafeImage';
```

### Exemple 1: Images de Paiement

```typescript
// Avant ❌
<img src="/images/visa.png" alt="Visa" />

// Après ✅
import {PAYMENT_LOGOS, getImageWithFallback} from '~/utils/assetsConfig';

<img
  {...getImageWithFallback(PAYMENT_LOGOS.visa.src, PAYMENT_LOGOS.visa.fallback)}
  alt={PAYMENT_LOGOS.visa.alt}
  className="h-6 w-auto"
/>
```

### Exemple 2: Images de Catégories avec Placeholder

```typescript
// Avant ❌
<img src="/images/category-perruques.jpg" alt="Perruques" />

// Après ✅
import {CATEGORY_IMAGES} from '~/utils/assetsConfig';
import {SafeImage} from '~/components/SafeImage';

<SafeImage
  src={CATEGORY_IMAGES.perruques}
  alt="Perruques"
  showPlaceholder={true}
  className="w-full h-full object-cover"
/>
```

### Exemple 3: Assets Marketing

```typescript
import {MARKETING_ASSETS, getImageWithFallback} from '~/utils/assetsConfig';

<img
  {...getImageWithFallback(MARKETING_ASSETS.freeShipping, null)}
  alt="Livraison rapide gratuite"
  className="h-24 w-auto"
/>
```

## 📦 Assets Disponibles

### 💳 PAYMENT_LOGOS
- `amex` - American Express
- `applePay` - Apple Pay
- `googlePay` - Google Pay
- `mastercard` - Mastercard
- `visa` - Visa
- `shopPay` - Shop Pay

### 🏢 BRAND_LOGOS
- `main` - Logo principal (/images/logo.png)
- `footer` - Logo footer (/images/footer-logo.png)

### 📁 CATEGORY_IMAGES
- `bundles` - Bundles
- `colored` - Naturelles
- `halfwig` - Synthétique
- `hdlace` - Accessoires
- `mcap` - Perruques
- `newArrivals` - Closures

### 👤 AVATAR_IMAGES
- `default` - Avatar par défaut
- `client1` à `client7` - Images clients

### 📢 MARKETING_ASSETS
- `freeShipping` - Badge livraison gratuite
- `tips` - Astuces de pose
- `clients50k` - 50k clients
- `backgroundFete` - Background fête
- `enterprise` - Entreprise

### 🎠 HERO_IMAGES
- `card1` - Carte carrousel 1
- `card2` - Carte carrousel 2

## 🔧 Fonctions Utilitaires

### `getImageWithFallback(src, fallback)`

Retourne un objet avec `src` et `onError` handler pour gérer les fallbacks automatiquement.

```typescript
const imageProps = getImageWithFallback(
  '/images/primary.png',
  '/images/fallback.png'
);

<img {...imageProps} alt="Description" />
```

### `imageExists(src): Promise<boolean>`

Vérifie si une image existe (côté client uniquement).

```typescript
const exists = await imageExists('/images/logo.png');
if (exists) {
  // Image existe
}
```

### `preloadImages(srcs: string[])`

Précharge des images pour améliorer les performances.

```typescript
preloadImages([
  PAYMENT_LOGOS.visa.src,
  PAYMENT_LOGOS.mastercard.src,
  CATEGORY_IMAGES.bundles
]);
```

## ✅ Composants Mis à Jour

Les composants suivants utilisent maintenant la configuration centralisée:

- ✅ `Footer.tsx` - Logos de paiement
- ✅ `FooterLogo.tsx` - Logo de la marque
- ✅ `TrustBadges.tsx` - Logos Apple Pay
- ✅ `AIMediaGeneration.tsx` - Image tips
- ✅ `CategoryGrid.tsx` - Images de catégories
- ✅ `($locale).products.$handle.tsx` - Livraison gratuite

## 🎨 Placeholder par Défaut

Un placeholder SVG est disponible via `PLACEHOLDER_IMAGE`:

```typescript
import {PLACEHOLDER_IMAGE} from '~/utils/assetsConfig';

<img src={PLACEHOLDER_IMAGE} alt="Placeholder" />
```

Le placeholder affiche un rectangle gris avec le texte "Image".

## 🚀 Bonnes Pratiques

1. **Toujours utiliser la config centralisée** plutôt que des chemins hardcodés
2. **Utiliser `SafeImage`** pour les images qui peuvent manquer
3. **Ajouter des fallbacks** pour les images critiques
4. **Précharger** les images importantes avec `preloadImages()`
5. **Documenter** les nouvelles images ajoutées dans `assetsConfig.ts`

## 📝 Ajouter une Nouvelle Image

1. Placer l'image dans `/public/images/`
2. Ajouter la référence dans `assetsConfig.ts`:

```typescript
export const NEW_CATEGORY = {
  myNewImage: '/images/my-new-image.png',
} as const;
```

3. Utiliser dans les composants:

```typescript
import {NEW_CATEGORY} from '~/utils/assetsConfig';

<img src={NEW_CATEGORY.myNewImage} alt="Description" />
```

## 🐛 Dépannage

### Image ne s'affiche pas
1. Vérifier que le fichier existe dans `/public/images/`
2. Vérifier l'extension du fichier (png, jpg, webp, svg)
3. Vérifier que le chemin dans `assetsConfig.ts` est correct
4. Utiliser `SafeImage` avec `showPlaceholder={true}` pour debug

### Fallback ne fonctionne pas
1. S'assurer que le fallback existe aussi
2. Vérifier la console navigateur pour les erreurs
3. Utiliser `imageExists()` pour tester les chemins

## 📊 Performance

- Les images sont chargées à la demande
- Utilisez `loading="lazy"` pour les images below the fold
- Utilisez `loading="eager"` pour les images hero/critiques
- Préchargez les images importantes avec `preloadImages()`

---

**Dernière mise à jour:** 28 novembre 2025
**Mainteneur:** C'LINE Development Team
