# getClientBrowserParameters

Gathers client browser values commonly used for analytics

```jsx
import * as React from 'react';
import {useEffect} from 'react';
import {getClientBrowserParameters} from '@shopify/hydrogen';

export default function App({Component, pageProps}) {
  useEffect(() => {
    getClientBrowserParameters();
  });

  return <Component {...pageProps} />;
}
```

```tsx
import * as React from 'react';
import {useEffect} from 'react';
import {getClientBrowserParameters} from '@shopify/hydrogen';

export default function App({Component, pageProps}) {
  useEffect(() => {
    getClientBrowserParameters();
  });

  return <Component {...pageProps} />;
}
```

## getClientBrowserParameters

If executed on server, this method will return empty string for each field.

### GetClientBrowserParametersGeneratedType

#### Returns: ClientBrowserParameters

export function getClientBrowserParameters(): ClientBrowserParameters {
if (errorIfServer('getClientBrowserParameters')) {
return {
uniqueToken: '',
visitToken: '',
url: '',
path: '',
search: '',
referrer: '',
title: '',
userAgent: '',
navigationType: '',
navigationApi: '',
};
}

const [navigationType, navigationApi] = getNavigationType();
const cookies = getShopifyCookies(document.cookie);

return {
uniqueToken: cookies[SHOPIFY_Y],
visitToken: cookies[SHOPIFY_S],
url: location.href,
path: location.pathname,
search: location.search,
referrer: document.referrer,
title: document.title,
userAgent: navigator.userAgent,
navigationType,
navigationApi,
};
}

### ClientBrowserParameters

### navigationApi

value: `string`

Navigation api: `'PerformanceNavigationTiming' | 'performance.navigation'`.

Use `getClientBrowserParameters()` to collect this value.

### navigationType

value: `string`

Navigation type: `'navigate' | 'reload' | 'back_forward' | 'prerender' | 'unknown'`.

Use `getClientBrowserParameters()` to collect this value.

### path

value: `string`

Value of `window.location.pathname`.

Use `getClientBrowserParameters()` to collect this value.

### referrer

value: `string`

Value of `window.document.referrer`.

Use `getClientBrowserParameters()` to collect this value.

### search

value: `string`

Value of `window.location.search`.

Use `getClientBrowserParameters()` to collect this value.

### title

value: `string`

Value of `document.title`.

Use `getClientBrowserParameters()` to collect this value.

### uniqueToken

value: `string`

Shopify unique user token: Value of `_shopify_y` cookie.

Use `getClientBrowserParameters()` to collect this value.

### url

value: `string`

Value of `window.location.href`.

Use `getClientBrowserParameters()` to collect this value.

### userAgent

value: `string`

Value of `navigator.userAgent`.

Use `getClientBrowserParameters()` to collect this value.

### visitToken

value: `string`

Shopify session token: Value of `_shopify_s` cookie.

Use `getClientBrowserParameters()` to collect this value.

## Related

- [sendShopifyAnalytics](/api/hydrogen/utilities/sendShopifyAnalytics)
- [useShopifyCookies](/api/hydrogen/hooks/useShopifyCookies)
