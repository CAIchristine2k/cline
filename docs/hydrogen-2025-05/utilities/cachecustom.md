# CacheCustom

This allows you to create your own caching strategy, using any of the options available in a `CachingStrategy` object.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

```js
import {CacheCustom} from '@shopify/hydrogen';

export async function loader({context}) {
  const data = await context.storefront.query(
    `#grahpql
      {
        shop {
          name
          description
        }
      }
    `,
    {
      cache: CacheCustom({
        maxAge: 1000 * 60 * 60 * 24 * 365,
        staleWhileRevalidate: 1000 * 60 * 60 * 24 * 7,
      }),
    },
  );

  return data;
}
```

```ts
import {type LoaderFunctionArgs} from 'react-router';
import {CacheCustom} from '@shopify/hydrogen';

export async function loader({context}: LoaderFunctionArgs) {
  const data = await context.storefront.query(
    `#grahpql
      {
        shop {
          name
          description
        }
      }
    `,
    {
      cache: CacheCustom({
        maxAge: 1000 * 60 * 60 * 24 * 365,
        staleWhileRevalidate: 1000 * 60 * 60 * 24 * 7,
      }),
    },
  );

  return data;
}
```

## Arguments

### CacheCustomGeneratedType

#### Returns: AllCacheOptions

#### Params:

- overrideOptions: AllCacheOptions
  export function CacheCustom(overrideOptions: CachingStrategy): AllCacheOptions {
  return overrideOptions as AllCacheOptions;
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

## Related

- [createStorefrontClient](https://shopify.dev/docs/api/hydrogen/utilities/createstorefrontclient)
- [CacheNone](https://shopify.dev/docs/api/hydrogen/utilities/cachenone)
- [CacheShort](https://shopify.dev/docs/api/hydrogen/utilities/cacheshort)
- [CacheLong](https://shopify.dev/docs/api/hydrogen/utilities/cachelong)
