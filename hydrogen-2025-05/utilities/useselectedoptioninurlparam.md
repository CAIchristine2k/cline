# useSelectedOptionInUrlParam

Sets the url params to the selected option.

```js
import {useSelectedOptionInUrlParam} from '@shopify/hydrogen';

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

useSelectedOptionInUrlParam(selectedOption);

// URL will be updated to <original product url>?Color=Red&Size=Medium

```

