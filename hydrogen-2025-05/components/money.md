# Money

The `Money` component renders a string of the Storefront API's[MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) according to the `locale` in the [`ShopifyProvider` component](/api/hydrogen/components/global/shopifyprovider).
The component outputs a `<div>`. You can [customize this component](https://api/hydrogen/components#customizing-hydrogen-components) using passthrough props.

```jsx
import {Money} from '@shopify/hydrogen';

export default function ProductMoney({product}) {
  const price = product.variants.nodes[0].price;

  return <Money data={price} />;
}

```

```tsx
import {Money} from '@shopify/hydrogen';
import type {Product} from '@shopify/hydrogen/storefront-api-types';

export default function ProductMoney({product}: {product: Product}) {
  const price = product.variants.nodes[0].price;

  return <Money data={price} />;
}

```

## Props

### MoneyPropsBase

### as

value: `ComponentGeneric`

An HTML tag or React Component to be rendered as the base element wrapper. The default is `div`.

### data

value: `PartialDeep<MoneyV2, {recurseIntoArrays: true}>`

An object with fields that correspond to the Storefront API's [MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2).

### measurement

value: `PartialDeep<UnitPriceMeasurement, {recurseIntoArrays: true}>`

A [UnitPriceMeasurement object](https://shopify.dev/api/storefront/2025-04/objects/unitpricemeasurement).

### measurementSeparator

value: `ReactNode`

Customizes the separator between the money output and the measurement output. Used with the `measurement` prop. Defaults to `'/'`.

### withoutCurrency

value: `boolean`

Whether to remove the currency symbol from the output.

### withoutTrailingZeros

value: `boolean`

Whether to remove trailing zeros (fractional money) from the output.

## Related

- [useMoney](/api/hydrogen/hooks/useMoney)

