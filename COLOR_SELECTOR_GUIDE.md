# 🎨 Guide Complet - ColorSelector & ColorSwatches

## ✅ Implémentation Terminée

Le sélecteur de couleur avancé a été implémenté avec succès sur votre site Shopify Hydrogen.

---

## 📦 Composants Créés

### 1. `ColorSwatches.tsx` - Swatches Visuels

Composant de swatches (petits carrés) affichant visuellement chaque couleur.

**Caractéristiques :**
- ✅ Carrés de 48×48px (`w-12 h-12`)
- ✅ Background-image pour chaque couleur
- ✅ Border rose (`border-pink-500`) quand sélectionné
- ✅ Ring rose avec offset quand sélectionné
- ✅ Hover scale + border gris foncé sur les disponibles
- ✅ Opacity 40% + barre diagonale grise pour les épuisés
- ✅ Cursor not-allowed pour les épuisés
- ✅ Espacement de 8px (`gap-2`) entre les carrés
- ✅ Flex-wrap pour grille responsive

**Props :**
```typescript
interface ColorSwatchesProps {
  swatches: ColorSwatch[];      // Liste des couleurs
  selectedValue: string;         // Couleur sélectionnée
  onSelect: (value: string) => void; // Callback de sélection
  className?: string;
}

interface ColorSwatch {
  value: string;        // Nom de la couleur (ex: "Blond", "#TTS4/PK613")
  imageUrl: string;     // URL de l'image de la couleur
  available: boolean;   // Est-ce disponible?
  variantId?: string;   // ID Shopify (optionnel)
}
```

---

### 2. `ColorSelector.tsx` - Sélecteur Complet

Composant complet combinant label, swatches et select.

**Caractéristiques :**
- ✅ Label "Couleur : {nom}" avec nom de la couleur sélectionnée en rose
- ✅ Grille de swatches ColorSwatches
- ✅ Select dropdown synchronisé (optionnel)
- ✅ Synchronisation bidirectionnelle swatches ↔ select
- ✅ Options épuisées marquées "(Épuisé)" dans le select
- ✅ Focus states avec border rose et ring

**Props :**
```typescript
interface ColorSelectorProps {
  label?: string;              // Texte du label (défaut: "Couleur")
  colors: ColorOption[];       // Liste des couleurs
  selectedColor: string;       // Couleur sélectionnée
  onChange: (value: string) => void; // Callback de changement
  showSelect?: boolean;        // Afficher le select (défaut: true)
  className?: string;
}

interface ColorOption {
  value: string;        // Nom de la couleur
  imageUrl: string;     // URL de l'image
  available: boolean;   // Disponibilité
  variantId?: string;   // ID variante Shopify
}
```

---

## 🎯 Intégration dans ProductForm.tsx

Le ColorSelector a été intégré dans `ProductForm.tsx` :

**Emplacement :** Juste après les options non-couleur, avant le sélecteur de quantité

**Code ajouté (lignes 488-514) :**
```typescript
{/* Color Selector with Swatches */}
{colorOptions && colorOptions.length > 0 && (() => {
  // Trouver l'option de couleur dans le produit
  const colorOption = product.options.find((opt) => isColorOption(opt.name));
  if (!colorOption) return null;

  // Couleur actuellement sélectionnée
  const currentColorValue = selectedOptions[colorOption.name] || colorOption.values[0];

  return (
    <ColorSelector
      label="Couleur"
      colors={colorOptions.map((colorOpt) => ({
        value: colorOpt.name,
        imageUrl: colorOpt.imageUrl,
        available: colorOpt.availableForSale,
        variantId: colorOpt.variantId,
      }))}
      selectedColor={currentColorValue}
      onChange={(colorValue) => {
        // Mettre à jour la variante sélectionnée
        updateSelectedVariant(colorOption.name, colorValue);
      }}
      showSelect={true}
    />
  );
})()}
```

**Synchronisation :**
- ✅ Quand l'utilisateur clique un swatch → `updateSelectedVariant()` est appelée
- ✅ Quand l'utilisateur change le select → `updateSelectedVariant()` est appelée
- ✅ La variante Shopify se met à jour automatiquement
- ✅ Le prix, l'image principale, et le stock se mettent à jour
- ✅ Le ColorCarousel (si présent) se synchronise aussi

---

## 🎨 Styles Visuels

### Design Luxe et Propre

**Carrés de couleur (swatches) :**
```css
/* Normal */
w-12 h-12                    /* 48×48px */
rounded-md                   /* Coins arrondis légers */
border-2 border-gray-200     /* Border gris clair */

/* Sélectionné */
border-2 border-pink-500     /* Border rose */
ring-2 ring-pink-500/20      /* Ring rose avec opacité */
ring-offset-2                /* Espace entre border et ring */

/* Hover (disponible) */
hover:border-gray-400        /* Border gris foncé */
hover:scale-105              /* Agrandissement subtil */

/* Indisponible */
opacity-40                   /* Grisé */
cursor-not-allowed           /* Curseur interdit */
+ barre diagonale grise      /* Ligne diagonale */
```

**Select dropdown :**
```css
border-2 border-gray-200     /* Border normale */
focus:border-pink-500        /* Border rose au focus */
focus:ring-2 ring-pink-500/20 /* Ring rose */
rounded-md                   /* Coins arrondis */
```

**Label :**
```css
font-semibold text-gray-900  /* Gras, noir */
text-primary                 /* Nom de couleur en rose */
```

---

## 📊 Exemple de Données

### Exemple de `colorOptions` (fourni par products.$handle.tsx)

```typescript
const colorOptions: ColorOption[] = [
  {
    name: "Blond Platine",
    imageUrl: "https://cdn.shopify.com/s/files/1/.../blond-platine.jpg",
    variantId: "gid://shopify/ProductVariant/123456",
    availableForSale: true
  },
  {
    name: "#TTS4/PK613",
    imageUrl: "https://cdn.shopify.com/s/files/1/.../tts4-pk613.jpg",
    variantId: "gid://shopify/ProductVariant/123457",
    availableForSale: true
  },
  {
    name: "Châtain Foncé",
    imageUrl: "https://cdn.shopify.com/s/files/1/.../chatain-fonce.jpg",
    variantId: "gid://shopify/ProductVariant/123458",
    availableForSale: false // Épuisé
  }
];
```

---

## 🔧 Utilisation Standalone

Si vous voulez utiliser ColorSelector dans une autre page :

```tsx
import {ColorSelector} from '~/components/ColorSelector';

function MyCustomPage() {
  const [selectedColor, setSelectedColor] = useState('Blond Platine');

  const colors = [
    {
      value: 'Blond Platine',
      imageUrl: 'https://cdn.shopify.com/.../blond.jpg',
      available: true,
    },
    {
      value: 'Châtain',
      imageUrl: 'https://cdn.shopify.com/.../chatain.jpg',
      available: true,
    },
    {
      value: 'Noir',
      imageUrl: 'https://cdn.shopify.com/.../noir.jpg',
      available: false,
    },
  ];

  return (
    <ColorSelector
      label="Choisissez votre couleur"
      colors={colors}
      selectedColor={selectedColor}
      onChange={(color) => {
        setSelectedColor(color);
        console.log('Nouvelle couleur sélectionnée:', color);
      }}
      showSelect={true}
    />
  );
}
```

---

## 🔄 Flux de Synchronisation

### 1. Clic sur un Swatch

```
Utilisateur clique swatch "Blond Platine"
    ↓
ColorSwatches.onSelect("Blond Platine")
    ↓
ColorSelector.onChange("Blond Platine")
    ↓
ProductForm.updateSelectedVariant("Couleur", "Blond Platine")
    ↓
Recherche de la variante correspondante dans product.variants
    ↓
setSelectedVariant(variantData)
    ↓
setSelectedOptions({...options, Couleur: "Blond Platine"})
    ↓
Mise à jour du prix, image, stock
    ↓
Re-render du ColorSelector avec nouvelle sélection
```

### 2. Changement dans le Select

```
Utilisateur sélectionne "Châtain" dans <select>
    ↓
ColorSelector onChange event
    ↓
ProductForm.updateSelectedVariant("Couleur", "Châtain")
    ↓
(même flux qu'au-dessus)
```

### 3. Synchronisation avec ColorCarousel

Si le ColorCarousel (carousel d'images de couleur) est présent :

```
ColorCarousel change l'image
    ↓
ProductForm reçoit externalSelectedVariant
    ↓
setSelectedVariant(externalSelectedVariant)
    ↓
setSelectedOptions mis à jour
    ↓
ColorSelector re-render avec nouvelle sélection
    ↓
Swatches se met à jour automatiquement
```

---

## 🎯 Avantages de Cette Implémentation

### ✅ UX Optimale
- **Visuel immédiat** : L'utilisateur voit la couleur réelle (pas juste un nom)
- **Double interface** : Swatches + Select pour tous les types d'utilisateurs
- **États clairs** : Épuisé = grisé + barré
- **Feedback instantané** : Border rose, ring, hover effects

### ✅ Performance
- **Pas de re-fetch** : Utilise les données déjà chargées par Shopify
- **Optimisé** : Aucune dépendance externe
- **Cache** : Les images sont mises en cache par le navigateur

### ✅ Accessibilité
- **aria-label** : Descriptions pour lecteurs d'écran
- **disabled** : Vraiment désactivé (pas juste visuel)
- **Keyboard navigation** : Tab + Enter fonctionne
- **Focus states** : Ring visible au clavier

### ✅ Maintenabilité
- **Composants réutilisables** : ColorSwatches + ColorSelector
- **TypeScript strict** : Types complets, pas d'erreur
- **Props claires** : Documentation inline
- **Separation of concerns** : Logic ≠ Presentation

---

## 🔍 Vérification et Test

### Test manuel

1. **Ouvrir une page produit** avec plusieurs couleurs
2. **Vérifier l'affichage** :
   - ✅ Label "Couleur : {nom}" visible
   - ✅ Swatches affichés avec images
   - ✅ Select synchronisé
3. **Cliquer un swatch disponible** :
   - ✅ Border devient rose
   - ✅ Ring apparaît
   - ✅ Select se met à jour
   - ✅ Prix/image principale changent
4. **Cliquer un swatch épuisé** :
   - ✅ Rien ne se passe (disabled)
   - ✅ Cursor = not-allowed
5. **Changer dans le select** :
   - ✅ Swatch se met à jour
   - ✅ Variante change

### Test responsive

- **Mobile** : Swatches flex-wrap, grille adaptative
- **Tablette** : Affichage optimal
- **Desktop** : Tous les swatches visibles

---

## 🛠️ Personnalisation

### Changer la couleur d'accent

Par défaut : **rose** (`border-pink-500`)

Pour changer en **or** (couleur primaire) :

```tsx
// Dans ColorSwatches.tsx ligne 44
border-pink-500 → border-primary

// Dans ColorSwatches.tsx ligne 44
ring-pink-500/20 → ring-primary/20

// Dans ColorSelector.tsx ligne 55
focus:border-pink-500 → focus:border-primary
focus:ring-pink-500/20 → focus:ring-primary/20
```

### Changer la taille des swatches

Par défaut : **48×48px** (`w-12 h-12`)

Pour des swatches plus grands (64×64px) :

```tsx
// Dans ColorSwatches.tsx ligne 42
w-12 h-12 → w-16 h-16
```

### Masquer le select

Pour afficher seulement les swatches :

```tsx
<ColorSelector
  ...
  showSelect={false}  // ← Pas de select
/>
```

---

## 📝 Fichiers Modifiés

1. ✅ **`app/components/ColorSwatches.tsx`** - Créé (nouveau)
2. ✅ **`app/components/ColorSelector.tsx`** - Créé (nouveau)
3. ✅ **`app/components/ProductForm.tsx`** - Modifié (import + intégration)

---

## 🎉 Résultat Final

Votre site dispose maintenant d'un **sélecteur de couleur premium** :

- 🎨 **Visuellement attractif** : Images réelles des couleurs
- 🖱️ **Interactif** : Swatches cliquables + select
- ♿ **Accessible** : ARIA, keyboard, focus states
- 📱 **Responsive** : Fonctionne sur tous les écrans
- ⚡ **Performant** : Aucun lag, images optimisées
- 🔄 **Synchronisé** : Swatches ↔ Select ↔ Shopify variants
- 💎 **Luxueux** : Design propre, transitions fluides

---

**Date de création :** 2025-12-11
**Version :** 1.0
**Compatibilité :** Shopify Hydrogen 2024+, React Router v7, Tailwind v4

*Développé pour C'Line Hair avec Claude Code*
