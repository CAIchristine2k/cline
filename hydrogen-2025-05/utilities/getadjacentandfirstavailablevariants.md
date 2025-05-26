# getAdjacentAndFirstAvailableVariants

Finds all the variants provided by `adjacentVariants`, `options.optionValues.firstAvailableVariant`, and `selectedOrFirstAvailableVariant` and return them in a single array. This function will remove any duplicated variants found.

```js
import {getAdjacentAndFirstAvailableVariants} from '@shopify/hydrogen';

// Make sure you are querying for the following fields:
// - product.options.optionValues.firstSelectableVariant
// - product.selectedOrFirstAvailableVariant
// - product.adjacentVariants
//
// For any fields that are ProductVariant type, make sure to query for:
// - variant.selectedOptions.name
// - variant.selectedOptions.value

const product = {
  /* Result from querying the SFAPI for a product */
};

// Returns a list of unique variants found in product query
const variants = getAdjacentAndFirstAvailableVariants(product);

```

