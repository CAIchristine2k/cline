## useAnalytics

A hook that provides access to the analytics provider context. Must be a descendent of [`Analytics.Provider`](https://shopify.dev/docs/api/hydrogen/components/Analytics-provider).
[View useAnalytics](https://shopify.dev/docs/api/hydrogen/2025-05/hooks/useanalytics)

## useOptimisticCart

The `useOptimisticCart` takes an existing cart object, processes all pending cart actions, and locally mutates the cart with optimistic state. An optimistic cart makes cart actions immediately render in the browser while actions sync to the server. This increases the perceived performance of the application.
[View useOptimisticCart](https://shopify.dev/docs/api/hydrogen/2025-05/hooks/useoptimisticcart)

## useNonce

The `useNonce` hook returns the [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) nonce. Use the hook to manually add a nonce to third party scripts. The `Script` component automatically does this for you. Note, the nonce should never be available in the client, and should always return undefined in the browser.
[View useNonce](https://shopify.dev/docs/api/hydrogen/2025-05/hooks/usenonce)

## useCustomerPrivacy

A hook that loads the [Customer Privacy API](https://shopify.dev/docs/api/customer-privacy).

You can also listen to a `document` event for `shopifyCustomerPrivacyApiLoaded`. It will be emitted when the Customer Privacy API is loaded.
[View useCustomerPrivacy](https://shopify.dev/docs/api/hydrogen/2025-05/hooks/usecustomerprivacy)

## useOptimisticData

Gets the latest optimistic data with matching optimistic id from actions. Use `OptimisticInput` to accept optimistic data in forms.
[View useOptimisticData](https://shopify.dev/docs/api/hydrogen/2025-05/hooks/useoptimisticdata)

## useOptimisticVariant

The `useOptimisticVariant` takes an existing product variant, processes a pending navigation to another product variant, and returns the data of the destination variant. This makes switching product options immediate.
[View useOptimisticVariant](https://shopify.dev/docs/api/hydrogen/2025-05/hooks/useoptimisticvariant)

## useMoney


    The `useMoney` hook takes a [MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) and returns a
    default-formatted string of the amount with the correct currency indicator, along with some of the parts provided by
    [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
  
[View useMoney](https://shopify.dev/docs/api/hydrogen/2025-05/hooks/usemoney)

## useLoadScript

The `useLoadScript` hook loads an external script tag in the browser. It allows React components to lazy-load third-party dependencies.
[View useLoadScript](https://shopify.dev/docs/api/hydrogen/2025-05/hooks/useloadscript)

## useShopifyCookies

Sets Shopify user and session cookies and refreshes the expiry time.
[View useShopifyCookies](https://shopify.dev/docs/api/hydrogen/2025-05/hooks/useshopifycookies)

