# Pagination

The [Storefront API uses cursors](https://shopify.dev/docs/api/usage/pagination-graphql) to paginate through lists of data and the `<Pagination />` component makes it easy to paginate data from the Storefront API. It is important for pagination state to be maintained in the URL, so that the user can navigate to a product and return back to the same scrolled position in a list. It is also important that the list state is shareable via URL. The `<Pagination>` component provides a render prop with properties to load more elements into your list.

```jsx
import {Pagination, getPaginationVariables} from '@shopify/hydrogen';
import {useLoaderData, Link} from 'react-router';

export async function loader({request, context: {storefront}}) {
  const variables = getPaginationVariables(request, {pageBy: 8});

  const data = await storefront.query(ALL_PRODUCTS_QUERY, {
    variables,
  });

  return {products: data.products};
}

export default function List() {
  const {products} = useLoaderData();

  return (
    <Pagination connection={products}>
      {({nodes, PreviousLink, NextLink}) => (
        <>
          <PreviousLink>Previous</PreviousLink>
          <div>
            {nodes.map((product) => (
              <Link key={product.id} to={`/products/${product.handle}`}>
                {product.title}
              </Link>
            ))}
          </div>
          <NextLink>Next</NextLink>
        </>
      )}
    </Pagination>
  );
}

const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes { id
        title
        handle
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

```

```tsx
import {type LoaderFunctionArgs} from 'react-router';
import {Pagination, getPaginationVariables} from '@shopify/hydrogen';
import {useLoaderData, Link} from 'react-router';
import {ProductConnection} from '@shopify/hydrogen/storefront-api-types';

export async function loader({
  request,
  context: {storefront},
}: LoaderFunctionArgs) {
  const variables = getPaginationVariables(request, {pageBy: 8});

  const data = await storefront.query<{products: ProductConnection}>(
    ALL_PRODUCTS_QUERY,
    {
      variables,
    },
  );

  return {products: data.products};
}

export default function List() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <Pagination connection={products}>
      {({nodes, NextLink, PreviousLink}) => (
        <>
          <PreviousLink>Previous</PreviousLink>
          <div>
            {nodes.map((product) => (
              <Link key={product.id} to={`/products/${product.handle}`}>
                {product.title}
              </Link>
            ))}
          </div>
          <NextLink>Next</NextLink>
        </>
      )}
    </Pagination>
  );
}

const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes { id
        title
        handle
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

```

## Props

### PaginationProps

### children

value: `PaginationRenderProp<NodesType>`

  - PaginationRenderProp: FC<PaginationInfo<NodesType>>
A render prop that includes pagination data and helpers.

### connection

value: `Connection<NodesType>`

  - Connection: {
      nodes: Array<NodesType>;
      pageInfo: PageInfo;
    } | {
      edges: Array<{
        node: NodesType;
      }>;
      pageInfo: PageInfo;
    }
The response from `storefront.query` for a paginated request. Make sure the query is passed pagination variables and that the query has `pageInfo` with `hasPreviousPage`, `hasNextpage`, `startCursor`, and `endCursor` defined.

### namespace

value: `string`

A namespace for the pagination component to avoid URL param conflicts when using multiple `Pagination` components on a single page.

### PaginationRenderProp

### contextTypes

value: `ValidationMap<any> | undefined`


### defaultProps

value: `Partial<P> | undefined`


### displayName

value: `string | undefined`


### propTypes

value: `WeakValidationMap<P> | undefined`


## Related

- [getPaginationVariables](https://shopify.dev/docs/api/hydrogen/utilities/getpaginationvariables)

## Examples

The [Storefront API uses cursors](https://shopify.dev/docs/api/usage/pagination-graphql) to paginate through lists of data and the `<Pagination />` component makes it easy to paginate data from the Storefront API. It is important for pagination state to be maintained in the URL, so that the user can navigate to a product and return back to the same scrolled position in a list. It is also important that the list state is shareable via URL. The `<Pagination>` component provides a render prop with properties to load more elements into your list.


### Multiple `Pagination` components on a single page

Use the `namespace` prop to differentiate between multiple `Pagination` components on a single page```jsx
import {useLoaderData, Link} from 'react-router';
import {getPaginationVariables, Pagination} from '@shopify/hydrogen';

export async function loader({request, context: {storefront}}) {
  const womensPaginationVariables = getPaginationVariables(request, {
    pageBy: 2,
    namespace: 'womens', // Specify a unique namespace for the pagination parameters
  });
  const mensPaginationVariables = getPaginationVariables(request, {
    pageBy: 2,
    namespace: 'mens', // Specify a unique namespace for the pagination parameters
  });

  const [womensProducts, mensProducts] = await Promise.all([
    storefront.query(COLLECTION_PRODUCTS_QUERY, {
      variables: {...womensPaginationVariables, handle: 'women'},
    }),
    storefront.query(COLLECTION_PRODUCTS_QUERY, {
      variables: {...mensPaginationVariables, handle: 'men'},
    }),
  ]);

  return {womensProducts, mensProducts};
}

export default function Collection() {
  const {womensProducts, mensProducts} = useLoaderData();
  return (
    <div className="collection">
      <h1>Womens</h1>

      <Pagination
        connection={womensProducts?.collection?.products}
        // Specify a unique namespace for the pagination links
        namespace="womens"
      >
        {({nodes, isLoading, PreviousLink, NextLink}) => {
          return (
            <div>
              <PreviousLink>
                {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
              </PreviousLink>
              <div>
                {nodes.map((product) => (
                  <div key={product.id}>
                    <Link to={`/products/${product.handle}`}>
                      {product.title}
                    </Link>
                  </div>
                ))}
              </div>
              <NextLink>
                {isLoading ? 'Loading...' : <span>Load more ↓</span>}
              </NextLink>
            </div>
          );
        }}
      </Pagination>

      <h1>Mens</h1>
      <Pagination
        connection={mensProducts?.collection?.products}
        // Specify a unique namespace for the pagination links
        namespace="mens"
      >
        {({nodes, isLoading, PreviousLink, NextLink}) => {
          return (
            <div>
              <PreviousLink>
                {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
              </PreviousLink>
              <div>
                {nodes.map((product) => (
                  <div key={product.id}>
                    <Link to={`/products/${product.handle}`}>
                      {product.title}
                    </Link>
                  </div>
                ))}
              </div>
              <NextLink>
                {isLoading ? 'Loading...' : <span>Load more ↓</span>}
              </NextLink>
            </div>
          );
        }}
      </Pagination>
    </div>
  );
}

const COLLECTION_PRODUCTS_QUERY = `#graphql
  query CollectionProducts(
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $handle: String!
  ) {
    collection(handle: $handle) {
      products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
        nodes {
          id
          handle
          title
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

```

```tsx
import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData, Link} from 'react-router';
import {getPaginationVariables, Pagination} from '@shopify/hydrogen';
import {type Collection} from '@shopify/hydrogen-react/storefront-api-types';

export async function loader({
  request,
  context: {storefront},
}: LoaderFunctionArgs) {
  const womensPaginationVariables = getPaginationVariables(request, {
    pageBy: 2,
    namespace: 'womens', // Specify a unique namespace for the pagination parameters
  });
  const mensPaginationVariables = getPaginationVariables(request, {
    pageBy: 2,
    namespace: 'mens', // Specify a unique namespace for the pagination parameters
  });

  const [womensProducts, mensProducts] = await Promise.all([
    storefront.query<{collection: Collection}>(COLLECTION_PRODUCTS_QUERY, {
      variables: {...womensPaginationVariables, handle: 'women'},
    }),
    storefront.query<{collection: Collection}>(COLLECTION_PRODUCTS_QUERY, {
      variables: {...mensPaginationVariables, handle: 'men'},
    }),
  ]);

  return {womensProducts, mensProducts};
}

export default function Collection() {
  const {womensProducts, mensProducts} = useLoaderData<typeof loader>();
  return (
    <div className="collection">
      <h1>Womens</h1>

      <Pagination
        connection={womensProducts?.collection?.products}
        // Specify a unique namespace for the pagination links
        namespace="womens"
      >
        {({nodes, isLoading, PreviousLink, NextLink}) => {
          return (
            <div>
              <PreviousLink>
                {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
              </PreviousLink>
              <div>
                {nodes.map((product) => (
                  <div key={product.id}>
                    <Link to={`/products/${product.handle}`}>
                      {product.title}
                    </Link>
                  </div>
                ))}
              </div>
              <NextLink>
                {isLoading ? 'Loading...' : <span>Load more ↓</span>}
              </NextLink>
            </div>
          );
        }}
      </Pagination>

      <h1>Mens</h1>
      <Pagination
        connection={mensProducts?.collection?.products}
        // Specify a unique namespace for the pagination links
        namespace="mens"
      >
        {({nodes, isLoading, PreviousLink, NextLink}) => {
          return (
            <div>
              <PreviousLink>
                {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
              </PreviousLink>
              <div>
                {nodes.map((product) => (
                  <div key={product.id}>
                    <Link to={`/products/${product.handle}`}>
                      {product.title}
                    </Link>
                  </div>
                ))}
              </div>
              <NextLink>
                {isLoading ? 'Loading...' : <span>Load more ↓</span>}
              </NextLink>
            </div>
          );
        }}
      </Pagination>
    </div>
  );
}

const COLLECTION_PRODUCTS_QUERY = `#graphql
  query CollectionProducts(
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $handle: String!
  ) {
    collection(handle: $handle) {
      products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
        nodes {
          id
          handle
          title
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
` as const;

```

## Examples

The [Storefront API uses cursors](https://shopify.dev/docs/api/usage/pagination-graphql) to paginate through lists of data and the `<Pagination />` component makes it easy to paginate data from the Storefront API. It is important for pagination state to be maintained in the URL, so that the user can navigate to a product and return back to the same scrolled position in a list. It is also important that the list state is shareable via URL. The `<Pagination>` component provides a render prop with properties to load more elements into your list.


### Multiple `Pagination` components on a single page

Use the `namespace` prop to differentiate between multiple `Pagination` components on a single page```jsx
import {useLoaderData, Link} from 'react-router';
import {getPaginationVariables, Pagination} from '@shopify/hydrogen';

export async function loader({request, context: {storefront}}) {
  const womensPaginationVariables = getPaginationVariables(request, {
    pageBy: 2,
    namespace: 'womens', // Specify a unique namespace for the pagination parameters
  });
  const mensPaginationVariables = getPaginationVariables(request, {
    pageBy: 2,
    namespace: 'mens', // Specify a unique namespace for the pagination parameters
  });

  const [womensProducts, mensProducts] = await Promise.all([
    storefront.query(COLLECTION_PRODUCTS_QUERY, {
      variables: {...womensPaginationVariables, handle: 'women'},
    }),
    storefront.query(COLLECTION_PRODUCTS_QUERY, {
      variables: {...mensPaginationVariables, handle: 'men'},
    }),
  ]);

  return {womensProducts, mensProducts};
}

export default function Collection() {
  const {womensProducts, mensProducts} = useLoaderData();
  return (
    <div className="collection">
      <h1>Womens</h1>

      <Pagination
        connection={womensProducts?.collection?.products}
        // Specify a unique namespace for the pagination links
        namespace="womens"
      >
        {({nodes, isLoading, PreviousLink, NextLink}) => {
          return (
            <div>
              <PreviousLink>
                {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
              </PreviousLink>
              <div>
                {nodes.map((product) => (
                  <div key={product.id}>
                    <Link to={`/products/${product.handle}`}>
                      {product.title}
                    </Link>
                  </div>
                ))}
              </div>
              <NextLink>
                {isLoading ? 'Loading...' : <span>Load more ↓</span>}
              </NextLink>
            </div>
          );
        }}
      </Pagination>

      <h1>Mens</h1>
      <Pagination
        connection={mensProducts?.collection?.products}
        // Specify a unique namespace for the pagination links
        namespace="mens"
      >
        {({nodes, isLoading, PreviousLink, NextLink}) => {
          return (
            <div>
              <PreviousLink>
                {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
              </PreviousLink>
              <div>
                {nodes.map((product) => (
                  <div key={product.id}>
                    <Link to={`/products/${product.handle}`}>
                      {product.title}
                    </Link>
                  </div>
                ))}
              </div>
              <NextLink>
                {isLoading ? 'Loading...' : <span>Load more ↓</span>}
              </NextLink>
            </div>
          );
        }}
      </Pagination>
    </div>
  );
}

const COLLECTION_PRODUCTS_QUERY = `#graphql
  query CollectionProducts(
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $handle: String!
  ) {
    collection(handle: $handle) {
      products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
        nodes {
          id
          handle
          title
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

```

```tsx
import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData, Link} from 'react-router';
import {getPaginationVariables, Pagination} from '@shopify/hydrogen';
import {type Collection} from '@shopify/hydrogen-react/storefront-api-types';

export async function loader({
  request,
  context: {storefront},
}: LoaderFunctionArgs) {
  const womensPaginationVariables = getPaginationVariables(request, {
    pageBy: 2,
    namespace: 'womens', // Specify a unique namespace for the pagination parameters
  });
  const mensPaginationVariables = getPaginationVariables(request, {
    pageBy: 2,
    namespace: 'mens', // Specify a unique namespace for the pagination parameters
  });

  const [womensProducts, mensProducts] = await Promise.all([
    storefront.query<{collection: Collection}>(COLLECTION_PRODUCTS_QUERY, {
      variables: {...womensPaginationVariables, handle: 'women'},
    }),
    storefront.query<{collection: Collection}>(COLLECTION_PRODUCTS_QUERY, {
      variables: {...mensPaginationVariables, handle: 'men'},
    }),
  ]);

  return {womensProducts, mensProducts};
}

export default function Collection() {
  const {womensProducts, mensProducts} = useLoaderData<typeof loader>();
  return (
    <div className="collection">
      <h1>Womens</h1>

      <Pagination
        connection={womensProducts?.collection?.products}
        // Specify a unique namespace for the pagination links
        namespace="womens"
      >
        {({nodes, isLoading, PreviousLink, NextLink}) => {
          return (
            <div>
              <PreviousLink>
                {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
              </PreviousLink>
              <div>
                {nodes.map((product) => (
                  <div key={product.id}>
                    <Link to={`/products/${product.handle}`}>
                      {product.title}
                    </Link>
                  </div>
                ))}
              </div>
              <NextLink>
                {isLoading ? 'Loading...' : <span>Load more ↓</span>}
              </NextLink>
            </div>
          );
        }}
      </Pagination>

      <h1>Mens</h1>
      <Pagination
        connection={mensProducts?.collection?.products}
        // Specify a unique namespace for the pagination links
        namespace="mens"
      >
        {({nodes, isLoading, PreviousLink, NextLink}) => {
          return (
            <div>
              <PreviousLink>
                {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
              </PreviousLink>
              <div>
                {nodes.map((product) => (
                  <div key={product.id}>
                    <Link to={`/products/${product.handle}`}>
                      {product.title}
                    </Link>
                  </div>
                ))}
              </div>
              <NextLink>
                {isLoading ? 'Loading...' : <span>Load more ↓</span>}
              </NextLink>
            </div>
          );
        }}
      </Pagination>
    </div>
  );
}

const COLLECTION_PRODUCTS_QUERY = `#graphql
  query CollectionProducts(
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $handle: String!
  ) {
    collection(handle: $handle) {
      products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
        nodes {
          id
          handle
          title
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
` as const;

```

