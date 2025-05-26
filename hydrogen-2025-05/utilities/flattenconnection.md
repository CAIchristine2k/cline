# flattenConnection


    The `flattenConnection` utility transforms a connection object from the Storefront API (for example, [Product-related connections](https://shopify.dev/api/storefront/reference/products/product)) into a flat array of nodes. The utility works with either `nodes` or `edges.node`.

If `connection` is null or undefined, will return an empty array instead in production. In development, an error will be thrown.
  

```jsx
import {flattenConnection} from '@shopify/hydrogen';

export function ProductList({productConnection}) {
  const products = flattenConnection(productConnection);
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

```

```tsx
import {flattenConnection} from '@shopify/hydrogen';
import type {ProductConnection} from '@shopify/hydrogen/storefront-api-types';

export function ProductList({
  productConnection,
}: {
  productConnection: ProductConnection;
}) {
  const products = flattenConnection(productConnection);
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

```

## Parameters

### ConnectionGenericForDoc

### connection

value: `ConnectionEdges | ConnectionNodes`

  - ConnectionEdges: {
  edges: Array<{node: unknown}>;
}
  - ConnectionNodes: {
  nodes: Array<unknown>;
}

### ConnectionEdges

### edges

value: `Array<{node: unknown}>`


### ConnectionNodes

### nodes

value: `Array<unknown>`


## Returns

