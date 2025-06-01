# cartGetIdDefault

Creates a function that returns the cart id from request header cookie.

```js
import {cartGetIdDefault, cartSetIdDefault} from '@shopify/hydrogen';

// server.js
export default {
  async fetch(request) {
    const cart = createCartHandler({
      storefront,
      getCartId: cartGetIdDefault(request.headers),
      setCartId: cartSetIdDefault(),
    });
  },
};

// Some route
export async function loader({context}) {
  const {cart} = context;

  cart.getCartId(); // gid://shopify/Cart/1234567890
}
```

## cartGetIdDefault

### CartGetIdDefaultGeneratedType

#### Returns:

#### Params:

- requestHeaders: { [key: string]: any; get?: (key: string) => string; }
  cartGetIdDefault = (
  requestHeaders: CrossRuntimeRequest['headers'],
  ) => {
  const cookies = parse(getHeaderValue(requestHeaders, 'Cookie') || '');
  return () => {
  return cookies.cart ? `gid://shopify/Cart/${cookies.cart}` : undefined;
  };
  }
