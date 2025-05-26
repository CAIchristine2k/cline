# useAnalytics

A hook that provides access to the analytics provider context. Must be a descendent of [`Analytics.Provider`](https://shopify.dev/docs/api/hydrogen/components/Analytics-provider).

```js
import {useAnalytics} from '@shopify/hydrogen';
import {useEffect} from 'react';

export function CustomAnalytics() {
  const {subscribe, register} = useAnalytics();
  const {ready} = register('CustomAnalytics'); // unique string identifier

  useEffect(() => {
    // Triggers on every page navigation
    subscribe('page_viewed', (data) => {
      console.log('CustomAnalytics - Page viewed:', data);
    });

    // Triggers on a page that uses `<Analytics.ProductView>`
    subscribe('product_viewed', (data) => {
      console.log('CustomAnalytics - Product viewed:', data);
    });

    // Triggers on a page that uses `<Analytics.CollectionView>`
    subscribe('collection_viewed', (data) => {
      console.log('CustomAnalytics - Collection viewed:', data);
    });

    // Triggers on a page that uses `<Analytics.CartView>`
    subscribe('cart_viewed', (data) => {
      console.log('CustomAnalytics - Cart viewed:', data);
    });

    // Triggers on a page that uses `<Analytics.SearchView>`
    subscribe('search_viewed', (data) => {
      console.log('CustomAnalytics - Search viewed:', data);
    });

    // Triggers on a page that uses `<Analytics.CustomView type="custom_promotion_viewed">`
    subscribe('custom_promotion_viewed', (data) => {
      console.log('CustomAnalytics - Promotion viewed:', data);
    });

    // Triggers when the cart is updated
    subscribe('cart_updated', (data) => {
      console.log('CustomAnalytics - Cart updated:', data);
    });

    // Triggers when an existing cart line increases in quantity or a new cart line is added
    subscribe('product_added_to_cart', (data) => {
      console.log('CustomAnalytics - Product added to cart:', data);
    });

    // Triggers when an existing cart line decreases in quantity or a cart line is removed
    subscribe('product_removed_from_cart', (data) => {
      console.log('CustomAnalytics - Product removed from cart:', data);
    });

    // Register the CustomAnalytics component as ready
    ready();
  }, []);

  return null;
}

```

```ts
import {
  type PageViewPayload,
  type ProductViewPayload,
  type CollectionViewPayload,
  type CartViewPayload,
  type CartUpdatePayload,
  type CartLineUpdatePayload,
  type SearchViewPayload,
  useAnalytics,
} from '@shopify/hydrogen';
import {useEffect} from 'react';

export function CustomAnalytics() {
  const {subscribe, register} = useAnalytics();
  const {ready} = register('CustomAnalytics'); // unique string identifier

  useEffect(() => {
    // Triggers on every page navigation
    subscribe('page_viewed', (data: PageViewPayload) => {
      console.log('CustomAnalytics - Page viewed:', data);
    });

    // Triggers on a page that uses `<Analytics.ProductView>`
    subscribe('product_viewed', (data: ProductViewPayload) => {
      console.log('CustomAnalytics - Product viewed:', data);
    });

    // Triggers on a page that uses `<Analytics.CollectionView>`
    subscribe('collection_viewed', (data: CollectionViewPayload) => {
      console.log('CustomAnalytics - Collection viewed:', data);
    });

    // Triggers on a page that uses `<Analytics.CartView>`
    subscribe('cart_viewed', (data: CartViewPayload) => {
      console.log('CustomAnalytics - Cart viewed:', data);
    });

    // Triggers on a page that uses `<Analytics.SearchView>`
    subscribe('search_viewed', (data: SearchViewPayload) => {
      console.log('CustomAnalytics - Search viewed:', data);
    });

    // Triggers on a page that uses `<Analytics.CustomView type="custom_promotion_viewed">`
    subscribe('custom_promotion_viewed', (data: unknown) => {
      console.log('CustomAnalytics - Promotion viewed:', data);
    });

    // Triggers when the cart is updated
    subscribe('cart_updated', (data: CartUpdatePayload) => {
      console.log('CustomAnalytics - Cart updated:', data);
    });

    // Triggers when an existing cart line increases in quantity or a new cart line is added
    subscribe('product_added_to_cart', (data: CartLineUpdatePayload) => {
      console.log('CustomAnalytics - Product added to cart:', data);
    });

    // Triggers when an existing cart line decreases in quantity or a cart line is removed
    subscribe('product_removed_from_cart', (data: CartLineUpdatePayload) => {
      console.log('CustomAnalytics - Product removed from cart:', data);
    });

    // Register the CustomAnalytics component as ready
    ready();
  }, []);

  return null;
}

```

## Returns

### AnalyticsContextValueForDoc

### canTrack

value: `() => boolean`

A function to tell you the current state of if the user can be tracked by analytics. Defaults to Customer Privacy API's `window.Shopify.customerPrivacy.analyticsProcessingAllowed()`.

### cart

value: `UserCart | DefaultCart`

  - DefaultCart: Promise<CartReturn | null> | CartReturn | null
  - Cart: Cart
The current cart state. You can overwrite the type by passing a generic

### customData

value: `Record<string, unknown>`

The custom data passed in from the `AnalyticsProvider`.

### prevCart

value: `UserCart | DefaultCart`

  - DefaultCart: Promise<CartReturn | null> | CartReturn | null
  - Cart: Cart
The previous cart state. You can overwrite the type by passing a generic

### publish

value: `AnalyticsContextPublishForDoc`

  - AnalyticsContextPublishForDoc: PublishPageView | PublishProductView | PublishCollectionView | PublishCartView | PublishSearchView | PublishCartUpdated | PublishProductAddedToCart | PublishProductRemovedFromCart | PublishCustomEvent
A function to publish an analytics event.

### register

value: `(key: string) => { ready: () => void; }`

A function to register with the analytics provider. It holds the first browser load events until all registered key has executed the supplied `ready` function. [See example register  usage](https://shopify.dev/docs/api/hydrogen/hooks/useanalytics#example-useanalytics.register).

### shop

value: `Promise<ShopAnalytics | null> | ShopAnalytics | null`

  - ShopAnalytics: {
  /** The shop ID. */
  shopId: string;
  /** The language code that is being displayed to user. */
  acceptedLanguage: LanguageCode;
  /** The currency code that is being displayed to user. */
  currency: CurrencyCode;
  /** The Hydrogen subchannel ID generated by Oxygen in the environment variable. */
  hydrogenSubchannelId: string | '0';
}
The shop configuration required to publish events to Shopify.

### subscribe

value: `AnalyticsContextSubscribeForDoc`

  - AnalyticsContextSubscribeForDoc: SubscribePageView | SubscribeProductView | SubscribeCollectionView | SubscribeCartView | SubscribeSearchView | SubscribeCartUpdated | SubscribeProductAddedToCart | SubscribeProductRemovedFromCart | SubscribeCustomEvent
A function to subscribe to analytics events.

### PublishPageView

#### Returns: void

#### Params:

- event: "page_viewed"
- payload: PageViewPayload
type PublishPageView = (event: 'page_viewed', payload: PageViewPayload) => void;


### UrlPayload

### url

value: `string`

The url location of when this event is collected.

### BasePayload

### customData

value: `Record<string, unknown>`

The custom data passed in from the `AnalyticsProvider`.

### shop

value: `ShopAnalytics | null`

  - ShopAnalytics: {
  /** The shop ID. */
  shopId: string;
  /** The language code that is being displayed to user. */
  acceptedLanguage: LanguageCode;
  /** The currency code that is being displayed to user. */
  currency: CurrencyCode;
  /** The Hydrogen subchannel ID generated by Oxygen in the environment variable. */
  hydrogenSubchannelId: string | '0';
}
The shop data passed in from the `AnalyticsProvider`.

### ShopAnalytics

### acceptedLanguage

value: `LanguageCode`

The language code that is being displayed to user.

### currency

value: `CurrencyCode`

The currency code that is being displayed to user.

### hydrogenSubchannelId

value: `string | '0'`

The Hydrogen subchannel ID generated by Oxygen in the environment variable.

### shopId

value: `string`

The shop ID.

### PublishProductView

#### Returns: void

#### Params:

- event: "product_viewed"
- payload: ProductViewPayload
type PublishProductView = (
  event: 'product_viewed',
  payload: ProductViewPayload,
) => void;


### ProductsPayload

### products

value: `Array<ProductPayload & OtherData>`

  - ProductPayload: {
  /** The product id. */
  id: Product['id'];
  /** The product title. */
  title: Product['title'];
  /** The displaying variant price. */
  price: ProductVariant['price']['amount'];
  /** The product vendor. */
  vendor: Product['vendor'];
  /** The displaying variant id. */
  variantId: ProductVariant['id'];
  /** The displaying variant title. */
  variantTitle: ProductVariant['title'];
  /** The quantity of product. */
  quantity: number;
  /** The product sku. */
  sku?: ProductVariant['sku'];
  /** The product type. */
  productType?: Product['productType'];
}
  - OtherData: OtherData
The products associated with this event.

### ProductPayload

### id

value: `string`

The product id.

### price

value: `string`

The displaying variant price.

### productType

value: `string`

The product type.

### quantity

value: `number`

The quantity of product.

### sku

value: `string`

The product sku.

### title

value: `string`

The product title.

### variantId

value: `string`

The displaying variant id.

### variantTitle

value: `string`

The displaying variant title.

### vendor

value: `string`

The product vendor.

### PublishCollectionView

#### Returns: void

#### Params:

- event: "collection_viewed"
- payload: CollectionViewPayload
type PublishCollectionView = (
  event: 'collection_viewed',
  payload: CollectionViewPayload,
) => void;


### CollectionPayload

### collection

value: `CollectionPayloadDetails`

  - CollectionPayload: {
  collection: CollectionPayloadDetails;
}
  - CollectionPayloadDetails: {
  /** The collection id. */
  id: string;
  /** The collection handle. */
  handle: string;
}

### CollectionPayloadDetails

### handle

value: `string`

The collection handle.

### id

value: `string`

The collection id.

### PublishCartView

#### Returns: void

#### Params:

- event: "cart_viewed"
- payload: CartViewPayload
type PublishCartView = (event: 'cart_viewed', payload: CartViewPayload) => void;


### CartPayload

### cart

value: `CartReturn | null`

  - CartReturn: Cart & {
  errors?: StorefrontApiErrors;
}
  - Cart: Cart
The current cart state.

### prevCart

value: `CartReturn | null`

  - CartReturn: Cart & {
  errors?: StorefrontApiErrors;
}
  - Cart: Cart
The previous cart state.

### PublishSearchView

#### Returns: void

#### Params:

- event: "search_viewed"
- payload: SearchViewPayload
type PublishSearchView = (
  event: 'search_viewed',
  payload: SearchViewPayload,
) => void;


### SearchPayload

### searchResults

value: `any`

The search results

### searchTerm

value: `string`

The search term used for the search results page

### PublishCartUpdated

#### Returns: void

#### Params:

- event: "cart_updated"
- payload: CartUpdatePayload
type PublishCartUpdated = (
  event: 'cart_updated',
  payload: CartUpdatePayload,
) => void;


### PublishProductAddedToCart

#### Returns: void

#### Params:

- event: "product_added_to_cart"
- payload: CartLineUpdatePayload
type PublishProductAddedToCart = (
  event: 'product_added_to_cart',
  payload: CartLineUpdatePayload,
) => void;


### CartLinePayload

### currentLine

value: `CartLine | ComponentizableCartLine`

  - Cart: Cart
The current state of the cart line that got updated.

### prevLine

value: `CartLine | ComponentizableCartLine`

  - Cart: Cart
The previous state of the cart line that got updated.

### PublishProductRemovedFromCart

#### Returns: void

#### Params:

- event: "product_removed_from_cart"
- payload: CartLineUpdatePayload
type PublishProductRemovedFromCart = (
  event: 'product_removed_from_cart',
  payload: CartLineUpdatePayload,
) => void;


### PublishCustomEvent

#### Returns: void

#### Params:

- event: `custom_${string}`
- payload: OtherData
type PublishCustomEvent = (
  event: `custom_${string}`,
  payload: OtherData,
) => void;


### SubscribePageView

#### Returns: void

#### Params:

- event: "page_viewed"
- callback: (payload: PageViewPayload) => void
type SubscribePageView = (
  event: 'page_viewed',
  callback: (payload: PageViewPayload) => void,
) => void;


### SubscribeProductView

#### Returns: void

#### Params:

- event: "product_viewed"
- callback: (payload: ProductViewPayload) => void
type SubscribeProductView = (
  event: 'product_viewed',
  callback: (payload: ProductViewPayload) => void,
) => void;


### SubscribeCollectionView

#### Returns: void

#### Params:

- event: "collection_viewed"
- callback: (payload: CollectionViewPayload) => void
type SubscribeCollectionView = (
  event: 'collection_viewed',
  callback: (payload: CollectionViewPayload) => void,
) => void;


### SubscribeCartView

#### Returns: void

#### Params:

- event: "cart_viewed"
- callback: (payload: CartViewPayload) => void
type SubscribeCartView = (
  event: 'cart_viewed',
  callback: (payload: CartViewPayload) => void,
) => void;


### SubscribeSearchView

#### Returns: void

#### Params:

- event: "search_viewed"
- callback: (payload: SearchViewPayload) => void
type SubscribeSearchView = (
  event: 'search_viewed',
  callback: (payload: SearchViewPayload) => void,
) => void;


### SubscribeCartUpdated

#### Returns: void

#### Params:

- event: "cart_updated"
- callback: (payload: CartUpdatePayload) => void
type SubscribeCartUpdated = (
  event: 'cart_updated',
  callback: (payload: CartUpdatePayload) => void,
) => void;


### SubscribeProductAddedToCart

#### Returns: void

#### Params:

- event: "product_added_to_cart"
- callback: (payload: CartLineUpdatePayload) => void
type SubscribeProductAddedToCart = (
  event: 'product_added_to_cart',
  callback: (payload: CartLineUpdatePayload) => void,
) => void;


### SubscribeProductRemovedFromCart

#### Returns: void

#### Params:

- event: "product_removed_from_cart"
- callback: (payload: CartLineUpdatePayload) => void
type SubscribeProductRemovedFromCart = (
  event: 'product_removed_from_cart',
  callback: (payload: CartLineUpdatePayload) => void,
) => void;


### SubscribeCustomEvent

#### Returns: void

#### Params:

- event: `custom_${string}`
- callback: (payload: OtherData) => void
type SubscribeCustomEvent = (
  event: `custom_${string}`,
  callback: (payload: OtherData) => void,
) => void;


## Examples

A hook that provides access to the analytics provider context. Must be a descendent of [`Analytics.Provider`](https://shopify.dev/docs/api/hydrogen/components/Analytics-provider).


### useAnalytics.register

Registers a unique key with the analytics provider component, enabling custom analytics integrations to wait for a callback before sending event data.```js
import {
  type PageViewPayload,
  useAnalytics,
  useLoadScript,
} from '@shopify/hydrogen';
import {useEffect} from 'react';

export function MyAnalytics() {
  const {subscribe, register} = useAnalytics();

  // Load the 3p analytics script
  const scriptStatus = useLoadScript(
    'https://example.com/some-3p-analytics-script.js',
  );

  // unique string identifier
  const {ready} = register('MyAnalytics');

  useEffect(() => {
    // Make sure the 3p script is loaded
    if (scriptStatus !== 'done') return;

    // Initialize the 3p analytics script

    // Subscribe to analytics events
    subscribe('page_viewed', (data: PageViewPayload) => {
      // report to 3p analytics
    });

    // Register the MyAnalytics component as ready
    ready();
  }, []);

  return null;
}

```

## Examples

A hook that provides access to the analytics provider context. Must be a descendent of [`Analytics.Provider`](https://shopify.dev/docs/api/hydrogen/components/Analytics-provider).


### useAnalytics.register

Registers a unique key with the analytics provider component, enabling custom analytics integrations to wait for a callback before sending event data.```js
import {
  type PageViewPayload,
  useAnalytics,
  useLoadScript,
} from '@shopify/hydrogen';
import {useEffect} from 'react';

export function MyAnalytics() {
  const {subscribe, register} = useAnalytics();

  // Load the 3p analytics script
  const scriptStatus = useLoadScript(
    'https://example.com/some-3p-analytics-script.js',
  );

  // unique string identifier
  const {ready} = register('MyAnalytics');

  useEffect(() => {
    // Make sure the 3p script is loaded
    if (scriptStatus !== 'done') return;

    // Initialize the 3p analytics script

    // Subscribe to analytics events
    subscribe('page_viewed', (data: PageViewPayload) => {
      // report to 3p analytics
    });

    // Register the MyAnalytics component as ready
    ready();
  }, []);

  return null;
}

```

