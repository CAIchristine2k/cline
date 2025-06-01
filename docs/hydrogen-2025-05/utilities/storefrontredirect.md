# storefrontRedirect

Queries the Storefront API to see if there is any redirect [created for the current route](https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect) and performs it. Otherwise, it returns the response passed in the parameters. Useful for conditionally redirecting after a 404 response.

```js
import {storefrontRedirect, createStorefrontClient} from '@shopify/hydrogen';
// @ts-expect-error
import * as reactRouterBuild from 'virtual:react-router/server-build';
import {createRequestHandler, getStorefrontHeaders} from 'react-router';

export default {
  async fetch(request, env, executionContext) {
    const {storefront} = createStorefrontClient({
      cache: await caches.open('hydrogen'),
      waitUntil: (p) => executionContext.waitUntil(p),
      privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
      publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      storeDomain: env.PUBLIC_STORE_DOMAIN,
      storefrontHeaders: getStorefrontHeaders(request),
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
    });

    const response = await handleRequest(request);

    if (response.status === 404) {
      /**
       * Check for redirects only when there's a 404 from
       * the app. If the redirect doesn't exist, then
       * `storefrontRedirect` will pass through the 404
       * response.
       */
      return storefrontRedirect({request, response, storefront});
    }

    return response;
  },
};
```

```ts
import {storefrontRedirect, createStorefrontClient} from '@shopify/hydrogen';
// @ts-expect-error
import * as reactRouterBuild from 'virtual:react-router/server-build';
import {createRequestHandler, getStorefrontHeaders} from 'react-router';

export default {
  async fetch(request: Request, env: Env, executionContext: ExecutionContext) {
    const {storefront} = createStorefrontClient({
      cache: await caches.open('hydrogen'),
      waitUntil: (p: Promise<unknown>) => executionContext.waitUntil(p),
      privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
      publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      storeDomain: env.PUBLIC_STORE_DOMAIN,
      storefrontHeaders: getStorefrontHeaders(request),
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
    });

    const response = await handleRequest(request);

    if (response.status === 404) {
      /**
       * Check for redirects only when there's a 404 from
       * the app. If the redirect doesn't exist, then
       * `storefrontRedirect` will pass through the 404
       * response.
       */
      return storefrontRedirect({request, response, storefront});
    }

    return response;
  },
};
```

## Arguments

### StorefrontRedirectGeneratedType

Queries the Storefront API to see if there is any redirect created for the current route and performs it. Otherwise, it returns the response passed in the parameters. Useful for conditionally redirecting after a 404 response.

#### Returns: Promise<Response>

#### Params:

- options: StorefrontRedirect
  export async function storefrontRedirect(
  options: StorefrontRedirect,
  ): Promise<Response> {
  const {
  storefront,
  request,
  noAdminRedirect,
  matchQueryParams,
  response = new Response('Not Found', {status: 404}),
  } = options;

  const url = new URL(request.url);
  const {pathname, searchParams} = url;
  const isSoftNavigation = searchParams.has('\_data');

  searchParams.delete('redirect');
  searchParams.delete('return_to');
  searchParams.delete('\_data');

  const redirectFrom = (
  matchQueryParams ? url.toString().replace(url.origin, '') : pathname
  ).toLowerCase();

  if (url.pathname === '/admin' && !noAdminRedirect) {
  return createRedirectResponse(
  `${storefront.getShopifyDomain()}/admin`,
  isSoftNavigation,
  searchParams,
  matchQueryParams,
  );
  }

  try {
  const {urlRedirects} = await storefront.query<{
  urlRedirects: UrlRedirectConnection;
  }>(REDIRECT_QUERY, {
  // The admin doesn't allow redirects to have a
  // trailing slash, so strip them all off
  variables: {query: 'path:' + redirectFrom.replace(/\/+$/, '')},
  });

      const location = urlRedirects?.edges?.[0]?.node?.target;

      if (location) {
        return createRedirectResponse(
          location,
          isSoftNavigation,
          searchParams,
          matchQueryParams,
        );
      }

      const redirectTo = getRedirectUrl(request.url);

      if (redirectTo) {
        return createRedirectResponse(
          redirectTo,
          isSoftNavigation,
          searchParams,
          matchQueryParams,
        );
      }

  } catch (error) {
  console.error(
  `Failed to fetch redirects from Storefront API for route ${redirectFrom}`,
  error,
  );
  }

  return response;
  }

### StorefrontRedirect

### matchQueryParams

value: `boolean`

By default, query parameters are not used to match redirects. Set this to `true` if you'd like redirects to be query parameter sensitive

### noAdminRedirect

value: `boolean`

By default the `/admin` route is redirected to the Shopify Admin page for the current storefront. Disable this redirect by passing `true`.

### request

value: `Request`

The [MDN Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object that was passed to the `server.ts` request handler.

### response

value: `Response`

The [MDN Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object created by `handleRequest`

### storefront

value: `Storefront<I18nBase>`

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
- I18nBase: {
  language: LanguageCode;
  country: CountryCode;
  }
  The [Storefront client](https://shopify.dev/docs/api/hydrogen/utilities/createstorefrontclient) instance

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

### I18nBase

### country

value: `CountryCode`

### language

value: `LanguageCode`
