# getPaginationVariables

The `getPaginationVariables` function is used with the [`<Pagination>`](https://shopify.dev/docs/api/hydrogen/components/pagnination) component to generate the variables needed to fetch paginated data from the Storefront API. The returned variables should be used within your storefront GraphQL query.

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
import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
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

### GetPaginationVariablesGeneratedType

#### Returns: Variables to be used with the `storefront.query` function

#### Params:

- request: Request
- options: { pageBy: number; namespace?: string; }
export function getPaginationVariables(
  request: Request,
  options: {pageBy: number; namespace?: string} = {pageBy: 20},
) {
  if (typeof request?.url === 'undefined') {
    throw new Error(
      'getPaginationVariables must be called with the Request object passed to your loader function',
    );
  }

  const {pageBy, namespace = ''} = options;
  const searchParams = new URLSearchParams(new URL(request.url).search);

  const cursorParam = namespace ? `${namespace}_cursor` : 'cursor';
  const directionParam = namespace ? `${namespace}_direction` : 'direction';

  const cursor = searchParams.get(cursorParam) ?? undefined;
  const direction =
    searchParams.get(directionParam) === 'previous' ? 'previous' : 'next';
  const isPrevious = direction === 'previous';

  const prevPage = {
    last: pageBy,
    startCursor: cursor ?? null,
  };

  const nextPage = {
    first: pageBy,
    endCursor: cursor ?? null,
  };

  const variables = isPrevious ? prevPage : nextPage;

  return variables;
}


## Related

- [Pagination](https://shopify.dev/docs/api/hydrogen/components/pagination)

