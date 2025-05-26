# cartSetIdDefault

Creates a function that returns a header with a Set-Cookie on the cart ID.

```js
import {data} from 'react-router';
import {cartGetIdDefault, cartSetIdDefault} from '@shopify/hydrogen';

// server.js
export default {
  async fetch(request) {
    const cart = createCartHandler({
      storefront,
      getCartId: cartGetIdDefault(request.headers),
      setCartId: cartSetIdDefault(), // defaults to session cookie
      // setCartId: cartSetIdDefault({maxage: 60 * 60 * 24 * 365}), // 1 year expiry
    });
  },
};

// Some route
export async function action({context}) {
  const {cart} = context;

  // Usage
  const result = await cart.updateNote('Some note');

  const headers = cart.setCartId(result.cart.id);

  return data(result, {headers});
}

```

## cartSetIdDefault

### CartSetIdDefaultGeneratedType

#### Returns: 

#### Params:

- cookieOptions: CookieOptions
cartSetIdDefault = (cookieOptions?: CookieOptions) => {
  return (cartId: string) => {
    const headers = new Headers();
    headers.append(
      'Set-Cookie',
      stringify('cart', cartId.split('/').pop() || '', {
        path: '/',
        ...cookieOptions,
      }),
    );
    return headers;
  };
}


### CookieOptions

### domain

value: `string`


### expires

value: `Date | number | string`


### httponly

value: `boolean`


### maxage

value: `number`


### path

value: `string`


### samesite

value: `'Lax' | 'Strict' | 'None'`


### secure

value: `boolean`


