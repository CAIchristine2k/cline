import {redirect, type LoaderFunctionArgs} from 'react-router';
import {useLoaderData, type MetaFunction, Link} from 'react-router';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
  Image,
  Money,
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
    storeDomain: storefront.getShopifyDomain()
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
  const {product, recommendedProducts, storeDomain} = useLoaderData<typeof loader>();
  const config = useConfig();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-6">Product not found</h1>
        <p className="mb-8">The product you're looking for does not exist.</p>
        <Link to="/collections" className="bg-primary text-background px-6 py-3 rounded-sm">
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
        variantGid: product.variants.nodes[0]?.id,
        name: product.title,
        variantName: product.variants.nodes[0]?.title,
        brand: product.vendor,
        price: product.variants.nodes[0]?.price.amount,
      },
    ],
    pageType: 'product',
  };

  const featuredImage = product.featuredImage;
  const images = product.images.nodes;
  const selectedVariant = product.selectedVariant ?? product.variants.nodes[0];
  
  // Check if this product has a custom variant
  const customVariant = product.variants.nodes.find(
    (variant: any) => variant?.title?.toLowerCase?.() === 'custom'
  );
  const hasCustomVariant = Boolean(customVariant);
  const isCustomVariantOutOfStock = customVariant && !customVariant.availableForSale;
  
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-primary hover:text-primary-600">Home</Link>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-primary-700">/</span>
                <Link to="/collections" className="text-primary hover:text-primary-600">
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-sm border border-primary/10">
              {featuredImage ? (
                <Image
                  data={featuredImage}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              ) : (
                <div className="h-full w-full bg-primary/5 flex items-center justify-center">
                  <span className="text-primary-700">No image</span>
                </div>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image: any) => (
                  <div key={image.id} className="aspect-square overflow-hidden rounded-sm border border-primary/10">
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
                <Money data={selectedVariant.price} />
              </div>
              
              {selectedVariant.compareAtPrice && (
                <div className="text-lg text-red-500 line-through">
                  <Money data={selectedVariant.compareAtPrice} />
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <div className={`h-3 w-3 rounded-full ${selectedVariant.availableForSale ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm">
                {selectedVariant.availableForSale ? 'In stock' : 'Out of stock'}
              </span>
            </div>
            
            <div className="prose prose-sm max-w-none mb-8">
              <div dangerouslySetInnerHTML={{__html: product.descriptionHtml}} />
            </div>
            
            {/* Product Form */}
            <Suspense fallback={<div>Loading...</div>}>
              <ProductForm product={product} storeDomain={storeDomain} />
            </Suspense>
            
            {/* Customize Button */}
            {hasCustomVariant && (
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-blue-400 mb-2 flex items-center">
                      🎨 Make It Your Own
                    </h3>
                    <p className="text-sm text-blue-300 mb-4">
                      Customize this product with your own images, text, and designs to create something truly unique!
                    </p>
                    
                    {isCustomVariantOutOfStock ? (
                      <div className="bg-red-600/20 border border-red-600/30 rounded-md p-3">
                        <p className="text-red-400 text-sm font-semibold">
                          ⚠️ Custom variants are currently out of stock
                        </p>
                        <p className="text-red-300 text-xs mt-1">
                          Please check back later or contact us for availability.
                        </p>
                      </div>
                    ) : (
                      <Link
                        to={`/customize-product/${product.handle}`}
                        className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition-colors"
                      >
                        <span className="mr-2">🎨</span>
                        Start Customizing
                      </Link>
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
                        <span key={tag} className="bg-primary/10 px-2 py-1 rounded-sm text-xs">
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
                Every product is crafted to championship standards and backed by {config.influencerName}'s 
                legacy of excellence. Train like a champion with gear approved by 
                a {config.influencerTitle.toLowerCase()}.
              </p>
            </div>
          </div>
        </div>
      
        {/* Related Products Section */}
        {recommendedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-primary">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recommendedProducts.map((relatedProduct: any) => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.handle}`}
                  className="group"
                >
                  <div className="border border-primary/10 rounded-sm overflow-hidden bg-background mb-3">
                    {relatedProduct.featuredImage && (
                      <Image
                        data={relatedProduct.featuredImage}
                        className="w-full h-auto object-cover aspect-square group-hover:scale-105 transition-transform duration-300"
                        sizes="(min-width: 768px) 25vw, 50vw"
                      />
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
      <Analytics.ProductView data={{
        products: [{
          id: product.id,
          title: product.title,
          vendor: product.vendor,
          variantId: selectedVariant?.id || '',
          variantTitle: selectedVariant?.title || '',
          price: selectedVariant?.price?.amount || '0',
          quantity: 1
        }]
      }} />
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
        url
        altText
        width
        height
      }
      images(first: 5) {
        nodes {
          id
          url
          altText
          width
          height
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
          url
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
          url
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
