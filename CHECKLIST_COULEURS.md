# ✅ CHECKLIST - Vérification des Couleurs Variantes

## 🔍 Étape 1 : Vérification Shopify Admin

### A. Produit avec beaucoup de couleurs
- [ ] Aller sur Shopify Admin → Produits
- [ ] Sélectionner un produit qui a **10+ variantes couleur**
- [ ] Noter le **nom exact** de l'option couleur :
  - [ ] "Couleur" ?
  - [ ] "Color" ?
  - [ ] "Colours" ?
  - [ ] Autre : _______________

### B. Compter les variantes
- [ ] Compter le **nombre total de variantes** du produit : _______
- [ ] Vérifier que chaque variante a :
  - [ ] Un nom de couleur défini
  - [ ] Une image assignée (ou pas)
  - [ ] Un statut de disponibilité (en stock / rupture)

---

## 🖥️ Étape 2 : Test sur le Site (http://localhost:5174)

### A. Ouvrir la console navigateur (F12)
- [ ] Aller sur la page du produit testé
- [ ] Vérifier les logs dans la console :

**Log attendu #1 - Début extraction :**
```
🎨 Extracting color options: {
  productHandle: "...",
  colorOptionName: "...",
  totalColorValues: XX,  ← Doit correspondre au nombre dans Shopify
  colorValues: [...],
  totalVariantsAvailable: XX,  ← Doit être >= totalColorValues
  totalMetaobjects: XX
}
```

**Log attendu #2 - Fin extraction :**
```
✅ Color extraction complete: XX/XX colors extracted
```

### B. Vérifier l'affichage
- [ ] Toutes les couleurs sont-elles visibles dans le sélecteur ?
- [ ] Cliquer sur chaque couleur et vérifier :
  - [ ] L'image principale change correctement
  - [ ] Le prix se met à jour (si différent par couleur)
  - [ ] Le bouton "Ajouter au panier" est actif/inactif selon le stock
  - [ ] Le badge "Rupture de stock" s'affiche si nécessaire

---

## ⚠️ Étape 3 : Identifier les Problèmes Restants

### Si certaines couleurs ne s'affichent TOUJOURS PAS :

#### Problème A : Nom d'option différent
**Symptôme :** Console montre "⚠️ No color option found"

**Solution :**
1. Noter le **vrai nom** de l'option dans Shopify Admin
2. Modifier `app/routes/($locale).products.$handle.tsx` ligne ~380 :
```typescript
const colorOption = product.options?.find(
  (opt: any) =>
    opt &&
    opt.name &&
    (opt.name.toLowerCase() === 'couleur' ||
      opt.name.toLowerCase() === 'color' ||
      opt.name.toLowerCase() === 'colours' ||
      opt.name.toLowerCase() === 'VOTRE_NOM_ICI')  // ← Ajouter ici
);
```

#### Problème B : Moins de variantes récupérées que prévu
**Symptôme :** Console montre `totalVariantsAvailable: 10` alors qu'il y en a 15+ dans Shopify

**Solution :**
1. Vérifier que la query a bien `variants(first: 100)` (ligne ~1630)
2. Si toujours problème, augmenter à `variants(first: 250)`

#### Problème C : Image placeholder s'affiche
**Symptôme :** Console montre "⚠️ No image found for color option"

**Solution :**
1. Pour chaque couleur concernée, dans Shopify Admin :
   - Assigner une image à la variante, OU
   - Créer un metaobject "Couleur" avec l'image swatch
2. Si vous voulez une vraie image placeholder :
   - Uploader une image placeholder dans Shopify Files
   - Remplacer l'URL ligne ~481 par votre URL

---

## 🚀 Étape 4 : Tests de Bout en Bout

### Test 1 : Produit avec 15+ couleurs
- [ ] Toutes les couleurs s'affichent
- [ ] Navigation fluide entre les couleurs
- [ ] Ajout au panier fonctionne pour chaque couleur

### Test 2 : Produit avec couleurs en rupture
- [ ] Les couleurs en rupture sont visibles
- [ ] Le badge "Rupture de stock" s'affiche
- [ ] Le bouton "Ajouter au panier" est désactivé

### Test 3 : Ajout d'une nouvelle couleur dans Shopify
- [ ] Ajouter une nouvelle variante couleur dans Shopify Admin
- [ ] Recharger la page produit Hydrogen
- [ ] La nouvelle couleur apparaît immédiatement

### Test 4 : Performance
- [ ] Page se charge en < 2 secondes
- [ ] Pas d'erreurs dans la console
- [ ] Changement de couleur instantané (< 100ms)

---

## 📞 Support

Si problème persiste après ces vérifications :

1. **Copier les logs de la console** (section 🎨 et ✅)
2. **Prendre un screenshot** du sélecteur de couleurs
3. **Noter** :
   - Nombre de variantes dans Shopify : _______
   - Nombre de couleurs affichées : _______
   - Nom exact de l'option : _______

---

## ✨ Notes Additionnelles

### Structure des Metaobjects Couleur (Shopify)
Si vous utilisez des metaobjects `shopify--color-pattern` :

**Champs requis :**
- `Label` (ou `label` ou `title` ou `name`) : Nom de la couleur
- `Image` (ou `image` ou `swatch`) : Image de la mèche de cheveux

**Mapping automatique :**
Le système essaie plusieurs variantes du nom pour matcher :
- Nom exact
- Lowercase
- Sans espaces/tirets/underscores
- Handle du metaobject

### Limite actuelle
- **Variantes par produit** : 100 (ajustable ligne ~1630)
- **Metaobjects Couleur** : 100 (ajustable ligne ~1526)
- **Images par produit** : 20 (ajustable ligne ~1574)

---

**Date de création** : $(date +"%Y-%m-%d %H:%M")
**Version** : 1.0
