# getShopifyCookies

Parses cookie string and returns Shopify cookies.

```jsx
import * as React from 'react';
import {useEffect} from 'react';
import {getShopifyCookies} from '@shopify/hydrogen';

export default function App({Component, pageProps}) {
  useEffect(() => {
    getShopifyCookies(document.cookie);
  });

  return <Component {...pageProps} />;
}

```

```tsx
import * as React from 'react';
import {useEffect} from 'react';
import {getShopifyCookies} from '@shopify/hydrogen';

export default function App({Component, pageProps}) {
  useEffect(() => {
    getShopifyCookies(document.cookie);
  });

  return <Component {...pageProps} />;
}

```

## getShopifyCookies

If the Shopify cookies doesn't exist, this method will return empty string for each missing cookie.

### GetShopifyCookiesGeneratedType

#### Returns: ShopifyCookies

#### Params:

- cookies: string
export function getShopifyCookies(cookies: string): ShopifyCookies {
  const cookieData = parse(cookies);
  return {
    [SHOPIFY_Y]: cookieData[SHOPIFY_Y] || '',
    [SHOPIFY_S]: cookieData[SHOPIFY_S] || '',
  };
}


### ShopifyCookies

### _shopify_s

value: `string`

Shopify session token: Value of `_shopify_s` cookie.

### _shopify_y

value: `string`

Shopify unique user token: Value of `_shopify_y` cookie.

## Related

- [useShopifyCookies](/api/hydrogen/hooks/useShopifyCookies)

## ShopifyCookies

Shopify cookies names

### ShopifyCookies

### _shopify_s

value: `string`

Shopify session token: Value of `_shopify_s` cookie.

### _shopify_y

value: `string`

Shopify unique user token: Value of `_shopify_y` cookie.

## Related

- [useShopifyCookies](/api/hydrogen/hooks/useShopifyCookies)

