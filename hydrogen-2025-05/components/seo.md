# Seo

The `<Seo />` component renders SEO meta tags in the document `head`. Add the `<Seo />` to your `root.jsx` before the `<Meta />` and `<Link />` components. SEO metadata is set on a per-route basis using Remix [loader functions](https://remix.run/docs/en/v1/guides/data-loading). Learn more about [how SEO works in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/seo).
  
  **Note: the Seo component is deprecated** - Use [getSeoMeta](https://shopify.dev/docs/api/hydrogen/utilities/getseometa) to migrate.

```js
import {Seo} from '@shopify/hydrogen';
import {Links, Meta, Outlet, Scripts, ScrollRestoration} from 'react-router';

export default function App() {
  /** ... */
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {/* Add <Seo /> before <Meta /> and <Link /> */}
        <Seo />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

```

```ts
import {Seo} from '@shopify/hydrogen';
import {Links, Meta, Outlet, Scripts, ScrollRestoration} from 'react-router';

export default function App() {
  /** ... */
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {/* Add <Seo /> before <Meta /> and <Link /> */}
        <Seo />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

```

## Props

### SeoProps

### debug

value: `boolean`

Enable debug mode that prints SEO properties for route in the console

