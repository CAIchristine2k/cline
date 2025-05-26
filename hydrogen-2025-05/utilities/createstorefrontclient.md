# createStorefrontClient

This function extends `createStorefrontClient` from [Hydrogen React](https://shopify.dev/docs/api/hydrogen-react/2025-04/utilities/createstorefrontclient).
The additional arguments enable internationalization (i18n), caching, and other features particular to Remix and Oxygen.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

```js
import {createStorefrontClient} from '@shopify/hydrogen';
import {
  createRequestHandler,
  getStorefrontHeaders,
} from '@shopify/remix-oxygen';
export default {
  async fetch(request, env, executionContext) {
    /* Create a Storefront client with your credentials and options */
    const {storefront} = createStorefrontClient({
      /* Cache API instance */
      cache: await caches.open('hydrogen'),
      /* Runtime utility in serverless environments */
      waitUntil: (p) => executionContext.waitUntil(p),
      /* Private Storefront API token for your store */
      privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
      /* Public Storefront API token for your store */
      publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      /* Your store domain: "{shop}.myshopify.com" */
      storeDomain: env.PUBLIC_STORE_DOMAIN,
      /**
       * Storefront API headers containing:
       * - buyerIp: The IP address of the customer.
       * - requestGroupId: A unique ID to group all the logs for this request.
       * - cookie: The 'cookie' header from the request.
       */
      storefrontHeaders: getStorefrontHeaders(request),
    });

    const handleRequest = createRequestHandler({
      build: remixBuild,
      mode: process.env.NODE_ENV,
      /* Inject the Storefront client in the Remix context */
      getLoadContext: () => ({storefront}),
    });

    return handleRequest(request);
  },
};

```

```ts
import {createStorefrontClient} from '@shopify/hydrogen';
// @ts-expect-error
import * as serverBuild from 'virtual:react-router/server-build';
import {
  createRequestHandler,
  getStorefrontHeaders,
} from '@shopify/remix-oxygen';

export default {
  async fetch(
    request: Request,
    env: Record<string, string>,
    executionContext: ExecutionContext,
  ) {
    /* Create a Storefront client with your credentials and options */
    const {storefront} = createStorefrontClient({
      /* Cache API instance */
      cache: await caches.open('hydrogen'),
      /* Runtime utility in serverless environments */
      waitUntil: (p: Promise<unknown>) => executionContext.waitUntil(p),
      /* Private Storefront API token for your store */
      privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
      /* Public Storefront API token for your store */
      publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      /* Your store domain: "{shop}.myshopify.com" */
      storeDomain: env.PUBLIC_STORE_DOMAIN,
      /**
       * Storefront API headers containing:
       * - buyerIp: The IP address of the customer.
       * - requestGroupId: A unique ID to group all the logs for this request.
       * - cookie: The 'cookie' header from the request.
       */
      storefrontHeaders: getStorefrontHeaders(request),
    });

    const handleRequest = createRequestHandler({
      build: serverBuild,
      mode: process.env.NODE_ENV,
      /* Inject the Storefront client in the Remix context */
      getLoadContext: () => ({storefront}),
    });

    return handleRequest(request);
  },
};

```

## Parameters

### HydrogenClientProps

### cache

value: `Cache`

An instance that implements the [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache)

### i18n

value: `TI18n`

An object containing a country code and language code

### logErrors

value: `boolean | ((error?: Error) => boolean)`

Whether it should print GraphQL errors automatically. Defaults to true

### storefrontHeaders

value: `StorefrontHeaders`

Storefront API headers. If on Oxygen, use `getStorefrontHeaders()`

### storefrontId

value: `string`

The globally unique identifier for the Shop

### waitUntil

value: `WaitUntil`

The `waitUntil` function is used to keep the current request/response lifecycle alive even after a response has been sent. It should be provided by your platform.

## Related

- [CacheNone](https://shopify.dev/docs/api/hydrogen/utilities/cachenone)
- [CacheShort](https://shopify.dev/docs/api/hydrogen/utilities/cacheshort)
- [CacheLong](https://shopify.dev/docs/api/hydrogen/utilities/cachelong)
- [CacheCustom](https://shopify.dev/docs/api/hydrogen/utilities/cachecustom)
- [InMemoryCache](https://shopify.dev/docs/api/hydrogen/utilities/inmemorycache)

## Returns

### CreateStorefrontClientForDocs

### storefront

value: `StorefrontForDoc<TI18n>`

  - StorefrontForDoc: {
  /** The function to run a query on Storefront API. */
  query?: <TData = any>(
    query: string,
    options: StorefrontQueryOptionsForDocs,
  ) => Promise<TData & StorefrontError>;
  /** The function to run a mutation on Storefront API. */
  mutate?: <TData = any>(
    mutation: string,
    options: StorefrontMutationOptionsForDocs,
  ) => Promise<TData & StorefrontError>;
  /** The cache instance passed in from the `createStorefrontClient` argument. */
  cache?: Cache;
  /** Re-export of [`CacheNone`](https://shopify.dev/docs/api/hydrogen/utilities/cachenone). */
  CacheNone?: typeof CacheNone;
  /** Re-export of [`CacheLong`](https://shopify.dev/docs/api/hydrogen/utilities/cachelong). */
  CacheLong?: typeof CacheLong;
  /** Re-export of [`CacheShort`](https://shopify.dev/docs/api/hydrogen/utilities/cacheshort). */
  CacheShort?: typeof CacheShort;
  /** Re-export of [`CacheCustom`](https://shopify.dev/docs/api/hydrogen/utilities/cachecustom). */
  CacheCustom?: typeof CacheCustom;
  /** Re-export of [`generateCacheControlHeader`](https://shopify.dev/docs/api/hydrogen/utilities/generatecachecontrolheader). */
  generateCacheControlHeader?: typeof generateCacheControlHeader;
  /** Returns an object that contains headers that are needed for each query to Storefront API GraphQL endpoint. See [`getPublicTokenHeaders` in Hydrogen React](https://shopify.dev/docs/api/hydrogen-react/2025-04/utilities/createstorefrontclient#:~:text=%27graphql%27.-,getPublicTokenHeaders,-(props%3F%3A) for more details. */
  getPublicTokenHeaders?: ReturnType<
    typeof createStorefrontUtilities
  >['getPublicTokenHeaders'];
  /** Returns an object that contains headers that are needed for each query to Storefront API GraphQL endpoint for API calls made from a server. See [`getPrivateTokenHeaders` in  Hydrogen React](https://shopify.dev/docs/api/hydrogen-react/2025-04/utilities/createstorefrontclient#:~:text=storefrontApiVersion-,getPrivateTokenHeaders,-(props%3F%3A) for more details.*/
  getPrivateTokenHeaders?: ReturnType<
    typeof createStorefrontUtilities
  >['getPrivateTokenHeaders'];
  /** Creates the fully-qualified URL to your myshopify.com domain. See [`getShopifyDomain` in  Hydrogen React](https://shopify.dev/docs/api/hydrogen-react/2025-04/utilities/createstorefrontclient#:~:text=StorefrontClientReturn-,getShopifyDomain,-(props%3F%3A) for more details. */
  getShopifyDomain?: ReturnType<
    typeof createStorefrontUtilities
  >['getShopifyDomain'];
  /** Creates the fully-qualified URL to your store's GraphQL endpoint. See [`getStorefrontApiUrl` in  Hydrogen React](https://shopify.dev/docs/api/hydrogen-react/2025-04/utilities/createstorefrontclient#:~:text=storeDomain-,getStorefrontApiUrl,-(props%3F%3A) for more details.*/
  getApiUrl?: ReturnType<
    typeof createStorefrontUtilities
  >['getStorefrontApiUrl'];
  /** The `i18n` object passed in from the `createStorefrontClient` argument. */
  i18n?: TI18n;
}

### StorefrontForDoc

### cache

value: `Cache`

The cache instance passed in from the `createStorefrontClient` argument.

### CacheCustom

value: `(overrideOptions: AllCacheOptions) => AllCacheOptions`

  - AllCacheOptions: export interface AllCacheOptions {
  /**
   * The caching mode, generally `public`, `private`, or `no-store`.
   */
  mode?: string;
  /**
   * The maximum amount of time in seconds that a resource will be considered fresh. See `max-age` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#:~:text=Response%20Directives-,max%2Dage,-The%20max%2Dage).
   */
  maxAge?: number;
  /**
   * Indicate that the cache should serve the stale response in the background while revalidating the cache. See `stale-while-revalidate` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate).
   */
  staleWhileRevalidate?: number;
  /**
   * Similar to `maxAge` but specific to shared caches. See `s-maxage` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#s-maxage).
   */
  sMaxAge?: number;
  /**
   * Indicate that the cache should serve the stale response if an error occurs while revalidating the cache. See `stale-if-error` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error).
   */
  staleIfError?: number;
}
Re-export of [`CacheCustom`](https://shopify.dev/docs/api/hydrogen/utilities/cachecustom).

### CacheLong

value: `(overrideOptions?: AllCacheOptions) => AllCacheOptions`

  - AllCacheOptions: export interface AllCacheOptions {
  /**
   * The caching mode, generally `public`, `private`, or `no-store`.
   */
  mode?: string;
  /**
   * The maximum amount of time in seconds that a resource will be considered fresh. See `max-age` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#:~:text=Response%20Directives-,max%2Dage,-The%20max%2Dage).
   */
  maxAge?: number;
  /**
   * Indicate that the cache should serve the stale response in the background while revalidating the cache. See `stale-while-revalidate` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate).
   */
  staleWhileRevalidate?: number;
  /**
   * Similar to `maxAge` but specific to shared caches. See `s-maxage` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#s-maxage).
   */
  sMaxAge?: number;
  /**
   * Indicate that the cache should serve the stale response if an error occurs while revalidating the cache. See `stale-if-error` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error).
   */
  staleIfError?: number;
}
Re-export of [`CacheLong`](https://shopify.dev/docs/api/hydrogen/utilities/cachelong).

### CacheNone

value: `() => NoStoreStrategy`

  - NoStoreStrategy: {
  mode: string;
}
Re-export of [`CacheNone`](https://shopify.dev/docs/api/hydrogen/utilities/cachenone).

### CacheShort

value: `(overrideOptions?: AllCacheOptions) => AllCacheOptions`

  - AllCacheOptions: export interface AllCacheOptions {
  /**
   * The caching mode, generally `public`, `private`, or `no-store`.
   */
  mode?: string;
  /**
   * The maximum amount of time in seconds that a resource will be considered fresh. See `max-age` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#:~:text=Response%20Directives-,max%2Dage,-The%20max%2Dage).
   */
  maxAge?: number;
  /**
   * Indicate that the cache should serve the stale response in the background while revalidating the cache. See `stale-while-revalidate` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate).
   */
  staleWhileRevalidate?: number;
  /**
   * Similar to `maxAge` but specific to shared caches. See `s-maxage` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#s-maxage).
   */
  sMaxAge?: number;
  /**
   * Indicate that the cache should serve the stale response if an error occurs while revalidating the cache. See `stale-if-error` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error).
   */
  staleIfError?: number;
}
Re-export of [`CacheShort`](https://shopify.dev/docs/api/hydrogen/utilities/cacheshort).

### generateCacheControlHeader

value: `(cacheOptions: AllCacheOptions) => string`

  - AllCacheOptions: export interface AllCacheOptions {
  /**
   * The caching mode, generally `public`, `private`, or `no-store`.
   */
  mode?: string;
  /**
   * The maximum amount of time in seconds that a resource will be considered fresh. See `max-age` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#:~:text=Response%20Directives-,max%2Dage,-The%20max%2Dage).
   */
  maxAge?: number;
  /**
   * Indicate that the cache should serve the stale response in the background while revalidating the cache. See `stale-while-revalidate` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate).
   */
  staleWhileRevalidate?: number;
  /**
   * Similar to `maxAge` but specific to shared caches. See `s-maxage` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#s-maxage).
   */
  sMaxAge?: number;
  /**
   * Indicate that the cache should serve the stale response if an error occurs while revalidating the cache. See `stale-if-error` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error).
   */
  staleIfError?: number;
}
Re-export of [`generateCacheControlHeader`](https://shopify.dev/docs/api/hydrogen/utilities/generatecachecontrolheader).

### getApiUrl

value: `(props?: Partial<Pick<StorefrontClientProps, "storefrontApiVersion" | "storeDomain">>) => string`

Creates the fully-qualified URL to your store's GraphQL endpoint. See [`getStorefrontApiUrl` in  Hydrogen React](https://shopify.dev/docs/api/hydrogen-react/2025-04/utilities/createstorefrontclient#:~:text=storeDomain-,getStorefrontApiUrl,-(props%3F%3A) for more details.

### getPrivateTokenHeaders

value: `(props?: Partial<Pick<StorefrontClientProps, "contentType">> & Pick<StorefrontClientProps, "privateStorefrontToken"> & { buyerIp?: string; }) => Record<string, string>`

Returns an object that contains headers that are needed for each query to Storefront API GraphQL endpoint for API calls made from a server. See [`getPrivateTokenHeaders` in  Hydrogen React](https://shopify.dev/docs/api/hydrogen-react/2025-04/utilities/createstorefrontclient#:~:text=storefrontApiVersion-,getPrivateTokenHeaders,-(props%3F%3A) for more details.

### getPublicTokenHeaders

value: `(props?: Partial<Pick<StorefrontClientProps, "contentType">> & Pick<StorefrontClientProps, "publicStorefrontToken">) => Record<string, string>`

Returns an object that contains headers that are needed for each query to Storefront API GraphQL endpoint. See [`getPublicTokenHeaders` in Hydrogen React](https://shopify.dev/docs/api/hydrogen-react/2025-04/utilities/createstorefrontclient#:~:text=%27graphql%27.-,getPublicTokenHeaders,-(props%3F%3A) for more details.

### getShopifyDomain

value: `(props?: Partial<Pick<StorefrontClientProps, "storeDomain">>) => string`

Creates the fully-qualified URL to your myshopify.com domain. See [`getShopifyDomain` in  Hydrogen React](https://shopify.dev/docs/api/hydrogen-react/2025-04/utilities/createstorefrontclient#:~:text=StorefrontClientReturn-,getShopifyDomain,-(props%3F%3A) for more details.

### i18n

value: `TI18n`

The `i18n` object passed in from the `createStorefrontClient` argument.

### mutate

value: `<TData = any>(mutation: string, options: StorefrontMutationOptionsForDocs) => Promise<TData & StorefrontError>`

  - StorefrontMutationOptionsForDocs: {
  /** The variables for the GraphQL mutation statement. */
  variables?: Record<string, unknown>;
  /** Additional headers for this query. */
  headers?: HeadersInit;
  /** Override the Storefront API version for this query. */
  storefrontApiVersion?: string;
  /** The name of the query for debugging in the Subrequest Profiler. */
  displayName?: string;
}
  - StorefrontError: {
  errors?: StorefrontApiErrors;
}
The function to run a mutation on Storefront API.

### query

value: `<TData = any>(query: string, options: StorefrontQueryOptionsForDocs) => Promise<TData & StorefrontError>`

  - StorefrontError: {
  errors?: StorefrontApiErrors;
}
  - StorefrontQueryOptionsForDocs: {
  /** The variables for the GraphQL query statement. */
  variables?: Record<string, unknown>;
  /** The cache strategy for this query. Default to max-age=1, stale-while-revalidate=86399. */
  cache?: CachingStrategy;
  /** Additional headers for this query. */
  headers?: HeadersInit;
  /** Override the Storefront API version for this query. */
  storefrontApiVersion?: string;
  /** The name of the query for debugging in the Subrequest Profiler. */
  displayName?: string;
}
The function to run a query on Storefront API.

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


### StorefrontMutationOptionsForDocs

### displayName

value: `string`

The name of the query for debugging in the Subrequest Profiler.

### headers

value: `HeadersInit`

Additional headers for this query.

### storefrontApiVersion

value: `string`

Override the Storefront API version for this query.

### variables

value: `Record<string, unknown>`

The variables for the GraphQL mutation statement.

### StorefrontError

### errors

value: `StorefrontApiErrors`

  - StorefrontApiErrors: JsonGraphQLError[] | undefined

### StorefrontQueryOptionsForDocs

### cache

value: `CachingStrategy`

  - CachingStrategy: AllCacheOptions
The cache strategy for this query. Default to max-age=1, stale-while-revalidate=86399.

### displayName

value: `string`

The name of the query for debugging in the Subrequest Profiler.

### headers

value: `HeadersInit`

Additional headers for this query.

### storefrontApiVersion

value: `string`

Override the Storefront API version for this query.

### variables

value: `Record<string, unknown>`

The variables for the GraphQL query statement.

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

## Related

- [CacheNone](https://shopify.dev/docs/api/hydrogen/utilities/cachenone)
- [CacheShort](https://shopify.dev/docs/api/hydrogen/utilities/cacheshort)
- [CacheLong](https://shopify.dev/docs/api/hydrogen/utilities/cachelong)
- [CacheCustom](https://shopify.dev/docs/api/hydrogen/utilities/cachecustom)
- [InMemoryCache](https://shopify.dev/docs/api/hydrogen/utilities/inmemorycache)

