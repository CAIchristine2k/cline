# parseGid

    Parses [Shopify Global ID (GID)](https://shopify.dev/api/usage/gids) and returns the resource type and ID.

```js
import {parseGid} from '@shopify/hydrogen';

const {id, resource} = parseGid('gid://shopify/Order/123');

console.log(id); // 123
console.log(resource); // Order
```

## Props

### ParseGidGeneratedType

Parses global id (gid) and returns the resource type and id.

#### Returns: ShopifyGid

#### Params:

- gid: string
  export function parseGid(gid: string | undefined): ShopifyGid {
  const defaultReturn: ShopifyGid = {
  id: '',
  resource: null,
  resourceId: null,
  search: '',
  searchParams: new URLSearchParams(),
  hash: '',
  };

  if (typeof gid !== 'string') {
  return defaultReturn;
  }

  try {
  const {search, searchParams, pathname, hash} = new URL(gid);
  const pathnameParts = pathname.split('/');
  const lastPathnamePart = pathnameParts[pathnameParts.length - 1];
  const resourcePart = pathnameParts[pathnameParts.length - 2];

      if (!lastPathnamePart || !resourcePart) {
        return defaultReturn;
      }

      const id = `${lastPathnamePart}${search}${hash}` || '';
      const resourceId = lastPathnamePart || null;
      const resource = resourcePart ?? null;

      return {id, resource, resourceId, search, searchParams, hash};

  } catch {
  return defaultReturn;
  }
  }
