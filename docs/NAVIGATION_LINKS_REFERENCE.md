# 🔗 Référence Complète des Liens de Navigation

## Format Tailwind Standard

Tous les liens utilisent ce format de base:

```html
<a
  class="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-white transition-all duration-200"
  href="/collections/[URL]"
  data-discover="true"
>
  [Nom Affiché]
</a>
```

---

## 📂 CATÉGORIES PRINCIPALES

### Naturelles (Tous les produits naturels)
```html
<a
  class="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-white transition-all duration-200"
  href="/collections/naturelles"
  data-discover="true"
>
  Toutes les Naturelles
</a>
```

### Synthétique (Tous les produits synthétiques)
```html
<a
  class="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-white transition-all duration-200"
  href="/collections/synthetique"
  data-discover="true"
>
  Toutes les Synthétiques
</a>
```

---

## 🌿 COLLECTIONS NATURELLES (hh)

### Perruques Naturelles
```html
<a
  class="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-white transition-all duration-200"
  href="/collections/naturelles/perruques"
  data-discover="true"
>
  Perruques naturelles
</a>
```

### Bundles Naturels
```html
<a
  class="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-white transition-all duration-200"
  href="/collections/naturelles/bundles"
  data-discover="true"
>
  Bundles naturels
</a>
```

### Closures Naturels
```html
<a
  class="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-white transition-all duration-200"
  href="/collections/naturelles/closure"
  data-discover="true"
>
  Closures naturels
</a>
```

### Ponytails Naturels
```html
<a
  class="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-white transition-all duration-200"
  href="/collections/naturelles/ponytail"
  data-discover="true"
>
  Ponytails naturels
</a>
```

### Bulk Naturel
```html
<a
  class="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-white transition-all duration-200"
  href="/collections/naturelles/bulk"
  data-discover="true"
>
  Bulk naturel
</a>
```

---

## 🎨 COLLECTIONS SYNTHÉTIQUE (sn)

### Perruques Synthétiques
```html
<a
  class="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-white transition-all duration-200"
  href="/collections/synthetique/perruques"
  data-discover="true"
>
  Perruques synthétiques
</a>
```

### Bundles Synthétiques
```html
<a
  class="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-white transition-all duration-200"
  href="/collections/synthetique/bundles"
  data-discover="true"
>
  Bundles synthétiques
</a>
```

### Closures Synthétiques
```html
<a
  class="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-white transition-all duration-200"
  href="/collections/synthetique/closure"
  data-discover="true"
>
  Closures synthétiques
</a>
```

### Ponytails Synthétiques
```html
<a
  class="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-white transition-all duration-200"
  href="/collections/synthetique/ponytail"
  data-discover="true"
>
  Ponytails synthétiques
</a>
```

### Bulk Synthétique
```html
<a
  class="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-white transition-all duration-200"
  href="/collections/synthetique/bulk"
  data-discover="true"
>
  Bulk synthétique
</a>
```

---

## 🎯 EXEMPLE DE MENU DÉROULANT COMPLET

### Menu Naturelles (avec sous-menu)

```tsx
<div className="relative group">
  <Link
    to="/collections/naturelles"
    className="text-white hover:text-gray-300 transition-all duration-200 px-4 py-3 text-xs font-medium whitespace-nowrap uppercase tracking-wider inline-flex items-center gap-1"
  >
    NATURELLES
  </Link>

  {/* Dropdown */}
  <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 min-w-[220px] z-50">
    <a
      className="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 font-semibold"
      href="/collections/naturelles"
    >
      Toutes les Naturelles
    </a>
    <a
      className="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-white transition-all duration-200"
      href="/collections/naturelles/perruques"
    >
      Perruques
    </a>
    <a
      className="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-white transition-all duration-200"
      href="/collections/naturelles/bundles"
    >
      Bundles
    </a>
    <a
      className="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-white transition-all duration-200"
      href="/collections/naturelles/closure"
    >
      Closures
    </a>
    <a
      className="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-white transition-all duration-200"
      href="/collections/naturelles/ponytail"
    >
      Ponytails
    </a>
    <a
      className="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-white transition-all duration-200"
      href="/collections/naturelles/bulk"
    >
      Bulk
    </a>
  </div>
</div>
```

---

## 📋 TABLEAU RÉCAPITULATIF DES URLS

| Nom Affiché | URL | Type de Cheveux | Type de Produit |
|-------------|-----|-----------------|-----------------|
| Toutes les Naturelles | `/collections/naturelles` | hh | - |
| Perruques naturelles | `/collections/naturelles/perruques` | hh | perruques |
| Bundles naturels | `/collections/naturelles/bundles` | hh | bundle |
| Closures naturels | `/collections/naturelles/closure` | hh | closure |
| Ponytails naturels | `/collections/naturelles/ponytail` | hh | ponytail |
| Bulk naturel | `/collections/naturelles/bulk` | hh | bulk |
| Toutes les Synthétiques | `/collections/synthetique` | sn | - |
| Perruques synthétiques | `/collections/synthetique/perruques` | sn | perruques |
| Bundles synthétiques | `/collections/synthetique/bundles` | sn | bundle |
| Closures synthétiques | `/collections/synthetique/closure` | sn | closure |
| Ponytails synthétiques | `/collections/synthetique/ponytail` | sn | ponytail |
| Bulk synthétique | `/collections/synthetique/bulk` | sn | bulk |

---

## 🔄 MIGRATIONS D'ANCIENNES URLS

Si vous aviez des anciennes URLs, voici le mapping:

| Ancienne URL | Nouvelle URL |
|--------------|--------------|
| `/collections/perruques-naturelles` | `/collections/naturelles/perruques` |
| `/collections/tissages-naturels` | `/collections/naturelles/bundles` |
| `/collections/bulk-naturel` | `/collections/naturelles/bulk` |
| `/collections/ponytails-naturels` | `/collections/naturelles/ponytail` |
| `/collections/closures-frontals` | `/collections/naturelles/closure` |
| `/collections/perruques-semi-naturelles` | `/collections/synthetique/perruques` |
| `/collections/tissages-semi-naturels` | `/collections/synthetique/bundles` |
| `/collections/bulk-semi-naturel` | `/collections/synthetique/bulk` |
| `/collections/ponytails-semi-naturels` | `/collections/synthetique/ponytail` |
| `/collections/closures-semi-naturels` | `/collections/synthetique/closure` |

---

## ✅ CHECKLIST D'UTILISATION

- [ ] Toujours utiliser le format complet `/collections/{main}/{sub}`
- [ ] Ne jamais oublier le préfixe `/collections/`
- [ ] Respecter la casse des handles (tout en minuscules)
- [ ] Utiliser les classes Tailwind standard pour la cohérence
- [ ] Ajouter `data-discover="true"` pour l'optimisation du prefetch
- [ ] Tester tous les liens dans le navigateur
- [ ] Vérifier que les collections Shopify existent avec les bons handles
- [ ] Configurer les metafields `custom.types_cheveux` sur tous les produits
