import { useLoaderData, type LoaderFunctionArgs } from 'react-router';

export async function loader({ context }: LoaderFunctionArgs) {
  // Try to fetch data from Shopify to test connection
  let products = null;
  let collections = null;
  let error = null;
  let shopifyDomain = null;

  try {
    // Test fetching products
    const productsResponse = await context.storefront.query(PRODUCTS_QUERY, {
      variables: { first: 5 },
    });
    products = productsResponse.products?.nodes;
    
    // Test fetching collections
    const collectionsResponse = await context.storefront.query(COLLECTIONS_QUERY, {
      variables: { first: 5 },
    });
    collections = collectionsResponse.collections?.nodes;
    
    // Get store domain info
    shopifyDomain = context.env.PUBLIC_STORE_DOMAIN;
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unknown error';
    console.error('Shopify connection error:', e);
  }

  return {
    products,
    collections,
    error,
    shopifyDomain,
    environment: {
      // Safely return environment info for debugging
      hasDomain: Boolean(context.env.PUBLIC_STORE_DOMAIN),
      hasToken: Boolean(context.env.PUBLIC_STOREFRONT_API_TOKEN),
      hasSessionSecret: Boolean(context.env.SESSION_SECRET),
    },
  };
}

export default function ShopifyTest() {
  const { products, collections, error, shopifyDomain, environment } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Shopify Connection Test</h1>
      
      <h2 className="text-xl font-bold mb-4">Environment</h2>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <p><strong>Shopify Domain Set:</strong> {environment.hasDomain ? '✅' : '❌'}</p>
        <p><strong>API Token Set:</strong> {environment.hasToken ? '✅' : '❌'}</p>
        <p><strong>Session Secret Set:</strong> {environment.hasSessionSecret ? '✅' : '❌'}</p>
        {shopifyDomain && <p><strong>Store Domain:</strong> {shopifyDomain}</p>}
      </div>
      
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-6">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Products ({products?.length || 0})</h2>
          {products && products.length > 0 ? (
            <ul className="bg-gray-100 p-4 rounded mb-6">
              {products.map((product: any) => (
                <li key={product.id} className="mb-2">
                  <strong>{product.title}</strong> - Handle: {product.handle}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-6">No products found in your Shopify store.</p>
          )}
          
          <h2 className="text-xl font-bold mb-4">Collections ({collections?.length || 0})</h2>
          {collections && collections.length > 0 ? (
            <ul className="bg-gray-100 p-4 rounded mb-6">
              {collections.map((collection: any) => (
                <li key={collection.id} className="mb-2">
                  <strong>{collection.title}</strong> - Handle: {collection.handle}
                </li>
              ))}
            </ul>
          ) : (
            <p>No collections found in your Shopify store.</p>
          )}
        </>
      )}
    </div>
  );
}

const PRODUCTS_QUERY = `#graphql
  query ProductsTest($first: Int!) {
    products(first: $first) {
      nodes {
        id
        title
        handle
        description
      }
    }
  }
` as const;

const COLLECTIONS_QUERY = `#graphql
  query CollectionsTest($first: Int!) {
    collections(first: $first) {
      nodes {
        id
        title
        handle
        description
      }
    }
  }
` as const; 