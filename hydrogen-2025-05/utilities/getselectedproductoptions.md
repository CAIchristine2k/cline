# getSelectedProductOptions

The `getSelectedProductOptions` returns the selected options from the Request search parameters. The selected options can then be easily passed to your GraphQL query with [`variantBySelectedOptions`](https://shopify.dev/docs/api/storefront/2025-04/objects/product#field-product-variantbyselectedoptions).

```jsx
import {getSelectedProductOptions} from '@shopify/hydrogen';

export async function loader({request, params, context}) {
  const selectedOptions = getSelectedProductOptions(request);

  const {product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: params.productHandle,
      selectedOptions,
    },
  });

  return {product};
}

const PRODUCT_QUERY = `#graphql
  query Product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    product(handle: $handle) {
      title
      description
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
        ...ProductVariantFragment
      }
    }
  }
`;

```

```tsx
import {getSelectedProductOptions} from '@shopify/hydrogen';
import {type LoaderFunctionArgs} from 'react-router';

export async function loader({request, params, context}: LoaderFunctionArgs) {
  const selectedOptions = getSelectedProductOptions(request);

  const {product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: params.productHandle,
      selectedOptions,
    },
  });

  return {product};
}

const PRODUCT_QUERY = `#graphql
  query Product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    product(handle: $handle) {
      title
      description
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
        ...ProductVariantFragment
      }
    }
  }
`;

```

## Props

### GetSelectedProductOptions

#### Returns: SelectedOptionInput[]

#### Params:

- request: Request
type GetSelectedProductOptions = (request: Request) => SelectedOptionInput[];


## Related

- [VariantSelector](https://shopify.dev/docs/api/hydrogen/components/variantselector)

