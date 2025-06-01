# useCustomerPrivacy

A hook that loads the [Customer Privacy API](https://shopify.dev/docs/api/customer-privacy).

You can also listen to a `document` event for `shopifyCustomerPrivacyApiLoaded`. It will be emitted when the Customer Privacy API is loaded.

```js
import {useCustomerPrivacy} from '@shopify/hydrogen';
import {useEffect} from 'react';

export function MyComponent() {
  const {customerPrivacy, privacyBanner = null} = useCustomerPrivacy({
    storefrontAccessToken: '12345',
    checkoutDomain: 'checkout.example.com',
    onVisitorConsentCollected: (consent) => {
      console.log('Visitor consent collected:', consent);
    },
  });

  useEffect(() => {
    if (customerPrivacy) {
      // check if user has marketing consent
      console.log(
        'User marketing consent:',
        customerPrivacy.analyticsProcessingAllowed(),
      );

      // or set tracking consent
      customerPrivacy.setTrackingConsent(
        {
          marketing: true,
          analytics: true,
          preferences: true,
          sale_of_data: true,
        },
        (data) => {
          if (data?.error) {
            console.error('Error setting tracking consent:', data.error);
            return;
          }
          console.log('Tracking consent set');
        },
      );
    }

    if (privacyBanner) {
      privacyBanner.loadBanner();

      // or show banner with specific locale and country
      // privacyBanner.loadBanner({locale: 'FR', country: 'CA'});

      // or show consent preferences banner
      // privacyBanner.showPreferences()

      // or show consent preferences banner with specific locale and country
      // privacyBanner.showPreferences({locale: 'FR', country: 'CA'});
    }
  }, [customerPrivacy, privacyBanner]);
}
```

```ts
import {
  type VisitorConsentCollected,
  useCustomerPrivacy,
} from '@shopify/hydrogen';
import {useEffect} from 'react';

export function MyComponent() {
  const {customerPrivacy, privacyBanner = null} = useCustomerPrivacy({
    storefrontAccessToken: '12345',
    checkoutDomain: 'checkout.example.com',
    onVisitorConsentCollected: (consent: VisitorConsentCollected) => {
      console.log('Visitor consent collected:', consent);
    },
  });

  useEffect(() => {
    if (customerPrivacy) {
      // check if user has marketing consent
      console.log(
        'User marketing consent:',
        customerPrivacy.analyticsProcessingAllowed(),
      );

      // or set tracking consent
      customerPrivacy.setTrackingConsent(
        {
          marketing: true,
          analytics: true,
          preferences: true,
          sale_of_data: true,
        },
        (data) => {
          if (data?.error) {
            console.error('Error setting tracking consent:', data.error);
            return;
          }
          console.log('Tracking consent set');
        },
      );
    }

    if (privacyBanner) {
      privacyBanner.loadBanner();

      // or show banner with specific locale and country
      // privacyBanner.loadBanner({locale: 'FR', country: 'CA'});

      // or show consent preferences banner
      // privacyBanner.showPreferences()

      // or show consent preferences banner with specific locale and country
      // privacyBanner.showPreferences({locale: 'FR', country: 'CA'});
    }
  }, [customerPrivacy, privacyBanner]);
}
```

##

### UseCustomerPrivacyGeneratedType

#### Returns:

#### Params:

- props: CustomerPrivacyApiProps
  export function useCustomerPrivacy(props: CustomerPrivacyApiProps) {
  const {
  withPrivacyBanner = false,
  onVisitorConsentCollected,
  onReady,
  ...consentConfig
  } = props;

  // Load the Shopify customer privacy API with or without the privacy banner
  // NOTE: We no longer use the status because we need `ready` to be not when the script is loaded
  // but instead when both `privacyBanner` (optional) and customerPrivacy are loaded in the window
  useLoadScript(withPrivacyBanner ? CONSENT_API_WITH_BANNER : CONSENT_API, {
  attributes: {
  id: 'customer-privacy-api',
  },
  });

  const {observing, setLoaded} = useApisLoaded({
  withPrivacyBanner,
  onLoaded: onReady,
  });

  const config = useMemo(() => {
  const {checkoutDomain, storefrontAccessToken} = consentConfig;

      if (!checkoutDomain) logMissingConfig('checkoutDomain');
      if (!storefrontAccessToken) logMissingConfig('storefrontAccessToken');

      // validate that the storefront access token is not a server API token
      if (
        storefrontAccessToken.startsWith('shpat_') ||
        storefrontAccessToken.length !== 32
      ) {
        // eslint-disable-next-line no-console
        console.error(
          `[h2:error:useCustomerPrivacy] It looks like you passed a private access token, make sure to use the public token`,
        );
      }

      const config: CustomerPrivacyConsentConfig = {
        checkoutRootDomain: checkoutDomain,
        storefrontAccessToken,
        storefrontRootDomain: parseStoreDomain(checkoutDomain),
        country: consentConfig.country,
        locale: consentConfig.locale,
      };

      return config;

  }, [consentConfig, parseStoreDomain, logMissingConfig]);

  // settings event listeners for visitorConsentCollected
  useEffect(() => {
  const consentCollectedHandler = (
  event: CustomEvent<VisitorConsentCollected>,
  ) => {
  if (onVisitorConsentCollected) {
  onVisitorConsentCollected(event.detail);
  }
  };

      document.addEventListener(
        'visitorConsentCollected',
        consentCollectedHandler,
      );

      return () => {
        document.removeEventListener(
          'visitorConsentCollected',
          consentCollectedHandler,
        );
      };

  }, [onVisitorConsentCollected]);

  // monitor when the `privacyBanner` is in the window and override it's methods with config
  // pre-applied versions
  useEffect(() => {
  if (!withPrivacyBanner || observing.current.privacyBanner) return;
  observing.current.privacyBanner = true;

      let customPrivacyBanner: PrivacyBanner | undefined =
        window.privacyBanner || undefined;

      const privacyBannerWatcher = {
        configurable: true,
        get() {
          return customPrivacyBanner;
        },
        set(value: unknown) {
          if (
            typeof value === 'object' &&
            value !== null &&
            'showPreferences' in value &&
            'loadBanner' in value
          ) {
            const privacyBanner = value as PrivacyBanner;

            // auto load the banner if applicable
            privacyBanner.loadBanner(config);

            // overwrite the privacyBanner methods
            customPrivacyBanner = overridePrivacyBannerMethods({
              privacyBanner,
              config,
            });

            // set the loaded state for the privacyBanner
            setLoaded.privacyBanner();
            emitCustomerPrivacyApiLoaded();
          }
        },
      };

      Object.defineProperty(window, 'privacyBanner', privacyBannerWatcher);

  }, [
  withPrivacyBanner,
  config,
  overridePrivacyBannerMethods,
  setLoaded.privacyBanner,
  ]);

  // monitor when the Shopify.customerPrivacy is added to the window and override the
  // setTracking consent method with the config pre-applied
  useEffect(() => {
  if (observing.current.customerPrivacy) return;
  observing.current.customerPrivacy = true;

      let customCustomerPrivacy: CustomerPrivacy | null = null;
      let customShopify: {customerPrivacy: CustomerPrivacy} | undefined | object =
        window.Shopify || undefined;

      // monitor for when window.Shopify = {} is first set
      Object.defineProperty(window, 'Shopify', {
        configurable: true,
        get() {
          return customShopify;
        },
        set(value: unknown) {
          // monitor for when window.Shopify = {} is first set
          if (
            typeof value === 'object' &&
            value !== null &&
            Object.keys(value).length === 0
          ) {
            customShopify = value as object;

            // monitor for when window.Shopify.customerPrivacy is set
            Object.defineProperty(window.Shopify, 'customerPrivacy', {
              configurable: true,
              get() {
                return customCustomerPrivacy;
              },
              set(value: unknown) {
                if (
                  typeof value === 'object' &&
                  value !== null &&
                  'setTrackingConsent' in value
                ) {
                  const customerPrivacy = value as CustomerPrivacy;

                  // overwrite the tracking consent method
                  customCustomerPrivacy = {
                    ...customerPrivacy,
                    setTrackingConsent: overrideCustomerPrivacySetTrackingConsent(
                      {customerPrivacy, config},
                    ),
                  };

                  customShopify = {
                    ...customShopify,
                    customerPrivacy: customCustomerPrivacy,
                  };

                  setLoaded.customerPrivacy();
                  emitCustomerPrivacyApiLoaded();
                }
              },
            });
          }
        },
      });

  }, [
  config,
  overrideCustomerPrivacySetTrackingConsent,
  setLoaded.customerPrivacy,
  ]);

  // return the customerPrivacy and privacyBanner (optional) modified APIs
  const result = {
  customerPrivacy: getCustomerPrivacy(),
  } as {
  customerPrivacy: CustomerPrivacy | null;
  privacyBanner?: PrivacyBanner | null;
  };

  if (withPrivacyBanner) {
  result.privacyBanner = getPrivacyBanner();
  }

  return result;
  }

### CustomerPrivacyApiProps

### checkoutDomain

value: `string`

The production shop checkout domain url.

### country

value: `CountryCode`

Country code for the shop.

### locale

value: `LanguageCode`

Language code for the shop.

### onReady

value: `() => void`

Callback to be call when customer privacy api is ready.

### onVisitorConsentCollected

value: `(consent: VisitorConsentCollected) => void`

- VisitorConsentCollected: {
  analyticsAllowed: boolean;
  firstPartyMarketingAllowed: boolean;
  marketingAllowed: boolean;
  preferencesAllowed: boolean;
  saleOfDataAllowed: boolean;
  thirdPartyMarketingAllowed: boolean;
  }
  Callback to be called when visitor consent is collected.

### storefrontAccessToken

value: `string`

The storefront access token for the shop.

### withPrivacyBanner

value: `boolean`

Whether to load the Shopify privacy banner as configured in Shopify admin. Defaults to true.

### VisitorConsentCollected

### analyticsAllowed

value: `boolean`

### firstPartyMarketingAllowed

value: `boolean`

### marketingAllowed

value: `boolean`

### preferencesAllowed

value: `boolean`

### saleOfDataAllowed

value: `boolean`

### thirdPartyMarketingAllowed

value: `boolean`

## Examples

A hook that loads the [Customer Privacy API](https://shopify.dev/docs/api/customer-privacy).

You can also listen to a `document` event for `shopifyCustomerPrivacyApiLoaded`. It will be emitted when the Customer Privacy API is loaded.

### useCustomerPrivacy

Returns the value of `window.Shopify.customerPrivacy` if it exists.```js
import {getCustomerPrivacy} from '@shopify/hydrogen';
import {useEffect} from 'react';

export function MyComponent() {
useEffect(() => {
const customerPrivacy = getCustomerPrivacy();
if (customerPrivacy) {
console.log('Customer privacy:', customerPrivacy);
}
}, []);
}

````

## Examples

A hook that loads the [Customer Privacy API](https://shopify.dev/docs/api/customer-privacy).

You can also listen to a `document` event for `shopifyCustomerPrivacyApiLoaded`. It will be emitted when the Customer Privacy API is loaded.


### useCustomerPrivacy

Returns the value of `window.Shopify.customerPrivacy` if it exists.```js
import {getCustomerPrivacy} from '@shopify/hydrogen';
import {useEffect} from 'react';

export function MyComponent() {
  useEffect(() => {
    const customerPrivacy = getCustomerPrivacy();
    if (customerPrivacy) {
      console.log('Customer privacy:', customerPrivacy);
    }
  }, []);
}

````
