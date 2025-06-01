# Hydrogen

Hydrogen is Shopify’s opinionated stack for headless commerce, built on [React Router](https://reactrouter.com/home). It provides a set of tools, utilities, and best-in-class examples for building dynamic and performant commerce applications.

## Setup

1. Create a new Hydrogen project with your preferred package manager.
1. Import components, hooks, or utilities that you want to use in your app. For more, see the [getting started guide](https://shopify.dev/docs/custom-storefronts/hydrogen/getting-started).

```
npm create @shopify/hydrogen@latest

```

```
yarn create @shopify/hydrogen

```

- [Tutorial](https://shopify.dev/docs/custom-storefronts/hydrogen/getting-started): Getting started with Hydrogen and Oxygen

## Authentication

To make full use of Hydrogen, you need to authenticate with and make requests to the [Storefront API](https://shopify.dev/docs/api/storefront) and the [Customer Account API](https://shopify.dev/docs/api/customer). Hydrogen includes full-featured API clients to securely handle API queries and mutations.

You can create access tokens for your own Shopify store by [installing the Hydrogen sales channel](https://apps.shopify.com/hydrogen), which includes built-in support for Oxygen, Shopify’s global edge hosting platform. Or install the [Headless sales channel](https://apps.shopify.com/headless) to host your Hydrogen app anywhere.

Both the Storefront API and Customer Account API offer public credentials for client-side applications.

```javascript
/**
 * server.js
 * ---------
 * Create a storefront client.
 * Check the server.js file in the root of your new Hydrogen project to see
 * an example implementation of this function. If you start from an official
 * Hydrogen template (Hello World or Demo Store), then the client is already
 * set up for you. Update the Shopify store domain and API token to start
 * querying your own store inventory.
 */
const {storefront} = createStorefrontClient({
  cache,
  waitUntil,
  i18n: {language: 'EN', country: 'US'},
  // `env` provides access to runtime data, including environment variables
  publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
  privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
  storeDomain: env.PUBLIC_STORE_DOMAIN,
  storefrontId: env.PUBLIC_STOREFRONT_ID,
  storefrontHeaders: getStorefrontHeaders(request),
});
```

```
# These API credentials fetch example inventory from the Hydrogen Demo Store
# https://hydrogen.shop
#
# Replace with your own store domain and Storefront API token

SESSION_SECRET="foobar"
PUBLIC_STOREFRONT_API_TOKEN="3b580e70970c4528da70c98e097c2fa0"
PUBLIC_STORE_DOMAIN="hydrogen-preview.myshopify.com"

```

- [Install](https://apps.shopify.com/hydrogen): Hydrogen sales channel
- [Install](https://apps.shopify.com/headless): Headless sales channel

## Versioning

Hydrogen is tied to specific versions of the [Storefront API](/api/storefront), which is versioned quarterly. For example, if you're using Storefront API version `2023-10`, then Hydrogen versions `2023.10.x` are fully compatible.

> Caution:
> If a Storefront API version includes breaking changes, then the corresponding Hydrogen version will include the same breaking changes.

- [Learn more](https://shopify.dev/docs/api/usage/versioning): Shopify API versioning
- [Learn more](https://shopify.dev/docs/api/release-notes): API release notes

## How Hydrogen works with Hydrogen React

Hydrogen is [built on React Router](https://shopify.dev/docs/custom-storefronts/hydrogen/project-structure). But many of the components, hooks and utilities built into Hydrogen come from [Hydrogen React](https://shopify.dev/docs/api/hydrogen-react), an underlying package that’s framework-agnostic. For convenience, the Hydrogen package re-exports those resources. This means that if you’re building a Hydrogen app, then you should import modules from the `@shopify/hydrogen` package.

```jsx
import {ShopPayButton} from '@shopify/hydrogen';

export function renderShopPayButton({variantId, storeDomain}) {
  return <ShopPayButton variantIds={[variantId]} storeDomain={storeDomain} />;
}
```

## References

- [CacheCustom](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/cachecustom): This allows you to create your own caching strategy, using any of the options available in a `CachingStrategy` object.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheLong](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/cachelong): The `CacheLong` strategy instructs caches to store data for 1 hour, and `staleWhileRevalidate` data for an additional 23 hours. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheNone](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/cachenone): The CacheNone() strategy instructs caches not to store any data. The function accepts no arguments.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheShort](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/cacheshort): The `CacheShort` strategy instructs caches to store data for 1 second, and `staleWhileRevalidate` data for an additional 9 seconds. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [InMemoryCache](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/inmemorycache): > Caution:
  > This utility should only be used when deploying Hydrogen to a Node.js environment. It should _not_ be used when deploying Hydrogen to Oxygen.

If you are deploying Hydrogen to a Node.js environment, you can use this limited implementation of an in-memory cache. It only supports the `cache-control` header. It does NOT support `age` or `expires` headers.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [generateCacheControlHeader](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/generatecachecontrolheader): This utility function accepts a `CachingStrategy` object and returns a string with the corresponding `cache-control` header.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [createStorefrontClient](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/createstorefrontclient): This function extends `createStorefrontClient` from [Hydrogen React](https://shopify.dev/docs/api/hydrogen-react/2023-04/utilities/createstorefrontclient). The additional arguments enable internationalization (i18n), caching, and other features particular to Remix and Oxygen.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [Pagination](https://shopify.dev/docs/api/hydrogen/2023-04/components/pagination): > Caution:
  > This component is in an unstable pre-release state and may have breaking changes in a future release.

The [Storefront API uses cursors](https://shopify.dev/docs/api/usage/pagination-graphql) to paginate through lists of data and the `<Pagination />` component makes it easy to paginate data from the Storefront API. It is important for pagination state to be maintained in the URL, so that the user can navigate to a product and return back to the same scrolled position in a list. It is also important that the list state is shareable via URL. The `<Pagination>` component provides a render prop with properties to load more elements into your list.

- [getPaginationVariables](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/getpaginationvariables): > Caution:
  > This component is in an unstable pre-release state and may have breaking changes in a future release.

The `getPaginationVariables` function is used with the [`<Pagination>`](https://shopify.dev/docs/api/hydrogen/components/pagnination) component to generate the variables needed to fetch paginated data from the Storefront API. The returned variables should be used within your storefront GraphQL query.

- [graphiqlLoader](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/graphiqlloader): This function creates an instance of [GraphiQL](https://graphql.org/swapi-graphql) in your Hydrogen app when running on a development server. This enables you to explore, write, and test GraphQL queries using your store's live data from the Storefront API. You can visit the GraphiQL app at your storefront route /graphiql. Learn more about [using GraphiQL in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/graphiql).
- [storefrontRedirect](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/storefrontredirect): Queries the Storefront API to see if there is any redirect [created for the current route](https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect) and performs it. Otherwise, it returns the response passed in the parameters. Useful for conditionally redirecting after a 404 response.
- [Seo](https://shopify.dev/docs/api/hydrogen/2023-04/components/seo): The `<Seo />` component renders SEO meta tags in the document `head`. Add the `<Seo />` to your `root.jsx` before the `<Meta />` and `<Link />` components. SEO metadata is set on a per-route basis using Remix [loader functions](https://remix.run/docs/en/v1/guides/data-loading). Learn more about [how SEO works in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/seo).
- [createWithCache](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/createwithcache): Creates a utility function that executes an asynchronous operation
  like `fetch` and caches the result according to the strategy provided.
  Use this to call any third-party APIs from loaders or actions.
  By default, it uses the `CacheShort` strategy.
- [Image](https://shopify.dev/docs/api/hydrogen/2023-04/components/image): The `Image` component renders an image for the Storefront API's
  [Image object](https://shopify.dev/api/storefront/reference/common-objects/image) by using the `data` prop. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.

Images default to being responsive automativally (`width: 100%, height: auto`), and expect an `aspectRatio` prop, which ensures your image doesn't create any layout shift. For fixed-size images, you can set `width` to an exact value, and a `srcSet` with 1x, 2x, and 3x DPI variants will automatically be generated for you.

- [ExternalVideo](https://shopify.dev/docs/api/hydrogen/2023-04/components/externalvideo): The `ExternalVideo` component renders an embedded video for the Storefront API's [ExternalVideo object](https://shopify.dev/api/storefront/reference/products/externalvideo).
- [MediaFile](https://shopify.dev/docs/api/hydrogen/2023-04/components/mediafile): The `MediaFile` component renders the media for the Storefront API's
  [Media object](https://shopify.dev/api/storefront/reference/products/media). It renders an `Image`, `Video`, an `ExternalVideo`, or a `ModelViewer` depending on the `__typename` of the `data` prop.
- [Money](https://shopify.dev/docs/api/hydrogen/2023-04/components/money): The `Money` component renders a string of the Storefront API's[MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) according to the `locale` in the [`ShopifyProvider` component](/api/hydrogen/components/global/shopifyprovider).
  The component outputs a `<div>`. You can [customize this component](https://api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
- [ModelViewer](https://shopify.dev/docs/api/hydrogen/2023-04/components/modelviewer): The `ModelViewer` component renders a 3D model (with the `model-viewer` custom element) for the Storefront API's [Model3d object](https://shopify.dev/api/storefront/reference/products/model3d). The `model-viewer` custom element is lazily downloaded through a dynamically-injected `<script type='module'>` tag when the `<ModelViewer />` component is rendered. ModelViewer is using version `1.21.1` of the `@google/model-viewer` library.
- [ShopPayButton](https://shopify.dev/docs/api/hydrogen/2023-04/components/shoppaybutton): The `ShopPayButton` component renders a button that redirects to the Shop Pay checkout. It renders a [`<shop-pay-button>`](https://shopify.dev/custom-storefronts/tools/web-components) custom element, for which it will lazy-load the source code automatically.
- [Video](https://shopify.dev/docs/api/hydrogen/2023-04/components/video): The `Video` component renders a video for the Storefront API's [Video object](https://shopify.dev/api/storefront/reference/products/video).
  The component outputs a `video` element. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
- [useMoney](https://shopify.dev/docs/api/hydrogen/2023-04/hooks/usemoney): The `useMoney` hook takes a [MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) and returns a
  default-formatted string of the amount with the correct currency indicator, along with some of the parts provided by
  [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
- [useShopifyCookies](https://shopify.dev/docs/api/hydrogen/2023-04/hooks/useshopifycookies): Sets Shopify user and session cookies and refreshes the expiry time.
- [flattenConnection](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/flattenconnection): The `flattenConnection` utility transforms a connection object from the Storefront API (for example, [Product-related connections](https://shopify.dev/api/storefront/reference/products/product)) into a flat array of nodes. The utility works with either `nodes` or `edges.node`.

If `connection` is null or undefined, will return an empty array instead in production. In development, an error will be thrown.

- [getClientBrowserParameters](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/getclientbrowserparameters): Gathers client browser values commonly used for analytics
- [getShopifyCookies](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/getshopifycookies): Parses cookie string and returns Shopify cookies.
- [parseMetafield](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/parsemetafield): A function that uses `metafield.type` to parse the Metafield's `value` or `reference` or `references` (depending on the `metafield.type`) and places the result in `metafield.parsedValue`.
- [sendShopifyAnalytics](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/sendshopifyanalytics): Sends analytics to Shopify.
- [storefrontApiCustomScalars](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/storefrontapicustomscalars): Meant to be used with GraphQL CodeGen to type the Storefront API's custom scalars correctly when using TypeScript.By default, GraphQL CodeGen uses `any` for custom scalars; by using these definitions, GraphQL Codegen will generate the correct types for the Storefront API's custom scalars.

See more about [GraphQL CodeGen](https://graphql-code-generator.com/) and [custom scalars for TypeScript](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript#scalars).

Note that `@shopify/hydrogen-react` has already generated types for the Storefront API, so you may not need to setup GraphQL Codegen on your own.

- [parseGid](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/parsegid): Parses [Shopify Global ID (GID)](https://shopify.dev/api/usage/gids) and returns the resource type and ID.
- [Storefront Schema](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/storefront-schema): Hydrogen React ships with a pre-generated GraphQL schema for the Storefront API, which can integrate with your IDE and other GraphQL tooling (such as a [GraphQL config file](https://www.graphql-config.com/docs/user/user-usage)) to provide autocompletion and validation for your Storefront API GraphQL queries.

This schema is generated using the Storefront API's introspection query, and is available at `@shopify/hydrogen-react/storefront.schema.json`.

To get these features working in your IDE, you may need to install an extension. For example, in VSCode you can install this [GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql).

- [Storefront API Types](https://shopify.dev/docs/api/hydrogen/2023-04/utilities/storefront-api-types): If you are using TypeScript, pre-generated TypeScript types are available that match the Storefront API's GraphQL schema. These types can be used when you need to manually create an object that matches a Storefront API object's shape.

These types also work really well with the new [`satisfies` operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) introduced in TypeScript 4.9, though you don't need to use `satisfies` to use these types.

- [CacheCustom](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/cachecustom): This allows you to create your own caching strategy, using any of the options available in a `CachingStrategy` object.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheLong](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/cachelong): The `CacheLong` strategy instructs caches to store data for 1 hour, and `staleWhileRevalidate` data for an additional 23 hours. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheNone](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/cachenone): The CacheNone() strategy instructs caches not to store any data. The function accepts no arguments.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheShort](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/cacheshort): The `CacheShort` strategy instructs caches to store data for 1 second, and `staleWhileRevalidate` data for an additional 9 seconds. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [InMemoryCache](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/inmemorycache): > Caution:
  > This utility should only be used when deploying Hydrogen to a Node.js environment. It should _not_ be used when deploying Hydrogen to Oxygen.

If you are deploying Hydrogen to a Node.js environment, you can use this limited implementation of an in-memory cache. It only supports the `cache-control` header. It does NOT support `age` or `expires` headers.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [generateCacheControlHeader](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/generatecachecontrolheader): This utility function accepts a `CachingStrategy` object and returns a string with the corresponding `cache-control` header.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CartForm](https://shopify.dev/docs/api/hydrogen/2023-07/components/cartform): Creates a form for managing cart operations. Use `CartActionInput` to accept form inputs of known type.
- [cartGetIdDefault](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/cartgetiddefault): Creates a function that returns the cart id from request header cookie.
- [cartSetIdDefault](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/cartsetiddefault): Creates a function that returns a header with a Set-Cookie on the cart ID.
- [createCartHandler](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/createcarthandler): Creates an API that can be used to interact with the cart.
- [cartAttributesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/cartattributesupdatedefault): Creates a function that accepts an array of [AttributeInput](https://shopify.dev/docs/api/storefront/2023-07/input-objects/AttributeInput) and updates attributes to a cart
- [cartBuyerIdentityUpdateDefault](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/cartbuyeridentityupdatedefault): Creates a function that accepts an object of [CartBuyerIdentityInput](https://shopify.dev/docs/api/storefront/2023-07/input-objects/CartBuyerIdentityInput) and updates the buyer identity of a cart
- [cartCreateDefault](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/cartcreatedefault): Creates a function that accepts an object of [CartInput](https://shopify.dev/docs/api/storefront/2023-07/input-objects/CartInput) and returns a new cart
- [cartDiscountCodesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/cartdiscountcodesupdatedefault): Creates a function that accepts an array of strings and adds the discount codes to a cart
- [cartGetDefault](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/cartgetdefault): Creates a function that returns a cart
- [cartLinesAddDefault](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/cartlinesadddefault): Creates a function that accepts an array of [CartLineInput](https://shopify.dev/docs/api/storefront/2023-07/input-objects/CartLineInput) and adds the line items to a cart
- [cartLinesRemoveDefault](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/cartlinesremovedefault): Creates a function that accepts an array of line ids and removes the line items from a cart
- [cartLinesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/cartlinesupdatedefault): Creates a function that accepts an array of [CartLineUpdateInput](https://shopify.dev/docs/api/storefront/2023-07/input-objects/CartLineUpdateInput) and updates the line items in a cart
- [cartMetafieldDeleteDefault](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/cartmetafielddeletedefault): Creates a function that accepts a string key and removes the matching metafield from the cart.
- [cartMetafieldsSetDefault](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/cartmetafieldssetdefault): Creates a function that accepts an array of [CartMetafieldsSetInput](https://shopify.dev/docs/api/storefront/2023-07/input-objects/CartMetafieldsSetInput) without `ownerId` and set the metafields to a cart
- [cartNoteUpdateDefault](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/cartnoteupdatedefault): Creates a function that accepts a string and attaches it as a note to a cart.
- [cartSelectedDeliveryOptionsUpdateDefault](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/cartselecteddeliveryoptionsupdatedefault): Creates a function that accepts an object of [CartSelectedDeliveryOptionInput](https://shopify.dev/docs/api/storefront/2023-07/input-objects/CartSelectedDeliveryOptionInput) and updates the selected delivery option of a cart
- [createStorefrontClient](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/createstorefrontclient): This function extends `createStorefrontClient` from [Hydrogen React](https://shopify.dev/docs/api/hydrogen-react/2023-07/utilities/createstorefrontclient). The additional arguments enable internationalization (i18n), caching, and other features particular to Remix and Oxygen.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [Script](https://shopify.dev/docs/api/hydrogen/2023-07/components/script): Use the `Script` component to add third-party scripts to your app. It automatically adds a nonce attribute from your [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy).
- [createContentSecurityPolicy](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/createcontentsecuritypolicy): Create a [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) to secure your application. The default content security policy includes exclusions for cdn.shopify.com and a script nonce.
- [useNonce](https://shopify.dev/docs/api/hydrogen/2023-07/hooks/usenonce): The `useNonce` hook returns the [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) nonce. Use the hook to manually add a nonce to third party scripts. The `Script` component automatically does this for you. Note, the nonce should never be available in the client, and should always return undefined in the browser.
- [OptimisticInput](https://shopify.dev/docs/api/hydrogen/2023-07/components/optimisticinput): Creates a form input for optimistic UI updates. Use `useOptimisticData` to update the UI with the latest optimistic data.
- [useOptimisticData](https://shopify.dev/docs/api/hydrogen/2023-07/hooks/useoptimisticdata): Gets the latest optimistic data with matching optimistic id from actions. Use `OptimisticInput` to accept optimistic data in forms.
- [Pagination](https://shopify.dev/docs/api/hydrogen/2023-07/components/pagination): The [Storefront API uses cursors](https://shopify.dev/docs/api/usage/pagination-graphql) to paginate through lists of data and the `<Pagination />` component makes it easy to paginate data from the Storefront API. It is important for pagination state to be maintained in the URL, so that the user can navigate to a product and return back to the same scrolled position in a list. It is also important that the list state is shareable via URL. The `<Pagination>` component provides a render prop with properties to load more elements into your list.
- [getPaginationVariables](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/getpaginationvariables): > Caution:
  > This component is in an unstable pre-release state and may have breaking changes in a future release.

The `getPaginationVariables` function is used with the [`<Pagination>`](https://shopify.dev/docs/api/hydrogen/components/pagnination) component to generate the variables needed to fetch paginated data from the Storefront API. The returned variables should be used within your storefront GraphQL query.

- [VariantSelector](https://shopify.dev/docs/api/hydrogen/2023-07/components/variantselector): The `VariantSelector` component helps you build a form for selecting available variants of a product. It is important for variant selection state to be maintained in the URL, so that the user can navigate to a product and return back to the same variant selection. It is also important that the variant selection state is shareable via URL. The `VariantSelector` component provides a render prop that renders for each product option.
- [getSelectedProductOptions](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/getselectedproductoptions): The `getSelectedProductOptions` returns the selected options from the Request search parameters. The selected options can then be easily passed to your GraphQL query with [`variantBySelectedOptions`](https://shopify.dev/docs/api/storefront/2023-07/objects/product#field-product-variantbyselectedoptions).
- [graphiqlLoader](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/graphiqlloader): This function creates an instance of [GraphiQL](https://graphql.org/swapi-graphql) in your Hydrogen app when running on a development server. This enables you to explore, write, and test GraphQL queries using your store's live data from the Storefront API. You can visit the GraphiQL app at your storefront route /graphiql. Learn more about [using GraphiQL in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/graphiql).
- [storefrontRedirect](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/storefrontredirect): Queries the Storefront API to see if there is any redirect [created for the current route](https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect) and performs it. Otherwise, it returns the response passed in the parameters. Useful for conditionally redirecting after a 404 response.
- [Seo](https://shopify.dev/docs/api/hydrogen/2023-07/components/seo): The `<Seo />` component renders SEO meta tags in the document `head`. Add the `<Seo />` to your `root.jsx` before the `<Meta />` and `<Link />` components. SEO metadata is set on a per-route basis using Remix [loader functions](https://remix.run/docs/en/v1/guides/data-loading). Learn more about [how SEO works in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/seo).
- [createWithCache](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/createwithcache): Creates a utility function that executes an asynchronous operation
  like `fetch` and caches the result according to the strategy provided.
  Use this to call any third-party APIs from loaders or actions.
  By default, it uses the `CacheShort` strategy.
- [Image](https://shopify.dev/docs/api/hydrogen/2023-07/components/image): The `Image` component renders an image for the Storefront API's
  [Image object](https://shopify.dev/api/storefront/reference/common-objects/image) by using the `data` prop. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.

Images default to being responsive automatically (`width: 100%, height: auto`), and expect an `aspectRatio` prop, which ensures your image doesn't create any layout shift. For fixed-size images, you can set `width` to an exact value, and a `srcSet` with 1x, 2x, and 3x DPI variants will automatically be generated for you.

- [ExternalVideo](https://shopify.dev/docs/api/hydrogen/2023-07/components/externalvideo): The `ExternalVideo` component renders an embedded video for the Storefront API's [ExternalVideo object](https://shopify.dev/api/storefront/reference/products/externalvideo).
- [MediaFile](https://shopify.dev/docs/api/hydrogen/2023-07/components/mediafile): The `MediaFile` component renders the media for the Storefront API's
  [Media object](https://shopify.dev/api/storefront/reference/products/media). It renders an `Image`, `Video`, an `ExternalVideo`, or a `ModelViewer` depending on the `__typename` of the `data` prop.
- [Money](https://shopify.dev/docs/api/hydrogen/2023-07/components/money): The `Money` component renders a string of the Storefront API's[MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) according to the `locale` in the [`ShopifyProvider` component](/api/hydrogen/components/global/shopifyprovider).
  The component outputs a `<div>`. You can [customize this component](https://api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
- [ModelViewer](https://shopify.dev/docs/api/hydrogen/2023-07/components/modelviewer): The `ModelViewer` component renders a 3D model (with the `model-viewer` custom element) for the Storefront API's [Model3d object](https://shopify.dev/api/storefront/reference/products/model3d). The `model-viewer` custom element is lazily downloaded through a dynamically-injected `<script type='module'>` tag when the `<ModelViewer />` component is rendered. ModelViewer is using version `1.21.1` of the `@google/model-viewer` library.
- [ShopPayButton](https://shopify.dev/docs/api/hydrogen/2023-07/components/shoppaybutton): The `ShopPayButton` component renders a button that redirects to the Shop Pay checkout. It renders a [`<shop-pay-button>`](https://shopify.dev/custom-storefronts/tools/web-components) custom element, for which it will lazy-load the source code automatically.
- [Video](https://shopify.dev/docs/api/hydrogen/2023-07/components/video): The `Video` component renders a video for the Storefront API's [Video object](https://shopify.dev/api/storefront/reference/products/video).
  The component outputs a `video` element. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
- [useMoney](https://shopify.dev/docs/api/hydrogen/2023-07/hooks/usemoney): The `useMoney` hook takes a [MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) and returns a
  default-formatted string of the amount with the correct currency indicator, along with some of the parts provided by
  [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
- [useLoadScript](https://shopify.dev/docs/api/hydrogen/2023-07/hooks/useloadscript): The `useLoadScript` hook loads an external script tag in the browser. It allows React components to lazy-load third-party dependencies.
- [useShopifyCookies](https://shopify.dev/docs/api/hydrogen/2023-07/hooks/useshopifycookies): Sets Shopify user and session cookies and refreshes the expiry time.
- [flattenConnection](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/flattenconnection): The `flattenConnection` utility transforms a connection object from the Storefront API (for example, [Product-related connections](https://shopify.dev/api/storefront/reference/products/product)) into a flat array of nodes. The utility works with either `nodes` or `edges.node`.

If `connection` is null or undefined, will return an empty array instead in production. In development, an error will be thrown.

- [getClientBrowserParameters](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/getclientbrowserparameters): Gathers client browser values commonly used for analytics
- [getShopifyCookies](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/getshopifycookies): Parses cookie string and returns Shopify cookies.
- [parseMetafield](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/parsemetafield): A function that uses `metafield.type` to parse the Metafield's `value` or `reference` or `references` (depending on the `metafield.type`) and places the result in `metafield.parsedValue`.
- [sendShopifyAnalytics](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/sendshopifyanalytics): Sends analytics to Shopify.
- [storefrontApiCustomScalars](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/storefrontapicustomscalars): Meant to be used with GraphQL CodeGen to type the Storefront API's custom scalars correctly when using TypeScript.By default, GraphQL CodeGen uses `any` for custom scalars; by using these definitions, GraphQL Codegen will generate the correct types for the Storefront API's custom scalars.

See more about [GraphQL CodeGen](https://graphql-code-generator.com/) and [custom scalars for TypeScript](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript#scalars).

Note that `@shopify/hydrogen-react` has already generated types for the Storefront API, so you may not need to setup GraphQL Codegen on your own.

- [parseGid](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/parsegid): Parses [Shopify Global ID (GID)](https://shopify.dev/api/usage/gids) and returns the resource type and ID.
- [Storefront Schema](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/storefront-schema): Hydrogen React ships with a pre-generated GraphQL schema for the Storefront API, which can integrate with your IDE and other GraphQL tooling (such as a [GraphQL config file](https://www.graphql-config.com/docs/user/user-usage)) to provide autocompletion and validation for your Storefront API GraphQL queries.

This schema is generated using the Storefront API's introspection query, and is available at `@shopify/hydrogen-react/storefront.schema.json`.

To get these features working in your IDE, you may need to install an extension. For example, in VSCode you can install this [GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql).

- [Storefront API Types](https://shopify.dev/docs/api/hydrogen/2023-07/utilities/storefront-api-types): If you are using TypeScript, pre-generated TypeScript types are available that match the Storefront API's GraphQL schema. These types can be used when you need to manually create an object that matches a Storefront API object's shape.

These types also work really well with the new [`satisfies` operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) introduced in TypeScript 4.9, though you don't need to use `satisfies` to use these types.

- [CacheCustom](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/cachecustom): This allows you to create your own caching strategy, using any of the options available in a `CachingStrategy` object.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheLong](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/cachelong): The `CacheLong` strategy instructs caches to store data for 1 hour, and `staleWhileRevalidate` data for an additional 23 hours. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheNone](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/cachenone): The CacheNone() strategy instructs caches not to store any data. The function accepts no arguments.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheShort](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/cacheshort): The `CacheShort` strategy instructs caches to store data for 1 second, and `staleWhileRevalidate` data for an additional 9 seconds. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [InMemoryCache](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/inmemorycache): > Caution:
  > This utility should only be used when deploying Hydrogen to a Node.js environment. It should _not_ be used when deploying Hydrogen to Oxygen.

If you are deploying Hydrogen to a Node.js environment, you can use this limited implementation of an in-memory cache. It only supports the `cache-control` header. It does NOT support `age` or `expires` headers.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [generateCacheControlHeader](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/generatecachecontrolheader): This utility function accepts a `CachingStrategy` object and returns a string with the corresponding `cache-control` header.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CartForm](https://shopify.dev/docs/api/hydrogen/2023-10/components/cartform): Creates a form for managing cart operations. Use `CartActionInput` to accept form inputs of known type.
- [cartGetIdDefault](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/cartgetiddefault): Creates a function that returns the cart id from request header cookie.
- [cartSetIdDefault](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/cartsetiddefault): Creates a function that returns a header with a Set-Cookie on the cart ID.
- [createCartHandler](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/createcarthandler): Creates an API that can be used to interact with the cart.
- [cartAttributesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/cartattributesupdatedefault): Creates a function that accepts an array of [AttributeInput](https://shopify.dev/docs/api/storefront/2023-10/input-objects/AttributeInput) and updates attributes to a cart
- [cartBuyerIdentityUpdateDefault](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/cartbuyeridentityupdatedefault): Creates a function that accepts an object of [CartBuyerIdentityInput](https://shopify.dev/docs/api/storefront/2023-10/input-objects/CartBuyerIdentityInput) and updates the buyer identity of a cart
- [cartCreateDefault](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/cartcreatedefault): Creates a function that accepts an object of [CartInput](https://shopify.dev/docs/api/storefront/2023-10/input-objects/CartInput) and returns a new cart
- [cartDiscountCodesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/cartdiscountcodesupdatedefault): Creates a function that accepts an array of strings and adds the discount codes to a cart
- [cartGetDefault](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/cartgetdefault): Creates a function that returns a cart
- [cartLinesAddDefault](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/cartlinesadddefault): Creates a function that accepts an array of [CartLineInput](https://shopify.dev/docs/api/storefront/2023-10/input-objects/CartLineInput) and adds the line items to a cart
- [cartLinesRemoveDefault](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/cartlinesremovedefault): Creates a function that accepts an array of line ids and removes the line items from a cart
- [cartLinesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/cartlinesupdatedefault): Creates a function that accepts an array of [CartLineUpdateInput](https://shopify.dev/docs/api/storefront/2023-10/input-objects/CartLineUpdateInput) and updates the line items in a cart
- [cartMetafieldDeleteDefault](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/cartmetafielddeletedefault): Creates a function that accepts a string key and removes the matching metafield from the cart.
- [cartMetafieldsSetDefault](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/cartmetafieldssetdefault): Creates a function that accepts an array of [CartMetafieldsSetInput](https://shopify.dev/docs/api/storefront/2023-10/input-objects/CartMetafieldsSetInput) without `ownerId` and set the metafields to a cart
- [cartNoteUpdateDefault](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/cartnoteupdatedefault): Creates a function that accepts a string and attaches it as a note to a cart.
- [cartSelectedDeliveryOptionsUpdateDefault](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/cartselecteddeliveryoptionsupdatedefault): Creates a function that accepts an object of [CartSelectedDeliveryOptionInput](https://shopify.dev/docs/api/storefront/2023-10/input-objects/CartSelectedDeliveryOptionInput) and updates the selected delivery option of a cart
- [createStorefrontClient](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/createstorefrontclient): This function extends `createStorefrontClient` from [Hydrogen React](https://shopify.dev/docs/api/hydrogen-react/2023-10/utilities/createstorefrontclient). The additional arguments enable internationalization (i18n), caching, and other features particular to Remix and Oxygen.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [Script](https://shopify.dev/docs/api/hydrogen/2023-10/components/script): Use the `Script` component to add third-party scripts to your app. It automatically adds a nonce attribute from your [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy).
- [createContentSecurityPolicy](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/createcontentsecuritypolicy): Create a [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) to secure your application. The default content security policy includes exclusions for cdn.shopify.com and a script nonce.
- [useNonce](https://shopify.dev/docs/api/hydrogen/2023-10/hooks/usenonce): The `useNonce` hook returns the [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) nonce. Use the hook to manually add a nonce to third party scripts. The `Script` component automatically does this for you. Note, the nonce should never be available in the client, and should always return undefined in the browser.
- [createCustomerClient](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/createcustomerclient): > Caution:
  > This component is in an unstable pre-release state and may have breaking changes in a future release.

The `createCustomerClient` function creates a GraphQL client for querying the [Customer Account API](https://shopify.dev/docs/api/customer). It also provides methods to authenticate and check if the user is logged in.

See an end to end [example on using the Customer Account API client](https://github.com/Shopify/hydrogen/tree/main/examples/customer-api).

- [OptimisticInput](https://shopify.dev/docs/api/hydrogen/2023-10/components/optimisticinput): Creates a form input for optimistic UI updates. Use `useOptimisticData` to update the UI with the latest optimistic data.
- [useOptimisticData](https://shopify.dev/docs/api/hydrogen/2023-10/hooks/useoptimisticdata): Gets the latest optimistic data with matching optimistic id from actions. Use `OptimisticInput` to accept optimistic data in forms.
- [Pagination](https://shopify.dev/docs/api/hydrogen/2023-10/components/pagination): The [Storefront API uses cursors](https://shopify.dev/docs/api/usage/pagination-graphql) to paginate through lists of data and the `<Pagination />` component makes it easy to paginate data from the Storefront API. It is important for pagination state to be maintained in the URL, so that the user can navigate to a product and return back to the same scrolled position in a list. It is also important that the list state is shareable via URL. The `<Pagination>` component provides a render prop with properties to load more elements into your list.
- [getPaginationVariables](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/getpaginationvariables): The `getPaginationVariables` function is used with the [`<Pagination>`](https://shopify.dev/docs/api/hydrogen/components/pagnination) component to generate the variables needed to fetch paginated data from the Storefront API. The returned variables should be used within your storefront GraphQL query.
- [VariantSelector](https://shopify.dev/docs/api/hydrogen/2023-10/components/variantselector): The `VariantSelector` component helps you build a form for selecting available variants of a product. It is important for variant selection state to be maintained in the URL, so that the user can navigate to a product and return back to the same variant selection. It is also important that the variant selection state is shareable via URL. The `VariantSelector` component provides a render prop that renders for each product option.
- [getSelectedProductOptions](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/getselectedproductoptions): The `getSelectedProductOptions` returns the selected options from the Request search parameters. The selected options can then be easily passed to your GraphQL query with [`variantBySelectedOptions`](https://shopify.dev/docs/api/storefront/2023-10/objects/product#field-product-variantbyselectedoptions).
- [graphiqlLoader](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/graphiqlloader): This function creates an instance of [GraphiQL](https://graphql.org/swapi-graphql) in your Hydrogen app when running on a development server. This enables you to explore, write, and test GraphQL queries using your store's live data from the Storefront API. You can visit the GraphiQL app at your storefront route /graphiql. Learn more about [using GraphiQL in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/graphiql).
- [storefrontRedirect](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/storefrontredirect): Queries the Storefront API to see if there is any redirect [created for the current route](https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect) and performs it. Otherwise, it returns the response passed in the parameters. Useful for conditionally redirecting after a 404 response.
- [Seo](https://shopify.dev/docs/api/hydrogen/2023-10/components/seo): The `<Seo />` component renders SEO meta tags in the document `head`. Add the `<Seo />` to your `root.jsx` before the `<Meta />` and `<Link />` components. SEO metadata is set on a per-route basis using Remix [loader functions](https://remix.run/docs/en/v1/guides/data-loading). Learn more about [how SEO works in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/seo).
- [createWithCache](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/createwithcache): Creates a utility function that executes an asynchronous operation
  like `fetch` and caches the result according to the strategy provided.
  Use this to call any third-party APIs from loaders or actions.
  By default, it uses the `CacheShort` strategy.
- [Image](https://shopify.dev/docs/api/hydrogen/2023-10/components/image): The `Image` component renders an image for the Storefront API's
  [Image object](https://shopify.dev/api/storefront/reference/common-objects/image) by using the `data` prop. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.

Images default to being responsive automatically (`width: 100%, height: auto`), and expect an `aspectRatio` prop, which ensures your image doesn't create any layout shift. For fixed-size images, you can set `width` to an exact value, and a `srcSet` with 1x, 2x, and 3x DPI variants will automatically be generated for you.

- [ExternalVideo](https://shopify.dev/docs/api/hydrogen/2023-10/components/externalvideo): The `ExternalVideo` component renders an embedded video for the Storefront API's [ExternalVideo object](https://shopify.dev/api/storefront/reference/products/externalvideo).
- [MediaFile](https://shopify.dev/docs/api/hydrogen/2023-10/components/mediafile): The `MediaFile` component renders the media for the Storefront API's
  [Media object](https://shopify.dev/api/storefront/reference/products/media). It renders an `Image`, `Video`, an `ExternalVideo`, or a `ModelViewer` depending on the `__typename` of the `data` prop.
- [Money](https://shopify.dev/docs/api/hydrogen/2023-10/components/money): The `Money` component renders a string of the Storefront API's[MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) according to the `locale` in the [`ShopifyProvider` component](/api/hydrogen/components/global/shopifyprovider).
  The component outputs a `<div>`. You can [customize this component](https://api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
- [ModelViewer](https://shopify.dev/docs/api/hydrogen/2023-10/components/modelviewer): The `ModelViewer` component renders a 3D model (with the `model-viewer` custom element) for the Storefront API's [Model3d object](https://shopify.dev/api/storefront/reference/products/model3d). The `model-viewer` custom element is lazily downloaded through a dynamically-injected `<script type='module'>` tag when the `<ModelViewer />` component is rendered. ModelViewer is using version `1.21.1` of the `@google/model-viewer` library.
- [ShopPayButton](https://shopify.dev/docs/api/hydrogen/2023-10/components/shoppaybutton): The `ShopPayButton` component renders a button that redirects to the Shop Pay checkout. It renders a [`<shop-pay-button>`](https://shopify.dev/custom-storefronts/tools/web-components) custom element, for which it will lazy-load the source code automatically.
- [Video](https://shopify.dev/docs/api/hydrogen/2023-10/components/video): The `Video` component renders a video for the Storefront API's [Video object](https://shopify.dev/api/storefront/reference/products/video).
  The component outputs a `video` element. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
- [useMoney](https://shopify.dev/docs/api/hydrogen/2023-10/hooks/usemoney): The `useMoney` hook takes a [MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) and returns a
  default-formatted string of the amount with the correct currency indicator, along with some of the parts provided by
  [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
- [useLoadScript](https://shopify.dev/docs/api/hydrogen/2023-10/hooks/useloadscript): The `useLoadScript` hook loads an external script tag in the browser. It allows React components to lazy-load third-party dependencies.
- [useShopifyCookies](https://shopify.dev/docs/api/hydrogen/2023-10/hooks/useshopifycookies): Sets Shopify user and session cookies and refreshes the expiry time.
- [flattenConnection](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/flattenconnection): The `flattenConnection` utility transforms a connection object from the Storefront API (for example, [Product-related connections](https://shopify.dev/api/storefront/reference/products/product)) into a flat array of nodes. The utility works with either `nodes` or `edges.node`.

If `connection` is null or undefined, will return an empty array instead in production. In development, an error will be thrown.

- [getClientBrowserParameters](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/getclientbrowserparameters): Gathers client browser values commonly used for analytics
- [getShopifyCookies](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/getshopifycookies): Parses cookie string and returns Shopify cookies.
- [parseMetafield](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/parsemetafield): A function that uses `metafield.type` to parse the Metafield's `value` or `reference` or `references` (depending on the `metafield.type`) and places the result in `metafield.parsedValue`.
- [sendShopifyAnalytics](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/sendshopifyanalytics): Sends analytics to Shopify.
- [storefrontApiCustomScalars](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/storefrontapicustomscalars): Meant to be used with GraphQL CodeGen to type the Storefront API's custom scalars correctly when using TypeScript.By default, GraphQL CodeGen uses `any` for custom scalars; by using these definitions, GraphQL Codegen will generate the correct types for the Storefront API's custom scalars.

See more about [GraphQL CodeGen](https://graphql-code-generator.com/) and [custom scalars for TypeScript](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript#scalars).

Note that `@shopify/hydrogen-react` has already generated types for the Storefront API, so you may not need to setup GraphQL Codegen on your own.

- [parseGid](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/parsegid): Parses [Shopify Global ID (GID)](https://shopify.dev/api/usage/gids) and returns the resource type and ID.
- [Storefront Schema](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/storefront-schema): Hydrogen React ships with a pre-generated GraphQL schema for the Storefront API, which can integrate with your IDE and other GraphQL tooling (such as a [GraphQL config file](https://www.graphql-config.com/docs/user/user-usage)) to provide autocompletion and validation for your Storefront API GraphQL queries.

This schema is generated using the Storefront API's introspection query, and is available at `@shopify/hydrogen-react/storefront.schema.json`.

To get these features working in your IDE, you may need to install an extension. For example, in VSCode you can install this [GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql).

- [Storefront API Types](https://shopify.dev/docs/api/hydrogen/2023-10/utilities/storefront-api-types): If you are using TypeScript, pre-generated TypeScript types are available that match the Storefront API's GraphQL schema. These types can be used when you need to manually create an object that matches a Storefront API object's shape.

These types also work really well with the new [`satisfies` operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) introduced in TypeScript 4.9, though you don't need to use `satisfies` to use these types.

- [CacheCustom](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/cachecustom): This allows you to create your own caching strategy, using any of the options available in a `CachingStrategy` object.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheLong](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/cachelong): The `CacheLong` strategy instructs caches to store data for 1 hour, and `staleWhileRevalidate` data for an additional 23 hours. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheNone](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/cachenone): The CacheNone() strategy instructs caches not to store any data. The function accepts no arguments.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheShort](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/cacheshort): The `CacheShort` strategy instructs caches to store data for 1 second, and `staleWhileRevalidate` data for an additional 9 seconds. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [InMemoryCache](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/inmemorycache): > Caution:
  > This utility should only be used when deploying Hydrogen to a Node.js environment. It should _not_ be used when deploying Hydrogen to Oxygen.

If you are deploying Hydrogen to a Node.js environment, you can use this limited implementation of an in-memory cache. It only supports the `cache-control` header. It does NOT support `age` or `expires` headers.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [generateCacheControlHeader](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/generatecachecontrolheader): This utility function accepts a `CachingStrategy` object and returns a string with the corresponding `cache-control` header.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CartForm](https://shopify.dev/docs/api/hydrogen/2024-01/components/cartform): Creates a form for managing cart operations. Use `CartActionInput` to accept form inputs of known type.
- [cartGetIdDefault](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/cartgetiddefault): Creates a function that returns the cart id from request header cookie.
- [cartSetIdDefault](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/cartsetiddefault): Creates a function that returns a header with a Set-Cookie on the cart ID.
- [createCartHandler](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/createcarthandler): Creates an API that can be used to interact with the cart.
- [cartAttributesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/cartattributesupdatedefault): Creates a function that accepts an array of [AttributeInput](https://shopify.dev/docs/api/storefront/2024-01/input-objects/AttributeInput) and updates attributes to a cart
- [cartBuyerIdentityUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/cartbuyeridentityupdatedefault): Creates a function that accepts an object of [CartBuyerIdentityInput](https://shopify.dev/docs/api/storefront/2024-01/input-objects/CartBuyerIdentityInput) and updates the buyer identity of a cart
- [cartCreateDefault](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/cartcreatedefault): Creates a function that accepts an object of [CartInput](https://shopify.dev/docs/api/storefront/2024-01/input-objects/CartInput) and returns a new cart
- [cartDiscountCodesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/cartdiscountcodesupdatedefault): Creates a function that accepts an array of strings and adds the discount codes to a cart
- [cartGetDefault](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/cartgetdefault): Creates a function that returns a cart
- [cartLinesAddDefault](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/cartlinesadddefault): Creates a function that accepts an array of [CartLineInput](https://shopify.dev/docs/api/storefront/2024-01/input-objects/CartLineInput) and adds the line items to a cart
- [cartLinesRemoveDefault](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/cartlinesremovedefault): Creates a function that accepts an array of line ids and removes the line items from a cart
- [cartLinesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/cartlinesupdatedefault): Creates a function that accepts an array of [CartLineUpdateInput](https://shopify.dev/docs/api/storefront/2024-01/input-objects/CartLineUpdateInput) and updates the line items in a cart
- [cartMetafieldDeleteDefault](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/cartmetafielddeletedefault): Creates a function that accepts a string key and removes the matching metafield from the cart.
- [cartMetafieldsSetDefault](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/cartmetafieldssetdefault): Creates a function that accepts an array of [CartMetafieldsSetInput](https://shopify.dev/docs/api/storefront/2024-01/input-objects/CartMetafieldsSetInput) without `ownerId` and set the metafields to a cart
- [cartNoteUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/cartnoteupdatedefault): Creates a function that accepts a string and attaches it as a note to a cart.
- [cartSelectedDeliveryOptionsUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/cartselecteddeliveryoptionsupdatedefault): Creates a function that accepts an object of [CartSelectedDeliveryOptionInput](https://shopify.dev/docs/api/storefront/2024-01/input-objects/CartSelectedDeliveryOptionInput) and updates the selected delivery option of a cart
- [createStorefrontClient](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/createstorefrontclient): This function extends `createStorefrontClient` from [Hydrogen React](https://shopify.dev/docs/api/hydrogen-react/2024-01/utilities/createstorefrontclient). The additional arguments enable internationalization (i18n), caching, and other features particular to Remix and Oxygen.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [Script](https://shopify.dev/docs/api/hydrogen/2024-01/components/script): Use the `Script` component to add third-party scripts to your app. It automatically adds a nonce attribute from your [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy).
- [createContentSecurityPolicy](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/createcontentsecuritypolicy): Create a [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) to secure your application. The default content security policy includes exclusions for cdn.shopify.com and a script nonce.
- [useNonce](https://shopify.dev/docs/api/hydrogen/2024-01/hooks/usenonce): The `useNonce` hook returns the [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) nonce. Use the hook to manually add a nonce to third party scripts. The `Script` component automatically does this for you. Note, the nonce should never be available in the client, and should always return undefined in the browser.
- [createCustomerAccountClient](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/createcustomeraccountclient): The `createCustomerAccountClient` function creates a GraphQL client for querying the [Customer Account API](https://shopify.dev/docs/api/customer). It also provides methods to authenticate and check if the user is logged in.
- [OptimisticInput](https://shopify.dev/docs/api/hydrogen/2024-01/components/optimisticinput): Creates a form input for optimistic UI updates. Use `useOptimisticData` to update the UI with the latest optimistic data.
- [useOptimisticData](https://shopify.dev/docs/api/hydrogen/2024-01/hooks/useoptimisticdata): Gets the latest optimistic data with matching optimistic id from actions. Use `OptimisticInput` to accept optimistic data in forms.
- [Pagination](https://shopify.dev/docs/api/hydrogen/2024-01/components/pagination): The [Storefront API uses cursors](https://shopify.dev/docs/api/usage/pagination-graphql) to paginate through lists of data and the `<Pagination />` component makes it easy to paginate data from the Storefront API. It is important for pagination state to be maintained in the URL, so that the user can navigate to a product and return back to the same scrolled position in a list. It is also important that the list state is shareable via URL. The `<Pagination>` component provides a render prop with properties to load more elements into your list.
- [getPaginationVariables](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/getpaginationvariables): The `getPaginationVariables` function is used with the [`<Pagination>`](https://shopify.dev/docs/api/hydrogen/components/pagnination) component to generate the variables needed to fetch paginated data from the Storefront API. The returned variables should be used within your storefront GraphQL query.
- [VariantSelector](https://shopify.dev/docs/api/hydrogen/2024-01/components/variantselector): The `VariantSelector` component helps you build a form for selecting available variants of a product. It is important for variant selection state to be maintained in the URL, so that the user can navigate to a product and return back to the same variant selection. It is also important that the variant selection state is shareable via URL. The `VariantSelector` component provides a render prop that renders for each product option.
- [getSelectedProductOptions](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/getselectedproductoptions): The `getSelectedProductOptions` returns the selected options from the Request search parameters. The selected options can then be easily passed to your GraphQL query with [`variantBySelectedOptions`](https://shopify.dev/docs/api/storefront/2024-01/objects/product#field-product-variantbyselectedoptions).
- [graphiqlLoader](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/graphiqlloader): This function creates an instance of [GraphiQL](https://graphql.org/swapi-graphql) in your Hydrogen app when running on a development server. This enables you to explore, write, and test GraphQL queries using your store's live data from the Storefront API. You can visit the GraphiQL app at your storefront route /graphiql. Learn more about [using GraphiQL in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/graphiql).
- [storefrontRedirect](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/storefrontredirect): Queries the Storefront API to see if there is any redirect [created for the current route](https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect) and performs it. Otherwise, it returns the response passed in the parameters. Useful for conditionally redirecting after a 404 response.
- [Seo](https://shopify.dev/docs/api/hydrogen/2024-01/components/seo): The `<Seo />` component renders SEO meta tags in the document `head`. Add the `<Seo />` to your `root.jsx` before the `<Meta />` and `<Link />` components. SEO metadata is set on a per-route basis using Remix [loader functions](https://remix.run/docs/en/v1/guides/data-loading). Learn more about [how SEO works in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/seo).
- [createWithCache](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/createwithcache): Creates a utility function that executes an asynchronous operation
  like `fetch` and caches the result according to the strategy provided.
  Use this to call any third-party APIs from loaders or actions.
  By default, it uses the `CacheShort` strategy.
- [Image](https://shopify.dev/docs/api/hydrogen/2024-01/components/image): The `Image` component renders an image for the Storefront API's
  [Image object](https://shopify.dev/api/storefront/reference/common-objects/image) by using the `data` prop. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.

Images default to being responsive automatically (`width: 100%, height: auto`), and expect an `aspectRatio` prop, which ensures your image doesn't create any layout shift. For fixed-size images, you can set `width` to an exact value, and a `srcSet` with 1x, 2x, and 3x DPI variants will automatically be generated for you.

- [ExternalVideo](https://shopify.dev/docs/api/hydrogen/2024-01/components/externalvideo): The `ExternalVideo` component renders an embedded video for the Storefront API's [ExternalVideo object](https://shopify.dev/api/storefront/reference/products/externalvideo).
- [MediaFile](https://shopify.dev/docs/api/hydrogen/2024-01/components/mediafile): The `MediaFile` component renders the media for the Storefront API's
  [Media object](https://shopify.dev/api/storefront/reference/products/media). It renders an `Image`, `Video`, an `ExternalVideo`, or a `ModelViewer` depending on the `__typename` of the `data` prop.
- [Money](https://shopify.dev/docs/api/hydrogen/2024-01/components/money): The `Money` component renders a string of the Storefront API's[MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) according to the `locale` in the [`ShopifyProvider` component](/api/hydrogen/components/global/shopifyprovider).
  The component outputs a `<div>`. You can [customize this component](https://api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
- [ModelViewer](https://shopify.dev/docs/api/hydrogen/2024-01/components/modelviewer): The `ModelViewer` component renders a 3D model (with the `model-viewer` custom element) for the Storefront API's [Model3d object](https://shopify.dev/api/storefront/reference/products/model3d). The `model-viewer` custom element is lazily downloaded through a dynamically-injected `<script type='module'>` tag when the `<ModelViewer />` component is rendered. ModelViewer is using version `1.21.1` of the `@google/model-viewer` library.
- [ShopPayButton](https://shopify.dev/docs/api/hydrogen/2024-01/components/shoppaybutton): The `ShopPayButton` component renders a button that redirects to the Shop Pay checkout. It renders a [`<shop-pay-button>`](https://shopify.dev/custom-storefronts/tools/web-components) custom element, for which it will lazy-load the source code automatically.
- [Video](https://shopify.dev/docs/api/hydrogen/2024-01/components/video): The `Video` component renders a video for the Storefront API's [Video object](https://shopify.dev/api/storefront/reference/products/video).
  The component outputs a `video` element. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
- [useMoney](https://shopify.dev/docs/api/hydrogen/2024-01/hooks/usemoney): The `useMoney` hook takes a [MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) and returns a
  default-formatted string of the amount with the correct currency indicator, along with some of the parts provided by
  [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
- [useLoadScript](https://shopify.dev/docs/api/hydrogen/2024-01/hooks/useloadscript): The `useLoadScript` hook loads an external script tag in the browser. It allows React components to lazy-load third-party dependencies.
- [useShopifyCookies](https://shopify.dev/docs/api/hydrogen/2024-01/hooks/useshopifycookies): Sets Shopify user and session cookies and refreshes the expiry time.
- [flattenConnection](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/flattenconnection): The `flattenConnection` utility transforms a connection object from the Storefront API (for example, [Product-related connections](https://shopify.dev/api/storefront/reference/products/product)) into a flat array of nodes. The utility works with either `nodes` or `edges.node`.

If `connection` is null or undefined, will return an empty array instead in production. In development, an error will be thrown.

- [getClientBrowserParameters](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/getclientbrowserparameters): Gathers client browser values commonly used for analytics
- [getShopifyCookies](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/getshopifycookies): Parses cookie string and returns Shopify cookies.
- [parseMetafield](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/parsemetafield): A function that uses `metafield.type` to parse the Metafield's `value` or `reference` or `references` (depending on the `metafield.type`) and places the result in `metafield.parsedValue`.
- [sendShopifyAnalytics](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/sendshopifyanalytics): Sends analytics to Shopify.
- [storefrontApiCustomScalars](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/storefrontapicustomscalars): Meant to be used with GraphQL CodeGen to type the Storefront API's custom scalars correctly when using TypeScript.By default, GraphQL CodeGen uses `any` for custom scalars; by using these definitions, GraphQL Codegen will generate the correct types for the Storefront API's custom scalars.

See more about [GraphQL CodeGen](https://graphql-code-generator.com/) and [custom scalars for TypeScript](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript#scalars).

Note that `@shopify/hydrogen-react` has already generated types for the Storefront API, so you may not need to setup GraphQL Codegen on your own.

- [parseGid](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/parsegid): Parses [Shopify Global ID (GID)](https://shopify.dev/api/usage/gids) and returns the resource type and ID.
- [Storefront Schema](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/storefront-schema): Hydrogen React ships with a pre-generated GraphQL schema for the Storefront API, which can integrate with your IDE and other GraphQL tooling (such as a [GraphQL config file](https://www.graphql-config.com/docs/user/user-usage)) to provide autocompletion and validation for your Storefront API GraphQL queries.

This schema is generated using the Storefront API's introspection query, and is available at `@shopify/hydrogen-react/storefront.schema.json`.

To get these features working in your IDE, you may need to install an extension. For example, in VSCode you can install this [GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql).

- [Storefront API Types](https://shopify.dev/docs/api/hydrogen/2024-01/utilities/storefront-api-types): If you are using TypeScript, pre-generated TypeScript types are available that match the Storefront API's GraphQL schema. These types can be used when you need to manually create an object that matches a Storefront API object's shape.

These types also work really well with the new [`satisfies` operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) introduced in TypeScript 4.9, though you don't need to use `satisfies` to use these types.

- [Analytics.CartView](https://shopify.dev/docs/api/hydrogen/2024-04/components/analytics/analytics-cartview): Publishes a `cart_viewed` event to the `Analytics.Provider` component.
- [Analytics.CollectionView](https://shopify.dev/docs/api/hydrogen/2024-04/components/analytics/analytics-collectionview): Publishes a `collection_viewed` event to the `Analytics.Provider` component.
- [Analytics.CustomView](https://shopify.dev/docs/api/hydrogen/2024-04/components/analytics/analytics-customview): Publishes a custom page view event to the `Analytics.Provider` component. The `type` prop must be preceded by `custom_`.
- [Analytics.Provider](https://shopify.dev/docs/api/hydrogen/2024-04/components/analytics/analytics-provider): Provides a context for tracking page views and cart events to send as analytics data to Shopify. This component is integrated with the Customer Privacy API for consent management. The provider can also be used to connect third-party analytics services through its subscribe and publish system. The [`useAnalytics`](https://shopify.dev/docs/api/hydrogen/2024-04/hooks/useanalytics) hook provides access to the analytics provider context.
- [Analytics.ProductView](https://shopify.dev/docs/api/hydrogen/2024-04/components/analytics/analytics-productview): Publishes a `product_viewed` event to the `Analytics.Provider` component.
- [Analytics.SearchView](https://shopify.dev/docs/api/hydrogen/2024-04/components/analytics/analytics-searchview): Publishes a `search_viewed` event to the `Analytics.Provider` component.
- [getShopAnalytics](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/getshopanalytics): A function that queries for shop required analytics data to be used in the [`Analytics.Provider`](https://shopify.dev/docs/api/hydrogen/2024-04/components/Analytics-provider) component.
- [useAnalytics](https://shopify.dev/docs/api/hydrogen/2024-04/hooks/useanalytics): A hook that provides access to the analytics provider context. Must be a descendent of [`Analytics.Provider`](https://shopify.dev/docs/api/hydrogen/2024-04/components/Analytics-provider).
- [CacheCustom](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/caching/cachecustom): This allows you to create your own caching strategy, using any of the options available in a `CachingStrategy` object.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheLong](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/caching/cachelong): The `CacheLong` strategy instructs caches to store data for 1 hour, and `staleWhileRevalidate` data for an additional 23 hours. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheNone](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/caching/cachenone): The CacheNone() strategy instructs caches not to store any data. The function accepts no arguments.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheShort](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/caching/cacheshort): The `CacheShort` strategy instructs caches to store data for 1 second, and `staleWhileRevalidate` data for an additional 9 seconds. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [InMemoryCache](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/caching/inmemorycache): > Caution:
  > This utility should only be used when deploying Hydrogen to a Node.js environment. It should _not_ be used when deploying Hydrogen to Oxygen.

If you are deploying Hydrogen to a Node.js environment, you can use this limited implementation of an in-memory cache. It only supports the `cache-control` header. It does NOT support `age` or `expires` headers.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [generateCacheControlHeader](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/caching/generatecachecontrolheader): This utility function accepts a `CachingStrategy` object and returns a string with the corresponding `cache-control` header.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CartForm](https://shopify.dev/docs/api/hydrogen/2024-04/components/cartform): Creates a form for managing cart operations. Use `CartActionInput` to accept form inputs of known type.
- [cartGetIdDefault](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/cart/cartgetiddefault): Creates a function that returns the cart id from request header cookie.
- [cartSetIdDefault](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/cart/cartsetiddefault): Creates a function that returns a header with a Set-Cookie on the cart ID.
- [createCartHandler](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/cart/createcarthandler): Creates an API that can be used to interact with the cart.
- [useOptimisticCart](https://shopify.dev/docs/api/hydrogen/2024-04/hooks/useoptimisticcart): The `useOptimisticCart` takes an existing cart object, processes all pending cart actions, and locally mutates the cart with optimistic state. An optimistic cart makes cart actions immediately render in the browser while actions sync to the server. This increases the perceived performance of the application.
- [cartAttributesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/cart/cartattributesupdatedefault): Creates a function that accepts an array of [AttributeInput](https://shopify.dev/docs/api/storefront/2024-04/input-objects/AttributeInput) and updates attributes to a cart
- [cartBuyerIdentityUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/cart/cartbuyeridentityupdatedefault): Creates a function that accepts an object of [CartBuyerIdentityInput](https://shopify.dev/docs/api/storefront/2024-04/input-objects/CartBuyerIdentityInput) and updates the buyer identity of a cart
- [cartCreateDefault](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/cart/cartcreatedefault): Creates a function that accepts an object of [CartInput](https://shopify.dev/docs/api/storefront/2024-04/input-objects/CartInput) and returns a new cart
- [cartDiscountCodesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/cart/cartdiscountcodesupdatedefault): Creates a function that accepts an array of strings and adds the discount codes to a cart
- [cartGetDefault](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/cart/cartgetdefault): Creates a function that returns a cart
- [cartLinesAddDefault](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/cart/cartlinesadddefault): Creates a function that accepts an array of [CartLineInput](https://shopify.dev/docs/api/storefront/2024-04/input-objects/CartLineInput) and adds the line items to a cart
- [cartLinesRemoveDefault](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/cart/cartlinesremovedefault): Creates a function that accepts an array of line ids and removes the line items from a cart
- [cartLinesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/cart/cartlinesupdatedefault): Creates a function that accepts an array of [CartLineUpdateInput](https://shopify.dev/docs/api/storefront/2024-04/input-objects/CartLineUpdateInput) and updates the line items in a cart
- [cartMetafieldDeleteDefault](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/cart/cartmetafielddeletedefault): Creates a function that accepts a string key and removes the matching metafield from the cart.
- [cartMetafieldsSetDefault](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/cart/cartmetafieldssetdefault): Creates a function that accepts an array of [CartMetafieldsSetInput](https://shopify.dev/docs/api/storefront/2024-04/input-objects/CartMetafieldsSetInput) without `ownerId` and set the metafields to a cart
- [cartNoteUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/cart/cartnoteupdatedefault): Creates a function that accepts a string and attaches it as a note to a cart.
- [cartSelectedDeliveryOptionsUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/cart/cartselecteddeliveryoptionsupdatedefault): Creates a function that accepts an object of [CartSelectedDeliveryOptionInput](https://shopify.dev/docs/api/storefront/2024-04/input-objects/CartSelectedDeliveryOptionInput) and updates the selected delivery option of a cart
- [createStorefrontClient](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/createstorefrontclient): This function extends `createStorefrontClient` from [Hydrogen React](https://shopify.dev/docs/api/hydrogen-react/2024-04/utilities/createstorefrontclient).
  The additional arguments enable internationalization (i18n), caching, and other features particular to Remix and Oxygen.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [Script](https://shopify.dev/docs/api/hydrogen/2024-04/components/script): Use the `Script` component to add third-party scripts to your app. It automatically adds a nonce attribute from your [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy).
- [createContentSecurityPolicy](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/createcontentsecuritypolicy): Create a [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) to secure your application. The default content security policy includes exclusions for cdn.shopify.com and a script nonce.
- [useNonce](https://shopify.dev/docs/api/hydrogen/2024-04/hooks/usenonce): The `useNonce` hook returns the [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) nonce. Use the hook to manually add a nonce to third party scripts. The `Script` component automatically does this for you. Note, the nonce should never be available in the client, and should always return undefined in the browser.
- [useCustomerPrivacy](https://shopify.dev/docs/api/hydrogen/2024-04/hooks/usecustomerprivacy): A hook that loads the [Customer Privacy API](https://shopify.dev/docs/api/customer-privacy).

You can get the customer privacy instance with `getCustomerPrivacy()`.

- [createCustomerAccountClient](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/createcustomeraccountclient): The `createCustomerAccountClient` function creates a GraphQL client for querying the [Customer Account API](https://shopify.dev/docs/api/customer). It also provides methods to authenticate and check if the user is logged in.
- [OptimisticInput](https://shopify.dev/docs/api/hydrogen/2024-04/components/optimisticinput): Creates a form input for optimistic UI updates. Use `useOptimisticData` to update the UI with the latest optimistic data.
- [useOptimisticData](https://shopify.dev/docs/api/hydrogen/2024-04/hooks/useoptimisticdata): Gets the latest optimistic data with matching optimistic id from actions. Use `OptimisticInput` to accept optimistic data in forms.
- [Pagination](https://shopify.dev/docs/api/hydrogen/2024-04/components/pagination): The [Storefront API uses cursors](https://shopify.dev/docs/api/usage/pagination-graphql) to paginate through lists of data and the `<Pagination />` component makes it easy to paginate data from the Storefront API. It is important for pagination state to be maintained in the URL, so that the user can navigate to a product and return back to the same scrolled position in a list. It is also important that the list state is shareable via URL. The `<Pagination>` component provides a render prop with properties to load more elements into your list.
- [getPaginationVariables](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/getpaginationvariables): The `getPaginationVariables` function is used with the [`<Pagination>`](https://shopify.dev/docs/api/hydrogen/components/pagnination) component to generate the variables needed to fetch paginated data from the Storefront API. The returned variables should be used within your storefront GraphQL query.
- [VariantSelector](https://shopify.dev/docs/api/hydrogen/2024-04/components/variantselector): The `VariantSelector` component helps you build a form for selecting available variants of a product. It is important for variant selection state to be maintained in the URL, so that the user can navigate to a product and return back to the same variant selection. It is also important that the variant selection state is shareable via URL. The `VariantSelector` component provides a render prop that renders for each product option.
- [getSelectedProductOptions](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/getselectedproductoptions): The `getSelectedProductOptions` returns the selected options from the Request search parameters. The selected options can then be easily passed to your GraphQL query with [`variantBySelectedOptions`](https://shopify.dev/docs/api/storefront/2024-04/objects/product#field-product-variantbyselectedoptions).
- [graphiqlLoader](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/graphiqlloader): This function creates an instance of [GraphiQL](https://graphql.org/swapi-graphql) in your Hydrogen app when running on a development server. This enables you to explore, write, and test GraphQL queries using your store's live data from the Storefront API. You can visit the GraphiQL app at your storefront route /graphiql. Learn more about [using GraphiQL in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/graphiql).
- [storefrontRedirect](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/storefrontredirect): Queries the Storefront API to see if there is any redirect [created for the current route](https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect) and performs it. Otherwise, it returns the response passed in the parameters. Useful for conditionally redirecting after a 404 response.
- [getSeoMeta](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/getseometa): Generate a [Remix meta array](https://remix.run/docs/en/main/route/meta) from one or more SEO configuration objects. Pass SEO configuration for the parent route(s) and the current route to preserve meta data for all active routes. Similar to [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), each property is overwritten based on the object order. The exception is `jsonLd`, which is preserved so that each route has it's own independent jsonLd meta data. Learn more about [how SEO works in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/seo).
- [Seo](https://shopify.dev/docs/api/hydrogen/2024-04/components/seo): The `<Seo />` component renders SEO meta tags in the document `head`. Add the `<Seo />` to your `root.jsx` before the `<Meta />` and `<Link />` components. SEO metadata is set on a per-route basis using Remix [loader functions](https://remix.run/docs/en/v1/guides/data-loading). Learn more about [how SEO works in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/seo).

  **Note: the Seo component is deprecated** - Use [getSeoMeta](https://shopify.dev/docs/api/hydrogen/utilities/getseometa) to migrate.

- [createWithCache](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/caching/createwithcache): Creates a utility function that executes an asynchronous operation
  like `fetch` and caches the result according to the strategy provided.
  Use this to call any third-party APIs from loaders or actions.
  By default, it uses the `CacheShort` strategy.
- [Image](https://shopify.dev/docs/api/hydrogen/2024-04/components/media/image): The `Image` component renders an image for the Storefront API's
  [Image object](https://shopify.dev/api/storefront/reference/common-objects/image) by using the `data` prop. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.

Images default to being responsive automatically (`width: 100%, height: auto`), and expect an `aspectRatio` prop, which ensures your image doesn't create any layout shift. For fixed-size images, you can set `width` to an exact value, and a `srcSet` with 1x, 2x, and 3x DPI variants will automatically be generated for you.

- [ExternalVideo](https://shopify.dev/docs/api/hydrogen/2024-04/components/media/externalvideo): The `ExternalVideo` component renders an embedded video for the Storefront API's [ExternalVideo object](https://shopify.dev/api/storefront/reference/products/externalvideo).
- [MediaFile](https://shopify.dev/docs/api/hydrogen/2024-04/components/media/mediafile): The `MediaFile` component renders the media for the Storefront API's
  [Media object](https://shopify.dev/api/storefront/reference/products/media). It renders an `Image`, `Video`, an `ExternalVideo`, or a `ModelViewer` depending on the `__typename` of the `data` prop.
- [Money](https://shopify.dev/docs/api/hydrogen/2024-04/components/money): The `Money` component renders a string of the Storefront API's[MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) according to the `locale` in the [`ShopifyProvider` component](/api/hydrogen/components/global/shopifyprovider).
  The component outputs a `<div>`. You can [customize this component](https://api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
- [ModelViewer](https://shopify.dev/docs/api/hydrogen/2024-04/components/media/modelviewer): The `ModelViewer` component renders a 3D model (with the `model-viewer` custom element) for the Storefront API's [Model3d object](https://shopify.dev/api/storefront/reference/products/model3d). The `model-viewer` custom element is lazily downloaded through a dynamically-injected `<script type='module'>` tag when the `<ModelViewer />` component is rendered. ModelViewer is using version `1.21.1` of the `@google/model-viewer` library.
- [ShopPayButton](https://shopify.dev/docs/api/hydrogen/2024-04/components/shoppaybutton): The `ShopPayButton` component renders a button that redirects to the Shop Pay checkout. It renders a [`<shop-pay-button>`](https://shopify.dev/custom-storefronts/tools/web-components) custom element, for which it will lazy-load the source code automatically.
- [RichText](https://shopify.dev/docs/api/hydrogen/2024-04/components/richtext): The `RichText` component renders a metafield of type `rich_text_field`. By default the rendered output uses semantic HTML tags. Customize how nodes are rendered with the `components` prop.
- [Video](https://shopify.dev/docs/api/hydrogen/2024-04/components/media/video): The `Video` component renders a video for the Storefront API's [Video object](https://shopify.dev/api/storefront/reference/products/video).
  The component outputs a `video` element. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
- [useMoney](https://shopify.dev/docs/api/hydrogen/2024-04/hooks/usemoney): The `useMoney` hook takes a [MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) and returns a
  default-formatted string of the amount with the correct currency indicator, along with some of the parts provided by
  [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
- [useLoadScript](https://shopify.dev/docs/api/hydrogen/2024-04/hooks/useloadscript): The `useLoadScript` hook loads an external script tag in the browser. It allows React components to lazy-load third-party dependencies.
- [useShopifyCookies](https://shopify.dev/docs/api/hydrogen/2024-04/hooks/useshopifycookies): Sets Shopify user and session cookies and refreshes the expiry time.
- [flattenConnection](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/flattenconnection): The `flattenConnection` utility transforms a connection object from the Storefront API (for example, [Product-related connections](https://shopify.dev/api/storefront/reference/products/product)) into a flat array of nodes. The utility works with either `nodes` or `edges.node`.

If `connection` is null or undefined, will return an empty array instead in production. In development, an error will be thrown.

- [getClientBrowserParameters](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/getclientbrowserparameters): Gathers client browser values commonly used for analytics
- [getShopifyCookies](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/getshopifycookies): Parses cookie string and returns Shopify cookies.
- [parseMetafield](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/parsemetafield): A function that uses `metafield.type` to parse the Metafield's `value` or `reference` or `references` (depending on the `metafield.type`) and places the result in `metafield.parsedValue`.
- [sendShopifyAnalytics](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/sendshopifyanalytics): Sends analytics to Shopify.
- [storefrontApiCustomScalars](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/storefrontapicustomscalars): Meant to be used with GraphQL CodeGen to type the Storefront API's custom scalars correctly when using TypeScript.By default, GraphQL CodeGen uses `any` for custom scalars; by using these definitions, GraphQL Codegen will generate the correct types for the Storefront API's custom scalars.

See more about [GraphQL CodeGen](https://graphql-code-generator.com/) and [custom scalars for TypeScript](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript#scalars).

Note that `@shopify/hydrogen-react` has already generated types for the Storefront API, so you may not need to setup GraphQL Codegen on your own.

- [parseGid](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/parsegid): Parses [Shopify Global ID (GID)](https://shopify.dev/api/usage/gids) and returns the resource type and ID.
- [Storefront Schema](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/storefront-schema): Hydrogen React ships with a pre-generated GraphQL schema for the Storefront API, which can integrate with your IDE and other GraphQL tooling (such as a [GraphQL config file](https://www.graphql-config.com/docs/user/user-usage)) to provide autocompletion and validation for your Storefront API GraphQL queries.

This schema is generated using the Storefront API's introspection query, and is available at `@shopify/hydrogen-react/storefront.schema.json`.

To get these features working in your IDE, you may need to install an extension. For example, in VSCode you can install this [GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql).

- [Storefront API Types](https://shopify.dev/docs/api/hydrogen/2024-04/utilities/storefront-api-types): If you are using TypeScript, pre-generated TypeScript types are available that match the Storefront API's GraphQL schema. These types can be used when you need to manually create an object that matches a Storefront API object's shape.

These types also work really well with the new [`satisfies` operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) introduced in TypeScript 4.9, though you don't need to use `satisfies` to use these types.

- [Analytics.CartView](https://shopify.dev/docs/api/hydrogen/2024-07/components/analytics/analytics-cartview): Publishes a `cart_viewed` event to the `Analytics.Provider` component.
- [Analytics.CollectionView](https://shopify.dev/docs/api/hydrogen/2024-07/components/analytics/analytics-collectionview): Publishes a `collection_viewed` event to the `Analytics.Provider` component.
- [Analytics.CustomView](https://shopify.dev/docs/api/hydrogen/2024-07/components/analytics/analytics-customview): Publishes a custom page view event to the `Analytics.Provider` component. The `type` prop must be preceded by `custom_`.
- [Analytics.Provider](https://shopify.dev/docs/api/hydrogen/2024-07/components/analytics/analytics-provider): Provides a context for tracking page views and cart events to send as analytics data to Shopify. This component is integrated with the Customer Privacy API for consent management. The provider can also be used to connect third-party analytics services through its subscribe and publish system. The [`useAnalytics`](https://shopify.dev/docs/api/hydrogen/2024-07/hooks/useanalytics) hook provides access to the analytics provider context.
- [Analytics.ProductView](https://shopify.dev/docs/api/hydrogen/2024-07/components/analytics/analytics-productview): Publishes a `product_viewed` event to the `Analytics.Provider` component.
- [Analytics.SearchView](https://shopify.dev/docs/api/hydrogen/2024-07/components/analytics/analytics-searchview): Publishes a `search_viewed` event to the `Analytics.Provider` component.
- [getShopAnalytics](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/getshopanalytics): A function that queries for shop required analytics data to be used in the [`Analytics.Provider`](https://shopify.dev/docs/api/hydrogen/2024-07/components/Analytics-provider) component.
- [useAnalytics](https://shopify.dev/docs/api/hydrogen/2024-07/hooks/useanalytics): A hook that provides access to the analytics provider context. Must be a descendent of [`Analytics.Provider`](https://shopify.dev/docs/api/hydrogen/2024-07/components/Analytics-provider).
- [CacheCustom](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/caching/cachecustom): This allows you to create your own caching strategy, using any of the options available in a `CachingStrategy` object.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheLong](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/caching/cachelong): The `CacheLong` strategy instructs caches to store data for 1 hour, and `staleWhileRevalidate` data for an additional 23 hours. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheNone](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/caching/cachenone): The CacheNone() strategy instructs caches not to store any data. The function accepts no arguments.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheShort](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/caching/cacheshort): The `CacheShort` strategy instructs caches to store data for 1 second, and `staleWhileRevalidate` data for an additional 9 seconds. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [InMemoryCache](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/caching/inmemorycache): > Caution:
  > This utility should only be used when deploying Hydrogen to a Node.js environment. It should _not_ be used when deploying Hydrogen to Oxygen.

If you are deploying Hydrogen to a Node.js environment, you can use this limited implementation of an in-memory cache. It only supports the `cache-control` header. It does NOT support `age` or `expires` headers.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [createWithCache](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/caching/createwithcache): Creates a utility function that executes an asynchronous operation
  like `fetch` and caches the result according to the strategy provided.
  Use this to call any third-party APIs from loaders or actions.
  > Note:
  > Sometimes a request to a third-party API might fail, so you shouldn't cache the result. To prevent caching, throw when a request fails. If you don't throw, then the result is cached.
- [generateCacheControlHeader](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/caching/generatecachecontrolheader): This utility function accepts a `CachingStrategy` object and returns a string with the corresponding `cache-control` header.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CartForm](https://shopify.dev/docs/api/hydrogen/2024-07/components/cartform): Creates a form for managing cart operations. Use `CartActionInput` to accept form inputs of known type.
- [cartGetIdDefault](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/cart/cartgetiddefault): Creates a function that returns the cart id from request header cookie.
- [cartSetIdDefault](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/cart/cartsetiddefault): Creates a function that returns a header with a Set-Cookie on the cart ID.
- [createCartHandler](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/cart/createcarthandler): Creates an API that can be used to interact with the cart.
- [useOptimisticCart](https://shopify.dev/docs/api/hydrogen/2024-07/hooks/useoptimisticcart): The `useOptimisticCart` takes an existing cart object, processes all pending cart actions, and locally mutates the cart with optimistic state. An optimistic cart makes cart actions immediately render in the browser while actions sync to the server. This increases the perceived performance of the application.
- [cartAttributesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/cart/cartattributesupdatedefault): Creates a function that accepts an array of [AttributeInput](https://shopify.dev/docs/api/storefront/2024-07/input-objects/AttributeInput) and updates attributes to a cart
- [cartBuyerIdentityUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/cart/cartbuyeridentityupdatedefault): Creates a function that accepts an object of [CartBuyerIdentityInput](https://shopify.dev/docs/api/storefront/2024-07/input-objects/CartBuyerIdentityInput) and updates the buyer identity of a cart
- [cartCreateDefault](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/cart/cartcreatedefault): Creates a function that accepts an object of [CartInput](https://shopify.dev/docs/api/storefront/2024-07/input-objects/CartInput) and returns a new cart
- [cartDiscountCodesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/cart/cartdiscountcodesupdatedefault): Creates a function that accepts an array of strings and adds the discount codes to a cart
- [cartGetDefault](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/cart/cartgetdefault): Creates a function that returns a cart
- [cartGiftCardCodesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/cart/cartgiftcardcodesupdatedefault): Creates a function that accepts an array of strings and adds the gift card codes to a cart
- [cartLinesAddDefault](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/cart/cartlinesadddefault): Creates a function that accepts an array of [CartLineInput](https://shopify.dev/docs/api/storefront/2024-07/input-objects/CartLineInput) and adds the line items to a cart
- [cartLinesRemoveDefault](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/cart/cartlinesremovedefault): Creates a function that accepts an array of line ids and removes the line items from a cart
- [cartLinesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/cart/cartlinesupdatedefault): Creates a function that accepts an array of [CartLineUpdateInput](https://shopify.dev/docs/api/storefront/2024-07/input-objects/CartLineUpdateInput) and updates the line items in a cart
- [cartMetafieldDeleteDefault](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/cart/cartmetafielddeletedefault): Creates a function that accepts a string key and removes the matching metafield from the cart.
- [cartMetafieldsSetDefault](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/cart/cartmetafieldssetdefault): Creates a function that accepts an array of [CartMetafieldsSetInput](https://shopify.dev/docs/api/storefront/2024-07/input-objects/CartMetafieldsSetInput) without `ownerId` and set the metafields to a cart
- [cartNoteUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/cart/cartnoteupdatedefault): Creates a function that accepts a string and attaches it as a note to a cart.
- [cartSelectedDeliveryOptionsUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/cart/cartselecteddeliveryoptionsupdatedefault): Creates a function that accepts an object of [CartSelectedDeliveryOptionInput](https://shopify.dev/docs/api/storefront/2024-07/input-objects/CartSelectedDeliveryOptionInput) and updates the selected delivery option of a cart
- [createHydrogenContext](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/createhydrogencontext): The `createHydrogenContext` function creates the context object required to use Hydrogen utilities throughout a Hydrogen project.
- [createStorefrontClient](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/createstorefrontclient): This function extends `createStorefrontClient` from [Hydrogen React](https://shopify.dev/docs/api/hydrogen-react/2024-07/utilities/createstorefrontclient).
  The additional arguments enable internationalization (i18n), caching, and other features particular to Remix and Oxygen.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [Script](https://shopify.dev/docs/api/hydrogen/2024-07/components/script): Use the `Script` component to add third-party scripts to your app. It automatically adds a nonce attribute from your [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy). If you load a script that directly modifies the DOM, you are likely to have hydration errors. Use the `waitForHydration` prop to load the script after the page hydrates.
- [createContentSecurityPolicy](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/createcontentsecuritypolicy): Create a [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) to secure your application. The default content security policy includes exclusions for cdn.shopify.com and a script nonce.
- [useNonce](https://shopify.dev/docs/api/hydrogen/2024-07/hooks/usenonce): The `useNonce` hook returns the [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) nonce. Use the hook to manually add a nonce to third party scripts. The `Script` component automatically does this for you. Note, the nonce should never be available in the client, and should always return undefined in the browser.
- [useCustomerPrivacy](https://shopify.dev/docs/api/hydrogen/2024-07/hooks/usecustomerprivacy): A hook that loads the [Customer Privacy API](https://shopify.dev/docs/api/customer-privacy).

You can get the customer privacy instance with `getCustomerPrivacy()`.

- [createCustomerAccountClient](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/createcustomeraccountclient): The `createCustomerAccountClient` function creates a GraphQL client for querying the [Customer Account API](https://shopify.dev/docs/api/customer). It also provides methods to authenticate and check if the user is logged in.
- [OptimisticInput](https://shopify.dev/docs/api/hydrogen/2024-07/components/optimisticinput): Creates a form input for optimistic UI updates. Use `useOptimisticData` to update the UI with the latest optimistic data.
- [useOptimisticData](https://shopify.dev/docs/api/hydrogen/2024-07/hooks/useoptimisticdata): Gets the latest optimistic data with matching optimistic id from actions. Use `OptimisticInput` to accept optimistic data in forms.
- [Pagination](https://shopify.dev/docs/api/hydrogen/2024-07/components/pagination): The [Storefront API uses cursors](https://shopify.dev/docs/api/usage/pagination-graphql) to paginate through lists of data and the `<Pagination />` component makes it easy to paginate data from the Storefront API. It is important for pagination state to be maintained in the URL, so that the user can navigate to a product and return back to the same scrolled position in a list. It is also important that the list state is shareable via URL. The `<Pagination>` component provides a render prop with properties to load more elements into your list.
- [getPaginationVariables](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/getpaginationvariables): The `getPaginationVariables` function is used with the [`<Pagination>`](https://shopify.dev/docs/api/hydrogen/components/pagnination) component to generate the variables needed to fetch paginated data from the Storefront API. The returned variables should be used within your storefront GraphQL query.
- [VariantSelector](https://shopify.dev/docs/api/hydrogen/2024-07/components/variantselector): The `VariantSelector` component helps you build a form for selecting available variants of a product. It is important for variant selection state to be maintained in the URL, so that the user can navigate to a product and return back to the same variant selection. It is also important that the variant selection state is shareable via URL. The `VariantSelector` component provides a render prop that renders for each product option.
- [getSelectedProductOptions](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/getselectedproductoptions): The `getSelectedProductOptions` returns the selected options from the Request search parameters. The selected options can then be easily passed to your GraphQL query with [`variantBySelectedOptions`](https://shopify.dev/docs/api/storefront/2024-07/objects/product#field-product-variantbyselectedoptions).
- [useOptimisticVariant](https://shopify.dev/docs/api/hydrogen/2024-07/hooks/useoptimisticvariant): The `useOptimisticVariant` takes an existing product variant, processes a pending navigation to another product variant, and returns the data of the destination variant. This makes switching product options immediate.
- [graphiqlLoader](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/graphiqlloader): This function creates an instance of [GraphiQL](https://graphql.org/swapi-graphql) in your Hydrogen app when running on a development server. This enables you to explore, write, and test GraphQL queries using your store's live data from the Storefront API. You can visit the GraphiQL app at your storefront route /graphiql. Learn more about [using GraphiQL in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/graphiql).
- [storefrontRedirect](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/storefrontredirect): Queries the Storefront API to see if there is any redirect [created for the current route](https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect) and performs it. Otherwise, it returns the response passed in the parameters. Useful for conditionally redirecting after a 404 response.
- [getSeoMeta](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/getseometa): Generate a [Remix meta array](https://remix.run/docs/en/main/route/meta) from one or more SEO configuration objects. Pass SEO configuration for the parent route(s) and the current route to preserve meta data for all active routes. Similar to [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), each property is overwritten based on the object order. The exception is `jsonLd`, which is preserved so that each route has it's own independent jsonLd meta data. Learn more about [how SEO works in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/seo).
- [Seo](https://shopify.dev/docs/api/hydrogen/2024-07/components/seo): The `<Seo />` component renders SEO meta tags in the document `head`. Add the `<Seo />` to your `root.jsx` before the `<Meta />` and `<Link />` components. SEO metadata is set on a per-route basis using Remix [loader functions](https://remix.run/docs/en/v1/guides/data-loading). Learn more about [how SEO works in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/seo).

  **Note: the Seo component is deprecated** - Use [getSeoMeta](https://shopify.dev/docs/api/hydrogen/utilities/getseometa) to migrate.

- [getSitemap](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/getsitemap): > Caution:
  > This component is in an unstable pre-release state and may have breaking changes in a future release.

Generate a sitemap for a specific resource type. Returns a standard Response object.

- [getSitemapIndex](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/getsitemapindex): > Caution:
  > This component is in an unstable pre-release state and may have breaking changes in a future release.

Generate a sitemap index that links to separate child sitemaps for different resource types. Returns a standard Response object.

- [Image](https://shopify.dev/docs/api/hydrogen/2024-07/components/media/image): The `Image` component renders an image for the Storefront API's
  [Image object](https://shopify.dev/api/storefront/reference/common-objects/image) by using the `data` prop. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.

Images default to being responsive automatically (`width: 100%, height: auto`), and expect an `aspectRatio` prop, which ensures your image doesn't create any layout shift. For fixed-size images, you can set `width` to an exact value, and a `srcSet` with 1x, 2x, and 3x DPI variants will automatically be generated for you.

- [ExternalVideo](https://shopify.dev/docs/api/hydrogen/2024-07/components/media/externalvideo): The `ExternalVideo` component renders an embedded video for the Storefront API's [ExternalVideo object](https://shopify.dev/api/storefront/reference/products/externalvideo).
- [MediaFile](https://shopify.dev/docs/api/hydrogen/2024-07/components/media/mediafile): The `MediaFile` component renders the media for the Storefront API's
  [Media object](https://shopify.dev/api/storefront/reference/products/media). It renders an `Image`, `Video`, an `ExternalVideo`, or a `ModelViewer` depending on the `__typename` of the `data` prop.
- [Money](https://shopify.dev/docs/api/hydrogen/2024-07/components/money): The `Money` component renders a string of the Storefront API's[MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) according to the `locale` in the [`ShopifyProvider` component](/api/hydrogen/components/global/shopifyprovider).
  The component outputs a `<div>`. You can [customize this component](https://api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
- [ModelViewer](https://shopify.dev/docs/api/hydrogen/2024-07/components/media/modelviewer): The `ModelViewer` component renders a 3D model (with the `model-viewer` custom element) for the Storefront API's [Model3d object](https://shopify.dev/api/storefront/reference/products/model3d). The `model-viewer` custom element is lazily downloaded through a dynamically-injected `<script type='module'>` tag when the `<ModelViewer />` component is rendered. ModelViewer is using version `1.21.1` of the `@google/model-viewer` library.
- [ShopPayButton](https://shopify.dev/docs/api/hydrogen/2024-07/components/shoppaybutton): The `ShopPayButton` component renders a button that redirects to the Shop Pay checkout. It renders a [`<shop-pay-button>`](https://shopify.dev/custom-storefronts/tools/web-components) custom element, for which it will lazy-load the source code automatically.
- [RichText](https://shopify.dev/docs/api/hydrogen/2024-07/components/richtext): The `RichText` component renders a metafield of type `rich_text_field`. By default the rendered output uses semantic HTML tags. Customize how nodes are rendered with the `components` prop.
- [Video](https://shopify.dev/docs/api/hydrogen/2024-07/components/media/video): The `Video` component renders a video for the Storefront API's [Video object](https://shopify.dev/api/storefront/reference/products/video).
  The component outputs a `video` element. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
- [useMoney](https://shopify.dev/docs/api/hydrogen/2024-07/hooks/usemoney): The `useMoney` hook takes a [MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) and returns a
  default-formatted string of the amount with the correct currency indicator, along with some of the parts provided by
  [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
- [useLoadScript](https://shopify.dev/docs/api/hydrogen/2024-07/hooks/useloadscript): The `useLoadScript` hook loads an external script tag in the browser. It allows React components to lazy-load third-party dependencies.
- [useShopifyCookies](https://shopify.dev/docs/api/hydrogen/2024-07/hooks/useshopifycookies): Sets Shopify user and session cookies and refreshes the expiry time.
- [flattenConnection](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/flattenconnection): The `flattenConnection` utility transforms a connection object from the Storefront API (for example, [Product-related connections](https://shopify.dev/api/storefront/reference/products/product)) into a flat array of nodes. The utility works with either `nodes` or `edges.node`.

If `connection` is null or undefined, will return an empty array instead in production. In development, an error will be thrown.

- [getClientBrowserParameters](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/getclientbrowserparameters): Gathers client browser values commonly used for analytics
- [getShopifyCookies](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/getshopifycookies): Parses cookie string and returns Shopify cookies.
- [parseMetafield](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/parsemetafield): A function that uses `metafield.type` to parse the Metafield's `value` or `reference` or `references` (depending on the `metafield.type`) and places the result in `metafield.parsedValue`.
- [sendShopifyAnalytics](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/sendshopifyanalytics): Sends analytics to Shopify.
- [storefrontApiCustomScalars](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/storefrontapicustomscalars): Meant to be used with GraphQL CodeGen to type the Storefront API's custom scalars correctly when using TypeScript.By default, GraphQL CodeGen uses `any` for custom scalars; by using these definitions, GraphQL Codegen will generate the correct types for the Storefront API's custom scalars.

See more about [GraphQL CodeGen](https://graphql-code-generator.com/) and [custom scalars for TypeScript](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript#scalars).

Note that `@shopify/hydrogen-react` has already generated types for the Storefront API, so you may not need to setup GraphQL Codegen on your own.

- [parseGid](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/parsegid): Parses [Shopify Global ID (GID)](https://shopify.dev/api/usage/gids) and returns the resource type and ID.
- [Storefront Schema](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/storefront-schema): Hydrogen React ships with a pre-generated GraphQL schema for the Storefront API, which can integrate with your IDE and other GraphQL tooling (such as a [GraphQL config file](https://www.graphql-config.com/docs/user/user-usage)) to provide autocompletion and validation for your Storefront API GraphQL queries.

This schema is generated using the Storefront API's introspection query, and is available at `@shopify/hydrogen-react/storefront.schema.json`.

To get these features working in your IDE, you may need to install an extension. For example, in VSCode you can install this [GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql).

- [Storefront API Types](https://shopify.dev/docs/api/hydrogen/2024-07/utilities/storefront-api-types): If you are using TypeScript, pre-generated TypeScript types are available that match the Storefront API's GraphQL schema. These types can be used when you need to manually create an object that matches a Storefront API object's shape.

These types also work really well with the new [`satisfies` operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) introduced in TypeScript 4.9, though you don't need to use `satisfies` to use these types.

- [Analytics.CartView](https://shopify.dev/docs/api/hydrogen/2024-10/components/analytics/analytics-cartview): Publishes a `cart_viewed` event to the `Analytics.Provider` component.
- [Analytics.CollectionView](https://shopify.dev/docs/api/hydrogen/2024-10/components/analytics/analytics-collectionview): Publishes a `collection_viewed` event to the `Analytics.Provider` component.
- [Analytics.CustomView](https://shopify.dev/docs/api/hydrogen/2024-10/components/analytics/analytics-customview): Publishes a custom page view event to the `Analytics.Provider` component. The `type` prop must be preceded by `custom_`.
- [Analytics.Provider](https://shopify.dev/docs/api/hydrogen/2024-10/components/analytics/analytics-provider): Provides a context for tracking page views and cart events to send as analytics data to Shopify. This component is integrated with the Customer Privacy API for consent management. The provider can also be used to connect third-party analytics services through its subscribe and publish system. The [`useAnalytics`](https://shopify.dev/docs/api/hydrogen/2024-10/hooks/useanalytics) hook provides access to the analytics provider context.

You can also listen to a `document` event for `shopifyCustomerPrivacyApiLoaded`. It will be emitted when the Customer Privacy API is loaded.

- [Analytics.ProductView](https://shopify.dev/docs/api/hydrogen/2024-10/components/analytics/analytics-productview): Publishes a `product_viewed` event to the `Analytics.Provider` component.
- [Analytics.SearchView](https://shopify.dev/docs/api/hydrogen/2024-10/components/analytics/analytics-searchview): Publishes a `search_viewed` event to the `Analytics.Provider` component.
- [getShopAnalytics](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/getshopanalytics): A function that queries for shop required analytics data to be used in the [`Analytics.Provider`](https://shopify.dev/docs/api/hydrogen/2024-10/components/Analytics-provider) component.
- [useAnalytics](https://shopify.dev/docs/api/hydrogen/2024-10/hooks/useanalytics): A hook that provides access to the analytics provider context. Must be a descendent of [`Analytics.Provider`](https://shopify.dev/docs/api/hydrogen/2024-10/components/Analytics-provider).
- [CacheCustom](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/caching/cachecustom): This allows you to create your own caching strategy, using any of the options available in a `CachingStrategy` object.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheLong](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/caching/cachelong): The `CacheLong` strategy instructs caches to store data for 1 hour, and `staleWhileRevalidate` data for an additional 23 hours. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheNone](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/caching/cachenone): The CacheNone() strategy instructs caches not to store any data. The function accepts no arguments.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheShort](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/caching/cacheshort): The `CacheShort` strategy instructs caches to store data for 1 second, and `staleWhileRevalidate` data for an additional 9 seconds. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [InMemoryCache](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/caching/inmemorycache): > Caution:
  > This utility should only be used when deploying Hydrogen to a Node.js environment. It should _not_ be used when deploying Hydrogen to Oxygen.

If you are deploying Hydrogen to a Node.js environment, you can use this limited implementation of an in-memory cache. It only supports the `cache-control` header. It does NOT support `age` or `expires` headers.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [createWithCache](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/caching/createwithcache): Creates utility functions to store data in cache with stale-while-revalidate support.
- Use `withCache.fetch` to simply fetch data from a third-party API.
  Fetches data from a URL and caches the result according to the strategy provided.
  When the response is not successful (e.g. status code >= 400), the caching is
  skipped automatically and the returned `data` is `null`.
  You can also prevent caching by using the `shouldCacheResponse` option and returning
  `false` from the function you pass in. For example, you might want to fetch data from a
  third-party GraphQL API but not cache the result if the GraphQL response body contains errors.
- Use the more advanced `withCache.run` to execute any asynchronous operation.
  Utility function that executes asynchronous operations and caches the
  result according to the strategy provided. Use this to do any type
  of asynchronous operation where `withCache.fetch` is insufficient.
  For example, when making multiple calls to a third-party API where the
  result of all of them needs to be cached under the same cache key.
  Whatever data is returned from the `fn` will be cached according
  to the strategy provided.
  > Note:
  > To prevent caching the result you must throw an error. Otherwise, the result will be cached.
  > For example, if you call `fetch` but the response is not successful (e.g. status code >= 400),
  > you should throw an error. Otherwise, the response will be cached.
- [generateCacheControlHeader](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/caching/generatecachecontrolheader): This utility function accepts a `CachingStrategy` object and returns a string with the corresponding `cache-control` header.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CartForm](https://shopify.dev/docs/api/hydrogen/2024-10/components/cartform): Creates a form for managing cart operations. Use `CartActionInput` to accept form inputs of known type.
- [cartGetIdDefault](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/cart/cartgetiddefault): Creates a function that returns the cart id from request header cookie.
- [cartSetIdDefault](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/cart/cartsetiddefault): Creates a function that returns a header with a Set-Cookie on the cart ID.
- [createCartHandler](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/cart/createcarthandler): Creates an API that can be used to interact with the cart.
- [useOptimisticCart](https://shopify.dev/docs/api/hydrogen/2024-10/hooks/useoptimisticcart): The `useOptimisticCart` takes an existing cart object, processes all pending cart actions, and locally mutates the cart with optimistic state. An optimistic cart makes cart actions immediately render in the browser while actions sync to the server. This increases the perceived performance of the application.
- [cartAttributesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/cart/cartattributesupdatedefault): Creates a function that accepts an array of [AttributeInput](https://shopify.dev/docs/api/storefront/2024-10/input-objects/AttributeInput) and updates attributes to a cart
- [cartBuyerIdentityUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/cart/cartbuyeridentityupdatedefault): Creates a function that accepts an object of [CartBuyerIdentityInput](https://shopify.dev/docs/api/storefront/2024-10/input-objects/CartBuyerIdentityInput) and updates the buyer identity of a cart
- [cartCreateDefault](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/cart/cartcreatedefault): Creates a function that accepts an object of [CartInput](https://shopify.dev/docs/api/storefront/2024-10/input-objects/CartInput) and returns a new cart
- [cartDiscountCodesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/cart/cartdiscountcodesupdatedefault): Creates a function that accepts an array of strings and adds the discount codes to a cart
- [cartGetDefault](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/cart/cartgetdefault): Creates a function that returns a cart
- [cartGiftCardCodesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/cart/cartgiftcardcodesupdatedefault): Creates a function that accepts an array of strings and adds the gift card codes to a cart
- [cartLinesAddDefault](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/cart/cartlinesadddefault): Creates a function that accepts an array of [CartLineInput](https://shopify.dev/docs/api/storefront/2024-10/input-objects/CartLineInput) and adds the line items to a cart
- [cartLinesRemoveDefault](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/cart/cartlinesremovedefault): Creates a function that accepts an array of line ids and removes the line items from a cart
- [cartLinesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/cart/cartlinesupdatedefault): Creates a function that accepts an array of [CartLineUpdateInput](https://shopify.dev/docs/api/storefront/2024-10/input-objects/CartLineUpdateInput) and updates the line items in a cart
- [cartMetafieldDeleteDefault](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/cart/cartmetafielddeletedefault): Creates a function that accepts a string key and removes the matching metafield from the cart.
- [cartMetafieldsSetDefault](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/cart/cartmetafieldssetdefault): Creates a function that accepts an array of [CartMetafieldsSetInput](https://shopify.dev/docs/api/storefront/2024-10/input-objects/CartMetafieldsSetInput) without `ownerId` and set the metafields to a cart
- [cartNoteUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/cart/cartnoteupdatedefault): Creates a function that accepts a string and attaches it as a note to a cart.
- [cartSelectedDeliveryOptionsUpdateDefault](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/cart/cartselecteddeliveryoptionsupdatedefault): Creates a function that accepts an object of [CartSelectedDeliveryOptionInput](https://shopify.dev/docs/api/storefront/2024-10/input-objects/CartSelectedDeliveryOptionInput) and updates the selected delivery option of a cart
- [createHydrogenContext](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/createhydrogencontext): The `createHydrogenContext` function creates the context object required to use Hydrogen utilities throughout a Hydrogen project.
- [createStorefrontClient](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/createstorefrontclient): This function extends `createStorefrontClient` from [Hydrogen React](https://shopify.dev/docs/api/hydrogen-react/2024-10/utilities/createstorefrontclient).
  The additional arguments enable internationalization (i18n), caching, and other features particular to Remix and Oxygen.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [Script](https://shopify.dev/docs/api/hydrogen/2024-10/components/script): Use the `Script` component to add third-party scripts to your app. It automatically adds a nonce attribute from your [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy). If you load a script that directly modifies the DOM, you are likely to have hydration errors. Use the `waitForHydration` prop to load the script after the page hydrates.
- [createContentSecurityPolicy](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/createcontentsecuritypolicy): Create a [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) to secure your application. The default content security policy includes exclusions for cdn.shopify.com and a script nonce.
- [useNonce](https://shopify.dev/docs/api/hydrogen/2024-10/hooks/usenonce): The `useNonce` hook returns the [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) nonce. Use the hook to manually add a nonce to third party scripts. The `Script` component automatically does this for you. Note, the nonce should never be available in the client, and should always return undefined in the browser.
- [useCustomerPrivacy](https://shopify.dev/docs/api/hydrogen/2024-10/hooks/usecustomerprivacy): A hook that loads the [Customer Privacy API](https://shopify.dev/docs/api/customer-privacy).

You can also listen to a `document` event for `shopifyCustomerPrivacyApiLoaded`. It will be emitted when the Customer Privacy API is loaded.

- [createCustomerAccountClient](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/createcustomeraccountclient): The `createCustomerAccountClient` function creates a GraphQL client for querying the [Customer Account API](https://shopify.dev/docs/api/customer). It also provides methods to authenticate and check if the user is logged in.
- [OptimisticInput](https://shopify.dev/docs/api/hydrogen/2024-10/components/optimisticinput): Creates a form input for optimistic UI updates. Use `useOptimisticData` to update the UI with the latest optimistic data.
- [useOptimisticData](https://shopify.dev/docs/api/hydrogen/2024-10/hooks/useoptimisticdata): Gets the latest optimistic data with matching optimistic id from actions. Use `OptimisticInput` to accept optimistic data in forms.
- [Pagination](https://shopify.dev/docs/api/hydrogen/2024-10/components/pagination): The [Storefront API uses cursors](https://shopify.dev/docs/api/usage/pagination-graphql) to paginate through lists of data and the `<Pagination />` component makes it easy to paginate data from the Storefront API. It is important for pagination state to be maintained in the URL, so that the user can navigate to a product and return back to the same scrolled position in a list. It is also important that the list state is shareable via URL. The `<Pagination>` component provides a render prop with properties to load more elements into your list.
- [getPaginationVariables](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/getpaginationvariables): The `getPaginationVariables` function is used with the [`<Pagination>`](https://shopify.dev/docs/api/hydrogen/components/pagnination) component to generate the variables needed to fetch paginated data from the Storefront API. The returned variables should be used within your storefront GraphQL query.
- [VariantSelector](https://shopify.dev/docs/api/hydrogen/2024-10/components/variantselector): The `VariantSelector` component helps you build a form for selecting available variants of a product. It is important for variant selection state to be maintained in the URL, so that the user can navigate to a product and return back to the same variant selection. It is also important that the variant selection state is shareable via URL. The `VariantSelector` component provides a render prop that renders for each product option.
- [getSelectedProductOptions](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/getselectedproductoptions): The `getSelectedProductOptions` returns the selected options from the Request search parameters. The selected options can then be easily passed to your GraphQL query with [`variantBySelectedOptions`](https://shopify.dev/docs/api/storefront/2024-10/objects/product#field-product-variantbyselectedoptions).
- [useOptimisticVariant](https://shopify.dev/docs/api/hydrogen/2024-10/hooks/useoptimisticvariant): The `useOptimisticVariant` takes an existing product variant, processes a pending navigation to another product variant, and returns the data of the destination variant. This makes switching product options immediate.
- [graphiqlLoader](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/graphiqlloader): This function creates an instance of [GraphiQL](https://graphql.org/swapi-graphql) in your Hydrogen app when running on a development server. This enables you to explore, write, and test GraphQL queries using your store's live data from the Storefront API. You can visit the GraphiQL app at your storefront route /graphiql. Learn more about [using GraphiQL in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/graphiql).
- [storefrontRedirect](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/storefrontredirect): Queries the Storefront API to see if there is any redirect [created for the current route](https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect) and performs it. Otherwise, it returns the response passed in the parameters. Useful for conditionally redirecting after a 404 response.
- [getSeoMeta](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/getseometa): Generate a [Remix meta array](https://remix.run/docs/en/main/route/meta) from one or more SEO configuration objects. Pass SEO configuration for the parent route(s) and the current route to preserve meta data for all active routes. Similar to [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), each property is overwritten based on the object order. The exception is `jsonLd`, which is preserved so that each route has it's own independent jsonLd meta data. Learn more about [how SEO works in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/seo).
- [Seo](https://shopify.dev/docs/api/hydrogen/2024-10/components/seo): The `<Seo />` component renders SEO meta tags in the document `head`. Add the `<Seo />` to your `root.jsx` before the `<Meta />` and `<Link />` components. SEO metadata is set on a per-route basis using Remix [loader functions](https://remix.run/docs/en/v1/guides/data-loading). Learn more about [how SEO works in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/seo).

  **Note: the Seo component is deprecated** - Use [getSeoMeta](https://shopify.dev/docs/api/hydrogen/utilities/getseometa) to migrate.

- [getSitemap](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/getsitemap): Generate a sitemap for a specific resource type. Returns a standard Response object.
- [getSitemapIndex](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/getsitemapindex): Generate a sitemap index that links to separate child sitemaps for different resource types. Returns a standard Response object.
- [Image](https://shopify.dev/docs/api/hydrogen/2024-10/components/media/image): The `Image` component renders an image for the Storefront API's
  [Image object](https://shopify.dev/api/storefront/reference/common-objects/image) by using the `data` prop. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.

Images default to being responsive automatically (`width: 100%, height: auto`), and expect an `aspectRatio` prop, which ensures your image doesn't create any layout shift. For fixed-size images, you can set `width` to an exact value, and a `srcSet` with 1x, 2x, and 3x DPI variants will automatically be generated for you.

- [ExternalVideo](https://shopify.dev/docs/api/hydrogen/2024-10/components/media/externalvideo): The `ExternalVideo` component renders an embedded video for the Storefront API's [ExternalVideo object](https://shopify.dev/api/storefront/reference/products/externalvideo).
- [MediaFile](https://shopify.dev/docs/api/hydrogen/2024-10/components/media/mediafile): The `MediaFile` component renders the media for the Storefront API's
  [Media object](https://shopify.dev/api/storefront/reference/products/media). It renders an `Image`, `Video`, an `ExternalVideo`, or a `ModelViewer` depending on the `__typename` of the `data` prop.
- [Money](https://shopify.dev/docs/api/hydrogen/2024-10/components/money): The `Money` component renders a string of the Storefront API's[MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) according to the `locale` in the [`ShopifyProvider` component](/api/hydrogen/components/global/shopifyprovider).
  The component outputs a `<div>`. You can [customize this component](https://api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
- [ModelViewer](https://shopify.dev/docs/api/hydrogen/2024-10/components/media/modelviewer): The `ModelViewer` component renders a 3D model (with the `model-viewer` custom element) for the Storefront API's [Model3d object](https://shopify.dev/api/storefront/reference/products/model3d). The `model-viewer` custom element is lazily downloaded through a dynamically-injected `<script type='module'>` tag when the `<ModelViewer />` component is rendered. ModelViewer is using version `1.21.1` of the `@google/model-viewer` library.
- [ShopPayButton](https://shopify.dev/docs/api/hydrogen/2024-10/components/shoppaybutton): The `ShopPayButton` component renders a button that redirects to the Shop Pay checkout. It renders a [`<shop-pay-button>`](https://shopify.dev/custom-storefronts/tools/web-components) custom element, for which it will lazy-load the source code automatically.
- [RichText](https://shopify.dev/docs/api/hydrogen/2024-10/components/richtext): The `RichText` component renders a metafield of type `rich_text_field`. By default the rendered output uses semantic HTML tags. Customize how nodes are rendered with the `components` prop.
- [Video](https://shopify.dev/docs/api/hydrogen/2024-10/components/media/video): The `Video` component renders a video for the Storefront API's [Video object](https://shopify.dev/api/storefront/reference/products/video).
  The component outputs a `video` element. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
- [useMoney](https://shopify.dev/docs/api/hydrogen/2024-10/hooks/usemoney): The `useMoney` hook takes a [MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) and returns a
  default-formatted string of the amount with the correct currency indicator, along with some of the parts provided by
  [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
- [useLoadScript](https://shopify.dev/docs/api/hydrogen/2024-10/hooks/useloadscript): The `useLoadScript` hook loads an external script tag in the browser. It allows React components to lazy-load third-party dependencies.
- [useShopifyCookies](https://shopify.dev/docs/api/hydrogen/2024-10/hooks/useshopifycookies): Sets Shopify user and session cookies and refreshes the expiry time.
- [decodeEncodedVariant](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/decodeencodedvariant): Decodes an encoded option value string into an array of option value combinations.
- [flattenConnection](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/flattenconnection): The `flattenConnection` utility transforms a connection object from the Storefront API (for example, [Product-related connections](https://shopify.dev/api/storefront/reference/products/product)) into a flat array of nodes. The utility works with either `nodes` or `edges.node`.

If `connection` is null or undefined, will return an empty array instead in production. In development, an error will be thrown.

- [getAdjacentAndFirstAvailableVariants](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/getadjacentandfirstavailablevariants): Finds all the variants provided by `adjacentVariants`, `options.optionValues.firstAvailableVariant`, and `selectedOrFirstAvailableVariant` and return them in a single array. This function will remove any duplicated variants found.
- [getClientBrowserParameters](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/getclientbrowserparameters): Gathers client browser values commonly used for analytics
- [getProductOptions](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/getproductoptions): Returns a product options array with its relevant information about the variant. This function supports combined listing products and products with 2000 variants limit.
- [getShopifyCookies](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/getshopifycookies): Parses cookie string and returns Shopify cookies.
- [isOptionValueCombinationInEncodedVariant](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/isoptionvaluecombinationinencodedvariant): Determines whether an option value combination is present in an encoded option value string.

`targetOptionValueCombination` - Indices of option values to look up in the encoded option value string. A partial set of indices may be passed to determine whether a node or any children is present. For example, if a product has 3 options, passing `[0]` will return true if any option value combination for the first option's option value is present in the encoded string.

- [mapSelectedProductOptionToObject](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/mapselectedproductoptiontoobject): Converts the product selected option into an `Object<key, value>` format for building URL query params
- [parseGid](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/parsegid): Parses [Shopify Global ID (GID)](https://shopify.dev/api/usage/gids) and returns the resource type and ID.
- [parseMetafield](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/parsemetafield): A function that uses `metafield.type` to parse the Metafield's `value` or `reference` or `references` (depending on the `metafield.type`) and places the result in `metafield.parsedValue`.
- [sendShopifyAnalytics](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/sendshopifyanalytics): Sends analytics to Shopify.
- [useSelectedOptionInUrlParam](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/useselectedoptioninurlparam): Sets the url params to the selected option.
- [storefrontApiCustomScalars](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/storefrontapicustomscalars): Meant to be used with GraphQL CodeGen to type the Storefront API's custom scalars correctly when using TypeScript.By default, GraphQL CodeGen uses `any` for custom scalars; by using these definitions, GraphQL Codegen will generate the correct types for the Storefront API's custom scalars.

See more about [GraphQL CodeGen](https://graphql-code-generator.com/) and [custom scalars for TypeScript](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript#scalars).

Note that `@shopify/hydrogen-react` has already generated types for the Storefront API, so you may not need to setup GraphQL Codegen on your own.

- [Storefront Schema](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/storefront-schema): Hydrogen React ships with a pre-generated GraphQL schema for the Storefront API, which can integrate with your IDE and other GraphQL tooling (such as a [GraphQL config file](https://www.graphql-config.com/docs/user/user-usage)) to provide autocompletion and validation for your Storefront API GraphQL queries.

This schema is generated using the Storefront API's introspection query, and is available at `@shopify/hydrogen-react/storefront.schema.json`.

To get these features working in your IDE, you may need to install an extension. For example, in VSCode you can install this [GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql).

- [Storefront API Types](https://shopify.dev/docs/api/hydrogen/2024-10/utilities/storefront-api-types): If you are using TypeScript, pre-generated TypeScript types are available that match the Storefront API's GraphQL schema. These types can be used when you need to manually create an object that matches a Storefront API object's shape.

These types also work really well with the new [`satisfies` operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) introduced in TypeScript 4.9, though you don't need to use `satisfies` to use these types.

- [Analytics.CartView](https://shopify.dev/docs/api/hydrogen/2025-01/components/analytics/analytics-cartview): Publishes a `cart_viewed` event to the `Analytics.Provider` component.
- [Analytics.CollectionView](https://shopify.dev/docs/api/hydrogen/2025-01/components/analytics/analytics-collectionview): Publishes a `collection_viewed` event to the `Analytics.Provider` component.
- [Analytics.CustomView](https://shopify.dev/docs/api/hydrogen/2025-01/components/analytics/analytics-customview): Publishes a custom page view event to the `Analytics.Provider` component. The `type` prop must be preceded by `custom_`.
- [Analytics.Provider](https://shopify.dev/docs/api/hydrogen/2025-01/components/analytics/analytics-provider): Provides a context for tracking page views and cart events to send as analytics data to Shopify. This component is integrated with the Customer Privacy API for consent management. The provider can also be used to connect third-party analytics services through its subscribe and publish system. The [`useAnalytics`](https://shopify.dev/docs/api/hydrogen/2025-01/hooks/useanalytics) hook provides access to the analytics provider context.

You can also listen to a `document` event for `shopifyCustomerPrivacyApiLoaded`. It will be emitted when the Customer Privacy API is loaded.

- [Analytics.ProductView](https://shopify.dev/docs/api/hydrogen/2025-01/components/analytics/analytics-productview): Publishes a `product_viewed` event to the `Analytics.Provider` component.
- [Analytics.SearchView](https://shopify.dev/docs/api/hydrogen/2025-01/components/analytics/analytics-searchview): Publishes a `search_viewed` event to the `Analytics.Provider` component.
- [getShopAnalytics](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/getshopanalytics): A function that queries for shop required analytics data to be used in the [`Analytics.Provider`](https://shopify.dev/docs/api/hydrogen/2025-01/components/Analytics-provider) component.
- [useAnalytics](https://shopify.dev/docs/api/hydrogen/2025-01/hooks/useanalytics): A hook that provides access to the analytics provider context. Must be a descendent of [`Analytics.Provider`](https://shopify.dev/docs/api/hydrogen/2025-01/components/Analytics-provider).
- [CacheCustom](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/caching/cachecustom): This allows you to create your own caching strategy, using any of the options available in a `CachingStrategy` object.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheLong](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/caching/cachelong): The `CacheLong` strategy instructs caches to store data for 1 hour, and `staleWhileRevalidate` data for an additional 23 hours. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheNone](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/caching/cachenone): The CacheNone() strategy instructs caches not to store any data. The function accepts no arguments.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheShort](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/caching/cacheshort): The `CacheShort` strategy instructs caches to store data for 1 second, and `staleWhileRevalidate` data for an additional 9 seconds. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [InMemoryCache](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/caching/inmemorycache): > Caution:
  > This utility should only be used when deploying Hydrogen to a Node.js environment. It should _not_ be used when deploying Hydrogen to Oxygen.

If you are deploying Hydrogen to a Node.js environment, you can use this limited implementation of an in-memory cache. It only supports the `cache-control` header. It does NOT support `age` or `expires` headers.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [createWithCache](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/caching/createwithcache): Creates utility functions to store data in cache with stale-while-revalidate support.
- Use `withCache.fetch` to simply fetch data from a third-party API.
  Fetches data from a URL and caches the result according to the strategy provided.
  When the response is not successful (e.g. status code >= 400), the caching is
  skipped automatically and the returned `data` is `null`.
  You can also prevent caching by using the `shouldCacheResponse` option and returning
  `false` from the function you pass in. For example, you might want to fetch data from a
  third-party GraphQL API but not cache the result if the GraphQL response body contains errors.
- Use the more advanced `withCache.run` to execute any asynchronous operation.
  Utility function that executes asynchronous operations and caches the
  result according to the strategy provided. Use this to do any type
  of asynchronous operation where `withCache.fetch` is insufficient.
  For example, when making multiple calls to a third-party API where the
  result of all of them needs to be cached under the same cache key.
  Whatever data is returned from the `fn` will be cached according
  to the strategy provided.
  > Note:
  > To prevent caching the result you must throw an error. Otherwise, the result will be cached.
  > For example, if you call `fetch` but the response is not successful (e.g. status code >= 400),
  > you should throw an error. Otherwise, the response will be cached.
- [generateCacheControlHeader](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/caching/generatecachecontrolheader): This utility function accepts a `CachingStrategy` object and returns a string with the corresponding `cache-control` header.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CartForm](https://shopify.dev/docs/api/hydrogen/2025-01/components/cartform): Creates a form for managing cart operations. Use `CartActionInput` to accept form inputs of known type.
- [cartGetIdDefault](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/cart/cartgetiddefault): Creates a function that returns the cart id from request header cookie.
- [cartSetIdDefault](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/cart/cartsetiddefault): Creates a function that returns a header with a Set-Cookie on the cart ID.
- [createCartHandler](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/cart/createcarthandler): Creates an API that can be used to interact with the cart.
- [useOptimisticCart](https://shopify.dev/docs/api/hydrogen/2025-01/hooks/useoptimisticcart): The `useOptimisticCart` takes an existing cart object, processes all pending cart actions, and locally mutates the cart with optimistic state. An optimistic cart makes cart actions immediately render in the browser while actions sync to the server. This increases the perceived performance of the application.
- [cartAttributesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/cart/cartattributesupdatedefault): Creates a function that accepts an array of [AttributeInput](https://shopify.dev/docs/api/storefront/2025-01/input-objects/AttributeInput) and updates attributes to a cart
- [cartBuyerIdentityUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/cart/cartbuyeridentityupdatedefault): Creates a function that accepts an object of [CartBuyerIdentityInput](https://shopify.dev/docs/api/storefront/2025-01/input-objects/CartBuyerIdentityInput) and updates the buyer identity of a cart
- [cartCreateDefault](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/cart/cartcreatedefault): Creates a function that accepts an object of [CartInput](https://shopify.dev/docs/api/storefront/2025-01/input-objects/CartInput) and returns a new cart
- [cartDiscountCodesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/cart/cartdiscountcodesupdatedefault): Creates a function that accepts an array of strings and adds the discount codes to a cart
- [cartGetDefault](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/cart/cartgetdefault): Creates a function that returns a cart
- [cartGiftCardCodesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/cart/cartgiftcardcodesupdatedefault): Creates a function that accepts an array of strings and adds the gift card codes to a cart
- [cartLinesAddDefault](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/cart/cartlinesadddefault): Creates a function that accepts an array of [CartLineInput](https://shopify.dev/docs/api/storefront/2025-01/input-objects/CartLineInput) and adds the line items to a cart
- [cartLinesRemoveDefault](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/cart/cartlinesremovedefault): Creates a function that accepts an array of line ids and removes the line items from a cart
- [cartLinesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/cart/cartlinesupdatedefault): Creates a function that accepts an array of [CartLineUpdateInput](https://shopify.dev/docs/api/storefront/2025-01/input-objects/CartLineUpdateInput) and updates the line items in a cart
- [cartMetafieldDeleteDefault](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/cart/cartmetafielddeletedefault): Creates a function that accepts a string key and removes the matching metafield from the cart.
- [cartMetafieldsSetDefault](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/cart/cartmetafieldssetdefault): Creates a function that accepts an array of [CartMetafieldsSetInput](https://shopify.dev/docs/api/storefront/2025-01/input-objects/CartMetafieldsSetInput) without `ownerId` and set the metafields to a cart
- [cartNoteUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/cart/cartnoteupdatedefault): Creates a function that accepts a string and attaches it as a note to a cart.
- [cartSelectedDeliveryOptionsUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/cart/cartselecteddeliveryoptionsupdatedefault): Creates a function that accepts an object of [CartSelectedDeliveryOptionInput](https://shopify.dev/docs/api/storefront/2025-01/input-objects/CartSelectedDeliveryOptionInput) and updates the selected delivery option of a cart
- [createHydrogenContext](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/createhydrogencontext): The `createHydrogenContext` function creates the context object required to use Hydrogen utilities throughout a Hydrogen project.
- [createStorefrontClient](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/createstorefrontclient): This function extends `createStorefrontClient` from [Hydrogen React](https://shopify.dev/docs/api/hydrogen-react/2025-01/utilities/createstorefrontclient).
  The additional arguments enable internationalization (i18n), caching, and other features particular to Remix and Oxygen.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [Script](https://shopify.dev/docs/api/hydrogen/2025-01/components/script): Use the `Script` component to add third-party scripts to your app. It automatically adds a nonce attribute from your [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy). If you load a script that directly modifies the DOM, you are likely to have hydration errors. Use the `waitForHydration` prop to load the script after the page hydrates.
- [createContentSecurityPolicy](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/createcontentsecuritypolicy): Create a [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) to secure your application. The default content security policy includes exclusions for cdn.shopify.com and a script nonce.
- [useNonce](https://shopify.dev/docs/api/hydrogen/2025-01/hooks/usenonce): The `useNonce` hook returns the [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) nonce. Use the hook to manually add a nonce to third party scripts. The `Script` component automatically does this for you. Note, the nonce should never be available in the client, and should always return undefined in the browser.
- [useCustomerPrivacy](https://shopify.dev/docs/api/hydrogen/2025-01/hooks/usecustomerprivacy): A hook that loads the [Customer Privacy API](https://shopify.dev/docs/api/customer-privacy).

You can also listen to a `document` event for `shopifyCustomerPrivacyApiLoaded`. It will be emitted when the Customer Privacy API is loaded.

- [createCustomerAccountClient](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/createcustomeraccountclient): The `createCustomerAccountClient` function creates a GraphQL client for querying the [Customer Account API](https://shopify.dev/docs/api/customer). It also provides methods to authenticate and check if the user is logged in.
- [OptimisticInput](https://shopify.dev/docs/api/hydrogen/2025-01/components/optimisticinput): Creates a form input for optimistic UI updates. Use `useOptimisticData` to update the UI with the latest optimistic data.
- [useOptimisticData](https://shopify.dev/docs/api/hydrogen/2025-01/hooks/useoptimisticdata): Gets the latest optimistic data with matching optimistic id from actions. Use `OptimisticInput` to accept optimistic data in forms.
- [Pagination](https://shopify.dev/docs/api/hydrogen/2025-01/components/pagination): The [Storefront API uses cursors](https://shopify.dev/docs/api/usage/pagination-graphql) to paginate through lists of data and the `<Pagination />` component makes it easy to paginate data from the Storefront API. It is important for pagination state to be maintained in the URL, so that the user can navigate to a product and return back to the same scrolled position in a list. It is also important that the list state is shareable via URL. The `<Pagination>` component provides a render prop with properties to load more elements into your list.
- [getPaginationVariables](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/getpaginationvariables): The `getPaginationVariables` function is used with the [`<Pagination>`](https://shopify.dev/docs/api/hydrogen/components/pagnination) component to generate the variables needed to fetch paginated data from the Storefront API. The returned variables should be used within your storefront GraphQL query.
- [VariantSelector](https://shopify.dev/docs/api/hydrogen/2025-01/components/variantselector): The `VariantSelector` component helps you build a form for selecting available variants of a product. It is important for variant selection state to be maintained in the URL, so that the user can navigate to a product and return back to the same variant selection. It is also important that the variant selection state is shareable via URL. The `VariantSelector` component provides a render prop that renders for each product option.
- [getSelectedProductOptions](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/getselectedproductoptions): The `getSelectedProductOptions` returns the selected options from the Request search parameters. The selected options can then be easily passed to your GraphQL query with [`variantBySelectedOptions`](https://shopify.dev/docs/api/storefront/2025-01/objects/product#field-product-variantbyselectedoptions).
- [useOptimisticVariant](https://shopify.dev/docs/api/hydrogen/2025-01/hooks/useoptimisticvariant): The `useOptimisticVariant` takes an existing product variant, processes a pending navigation to another product variant, and returns the data of the destination variant. This makes switching product options immediate.
- [graphiqlLoader](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/graphiqlloader): This function creates an instance of [GraphiQL](https://graphql.org/swapi-graphql) in your Hydrogen app when running on a development server. This enables you to explore, write, and test GraphQL queries using your store's live data from the Storefront API. You can visit the GraphiQL app at your storefront route /graphiql. Learn more about [using GraphiQL in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/graphiql).
- [storefrontRedirect](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/storefrontredirect): Queries the Storefront API to see if there is any redirect [created for the current route](https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect) and performs it. Otherwise, it returns the response passed in the parameters. Useful for conditionally redirecting after a 404 response.
- [getSeoMeta](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/getseometa): Generate a [Remix meta array](https://remix.run/docs/en/main/route/meta) from one or more SEO configuration objects. Pass SEO configuration for the parent route(s) and the current route to preserve meta data for all active routes. Similar to [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), each property is overwritten based on the object order. The exception is `jsonLd`, which is preserved so that each route has it's own independent jsonLd meta data. Learn more about [how SEO works in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/seo).
- [Seo](https://shopify.dev/docs/api/hydrogen/2025-01/components/seo): The `<Seo />` component renders SEO meta tags in the document `head`. Add the `<Seo />` to your `root.jsx` before the `<Meta />` and `<Link />` components. SEO metadata is set on a per-route basis using Remix [loader functions](https://remix.run/docs/en/v1/guides/data-loading). Learn more about [how SEO works in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/seo).

  **Note: the Seo component is deprecated** - Use [getSeoMeta](https://shopify.dev/docs/api/hydrogen/utilities/getseometa) to migrate.

- [getSitemap](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/getsitemap): Generate a sitemap for a specific resource type. Returns a standard Response object.
- [getSitemapIndex](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/getsitemapindex): Generate a sitemap index that links to separate child sitemaps for different resource types. Returns a standard Response object.
- [Image](https://shopify.dev/docs/api/hydrogen/2025-01/components/media/image): The `Image` component renders an image for the Storefront API's
  [Image object](https://shopify.dev/api/storefront/reference/common-objects/image) by using the `data` prop. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.

Images default to being responsive automatically (`width: 100%, height: auto`), and expect an `aspectRatio` prop, which ensures your image doesn't create any layout shift. For fixed-size images, you can set `width` to an exact value, and a `srcSet` with 1x, 2x, and 3x DPI variants will automatically be generated for you.

- [ExternalVideo](https://shopify.dev/docs/api/hydrogen/2025-01/components/media/externalvideo): The `ExternalVideo` component renders an embedded video for the Storefront API's [ExternalVideo object](https://shopify.dev/api/storefront/reference/products/externalvideo).
- [MediaFile](https://shopify.dev/docs/api/hydrogen/2025-01/components/media/mediafile): The `MediaFile` component renders the media for the Storefront API's
  [Media object](https://shopify.dev/api/storefront/reference/products/media). It renders an `Image`, `Video`, an `ExternalVideo`, or a `ModelViewer` depending on the `__typename` of the `data` prop.
- [Money](https://shopify.dev/docs/api/hydrogen/2025-01/components/money): The `Money` component renders a string of the Storefront API's[MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) according to the `locale` in the [`ShopifyProvider` component](/api/hydrogen/components/global/shopifyprovider).
  The component outputs a `<div>`. You can [customize this component](https://api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
- [ModelViewer](https://shopify.dev/docs/api/hydrogen/2025-01/components/media/modelviewer): The `ModelViewer` component renders a 3D model (with the `model-viewer` custom element) for the Storefront API's [Model3d object](https://shopify.dev/api/storefront/reference/products/model3d). The `model-viewer` custom element is lazily downloaded through a dynamically-injected `<script type='module'>` tag when the `<ModelViewer />` component is rendered. ModelViewer is using version `1.21.1` of the `@google/model-viewer` library.
- [ShopPayButton](https://shopify.dev/docs/api/hydrogen/2025-01/components/shoppaybutton): The `ShopPayButton` component renders a button that redirects to the Shop Pay checkout. It renders a [`<shop-pay-button>`](https://shopify.dev/custom-storefronts/tools/web-components) custom element, for which it will lazy-load the source code automatically.
- [RichText](https://shopify.dev/docs/api/hydrogen/2025-01/components/richtext): The `RichText` component renders a metafield of type `rich_text_field`. By default the rendered output uses semantic HTML tags. Customize how nodes are rendered with the `components` prop.
- [Video](https://shopify.dev/docs/api/hydrogen/2025-01/components/media/video): The `Video` component renders a video for the Storefront API's [Video object](https://shopify.dev/api/storefront/reference/products/video).
  The component outputs a `video` element. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
- [useMoney](https://shopify.dev/docs/api/hydrogen/2025-01/hooks/usemoney): The `useMoney` hook takes a [MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) and returns a
  default-formatted string of the amount with the correct currency indicator, along with some of the parts provided by
  [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
- [useLoadScript](https://shopify.dev/docs/api/hydrogen/2025-01/hooks/useloadscript): The `useLoadScript` hook loads an external script tag in the browser. It allows React components to lazy-load third-party dependencies.
- [useShopifyCookies](https://shopify.dev/docs/api/hydrogen/2025-01/hooks/useshopifycookies): Sets Shopify user and session cookies and refreshes the expiry time.
- [decodeEncodedVariant](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/decodeencodedvariant): Decodes an encoded option value string into an array of option value combinations.
- [flattenConnection](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/flattenconnection): The `flattenConnection` utility transforms a connection object from the Storefront API (for example, [Product-related connections](https://shopify.dev/api/storefront/reference/products/product)) into a flat array of nodes. The utility works with either `nodes` or `edges.node`.

If `connection` is null or undefined, will return an empty array instead in production. In development, an error will be thrown.

- [getAdjacentAndFirstAvailableVariants](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/getadjacentandfirstavailablevariants): Finds all the variants provided by `adjacentVariants`, `options.optionValues.firstAvailableVariant`, and `selectedOrFirstAvailableVariant` and return them in a single array. This function will remove any duplicated variants found.
- [getClientBrowserParameters](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/getclientbrowserparameters): Gathers client browser values commonly used for analytics
- [getProductOptions](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/getproductoptions): Returns a product options array with its relevant information about the variant. This function supports combined listing products and products with 2000 variants limit.
- [getShopifyCookies](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/getshopifycookies): Parses cookie string and returns Shopify cookies.
- [isOptionValueCombinationInEncodedVariant](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/isoptionvaluecombinationinencodedvariant): Determines whether an option value combination is present in an encoded option value string.

`targetOptionValueCombination` - Indices of option values to look up in the encoded option value string. A partial set of indices may be passed to determine whether a node or any children is present. For example, if a product has 3 options, passing `[0]` will return true if any option value combination for the first option's option value is present in the encoded string.

- [mapSelectedProductOptionToObject](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/mapselectedproductoptiontoobject): Converts the product selected option into an `Object<key, value>` format for building URL query params
- [parseGid](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/parsegid): Parses [Shopify Global ID (GID)](https://shopify.dev/api/usage/gids) and returns the resource type and ID.
- [parseMetafield](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/parsemetafield): A function that uses `metafield.type` to parse the Metafield's `value` or `reference` or `references` (depending on the `metafield.type`) and places the result in `metafield.parsedValue`.
- [sendShopifyAnalytics](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/sendshopifyanalytics): Sends analytics to Shopify.
- [useSelectedOptionInUrlParam](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/useselectedoptioninurlparam): Sets the url params to the selected option.
- [storefrontApiCustomScalars](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/storefrontapicustomscalars): Meant to be used with GraphQL CodeGen to type the Storefront API's custom scalars correctly when using TypeScript.By default, GraphQL CodeGen uses `any` for custom scalars; by using these definitions, GraphQL Codegen will generate the correct types for the Storefront API's custom scalars.

See more about [GraphQL CodeGen](https://graphql-code-generator.com/) and [custom scalars for TypeScript](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript#scalars).

Note that `@shopify/hydrogen-react` has already generated types for the Storefront API, so you may not need to setup GraphQL Codegen on your own.

- [Storefront Schema](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/storefront-schema): Hydrogen React ships with a pre-generated GraphQL schema for the Storefront API, which can integrate with your IDE and other GraphQL tooling (such as a [GraphQL config file](https://www.graphql-config.com/docs/user/user-usage)) to provide autocompletion and validation for your Storefront API GraphQL queries.

This schema is generated using the Storefront API's introspection query, and is available at `@shopify/hydrogen-react/storefront.schema.json`.

To get these features working in your IDE, you may need to install an extension. For example, in VSCode you can install this [GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql).

- [Storefront API Types](https://shopify.dev/docs/api/hydrogen/2025-01/utilities/storefront-api-types): If you are using TypeScript, pre-generated TypeScript types are available that match the Storefront API's GraphQL schema. These types can be used when you need to manually create an object that matches a Storefront API object's shape.

These types also work really well with the new [`satisfies` operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) introduced in TypeScript 4.9, though you don't need to use `satisfies` to use these types.

- [Analytics.CartView](https://shopify.dev/docs/api/hydrogen/2025-05/components/analytics/analytics-cartview): Publishes a `cart_viewed` event to the `Analytics.Provider` component.
- [Analytics.CollectionView](https://shopify.dev/docs/api/hydrogen/2025-05/components/analytics/analytics-collectionview): Publishes a `collection_viewed` event to the `Analytics.Provider` component.
- [Analytics.CustomView](https://shopify.dev/docs/api/hydrogen/2025-05/components/analytics/analytics-customview): Publishes a custom page view event to the `Analytics.Provider` component. The `type` prop must be preceded by `custom_`.
- [Analytics.Provider](https://shopify.dev/docs/api/hydrogen/2025-05/components/analytics/analytics-provider): Provides a context for tracking page views and cart events to send as analytics data to Shopify. This component is integrated with the Customer Privacy API for consent management. The provider can also be used to connect third-party analytics services through its subscribe and publish system. The [`useAnalytics`](https://shopify.dev/docs/api/hydrogen/hooks/useanalytics) hook provides access to the analytics provider context.

You can also listen to a `document` event for `shopifyCustomerPrivacyApiLoaded`. It will be emitted when the Customer Privacy API is loaded.

- [Analytics.ProductView](https://shopify.dev/docs/api/hydrogen/2025-05/components/analytics/analytics-productview): Publishes a `product_viewed` event to the `Analytics.Provider` component.
- [Analytics.SearchView](https://shopify.dev/docs/api/hydrogen/2025-05/components/analytics/analytics-searchview): Publishes a `search_viewed` event to the `Analytics.Provider` component.
- [getShopAnalytics](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getshopanalytics): A function that queries for shop required analytics data to be used in the [`Analytics.Provider`](https://shopify.dev/docs/api/hydrogen/components/Analytics-provider) component.
- [useAnalytics](https://shopify.dev/docs/api/hydrogen/2025-05/hooks/useanalytics): A hook that provides access to the analytics provider context. Must be a descendent of [`Analytics.Provider`](https://shopify.dev/docs/api/hydrogen/components/Analytics-provider).
- [CacheCustom](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/caching/cachecustom): This allows you to create your own caching strategy, using any of the options available in a `CachingStrategy` object.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheLong](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/caching/cachelong): The `CacheLong` strategy instructs caches to store data for 1 hour, and `staleWhileRevalidate` data for an additional 23 hours. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheNone](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/caching/cachenone): The CacheNone() strategy instructs caches not to store any data. The function accepts no arguments.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CacheShort](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/caching/cacheshort): The `CacheShort` strategy instructs caches to store data for 1 second, and `staleWhileRevalidate` data for an additional 9 seconds. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [InMemoryCache](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/caching/inmemorycache): > Caution:
  > This utility should only be used when deploying Hydrogen to a Node.js environment. It should _not_ be used when deploying Hydrogen to Oxygen.

If you are deploying Hydrogen to a Node.js environment, you can use this limited implementation of an in-memory cache. It only supports the `cache-control` header. It does NOT support `age` or `expires` headers.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [createWithCache](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/caching/createwithcache): Creates utility functions to store data in cache with stale-while-revalidate support.
- Use `withCache.fetch` to simply fetch data from a third-party API.
  Fetches data from a URL and caches the result according to the strategy provided.
  When the response is not successful (e.g. status code >= 400), the caching is
  skipped automatically and the returned `data` is `null`.
  You can also prevent caching by using the `shouldCacheResponse` option and returning
  `false` from the function you pass in. For example, you might want to fetch data from a
  third-party GraphQL API but not cache the result if the GraphQL response body contains errors.
- Use the more advanced `withCache.run` to execute any asynchronous operation.
  Utility function that executes asynchronous operations and caches the
  result according to the strategy provided. Use this to do any type
  of asynchronous operation where `withCache.fetch` is insufficient.
  For example, when making multiple calls to a third-party API where the
  result of all of them needs to be cached under the same cache key.
  Whatever data is returned from the `fn` will be cached according
  to the strategy provided.
  > Note:
  > To prevent caching the result you must throw an error. Otherwise, the result will be cached.
  > For example, if you call `fetch` but the response is not successful (e.g. status code >= 400),
  > you should throw an error. Otherwise, the response will be cached.
- [generateCacheControlHeader](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/caching/generatecachecontrolheader): This utility function accepts a `CachingStrategy` object and returns a string with the corresponding `cache-control` header.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [CartForm](https://shopify.dev/docs/api/hydrogen/2025-05/components/cartform): Creates a form for managing cart operations. Use `CartActionInput` to accept form inputs of known type.
- [cartGetIdDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cart/cartgetiddefault): Creates a function that returns the cart id from request header cookie.
- [cartSetIdDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cart/cartsetiddefault): Creates a function that returns a header with a Set-Cookie on the cart ID.
- [createCartHandler](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cart/createcarthandler): Creates an API that can be used to interact with the cart.
- [useOptimisticCart](https://shopify.dev/docs/api/hydrogen/2025-05/hooks/useoptimisticcart): The `useOptimisticCart` takes an existing cart object, processes all pending cart actions, and locally mutates the cart with optimistic state. An optimistic cart makes cart actions immediately render in the browser while actions sync to the server. This increases the perceived performance of the application.
- [cartAttributesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cart/cartattributesupdatedefault): Creates a function that accepts an array of [AttributeInput](https://shopify.dev/docs/api/storefront/2025-04/input-objects/AttributeInput) and updates attributes to a cart
- [cartBuyerIdentityUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cart/cartbuyeridentityupdatedefault): Creates a function that accepts an object of [CartBuyerIdentityInput](https://shopify.dev/docs/api/storefront/2025-04/input-objects/CartBuyerIdentityInput) and updates the buyer identity of a cart
- [cartCreateDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cart/cartcreatedefault): Creates a function that accepts an object of [CartInput](https://shopify.dev/docs/api/storefront/2025-04/input-objects/CartInput) and returns a new cart
- [cartDeliveryAddressesAdd](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cart/cartdeliveryaddressesadd): Creates a function that accepts an array of [CartSelectableAddressInput](https://shopify.dev/docs/api/storefront/2025-04/input-objects/CartSelectableAddressInput) to add to a cart
- [cartDeliveryAddressesRemove](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cart/cartdeliveryaddressesremove): Creates a function that accepts an array of delivery address IDs [ID](https://shopify.dev/docs/api/storefront/2025-04/scalars/ID) to remove from a cart
- [cartDeliveryAddressesUpdate](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cart/cartdeliveryaddressesupdate): Creates a function that accepts an array of selectable delivery addresses [CartSelectableAddressUpdateInput](https://shopify.dev/docs/api/storefront/2025-04/input-objects/CartSelectableAddressUpdateInput) to update in a cart
- [cartDiscountCodesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cart/cartdiscountcodesupdatedefault): Creates a function that accepts an array of strings and adds the discount codes to a cart
- [cartGetDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cart/cartgetdefault): Creates a function that returns a cart
- [cartGiftCardCodesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cart/cartgiftcardcodesupdatedefault): Creates a function that accepts an array of strings and adds the gift card codes to a cart
- [cartLinesAddDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cart/cartlinesadddefault): Creates a function that accepts an array of [CartLineInput](https://shopify.dev/docs/api/storefront/2025-04/input-objects/CartLineInput) and adds the line items to a cart
- [cartLinesRemoveDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cart/cartlinesremovedefault): Creates a function that accepts an array of line ids and removes the line items from a cart
- [cartLinesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cart/cartlinesupdatedefault): Creates a function that accepts an array of [CartLineUpdateInput](https://shopify.dev/docs/api/storefront/2025-04/input-objects/CartLineUpdateInput) and updates the line items in a cart
- [cartMetafieldDeleteDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cart/cartmetafielddeletedefault): Creates a function that accepts a string key and removes the matching metafield from the cart.
- [cartMetafieldsSetDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cart/cartmetafieldssetdefault): Creates a function that accepts an array of [CartMetafieldsSetInput](https://shopify.dev/docs/api/storefront/2025-04/input-objects/CartMetafieldsSetInput) without `ownerId` and set the metafields to a cart
- [cartNoteUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cart/cartnoteupdatedefault): Creates a function that accepts a string and attaches it as a note to a cart.
- [cartSelectedDeliveryOptionsUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cart/cartselecteddeliveryoptionsupdatedefault): Creates a function that accepts an object of [CartSelectedDeliveryOptionInput](https://shopify.dev/docs/api/storefront/2025-04/input-objects/CartSelectedDeliveryOptionInput) and updates the selected delivery option of a cart
- [createHydrogenContext](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/createhydrogencontext): The `createHydrogenContext` function creates the context object required to use Hydrogen utilities throughout a Hydrogen project.
- [createStorefrontClient](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/createstorefrontclient): This function extends `createStorefrontClient` from [Hydrogen React](https://shopify.dev/docs/api/hydrogen-react/2025-04/utilities/createstorefrontclient).
  The additional arguments enable internationalization (i18n), caching, and other features particular to Remix and Oxygen.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).

- [Script](https://shopify.dev/docs/api/hydrogen/2025-05/components/script): Use the `Script` component to add third-party scripts to your app. It automatically adds a nonce attribute from your [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy). If you load a script that directly modifies the DOM, you are likely to have hydration errors. Use the `waitForHydration` prop to load the script after the page hydrates.
- [createContentSecurityPolicy](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/createcontentsecuritypolicy): Create a [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) to secure your application. The default content security policy includes exclusions for cdn.shopify.com and a script nonce.
- [useNonce](https://shopify.dev/docs/api/hydrogen/2025-05/hooks/usenonce): The `useNonce` hook returns the [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) nonce. Use the hook to manually add a nonce to third party scripts. The `Script` component automatically does this for you. Note, the nonce should never be available in the client, and should always return undefined in the browser.
- [useCustomerPrivacy](https://shopify.dev/docs/api/hydrogen/2025-05/hooks/usecustomerprivacy): A hook that loads the [Customer Privacy API](https://shopify.dev/docs/api/customer-privacy).

You can also listen to a `document` event for `shopifyCustomerPrivacyApiLoaded`. It will be emitted when the Customer Privacy API is loaded.

- [createCustomerAccountClient](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/createcustomeraccountclient): The `createCustomerAccountClient` function creates a GraphQL client for querying the [Customer Account API](https://shopify.dev/docs/api/customer). It also provides methods to authenticate and check if the user is logged in.
- [OptimisticInput](https://shopify.dev/docs/api/hydrogen/2025-05/components/optimisticinput): Creates a form input for optimistic UI updates. Use `useOptimisticData` to update the UI with the latest optimistic data.
- [useOptimisticData](https://shopify.dev/docs/api/hydrogen/2025-05/hooks/useoptimisticdata): Gets the latest optimistic data with matching optimistic id from actions. Use `OptimisticInput` to accept optimistic data in forms.
- [Pagination](https://shopify.dev/docs/api/hydrogen/2025-05/components/pagination): The [Storefront API uses cursors](https://shopify.dev/docs/api/usage/pagination-graphql) to paginate through lists of data and the `<Pagination />` component makes it easy to paginate data from the Storefront API. It is important for pagination state to be maintained in the URL, so that the user can navigate to a product and return back to the same scrolled position in a list. It is also important that the list state is shareable via URL. The `<Pagination>` component provides a render prop with properties to load more elements into your list.
- [getPaginationVariables](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getpaginationvariables): The `getPaginationVariables` function is used with the [`<Pagination>`](https://shopify.dev/docs/api/hydrogen/components/pagnination) component to generate the variables needed to fetch paginated data from the Storefront API. The returned variables should be used within your storefront GraphQL query.
- [VariantSelector](https://shopify.dev/docs/api/hydrogen/2025-05/components/variantselector): The `VariantSelector` component helps you build a form for selecting available variants of a product. It is important for variant selection state to be maintained in the URL, so that the user can navigate to a product and return back to the same variant selection. It is also important that the variant selection state is shareable via URL. The `VariantSelector` component provides a render prop that renders for each product option.
- [getSelectedProductOptions](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getselectedproductoptions): The `getSelectedProductOptions` returns the selected options from the Request search parameters. The selected options can then be easily passed to your GraphQL query with [`variantBySelectedOptions`](https://shopify.dev/docs/api/storefront/2025-04/objects/product#field-product-variantbyselectedoptions).
- [useOptimisticVariant](https://shopify.dev/docs/api/hydrogen/2025-05/hooks/useoptimisticvariant): The `useOptimisticVariant` takes an existing product variant, processes a pending navigation to another product variant, and returns the data of the destination variant. This makes switching product options immediate.
- [graphiqlLoader](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/graphiqlloader): This function creates an instance of [GraphiQL](https://graphql.org/swapi-graphql) in your Hydrogen app when running on a development server. This enables you to explore, write, and test GraphQL queries using your store's live data from the Storefront API. You can visit the GraphiQL app at your storefront route /graphiql. Learn more about [using GraphiQL in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/graphiql).
- [storefrontRedirect](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/storefrontredirect): Queries the Storefront API to see if there is any redirect [created for the current route](https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect) and performs it. Otherwise, it returns the response passed in the parameters. Useful for conditionally redirecting after a 404 response.
- [getSeoMeta](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getseometa): Generate a [Remix meta array](https://remix.run/docs/en/main/route/meta) from one or more SEO configuration objects. Pass SEO configuration for the parent route(s) and the current route to preserve meta data for all active routes. Similar to [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), each property is overwritten based on the object order. The exception is `jsonLd`, which is preserved so that each route has it's own independent jsonLd meta data. Learn more about [how SEO works in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/seo).
- [Seo](https://shopify.dev/docs/api/hydrogen/2025-05/components/seo): The `<Seo />` component renders SEO meta tags in the document `head`. Add the `<Seo />` to your `root.jsx` before the `<Meta />` and `<Link />` components. SEO metadata is set on a per-route basis using Remix [loader functions](https://remix.run/docs/en/v1/guides/data-loading). Learn more about [how SEO works in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/seo).

  **Note: the Seo component is deprecated** - Use [getSeoMeta](https://shopify.dev/docs/api/hydrogen/utilities/getseometa) to migrate.

- [getSitemap](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getsitemap): Generate a sitemap for a specific resource type. Returns a standard Response object.
- [getSitemapIndex](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getsitemapindex): Generate a sitemap index that links to separate child sitemaps for different resource types. Returns a standard Response object.
- [Image](https://shopify.dev/docs/api/hydrogen/2025-05/components/media/image): The `Image` component renders an image for the Storefront API's
  [Image object](https://shopify.dev/api/storefront/reference/common-objects/image) by using the `data` prop. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.

Images default to being responsive automatically (`width: 100%, height: auto`), and expect an `aspectRatio` prop, which ensures your image doesn't create any layout shift. For fixed-size images, you can set `width` to an exact value, and a `srcSet` with 1x, 2x, and 3x DPI variants will automatically be generated for you.

- [ExternalVideo](https://shopify.dev/docs/api/hydrogen/2025-05/components/media/externalvideo): The `ExternalVideo` component renders an embedded video for the Storefront API's [ExternalVideo object](https://shopify.dev/api/storefront/reference/products/externalvideo).
- [MediaFile](https://shopify.dev/docs/api/hydrogen/2025-05/components/media/mediafile): The `MediaFile` component renders the media for the Storefront API's
  [Media object](https://shopify.dev/api/storefront/reference/products/media). It renders an `Image`, `Video`, an `ExternalVideo`, or a `ModelViewer` depending on the `__typename` of the `data` prop.
- [Money](https://shopify.dev/docs/api/hydrogen/2025-05/components/money): The `Money` component renders a string of the Storefront API's[MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) according to the `locale` in the [`ShopifyProvider` component](/api/hydrogen/components/global/shopifyprovider).
  The component outputs a `<div>`. You can [customize this component](https://api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
- [ModelViewer](https://shopify.dev/docs/api/hydrogen/2025-05/components/media/modelviewer): The `ModelViewer` component renders a 3D model (with the `model-viewer` custom element) for the Storefront API's [Model3d object](https://shopify.dev/api/storefront/reference/products/model3d). The `model-viewer` custom element is lazily downloaded through a dynamically-injected `<script type='module'>` tag when the `<ModelViewer />` component is rendered. ModelViewer is using version `1.21.1` of the `@google/model-viewer` library.
- [ShopPayButton](https://shopify.dev/docs/api/hydrogen/2025-05/components/shoppaybutton): The `ShopPayButton` component renders a button that redirects to the Shop Pay checkout. It renders a [`<shop-pay-button>`](https://shopify.dev/custom-storefronts/tools/web-components) custom element, for which it will lazy-load the source code automatically.
- [RichText](https://shopify.dev/docs/api/hydrogen/2025-05/components/richtext): The `RichText` component renders a metafield of type `rich_text_field`. By default the rendered output uses semantic HTML tags. Customize how nodes are rendered with the `components` prop.
- [Video](https://shopify.dev/docs/api/hydrogen/2025-05/components/media/video): The `Video` component renders a video for the Storefront API's [Video object](https://shopify.dev/api/storefront/reference/products/video).
  The component outputs a `video` element. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
- [useMoney](https://shopify.dev/docs/api/hydrogen/2025-05/hooks/usemoney): The `useMoney` hook takes a [MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) and returns a
  default-formatted string of the amount with the correct currency indicator, along with some of the parts provided by
  [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
- [useLoadScript](https://shopify.dev/docs/api/hydrogen/2025-05/hooks/useloadscript): The `useLoadScript` hook loads an external script tag in the browser. It allows React components to lazy-load third-party dependencies.
- [useShopifyCookies](https://shopify.dev/docs/api/hydrogen/2025-05/hooks/useshopifycookies): Sets Shopify user and session cookies and refreshes the expiry time.
- [decodeEncodedVariant](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/decodeencodedvariant): Decodes an encoded option value string into an array of option value combinations.
- [flattenConnection](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/flattenconnection): The `flattenConnection` utility transforms a connection object from the Storefront API (for example, [Product-related connections](https://shopify.dev/api/storefront/reference/products/product)) into a flat array of nodes. The utility works with either `nodes` or `edges.node`.

If `connection` is null or undefined, will return an empty array instead in production. In development, an error will be thrown.

- [getAdjacentAndFirstAvailableVariants](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getadjacentandfirstavailablevariants): Finds all the variants provided by `adjacentVariants`, `options.optionValues.firstAvailableVariant`, and `selectedOrFirstAvailableVariant` and return them in a single array. This function will remove any duplicated variants found.
- [getClientBrowserParameters](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getclientbrowserparameters): Gathers client browser values commonly used for analytics
- [getProductOptions](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getproductoptions): Returns a product options array with its relevant information about the variant. This function supports combined listing products and products with 2000 variants limit.
- [getShopifyCookies](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getshopifycookies): Parses cookie string and returns Shopify cookies.
- [isOptionValueCombinationInEncodedVariant](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/isoptionvaluecombinationinencodedvariant): Determines whether an option value combination is present in an encoded option value string.

`targetOptionValueCombination` - Indices of option values to look up in the encoded option value string. A partial set of indices may be passed to determine whether a node or any children is present. For example, if a product has 3 options, passing `[0]` will return true if any option value combination for the first option's option value is present in the encoded string.

- [mapSelectedProductOptionToObject](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/mapselectedproductoptiontoobject): Converts the product selected option into an `Object<key, value>` format for building URL query params
- [parseGid](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/parsegid): Parses [Shopify Global ID (GID)](https://shopify.dev/api/usage/gids) and returns the resource type and ID.
- [parseMetafield](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/parsemetafield): A function that uses `metafield.type` to parse the Metafield's `value` or `reference` or `references` (depending on the `metafield.type`) and places the result in `metafield.parsedValue`.
- [sendShopifyAnalytics](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/sendshopifyanalytics): Sends analytics to Shopify.
- [useSelectedOptionInUrlParam](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/useselectedoptioninurlparam): Sets the url params to the selected option.
- [storefrontApiCustomScalars](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/storefrontapicustomscalars): Meant to be used with GraphQL CodeGen to type the Storefront API's custom scalars correctly when using TypeScript.By default, GraphQL CodeGen uses `any` for custom scalars; by using these definitions, GraphQL Codegen will generate the correct types for the Storefront API's custom scalars.

See more about [GraphQL CodeGen](https://graphql-code-generator.com/) and [custom scalars for TypeScript](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript#scalars).

Note that `@shopify/hydrogen-react` has already generated types for the Storefront API, so you may not need to setup GraphQL Codegen on your own.

- [Storefront Schema](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/storefront-schema): Hydrogen React ships with a pre-generated GraphQL schema for the Storefront API, which can integrate with your IDE and other GraphQL tooling (such as a [GraphQL config file](https://www.graphql-config.com/docs/user/user-usage)) to provide autocompletion and validation for your Storefront API GraphQL queries.

This schema is generated using the Storefront API's introspection query, and is available at `@shopify/hydrogen-react/storefront.schema.json`.

To get these features working in your IDE, you may need to install an extension. For example, in VSCode you can install this [GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql).

- [Storefront API Types](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/storefront-api-types): If you are using TypeScript, pre-generated TypeScript types are available that match the Storefront API's GraphQL schema. These types can be used when you need to manually create an object that matches a Storefront API object's shape.

These types also work really well with the new [`satisfies` operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) introduced in TypeScript 4.9, though you don't need to use `satisfies` to use these types.
