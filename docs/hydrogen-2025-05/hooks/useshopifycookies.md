# useShopifyCookies

Sets Shopify user and session cookies and refreshes the expiry time.

```jsx
import * as React from 'react';
import {useShopifyCookies} from '@shopify/hydrogen';

export default function App({Component, pageProps}) {
  useShopifyCookies({hasUserConsent: false});

  return <Component {...pageProps} />;
}
```

```tsx
import * as React from 'react';
import {useShopifyCookies} from '@shopify/hydrogen';

export default function App({Component, pageProps}) {
  useShopifyCookies({hasUserConsent: false});

  return <Component {...pageProps} />;
}
```

## useShopifyCookies

Manages Shopify cookies. If `hasUserConsent` option is false, Shopify cookies will be removed.

### UseShopifyCookiesGeneratedType

#### Returns: void

#### Params:

- options: UseShopifyCookiesOptions
  export function useShopifyCookies(options?: UseShopifyCookiesOptions): void {
  const {
  hasUserConsent = false,
  domain = '',
  checkoutDomain = '',
  } = options || {};
  useEffect(() => {
  const cookies = getShopifyCookies(document.cookie);

      /**
       * Setting cookie with domain
       *
       * If no domain is provided, the cookie will be set for the current host.
       * For Shopify, we need to ensure this domain is set with a leading dot.
       */

      // Use override domain or current host
      let currentDomain = domain || window.document.location.host;

      if (checkoutDomain) {
        const checkoutDomainParts = checkoutDomain.split('.').reverse();
        const currentDomainParts = currentDomain.split('.').reverse();
        const sameDomainParts: Array<string> = [];
        checkoutDomainParts.forEach((part, index) => {
          if (part === currentDomainParts[index]) {
            sameDomainParts.push(part);
          }
        });

        currentDomain = sameDomainParts.reverse().join('.');
      }

      // Reset domain if localhost
      if (/^localhost/.test(currentDomain)) currentDomain = '';

      // Shopify checkout only consumes cookies set with leading dot domain
      const domainWithLeadingDot = currentDomain
        ? /^\./.test(currentDomain)
          ? currentDomain
          : `.${currentDomain}`
        : '';

      /**
       * Set user and session cookies and refresh the expiry time
       */
      if (hasUserConsent) {
        setCookie(
          SHOPIFY_Y,
          cookies[SHOPIFY_Y] || buildUUID(),
          longTermLength,
          domainWithLeadingDot,
        );
        setCookie(
          SHOPIFY_S,
          cookies[SHOPIFY_S] || buildUUID(),
          shortTermLength,
          domainWithLeadingDot,
        );
      } else {
        setCookie(SHOPIFY_Y, '', 0, domainWithLeadingDot);
        setCookie(SHOPIFY_S, '', 0, domainWithLeadingDot);
      }

  }, [options, hasUserConsent, domain, checkoutDomain]);
  }

### UseShopifyCookiesOptions

### checkoutDomain

value: `string`

The checkout domain of the shop. Defaults to empty string. If set, the cookie domain will check if it can be set with the checkout domain.

### domain

value: `string`

The domain scope of the cookie. Defaults to empty string.

### hasUserConsent

value: `boolean`

If set to `false`, Shopify cookies will be removed. If set to `true`, Shopify unique user token cookie will have cookie expiry of 1 year. Defaults to false.

## Related

- [sendShopifyAnalytics](/api/hydrogen/utilities/sendShopifyAnalytics)
- [getClientBrowserParameters](/api/hydrogen/utilities/getclientbrowserparameters)
- [getShopifyCookies](/api/hydrogen/utilities/getShopifyCookies)
