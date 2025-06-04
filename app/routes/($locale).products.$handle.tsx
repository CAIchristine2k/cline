import {redirect, type LoaderFunctionArgs} from 'react-router';
import {useLoaderData, type MetaFunction, Link} from 'react-router';
import {useState, useCallback, useEffect, useMemo} from 'react';
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
import {Suspense} from 'react';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const config = getConfig();
  return [
    {title: `${config.brandName} | ${data?.product.title ?? ''}`},
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
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

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: data.product});

  return {
    product: data.product,
    recommendedProducts: data.recommendedProducts?.nodes || [],
    storeDomain: storefront.getShopifyDomain(),
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

export default function Product() {
  const {product, recommendedProducts, storeDomain} =
    useLoaderData<typeof loader>();
  const config = useConfig();

  // Track the currently selected variant from ProductForm
  const [currentVariant, setCurrentVariant] = useState(
    product?.selectedVariant ?? product?.variants?.nodes[0],
  );

  // Update variant when the loader data changes (e.g., on URL changes)
  useEffect(() => {
    setCurrentVariant(product?.selectedVariant ?? product?.variants?.nodes[0]);
  }, [product?.selectedVariant, product?.variants?.nodes]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-6">Product not found</h1>
        <p className="mb-8">The product you're looking for does not exist.</p>
        <Link
          to="/collections"
          className="bg-primary text-background px-6 py-3 rounded-sm"
        >
          Back to Collections
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

  // Get variant-specific images from custom metafield
  const getVariantImages = useCallback(
    (variant: any) => {
      if (!variant) return [];

      // Get the media nodes from the product data
      const mediaNodes = product.media?.nodes || [];
      const allImages = product.images?.nodes || [];

      // First check for the custom metafield with variant images
      console.log('Variant metafields:', variant.metafields);

      const variantImgsMetafield = variant.metafields?.find(
        (metafield: any) =>
          metafield?.namespace === 'custom' &&
          metafield?.key === 'variant_imgs',
      );

      console.log('Found variant_imgs metafield:', variantImgsMetafield);

      if (variantImgsMetafield?.value) {
        try {
          // Parse the JSON array of image URLs or GIDs from the metafield
          const imageIdentifiers = JSON.parse(
            variantImgsMetafield.value,
          ) as string[];
          console.log('Parsed image identifiers:', imageIdentifiers);

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

              // Log resolution attempt
              console.log(`Resolving GID: ${identifier}`, {
                mediaId,
                found: !!matchedMedia?.image?.url,
                hasImage: !!matchedMedia?.image,
                imageUrl: matchedMedia?.image?.url,
              });

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
              console.warn(`Could not resolve GID to image URL: ${identifier}`);
              return null;
            })
            .filter(Boolean); // Filter out any null values
        } catch (e) {
          console.error('Error parsing variant images:', e);
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

  // Initialize images when component mounts or when selected variant changes
  useEffect(() => {
    console.log('Variant changed effect running for:', currentVariant?.title);

    if (currentVariant) {
      // Get variant-specific custom images
      const newVariantImages = getVariantImages(currentVariant);
      console.log('New variant images:', newVariantImages.length);
      setCustomVariantImages(newVariantImages);

      // Set active image to variant's main image or first custom image
      if (currentVariant.image?.url) {
        console.log(
          'Setting active image to variant image:',
          currentVariant.image.url,
        );
        setActiveImage(currentVariant.image);
      } else if (newVariantImages.length > 0) {
        console.log(
          'Setting active image to first custom image:',
          newVariantImages[0].url,
        );
        setActiveImage(newVariantImages[0]);
      } else if (featuredImage?.url) {
        console.log(
          'Setting active image to featured image:',
          featuredImage.url,
        );
        setActiveImage(featuredImage);
      }
    }
  }, [currentVariant, getVariantImages, featuredImage]);

  // Determine which images to display - the variant's main image plus any custom variant images
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

    const variantImages = [
      // First add the variant's main image if it exists
      ...(currentVariant.image?.url ? [currentVariant.image] : []),
      // Then add any custom variant-specific images
      ...customVariantImages,
    ];

    // If we have no images at all, show a placeholder
    if (variantImages.length === 0) {
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

    return variantImages;
  }, [currentVariant, customVariantImages]);

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
  console.log('Display Images:', {
    count: displayImages.length,
    variantHasMainImage: !!currentVariant?.image?.url,
    customImagesCount: customVariantImages.length,
    activeImageId: activeImage?.id,
    variantTitle: currentVariant?.title,
    images: displayImages.map((img: any) => ({id: img.id, url: img.url})),
  });

  // Check if this product has a custom variant
  const customVariant = product.variants.nodes.find(
    (variant: any) => variant?.title?.toLowerCase?.() === 'custom',
  );
  const hasCustomVariant = Boolean(customVariant);
  const isCustomVariantOutOfStock =
    customVariant && !customVariant.availableForSale;

  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-primary hover:text-primary-600">
                  Home
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-primary-700">/</span>
                <Link
                  to="/collections"
                  className="text-primary hover:text-primary-600"
                >
                  Collections
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-primary-700">/</span>
                <span className="text-primary-800" aria-current="page">
                  {product.title}
                </span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Out of Stock Banner */}
        {currentVariant && !currentVariant.availableForSale && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
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
                <p className="text-sm text-red-700 font-medium">
                  This product is currently{' '}
                  <span className="font-bold">out of stock</span>
                </p>
                <p className="text-xs text-red-600 mt-1">
                  You can add it to your wishlist or check back later for
                  availability
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-sm border border-primary/10 relative">
              {activeImage ? (
                <>
                  <Image
                    data={activeImage}
                    className={`h-full w-full object-cover ${!currentVariant.availableForSale ? 'opacity-70' : ''}`}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  {!currentVariant.availableForSale && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-red-500 text-white px-4 py-2 uppercase font-bold tracking-wider transform -rotate-12 text-lg shadow-lg">
                        Out of Stock
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="h-full w-full bg-primary/5 flex items-center justify-center">
                  <span className="text-primary-700">No image</span>
                </div>
              )}
            </div>

            {/* Display a note when showing variant-specific images */}
            {customVariantImages.length > 0 && (
              <div className="text-sm text-primary/80 italic">
                Images shown are specific to the selected variant
              </div>
            )}

            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {displayImages.map((image: any) => (
                  <div
                    key={image.id}
                    className={`aspect-square overflow-hidden rounded-sm border cursor-pointer transition-all duration-300 ${
                      activeImage?.id === image.id
                        ? 'border-primary scale-105'
                        : 'border-primary/10 hover:border-primary/50'
                    }`}
                    onClick={() => setActiveImage(image)}
                    role="button"
                    aria-label={`View ${image.altText || 'product image'}`}
                  >
                    <Image
                      data={image}
                      className="h-full w-full object-cover"
                      sizes="(min-width: 1024px) 15vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {product.vendor && (
              <div className="text-primary-700 mb-2">{product.vendor}</div>
            )}

            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-2xl font-bold text-primary">
                <Money data={currentVariant.price} />
              </div>

              {currentVariant.compareAtPrice && (
                <div className="text-lg text-red-500 line-through">
                  <Money data={currentVariant.compareAtPrice} />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div
                className={`h-3 w-3 rounded-full ${currentVariant.availableForSale ? 'bg-green-500' : 'bg-red-500'}`}
              ></div>
              <span className="text-sm">
                {currentVariant.availableForSale ? 'In stock' : 'Out of stock'}
              </span>
            </div>

            <div className="prose prose-sm max-w-none mb-8">
              <div
                dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
              />
            </div>

            {/* Product Form */}
            <Suspense fallback={<div>Loading...</div>}>
              <ProductForm
                product={product}
                storeDomain={storeDomain}
                onVariantChange={useCallback(
                  (variant: any) => {
                    // Update our local state with the new variant
                    console.log('Variant changed to:', variant?.title);
                    setCurrentVariant(variant);
                  },
                  [setCurrentVariant],
                )}
              />
            </Suspense>

            {/* Customize Button */}
            {hasCustomVariant && (
              <div
                className={`mt-6 p-4 rounded-sm relative ${isCustomVariantOutOfStock ? 'bg-red-50 border border-red-200' : 'bg-blue-500/10 border border-blue-500/30'}`}
              >
                {isCustomVariantOutOfStock && (
                  <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-md">
                    Unavailable
                  </div>
                )}

                <div className="flex items-start">
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-bold mb-2 flex items-center ${isCustomVariantOutOfStock ? 'text-gray-500' : 'text-blue-400'}`}
                    >
                      🎨 Create Custom Products Your Way
                    </h3>
                    <p
                      className={`text-sm mb-4 ${isCustomVariantOutOfStock ? 'text-gray-400' : 'text-blue-300'}`}
                    >
                      Customize this product with your own images, text, and
                      designs to create something truly unique!
                    </p>

                    {isCustomVariantOutOfStock ? (
                      <div className="bg-red-600/20 border border-red-600/30 rounded-md p-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-red-500"
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
                            <p className="text-red-400 text-sm font-bold">
                              Custom product creation is currently unavailable
                            </p>
                            <p className="text-red-300 text-xs mt-1">
                              Please check back later or contact us for
                              availability.
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 border-t border-red-300/30 pt-3 text-center">
                          <p className="text-red-400 text-xs">
                            Want to be notified when custom products are
                            available?
                          </p>
                          <button
                            className="mt-2 text-red-100 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-sm text-xs font-medium inline-flex items-center"
                            onClick={() =>
                              alert(
                                'This would sign you up for stock notifications',
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
                            Notify Me
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link
                            to={`/customize-product/${product.handle}`}
                            className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition-colors flex-1"
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
                            Start Customizing
                          </Link>
                          <button
                            onClick={() =>
                              alert('This would show custom product examples')
                            }
                            className="inline-flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-3 px-6 rounded-md transition-colors"
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
                            See Examples
                          </button>
                        </div>
                        <p className="text-xs text-blue-300 italic text-center">
                          Custom products ship within 5-7 business days
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
                    <span className="w-32 font-medium">Product Type:</span>
                    <span>{product.productType}</span>
                  </div>
                )}

                {product.tags && product.tags.length > 0 && (
                  <div className="flex">
                    <span className="w-32 font-medium">Tags:</span>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="bg-primary/10 px-2 py-1 rounded-sm text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Championship Guarantee */}
            <div className="mt-8 bg-primary/10 border border-primary/30 rounded-sm p-4">
              <h3 className="text-lg font-bold text-primary mb-2">
                {config.influencerName}'s Guarantee
              </h3>
              <p className="text-sm text-text/80">
                Every product is crafted to championship standards and backed by{' '}
                {config.influencerName}'s legacy of excellence. Train like a
                champion with gear approved by a{' '}
                {config.influencerTitle.toLowerCase()}.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {recommendedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recommendedProducts.map((relatedProduct: any) => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.handle}`}
                  className="group"
                >
                  <div className="border border-primary/10 rounded-sm overflow-hidden bg-background mb-3 relative">
                    {relatedProduct.featuredImage && (
                      <Image
                        data={relatedProduct.featuredImage}
                        className="w-full h-auto object-cover aspect-square group-hover:scale-105 transition-transform duration-300"
                        sizes="(min-width: 768px) 25vw, 50vw"
                      />
                    )}
                    {relatedProduct.variants?.nodes[0] &&
                      !relatedProduct.variants.nodes[0].availableForSale && (
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 m-2 rounded-sm">
                          Out of Stock
                        </div>
                      )}
                  </div>
                  <h3 className="font-medium text-primary group-hover:text-primary-600">
                    {relatedProduct.title}
                  </h3>
                  {relatedProduct.variants?.nodes[0] && (
                    <div className="mt-1 text-primary-700">
                      <Money data={relatedProduct.variants.nodes[0].price} />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
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
      images(first: 10) {
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
      variants(first: 10) {
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
          metafields(identifiers: [{namespace: "custom", key: "variant_imgs"}]) {
            key
            value
            namespace
          }
        }
      }
      seo {
        title
        description
      }
      metafields(identifiers: [{namespace: "custom", key: "related_products"}]) {
        key
        value
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
