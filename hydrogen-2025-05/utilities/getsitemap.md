# getSitemap

Generate a sitemap for a specific resource type. Returns a standard Response object.

```js
import {getSitemap} from '@shopify/hydrogen';

export async function loader({request, params, context: {storefront}}) {
  const response = await getSitemap({
    storefront,
    request,
    params,
    // The locales to include in the sitemap
    locales: ['EN-US', 'EN-CA', 'FR-CA'],
    // A function to generate a link for a given resource
    getLink: ({type, baseUrl, handle, locale}) => {
      if (!locale) return `${baseUrl}/${type}/${handle}`;
      return `${baseUrl}/${locale}/${type}/${handle}`;
    },
  });

  // Set any custom headers on the sitemap response
  response.headers.set('Cache-Control', `max-age=${60 * 60 * 24}`);

  return response;
}

```

```ts
import type {LoaderFunctionArgs} from 'react-router';
import {getSitemap} from '@shopify/hydrogen';

export async function loader({
  request,
  params,
  context: {storefront},
}: LoaderFunctionArgs) {
  const response = await getSitemap({
    storefront,
    request,
    params,
    // The locales to include in the sitemap
    locales: ['EN-US', 'EN-CA', 'FR-CA'],
    // A function to generate a link for a given resource
    getLink: ({type, baseUrl, handle, locale}) => {
      if (!locale) return `${baseUrl}/${type}/${handle}`;
      return `${baseUrl}/${locale}/${type}/${handle}`;
    },
  });

  // Set any custom headers on the sitemap response
  response.headers.set('Cache-Control', `max-age=${60 * 60 * 24}`);

  return response;
}

```

## getSitemap

### GetSitemapGeneratedType

Generate a sitemap for a specific resource type.

#### Returns: Promise<Response>

#### Params:

- options: GetSiteMapOptions
export async function getSitemap(
  options: GetSiteMapOptions,
): Promise<Response> {
  const {
    storefront,
    request,
    params,
    getLink,
    locales = [],
    getChangeFreq,
    noItemsFallback = '/',
  } = options;

  if (!params)
    throw new Error(
      '[h2:sitemap:error] Remix params object is required to generate a sitemap',
    );

  if (!request || !request.url)
    throw new Error('A request object is required to generate a sitemap');

  if (!storefront || !storefront.query)
    throw new Error('A storefront client is required to generate a index');

  if (!getLink)
    throw new Error(
      'A `getLink` function to generate each resource is required to build a sitemap',
    );

  if (!params.type || !params.page)
    throw new Response('No data found', {status: 404});

  const type = params.type as keyof typeof QUERIES;

  const query = QUERIES[type];

  if (!query) throw new Response('Not found', {status: 404});

  const data = await storefront.query(query, {
    variables: {
      page: parseInt(params.page, 10),
    },
  });

  if (!data) {
    console.warn(
      '[h2:sitemap:warning] Sitemap is available in API version 2024-10 and later',
    );
    throw new Response('Sitemap not found.', {status: 404});
  }

  const baseUrl = new URL(request.url).origin;
  let body: string = '';

  if (!data?.sitemap?.resources?.items?.length) {
    body =
      SITEMAP_PREFIX +
      `\n  <url><loc>${baseUrl + noItemsFallback}</loc></url>\n` +
      SITEMAP_SUFFIX;
  } else {
    body =
      SITEMAP_PREFIX +
      data.sitemap.resources.items
        .map((item: {handle: string; updatedAt: string; type?: string}) => {
          return renderUrlTag({
            getChangeFreq,
            url: getLink({
              type: item.type ?? type,
              baseUrl,
              handle: item.handle,
            }),
            type,
            getLink,
            updatedAt: item.updatedAt,
            handle: item.handle,
            metaobjectType: item.type,
            locales,
            baseUrl,
          });
        })
        .join('\n') +
      SITEMAP_SUFFIX;
  }

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': `max-age=${60 * 60 * 24}`,
    },
  });
}


### GetSiteMapOptions

### getChangeFreq

value: `(options: { type: string; handle: string; }) => string`

Optionally customize the changefreq property for each URL

### getLink

value: `(options: { type: string; baseUrl: string; handle?: string; locale?: string; }) => string`

A function that produces a canonical url for a resource. It is called multiple times for each locale supported by the app.

### locales

value: `string[]`

An array of locales to generate alternate tags

### noItemsFallback

value: `string`

If the sitemap has no links, fallback to rendering a link to the homepage. This prevents errors in Google's search console. Defaults to `/`.

### params

value: `Params<string>`

The params object from Remix

### request

value: `Request`

A Remix Request object

### storefront

value: `Storefront`

  - Storefront: {
  query: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
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
  >;
  mutate: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
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
  >;
  cache?: Cache;
  CacheNone: typeof CacheNone;
  CacheLong: typeof CacheLong;
  CacheShort: typeof CacheShort;
  CacheCustom: typeof CacheCustom;
  generateCacheControlHeader: typeof generateCacheControlHeader;
  getPublicTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPublicTokenHeaders'];
  getPrivateTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPrivateTokenHeaders'];
  getShopifyDomain: ReturnType<
    typeof createStorefrontUtilities
  >['getShopifyDomain'];
  getApiUrl: ReturnType<
    typeof createStorefrontUtilities
  >['getStorefrontApiUrl'];
  i18n: TI18n;
}
The Storefront API Client from Hydrogen

### Storefront

Interface to interact with the Storefront API.

### cache

value: `Cache`


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

### CacheNone

value: `() => NoStoreStrategy`

  - NoStoreStrategy: {
  mode: string;
}

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

### getApiUrl

value: `(props?: Partial<Pick<StorefrontClientProps, "storefrontApiVersion" | "storeDomain">>) => string`

  - Storefront: {
  query: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
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
  >;
  mutate: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
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
  >;
  cache?: Cache;
  CacheNone: typeof CacheNone;
  CacheLong: typeof CacheLong;
  CacheShort: typeof CacheShort;
  CacheCustom: typeof CacheCustom;
  generateCacheControlHeader: typeof generateCacheControlHeader;
  getPublicTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPublicTokenHeaders'];
  getPrivateTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPrivateTokenHeaders'];
  getShopifyDomain: ReturnType<
    typeof createStorefrontUtilities
  >['getShopifyDomain'];
  getApiUrl: ReturnType<
    typeof createStorefrontUtilities
  >['getStorefrontApiUrl'];
  i18n: TI18n;
}

### getPrivateTokenHeaders

value: `(props?: Partial<Pick<StorefrontClientProps, "contentType">> & Pick<StorefrontClientProps, "privateStorefrontToken"> & { buyerIp?: string; }) => Record<string, string>`

  - Storefront: {
  query: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
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
  >;
  mutate: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
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
  >;
  cache?: Cache;
  CacheNone: typeof CacheNone;
  CacheLong: typeof CacheLong;
  CacheShort: typeof CacheShort;
  CacheCustom: typeof CacheCustom;
  generateCacheControlHeader: typeof generateCacheControlHeader;
  getPublicTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPublicTokenHeaders'];
  getPrivateTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPrivateTokenHeaders'];
  getShopifyDomain: ReturnType<
    typeof createStorefrontUtilities
  >['getShopifyDomain'];
  getApiUrl: ReturnType<
    typeof createStorefrontUtilities
  >['getStorefrontApiUrl'];
  i18n: TI18n;
}

### getPublicTokenHeaders

value: `(props?: Partial<Pick<StorefrontClientProps, "contentType">> & Pick<StorefrontClientProps, "publicStorefrontToken">) => Record<string, string>`

  - Storefront: {
  query: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
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
  >;
  mutate: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
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
  >;
  cache?: Cache;
  CacheNone: typeof CacheNone;
  CacheLong: typeof CacheLong;
  CacheShort: typeof CacheShort;
  CacheCustom: typeof CacheCustom;
  generateCacheControlHeader: typeof generateCacheControlHeader;
  getPublicTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPublicTokenHeaders'];
  getPrivateTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPrivateTokenHeaders'];
  getShopifyDomain: ReturnType<
    typeof createStorefrontUtilities
  >['getShopifyDomain'];
  getApiUrl: ReturnType<
    typeof createStorefrontUtilities
  >['getStorefrontApiUrl'];
  i18n: TI18n;
}

### getShopifyDomain

value: `(props?: Partial<Pick<StorefrontClientProps, "storeDomain">>) => string`

  - Storefront: {
  query: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
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
  >;
  mutate: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
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
  >;
  cache?: Cache;
  CacheNone: typeof CacheNone;
  CacheLong: typeof CacheLong;
  CacheShort: typeof CacheShort;
  CacheCustom: typeof CacheCustom;
  generateCacheControlHeader: typeof generateCacheControlHeader;
  getPublicTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPublicTokenHeaders'];
  getPrivateTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPrivateTokenHeaders'];
  getShopifyDomain: ReturnType<
    typeof createStorefrontUtilities
  >['getShopifyDomain'];
  getApiUrl: ReturnType<
    typeof createStorefrontUtilities
  >['getStorefrontApiUrl'];
  i18n: TI18n;
}

### i18n

value: `TI18n`


### mutate

value: `<OverrideReturnType extends unknown = never, RawGqlString extends string = string>(mutation: RawGqlString, ...options: IsOptionalVariables<StorefrontMutations[RawGqlString]["variables"], AutoAddedVariableNames, Omit<StorefrontMutations[RawGqlString]["variables"], AutoAddedVariableNames>> extends true ? [(StorefrontCommonExtraParams & ClientVariables<StorefrontMutations, RawGqlString, AutoAddedVariableNames, "variables", RawGqlString extends never ? SetOptional<StorefrontMutations[RawGqlString]["variables"], Extract<keyof StorefrontMutations[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }, Record<"variables", RawGqlString extends never ? SetOptional<StorefrontMutations[RawGqlString]["variables"], Extract<keyof StorefrontMutations[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }>>)?] : [StorefrontCommonExtraParams & ClientVariables<StorefrontMutations, RawGqlString, AutoAddedVariableNames, "variables", RawGqlString extends never ? SetOptional<StorefrontMutations[RawGqlString]["variables"], Extract<keyof StorefrontMutations[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }, Record<"variables", RawGqlString extends never ? SetOptional<StorefrontMutations[RawGqlString]["variables"], Extract<keyof StorefrontMutations[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }>>]) => Promise<ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> & StorefrontError>`

  - Storefront: {
  query: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
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
  >;
  mutate: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
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
  >;
  cache?: Cache;
  CacheNone: typeof CacheNone;
  CacheLong: typeof CacheLong;
  CacheShort: typeof CacheShort;
  CacheCustom: typeof CacheCustom;
  generateCacheControlHeader: typeof generateCacheControlHeader;
  getPublicTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPublicTokenHeaders'];
  getPrivateTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPrivateTokenHeaders'];
  getShopifyDomain: ReturnType<
    typeof createStorefrontUtilities
  >['getShopifyDomain'];
  getApiUrl: ReturnType<
    typeof createStorefrontUtilities
  >['getStorefrontApiUrl'];
  i18n: TI18n;
}
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
  >(
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
  >;
  mutate: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
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
  >;
  cache?: Cache;
  CacheNone: typeof CacheNone;
  CacheLong: typeof CacheLong;
  CacheShort: typeof CacheShort;
  CacheCustom: typeof CacheCustom;
  generateCacheControlHeader: typeof generateCacheControlHeader;
  getPublicTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPublicTokenHeaders'];
  getPrivateTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPrivateTokenHeaders'];
  getShopifyDomain: ReturnType<
    typeof createStorefrontUtilities
  >['getShopifyDomain'];
  getApiUrl: ReturnType<
    typeof createStorefrontUtilities
  >['getStorefrontApiUrl'];
  i18n: TI18n;
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
  >(
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
  >;
  mutate: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
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
  >;
  cache?: Cache;
  CacheNone: typeof CacheNone;
  CacheLong: typeof CacheLong;
  CacheShort: typeof CacheShort;
  CacheCustom: typeof CacheCustom;
  generateCacheControlHeader: typeof generateCacheControlHeader;
  getPublicTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPublicTokenHeaders'];
  getPrivateTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPrivateTokenHeaders'];
  getShopifyDomain: ReturnType<
    typeof createStorefrontUtilities
  >['getShopifyDomain'];
  getApiUrl: ReturnType<
    typeof createStorefrontUtilities
  >['getStorefrontApiUrl'];
  i18n: TI18n;
}
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

## Related

- [getSitemapIndex](/api/hydrogen/utilities/getSitemapIndex)

