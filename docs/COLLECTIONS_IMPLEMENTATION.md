# 🔧 Implémentation du Système de Collections

## ✅ Comment ça fonctionne maintenant

### Architecture actuelle

Le système utilise les **collections Shopify automatiques** au lieu de requêtes directes aux produits.

#### 1. Collections principales (naturelles / synthétique)
- **Route**: `/collections/naturelles` ou `/collections/synthetique`
- **Fonctionnement**:
  - Query GraphQL récupère la collection Shopify par son handle
  - La collection doit exister dans Shopify avec le même handle
  - Shopify peuple automatiquement la collection avec les produits qui matchent la condition

#### 2. Sous-collections (perruques, bundles, etc.)
- **Route**: `/collections/naturelles/perruques` ou `/collections/synthetique/bundles`
- **Fonctionnement**:
  - Query GraphQL récupère la collection principale (naturelles ou synthétique)
  - Filtrage client-side par `product_type`
  - Plus flexible et fonctionne sans créer de collections supplémentaires dans Shopify

---

## 🛠️ Configuration Shopify Requise

### Étape 1: Créer le Metafield

Dans **Shopify Admin** → **Paramètres** → **Métachamps** → **Produits**:

- **Namespace**: `custom`
- **Key**: `types_cheveux`
- **Type**: Texte, ligne unique
- **Valeurs possibles**:
  - `hh` = Cheveux naturels
  - `sn` = Cheveux synthétiques

### Étape 2: Créer les Collections Automatiques

#### Collection "naturelles"

- **Handle**: `naturelles`
- **Condition**: `metafield.custom.types_cheveux EST ÉGAL À hh`
- **Type**: Automatique

#### Collection "synthetique"

- **Handle**: `synthetique`
- **Condition**: `metafield.custom.types_cheveux EST ÉGAL À sn`
- **Type**: Automatique

### Étape 3: Configurer les Produits

Pour chaque produit dans Shopify:

1. **Définir le product_type** (ex: `perruques`, `bundle`, `closure`, `ponytail`, `bulk`)
2. **Définir le metafield** `custom.types_cheveux` (valeur: `hh` ou `sn`)

**Exemple:**

```
Produit: Perruque Lisse 22"
- Product Type: perruques
- Metafield custom.types_cheveux: hh

→ Apparaîtra dans:
  ✅ /collections/naturelles (collection automatique)
  ✅ /collections/naturelles/perruques (filtré par product_type)
```

---

## 📊 Structure du Code

### Fichiers Principaux

#### `app/utils/collectionConfig.ts`
Configuration centralisée des mappings collection → metafield/product_type

```typescript
export const MAIN_CATEGORIES = {
  naturelles: { handle: 'naturelles', title: 'Naturelles', hairType: 'hh' },
  synthetique: { handle: 'synthetique', title: 'Synthétique', hairType: 'sn' },
};

export const SUB_CATEGORIES = {
  perruques: { handle: 'perruques', title: 'Perruques', productType: 'perruques' },
  bundles: { handle: 'bundles', title: 'Bundles', productType: 'bundle' },
  // ...
};
```

#### `app/routes/($locale).collections.$main.tsx`
Route pour les collections principales

```typescript
// Récupère la collection Shopify par handle
const {collection} = await context.storefront.query(COLLECTION_QUERY, {
  variables: { handle: main, first: 50 },
});

return { products: collection.products.nodes, ... };
```

#### `app/routes/($locale).collections.$main.$sub.tsx`
Route pour les sous-collections

```typescript
// Récupère la collection principale
const {collection} = await context.storefront.query(COLLECTION_QUERY, {
  variables: { handle: main, first: 250 },
});

// Filtre par product_type côté client
const filteredProducts = collection.products.nodes.filter(
  (product) => product.productType?.toLowerCase() === productType?.toLowerCase()
);

return { products: filteredProducts, ... };
```

---

## 🐛 Debugging et Logs

Les routes incluent des logs de débogage pour suivre le flux:

```
🔍 [Collection Main] Params: { main: 'naturelles', handle: 'naturelles', hairType: 'hh' }
📦 [Collection Main] Collection found: Yes
📦 [Collection Main] Products found: 12
```

Pour les sous-collections:

```
🔍 [Collection Main+Sub] Params: { main: 'naturelles', sub: 'perruques', productType: 'perruques' }
📦 [Collection Main+Sub] Collection found: Yes
📦 [Collection Main+Sub] Total products in collection: 25
📦 [Collection Main+Sub] Filtered products: 8
```

---

## ❓ FAQ et Résolution de Problèmes

### Q: "Collection non trouvée" (404)

**Cause**: La collection n'existe pas dans Shopify avec le handle correct

**Solution**:
1. Vérifier que les collections `naturelles` et `synthetique` existent dans Shopify
2. Vérifier que le handle est exactement `naturelles` ou `synthetique` (en minuscules)
3. Vérifier que les collections sont publiées sur le canal de vente

### Q: Aucun produit dans la collection

**Cause**: Les produits n'ont pas le metafield `custom.types_cheveux` défini

**Solution**:
1. Aller dans chaque produit dans Shopify Admin
2. Trouver le metafield `custom.types_cheveux`
3. Définir la valeur: `hh` (naturel) ou `sn` (synthétique)
4. Sauvegarder

### Q: Les sous-collections ne montrent pas les bons produits

**Cause**: Le `product_type` des produits ne correspond pas

**Solution**:
1. Vérifier que le product_type est défini sur chaque produit
2. Vérifier la casse: doit être en minuscules (`perruques`, pas `Perruques`)
3. Pour bundles, le product_type doit être `bundle` (singulier)

### Q: Tous les produits apparaissent dans toutes les catégories

**Cause**: Le metafield n'est pas défini ou les collections automatiques ne sont pas configurées

**Solution**:
1. Reconfigurer les conditions des collections automatiques dans Shopify
2. Attendre quelques minutes que Shopify mette à jour les collections
3. Vérifier les logs de debug dans la console du serveur

---

## 🚀 Avantages de cette Approche

### ✅ Avantages

1. **Performance**: Les collections Shopify sont indexées et optimisées
2. **Maintenance**: Ajouter un produit → automatiquement dans la bonne collection
3. **Flexibilité**: Pas besoin de créer une collection pour chaque combinaison
4. **Scalabilité**: Fonctionne avec des milliers de produits
5. **SEO**: URLs propres et logiques

### ⚠️ Limitations

1. **Délai de mise à jour**: Les collections automatiques peuvent prendre quelques minutes à se mettre à jour
2. **Client-side filtering**: Les sous-collections utilisent un filtre client-side (mais très rapide)
3. **Limite de produits**: Max 250 produits par collection pour le filtrage client-side

---

## 📝 Checklist de Déploiement

Avant de déployer en production:

- [ ] Collections `naturelles` et `synthetique` créées dans Shopify
- [ ] Conditions des collections automatiques configurées correctement
- [ ] Metafield `custom.types_cheveux` défini sur tous les produits
- [ ] Product_type défini sur tous les produits
- [ ] Test de toutes les URLs en local
- [ ] Vérification des logs pour voir si les produits sont correctement filtrés
- [ ] Test de la navigation entre collections
- [ ] Vérification du responsive design

---

## 🔗 Liens Utiles

- [Documentation Shopify: Collections automatiques](https://help.shopify.com/en/manual/products/collections/automated-collections)
- [Documentation Shopify: Metafields](https://help.shopify.com/en/manual/custom-data/metafields)
- [Shopify GraphQL API: Collection](https://shopify.dev/api/storefront/2024-01/objects/Collection)
