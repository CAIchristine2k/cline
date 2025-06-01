# VariantSelector

The `VariantSelector` component helps you build a form for selecting available variants of a product. It is important for variant selection state to be maintained in the URL, so that the user can navigate to a product and return back to the same variant selection. It is also important that the variant selection state is shareable via URL. The `VariantSelector` component provides a render prop that renders for each product option.

```jsx
import {VariantSelector} from '@shopify/hydrogen';
import {Link} from 'react-router';

const ProductForm = ({product}) => {
  return (
    <VariantSelector
      handle={product.handle}
      options={product.options}
      variants={product.variants}
    >
      {({option}) => (
        <>
          <div>{option.name}</div>
          <div>
            {option.values.map(
              ({value, isAvailable, to, isActive, variant}) => (
                <Link
                  to={to}
                  prefetch="intent"
                  className={
                    isActive ? 'active' : isAvailable ? '' : 'opacity-80'
                  }
                >
                  {value}
                  <br />
                  {variant && `SKU: ${variant.sku}`}
                </Link>
              ),
            )}
          </div>
        </>
      )}
    </VariantSelector>
  );
};
```

```tsx
import {VariantSelector} from '@shopify/hydrogen';
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import {Link} from 'react-router';

const ProductForm = ({product}: {product: Product}) => {
  return (
    <VariantSelector
      handle={product.handle}
      options={product.options}
      variants={product.variants}
    >
      {({option}) => (
        <>
          <div>{option.name}</div>
          <div>
            {option.values.map(
              ({value, isAvailable, to, isActive, variant}) => (
                <Link
                  to={to}
                  prefetch="intent"
                  className={
                    isActive ? 'active' : isAvailable ? '' : 'opacity-80'
                  }
                >
                  {value}
                  <br />
                  {variant && `SKU: ${variant.sku}`}
                </Link>
              ),
            )}
          </div>
        </>
      )}
    </VariantSelector>
  );
};
```

## Props

### VariantSelectorProps

### children

value: `({ option }: { option: VariantOption; }) => ReactNode`

- VariantOption: {
  name: string;
  value?: string;
  values: Array<VariantOptionValue>;
  }

### handle

value: `string`

The product handle for all of the variants

### options

value: `Array<PartialProductOption> | undefined`

- PartialProductOption: PartialDeep<
  Omit<ProductOption, 'optionValues'> & {
  optionValues: Array<PartialProductOptionValues>;
  }
  > Product options from the [Storefront API](https://shopify.dev/docs/api/storefront/2025-04/objects/ProductOption). Make sure both `name` and `values` are a part of your query.

### productPath

value: `string`

By default all products are under /products. Use this prop to provide a custom path.

### selectedVariant

value: `Maybe<PartialDeep<ProductVariant>>`

An optional selected variant to use for the initial state if no URL parameters are set

### variants

value: `| PartialDeep<ProductVariantConnection>
    | Array<PartialDeep<ProductVariant>>`

Product variants from the [Storefront API](https://shopify.dev/docs/api/storefront/2025-04/objects/ProductVariant). You only need to pass this prop if you want to show product availability. If a product option combination is not found within `variants`, it is assumed to be available. Make sure to include `availableForSale` and `selectedOptions.name` and `selectedOptions.value`.

### waitForNavigation

value: `boolean`

Should the VariantSelector wait to update until after the browser navigates to a variant.

### VariantOption

### name

value: `string`

### value

value: `string`

### values

value: `Array<VariantOptionValue>`

- VariantOption: {
  name: string;
  value?: string;
  values: Array<VariantOptionValue>;
  }
- VariantOptionValue: {
  value: string;
  isAvailable: boolean;
  to: string;
  search: string;
  isActive: boolean;
  variant?: PartialDeep<ProductVariant, {recurseIntoArrays: true}>;
  optionValue: PartialProductOptionValues;
  }

### VariantOptionValue

### isActive

value: `boolean`

### isAvailable

value: `boolean`

### optionValue

value: `PartialProductOptionValues`

- PartialProductOptionValues: PartialDeep<ProductOptionValue>
- PartialProductOption: PartialDeep<
  Omit<ProductOption, 'optionValues'> & {
  optionValues: Array<PartialProductOptionValues>;
  }
  >

### search

value: `string`

### to

value: `string`

### value

value: `string`

### variant

value: `PartialDeep<ProductVariant, {recurseIntoArrays: true}>`

## Related

- [getSelectedProductOptions](https://shopify.dev/docs/api/hydrogen/utilities/getselectedproductoptions)
