/**
 * ⭐ SINGLE SOURCE OF TRUTH pour les avis produits
 *
 * Ce fichier garantit que le nombre d'avis et la note sont IDENTIQUES
 * sur les ProductCard ET sur la page produit (PDP).
 *
 * @module productReviews
 */

/**
 * Structure d'un avis produit
 */
export interface ProductReview {
  name: string;
  initial: string;
  image: string | null;
  rating: number;
  comment: string;
  time: string;
}

/**
 * Métadonnées d'avis pour un produit
 */
export interface ProductReviewMetadata {
  /** Note moyenne (ex: 4.8) */
  rating: number;
  /** Nombre total d'avis */
  count: number;
  /** Avis individuels (optionnel) */
  reviews?: ProductReview[];
}

/**
 * Génère un hash cohérent à partir d'une chaîne de caractères
 * @param str - Chaîne à hasher
 * @returns Nombre hash positif
 */
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
  }
  return Math.abs(hash);
}

/**
 * Génère un nombre cohérent basé sur une seed
 * @param seed - Chaîne utilisée comme seed
 * @param min - Valeur minimum
 * @param max - Valeur maximum
 * @returns Nombre cohérent entre min et max
 */
function seededRandom(seed: string, min: number, max: number): number {
  const hash = hashString(seed);
  return min + (hash % (max - min + 1));
}

/**
 * 🎯 FONCTION PRINCIPALE - Obtient les métadonnées d'avis pour un produit
 *
 * Cette fonction est la SEULE source de vérité pour :
 * - Le nombre d'avis
 * - La note moyenne
 *
 * Elle garantit que le même productId retourne TOUJOURS les mêmes valeurs.
 *
 * @param productId - ID Shopify du produit (ex: "gid://shopify/Product/123")
 * @param productHandle - Handle du produit (optionnel, pour fallback)
 * @returns Métadonnées d'avis cohérentes
 *
 * @example
 * ```typescript
 * // Dans ProductCard.tsx
 * const reviewData = getProductReviewMetadata(product.id, product.handle);
 * console.log(reviewData.count); // 84
 * console.log(reviewData.rating); // 4.8
 *
 * // Dans products.$handle.tsx (même produit)
 * const reviewData = getProductReviewMetadata(product.id, product.handle);
 * console.log(reviewData.count); // 84 (IDENTIQUE!)
 * console.log(reviewData.rating); // 4.8 (IDENTIQUE!)
 * ```
 */
export function getProductReviewMetadata(
  productId: string,
  productHandle?: string
): ProductReviewMetadata {
  // Utiliser productId comme seed principale, handle comme fallback
  const seed = productId || productHandle || 'default';

  // Générer un nombre d'avis cohérent (entre 62 et 142 avis)
  // Utilisation d'une plage réaliste pour un e-commerce
  const count = seededRandom(seed + '-count', 62, 142);

  // Générer une note cohérente (4.5 ou 4.8 ou 5.0)
  // Notes élevées mais réalistes pour maintenir la crédibilité
  const possibleRatings = [4.5, 4.8, 5.0];
  const ratingIndex = hashString(seed + '-rating') % possibleRatings.length;
  const rating = possibleRatings[ratingIndex];

  return {
    rating,
    count,
  };
}

/**
 * Formate le nombre d'avis pour l'affichage
 * @param count - Nombre d'avis
 * @returns Chaîne formatée (ex: "(84 avis)" ou "(1 avis)")
 */
export function formatReviewCount(count: number): string {
  return `(${count} ${count === 1 ? 'avis' : 'avis'})`;
}

/**
 * Génère les étoiles HTML/SVG pour une note donnée
 * @param rating - Note (ex: 4.8)
 * @returns Nombre d'étoiles pleines et partielles
 */
export function getRatingStars(rating: number): {
  full: number;
  half: boolean;
  empty: number;
} {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - Math.ceil(rating);

  return { full, half, empty };
}

/**
 * ⚠️ IMPORTANT: Si vous utilisez une vraie app d'avis (Judge.me, Loox, Yotpo)
 *
 * Remplacez cette fonction par un appel API réel :
 *
 * @example
 * ```typescript
 * export async function getProductReviewMetadata(productId: string) {
 *   // Exemple avec Judge.me API
 *   const response = await fetch(
 *     `https://judge.me/api/v1/reviews?shop_domain=votreshop.myshopify.com&product_id=${productId}`
 *   );
 *   const data = await response.json();
 *
 *   return {
 *     rating: data.rating,
 *     count: data.count,
 *     reviews: data.reviews,
 *   };
 * }
 * ```
 *
 * OU utilisez un metafield Shopify pour stocker le nombre d'avis :
 *
 * @example
 * ```graphql
 * product {
 *   metafield(namespace: "reviews", key: "count") {
 *     value
 *   }
 *   metafield(namespace: "reviews", key: "rating") {
 *     value
 *   }
 * }
 * ```
 */
