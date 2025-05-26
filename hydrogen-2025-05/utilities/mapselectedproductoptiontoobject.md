# mapSelectedProductOptionToObject

Converts the product selected option into an `Object<key, value>` format for building URL query params

```js
import {mapSelectedProductOptionToObject} from '@shopify/hydrogen';

const selectedOption = [
  {
    name: 'Color',
    value: 'Red',
  },
  {
    name: 'Size',
    value: 'Medium',
  },
];

const optionsObject = mapSelectedProductOptionToObject(selectedOption);

// Output of optionsObject
// {
//   Color: 'Red',
//   Size: 'Medium',
// }

const searchParams = new URLSearchParams(optionsObject);
searchParams.toString(); // '?Color=Red&Size=Medium'

```

