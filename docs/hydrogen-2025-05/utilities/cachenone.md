# CacheNone

The CacheNone() strategy instructs caches not to store any data. The function accepts no arguments.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

```js
import {CacheNone} from '@shopify/hydrogen';

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
      cache: CacheNone(),
    },
  );

  return data;
}
```

```ts
import {type LoaderFunctionArgs} from 'react-router';
import {CacheNone} from '@shopify/hydrogen';

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
      cache: CacheNone(),
    },
  );

  return data;
}
```

## Arguments

### CacheNoneGeneratedType

#### Returns: NoStoreStrategy

export function CacheNone(): NoStoreStrategy {
return {
mode: NO_STORE,
};
}

### NoStoreStrategy

### mode

value: `string`

## Related

- [createStorefrontClient](https://shopify.dev/docs/api/hydrogen/utilities/createstorefrontclient)
- [CacheShort](https://shopify.dev/docs/api/hydrogen/utilities/cacheshort)
- [CacheLong](https://shopify.dev/docs/api/hydrogen/utilities/cachelong)
- [CacheCustom](https://shopify.dev/docs/api/hydrogen/utilities/cachecustom)
