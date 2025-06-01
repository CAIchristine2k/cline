# isOptionValueCombinationInEncodedVariant

    Determines whether an option value combination is present in an encoded option value string.

`targetOptionValueCombination` - Indices of option values to look up in the encoded option value string. A partial set of indices may be passed to determine whether a node or any children is present. For example, if a product has 3 options, passing `[0]` will return true if any option value combination for the first option's option value is present in the encoded string.

```js
import {isOptionValueCombinationInEncodedVariant} from '@shopify/hydrogen';

// product.options = [
//   {
//     name: 'Color',
//     optionValues: [
//       {name: 'Red'},
//       {name: 'Blue'},
//       {name: 'Green'},
//     ]
//   },
//   {
//     name: 'Size',
//     optionValues: [
//       {name: 'S'},
//       {name: 'M'},
//       {name: 'L'},
//     ]
//   }
// ]
const encodedVariantExistence = 'v1_0:0-1,1:2,';

// For reference: decoded encodedVariantExistence
// {
//   [0,0],    // Red, S
//   [0,1],    // Red, M
//   [1,2]     // Blue, L
// }

// Returns true since there are variants exist for [Red]
isOptionValueCombinationInEncodedVariant([0], encodedVariantExistence); // true

isOptionValueCombinationInEncodedVariant([0, 0], encodedVariantExistence); // true
isOptionValueCombinationInEncodedVariant([0, 1], encodedVariantExistence); // true
isOptionValueCombinationInEncodedVariant([0, 2], encodedVariantExistence); // false - no variant exist for [Red, L]

// Returns true since there is a variant exist for [Blue]
isOptionValueCombinationInEncodedVariant([1], encodedVariantExistence); // true

isOptionValueCombinationInEncodedVariant([1, 0], encodedVariantExistence); // false - no variant exist for [Blue, S]
isOptionValueCombinationInEncodedVariant([1, 1], encodedVariantExistence); // false - no variant exist for [Blue, M]
isOptionValueCombinationInEncodedVariant([1, 2], encodedVariantExistence); // true

// Returns false since there is no variant exist for [Green]
isOptionValueCombinationInEncodedVariant([2], encodedVariantExistence); // false
```

## Props

### IsOptionValueCombinationInEncodedVariant

#### Returns: boolean

#### Params:

- targetOptionValueCombination: number[]
- encodedVariantField: string
  export type IsOptionValueCombinationInEncodedVariant = (
  targetOptionValueCombination: number[],
  encodedVariantField: string,
  ) => boolean;

## Related

- [decodeEncodedVariant](https://shopify.dev/docs/api/hydrogen/2025-04/utilities/decodeEncodedVariant)
