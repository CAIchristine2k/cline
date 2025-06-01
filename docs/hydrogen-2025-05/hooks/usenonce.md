# useNonce

The `useNonce` hook returns the [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) nonce. Use the hook to manually add a nonce to third party scripts. The `Script` component automatically does this for you. Note, the nonce should never be available in the client, and should always return undefined in the browser.

```jsx
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import {useNonce} from '@shopify/hydrogen';

export default function App() {
  const nonce = useNonce();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  );
}
```

```tsx
import {Links, Meta, Outlet, Scripts, ScrollRestoration} from 'react-router';
import {useNonce} from '@shopify/hydrogen';

export default function App() {
  const nonce = useNonce();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}
```

## Props

### UseNonceGeneratedType

#### Returns:

useNonce = () => useContext(NonceContext)

## Related

- [createContentSecurityPolicy](https://shopify.dev/docs/api/hydrogen/utilities/createcontentsecuritypolicy)
- [Script](https://shopify.dev/docs/api/hydrogen/components/script)
