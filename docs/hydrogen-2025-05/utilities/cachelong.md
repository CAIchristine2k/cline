# CacheLong

The `CacheLong` strategy instructs caches to store data for 1 hour, and `staleWhileRevalidate` data for an additional 23 hours. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

```js
import {CacheLong} from '@shopify/hydrogen';

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
      cache: CacheLong(),
    },
  );

  return data;
}
```

```ts
import {type LoaderFunctionArgs} from 'react-router';
import {CacheLong} from '@shopify/hydrogen';

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
      cache: CacheLong(),
    },
  );

  return data;
}
```

## Arguments

### CacheLongGeneratedType

#### Returns: AllCacheOptions

#### Params:

- overrideOptions: AllCacheOptions
  export function CacheLong(overrideOptions?: CachingStrategy): AllCacheOptions {
  guardExpirableModeType(overrideOptions);
  return {
  mode: PUBLIC,
  maxAge: 3600, // 1 hour
  staleWhileRevalidate: 82800, // 23 Hours
  ...overrideOptions,
  };
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
- [CacheCustom](https://shopify.dev/docs/api/hydrogen/utilities/cachecustom)
