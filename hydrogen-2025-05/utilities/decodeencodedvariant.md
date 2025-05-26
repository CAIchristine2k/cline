# decodeEncodedVariant

Decodes an encoded option value string into an array of option value combinations.

```js
import {decodeEncodedVariant} from '@shopify/hydrogen';

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

const encodedVariantAvailability = 'v1_0:0-2,1:2,';

const decodedVariantAvailability = decodeEncodedVariant(
  encodedVariantAvailability,
);

// decodedVariantAvailability
// {
//   [0,0],    // Red, S
//   [0,1],    // Red, M
//   [0,2],    // Red, L
//   [1,2]     // Blue, L
// }

```

## Props

### DecodeEncodedVariantGeneratedType

For an encoded option value string, decode into option value combinations. Entries represent a valid combination formatted as an array of option value positions.

#### Returns: DecodedOptionValuesDecoded option value combinations

#### Params:

- encodedVariantField: string
export function decodeEncodedVariant(
  encodedVariantField: EncodedVariantField,
): DecodedOptionValues {
  if (!encodedVariantField) return [];

  if (encodedVariantField.startsWith('v1_')) {
    return v1Decoder(stripVersion(encodedVariantField));
  }

  throw new Error('Unsupported option value encoding');
}


## Related

- [isOptionValueCombinationInEncodedVariant](https://shopify.dev/docs/api/hydrogen/2025-04/utilities/isOptionValueCombinationInEncodedVariant)

