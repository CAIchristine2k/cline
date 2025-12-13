import {redirect, type LoaderFunctionArgs} from 'react-router';
import {useLoaderData, type MetaFunction, Link} from 'react-router';
import {useState, useCallback, useEffect, useMemo, useRef} from 'react';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
  Image,
  Money,
  parseGid, // Add the parseGid utility
} from '@shopify/hydrogen';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {getConfig} from '~/utils/config';
import {useConfig} from '~/utils/themeContext';
import {ProductForm} from '~/components/ProductForm';
import {ProductCard} from '~/components/ProductCard';
import {ClientOnly} from '~/components/ClientOnly';
import {Suspense} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {MARKETING_ASSETS, getImageWithFallback} from '~/utils/assetsConfig';
import {getReviewPhoto} from '~/utils/reviewHelpers';
import {WishlistButton} from '~/components/WishlistButton';
import {getProductReviewMetadata, formatReviewCount} from '~/utils/productReviews';

// Product Reviews Component
const productReviews = [
  { name: 'Fatou D.', initial: 'F', image: getReviewPhoto(0), rating: 5, comment: 'Qualité exceptionnelle ! Exactement ce que je cherchais. Très satisfaite de mon achat.', time: 'Il y a 2 jours' },
  { name: 'Yasmine K.', initial: 'Y', image: getReviewPhoto(1), rating: 5, comment: 'Livraison rapide et produit conforme. Je recommande vivement !', time: 'Il y a 5 jours' },
  { name: 'Mireille M.', initial: 'M', image: getReviewPhoto(2), rating: 4.5, comment: 'Bon produit dans l\'ensemble. Correspond à la description.', time: 'Il y a 1 semaine' },
  { name: 'Inès L.', initial: 'I', image: getReviewPhoto(3), rating: 5, comment: 'Magnifique ! La qualité est au rendez-vous, je suis ravie.', time: 'Il y a 2 semaines' },
  { name: 'Kenza B.', initial: 'K', image: getReviewPhoto(4), rating: 5, comment: 'Parfait pour mon usage. Très bon rapport qualité-prix.', time: 'Il y a 3 semaines' },
  { name: 'Aya T.', initial: 'A', image: getReviewPhoto(5), rating: 4.5, comment: 'Très satisfaite, correspond bien aux attentes.', time: 'Il y a 3 semaines' },
  { name: 'Lina F.', initial: 'L', image: getReviewPhoto(6), rating: 5, comment: 'Excellent produit, je recommande sans hésiter !', time: 'Il y a 1 mois' },
  { name: 'Nadège P.', initial: 'N', image: getReviewPhoto(7), rating: 5, comment: 'Super qualité, conforme à la description. Ravie !', time: 'Il y a 1 mois' },
  { name: 'Carine V.', initial: 'C', image: getReviewPhoto(8), rating: 4.5, comment: 'Bonne qualité, livraison dans les temps.', time: 'Il y a 1 mois' },
  { name: 'Jamila G.', initial: 'J', image: getReviewPhoto(9), rating: 5, comment: 'Produit de très bonne qualité. Je recommande.', time: 'Il y a 2 mois' },
  { name: 'Malak K.', initial: 'M', image: getReviewPhoto(10), rating: 5, comment: 'Absolument parfait ! Dépasse mes attentes.', time: 'Il y a 2 mois' },
  { name: 'Joëlle H.', initial: 'J', image: getReviewPhoto(11), rating: 4.5, comment: 'Très bon achat, conforme à mes besoins.', time: 'Il y a 2 mois' },
  { name: 'Fatoumata D.', initial: 'F', image: getReviewPhoto(12), rating: 5, comment: 'Top qualité ! Je suis très contente de mon achat.', time: 'Il y a 3 mois' },
  { name: 'Sophie R.', initial: 'S', image: getReviewPhoto(13), rating: 5, comment: 'Excellente qualité, je rachèterai sans hésiter.', time: 'Il y a 3 mois' },
  { name: 'Emma A.', initial: 'E', image: getReviewPhoto(14), rating: 4.5, comment: 'Bon produit, conforme à la description.', time: 'Il y a 3 mois' },
];

// Fonction pour créer un hash robuste à partir d'une chaîne
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i); // hash * 33 + c
  }
  return hash >>> 0; // Convert to unsigned 32-bit integer
}

// Générateur de nombres pseudo-aléatoires avec seed (xorshift32)
class SeededRandom {
  private state: number;

  constructor(seed: number) {
    this.state = seed === 0 ? 1 : seed; // Avoid zero seed
  }

  next(): number {
    let x = this.state;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    this.state = x >>> 0;
    return (this.state >>> 0) / 0xFFFFFFFF;
  }
}

// Fonction de shuffle déterministe basée sur un seed (Fisher-Yates)
function seededShuffle<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  const rng = new SeededRandom(seed);

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function ProductReviews({ productHandle }: { productHandle: string }) {
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;

  // Mélanger les avis de manière déterministe basée sur le handle du produit
  const shuffledReviews = useMemo(() => {
    const seed = hashString(productHandle);
    return seededShuffle(productReviews, seed);
  }, [productHandle]);

  const totalPages = Math.ceil(shuffledReviews.length / reviewsPerPage);

  const getCurrentReviews = () => {
    const start = currentPage * reviewsPerPage;
    return shuffledReviews.slice(start, start + reviewsPerPage);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-black">Avis Clients</h3>
        <div className="hidden lg:flex gap-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="p-1 rounded-full border border-primary/30 hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Avis précédents"
          >
            <ChevronLeft className="w-4 h-4 text-primary" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="p-1 rounded-full border border-primary/30 hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Avis suivants"
          >
            <ChevronRight className="w-4 h-4 text-primary" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {getCurrentReviews().map((review, index) => (
          <div key={index} className="bg-white border-2 border-primary/20 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex mb-2 gap-0.5">
              {[...Array(Math.floor(review.rating))].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-primary">
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg>
              ))}
              {review.rating % 1 >= 0.5 && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-primary opacity-50">
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg>
              )}
              {[...Array(5 - Math.ceil(review.rating))].map((_, i) => (
                <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-gray-300">
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 text-xs mb-2 leading-relaxed">
              "{review.comment}"
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-primary/10">
              {review.image ? (
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-6 h-6 rounded-full object-cover border border-primary/20"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                  {review.initial}
                </div>
              )}
              <div>
                <div className="font-bold text-black text-xs flex items-center gap-1">
                  {review.name}
                  <span className="text-xs text-green-600 font-medium">Avis vérifié</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-green-500">
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <div className="text-xs text-gray-400">{review.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots - Desktop only */}
      <div className="hidden lg:flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentPage === idx ? 'bg-primary w-8' : 'bg-gray-300 w-2'
            }`}
            aria-label={`Page ${idx + 1}`}
          />
        ))}
      </div>

      {/* Mobile Navigation Buttons */}
      <div className="flex lg:hidden justify-center gap-3 mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-primary bg-white hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-semibold text-black"
          aria-label="Avis précédents"
        >
          <ChevronLeft className="w-4 h-4 text-primary" />
          Précédent
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-primary bg-white hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-semibold text-black"
          aria-label="Avis suivants"
        >
          Suivant
          <ChevronRight className="w-4 h-4 text-primary" />
        </button>
      </div>

      {/* Mobile Page Indicator */}
      <div className="flex lg:hidden justify-center gap-2 mt-3">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentPage === idx ? 'bg-primary w-8' : 'bg-gray-300 w-2'
            }`}
            aria-label={`Page ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export const meta: MetaFunction<typeof loader> = ({data}) => {
  if (!data?.product) {
    return [
      {title: 'Produit non trouvé - C\'Line Hair'},
      {name: 'robots', content: 'noindex'},
    ];
  }

  const product = data.product;
  const variant = product.selectedVariant || product.variants?.nodes[0];
  const price = variant?.price?.amount || 0;
  const description = product.seo?.description || product.description?.substring(0, 155) || `${product.title} - Perruque naturelle 100% cheveux humains de qualité premium chez C'Line Hair.`;
  const title = product.seo?.title || `${product.title} - Perruque Naturelle | C'Line Hair`;
  const imageUrl = variant?.image?.url || product.featuredImage?.url || '';

  return [
    {title},
    {name: 'description', content: description},
    {
      name: 'keywords',
      content: `${product.title}, perruque naturelle, lace wig, cheveux humains, ${variant?.title || ''}, perruque qualité premium`,
    },

    // Open Graph
    {property: 'og:type', content: 'product'},
    {property: 'og:title', content: title},
    {property: 'og:description', content: description},
    {property: 'og:image', content: imageUrl},
    {property: 'og:url', content: `https://www.clinehair.com/products/${product.handle}`},
    {property: 'og:price:amount', content: price},
    {property: 'og:price:currency', content: variant?.price?.currencyCode || 'EUR'},

    // Twitter Card
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: title},
    {name: 'twitter:description', content: description},
    {name: 'twitter:image', content: imageUrl},

    // Product specific
    {property: 'product:price:amount', content: price},
    {property: 'product:price:currency', content: variant?.price?.currencyCode || 'EUR'},
    {property: 'product:availability', content: variant?.availableForSale ? 'in stock' : 'out of stock'},

    // Canonical
    {rel: 'canonical', href: `https://www.clinehair.com/products/${product.handle}`},

    // Robots
    {name: 'robots', content: 'index, follow'},
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  // Get configuration
  const config = getConfig();

  return {
    ...deferredData,
    ...criticalData,
    config: {
      ...config,
      theme: config.influencerName.toLowerCase().replace(/\s+/g, '-'),
    },
  };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({
  context,
  params,
  request,
}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  // Fix: Use a separate query to get the selectedOptions
  const selectedOptions = getSelectedProductOptions(request);

  // The GraphQL query doesn't expect selectedOptions in variables
  const data = await storefront.query(PRODUCT_QUERY, {
    variables: {handle},
  });

  if (!data.product?.id) {
    throw new Response(null, {status: 404});
  }

  // Récupérer tous les metaobjects Couleur
  let colorMetaobjects: any[] = [];
  try {
    const colorData = await storefront.query(COLOR_METAOBJECTS_QUERY);
    colorMetaobjects = colorData?.metaobjects?.nodes || [];
  } catch (error) {
    // Silently fail - fallback to variant images
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: data.product});

  return {
    product: data.product,
    recommendedProducts: data.recommendedProducts?.nodes || [],
    storeDomain: storefront.getShopifyDomain(),
    colorMetaobjects, // 🆕 Passer les metaobjects au composant
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context, params}: LoaderFunctionArgs) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

/**
 * Helper function pour extraire les options de couleur depuis le produit
 * Combine les données des métaobjets Couleur et des variants
 */
function extractColorOptions(product: any, colorMetaobjects: any[] = []): ColorOption[] {
  // Chercher l'option "Couleur" ou similaire
  const colorOption = product.options?.find(
    (opt: any) =>
      opt &&
      opt.name &&
      (opt.name.toLowerCase() === 'couleur' ||
        opt.name.toLowerCase() === 'color' ||
        opt.name.toLowerCase() === 'colours')
  );

  if (!colorOption || !colorOption.values || colorOption.values.length === 0) {
    return [];
  }

  // Créer un mapping des metaobjects par nom/handle/label
  const colorMetaobjectsMap = new Map<string, any>();

  colorMetaobjects.forEach((metaobj: any) => {
    if (!metaobj) return;

    // Trouver les champs Label et Image
    const labelField = metaobj.fields?.find(
      (f: any) => f && (f.key === 'Label' || f.key === 'label' || f.key === 'title' || f.key === 'name')
    );

    const label = labelField?.value || metaobj.handle;

    // Stocker par différentes clés pour maximiser les chances de match
    if (label) {
      colorMetaobjectsMap.set(label.toLowerCase(), metaobj);
      colorMetaobjectsMap.set(label, metaobj);
      colorMetaobjectsMap.set(label.toLowerCase().replace(/[\s-_]/g, ''), metaobj);
    }
    if (metaobj.handle) {
      colorMetaobjectsMap.set(metaobj.handle.toLowerCase(), metaobj);
      colorMetaobjectsMap.set(metaobj.handle, metaobj);
    }
  });

  // Construire la liste des ColorOption
  const colorOptions: ColorOption[] = [];
  const colorOptionName = colorOption.name;

  colorOption.values.forEach((colorValue: string) => {
    // Trouver la variante correspondante à cette couleur
    // Essayer plusieurs stratégies de matching pour être plus robuste
    let variant = product.variants?.nodes?.find((v: any) =>
      v.selectedOptions?.some(
        (opt: any) => opt.name === colorOptionName && opt.value === colorValue
      )
    );

    // Si pas trouvé, essayer un matching case-insensitive
    if (!variant) {
      variant = product.variants?.nodes?.find((v: any) =>
        v.selectedOptions?.some(
          (opt: any) =>
            opt.name === colorOptionName &&
            opt.value?.toLowerCase() === colorValue.toLowerCase()
        )
      );
    }

    // Si toujours pas de variante trouvée, CONTINUER
    if (!variant) {
      // Créer une entrée placeholder pour cette couleur manquante
      // Cela permet de voir qu'elle existe dans Shopify mais manque dans la query
      colorOptions.push({
        name: `${colorValue} (non disponible)`,
        imageUrl: 'https://cdn.shopify.com/s/files/1/0981/1535/4969/files/placeholder-color.png?v=1',
        variantId: '', // Pas de variant ID
        availableForSale: false, // Marqué comme indisponible
      });
      return; // Passer à la couleur suivante
    }

    // Chercher le metaobject correspondant avec plusieurs variantes du nom
    // Essayer TOUS les noms possibles: exact, minuscule, majuscule, normalisé, alphanumérique
    const normalizedColorValue = colorValue.toLowerCase().replace(/^#/, '').replace(/\//g, '-');
    const alphanumericOnly = colorValue.toLowerCase().replace(/[^a-z0-9]/g, '');

    let colorMeta =
      // Essayer le nom exact tel quel (important si le handle Shopify contient # et /)
      colorMetaobjectsMap.get(colorValue) ||
      colorMetaobjectsMap.get(colorValue.toLowerCase()) ||
      colorMetaobjectsMap.get(colorValue.toUpperCase()) ||
      colorMetaobjectsMap.get(normalizedColorValue) ||
      colorMetaobjectsMap.get(normalizedColorValue.replace(/[\s-_]/g, '')) ||
      colorMetaobjectsMap.get(colorValue.toLowerCase().replace(/[\s-_#\/]/g, '')) ||
      colorMetaobjectsMap.get(alphanumericOnly) ||
      // Essayer aussi de chercher dans tous les metaobjects par comparaison exacte du handle
      colorMetaobjects.find((meta: any) => {
        // Comparaison exacte du handle
        if (meta.handle === colorValue) return true;

        // Comparaison alphanumérique en fallback
        const metaHandle = meta.handle?.toLowerCase().replace(/[^a-z0-9]/g, '');
        return metaHandle === alphanumericOnly;
      });

    let imageUrl = '';
    let colorLabel = colorValue;

    // Récupérer le label depuis le metaobject si disponible
    if (colorMeta) {
      const labelField = colorMeta.fields?.find(
        (f: any) => f && (f.key === 'Label' || f.key === 'label' || f.key === 'title' || f.key === 'name')
      );
      if (labelField?.value) {
        colorLabel = labelField.value;
      }
    }

    // PRIORITÉ 1: Image du metaobject couleur (si existe)
    if (colorMeta) {
      const imageField = colorMeta.fields?.find(
        (f: any) => f && (f.key === 'Image' || f.key === 'image' || f.key === 'swatch')
      );

      if (imageField?.reference?.image?.url) {
        imageUrl = imageField.reference.image.url;
      }
    }

    // PRIORITÉ 2: Image de la variante Shopify (fallback si pas d'image metaobject)
    if (!imageUrl && variant.image?.url) {
      imageUrl = variant.image.url;
    }

    // PRIORITÉ 3: Image featured du produit (dernier fallback)
    if (!imageUrl && product.featuredImage?.url) {
      imageUrl = product.featuredImage.url;
    }

    // Fallback 3: Placeholder pour debug (permet de voir toutes les couleurs)
    if (!imageUrl) {
      imageUrl = 'https://cdn.shopify.com/s/files/1/0981/1535/4969/files/placeholder-color.png?v=1';
    }

    // TOUJOURS ajouter l'option (même sans image parfaite)
    colorOptions.push({
      name: colorLabel,
      value: colorValue, // Valeur réelle Shopify
      imageUrl,
      variantId: variant.id,
      availableForSale: variant.availableForSale || false,
    });
  });

  return colorOptions;
}

export default function Product() {
  const {product, recommendedProducts, storeDomain, colorMetaobjects} =
    useLoaderData<typeof loader>();
  const config = useConfig();

  // ⭐ SINGLE SOURCE OF TRUTH - Calcul des avis cohérent avec ProductCard
  const reviewMetadata = useMemo(
    () => getProductReviewMetadata(product.id, product.handle),
    [product.id, product.handle]
  );

  // Track the currently selected variant from ProductForm
  const [currentVariant, setCurrentVariant] = useState(
    product?.selectedVariant ?? product?.variants?.nodes[0],
  );

  // Timer countdown to midnight (24h renewal)
  const [timeLeft, setTimeLeft] = useState({hours: 0, minutes: 0, seconds: 0});

  // Extract color options for the carousel
  const colorOptions = useMemo(
    () => extractColorOptions(product, colorMetaobjects),
    [product, colorMetaobjects]
  );


  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      const diff = midnight.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({hours, minutes, seconds});
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update variant when the loader data changes (e.g., on URL changes)
  useEffect(() => {
    setCurrentVariant(product?.selectedVariant ?? product?.variants?.nodes[0]);
  }, [product?.selectedVariant, product?.variants?.nodes]);

  // Select 2 random products for desktop display
  const randomProducts = useMemo(() => {
    if (!recommendedProducts || recommendedProducts.length === 0) return [];
    const shuffled = [...recommendedProducts].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
  }, [recommendedProducts]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Produit non trouvé</h1>
        <p className="mb-8 text-gray-600">Le produit que vous recherchez n'existe pas.</p>
        <Link
          to="/products"
          className="inline-flex items-center bg-primary hover:bg-primary-400 text-black font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Retour à la boutique
        </Link>
      </div>
    );
  }

  // Shopify analytics
  const analytics = {
    products: [
      {
        productGid: product.id,
        variantGid: currentVariant?.id || product.variants.nodes[0]?.id,
        name: product.title,
        variantName: currentVariant?.title || product.variants.nodes[0]?.title,
        brand: product.vendor,
        price:
          currentVariant?.price?.amount ||
          product.variants.nodes[0]?.price?.amount,
      },
    ],
    pageType: 'product',
  };

  const featuredImage = product.featuredImage;
  const allProductImages = product.images.nodes;

  // États pour le swipe sur mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Distance minimale de swipe (en pixels)
  const minSwipeDistance = 50;

  // Get variant-specific images from custom metafield
  const getVariantImages = useCallback(
    (variant: any) => {
      if (!variant) return [];

      // Get the media nodes from the product data
      const mediaNodes = product.media?.nodes || [];
      const allImages = product.images?.nodes || [];

      // First check for the custom metafield with variant images

      const variantImgsMetafield = variant.metafields?.find(
        (metafield: any) =>
          metafield?.namespace === 'custom' &&
          metafield?.key === 'variant_imgs',
      );


      if (variantImgsMetafield?.value) {
        try {
          // Parse the JSON array of image URLs or GIDs from the metafield
          const imageIdentifiers = JSON.parse(
            variantImgsMetafield.value,
          ) as string[];

          return imageIdentifiers
            .map((identifier: string, index: number) => {
              // Check if the identifier is already a URL (not a GID)
              if (!identifier.startsWith('gid://')) {
                return {
                  id: `variant-img-${variant.id}-${index}`,
                  url: identifier,
                  altText: `${variant.title} - Image ${index + 1}`,
                  width: 800,
                  height: 800,
                };
              }

              // For GIDs, find the corresponding media item or image
              const mediaId = identifier.split('/').pop() || '';

              // IMPROVED: First look for direct matches in media nodes
              const matchedMedia = mediaNodes.find(
                (node: any) =>
                  node.id === identifier ||
                  (node.id?.includes(mediaId) &&
                    node.__typename === 'MediaImage'),
              );

              // If we found a media node with an image, use that
              if (matchedMedia?.image?.url) {
                return {
                  id: matchedMedia.id || `variant-img-${variant.id}-${index}`,
                  url: matchedMedia.image.url,
                  altText:
                    matchedMedia.image.altText ||
                    `${variant.title} - Image ${index + 1}`,
                  width: matchedMedia.image.width || 800,
                  height: matchedMedia.image.height || 800,
                };
              }

              // Fallback: search in product images
              const matchingImage = allImages.find(
                (img: any) =>
                  img.id === identifier || img.id?.includes(mediaId),
              );

              if (matchingImage?.url) {
                return {
                  id: matchingImage.id || `variant-img-${variant.id}-${index}`,
                  url: matchingImage.url,
                  altText:
                    matchingImage.altText ||
                    `${variant.title} - Image ${index + 1}`,
                  width: matchingImage.width || 800,
                  height: matchingImage.height || 800,
                };
              }

              // Last resort: Log that we couldn't find this image and return null
              return null;
            })
            .filter(Boolean); // Filter out any null values
        } catch (e) {
          return [];
        }
      }

      // If no custom images, return an empty array (the variant's main image is added separately)
      return [];
    },
    [product.media?.nodes, product.images?.nodes],
  );

  // Add state to keep track of the currently displayed image
  const [activeImage, setActiveImage] = useState<any>(null);

  // Get custom images for the current variant from metafield
  const [customVariantImages, setCustomVariantImages] = useState<any[]>([]);

  // Track the current product ID to detect when we navigate to a different product
  const previousProductId = useRef<string>(product.id);
  const hasInitializedImage = useRef<boolean>(false);

  // Initialize images when component mounts or when selected variant changes
  useEffect(() => {
    if (currentVariant) {
      // Get variant-specific custom images
      const newVariantImages = getVariantImages(currentVariant);
      setCustomVariantImages(newVariantImages);

      // Detect if this is a new product (different product.id)
      const isNewProduct = previousProductId.current !== product.id;

      console.log('🖼️ [IMAGE DEBUG]', {
        productTitle: product.title,
        isNewProduct,
        hasInitialized: hasInitializedImage.current,
        allProductImagesCount: allProductImages?.length || 0,
        firstImageUrl: allProductImages?.[0]?.url,
        featuredImageUrl: product.featuredImage?.url,
        variantImageUrl: currentVariant.image?.url,
      });

      // On NEW PRODUCT load: ALWAYS use the FEATURED image from Shopify (product.featuredImage)
      if (isNewProduct || !hasInitializedImage.current) {
        // PRIORITÉ 1: Featured Image (photo principale définie dans Shopify)
        if (product.featuredImage?.url) {
          console.log('✅ Using Shopify FEATURED image:', product.featuredImage.url);
          setActiveImage(product.featuredImage);
        }
        // PRIORITÉ 2: Première image dans images.nodes
        else if (allProductImages && allProductImages.length > 0 && allProductImages[0]?.url) {
          console.log('⚠️ No featuredImage, using first image:', allProductImages[0].url);
          setActiveImage(allProductImages[0]);
        }
        // PRIORITÉ 3: Images custom de la variante
        else if (newVariantImages.length > 0) {
          console.log('⚠️ No product images, using variant images[0]:', newVariantImages[0]);
          setActiveImage(newVariantImages[0]);
        }
        // PRIORITÉ 4: Image de la variante
        else if (currentVariant.image?.url) {
          console.log('⚠️ No images, using variant image:', currentVariant.image.url);
          setActiveImage(currentVariant.image);
        }

        // Mark as initialized and update tracked product ID
        hasInitializedImage.current = true;
        previousProductId.current = product.id;
      }
      // Pour les changements de variante: mettre à jour l'image avec celle de la variante si disponible
      else if (currentVariant?.image?.url) {
        console.log('🔄 Variant changed, updating to variant image:', currentVariant.image.url);
        setActiveImage(currentVariant.image);
      }
      // Fallback: si la variante n'a pas d'image propre, utiliser les images custom
      else if (newVariantImages.length > 0) {
        console.log('🔄 Variant changed, using variant custom images[0]:', newVariantImages[0]);
        setActiveImage(newVariantImages[0]);
      }
    }
  }, [currentVariant, getVariantImages, allProductImages, product.id]);

  // Determine which images to display - STRICTLY respect Shopify order
  const displayImages = useMemo(() => {
    if (!currentVariant) {
      return [
        {
          id: 'placeholder-image',
          url: 'https://placehold.co/800x800?text=No+Image+Available',
          altText: 'No image available',
          width: 800,
          height: 800,
        },
      ];
    }

    const images: any[] = [];
    const seenIds = new Set<string>();

    // RESPECTER L'ORDRE SHOPIFY : product.images.nodes dans l'ordre EXACT
    // La première image dans Shopify = images.nodes[0] = photo principale
    // Ne PAS réorganiser avec featuredImage ou variant.image en priorité
    if (allProductImages && allProductImages.length > 0) {
      allProductImages.forEach((img: any) => {
        if (img?.url && img?.id && !seenIds.has(img.id)) {
          images.push(img);
          seenIds.add(img.id);
        }
      });
    }

    // Ajouter les images custom des variantes À LA FIN (si elles existent)
    if (customVariantImages && customVariantImages.length > 0) {
      customVariantImages.forEach((img: any) => {
        if (img?.url && img?.id && !seenIds.has(img.id)) {
          images.push(img);
          seenIds.add(img.id);
        }
      });
    }

    // If we have no images at all, show a placeholder
    if (images.length === 0) {
      return [
        {
          id: 'placeholder-image',
          url: 'https://placehold.co/800x800?text=No+Image+Available',
          altText: 'No image available',
          width: 800,
          height: 800,
        },
      ];
    }

    return images;
  }, [currentVariant, customVariantImages, featuredImage, allProductImages]);

  // Make sure activeImage is one of the display images
  useEffect(() => {
    if (
      displayImages.length > 0 &&
      (!activeImage || !displayImages.some((img) => img.id === activeImage.id))
    ) {
      setActiveImage(displayImages[0]);
    }
  }, [displayImages, activeImage]);

  // Log the image gallery contents for debugging

  // Check if this product has a custom variant
  const customVariant = product.variants.nodes.find(
    (variant: any) => variant?.title?.toLowerCase?.() === 'custom',
  );
  const hasCustomVariant = Boolean(customVariant);
  const isCustomVariantOutOfStock =
    customVariant && !customVariant.availableForSale;

  // Gestionnaires d'événements pour le swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      const currentIndex = displayImages.findIndex((img: any) => img.id === activeImage?.id);

      if (isLeftSwipe && currentIndex < displayImages.length - 1) {
        // Swipe gauche : image suivante
        setActiveImage(displayImages[currentIndex + 1]);
      } else if (isLeftSwipe && currentIndex === displayImages.length - 1) {
        // Revenir à la première image
        setActiveImage(displayImages[0]);
      } else if (isRightSwipe && currentIndex > 0) {
        // Swipe droite : image précédente
        setActiveImage(displayImages[currentIndex - 1]);
      } else if (isRightSwipe && currentIndex === 0) {
        // Revenir à la dernière image
        setActiveImage(displayImages[displayImages.length - 1]);
      }
    }
  };

  // Schema.org structured data for SEO
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": currentVariant?.image?.url || product.featuredImage?.url,
    "sku": currentVariant?.sku || product.id,
    "brand": {
      "@type": "Brand",
      "name": "C'Line Hair"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.clinehair.com/products/${product.handle}`,
      "priceCurrency": currentVariant?.price?.currencyCode || "EUR",
      "price": currentVariant?.price?.amount,
      "availability": currentVariant?.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "C'Line Hair"
      }
    }
  };

  return (
    <div className="pt-4 bg-gradient-to-b from-white via-white/95 to-white min-h-screen relative">
      {/* Schema.org JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(productSchema)}}
      />

      {/* Background decorative elements - modern style matching homepage */}
      <div className="absolute -right-20 top-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-40 bottom-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="w-full mx-auto px-4 md:container relative z-10 mt-8">
        {/* Product Grid */}
        <div className="mb-16 mt-8 lg:mt-16 lg:grid lg:grid-cols-2 lg:gap-8 space-y-8 lg:space-y-0">
          {/* Breadcrumb */}
          <div className="block col-span-2 mb-3">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
                    Accueil
                  </Link>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-gray-400">/</span>
                  <Link
                    to="/products"
                    className="text-sm text-gray-700 hover:text-primary transition-colors whitespace-nowrap"
                  >
                    Nos Produits
                  </Link>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-gray-400">/</span>
                  <span className="text-black font-medium text-xs lg:text-base" aria-current="page">
                    {product.title}
                  </span>
                </li>
              </ol>
            </nav>
          </div>

          {/* Image Gallery */}
          <div className="space-y-4">
            <div
              className="aspect-square w-full max-w-[500px] overflow-hidden rounded-xl border-2 border-primary/30 relative shadow-xl bg-white mx-auto lg:mx-0 group"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {activeImage ? (
                <>
                  <Image
                    data={activeImage}
                    className={`h-full w-full object-cover object-center ${!currentVariant.availableForSale ? 'opacity-70' : ''}`}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    loading="eager"
                    fetchpriority="high"
                  />

                  {/* Discount Badge */}
                  {currentVariant?.compareAtPrice &&
                   currentVariant?.price &&
                   parseFloat(currentVariant.compareAtPrice.amount) > parseFloat(currentVariant.price.amount) && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className="text-black px-3 py-1.5 uppercase font-bold tracking-wider text-sm shadow-lg rounded" style={{ backgroundColor: '#F5A6C6' }}>
                        -{Math.round(((parseFloat(currentVariant.compareAtPrice.amount) - parseFloat(currentVariant.price.amount)) / parseFloat(currentVariant.compareAtPrice.amount)) * 100)}%
                      </div>
                    </div>
                  )}

                  {!currentVariant.availableForSale && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-primary text-white px-6 py-3 uppercase font-bold tracking-wider transform -rotate-12 text-xl shadow-xl rounded">
                        Rupture
                      </div>
                    </div>
                  )}

                  {/* Navigation Arrows - Only show if multiple images */}
                  {displayImages.length > 1 && (
                    <>
                      <button
                        onClick={() => {
                          const currentIndex = displayImages.findIndex((img: any) => img.id === activeImage.id);
                          const prevIndex = currentIndex > 0 ? currentIndex - 1 : displayImages.length - 1;
                          setActiveImage(displayImages[prevIndex]);
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
                        aria-label="Image précédente"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          const currentIndex = displayImages.findIndex((img: any) => img.id === activeImage.id);
                          const nextIndex = currentIndex < displayImages.length - 1 ? currentIndex + 1 : 0;
                          setActiveImage(displayImages[nextIndex]);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
                        aria-label="Image suivante"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="h-full w-full bg-primary/5 flex items-center justify-center">
                  <span className="text-primary-700">Pas d'image</span>
                </div>
              )}
            </div>

            {/* Customer Reviews Section - Desktop only */}
            <div className="hidden lg:block">
              <ProductReviews productHandle={product.handle} />
            </div>

            {/* Out of Stock Banner */}
            {currentVariant && !currentVariant.availableForSale && (
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-2 border-primary/30 p-5 rounded-xl shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-white rounded-full p-2 shadow-sm">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-base text-black font-bold mb-2">
                      Ce produit est actuellement en rupture de stock
                    </p>
                    <p className="text-sm text-gray-700">
                      Vous pouvez l'ajouter à votre liste de souhaits ou revenir plus tard
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Display a note when showing variant-specific images */}
            {customVariantImages.length > 0 && (
              <div className="text-sm text-gray-600 italic bg-primary/5 px-3 py-2 rounded-lg border border-primary/20">
                ✨ Images spécifiques à la variante sélectionnée
              </div>
            )}

            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                {displayImages.map((image: any, index: number) => (
                  <div
                    key={image.id}
                    className={`aspect-square overflow-hidden rounded-md border cursor-pointer transition-all duration-300 ${
                      activeImage?.id === image.id
                        ? 'border-primary scale-105 shadow-md'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => setActiveImage(image)}
                    role="button"
                    aria-label={`View ${image.altText || 'product image'}`}
                  >
                    <Image
                      data={image}
                      className="h-full w-full object-cover"
                      sizes="(min-width: 1024px) 10vw, 20vw"
                      loading={index < 6 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-2xl font-bold text-black leading-tight flex-1">{product.title}</h1>

              {/* Wishlist Button */}
              <WishlistButton
                productId={product.id}
                productHandle={product.handle}
                productTitle={product.title}
                productImage={product.featuredImage?.url}
                productPrice={currentVariant.price.amount}
                size="lg"
                showLabel={false}
              />
            </div>

            {/* Reviews Section - Utilise les données cohérentes */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex text-yellow-400" role="img" aria-label={`Rating: ${reviewMetadata.rating} out of 5 stars`}>
                {/* Étoiles pleines */}
                {[...Array(Math.floor(reviewMetadata.rating))].map((_, i) => (
                  <svg key={`full-${i}`} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                {/* Demi-étoile si nécessaire */}
                {reviewMetadata.rating % 1 >= 0.5 && (
                  <svg className="w-5 h-5 fill-current opacity-50" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-600 font-medium">{formatReviewCount(reviewMetadata.count)}</span>
              <div className="flex items-center gap-1 ml-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-green-600 font-semibold">Avis vérifiés</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className="text-xl font-bold text-black bg-primary px-4 py-2 rounded-md">
                <Money data={currentVariant.price} />
              </div>

              {currentVariant.compareAtPrice && (
                <div className="text-lg text-red-500 line-through font-extrabold">
                  <Money data={currentVariant.compareAtPrice} />
                </div>
              )}
            </div>


            {/* Countdown Timer - Always visible */}
            <ClientOnly>
              <div className="w-full bg-primary/5 border border-black rounded-lg px-6 py-3 md:px-8 flex flex-row items-center justify-between gap-4 md:gap-6 mb-6">
                <span className="text-black font-semibold text-xs md:text-sm uppercase">
                  FIN DE L'OFFRE DANS :
                </span>
                <div className="flex items-start gap-1 md:gap-1.5">
                  {/* Hours */}
                  <div className="flex flex-col items-center gap-0.5 md:gap-1">
                    <div className="bg-primary text-black font-bold text-base md:text-lg rounded-lg px-2 py-1.5 md:px-3 min-w-[38px] md:min-w-[45px] text-center">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <span className="text-gray-500 text-[10px] md:text-xs">Heures</span>
                  </div>
                  <span className="text-primary font-bold text-base md:text-lg mt-1.5">:</span>

                  {/* Minutes */}
                  <div className="flex flex-col items-center gap-0.5 md:gap-1">
                    <div className="bg-primary text-black font-bold text-base md:text-lg rounded-lg px-2 py-1.5 md:px-3 min-w-[38px] md:min-w-[45px] text-center">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <span className="text-gray-500 text-[10px] md:text-xs">Minutes</span>
                  </div>
                  <span className="text-primary font-bold text-base md:text-lg mt-1.5">:</span>

                  {/* Seconds */}
                  <div className="flex flex-col items-center gap-0.5 md:gap-1">
                    <div className="bg-primary text-black font-bold text-base md:text-lg rounded-lg px-2 py-1.5 md:px-3 min-w-[38px] md:min-w-[45px] text-center">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <span className="text-gray-500 text-[10px] md:text-xs">Secondes</span>
                  </div>
                </div>
              </div>
            </ClientOnly>

            <div className="prose prose-sm max-w-none mb-8 text-black">
              <div
                dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
              />
            </div>

            {/* Product Form */}
            <Suspense fallback={<div>Loading...</div>}>
              <ProductForm
                product={product}
                storeDomain={storeDomain}
                externalSelectedVariant={currentVariant}
                colorOptions={colorOptions}
                onVariantChange={useCallback(
                  (variant: any) => {
                    // Update our local state with the new variant
                    setCurrentVariant(variant);
                  },
                  [setCurrentVariant],
                )}
              />
            </Suspense>

            {/* Customize Button */}
            {hasCustomVariant && (
              <div
                className={`mt-6 p-6 rounded-lg relative ${isCustomVariantOutOfStock ? 'bg-amber-50 border border-amber-200' : 'bg-primary/10 border-2 border-primary/30'}`}
              >
                {isCustomVariantOutOfStock && (
                  <div className="absolute -top-3 -right-3 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-md">
                    Indisponible
                  </div>
                )}

                <div className="flex items-start">
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-bold mb-2 flex items-center ${isCustomVariantOutOfStock ? 'text-gray-500' : 'text-primary'}`}
                    >
                      🎨 Personnalisez Votre Produit
                    </h3>
                    <p
                      className={`text-sm mb-4 ${isCustomVariantOutOfStock ? 'text-gray-500' : 'text-gray-700'}`}
                    >
                      Personnalisez ce produit avec vos propres images, textes et designs pour créer quelque chose d'unique !
                    </p>

                    {isCustomVariantOutOfStock ? (
                      <div className="bg-amber-100 border border-amber-300 rounded-lg p-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-amber-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-amber-800 text-sm font-bold">
                              La personnalisation est actuellement indisponible
                            </p>
                            <p className="text-amber-700 text-xs mt-1">
                              Revenez plus tard ou contactez-nous pour plus d'informations.
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 border-t border-amber-300 pt-3 text-center">
                          <p className="text-amber-700 text-xs">
                            Souhaitez-vous être averti lorsque la personnalisation sera disponible ?
                          </p>
                          <button
                            className="mt-2 text-white bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg text-xs font-medium inline-flex items-center transition-colors"
                            onClick={() =>
                              alert(
                                'Inscription aux notifications de disponibilité',
                              )
                            }
                          >
                            <svg
                              className="mr-1 h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                              />
                            </svg>
                            Me Prévenir
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link
                            to={`/customize-product/${product.handle}`}
                            className="inline-flex items-center justify-center bg-primary hover:bg-primary-400 text-black font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl flex-1"
                          >
                            <svg
                              className="mr-2 h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                            Commencer la Personnalisation
                          </Link>
                          <button
                            onClick={() =>
                              alert('Exemples de produits personnalisés')
                            }
                            className="inline-flex items-center justify-center bg-white border-2 border-primary hover:bg-primary/10 text-primary font-medium py-3 px-6 rounded-lg transition-all"
                          >
                            <svg
                              className="mr-2 h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                              />
                            </svg>
                            Voir des Exemples
                          </button>
                        </div>
                        <p className="text-xs text-gray-600 italic text-center">
                          Les produits personnalisés sont expédiés sous 5-7 jours ouvrables
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Product meta information */}
            {(product.tags?.length > 0 || product.productType) && (
              <div className="border-t border-primary/10 mt-8 pt-6 text-sm">
                {product.productType && (
                  <div className="flex mb-2">
                    <span className="w-32 font-medium">Type de produit :</span>
                    <span>{product.productType}</span>
                  </div>
                )}

                {product.tags && product.tags.length > 0 && (
                  <div className="flex">
                    <span className="w-32 font-medium">Catégories :</span>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="bg-primary/10 px-2 py-1 rounded-lg text-xs border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quality Guarantee */}
            <div className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 rounded-lg p-5 shadow-sm">
              <h3 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Garantie {config.brandName}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Chaque produit est fabriqué avec le plus grand soin et soutenu par l'engagement de {config.brandName} pour l'excellence et la qualité. Nous garantissons votre satisfaction.
              </p>
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-4 mt-8">
              {/* Section 1 - Conditions de retour */}
              <details className="group border border-primary/30 rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer bg-white hover:bg-primary/5 px-6 py-4 transition-colors">
                  <h3 className="text-base font-bold text-black">Conditions de retour – 14 jours</h3>
                  <svg className="w-5 h-5 text-primary transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="#F5A6C6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 py-4 bg-white text-sm text-black leading-relaxed">
                  <p className="mb-4">Vous disposez de <strong>14 jours</strong> après réception pour retourner ou échanger votre article. Pour être éligible au remboursement, le produit doit respecter les conditions suivantes :</p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Perruque jamais portée</li>
                    <li>Lace en parfait état (non coupée, non maquillée, non customisée)</li>
                    <li>Fibres propres, sans odeur, sans traces de produits</li>
                    <li>Accessoires et packaging d'origine inclus</li>
                    <li>Étiquette intacte</li>
                  </ul>
                  <p className="mb-4">Les retours sont soumis à des <strong>frais de 5€</strong> si le produit est conforme aux conditions ci-dessus. Une fois le colis reçu, le remboursement est effectué sous <strong>3 à 7 jours ouvrés</strong>.</p>
                  <p className="text-primary font-semibold">❗ Tout article porté, altéré, abîmé ou présentant des traces de manipulation ne pourra pas être remboursé.</p>
                </div>
              </details>

              {/* Section 2 - Entretien */}
              <details className="group border border-primary/30 rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer bg-white hover:bg-primary/5 px-6 py-4 transition-colors">
                  <h3 className="text-base font-bold text-black">Conseils d'entretien essentiels</h3>
                  <svg className="w-5 h-5 text-primary transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 py-4 bg-white text-sm text-black leading-relaxed">
                  <p className="mb-4">Voici quelques gestes simples pour garder votre perruque belle plus longtemps :</p>

                  <div className="mb-6">
                    <h4 className="font-bold text-primary mb-2">Pour les perruques naturelles</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Lavez-la tous les 7 à 10 ports avec un shampoing doux</li>
                      <li>Appliquez un soin hydratant et un conditionneur léger</li>
                      <li>Brossez toujours des pointes vers les racines</li>
                      <li>Utilisez un spray thermoprotecteur avant brushing ou lissage</li>
                      <li>Laissez sécher à l'air libre de préférence</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold text-primary mb-2">Pour les perruques synthétiques</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Utilisez uniquement des produits adaptés aux fibres synthétiques</li>
                      <li>Évitez la chaleur (sauf modèles heat resistant)</li>
                      <li>Séchez toujours naturellement, sans sèche-cheveux</li>
                      <li>Rangez sur un support pour conserver la forme</li>
                    </ul>
                  </div>

                  <div className="bg-primary/10 border-l-4 border-primary px-4 py-3 rounded">
                    <h4 className="font-bold text-primary mb-2">💡 Astuce générale</h4>
                    <p>Gardez votre perruque dans un endroit sec, à l'écart du soleil direct pour éviter qu'elle ne s'assèche ou ne décolore.</p>
                  </div>
                </div>
              </details>
            </div>

            {/* Customer Reviews Section - Mobile only */}
            <div className="lg:hidden mt-8">
              <ProductReviews productHandle={product.handle} />
            </div>
          </div>
        </div>

        {/* Best Sellers Section */}
        {randomProducts && randomProducts.length > 0 && (
          <>
            {/* Section titre */}
            <section className="pt-5 pb-16 bg-white mt-20 border-t border-primary/20">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="inline-block bg-primary text-black font-bold py-1 px-4 mb-6 tracking-wider rounded-sm">
                    Nos Produits Iconiques & Recommandés par des Milliers de Femmes
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    <span className="text-black">LES BEST SELLERS</span><br />
                    <span className="text-primary tracking-wider hero-title-glow">C'LINE HAIR</span>
                  </h1>
                </div>
              </div>
            </section>

            {/* Section produits */}
            <section className="relative pb-20 lg:py-20 bg-white">
              {/* Background decorative elements */}
              <div className="absolute -right-20 top-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute -left-40 bottom-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

              <div className="relative container mx-auto px-3 md:px-6 lg:px-8 z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {randomProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      loading="lazy"
                      compact={true}
                    />
                  ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center mt-8">
                  <Link
                    to="/products"
                    prefetch="intent"
                    className="inline-flex items-center gap-3 bg-white hover:bg-white/90 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
                  >
                    VOIR PLUS
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Add the CSS styles directly */}
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                  .hero-title-glow {
                    text-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.4);
                  }

                  .shadow-glow {
                    box-shadow: 0 4px 20px rgba(var(--color-primary-rgb), 0.25);
                  }
                `,
                }}
              />
            </section>
          </>
        )}

      </div>

      {/* Analytics */}
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              vendor: product.vendor,
              variantId: currentVariant?.id || '',
              variantTitle: currentVariant?.title || '',
              price: currentVariant?.price?.amount || '0',
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}

// Query pour récupérer tous les metaobjects Couleur
const COLOR_METAOBJECTS_QUERY = `#graphql
  query ColorMetaobjects {
    metaobjects(type: "shopify--color-pattern", first: 250) {
      nodes {
        id
        handle
        type
        fields {
          key
          value
          type
          reference {
            ... on MediaImage {
              id
              image {
                url(transform: {maxWidth: 300, maxHeight: 300, crop: CENTER})
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

const PRODUCT_QUERY = `#graphql
  query ProductDetails($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      vendor
      tags
      productType
      featuredImage {
        id
        url(transform: {maxWidth: 800, maxHeight: 800, crop: CENTER})
        altText
        width
        height
      }
      images(first: 20) {
        nodes {
          id
          url(transform: {maxWidth: 800, maxHeight: 800, crop: CENTER})
          altText
          width
          height
        }
      }
      media(first: 20) {
        nodes {
          id
          ... on MediaImage {
            image {
              id
              url(transform: {maxWidth: 800, maxHeight: 800, crop: CENTER})
              altText
              width
              height
            }
          }
        }
      }
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: []) {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
        image {
          id
          url(transform: {maxWidth: 800, maxHeight: 800, crop: CENTER})
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        sku
        title
        unitPrice {
          amount
          currencyCode
        }
        product {
          title
          handle
        }
      }
      variants(first: 250) {
        nodes {
          id
          title
          availableForSale
          image {
            id
            url(transform: {maxWidth: 800, maxHeight: 800, crop: CENTER})
            altText
            width
            height
          }
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          sku
          metafields(identifiers: [
            {namespace: "custom", key: "variant_imgs"},
            {namespace: "custom", key: "couleur"}
          ]) {
            key
            value
            namespace
            reference {
              ... on Metaobject {
                id
                type
                labelField: field(key: "Label") {
                  value
                }
                imageField: field(key: "Image") {
                  reference {
                    ... on MediaImage {
                      id
                      image {
                        url(transform: {maxWidth: 300, maxHeight: 300, crop: CENTER})
                        altText
                        width
                        height
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      seo {
        title
        description
      }
      metafields(identifiers: [
        {namespace: "custom", key: "related_products"},
        {namespace: "custom", key: "couleurs"}
      ]) {
        key
        value
        type
        references(first: 50) {
          nodes {
            ... on Metaobject {
              id
              type
              fields {
                key
                value
                type
                reference {
                  ... on MediaImage {
                    id
                    image {
                      url(transform: {maxWidth: 300, maxHeight: 300, crop: CENTER})
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    # Fetch recommended products - top selling products from the same collection
    recommendedProducts: products(first: 4, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
        description
        descriptionHtml
        vendor
        featuredImage {
          id
          url(transform: {maxWidth: 800, maxHeight: 800, crop: CENTER})
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 1) {
          nodes {
            id
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
