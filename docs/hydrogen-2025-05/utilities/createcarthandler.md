# createCartHandler

Creates an API that can be used to interact with the cart.

```js
import {
  createStorefrontClient,
  createCartHandler,
  cartGetIdDefault,
  cartSetIdDefault,
} from '@shopify/hydrogen';
// @ts-expect-error
import * as reactRouterBuild from 'virtual:react-router/server-build';
import {createRequestHandler, getStorefrontHeaders} from 'react-router';

export default {
  async fetch(request, env, executionContext) {
    const {storefront} = createStorefrontClient({
      /* client parameters */
    });

    // Create a cart api instance.
    const cart = createCartHandler({
      storefront,
      getCartId: cartGetIdDefault(request.headers),
      setCartId: cartSetIdDefault(),
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      getLoadContext: () => ({
        storefront,
        cart, // Pass the cart api instance to the loader context.
      }),
    });

    return await handleRequest(request);
  },
};
```

```ts
import {
  createStorefrontClient,
  createCartHandler,
  cartGetIdDefault,
  cartSetIdDefault,
} from '@shopify/hydrogen';
// @ts-expect-error
import * as reactRouterBuild from 'virtual:react-router/server-build';
import {createRequestHandler, getStorefrontHeaders} from 'react-router';

export default {
  async fetch(
    request: Request,
    env: Record<string, string>,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    const {storefront} = createStorefrontClient({
      /* client parameters */
    });

    // Create a cart api instance.
    const cart = createCartHandler({
      storefront,
      getCartId: cartGetIdDefault(request.headers),
      setCartId: cartSetIdDefault(),
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      getLoadContext: () => ({
        storefront,
        cart, // Pass the cart api instance to the loader context.
      }),
    });

    return await handleRequest(request);
  },
};
```

## createCartHandler(options)

### CartHandlerOptionsForDocs

### cartMutateFragment

value: `string`

The cart mutation fragment used in most mutation requests, except for `setMetafields` and `deleteMetafield`. See the [example usage](https://shopify.dev/docs/api/hydrogen/utilities/createcarthandler#example-cart-fragments) in the documentation.

### cartQueryFragment

value: `string`

The cart query fragment used by `cart.get()`. See the [example usage](https://shopify.dev/docs/api/hydrogen/utilities/createcarthandler#example-cart-fragments) in the documentation.

### customMethods

value: `TCustomMethods`

Define custom methods or override existing methods for your cart API instance. See the [example usage](https://shopify.dev/docs/api/hydrogen/utilities/createcarthandler#example-custom-methods) in the documentation.

### getCartId

value: `() => string`

A function that returns the cart id in the form of `gid://shopify/Cart/c1-123`.

### setCartId

value: `(cartId: string) => Headers`

- Headers: Headers
  A function that sets the cart ID.

### storefront

value: `Storefront`

- Storefront: {
  query: <
  OverrideReturnType extends any = never,
  RawGqlString extends string = string,
  > (
      query: RawGqlString,
      ...options: ClientVariablesInRestParams<
        StorefrontQueries,
        RawGqlString,
        StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, 'cache'>,
        AutoAddedVariableNames
      >
  ) => Promise<
  ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> &
  StorefrontError
  > ;
  > mutate: <
      OverrideReturnType extends any = never,
      RawGqlString extends string = string,
  > (
      mutation: RawGqlString,
      ...options: ClientVariablesInRestParams<
        StorefrontMutations,
        RawGqlString,
        StorefrontCommonExtraParams,
        AutoAddedVariableNames
      >
  ) => Promise<
  ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> &
  StorefrontError
  > ;
  > cache?: Cache;
  > CacheNone: typeof CacheNone;
  > CacheLong: typeof CacheLong;
  > CacheShort: typeof CacheShort;
  > CacheCustom: typeof CacheCustom;
  > generateCacheControlHeader: typeof generateCacheControlHeader;
  > getPublicTokenHeaders: ReturnType<
      typeof createStorefrontUtilities
  > ['getPublicTokenHeaders'];
  > getPrivateTokenHeaders: ReturnType<
      typeof createStorefrontUtilities
  > ['getPrivateTokenHeaders'];
  > getShopifyDomain: ReturnType<
      typeof createStorefrontUtilities
  > ['getShopifyDomain'];
  > getApiUrl: ReturnType<
      typeof createStorefrontUtilities
  > ['getStorefrontApiUrl'];
  > i18n: TI18n;
  > }
  > The storefront client instance created by [`createStorefrontClient`](docs/api/hydrogen/utilities/createstorefrontclient).

### Storefront

Interface to interact with the Storefront API.

### cache

value: `Cache`

### CacheCustom

value: `(overrideOptions: AllCacheOptions) => AllCacheOptions`

- AllCacheOptions: export interface AllCacheOptions {
  /\*\*

* The caching mode, generally `public`, `private`, or `no-store`.
  \*/
  mode?: string;
  /\*\*
* The maximum amount of time in seconds that a resource will be considered fresh. See `max-age` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#:~:text=Response%20Directives-,max%2Dage,-The%20max%2Dage).
  \*/
  maxAge?: number;
  /\*\*
* Indicate that the cache should serve the stale response in the background while revalidating the cache. See `stale-while-revalidate` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate).
  \*/
  staleWhileRevalidate?: number;
  /\*\*
* Similar to `maxAge` but specific to shared caches. See `s-maxage` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#s-maxage).
  \*/
  sMaxAge?: number;
  /\*\*
* Indicate that the cache should serve the stale response if an error occurs while revalidating the cache. See `stale-if-error` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error).
  \*/
  staleIfError?: number;
  }

### CacheLong

value: `(overrideOptions?: AllCacheOptions) => AllCacheOptions`

- AllCacheOptions: export interface AllCacheOptions {
  /\*\*

* The caching mode, generally `public`, `private`, or `no-store`.
  \*/
  mode?: string;
  /\*\*
* The maximum amount of time in seconds that a resource will be considered fresh. See `max-age` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#:~:text=Response%20Directives-,max%2Dage,-The%20max%2Dage).
  \*/
  maxAge?: number;
  /\*\*
* Indicate that the cache should serve the stale response in the background while revalidating the cache. See `stale-while-revalidate` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate).
  \*/
  staleWhileRevalidate?: number;
  /\*\*
* Similar to `maxAge` but specific to shared caches. See `s-maxage` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#s-maxage).
  \*/
  sMaxAge?: number;
  /\*\*
* Indicate that the cache should serve the stale response if an error occurs while revalidating the cache. See `stale-if-error` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error).
  \*/
  staleIfError?: number;
  }

### CacheNone

value: `() => NoStoreStrategy`

- NoStoreStrategy: {
  mode: string;
  }

### CacheShort

value: `(overrideOptions?: AllCacheOptions) => AllCacheOptions`

- AllCacheOptions: export interface AllCacheOptions {
  /\*\*

* The caching mode, generally `public`, `private`, or `no-store`.
  \*/
  mode?: string;
  /\*\*
* The maximum amount of time in seconds that a resource will be considered fresh. See `max-age` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#:~:text=Response%20Directives-,max%2Dage,-The%20max%2Dage).
  \*/
  maxAge?: number;
  /\*\*
* Indicate that the cache should serve the stale response in the background while revalidating the cache. See `stale-while-revalidate` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate).
  \*/
  staleWhileRevalidate?: number;
  /\*\*
* Similar to `maxAge` but specific to shared caches. See `s-maxage` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#s-maxage).
  \*/
  sMaxAge?: number;
  /\*\*
* Indicate that the cache should serve the stale response if an error occurs while revalidating the cache. See `stale-if-error` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error).
  \*/
  staleIfError?: number;
  }

### generateCacheControlHeader

value: `(cacheOptions: AllCacheOptions) => string`

- AllCacheOptions: export interface AllCacheOptions {
  /\*\*

* The caching mode, generally `public`, `private`, or `no-store`.
  \*/
  mode?: string;
  /\*\*
* The maximum amount of time in seconds that a resource will be considered fresh. See `max-age` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#:~:text=Response%20Directives-,max%2Dage,-The%20max%2Dage).
  \*/
  maxAge?: number;
  /\*\*
* Indicate that the cache should serve the stale response in the background while revalidating the cache. See `stale-while-revalidate` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate).
  \*/
  staleWhileRevalidate?: number;
  /\*\*
* Similar to `maxAge` but specific to shared caches. See `s-maxage` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#s-maxage).
  \*/
  sMaxAge?: number;
  /\*\*
* Indicate that the cache should serve the stale response if an error occurs while revalidating the cache. See `stale-if-error` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error).
  \*/
  staleIfError?: number;
  }

### getApiUrl

value: `(props?: Partial<Pick<StorefrontClientProps, "storefrontApiVersion" | "storeDomain">>) => string`

- Storefront: {
  query: <
  OverrideReturnType extends any = never,
  RawGqlString extends string = string,
  > (
      query: RawGqlString,
      ...options: ClientVariablesInRestParams<
        StorefrontQueries,
        RawGqlString,
        StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, 'cache'>,
        AutoAddedVariableNames
      >
  ) => Promise<
  ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> &
  StorefrontError
  > ;
  > mutate: <
      OverrideReturnType extends any = never,
      RawGqlString extends string = string,
  > (
      mutation: RawGqlString,
      ...options: ClientVariablesInRestParams<
        StorefrontMutations,
        RawGqlString,
        StorefrontCommonExtraParams,
        AutoAddedVariableNames
      >
  ) => Promise<
  ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> &
  StorefrontError
  > ;
  > cache?: Cache;
  > CacheNone: typeof CacheNone;
  > CacheLong: typeof CacheLong;
  > CacheShort: typeof CacheShort;
  > CacheCustom: typeof CacheCustom;
  > generateCacheControlHeader: typeof generateCacheControlHeader;
  > getPublicTokenHeaders: ReturnType<
      typeof createStorefrontUtilities
  > ['getPublicTokenHeaders'];
  > getPrivateTokenHeaders: ReturnType<
      typeof createStorefrontUtilities
  > ['getPrivateTokenHeaders'];
  > getShopifyDomain: ReturnType<
      typeof createStorefrontUtilities
  > ['getShopifyDomain'];
  > getApiUrl: ReturnType<
      typeof createStorefrontUtilities
  > ['getStorefrontApiUrl'];
  > i18n: TI18n;
  > }

### getPrivateTokenHeaders

value: `(props?: Partial<Pick<StorefrontClientProps, "contentType">> & Pick<StorefrontClientProps, "privateStorefrontToken"> & { buyerIp?: string; }) => Record<string, string>`

- Storefront: {
  query: <
  OverrideReturnType extends any = never,
  RawGqlString extends string = string,
  > (
      query: RawGqlString,
      ...options: ClientVariablesInRestParams<
        StorefrontQueries,
        RawGqlString,
        StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, 'cache'>,
        AutoAddedVariableNames
      >
  ) => Promise<
  ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> &
  StorefrontError
  > ;
  > mutate: <
      OverrideReturnType extends any = never,
      RawGqlString extends string = string,
  > (
      mutation: RawGqlString,
      ...options: ClientVariablesInRestParams<
        StorefrontMutations,
        RawGqlString,
        StorefrontCommonExtraParams,
        AutoAddedVariableNames
      >
  ) => Promise<
  ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> &
  StorefrontError
  > ;
  > cache?: Cache;
  > CacheNone: typeof CacheNone;
  > CacheLong: typeof CacheLong;
  > CacheShort: typeof CacheShort;
  > CacheCustom: typeof CacheCustom;
  > generateCacheControlHeader: typeof generateCacheControlHeader;
  > getPublicTokenHeaders: ReturnType<
      typeof createStorefrontUtilities
  > ['getPublicTokenHeaders'];
  > getPrivateTokenHeaders: ReturnType<
      typeof createStorefrontUtilities
  > ['getPrivateTokenHeaders'];
  > getShopifyDomain: ReturnType<
      typeof createStorefrontUtilities
  > ['getShopifyDomain'];
  > getApiUrl: ReturnType<
      typeof createStorefrontUtilities
  > ['getStorefrontApiUrl'];
  > i18n: TI18n;
  > }

### getPublicTokenHeaders

value: `(props?: Partial<Pick<StorefrontClientProps, "contentType">> & Pick<StorefrontClientProps, "publicStorefrontToken">) => Record<string, string>`

- Storefront: {
  query: <
  OverrideReturnType extends any = never,
  RawGqlString extends string = string,
  > (
      query: RawGqlString,
      ...options: ClientVariablesInRestParams<
        StorefrontQueries,
        RawGqlString,
        StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, 'cache'>,
        AutoAddedVariableNames
      >
  ) => Promise<
  ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> &
  StorefrontError
  > ;
  > mutate: <
      OverrideReturnType extends any = never,
      RawGqlString extends string = string,
  > (
      mutation: RawGqlString,
      ...options: ClientVariablesInRestParams<
        StorefrontMutations,
        RawGqlString,
        StorefrontCommonExtraParams,
        AutoAddedVariableNames
      >
  ) => Promise<
  ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> &
  StorefrontError
  > ;
  > cache?: Cache;
  > CacheNone: typeof CacheNone;
  > CacheLong: typeof CacheLong;
  > CacheShort: typeof CacheShort;
  > CacheCustom: typeof CacheCustom;
  > generateCacheControlHeader: typeof generateCacheControlHeader;
  > getPublicTokenHeaders: ReturnType<
      typeof createStorefrontUtilities
  > ['getPublicTokenHeaders'];
  > getPrivateTokenHeaders: ReturnType<
      typeof createStorefrontUtilities
  > ['getPrivateTokenHeaders'];
  > getShopifyDomain: ReturnType<
      typeof createStorefrontUtilities
  > ['getShopifyDomain'];
  > getApiUrl: ReturnType<
      typeof createStorefrontUtilities
  > ['getStorefrontApiUrl'];
  > i18n: TI18n;
  > }

### getShopifyDomain

value: `(props?: Partial<Pick<StorefrontClientProps, "storeDomain">>) => string`

- Storefront: {
  query: <
  OverrideReturnType extends any = never,
  RawGqlString extends string = string,
  > (
      query: RawGqlString,
      ...options: ClientVariablesInRestParams<
        StorefrontQueries,
        RawGqlString,
        StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, 'cache'>,
        AutoAddedVariableNames
      >
  ) => Promise<
  ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> &
  StorefrontError
  > ;
  > mutate: <
      OverrideReturnType extends any = never,
      RawGqlString extends string = string,
  > (
      mutation: RawGqlString,
      ...options: ClientVariablesInRestParams<
        StorefrontMutations,
        RawGqlString,
        StorefrontCommonExtraParams,
        AutoAddedVariableNames
      >
  ) => Promise<
  ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> &
  StorefrontError
  > ;
  > cache?: Cache;
  > CacheNone: typeof CacheNone;
  > CacheLong: typeof CacheLong;
  > CacheShort: typeof CacheShort;
  > CacheCustom: typeof CacheCustom;
  > generateCacheControlHeader: typeof generateCacheControlHeader;
  > getPublicTokenHeaders: ReturnType<
      typeof createStorefrontUtilities
  > ['getPublicTokenHeaders'];
  > getPrivateTokenHeaders: ReturnType<
      typeof createStorefrontUtilities
  > ['getPrivateTokenHeaders'];
  > getShopifyDomain: ReturnType<
      typeof createStorefrontUtilities
  > ['getShopifyDomain'];
  > getApiUrl: ReturnType<
      typeof createStorefrontUtilities
  > ['getStorefrontApiUrl'];
  > i18n: TI18n;
  > }

### i18n

value: `TI18n`

### mutate

value: `<OverrideReturnType extends unknown = never, RawGqlString extends string = string>(mutation: RawGqlString, ...options: IsOptionalVariables<StorefrontMutations[RawGqlString]["variables"], AutoAddedVariableNames, Omit<StorefrontMutations[RawGqlString]["variables"], AutoAddedVariableNames>> extends true ? [(StorefrontCommonExtraParams & ClientVariables<StorefrontMutations, RawGqlString, AutoAddedVariableNames, "variables", RawGqlString extends never ? SetOptional<StorefrontMutations[RawGqlString]["variables"], Extract<keyof StorefrontMutations[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }, Record<"variables", RawGqlString extends never ? SetOptional<StorefrontMutations[RawGqlString]["variables"], Extract<keyof StorefrontMutations[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }>>)?] : [StorefrontCommonExtraParams & ClientVariables<StorefrontMutations, RawGqlString, AutoAddedVariableNames, "variables", RawGqlString extends never ? SetOptional<StorefrontMutations[RawGqlString]["variables"], Extract<keyof StorefrontMutations[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }, Record<"variables", RawGqlString extends never ? SetOptional<StorefrontMutations[RawGqlString]["variables"], Extract<keyof StorefrontMutations[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }>>]) => Promise<ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> & StorefrontError>`

- Storefront: {
  query: <
  OverrideReturnType extends any = never,
  RawGqlString extends string = string,
  > (
      query: RawGqlString,
      ...options: ClientVariablesInRestParams<
        StorefrontQueries,
        RawGqlString,
        StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, 'cache'>,
        AutoAddedVariableNames
      >
  ) => Promise<
  ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> &
  StorefrontError
  > ;
  > mutate: <
      OverrideReturnType extends any = never,
      RawGqlString extends string = string,
  > (
      mutation: RawGqlString,
      ...options: ClientVariablesInRestParams<
        StorefrontMutations,
        RawGqlString,
        StorefrontCommonExtraParams,
        AutoAddedVariableNames
      >
  ) => Promise<
  ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> &
  StorefrontError
  > ;
  > cache?: Cache;
  > CacheNone: typeof CacheNone;
  > CacheLong: typeof CacheLong;
  > CacheShort: typeof CacheShort;
  > CacheCustom: typeof CacheCustom;
  > generateCacheControlHeader: typeof generateCacheControlHeader;
  > getPublicTokenHeaders: ReturnType<
      typeof createStorefrontUtilities
  > ['getPublicTokenHeaders'];
  > getPrivateTokenHeaders: ReturnType<
      typeof createStorefrontUtilities
  > ['getPrivateTokenHeaders'];
  > getShopifyDomain: ReturnType<
      typeof createStorefrontUtilities
  > ['getShopifyDomain'];
  > getApiUrl: ReturnType<
      typeof createStorefrontUtilities
  > ['getStorefrontApiUrl'];
  > i18n: TI18n;
  > }
- StorefrontMutations: export interface StorefrontMutations {
  // Example of how a generated mutation type looks like:
  // '#graphql mutation m1 {...}': {return: M1Mutation; variables: M1MutationVariables};
  }
- AutoAddedVariableNames: 'country' | 'language'
- StorefrontCommonExtraParams: {
  headers?: HeadersInit;
  storefrontApiVersion?: string;
  displayName?: string;
  }
- StorefrontError: {
  errors?: StorefrontApiErrors;
  }

### query

value: `<OverrideReturnType extends unknown = never, RawGqlString extends string = string>(query: RawGqlString, ...options: IsOptionalVariables<StorefrontQueries[RawGqlString]["variables"], AutoAddedVariableNames, Omit<StorefrontQueries[RawGqlString]["variables"], AutoAddedVariableNames>> extends true ? [(StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, "cache"> & ClientVariables<StorefrontQueries, RawGqlString, AutoAddedVariableNames, "variables", RawGqlString extends never ? SetOptional<StorefrontQueries[RawGqlString]["variables"], Extract<keyof StorefrontQueries[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }, Record<"variables", RawGqlString extends never ? SetOptional<StorefrontQueries[RawGqlString]["variables"], Extract<keyof StorefrontQueries[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }>>)?] : [StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, "cache"> & ClientVariables<StorefrontQueries, RawGqlString, AutoAddedVariableNames, "variables", RawGqlString extends never ? SetOptional<StorefrontQueries[RawGqlString]["variables"], Extract<keyof StorefrontQueries[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }, Record<"variables", RawGqlString extends never ? SetOptional<StorefrontQueries[RawGqlString]["variables"], Extract<keyof StorefrontQueries[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }>>]) => Promise<ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> & StorefrontError>`

- Storefront: {
  query: <
  OverrideReturnType extends any = never,
  RawGqlString extends string = string,
  > (
      query: RawGqlString,
      ...options: ClientVariablesInRestParams<
        StorefrontQueries,
        RawGqlString,
        StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, 'cache'>,
        AutoAddedVariableNames
      >
  ) => Promise<
  ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> &
  StorefrontError
  > ;
  > mutate: <
      OverrideReturnType extends any = never,
      RawGqlString extends string = string,
  > (
      mutation: RawGqlString,
      ...options: ClientVariablesInRestParams<
        StorefrontMutations,
        RawGqlString,
        StorefrontCommonExtraParams,
        AutoAddedVariableNames
      >
  ) => Promise<
  ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> &
  StorefrontError
  > ;
  > cache?: Cache;
  > CacheNone: typeof CacheNone;
  > CacheLong: typeof CacheLong;
  > CacheShort: typeof CacheShort;
  > CacheCustom: typeof CacheCustom;
  > generateCacheControlHeader: typeof generateCacheControlHeader;
  > getPublicTokenHeaders: ReturnType<
      typeof createStorefrontUtilities
  > ['getPublicTokenHeaders'];
  > getPrivateTokenHeaders: ReturnType<
      typeof createStorefrontUtilities
  > ['getPrivateTokenHeaders'];
  > getShopifyDomain: ReturnType<
      typeof createStorefrontUtilities
  > ['getShopifyDomain'];
  > getApiUrl: ReturnType<
      typeof createStorefrontUtilities
  > ['getStorefrontApiUrl'];
  > i18n: TI18n;
  > }
- AutoAddedVariableNames: 'country' | 'language'
- StorefrontCommonExtraParams: {
  headers?: HeadersInit;
  storefrontApiVersion?: string;
  displayName?: string;
  }
- StorefrontError: {
  errors?: StorefrontApiErrors;
  }
- StorefrontQueries: export interface StorefrontQueries {
  // Example of how a generated query type looks like:
  // '#graphql query q1 {...}': {return: Q1Query; variables: Q1QueryVariables};
  }
- StorefrontQueryOptions: StorefrontCommonExtraParams & {
  query: string;
  mutation?: never;
  cache?: CachingStrategy;
  }

### AllCacheOptions

Override options for a cache strategy.

### maxAge

value: `number`

The maximum amount of time in seconds that a resource will be considered fresh. See `max-age` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#:~:text=Response%20Directives-,max%2Dage,-The%20max%2Dage).

### mode

value: `string`

The caching mode, generally `public`, `private`, or `no-store`.

### sMaxAge

value: `number`

Similar to `maxAge` but specific to shared caches. See `s-maxage` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#s-maxage).

### staleIfError

value: `number`

Indicate that the cache should serve the stale response if an error occurs while revalidating the cache. See `stale-if-error` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error).

### staleWhileRevalidate

value: `number`

Indicate that the cache should serve the stale response in the background while revalidating the cache. See `stale-while-revalidate` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate).

### NoStoreStrategy

### mode

value: `string`

### StorefrontCommonExtraParams

### displayName

value: `string`

### headers

value: `HeadersInit`

- Headers: Headers

### storefrontApiVersion

value: `string`

### StorefrontError

### errors

value: `StorefrontApiErrors`

- Storefront: {
  query: <
  OverrideReturnType extends any = never,
  RawGqlString extends string = string,
  > (
      query: RawGqlString,
      ...options: ClientVariablesInRestParams<
        StorefrontQueries,
        RawGqlString,
        StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, 'cache'>,
        AutoAddedVariableNames
      >
  ) => Promise<
  ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> &
  StorefrontError
  > ;
  > mutate: <
      OverrideReturnType extends any = never,
      RawGqlString extends string = string,
  > (
      mutation: RawGqlString,
      ...options: ClientVariablesInRestParams<
        StorefrontMutations,
        RawGqlString,
        StorefrontCommonExtraParams,
        AutoAddedVariableNames
      >
  ) => Promise<
  ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> &
  StorefrontError
  > ;
  > cache?: Cache;
  > CacheNone: typeof CacheNone;
  > CacheLong: typeof CacheLong;
  > CacheShort: typeof CacheShort;
  > CacheCustom: typeof CacheCustom;
  > generateCacheControlHeader: typeof generateCacheControlHeader;
  > getPublicTokenHeaders: ReturnType<
      typeof createStorefrontUtilities
  > ['getPublicTokenHeaders'];
  > getPrivateTokenHeaders: ReturnType<
      typeof createStorefrontUtilities
  > ['getPrivateTokenHeaders'];
  > getShopifyDomain: ReturnType<
      typeof createStorefrontUtilities
  > ['getShopifyDomain'];
  > getApiUrl: ReturnType<
      typeof createStorefrontUtilities
  > ['getStorefrontApiUrl'];
  > i18n: TI18n;
  > }
- StorefrontApiErrors: JsonGraphQLError[] | undefined

### CachingStrategy

Use the `CachingStrategy` to define a custom caching mechanism for your data. Or use one of the pre-defined caching strategies: CacheNone, CacheShort, CacheLong.

### maxAge

value: `number`

The maximum amount of time in seconds that a resource will be considered fresh. See `max-age` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#:~:text=Response%20Directives-,max%2Dage,-The%20max%2Dage).

### mode

value: `string`

The caching mode, generally `public`, `private`, or `no-store`.

### sMaxAge

value: `number`

Similar to `maxAge` but specific to shared caches. See `s-maxage` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#s-maxage).

### staleIfError

value: `number`

Indicate that the cache should serve the stale response if an error occurs while revalidating the cache. See `stale-if-error` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error).

### staleWhileRevalidate

value: `number`

Indicate that the cache should serve the stale response in the background while revalidating the cache. See `stale-while-revalidate` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate).

## Examples

Creates an API that can be used to interact with the cart.

### Cart fragments

Use `cartQueryFragment` and `cartMutateFragment` to change the cart data the queries will return.```js
import {
createCartHandler,
cartGetIdDefault,
cartSetIdDefault,
} from '@shopify/hydrogen';

// Override cart fragments
const cart = createCartHandler({
storefront,
getCartId: cartGetIdDefault(request.headers),
setCartId: cartSetIdDefault(),
cartQueryFragment: CART_QUERY_FRAGMENT,
cartMutateFragment: CART_MUTATE_FRAGMENT,
});

// cartQueryFragment requirements:
// - Must be named `CartApiQuery`
// - Only have access to the following query variables:
// - $cartId: ID!
// - $country: CountryCode
// - $language: LanguageCode
// - $numCartLines: Int
const CART_QUERY_FRAGMENT = `#graphql
  fragment CartApiQuery on Cart {
    id
    totalQuantity
    checkoutUrl
    note
  }
`;

// cartMutateFragment requirements:
// - Must be named `CartApiMutation`
// - Only have access to the following query variables:
// - $cartId: ID!
// - $country: CountryCode
// - $language: LanguageCode
const CART_MUTATE_FRAGMENT = `#graphql
  fragment CartApiMutation on Cart {
    id
    totalQuantity
    checkoutUrl
    lines(first: 100) {
      edges {
        node {
          id
          quantity
        }
      }
    }
  }
`;

````


### Custom methods

Define or override methods in your cart handler instance. Note that for addLines, updateDiscountCodes, updateBuyerIdentity, updateNote, updateAttributes, and setMetafields, if you override any of these methods, a new cart will not be created unless you implement the cart creation logic in your overriding method.```js
import {
  createCartHandler,
  cartGetIdDefault,
  cartSetIdDefault,
  cartLinesAddDefault,
  cartLinesRemoveDefault,
} from '@shopify/hydrogen';

const cartQueryOptions = {
  storefront,
  getCartId: cartGetIdDefault(request.headers),
};

const getCartId = cartGetIdDefault(request.headers);

const cart = createCartHandler({
  storefront,
  getCartId,
  setCartId: cartSetIdDefault(),
  customMethods: {
    editInLine: async (addLines, removeLineIds, optionalParams) => {
      // Using Hydrogen default cart query methods
      await cartLinesAddDefault(cartQueryOptions)(addLines, optionalParams);
      return await cartLinesRemoveDefault(cartQueryOptions)(
        removeLineIds,
        optionalParams,
      );
    },
    addLines: async (lines, optionalParams) => {
      // With your own Storefront API graphql query
      return await storefront.mutate(CART_LINES_ADD_MUTATION, {
        variables: {
          id: optionalParams.cartId || getCartId(),
          lines,
        },
      });
    },
  },
});

// Use custom method editInLine that delete and add items in one method
cart.editInLine(
  ['123'],
  [
    {
      merchandiseId: 'gid://shopify/ProductVariant/456789123',
      quantity: 1,
    },
  ],
);

// Use overridden cart.addLines
const result = await cart.addLines(
  [
    {
      merchandiseId: 'gid://shopify/ProductVariant/123456789',
      quantity: 1,
    },
  ],
  {
    cartId: 'c-123',
  },
);
// Output of result:
// {
//   cartLinesAdd: {
//     cart: {
//       id: 'c-123',
//       totalQuantity: 1
//     },
//     errors: []
//   }
// }

const CART_LINES_ADD_MUTATION = `#graphql
  mutation CartLinesAdd(
    $cartId: ID!
    $lines: [CartLineInput!]!
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        totalQuantity
      }
      errors: userErrors {
        message
        field
        code
      }
    }
  }
`;

````

### Cart instance usage

Add items to the cart. If the cart does not exist, a new cart will be created.```js
export async function action({context}) {
const {cart} = context;

// Usage
const result = await cart.addLines(
[
{
merchandiseId: 'gid://shopify/ProductVariant/123456789',
quantity: 1,
},
],
// Optional parameters
{
cartId: '123', // override the cart id
country: 'US', // override the country code to 'US'
language: 'EN', // override the language code to 'EN'
},
);
}

// Output of result:
// {
// cart: {
// id: 'c1-123',
// totalQuantity: 1
// },
// errors: []
// }

````

Create a new cart.```js
export async function action({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.create(
    {
      lines: [
        {
          merchandiseId: 'gid://shopify/ProductVariant/123456789',
          quantity: 1,
        },
      ],
      discountCodes: ['FREE_SHIPPING'],
    },
    // Optional parameters
    {
      cartId: '123', // override the cart id
      country: 'US', // override the country code to 'US'
      language: 'EN', // override the language code to 'EN'
    },
  );

  // Output of result:
  // {
  //   cart: {
  //     id: 'c1-123',
  //     totalQuantity: 1,
  //     discountCodes: [{ code: 'FREE_SHIPPING'}]
  //   },
  //   errors: []
  // }
}

````

Delete extra information (metafield) from the cart.```js
export async function action({context}) {
const {cart} = context;

// Usage
const result = await cart.setMetafields(
[
{
key: 'custom.gift',
type: 'boolean',
value: 'true',
},
],
// Optional parameters
{
cartId: '123', // override the cart id
},
);

const result2 = await cart.deleteMetafield(
'custom.gift',
// Optional parameters
{
cartId: '123', // override the cart id
},
);
}

// server.js
// To query for metafields, use the `cartQueryFragment` option when creating the cart handler.
import {
createCartHandler,
cartGetIdDefault,
cartSetIdDefault,
} from '@shopify/hydrogen';

const cart = createCartHandler({
storefront,
getCartId: cartGetIdDefault(request.headers),
setCartId: cartSetIdDefault(),
cartQueryFragment: CART_QUERY_FRAGMENT,
});

const CART_QUERY_FRAGMENT = `#graphql
fragment CartApiQuery on Cart {
id
metafields(
identifiers: [{
namespace: "custom",
key: "gift"
])
{
namespace
key
type
value
}

}
`;

````

Retrieve the cart information.```js
export async function loader({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.get();

  // Optional parameters
  const result2 = await cart.get({
    cartId: '123', // override the cart id
    numCartLines: 50, //override to return 50 cart lines
    country: 'US', // override the country code to 'US'
    language: 'EN', // override the language code to 'EN'
  });
}

````

Get the unique identifier of the cart.```js
export async function loader({context}) {
// Usage
context.cart.getCartId(); // 'gid://shopify/Cart/123'
}

````

Remove items from the cart.```js
export async function action({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.removeLines(
    ['123'],
    // Optional parameters
    {
      cartId: '123', // override the cart id
      country: 'US', // override the country code to 'US'
      language: 'EN', // override the language code to 'EN'
    },
  );

  // Output of result:
  // {
  //   cart: {
  //     id: 'c1-123',
  //     totalQuantity: 0
  //   },
  //   errors: []
  // }
}

````

Set the unique identifier of the cart.```js
export async function action({context}) {
const {cart} = context;

const result = await cart.addLines([
{
merchandiseId: 'gid://shopify/ProductVariant/123456789',
quantity: 1,
},
]);

// Usage
const headers = cart.setCartId(result.cart.id);
}

````

Add extra information (metafields) to the cart. If the cart does not exist, a new cart will be created.```js
export async function action({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.setMetafields(
    [
      {
        key: 'custom.gift',
        type: 'boolean',
        value: 'true',
      },
    ],
    // Optional parameters
    {
      cartId: '123', // override the cart id
    },
  );

  const result2 = await cart.deleteMetafield(
    'custom.gift',
    // Optional parameters
    {
      cartId: '123', // override the cart id
    },
  );
}

// server.js
// To query for metafields, use the `cartQueryFragment` option when creating the cart handler.
import {
  createCartHandler,
  cartGetIdDefault,
  cartSetIdDefault,
} from '@shopify/hydrogen';

const cart = createCartHandler({
  storefront,
  getCartId: cartGetIdDefault(request.headers),
  setCartId: cartSetIdDefault(),
  cartQueryFragment: CART_QUERY_FRAGMENT,
});

const CART_QUERY_FRAGMENT = `#graphql
  fragment CartApiQuery on Cart {
    id
    metafields(
      identifiers: [{
        namespace: "custom",
        key: "gift"
      ])
    {
      namespace
      key
      type
      value
    }

  }
`;

````

Update additional information (attributes) in the cart. If the cart does not exist, a new cart will be created.```js
export async function action({context}) {
const {cart} = context;

// Usage
const result = await cart.updateAttributes(
[
{
key: 'Somekey',
value: '1',
},
],
// Optional parameters
{
cartId: '123', // override the cart id
},
);

// Output of result:
// {
// cart: {
// id: 'c1-123',
// totalQuantity: 1
// },
// errors: []
// }
}

````

Update the buyer’s information in the cart. If the cart does not exist, a new cart will be created.```js
export async function action({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.updateBuyerIdentity(
    {
      customerAccessToken: '123',
    },
    // Optional parameters
    {
      cartId: '123', // override the cart id
      country: 'US', // override the country code to 'US'
      language: 'EN', // override the language code to 'EN'
    },
  );

  // Output of result:
  // {
  //   cart: {
  //     id: 'c1-123',
  //     totalQuantity: 1
  //   },
  //   errors: []
  // }
}

````

Update discount codes in the cart.```js
export async function action({context}) {
const {cart} = context;

// Usage
const result = await cart.updateDiscountCodes(
['FREE_SHIPPING'],
// Optional parameters
{
cartId: '123', // override the cart id
country: 'US', // override the country code to 'US'
language: 'EN', // override the language code to 'EN'
},
);

// Output of result:
// {
// cart: {
// id: 'c1-123',
// totalQuantity: 1
// },
// errors: []
// }
}

````

Update gift card codes in the cart.```js
export async function action({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.updateGiftCardCodes(
    ['ABC123'],
    // Optional parameters
    {
      cartId: '123', // override the cart id
      country: 'US', // override the country code to 'US'
      language: 'EN', // override the language code to 'EN'
    },
  );

  // Output of result:
  // {
  //   cart: {
  //     id: 'c1-123',
  //     appliedGiftCards: [{
  //       lastCharacters: 'C123',
  //       amountUsed: {
  //         amount: 10,
  //         currencyCode: 'USD',
  //       }
  //     }],
  //   },
  //   errors: []
  // }
}

````

Update items in the cart.```js
export async function action({context}) {
const {cart} = context;

// Usage
const result = await cart.updateLines(
[
{
merchandiseId: 'gid://shopify/ProductVariant/123456789',
quantity: 2,
},
],
// Optional parameters
{
cartId: '123', // override the cart id
country: 'US', // override the country code to 'US'
language: 'EN', // override the language code to 'EN'
},
);

// Output of result:
// {
// cart: {
// id: 'c1-123',
// totalQuantity: 2
// },
// errors: []
// }
}

````

Update the note in the cart. If the cart does not exist, a new cart will be created.```js
export async function action({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.updateNote(
    'Some notes',
    // Optional parameters
    {
      cartId: '123', // override the cart id
    },
  );

  // Output of result:
  // {
  //   cart: {
  //     id: 'c1-123',
  //     totalQuantity: 0
  //   },
  //   errors: []
  // }
}

````

Update the selected delivery options in the cart. Only available for carts associated with a customer access token.```js
export async function action({context}) {
const {cart} = context;

// Usage
const result = await cart.updateSelectedDeliveryOptions(
[
{
deliveryGroupId: '123',
deliveryOptionHandle: 'Canada Post',
},
],
// Optional parameters
{
cartId: '123', // override the cart id
country: 'US', // override the country code to 'US'
language: 'EN', // override the language code to 'EN'
},
);

// Output of result:
// {
// cart: {
// id: 'c1-123',
// totalQuantity: 2
// },
// errors: []
// }
}

````

## Returns

The handler returns the following default methods. Any [custom](https://shopify.dev/docs/api/hydrogen/utilities/createcarthandler#example-custom-methods) or overwritten methods will also be available in the returned cart instance.

### HydrogenCartForDocs

### addDeliveryAddresses

value: `CartDeliveryAddressesAddFunction`

  - CartDeliveryAddressesAddFunction: export type CartDeliveryAddressesAddFunction = (
  addresses: Array<CartSelectableAddressInput>,
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;
  - Cart: Cart
Adds a delivery address to the cart.

### addLines

value: `CartLinesAddFunction`

  - Cart: Cart
  - CartLinesAddFunction: export type CartLinesAddFunction = (
  lines: Array<CartLineInput>,
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;
Adds items to the cart. If the cart doesn't exist, a new one will be created.

### create

value: `CartCreateFunction`

  - Cart: Cart
  - CartCreateFunction: export type CartCreateFunction = (
  input: CartInput,
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;
Creates a new cart.

### deleteMetafield

value: `CartMetafieldDeleteFunction`

  - Cart: Cart
  - CartMetafieldDeleteFunction: export type CartMetafieldDeleteFunction = (
  key: Scalars['String']['input'],
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;
Removes a custom field (metafield) from the cart.

### get

value: `CartGetFunction`

  - Cart: Cart
  - CartGetFunction: export type CartGetFunction = (
  cartInput?: CartGetProps,
) => Promise<CartReturn | null>;
Retrieves the cart information.

### getCartId

value: `() => string`

Retrieves the unique identifier of the cart. By default, it gets the ID from the request cookie.

### removeDeliveryAddresses

value: `CartDeliveryAddressesRemoveFunction`

  - Cart: Cart
  - CartDeliveryAddressesRemoveFunction: export type CartDeliveryAddressesRemoveFunction = (
  addressIds: Array<Scalars['ID']['input']> | Array<string>,
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;
Removes a delivery address from the cart

### removeLines

value: `CartLinesRemoveFunction`

  - Cart: Cart
  - CartLinesRemoveFunction: export type CartLinesRemoveFunction = (
  lineIds: string[],
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;
Removes items from the cart.

### setCartId

value: `(cartId: string) => Headers`

  - Headers: Headers
Sets the unique identifier of the cart. By default, it sets the ID in the header cookie.

### setMetafields

value: `CartMetafieldsSetFunction`

  - Cart: Cart
  - CartMetafieldsSetFunction: export type CartMetafieldsSetFunction = (
  metafields: MetafieldWithoutOwnerId[],
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;
Adds extra information (metafields) to the cart. If the cart doesn't exist, a new one will be created.

### updateAttributes

value: `CartAttributesUpdateFunction`

  - Cart: Cart
  - CartAttributesUpdateFunction: export type CartAttributesUpdateFunction = (
  attributes: AttributeInput[],
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;
Updates additional information (attributes) in the cart.

### updateBuyerIdentity

value: `CartBuyerIdentityUpdateFunction`

  - Cart: Cart
  - CartBuyerIdentityUpdateFunction: export type CartBuyerIdentityUpdateFunction = (
  buyerIdentity: CartBuyerIdentityInput,
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;
Updates the buyer's information in the cart. If the cart doesn't exist, a new one will be created.

### updateDeliveryAddresses

value: `CartDeliveryAddressesUpdateFunction`

  - Cart: Cart
  - CartDeliveryAddressesUpdateFunction: export type CartDeliveryAddressesUpdateFunction = (
  addresses: Array<CartSelectableAddressUpdateInput>,
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;
Update cart delivery addresses.

### updateDiscountCodes

value: `CartDiscountCodesUpdateFunction`

  - Cart: Cart
  - CartDiscountCodesUpdateFunction: export type CartDiscountCodesUpdateFunction = (
  discountCodes: string[],
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;
Updates discount codes in the cart.

### updateGiftCardCodes

value: `CartGiftCardCodesUpdateFunction`

  - Cart: Cart
  - CartGiftCardCodesUpdateFunction: export type CartGiftCardCodesUpdateFunction = (
  giftCardCodes: string[],
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;
Updates gift card codes in the cart.

### updateLines

value: `CartLinesUpdateFunction`

  - Cart: Cart
  - CartLinesUpdateFunction: export type CartLinesUpdateFunction = (
  lines: CartLineUpdateInput[],
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;
Updates items in the cart.

### updateNote

value: `CartNoteUpdateFunction`

  - Cart: Cart
  - CartNoteUpdateFunction: export type CartNoteUpdateFunction = (
  note: string,
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;
Updates the note in the cart. If the cart doesn't exist, a new one will be created.

### updateSelectedDeliveryOption

value: `CartSelectedDeliveryOptionsUpdateFunction`

  - Cart: Cart
  - CartSelectedDeliveryOptionsUpdateFunction: export type CartSelectedDeliveryOptionsUpdateFunction = (
  selectedDeliveryOptions: CartSelectedDeliveryOptionInput[],
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;
Updates the selected delivery options in the cart. Only available for carts associated with a customer access token.

### CartDeliveryAddressesAddFunction

#### Returns: Promise<CartQueryDataReturn>

#### Params:

- addresses: CartSelectableAddressInput[]
- optionalParams: CartOptionalInput
export type CartDeliveryAddressesAddFunction = (
  addresses: Array<CartSelectableAddressInput>,
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;


### CartOptionalInput

### cartId

value: `string`

The cart id.

### country

value: `CountryCode`

The country code.

### language

value: `LanguageCode`

The language code.

### CartQueryData

### cart

value: `Cart`

  - Cart: Cart

### userErrors

value: `| CartUserError[]
    | MetafieldsSetUserError[]
    | MetafieldDeleteUserError[]`

  - Cart: Cart
  - CartUserError: CartUserError
  - MetafieldsSetUserError: MetafieldsSetUserError
  - MetafieldDeleteUserError: MetafieldDeleteUserError

### warnings

value: `CartWarning[]`

  - Cart: Cart
  - CartWarning: CartWarning

### CartLinesAddFunction

#### Returns: Promise<CartQueryDataReturn>

#### Params:

- lines: CartLineInput[]
- optionalParams: CartOptionalInput
export type CartLinesAddFunction = (
  lines: Array<CartLineInput>,
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;


### CartCreateFunction

#### Returns: Promise<CartQueryDataReturn>

#### Params:

- input: CartInput
- optionalParams: CartOptionalInput
export type CartCreateFunction = (
  input: CartInput,
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;


### CartMetafieldDeleteFunction

#### Returns: Promise<CartQueryDataReturn>

#### Params:

- key: string
- optionalParams: CartOptionalInput
export type CartMetafieldDeleteFunction = (
  key: Scalars['String']['input'],
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;


### CartGetFunction

#### Returns: Promise<CartReturn | null>

#### Params:

- cartInput: CartGetProps
export type CartGetFunction = (
  cartInput?: CartGetProps,
) => Promise<CartReturn | null>;


### CartGetProps

### cartId

value: `string`

The cart ID.

### country

value: `CountryCode`

The country code.

### language

value: `LanguageCode`

The language code.

### numCartLines

value: `number`

The number of cart lines to be returned.

### CartDeliveryAddressesRemoveFunction

#### Returns: Promise<CartQueryDataReturn>

#### Params:

- addressIds: string[]
- optionalParams: CartOptionalInput
export type CartDeliveryAddressesRemoveFunction = (
  addressIds: Array<Scalars['ID']['input']> | Array<string>,
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;


### CartLinesRemoveFunction

#### Returns: Promise<CartQueryDataReturn>

#### Params:

- lineIds: string[]
- optionalParams: CartOptionalInput
export type CartLinesRemoveFunction = (
  lineIds: string[],
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;


### CartMetafieldsSetFunction

#### Returns: Promise<CartQueryDataReturn>

#### Params:

- metafields: MetafieldWithoutOwnerId[]
- optionalParams: CartOptionalInput
export type CartMetafieldsSetFunction = (
  metafields: MetafieldWithoutOwnerId[],
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;


### CartAttributesUpdateFunction

#### Returns: Promise<CartQueryDataReturn>

#### Params:

- attributes: AttributeInput[]
- optionalParams: CartOptionalInput
export type CartAttributesUpdateFunction = (
  attributes: AttributeInput[],
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;


### CartBuyerIdentityUpdateFunction

#### Returns: Promise<CartQueryDataReturn>

#### Params:

- buyerIdentity: CartBuyerIdentityInput
- optionalParams: CartOptionalInput
export type CartBuyerIdentityUpdateFunction = (
  buyerIdentity: CartBuyerIdentityInput,
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;


### CartDeliveryAddressesUpdateFunction

#### Returns: Promise<CartQueryDataReturn>

#### Params:

- addresses: CartSelectableAddressUpdateInput[]
- optionalParams: CartOptionalInput
export type CartDeliveryAddressesUpdateFunction = (
  addresses: Array<CartSelectableAddressUpdateInput>,
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;


### CartDiscountCodesUpdateFunction

#### Returns: Promise<CartQueryDataReturn>

#### Params:

- discountCodes: string[]
- optionalParams: CartOptionalInput
export type CartDiscountCodesUpdateFunction = (
  discountCodes: string[],
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;


### CartGiftCardCodesUpdateFunction

#### Returns: Promise<CartQueryDataReturn>

#### Params:

- giftCardCodes: string[]
- optionalParams: CartOptionalInput
export type CartGiftCardCodesUpdateFunction = (
  giftCardCodes: string[],
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;


### CartLinesUpdateFunction

#### Returns: Promise<CartQueryDataReturn>

#### Params:

- lines: CartLineUpdateInput[]
- optionalParams: CartOptionalInput
export type CartLinesUpdateFunction = (
  lines: CartLineUpdateInput[],
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;


### CartNoteUpdateFunction

#### Returns: Promise<CartQueryDataReturn>

#### Params:

- note: string
- optionalParams: CartOptionalInput
export type CartNoteUpdateFunction = (
  note: string,
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;


### CartSelectedDeliveryOptionsUpdateFunction

#### Returns: Promise<CartQueryDataReturn>

#### Params:

- selectedDeliveryOptions: CartSelectedDeliveryOptionInput[]
- optionalParams: CartOptionalInput
export type CartSelectedDeliveryOptionsUpdateFunction = (
  selectedDeliveryOptions: CartSelectedDeliveryOptionInput[],
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;


## Examples

Creates an API that can be used to interact with the cart.


### Cart fragments

Use `cartQueryFragment` and `cartMutateFragment` to change the cart data the queries will return.```js
import {
  createCartHandler,
  cartGetIdDefault,
  cartSetIdDefault,
} from '@shopify/hydrogen';

// Override cart fragments
const cart = createCartHandler({
  storefront,
  getCartId: cartGetIdDefault(request.headers),
  setCartId: cartSetIdDefault(),
  cartQueryFragment: CART_QUERY_FRAGMENT,
  cartMutateFragment: CART_MUTATE_FRAGMENT,
});

// cartQueryFragment requirements:
// - Must be named `CartApiQuery`
// - Only have access to the following query variables:
//   - $cartId: ID!
//   - $country: CountryCode
//   - $language: LanguageCode
//   - $numCartLines: Int
const CART_QUERY_FRAGMENT = `#graphql
  fragment CartApiQuery on Cart {
    id
    totalQuantity
    checkoutUrl
    note
  }
`;

// cartMutateFragment requirements:
// - Must be named `CartApiMutation`
// - Only have access to the following query variables:
//   - $cartId: ID!
//   - $country: CountryCode
//   - $language: LanguageCode
const CART_MUTATE_FRAGMENT = `#graphql
  fragment CartApiMutation on Cart {
    id
    totalQuantity
    checkoutUrl
    lines(first: 100) {
      edges {
        node {
          id
          quantity
        }
      }
    }
  }
`;

````

### Custom methods

Define or override methods in your cart handler instance. Note that for addLines, updateDiscountCodes, updateBuyerIdentity, updateNote, updateAttributes, and setMetafields, if you override any of these methods, a new cart will not be created unless you implement the cart creation logic in your overriding method.```js
import {
createCartHandler,
cartGetIdDefault,
cartSetIdDefault,
cartLinesAddDefault,
cartLinesRemoveDefault,
} from '@shopify/hydrogen';

const cartQueryOptions = {
storefront,
getCartId: cartGetIdDefault(request.headers),
};

const getCartId = cartGetIdDefault(request.headers);

const cart = createCartHandler({
storefront,
getCartId,
setCartId: cartSetIdDefault(),
customMethods: {
editInLine: async (addLines, removeLineIds, optionalParams) => {
// Using Hydrogen default cart query methods
await cartLinesAddDefault(cartQueryOptions)(addLines, optionalParams);
return await cartLinesRemoveDefault(cartQueryOptions)(
removeLineIds,
optionalParams,
);
},
addLines: async (lines, optionalParams) => {
// With your own Storefront API graphql query
return await storefront.mutate(CART_LINES_ADD_MUTATION, {
variables: {
id: optionalParams.cartId || getCartId(),
lines,
},
});
},
},
});

// Use custom method editInLine that delete and add items in one method
cart.editInLine(
['123'],
[
{
merchandiseId: 'gid://shopify/ProductVariant/456789123',
quantity: 1,
},
],
);

// Use overridden cart.addLines
const result = await cart.addLines(
[
{
merchandiseId: 'gid://shopify/ProductVariant/123456789',
quantity: 1,
},
],
{
cartId: 'c-123',
},
);
// Output of result:
// {
// cartLinesAdd: {
// cart: {
// id: 'c-123',
// totalQuantity: 1
// },
// errors: []
// }
// }

const CART_LINES_ADD_MUTATION = `#graphql
  mutation CartLinesAdd(
    $cartId: ID!
    $lines: [CartLineInput!]!
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        totalQuantity
      }
      errors: userErrors {
        message
        field
        code
      }
    }
  }
`;

````


### Cart instance usage

Add items to the cart. If the cart does not exist, a new cart will be created.```js
export async function action({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.addLines(
    [
      {
        merchandiseId: 'gid://shopify/ProductVariant/123456789',
        quantity: 1,
      },
    ],
    // Optional parameters
    {
      cartId: '123', // override the cart id
      country: 'US', // override the country code to 'US'
      language: 'EN', // override the language code to 'EN'
    },
  );
}

// Output of result:
// {
//   cart: {
//     id: 'c1-123',
//     totalQuantity: 1
//   },
//   errors: []
// }

````

Create a new cart.```js
export async function action({context}) {
const {cart} = context;

// Usage
const result = await cart.create(
{
lines: [
{
merchandiseId: 'gid://shopify/ProductVariant/123456789',
quantity: 1,
},
],
discountCodes: ['FREE_SHIPPING'],
},
// Optional parameters
{
cartId: '123', // override the cart id
country: 'US', // override the country code to 'US'
language: 'EN', // override the language code to 'EN'
},
);

// Output of result:
// {
// cart: {
// id: 'c1-123',
// totalQuantity: 1,
// discountCodes: [{ code: 'FREE_SHIPPING'}]
// },
// errors: []
// }
}

````

Delete extra information (metafield) from the cart.```js
export async function action({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.setMetafields(
    [
      {
        key: 'custom.gift',
        type: 'boolean',
        value: 'true',
      },
    ],
    // Optional parameters
    {
      cartId: '123', // override the cart id
    },
  );

  const result2 = await cart.deleteMetafield(
    'custom.gift',
    // Optional parameters
    {
      cartId: '123', // override the cart id
    },
  );
}

// server.js
// To query for metafields, use the `cartQueryFragment` option when creating the cart handler.
import {
  createCartHandler,
  cartGetIdDefault,
  cartSetIdDefault,
} from '@shopify/hydrogen';

const cart = createCartHandler({
  storefront,
  getCartId: cartGetIdDefault(request.headers),
  setCartId: cartSetIdDefault(),
  cartQueryFragment: CART_QUERY_FRAGMENT,
});

const CART_QUERY_FRAGMENT = `#graphql
  fragment CartApiQuery on Cart {
    id
    metafields(
      identifiers: [{
        namespace: "custom",
        key: "gift"
      ])
    {
      namespace
      key
      type
      value
    }

  }
`;

````

Retrieve the cart information.```js
export async function loader({context}) {
const {cart} = context;

// Usage
const result = await cart.get();

// Optional parameters
const result2 = await cart.get({
cartId: '123', // override the cart id
numCartLines: 50, //override to return 50 cart lines
country: 'US', // override the country code to 'US'
language: 'EN', // override the language code to 'EN'
});
}

````

Get the unique identifier of the cart.```js
export async function loader({context}) {
  // Usage
  context.cart.getCartId(); // 'gid://shopify/Cart/123'
}

````

Remove items from the cart.```js
export async function action({context}) {
const {cart} = context;

// Usage
const result = await cart.removeLines(
['123'],
// Optional parameters
{
cartId: '123', // override the cart id
country: 'US', // override the country code to 'US'
language: 'EN', // override the language code to 'EN'
},
);

// Output of result:
// {
// cart: {
// id: 'c1-123',
// totalQuantity: 0
// },
// errors: []
// }
}

````

Set the unique identifier of the cart.```js
export async function action({context}) {
  const {cart} = context;

  const result = await cart.addLines([
    {
      merchandiseId: 'gid://shopify/ProductVariant/123456789',
      quantity: 1,
    },
  ]);

  // Usage
  const headers = cart.setCartId(result.cart.id);
}

````

Add extra information (metafields) to the cart. If the cart does not exist, a new cart will be created.```js
export async function action({context}) {
const {cart} = context;

// Usage
const result = await cart.setMetafields(
[
{
key: 'custom.gift',
type: 'boolean',
value: 'true',
},
],
// Optional parameters
{
cartId: '123', // override the cart id
},
);

const result2 = await cart.deleteMetafield(
'custom.gift',
// Optional parameters
{
cartId: '123', // override the cart id
},
);
}

// server.js
// To query for metafields, use the `cartQueryFragment` option when creating the cart handler.
import {
createCartHandler,
cartGetIdDefault,
cartSetIdDefault,
} from '@shopify/hydrogen';

const cart = createCartHandler({
storefront,
getCartId: cartGetIdDefault(request.headers),
setCartId: cartSetIdDefault(),
cartQueryFragment: CART_QUERY_FRAGMENT,
});

const CART_QUERY_FRAGMENT = `#graphql
fragment CartApiQuery on Cart {
id
metafields(
identifiers: [{
namespace: "custom",
key: "gift"
])
{
namespace
key
type
value
}

}
`;

````

Update additional information (attributes) in the cart. If the cart does not exist, a new cart will be created.```js
export async function action({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.updateAttributes(
    [
      {
        key: 'Somekey',
        value: '1',
      },
    ],
    // Optional parameters
    {
      cartId: '123', // override the cart id
    },
  );

  // Output of result:
  // {
  //   cart: {
  //     id: 'c1-123',
  //     totalQuantity: 1
  //   },
  //   errors: []
  // }
}

````

Update the buyer’s information in the cart. If the cart does not exist, a new cart will be created.```js
export async function action({context}) {
const {cart} = context;

// Usage
const result = await cart.updateBuyerIdentity(
{
customerAccessToken: '123',
},
// Optional parameters
{
cartId: '123', // override the cart id
country: 'US', // override the country code to 'US'
language: 'EN', // override the language code to 'EN'
},
);

// Output of result:
// {
// cart: {
// id: 'c1-123',
// totalQuantity: 1
// },
// errors: []
// }
}

````

Update discount codes in the cart.```js
export async function action({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.updateDiscountCodes(
    ['FREE_SHIPPING'],
    // Optional parameters
    {
      cartId: '123', // override the cart id
      country: 'US', // override the country code to 'US'
      language: 'EN', // override the language code to 'EN'
    },
  );

  // Output of result:
  // {
  //   cart: {
  //     id: 'c1-123',
  //     totalQuantity: 1
  //   },
  //   errors: []
  // }
}

````

Update gift card codes in the cart.```js
export async function action({context}) {
const {cart} = context;

// Usage
const result = await cart.updateGiftCardCodes(
['ABC123'],
// Optional parameters
{
cartId: '123', // override the cart id
country: 'US', // override the country code to 'US'
language: 'EN', // override the language code to 'EN'
},
);

// Output of result:
// {
// cart: {
// id: 'c1-123',
// appliedGiftCards: [{
// lastCharacters: 'C123',
// amountUsed: {
// amount: 10,
// currencyCode: 'USD',
// }
// }],
// },
// errors: []
// }
}

````

Update items in the cart.```js
export async function action({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.updateLines(
    [
      {
        merchandiseId: 'gid://shopify/ProductVariant/123456789',
        quantity: 2,
      },
    ],
    // Optional parameters
    {
      cartId: '123', // override the cart id
      country: 'US', // override the country code to 'US'
      language: 'EN', // override the language code to 'EN'
    },
  );

  // Output of result:
  // {
  //   cart: {
  //     id: 'c1-123',
  //     totalQuantity: 2
  //   },
  //   errors: []
  // }
}

````

Update the note in the cart. If the cart does not exist, a new cart will be created.```js
export async function action({context}) {
const {cart} = context;

// Usage
const result = await cart.updateNote(
'Some notes',
// Optional parameters
{
cartId: '123', // override the cart id
},
);

// Output of result:
// {
// cart: {
// id: 'c1-123',
// totalQuantity: 0
// },
// errors: []
// }
}

````

Update the selected delivery options in the cart. Only available for carts associated with a customer access token.```js
export async function action({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.updateSelectedDeliveryOptions(
    [
      {
        deliveryGroupId: '123',
        deliveryOptionHandle: 'Canada Post',
      },
    ],
    // Optional parameters
    {
      cartId: '123', // override the cart id
      country: 'US', // override the country code to 'US'
      language: 'EN', // override the language code to 'EN'
    },
  );

  // Output of result:
  // {
  //   cart: {
  //     id: 'c1-123',
  //     totalQuantity: 2
  //   },
  //   errors: []
  // }
}

````

## Examples

Creates an API that can be used to interact with the cart.

### Cart fragments

Use `cartQueryFragment` and `cartMutateFragment` to change the cart data the queries will return.```js
import {
createCartHandler,
cartGetIdDefault,
cartSetIdDefault,
} from '@shopify/hydrogen';

// Override cart fragments
const cart = createCartHandler({
storefront,
getCartId: cartGetIdDefault(request.headers),
setCartId: cartSetIdDefault(),
cartQueryFragment: CART_QUERY_FRAGMENT,
cartMutateFragment: CART_MUTATE_FRAGMENT,
});

// cartQueryFragment requirements:
// - Must be named `CartApiQuery`
// - Only have access to the following query variables:
// - $cartId: ID!
// - $country: CountryCode
// - $language: LanguageCode
// - $numCartLines: Int
const CART_QUERY_FRAGMENT = `#graphql
  fragment CartApiQuery on Cart {
    id
    totalQuantity
    checkoutUrl
    note
  }
`;

// cartMutateFragment requirements:
// - Must be named `CartApiMutation`
// - Only have access to the following query variables:
// - $cartId: ID!
// - $country: CountryCode
// - $language: LanguageCode
const CART_MUTATE_FRAGMENT = `#graphql
  fragment CartApiMutation on Cart {
    id
    totalQuantity
    checkoutUrl
    lines(first: 100) {
      edges {
        node {
          id
          quantity
        }
      }
    }
  }
`;

````


### Custom methods

Define or override methods in your cart handler instance. Note that for addLines, updateDiscountCodes, updateBuyerIdentity, updateNote, updateAttributes, and setMetafields, if you override any of these methods, a new cart will not be created unless you implement the cart creation logic in your overriding method.```js
import {
  createCartHandler,
  cartGetIdDefault,
  cartSetIdDefault,
  cartLinesAddDefault,
  cartLinesRemoveDefault,
} from '@shopify/hydrogen';

const cartQueryOptions = {
  storefront,
  getCartId: cartGetIdDefault(request.headers),
};

const getCartId = cartGetIdDefault(request.headers);

const cart = createCartHandler({
  storefront,
  getCartId,
  setCartId: cartSetIdDefault(),
  customMethods: {
    editInLine: async (addLines, removeLineIds, optionalParams) => {
      // Using Hydrogen default cart query methods
      await cartLinesAddDefault(cartQueryOptions)(addLines, optionalParams);
      return await cartLinesRemoveDefault(cartQueryOptions)(
        removeLineIds,
        optionalParams,
      );
    },
    addLines: async (lines, optionalParams) => {
      // With your own Storefront API graphql query
      return await storefront.mutate(CART_LINES_ADD_MUTATION, {
        variables: {
          id: optionalParams.cartId || getCartId(),
          lines,
        },
      });
    },
  },
});

// Use custom method editInLine that delete and add items in one method
cart.editInLine(
  ['123'],
  [
    {
      merchandiseId: 'gid://shopify/ProductVariant/456789123',
      quantity: 1,
    },
  ],
);

// Use overridden cart.addLines
const result = await cart.addLines(
  [
    {
      merchandiseId: 'gid://shopify/ProductVariant/123456789',
      quantity: 1,
    },
  ],
  {
    cartId: 'c-123',
  },
);
// Output of result:
// {
//   cartLinesAdd: {
//     cart: {
//       id: 'c-123',
//       totalQuantity: 1
//     },
//     errors: []
//   }
// }

const CART_LINES_ADD_MUTATION = `#graphql
  mutation CartLinesAdd(
    $cartId: ID!
    $lines: [CartLineInput!]!
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        totalQuantity
      }
      errors: userErrors {
        message
        field
        code
      }
    }
  }
`;

````

### Cart instance usage

Add items to the cart. If the cart does not exist, a new cart will be created.```js
export async function action({context}) {
const {cart} = context;

// Usage
const result = await cart.addLines(
[
{
merchandiseId: 'gid://shopify/ProductVariant/123456789',
quantity: 1,
},
],
// Optional parameters
{
cartId: '123', // override the cart id
country: 'US', // override the country code to 'US'
language: 'EN', // override the language code to 'EN'
},
);
}

// Output of result:
// {
// cart: {
// id: 'c1-123',
// totalQuantity: 1
// },
// errors: []
// }

````

Create a new cart.```js
export async function action({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.create(
    {
      lines: [
        {
          merchandiseId: 'gid://shopify/ProductVariant/123456789',
          quantity: 1,
        },
      ],
      discountCodes: ['FREE_SHIPPING'],
    },
    // Optional parameters
    {
      cartId: '123', // override the cart id
      country: 'US', // override the country code to 'US'
      language: 'EN', // override the language code to 'EN'
    },
  );

  // Output of result:
  // {
  //   cart: {
  //     id: 'c1-123',
  //     totalQuantity: 1,
  //     discountCodes: [{ code: 'FREE_SHIPPING'}]
  //   },
  //   errors: []
  // }
}

````

Delete extra information (metafield) from the cart.```js
export async function action({context}) {
const {cart} = context;

// Usage
const result = await cart.setMetafields(
[
{
key: 'custom.gift',
type: 'boolean',
value: 'true',
},
],
// Optional parameters
{
cartId: '123', // override the cart id
},
);

const result2 = await cart.deleteMetafield(
'custom.gift',
// Optional parameters
{
cartId: '123', // override the cart id
},
);
}

// server.js
// To query for metafields, use the `cartQueryFragment` option when creating the cart handler.
import {
createCartHandler,
cartGetIdDefault,
cartSetIdDefault,
} from '@shopify/hydrogen';

const cart = createCartHandler({
storefront,
getCartId: cartGetIdDefault(request.headers),
setCartId: cartSetIdDefault(),
cartQueryFragment: CART_QUERY_FRAGMENT,
});

const CART_QUERY_FRAGMENT = `#graphql
fragment CartApiQuery on Cart {
id
metafields(
identifiers: [{
namespace: "custom",
key: "gift"
])
{
namespace
key
type
value
}

}
`;

````

Retrieve the cart information.```js
export async function loader({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.get();

  // Optional parameters
  const result2 = await cart.get({
    cartId: '123', // override the cart id
    numCartLines: 50, //override to return 50 cart lines
    country: 'US', // override the country code to 'US'
    language: 'EN', // override the language code to 'EN'
  });
}

````

Get the unique identifier of the cart.```js
export async function loader({context}) {
// Usage
context.cart.getCartId(); // 'gid://shopify/Cart/123'
}

````

Remove items from the cart.```js
export async function action({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.removeLines(
    ['123'],
    // Optional parameters
    {
      cartId: '123', // override the cart id
      country: 'US', // override the country code to 'US'
      language: 'EN', // override the language code to 'EN'
    },
  );

  // Output of result:
  // {
  //   cart: {
  //     id: 'c1-123',
  //     totalQuantity: 0
  //   },
  //   errors: []
  // }
}

````

Set the unique identifier of the cart.```js
export async function action({context}) {
const {cart} = context;

const result = await cart.addLines([
{
merchandiseId: 'gid://shopify/ProductVariant/123456789',
quantity: 1,
},
]);

// Usage
const headers = cart.setCartId(result.cart.id);
}

````

Add extra information (metafields) to the cart. If the cart does not exist, a new cart will be created.```js
export async function action({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.setMetafields(
    [
      {
        key: 'custom.gift',
        type: 'boolean',
        value: 'true',
      },
    ],
    // Optional parameters
    {
      cartId: '123', // override the cart id
    },
  );

  const result2 = await cart.deleteMetafield(
    'custom.gift',
    // Optional parameters
    {
      cartId: '123', // override the cart id
    },
  );
}

// server.js
// To query for metafields, use the `cartQueryFragment` option when creating the cart handler.
import {
  createCartHandler,
  cartGetIdDefault,
  cartSetIdDefault,
} from '@shopify/hydrogen';

const cart = createCartHandler({
  storefront,
  getCartId: cartGetIdDefault(request.headers),
  setCartId: cartSetIdDefault(),
  cartQueryFragment: CART_QUERY_FRAGMENT,
});

const CART_QUERY_FRAGMENT = `#graphql
  fragment CartApiQuery on Cart {
    id
    metafields(
      identifiers: [{
        namespace: "custom",
        key: "gift"
      ])
    {
      namespace
      key
      type
      value
    }

  }
`;

````

Update additional information (attributes) in the cart. If the cart does not exist, a new cart will be created.```js
export async function action({context}) {
const {cart} = context;

// Usage
const result = await cart.updateAttributes(
[
{
key: 'Somekey',
value: '1',
},
],
// Optional parameters
{
cartId: '123', // override the cart id
},
);

// Output of result:
// {
// cart: {
// id: 'c1-123',
// totalQuantity: 1
// },
// errors: []
// }
}

````

Update the buyer’s information in the cart. If the cart does not exist, a new cart will be created.```js
export async function action({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.updateBuyerIdentity(
    {
      customerAccessToken: '123',
    },
    // Optional parameters
    {
      cartId: '123', // override the cart id
      country: 'US', // override the country code to 'US'
      language: 'EN', // override the language code to 'EN'
    },
  );

  // Output of result:
  // {
  //   cart: {
  //     id: 'c1-123',
  //     totalQuantity: 1
  //   },
  //   errors: []
  // }
}

````

Update discount codes in the cart.```js
export async function action({context}) {
const {cart} = context;

// Usage
const result = await cart.updateDiscountCodes(
['FREE_SHIPPING'],
// Optional parameters
{
cartId: '123', // override the cart id
country: 'US', // override the country code to 'US'
language: 'EN', // override the language code to 'EN'
},
);

// Output of result:
// {
// cart: {
// id: 'c1-123',
// totalQuantity: 1
// },
// errors: []
// }
}

````

Update gift card codes in the cart.```js
export async function action({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.updateGiftCardCodes(
    ['ABC123'],
    // Optional parameters
    {
      cartId: '123', // override the cart id
      country: 'US', // override the country code to 'US'
      language: 'EN', // override the language code to 'EN'
    },
  );

  // Output of result:
  // {
  //   cart: {
  //     id: 'c1-123',
  //     appliedGiftCards: [{
  //       lastCharacters: 'C123',
  //       amountUsed: {
  //         amount: 10,
  //         currencyCode: 'USD',
  //       }
  //     }],
  //   },
  //   errors: []
  // }
}

````

Update items in the cart.```js
export async function action({context}) {
const {cart} = context;

// Usage
const result = await cart.updateLines(
[
{
merchandiseId: 'gid://shopify/ProductVariant/123456789',
quantity: 2,
},
],
// Optional parameters
{
cartId: '123', // override the cart id
country: 'US', // override the country code to 'US'
language: 'EN', // override the language code to 'EN'
},
);

// Output of result:
// {
// cart: {
// id: 'c1-123',
// totalQuantity: 2
// },
// errors: []
// }
}

````

Update the note in the cart. If the cart does not exist, a new cart will be created.```js
export async function action({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.updateNote(
    'Some notes',
    // Optional parameters
    {
      cartId: '123', // override the cart id
    },
  );

  // Output of result:
  // {
  //   cart: {
  //     id: 'c1-123',
  //     totalQuantity: 0
  //   },
  //   errors: []
  // }
}

````

Update the selected delivery options in the cart. Only available for carts associated with a customer access token.```js
export async function action({context}) {
const {cart} = context;

// Usage
const result = await cart.updateSelectedDeliveryOptions(
[
{
deliveryGroupId: '123',
deliveryOptionHandle: 'Canada Post',
},
],
// Optional parameters
{
cartId: '123', // override the cart id
country: 'US', // override the country code to 'US'
language: 'EN', // override the language code to 'EN'
},
);

// Output of result:
// {
// cart: {
// id: 'c1-123',
// totalQuantity: 2
// },
// errors: []
// }
}

```

```
