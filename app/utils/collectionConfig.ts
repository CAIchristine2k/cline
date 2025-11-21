/**
 * Configuration des collections Shopify
 *
 * Ce fichier définit le mapping entre les URLs Hydrogen
 * et les valeurs Shopify (metafield + product_type)
 */

export interface CollectionMapping {
  handle: string;
  title: string;
  hairType?: 'hh' | 'sn'; // Valeur du metafield custom.types_cheveux
  productType?: string;   // Valeur du product_type Shopify
}

/**
 * Mapping des catégories principales
 * URL: /collections/{main}
 */
export const MAIN_CATEGORIES: Record<string, CollectionMapping> = {
  naturelles: {
    handle: 'naturelles',
    title: 'Naturelles',
    hairType: 'hh',
  },
  synthetique: {
    handle: 'synthetique',
    title: 'Synthétique',
    hairType: 'sn',
  },
};

/**
 * Mapping des sous-catégories (par type de produit)
 * URL: /collections/{main}/{sub}
 */
export const SUB_CATEGORIES: Record<string, CollectionMapping> = {
  perruques: {
    handle: 'perruques',
    title: 'Perruques',
    productType: 'perruques',
  },
  bundles: {
    handle: 'bundles',
    title: 'Bundles',
    productType: 'bundle',
  },
  closure: {
    handle: 'closure',
    title: 'Closure',
    productType: 'closure',
  },
  ponytail: {
    handle: 'ponytail',
    title: 'Ponytail',
    productType: 'ponytail',
  },
  bulk: {
    handle: 'bulk',
    title: 'Bulk',
    productType: 'bulk',
  },
};

/**
 * Construit la query Shopify Storefront API pour filtrer les produits
 *
 * @param hairType - Type de cheveux: 'hh' (naturel) ou 'sn' (synthétique)
 * @param productType - Type de produit Shopify
 * @returns String de query pour l'API Shopify
 *
 * @example
 * buildShopifyQuery('hh', 'perruques')
 * // Returns: "(custom.types_cheveux:hh) AND (product_type:perruques)"
 */
export function buildShopifyQuery(
  hairType?: 'hh' | 'sn',
  productType?: string,
): string {
  const conditions: string[] = [];

  // Filtrer par type de cheveux (metafield)
  if (hairType) {
    conditions.push(`(custom.types_cheveux:${hairType})`);
  }

  // Filtrer par type de produit
  if (productType) {
    conditions.push(`(product_type:${productType})`);
  }

  // Combiner les conditions avec AND
  return conditions.length > 0 ? conditions.join(' AND ') : '';
}

/**
 * Résout les paramètres de collection basés sur l'URL
 *
 * @param main - Catégorie principale (ex: 'naturelles', 'synthetique')
 * @param sub - Sous-catégorie optionnelle (ex: 'perruques', 'bundles')
 * @returns Objet avec hairType, productType, title, et query
 *
 * @example
 * resolveCollectionParams('naturelles', 'perruques')
 * // Returns: {
 * //   hairType: 'hh',
 * //   productType: 'perruques',
 * //   title: 'Naturelles - Perruques',
 * //   query: '(custom.types_cheveux:hh) AND (product_type:perruques)'
 * // }
 */
export function resolveCollectionParams(main?: string, sub?: string) {
  // Valider que la catégorie principale existe
  if (!main || !MAIN_CATEGORIES[main]) {
    throw new Response('Collection non trouvée', { status: 404 });
  }

  const mainCategory = MAIN_CATEGORIES[main];
  const hairType = mainCategory.hairType;

  // Si pas de sous-catégorie, retourner seulement la catégorie principale
  if (!sub) {
    return {
      hairType,
      productType: undefined,
      title: mainCategory.title,
      query: buildShopifyQuery(hairType),
      handle: main,
    };
  }

  // Valider que la sous-catégorie existe
  if (!SUB_CATEGORIES[sub]) {
    throw new Response('Sous-collection non trouvée', { status: 404 });
  }

  const subCategory = SUB_CATEGORIES[sub];
  const productType = subCategory.productType;

  // Retourner la combinaison main + sub
  return {
    hairType,
    productType,
    title: `${mainCategory.title} - ${subCategory.title}`,
    query: buildShopifyQuery(hairType, productType),
    handle: `${main}-${sub}`,
  };
}

/**
 * Obtient le titre d'affichage pour une collection
 *
 * @param main - Catégorie principale
 * @param sub - Sous-catégorie optionnelle
 * @returns Titre formaté
 */
export function getCollectionTitle(main: string, sub?: string): string {
  const mainTitle = MAIN_CATEGORIES[main]?.title || main;

  if (!sub) {
    return mainTitle;
  }

  const subTitle = SUB_CATEGORIES[sub]?.title || sub;
  return `${mainTitle} - ${subTitle}`;
}

/**
 * Vérifie si une combinaison main/sub est valide
 */
export function isValidCollection(main: string, sub?: string): boolean {
  if (!MAIN_CATEGORIES[main]) {
    return false;
  }

  if (sub && !SUB_CATEGORIES[sub]) {
    return false;
  }

  return true;
}

/**
 * Obtient toutes les URLs de collections disponibles
 * Utile pour générer un sitemap ou une navigation
 */
export function getAllCollectionUrls(): string[] {
  const urls: string[] = [];

  // Ajouter les catégories principales
  Object.keys(MAIN_CATEGORIES).forEach((main) => {
    urls.push(`/collections/${main}`);

    // Ajouter toutes les combinaisons avec sous-catégories
    Object.keys(SUB_CATEGORIES).forEach((sub) => {
      urls.push(`/collections/${main}/${sub}`);
    });
  });

  return urls;
}
