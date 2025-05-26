# generateCacheControlHeader

This utility function accepts a `CachingStrategy` object and returns a string with the corresponding `cache-control` header.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

```js
import {data} from '@shopify/remix-oxygen';
import {generateCacheControlHeader, CacheShort} from '@shopify/hydrogen';

export async function loader() {
  return data(
    {some: 'data'},
    {
      headers: {
        'cache-control': generateCacheControlHeader(CacheShort()),
      },
    },
  );
}

```

```ts
import {data} from '@shopify/remix-oxygen';
import {generateCacheControlHeader, CacheShort} from '@shopify/hydrogen';

export async function loader() {
  return data(
    {some: 'data'},
    {
      headers: {
        'cache-control': generateCacheControlHeader(CacheShort()),
      },
    },
  );
}

```

## Arguments

### GenerateCacheControlHeaderGeneratedType

#### Returns: string

#### Params:

- cacheOptions: AllCacheOptions
export function generateCacheControlHeader(
  cacheOptions: CachingStrategy,
): string {
  const cacheControl: string[] = [];
  Object.keys(cacheOptions).forEach((key: string) => {
    if (key === 'mode') {
      cacheControl.push(cacheOptions[key] as string);
    } else if (optionMapping[key]) {
      cacheControl.push(
        `${optionMapping[key]}=${cacheOptions[key as keyof CachingStrategy]}`,
      );
    }
  });
  return cacheControl.join(', ');
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

