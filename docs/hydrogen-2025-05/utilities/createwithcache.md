# createWithCache

Creates utility functions to store data in cache with stale-while-revalidate support.

- Use `withCache.fetch` to simply fetch data from a third-party API.
  Fetches data from a URL and caches the result according to the strategy provided.
  When the response is not successful (e.g. status code >= 400), the caching is
  skipped automatically and the returned `data` is `null`.
  You can also prevent caching by using the `shouldCacheResponse` option and returning
  `false` from the function you pass in. For example, you might want to fetch data from a
  third-party GraphQL API but not cache the result if the GraphQL response body contains errors.
- Use the more advanced `withCache.run` to execute any asynchronous operation.
  Utility function that executes asynchronous operations and caches the
  result according to the strategy provided. Use this to do any type
  of asynchronous operation where `withCache.fetch` is insufficient.
  For example, when making multiple calls to a third-party API where the
  result of all of them needs to be cached under the same cache key.
  Whatever data is returned from the `fn` will be cached according
  to the strategy provided.
  > Note:
  > To prevent caching the result you must throw an error. Otherwise, the result will be cached.
  > For example, if you call `fetch` but the response is not successful (e.g. status code >= 400),
  > you should throw an error. Otherwise, the response will be cached.

```js
// In your app's `server.ts` file:
// @ts-expect-error
import * as reactRouterBuild from 'virtual:react-router/server-build';
import {createWithCache, CacheLong} from '@shopify/hydrogen';
// Use another `createRequestHandler` if deploying off oxygen
import {createRequestHandler} from 'react-router';

export default {
  async fetch(request, env, executionContext) {
    const cache = await caches.open('my-cms');
    const withCache = createWithCache({
      cache,
      waitUntil: executionContext.waitUntil.bind(executionContext),
      request,
    });

    // 1. Create a custom utility to query a third-party API:
    const fetchMyCMS = async (query) => {
      const {data, response} = await withCache.fetch(
        'https://my-cms.com/api',
        {
          method: 'POST',
          body: query,
          headers: {Authorization: 'Bearer 123'},
        },
        {
          // Optionally, specify a cache strategy.
          // Default is CacheShort().
          cacheStrategy: CacheLong(),
          // Cache if there are no data errors or a specific data that make this result not suited for caching
          shouldCacheResponse: (result) =>
            !(result?.errors || result?.isLoggedIn),
          // Optionally, add extra information to show
          // in the Subrequest Profiler utility.
          displayName: 'My CMS query',
        },
      );

      // Access the response properties:
      console.log(data, response.headers);

      return data;
    };

    // 2. Or Create a more advanced utility to query multiple APIs under the same cache key:
    const fetchMultipleCMS = (options) => {
      // Prefix the cache key and make it unique based on arguments.
      return withCache.run(
        {
          // Define a cache key that is unique to this query
          cacheKey: ['my-cms-composite', options.id, options.handle],
          // Optionally, specify a cache strategy.
          // Default is CacheShort().
          cacheStrategy: CacheLong(),
          // Cache if there are no data errors or a specific data that make this result not suited for caching
          shouldCacheResponse: (result) =>
            !(result?.errors || result?.isLoggedIn),
        },
        async (params) => {
          // Run multiple subrequests in parallel, or any other async operations.
          const [response1, response2] = await Promise.all([
            fetch('https://my-cms-1.com/api', {
              method: 'POST',
              body: JSON.stringify({id: options.id}),
            }),
            fetch('https://my-cms-2.com/api', {
              method: 'POST',
              body: JSON.stringify({handle: options.handle}),
            }),
          ]);

          // Throw if any response is unsuccessful.
          // This is important to prevent the results from being cached.
          if (!response1.ok || !response2.ok) {
            throw new Error('Failed to fetch data');
          }

          const [data1, data2] = await Promise.all([
            response1.json(),
            response2.json(),
          ]);

          // Validate data and throw to avoid caching errors.
          if (data1.errors || data2.errors) {
            throw new Error('API errors');
          }

          // Optionally, add extra information to show
          // in the Subrequest Profiler utility.
          params.addDebugData({displayName: 'My CMS query'});

          // Compose the result as needed.
          return {
            ...data1,
            ...data2,
            extra1: response1.headers.get('X-Extra'),
            extra2: response2.headers.get('X-Extra'),
          };
        },
      );
    };

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      getLoadContext: () => ({
        // Make sure to update env.d.ts to
        // include these properties in `AppLoadContext`.
        fetchMyCMS,
        fetchMultipleCMS,
      }),
    });

    return handleRequest(request);
  },
};
```

```ts
// In your app's `server.ts` file:
// @ts-ignore
import * as reactRouterBuild from 'virtual:react-router/server-build';
import {createWithCache, CacheLong} from '@shopify/hydrogen';
// Use another `createRequestHandler` if deploying off oxygen
import {createRequestHandler} from 'react-router';

export default {
  async fetch(
    request: Request,
    env: Record<string, string>,
    executionContext: ExecutionContext,
  ) {
    const cache = await caches.open('my-cms');
    const withCache = createWithCache({
      cache,
      waitUntil: executionContext.waitUntil.bind(executionContext),
      request,
    });

    type ExpectedResponse = {
      content: unknown;
      isLoggedIn: boolean;
      errors?: string;
    };

    type MergedResponse = {
      content: unknown;
      isLoggedIn: boolean;
      errors?: string;
      extra1: string | null;
      extra2: string | null;
    };

    // 1. Create a custom utility to query a third-party API:
    const fetchMyCMS = async (query: string) => {
      const {data, response} = await withCache.fetch<ExpectedResponse>(
        'https://my-cms.com/api',
        {
          method: 'POST',
          body: query,
          headers: {Authorization: 'Bearer 123'},
        },
        {
          // Optionally, specify a cache strategy.
          // Default is CacheShort().
          cacheStrategy: CacheLong(),
          // Cache if there are no data errors or a specific data that make this result not suited for caching
          shouldCacheResponse: (result) =>
            !(result?.errors || result?.isLoggedIn),
          // Optionally, add extra information to show
          // in the Subrequest Profiler utility.
          displayName: 'My CMS query',
        },
      );

      // Access the response properties:
      console.log(data, response.headers);

      return data;
    };

    // 2. Or Create a more advanced utility to query multiple APIs under the same cache key:
    const fetchMultipleCMS = (options: {id: string; handle: string}) => {
      // Prefix the cache key and make it unique based on arguments.
      return withCache.run(
        {
          // Define a cache key that is unique to this query
          cacheKey: ['my-cms-composite', options.id, options.handle],
          // Optionally, specify a cache strategy.
          // Default is CacheShort().
          cacheStrategy: CacheLong(),
          // Cache if there are no data errors or a specific data that make this result not suited for caching
          shouldCacheResult: (result: MergedResponse) =>
            !(result?.errors || result?.isLoggedIn),
        },
        async (params) => {
          // Run multiple subrequests in parallel, or any other async operations.
          const [response1, response2] = await Promise.all([
            fetch('https://my-cms-1.com/api', {
              method: 'POST',
              body: JSON.stringify({id: options.id}),
            }),
            fetch('https://my-cms-2.com/api', {
              method: 'POST',
              body: JSON.stringify({handle: options.handle}),
            }),
          ]);

          // Throw if any response is unsuccessful.
          // This is important to prevent the results from being cached.
          if (!response1.ok || !response2.ok) {
            throw new Error('Failed to fetch data');
          }

          const [data1, data2] = (await Promise.all([
            response1.json(),
            response2.json(),
          ])) as [ExpectedResponse, ExpectedResponse];

          // Validate data and throw to avoid caching errors.
          if (data1.errors || data2.errors) {
            throw new Error('API errors');
          }

          // Optionally, add extra information to show
          // in the Subrequest Profiler utility.
          params.addDebugData({displayName: 'My CMS query'});

          // Compose the result as needed.
          return {
            ...data1,
            ...data2,
            extra1: response1.headers.get('X-Extra'),
            extra2: response2.headers.get('X-Extra'),
          } as MergedResponse;
        },
      );
    };

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      getLoadContext: () => ({
        // Make sure to update env.d.ts to
        // include these properties in `AppLoadContext`.
        fetchMyCMS,
        fetchMultipleCMS,
      }),
    });

    return handleRequest(request);
  },
};
```

## Arguments

### CreateWithCacheGeneratedType

#### Returns: WithCache

#### Params:

- cacheOptions: CreateWithCacheOptions
  export function createWithCache(
  cacheOptions: CreateWithCacheOptions,
  ): WithCache {
  const {cache, waitUntil, request} = cacheOptions;

  return {
  run: <T>(
  {cacheKey, cacheStrategy, shouldCacheResult}: WithCacheRunOptions<T>,
  fn: ({addDebugData}: CacheActionFunctionParam) => T | Promise<T>,
  ): Promise<T> => {
  return runWithCache(cacheKey, fn, {
  shouldCacheResult,
  strategy: cacheStrategy,
  cacheInstance: cache,
  waitUntil,
  debugInfo: {
  ...getDebugHeaders(request),
  stackInfo: getCallerStackLine?.(),
  },
  });
  },

      fetch: <T>(
        url: string,
        requestInit: RequestInit,
        options: WithCacheFetchOptions<T>,
      ): Promise<{data: T | null; response: Response}> => {
        return fetchWithServerCache<T | null>(url, requestInit ?? {}, {
          waitUntil,
          cacheKey: [url, requestInit],
          cacheInstance: cache,
          debugInfo: {
            url,
            ...getDebugHeaders(request),
            stackInfo: getCallerStackLine?.(),
            displayName: options?.displayName,
          },
          cache: options.cacheStrategy,
          ...options,
        }).then(([data, response]) => ({data, response}));
      },

  };
  }

### CreateWithCacheOptions

### cache

value: `Cache`

An instance that implements the [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache)

### request

value: `CrossRuntimeRequest`

- CrossRuntimeRequest: {
  url?: string;
  method?: string;
  headers: {
  get?: (key: string) => string | null | undefined;
  [key: string]: any;
  };
  }
  The `request` object is used by the Subrequest profiler, and to access certain headers for debugging

### waitUntil

value: `WaitUntil`

The `waitUntil` function is used to keep the current request/response lifecycle alive even after a response has been sent. It should be provided by your platform.

### CrossRuntimeRequest

### headers

value: `{ [key: string]: any; get?: (key: string) => string; }`

### method

value: `string`

### url

value: `string`

### WithCache

### fetch

value: `<T>(url: string, requestInit: RequestInit, options: WithCacheFetchOptions<T>) => Promise<{ data: T; response: Response; }>`

- WithCache: {
  run: <T>(
  options: WithCacheRunOptions<T>,
  fn: ({addDebugData}: CacheActionFunctionParam) => T | Promise<T>,
  ) => Promise<T>;
  fetch: <T>(
  url: string,
  requestInit: RequestInit,
  options: WithCacheFetchOptions<T>,
  ) => Promise<{data: T | null; response: Response}>;
  }
- WithCacheFetchOptions: {
  displayName?: string;
  /\*\*

* Use the `CachingStrategy` to define a custom caching mechanism for your data.
* Or use one of the pre-defined caching strategies: [`CacheNone`](https://shopify.dev/docs/api/hydrogen/utilities/cachenone), [`CacheShort`](https://shopify.dev/docs/api/hydrogen/utilities/cacheshort), [`CacheLong`](https://shopify.dev/docs/api/hydrogen/utilities/cachelong).
  _/
  cacheStrategy?: CachingStrategy;
  /\*\* The cache key for this fetch _/
  cacheKey?: CacheKey;
  /\*_ Useful to avoid e.g. caching a successful response that contains an error in the body _/
  shouldCacheResponse: (body: T, response: Response) => boolean;
  }

### run

value: `<T>(options: WithCacheRunOptions<T>, fn: ({ addDebugData }: CacheActionFunctionParam) => T | Promise<T>) => Promise<T>`

- WithCache: {
  run: <T>(
  options: WithCacheRunOptions<T>,
  fn: ({addDebugData}: CacheActionFunctionParam) => T | Promise<T>,
  ) => Promise<T>;
  fetch: <T>(
  url: string,
  requestInit: RequestInit,
  options: WithCacheFetchOptions<T>,
  ) => Promise<{data: T | null; response: Response}>;
  }
- WithCacheRunOptions: {
  /** The cache key for this run \*/
  cacheKey: CacheKey;
  /**

* Use the `CachingStrategy` to define a custom caching mechanism for your data.
* Or use one of the pre-defined caching strategies: [`CacheNone`](https://shopify.dev/docs/api/hydrogen/utilities/cachenone), [`CacheShort`](https://shopify.dev/docs/api/hydrogen/utilities/cacheshort), [`CacheLong`](https://shopify.dev/docs/api/hydrogen/utilities/cachelong).
  _/
  cacheStrategy: CachingStrategy;
  /\*\* Useful to avoid accidentally caching bad results _/
  shouldCacheResult: (value: T) => boolean;
  }

- CacheActionFunctionParam: {
  addDebugData: (info: AddDebugDataParam) => void;
  }

### WithCacheFetchOptions

### cacheKey

value: `CacheKey`

- CacheKey: string | readonly unknown[]
  The cache key for this fetch

### cacheStrategy

value: `CachingStrategy`

- CachingStrategy: AllCacheOptions
  Use the `CachingStrategy` to define a custom caching mechanism for your data. Or use one of the pre-defined caching strategies: [`CacheNone`](https://shopify.dev/docs/api/hydrogen/utilities/cachenone), [`CacheShort`](https://shopify.dev/docs/api/hydrogen/utilities/cacheshort), [`CacheLong`](https://shopify.dev/docs/api/hydrogen/utilities/cachelong).

### displayName

value: `string`

### shouldCacheResponse

value: `(body: T, response: Response) => boolean`

Useful to avoid e.g. caching a successful response that contains an error in the body

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

### WithCacheRunOptions

### cacheKey

value: `CacheKey`

- CacheKey: string | readonly unknown[]
  The cache key for this run

### cacheStrategy

value: `CachingStrategy`

- CachingStrategy: AllCacheOptions
  Use the `CachingStrategy` to define a custom caching mechanism for your data. Or use one of the pre-defined caching strategies: [`CacheNone`](https://shopify.dev/docs/api/hydrogen/utilities/cachenone), [`CacheShort`](https://shopify.dev/docs/api/hydrogen/utilities/cacheshort), [`CacheLong`](https://shopify.dev/docs/api/hydrogen/utilities/cachelong).

### shouldCacheResult

value: `(value: T) => boolean`

Useful to avoid accidentally caching bad results

### CacheActionFunctionParam

### addDebugData

value: `(info: AddDebugDataParam) => void`

- AddDebugDataParam: {
  displayName?: string;
  response?: Pick<Response, 'url' | 'status' | 'statusText' | 'headers'>;
  }

### AddDebugDataParam

### displayName

value: `string`

### response

value: `Pick<Response, 'url' | 'status' | 'statusText' | 'headers'>`
