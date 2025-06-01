# Analytics.CartView

Publishes a `cart_viewed` event to the `Analytics.Provider` component.

```js
import {Analytics} from '@shopify/hydrogen';

export default function CartView() {
  return (
    <div className="cart">
      <h1>Cart</h1>
      <Analytics.CartView />
    </div>
  );
}
```

```ts
import {Analytics} from '@shopify/hydrogen';

export default function CartView() {
  return (
    <div className="cart">
      <h1>Cart</h1>
      <Analytics.CartView />
    </div>
  );
}

```

## Props

### AnalyticsCartViewGeneratedType

#### Returns:

#### Params:

- props: BasicViewProps
  export function AnalyticsCartView(props: BasicViewProps) {
  return <AnalyticsView {...props} type="cart_viewed" />;
  }

### BasicViewProps

### customData

value: `OtherData`

- OtherData: OtherData

### data

value: `OtherData`

- OtherData: OtherData
