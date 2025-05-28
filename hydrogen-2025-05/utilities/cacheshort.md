# CacheShort

The `CacheShort` strategy instructs caches to store data for 1 second, and `staleWhileRevalidate` data for an additional 9 seconds. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

```js
import {CacheShort} from '@shopify/hydrogen';

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
      cache: CacheShort(),
    },
  );

  return data;
}

```

```ts
import {type LoaderFunctionArgs} from 'react-router';
import {CacheShort} from '@shopify/hydrogen';

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
      cache: CacheShort(),
    },
  );

  return data;
}

```

## Arguments

### CacheShortGeneratedType

#### Returns: AllCacheOptions

#### Params:

- overrideOptions: AllCacheOptions
export function CacheShort(overrideOptions?: CachingStrategy): AllCacheOptions {
  guardExpirableModeType(overrideOptions);
  return {
    mode: PUBLIC,
    maxAge: 1,
    staleWhileRevalidate: 9,
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
- [CacheLong](https://shopify.dev/docs/api/hydrogen/utilities/cachelong)
- [CacheCustom](https://shopify.dev/docs/api/hydrogen/utilities/cachecustom)

