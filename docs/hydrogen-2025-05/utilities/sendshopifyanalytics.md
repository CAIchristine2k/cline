# sendShopifyAnalytics

Sends analytics to Shopify.

```jsx
import {
  sendShopifyAnalytics,
  getClientBrowserParameters,
  AnalyticsEventName,
  useShopifyCookies,
} from '@shopify/hydrogen';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

function sendPageView(analyticsPageData) {
  const payload = {
    ...getClientBrowserParameters(),
    ...analyticsPageData,
  };
  sendShopifyAnalytics({
    eventName: AnalyticsEventName.PAGE_VIEW,
    payload,
  });
}

// Hook into your router's page change events to fire this analytics event:
// for example, in NextJS:

const analyticsShopData = {
  shopId: 'gid://shopify/Shop/{your-shop-id}',
  currency: 'USD',
  acceptedLanguage: 'en',
};

export default function App({Component, pageProps}) {
  const router = useRouter();

  // eslint-disable-next-line no-undef
  const hasUserConsent = yourFunctionToDetermineIfUserHasConsent();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const analytics = {
    hasUserConsent,
    ...analyticsShopData,
    ...pageProps.analytics,
  };
  const pagePropsWithAppAnalytics = {
    ...pageProps,
    analytics,
  };

  useEffect(() => {
    const handleRouteChange = () => {
      sendPageView(analytics);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [analytics, router.events]);

  useShopifyCookies();

  return <Component {...pagePropsWithAppAnalytics} />;
}
```

```tsx
import * as React from 'react';
import {useEffect} from 'react';
import {
  sendShopifyAnalytics,
  getClientBrowserParameters,
  AnalyticsEventName,
  useShopifyCookies,
} from '@shopify/hydrogen';
import {useRouter} from 'next/router';

function sendPageView(analyticsPageData) {
  const payload = {
    ...getClientBrowserParameters(),
    ...analyticsPageData,
  };
  sendShopifyAnalytics({
    eventName: AnalyticsEventName.PAGE_VIEW,
    payload,
  });
}

// Hook into your router's page change events to fire this analytics event:
// for example, in NextJS:

const analyticsShopData = {
  shopId: 'gid://shopify/Shop/{your-shop-id}',
  currency: 'USD',
  acceptedLanguage: 'en',
};

export default function App({Component, pageProps}) {
  const router = useRouter();

  // @ts-expect-error - this is an example, you should implement this function
  const hasUserConsent = yourFunctionToDetermineIfUserHasConsent();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const analytics = {
    hasUserConsent,
    ...analyticsShopData,
    ...pageProps.analytics,
  };
  const pagePropsWithAppAnalytics = {
    ...pageProps,
    analytics,
  };

  useEffect(() => {
    const handleRouteChange = () => {
      sendPageView(analytics);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [analytics, router.events]);

  useShopifyCookies();

  return <Component {...pagePropsWithAppAnalytics} />;
}
```

## sendShopifyAnalytics

If `event.payload.hasUserConsent` is false, no analytics event will happen.

### SendShopifyAnalyticsGeneratedType

Set user and session cookies and refresh the expiry time

#### Returns: Promise<void>

#### Params:

- event: ShopifyAnalytics
- shopDomain: string
  export function sendShopifyAnalytics(
  event: ShopifyAnalytics,
  shopDomain?: string,
  ): Promise<void> {
  const {eventName, payload} = event;
  if (!payload.hasUserConsent) return Promise.resolve();

  let events: ShopifyMonorailEvent[] = [];
  const pageViewPayload = payload as ShopifyPageViewPayload;

  if (eventName === AnalyticsEventName.PAGE_VIEW) {
  events = events.concat(
  trekkiePageView(pageViewPayload),
  customerPageView(pageViewPayload),
  );
  } else if (eventName === AnalyticsEventName.ADD_TO_CART) {
  events = events.concat(
  customerAddToCart(payload as ShopifyAddToCartPayload),
  );
  } else if (eventName === AnalyticsEventName.PAGE_VIEW_2) {
  events = events.concat(
  trekkiePageView(pageViewPayload),
  customerPageView2(pageViewPayload),
  );
  } else if (eventName === AnalyticsEventName.COLLECTION_VIEW) {
  events = events.concat(customerCollectionView(pageViewPayload));
  } else if (eventName === AnalyticsEventName.PRODUCT_VIEW) {
  events = events.concat(customerProductView(pageViewPayload));
  } else if (eventName === AnalyticsEventName.SEARCH_VIEW) {
  events = events.concat(customerSearchView(pageViewPayload));
  }

  if (events.length) {
  return sendToShopify(events, shopDomain);
  } else {
  return Promise.resolve();
  }
  }

### ShopifyPageView

### eventName

value: `string`

Use `AnalyticsEventName.PAGE_VIEW` constant.

### payload

value: `ShopifyPageViewPayload`

- ShopifyPageView: {
  /\*_ Use `AnalyticsEventName.PAGE_VIEW` constant. _/
  eventName: string;
  payload: ShopifyPageViewPayload;
  }
- ShopifyPageViewPayload: export interface ShopifyPageViewPayload
  extends ShopifyAnalyticsBase,
  ClientBrowserParameters {
  /** Canonical url. \*/
  canonicalUrl?: string;
  /** Shopify page type. _/
  pageType?: string;
  /\*\* Shopify resource id in the form of `gid://shopify/<type>/<id>`. _/
  resourceId?: string;
  /** Shopify collection handle. \*/
  collectionHandle?: string;
  /** Shopify collection id. _/
  collectionId?: string;
  /\*\* Search term used on a search results page. _/
  searchString?: string;
  }

### ShopifyPageViewPayload

### acceptedLanguage

value: `LanguageCode`

Language displayed to buyer.

### analyticsAllowed

value: `boolean`

Result of `customerPrivacyApi.analyticsProcessingAllowed()`

### assetVersionId

value: `string`

NPM package version of either hydrogen or hydrogen-react. Defaults to hydrogen-react package version.

### canonicalUrl

value: `string`

Canonical url.

### ccpaEnforced

value: `boolean`

Result of `!customerPrivacyApi.saleOfDataAllowed()`

### collectionHandle

value: `string`

Shopify collection handle.

### collectionId

value: `string`

Shopify collection id.

### currency

value: `CurrencyCode`

Currency code.

### customerId

value: `string`

Shopify customer id in the form of `gid://shopify/Customer/<id>`.

### gdprEnforced

value: `boolean`

Result of `!(customerPrivacyApi.marketingAllowed() && customerPrivacy.analyticsProcessingAllowed())`

### hasUserConsent

value: `boolean`

If we have consent from buyer for data collection

### hydrogenSubchannelId

value: `string`

Alternative name for Shopify storefront id generated by Hydrogen sales channel. The value of env.PUBLIC_STOREFRONT_ID.

### marketingAllowed

value: `boolean`

Result of `customerPrivacyApi.marketingAllowed()`

### navigationApi

value: `string`

Navigation api: `'PerformanceNavigationTiming' | 'performance.navigation'`.

Use `getClientBrowserParameters()` to collect this value.

### navigationType

value: `string`

Navigation type: `'navigate' | 'reload' | 'back_forward' | 'prerender' | 'unknown'`.

Use `getClientBrowserParameters()` to collect this value.

### pageType

value: `string`

Shopify page type.

### path

value: `string`

Value of `window.location.pathname`.

Use `getClientBrowserParameters()` to collect this value.

### products

value: `ShopifyAnalyticsProduct[]`

- ShopifyAnalytics: ShopifyPageView | ShopifyAddToCart
- ShopifyAnalyticsProduct: {
  /** Product id in the form of `gid://shopify/Product/<id>`. \*/
  productGid: Product['id'];
  /** Variant id in the form of `gid://shopify/ProductVariant/<id>`. _/
  variantGid?: ProductVariant['id'];
  /\*\* Product name. _/
  name: Product['title'];
  /** Variant name. \*/
  variantName?: ProductVariant['title'];
  /** Product brand or vendor. _/
  brand: Product['vendor'];
  /\*\* Product category or type. _/
  category?: Product['productType'];
  /** Product price. \*/
  price: ProductVariant['price']['amount'];
  /** Product sku. _/
  sku?: ProductVariant['sku'];
  /\*\* Quantity of the product in this event. _/
  quantity?: number;
  }
  Product list.

### referrer

value: `string`

Value of `window.document.referrer`.

Use `getClientBrowserParameters()` to collect this value.

### resourceId

value: `string`

Shopify resource id in the form of `gid://shopify/<type>/<id>`.

### saleOfDataAllowed

value: `boolean`

Result of `customerPrivacyApi.saleOfDataAllowed()`

### search

value: `string`

Value of `window.location.search`.

Use `getClientBrowserParameters()` to collect this value.

### searchString

value: `string`

Search term used on a search results page.

### shopId

value: `string`

Shopify shop id in the form of `gid://shopify/Shop/<id>`.

### shopifySalesChannel

value: `ShopifySalesChannels`

- ShopifySalesChannels: keyof typeof ShopifySalesChannel
- ShopifySalesChannel: export interface ShopifySalesChannel {
  /** Shopify Hydrogen sales channel \*/
  hydrogen: 'hydrogen';
  /** Shopify Headless sales channel \*/
  headless: 'headless';
  }
  Shopify sales channel.

### storefrontId

value: `string`

Shopify storefront id generated by Hydrogen sales channel. The value of env.PUBLIC_STOREFRONT_ID.

### title

value: `string`

Value of `document.title`.

Use `getClientBrowserParameters()` to collect this value.

### totalValue

value: `number`

Total value of products.

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

### ShopifyAnalyticsProduct

### brand

value: `string`

Product brand or vendor.

### category

value: `string`

Product category or type.

### name

value: `string`

Product name.

### price

value: `string`

Product price.

### productGid

value: `string`

Product id in the form of `gid://shopify/Product/<id>`.

### quantity

value: `number`

Quantity of the product in this event.

### sku

value: `string`

Product sku.

### variantGid

value: `string`

Variant id in the form of `gid://shopify/ProductVariant/<id>`.

### variantName

value: `string`

Variant name.

### ShopifySalesChannel

### headless

value: `"headless"`

Shopify Headless sales channel

### hydrogen

value: `"hydrogen"`

Shopify Hydrogen sales channel

### ShopifyAddToCart

### eventName

value: `string`

Use `AnalyticsEventName.ADD_TO_CART` constant.

### payload

value: `ShopifyAddToCartPayload`

- ShopifyAddToCart: {
  /\*_ Use `AnalyticsEventName.ADD_TO_CART` constant. _/
  eventName: string;
  payload: ShopifyAddToCartPayload;
  }
- ShopifyAddToCartPayload: export interface ShopifyAddToCartPayload
  extends ShopifyAnalyticsBase,
  ClientBrowserParameters {
  /\*_ Shopify cart id in the form of `gid://shopify/Cart/<id>`. _/
  cartId: string;
  }

### ShopifyAddToCartPayload

### acceptedLanguage

value: `LanguageCode`

Language displayed to buyer.

### analyticsAllowed

value: `boolean`

Result of `customerPrivacyApi.analyticsProcessingAllowed()`

### assetVersionId

value: `string`

NPM package version of either hydrogen or hydrogen-react. Defaults to hydrogen-react package version.

### cartId

value: `string`

Shopify cart id in the form of `gid://shopify/Cart/<id>`.

### ccpaEnforced

value: `boolean`

Result of `!customerPrivacyApi.saleOfDataAllowed()`

### currency

value: `CurrencyCode`

Currency code.

### customerId

value: `string`

Shopify customer id in the form of `gid://shopify/Customer/<id>`.

### gdprEnforced

value: `boolean`

Result of `!(customerPrivacyApi.marketingAllowed() && customerPrivacy.analyticsProcessingAllowed())`

### hasUserConsent

value: `boolean`

If we have consent from buyer for data collection

### hydrogenSubchannelId

value: `string`

Alternative name for Shopify storefront id generated by Hydrogen sales channel. The value of env.PUBLIC_STOREFRONT_ID.

### marketingAllowed

value: `boolean`

Result of `customerPrivacyApi.marketingAllowed()`

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

### products

value: `ShopifyAnalyticsProduct[]`

- ShopifyAnalytics: ShopifyPageView | ShopifyAddToCart
- ShopifyAnalyticsProduct: {
  /** Product id in the form of `gid://shopify/Product/<id>`. \*/
  productGid: Product['id'];
  /** Variant id in the form of `gid://shopify/ProductVariant/<id>`. _/
  variantGid?: ProductVariant['id'];
  /\*\* Product name. _/
  name: Product['title'];
  /** Variant name. \*/
  variantName?: ProductVariant['title'];
  /** Product brand or vendor. _/
  brand: Product['vendor'];
  /\*\* Product category or type. _/
  category?: Product['productType'];
  /** Product price. \*/
  price: ProductVariant['price']['amount'];
  /** Product sku. _/
  sku?: ProductVariant['sku'];
  /\*\* Quantity of the product in this event. _/
  quantity?: number;
  }
  Product list.

### referrer

value: `string`

Value of `window.document.referrer`.

Use `getClientBrowserParameters()` to collect this value.

### saleOfDataAllowed

value: `boolean`

Result of `customerPrivacyApi.saleOfDataAllowed()`

### search

value: `string`

Value of `window.location.search`.

Use `getClientBrowserParameters()` to collect this value.

### shopId

value: `string`

Shopify shop id in the form of `gid://shopify/Shop/<id>`.

### shopifySalesChannel

value: `ShopifySalesChannels`

- ShopifySalesChannels: keyof typeof ShopifySalesChannel
- ShopifySalesChannel: export interface ShopifySalesChannel {
  /** Shopify Hydrogen sales channel \*/
  hydrogen: 'hydrogen';
  /** Shopify Headless sales channel \*/
  headless: 'headless';
  }
  Shopify sales channel.

### storefrontId

value: `string`

Shopify storefront id generated by Hydrogen sales channel. The value of env.PUBLIC_STOREFRONT_ID.

### title

value: `string`

Value of `document.title`.

Use `getClientBrowserParameters()` to collect this value.

### totalValue

value: `number`

Total value of products.

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

- [useShopifyCookies](/api/hydrogen/hooks/useShopifyCookies)
- [getClientBrowserParameters](/api/hydrogen/utilities/getclientbrowserparameters)

## AnalyticsEventName

Analytics event names accepted by Shopify analytics.

### AnalyticsEventName

These duplicated interface declaration is so that we can generate proper documentation for these public facing constants

### ADD_TO_CART

value: `"ADD_TO_CART"`

Add to cart

### PAGE_VIEW

value: `"PAGE_VIEW"`

Page view

## Related

- [useShopifyCookies](/api/hydrogen/hooks/useShopifyCookies)
- [getClientBrowserParameters](/api/hydrogen/utilities/getclientbrowserparameters)

## AnalyticsPageType

Analytics page type values accepted by Shopify analytics.

### AnalyticsPageType

### article

value: `"article"`

### blog

value: `"blog"`

### captcha

value: `"captcha"`

### cart

value: `"cart"`

### collection

value: `"collection"`

### customersAccount

value: `"customers/account"`

### customersActivateAccount

value: `"customers/activate_account"`

### customersAddresses

value: `"customers/addresses"`

### customersLogin

value: `"customers/login"`

### customersOrder

value: `"customers/order"`

### customersRegister

value: `"customers/register"`

### customersResetPassword

value: `"customers/reset_password"`

### forbidden

value: `"403"`

### giftCard

value: `"gift_card"`

### home

value: `"index"`

### listCollections

value: `"list-collections"`

### notFound

value: `"404"`

### page

value: `"page"`

### password

value: `"password"`

### policy

value: `"policy"`

### product

value: `"product"`

### search

value: `"search"`

## Related

- [useShopifyCookies](/api/hydrogen/hooks/useShopifyCookies)
- [getClientBrowserParameters](/api/hydrogen/utilities/getclientbrowserparameters)

## ShopifySalesChannel

Analytics sales channel values accepted by Shopify analytics.

### ShopifySalesChannel

### headless

value: `"headless"`

Shopify Headless sales channel

### hydrogen

value: `"hydrogen"`

Shopify Hydrogen sales channel

## Related

- [useShopifyCookies](/api/hydrogen/hooks/useShopifyCookies)
- [getClientBrowserParameters](/api/hydrogen/utilities/getclientbrowserparameters)
