## getShopAnalytics

A function that queries for shop required analytics data to be used in the [`Analytics.Provider`](https://shopify.dev/docs/api/hydrogen/components/Analytics-provider) component.
[View getShopAnalytics](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getshopanalytics)

## CacheCustom

This allows you to create your own caching strategy, using any of the options available in a `CachingStrategy` object.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).
[View CacheCustom](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cachecustom)

## CacheLong

The `CacheLong` strategy instructs caches to store data for 1 hour, and `staleWhileRevalidate` data for an additional 23 hours. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).
[View CacheLong](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cachelong)

## CacheNone

The CacheNone() strategy instructs caches not to store any data. The function accepts no arguments.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).
[View CacheNone](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cachenone)

## CacheShort

The `CacheShort` strategy instructs caches to store data for 1 second, and `staleWhileRevalidate` data for an additional 9 seconds. Note: these time values are subject to change.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).
[View CacheShort](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cacheshort)

## InMemoryCache

> Caution:
> This utility should only be used when deploying Hydrogen to a Node.js environment. It should _not_ be used when deploying Hydrogen to Oxygen.

If you are deploying Hydrogen to a Node.js environment, you can use this limited implementation of an in-memory cache. It only supports the `cache-control` header. It does NOT support `age` or `expires` headers.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).
[View InMemoryCache](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/inmemorycache)

## createWithCache

Creates utility functions to store data in cache with stale-while-revalidate support.

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

[View createWithCache](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/createwithcache)

## generateCacheControlHeader

This utility function accepts a `CachingStrategy` object and returns a string with the corresponding `cache-control` header.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).
[View generateCacheControlHeader](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/generatecachecontrolheader)

## cartGetIdDefault

Creates a function that returns the cart id from request header cookie.
[View cartGetIdDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cartgetiddefault)

## cartSetIdDefault

Creates a function that returns a header with a Set-Cookie on the cart ID.
[View cartSetIdDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cartsetiddefault)

## createCartHandler

Creates an API that can be used to interact with the cart.
[View createCartHandler](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/createcarthandler)

## cartAttributesUpdateDefault

Creates a function that accepts an array of [AttributeInput](https://shopify.dev/docs/api/storefront/2025-04/input-objects/AttributeInput) and updates attributes to a cart
[View cartAttributesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cartattributesupdatedefault)

## cartBuyerIdentityUpdateDefault

Creates a function that accepts an object of [CartBuyerIdentityInput](https://shopify.dev/docs/api/storefront/2025-04/input-objects/CartBuyerIdentityInput) and updates the buyer identity of a cart
[View cartBuyerIdentityUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cartbuyeridentityupdatedefault)

## cartCreateDefault

Creates a function that accepts an object of [CartInput](https://shopify.dev/docs/api/storefront/2025-04/input-objects/CartInput) and returns a new cart
[View cartCreateDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cartcreatedefault)

## cartDeliveryAddressesAdd

Creates a function that accepts an array of [CartSelectableAddressInput](https://shopify.dev/docs/api/storefront/2025-04/input-objects/CartSelectableAddressInput) to add to a cart
[View cartDeliveryAddressesAdd](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cartdeliveryaddressesadd)

## cartDeliveryAddressesRemove

Creates a function that accepts an array of delivery address IDs [ID](https://shopify.dev/docs/api/storefront/2025-04/scalars/ID) to remove from a cart
[View cartDeliveryAddressesRemove](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cartdeliveryaddressesremove)

## cartDeliveryAddressesUpdate

Creates a function that accepts an array of selectable delivery addresses [CartSelectableAddressUpdateInput](https://shopify.dev/docs/api/storefront/2025-04/input-objects/CartSelectableAddressUpdateInput) to update in a cart
[View cartDeliveryAddressesUpdate](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cartdeliveryaddressesupdate)

## cartDiscountCodesUpdateDefault

Creates a function that accepts an array of strings and adds the discount codes to a cart
[View cartDiscountCodesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cartdiscountcodesupdatedefault)

## cartGetDefault

Creates a function that returns a cart
[View cartGetDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cartgetdefault)

## cartGiftCardCodesUpdateDefault

Creates a function that accepts an array of strings and adds the gift card codes to a cart
[View cartGiftCardCodesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cartgiftcardcodesupdatedefault)

## cartLinesAddDefault

Creates a function that accepts an array of [CartLineInput](https://shopify.dev/docs/api/storefront/2025-04/input-objects/CartLineInput) and adds the line items to a cart
[View cartLinesAddDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cartlinesadddefault)

## cartLinesRemoveDefault

Creates a function that accepts an array of line ids and removes the line items from a cart
[View cartLinesRemoveDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cartlinesremovedefault)

## cartLinesUpdateDefault

Creates a function that accepts an array of [CartLineUpdateInput](https://shopify.dev/docs/api/storefront/2025-04/input-objects/CartLineUpdateInput) and updates the line items in a cart
[View cartLinesUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cartlinesupdatedefault)

## cartMetafieldDeleteDefault

Creates a function that accepts a string key and removes the matching metafield from the cart.
[View cartMetafieldDeleteDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cartmetafielddeletedefault)

## cartMetafieldsSetDefault

Creates a function that accepts an array of [CartMetafieldsSetInput](https://shopify.dev/docs/api/storefront/2025-04/input-objects/CartMetafieldsSetInput) without `ownerId` and set the metafields to a cart
[View cartMetafieldsSetDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cartmetafieldssetdefault)

## cartNoteUpdateDefault

Creates a function that accepts a string and attaches it as a note to a cart.
[View cartNoteUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cartnoteupdatedefault)

## cartSelectedDeliveryOptionsUpdateDefault

Creates a function that accepts an object of [CartSelectedDeliveryOptionInput](https://shopify.dev/docs/api/storefront/2025-04/input-objects/CartSelectedDeliveryOptionInput) and updates the selected delivery option of a cart
[View cartSelectedDeliveryOptionsUpdateDefault](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/cartselecteddeliveryoptionsupdatedefault)

## createHydrogenContext

The `createHydrogenContext` function creates the context object required to use Hydrogen utilities throughout a Hydrogen project.
[View createHydrogenContext](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/createhydrogencontext)

## createStorefrontClient

This function extends `createStorefrontClient` from [Hydrogen React](https://shopify.dev/docs/api/hydrogen-react/2025-04/utilities/createstorefrontclient).
The additional arguments enable internationalization (i18n), caching, and other features particular to Remix and Oxygen.

Learn more about [data fetching in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).
[View createStorefrontClient](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/createstorefrontclient)

## createContentSecurityPolicy

Create a [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) to secure your application. The default content security policy includes exclusions for cdn.shopify.com and a script nonce.
[View createContentSecurityPolicy](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/createcontentsecuritypolicy)

## createCustomerAccountClient

The `createCustomerAccountClient` function creates a GraphQL client for querying the [Customer Account API](https://shopify.dev/docs/api/customer). It also provides methods to authenticate and check if the user is logged in.
[View createCustomerAccountClient](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/createcustomeraccountclient)

## getPaginationVariables

The `getPaginationVariables` function is used with the [`<Pagination>`](https://shopify.dev/docs/api/hydrogen/components/pagnination) component to generate the variables needed to fetch paginated data from the Storefront API. The returned variables should be used within your storefront GraphQL query.
[View getPaginationVariables](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getpaginationvariables)

## getSelectedProductOptions

The `getSelectedProductOptions` returns the selected options from the Request search parameters. The selected options can then be easily passed to your GraphQL query with [`variantBySelectedOptions`](https://shopify.dev/docs/api/storefront/2025-04/objects/product#field-product-variantbyselectedoptions).
[View getSelectedProductOptions](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getselectedproductoptions)

## graphiqlLoader

This function creates an instance of [GraphiQL](https://graphql.org/swapi-graphql) in your Hydrogen app when running on a development server. This enables you to explore, write, and test GraphQL queries using your store's live data from the Storefront API. You can visit the GraphiQL app at your storefront route /graphiql. Learn more about [using GraphiQL in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/graphiql).
[View graphiqlLoader](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/graphiqlloader)

## storefrontRedirect

Queries the Storefront API to see if there is any redirect [created for the current route](https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect) and performs it. Otherwise, it returns the response passed in the parameters. Useful for conditionally redirecting after a 404 response.
[View storefrontRedirect](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/storefrontredirect)

## getSeoMeta

Generate a [Remix meta array](https://remix.run/docs/en/main/route/meta) from one or more SEO configuration objects. Pass SEO configuration for the parent route(s) and the current route to preserve meta data for all active routes. Similar to [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), each property is overwritten based on the object order. The exception is `jsonLd`, which is preserved so that each route has it's own independent jsonLd meta data. Learn more about [how SEO works in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/seo).
[View getSeoMeta](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getseometa)

## getSitemap

Generate a sitemap for a specific resource type. Returns a standard Response object.
[View getSitemap](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getsitemap)

## getSitemapIndex

Generate a sitemap index that links to separate child sitemaps for different resource types. Returns a standard Response object.
[View getSitemapIndex](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getsitemapindex)

## decodeEncodedVariant

Decodes an encoded option value string into an array of option value combinations.
[View decodeEncodedVariant](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/decodeencodedvariant)

## flattenConnection

    The `flattenConnection` utility transforms a connection object from the Storefront API (for example, [Product-related connections](https://shopify.dev/api/storefront/reference/products/product)) into a flat array of nodes. The utility works with either `nodes` or `edges.node`.

If `connection` is null or undefined, will return an empty array instead in production. In development, an error will be thrown.

[View flattenConnection](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/flattenconnection)

## getAdjacentAndFirstAvailableVariants

Finds all the variants provided by `adjacentVariants`, `options.optionValues.firstAvailableVariant`, and `selectedOrFirstAvailableVariant` and return them in a single array. This function will remove any duplicated variants found.
[View getAdjacentAndFirstAvailableVariants](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getadjacentandfirstavailablevariants)

## getClientBrowserParameters

Gathers client browser values commonly used for analytics
[View getClientBrowserParameters](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getclientbrowserparameters)

## getProductOptions

Returns a product options array with its relevant information about the variant. This function supports combined listing products and products with 2000 variants limit.
[View getProductOptions](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getproductoptions)

## getShopifyCookies

Parses cookie string and returns Shopify cookies.
[View getShopifyCookies](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/getshopifycookies)

## isOptionValueCombinationInEncodedVariant

    Determines whether an option value combination is present in an encoded option value string.

`targetOptionValueCombination` - Indices of option values to look up in the encoded option value string. A partial set of indices may be passed to determine whether a node or any children is present. For example, if a product has 3 options, passing `[0]` will return true if any option value combination for the first option's option value is present in the encoded string.

[View isOptionValueCombinationInEncodedVariant](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/isoptionvaluecombinationinencodedvariant)

## mapSelectedProductOptionToObject

Converts the product selected option into an `Object<key, value>` format for building URL query params
[View mapSelectedProductOptionToObject](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/mapselectedproductoptiontoobject)

## parseGid

    Parses [Shopify Global ID (GID)](https://shopify.dev/api/usage/gids) and returns the resource type and ID.

[View parseGid](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/parsegid)

## parseMetafield

    A function that uses `metafield.type` to parse the Metafield's `value` or `reference` or `references` (depending on the `metafield.type`) and places the result in `metafield.parsedValue`.

[View parseMetafield](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/parsemetafield)

## sendShopifyAnalytics

Sends analytics to Shopify.
[View sendShopifyAnalytics](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/sendshopifyanalytics)

## useSelectedOptionInUrlParam

Sets the url params to the selected option.
[View useSelectedOptionInUrlParam](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/useselectedoptioninurlparam)

## storefrontApiCustomScalars

    Meant to be used with GraphQL CodeGen to type the Storefront API's custom scalars correctly when using TypeScript.By default, GraphQL CodeGen uses `any` for custom scalars; by using these definitions, GraphQL Codegen will generate the correct types for the Storefront API's custom scalars.

See more about [GraphQL CodeGen](https://graphql-code-generator.com/) and [custom scalars for TypeScript](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript#scalars).

Note that `@shopify/hydrogen-react` has already generated types for the Storefront API, so you may not need to setup GraphQL Codegen on your own.

[View storefrontApiCustomScalars](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/storefrontapicustomscalars)

## Storefront Schema

    Hydrogen React ships with a pre-generated GraphQL schema for the Storefront API, which can integrate with your IDE and other GraphQL tooling (such as a [GraphQL config file](https://www.graphql-config.com/docs/user/user-usage)) to provide autocompletion and validation for your Storefront API GraphQL queries.

This schema is generated using the Storefront API's introspection query, and is available at `@shopify/hydrogen-react/storefront.schema.json`.

To get these features working in your IDE, you may need to install an extension. For example, in VSCode you can install this [GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql).

[View Storefront Schema](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/storefront-schema)

## Storefront API Types

    If you are using TypeScript, pre-generated TypeScript types are available that match the Storefront API's GraphQL schema. These types can be used when you need to manually create an object that matches a Storefront API object's shape.

These types also work really well with the new [`satisfies` operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) introduced in TypeScript 4.9, though you don't need to use `satisfies` to use these types.

[View Storefront API Types](https://shopify.dev/docs/api/hydrogen/2025-05/utilities/storefront-api-types)
