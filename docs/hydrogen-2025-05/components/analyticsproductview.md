# Analytics.ProductView

Publishes a `product_viewed` event to the `Analytics.Provider` component.

```js
import {useLoaderData} from 'react-router';
import {Analytics} from '@shopify/hydrogen';

export async function loader() {
  return {
    product: {
      id: '123',
      title: 'ABC',
      vendor: 'abc',
      selectedVariant: {
        id: '456',
        title: 'DEF',
        price: {
          amount: '100',
        },
      },
    },
  };
}

export default function Product() {
  const {product} = useLoaderData();
  const {selectedVariant} = product;

  return (
    <div className="product">
      <h1>{product.title}</h1>
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}
```

```ts
import {useLoaderData} from 'react-router';
import {Analytics} from '@shopify/hydrogen';

export async function loader() {
  return {
    product: {
      id: '123',
      title: 'ABC',
      vendor: 'abc',
      selectedVariant: {
        id: '456',
        title: 'DEF',
        price: {
          amount: '100',
        },
      },
    },
  };
}

export default function Product() {
  const {product} = useLoaderData<typeof loader>();
  const {selectedVariant} = product;

  return (
    <div className="product">
      <h1>{product.title}</h1>
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}

```

## Props

### AnalyticsProductViewGeneratedType

#### Returns:

#### Params:

- props: ProductViewProps
  export function AnalyticsProductView(props: ProductViewProps) {
  return <AnalyticsView {...props} type="product_viewed" />;
  }

### ProductViewProps

### customData

value: `OtherData`

- OtherData: OtherData

### data

value: `ProductsPayload`

- ProductsPayload: {
  /\*_ The products associated with this event. _/
  products: Array<ProductPayload & OtherData>;
  }

### ProductsPayload

### products

value: `Array<ProductPayload & OtherData>`

- OtherData: OtherData
- ProductPayload: {
  /** The product id. \*/
  id: Product['id'];
  /** The product title. _/
  title: Product['title'];
  /\*\* The displaying variant price. _/
  price: ProductVariant['price']['amount'];
  /** The product vendor. \*/
  vendor: Product['vendor'];
  /** The displaying variant id. _/
  variantId: ProductVariant['id'];
  /\*\* The displaying variant title. _/
  variantTitle: ProductVariant['title'];
  /** The quantity of product. \*/
  quantity: number;
  /** The product sku. _/
  sku?: ProductVariant['sku'];
  /\*\* The product type. _/
  productType?: Product['productType'];
  }
  The products associated with this event.

### ProductPayload

### id

value: `string`

The product id.

### price

value: `string`

The displaying variant price.

### productType

value: `string`

The product type.

### quantity

value: `number`

The quantity of product.

### sku

value: `string`

The product sku.

### title

value: `string`

The product title.

### variantId

value: `string`

The displaying variant id.

### variantTitle

value: `string`

The displaying variant title.

### vendor

value: `string`

The product vendor.
