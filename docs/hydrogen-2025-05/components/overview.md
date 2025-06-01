## Analytics.CartView

Publishes a `cart_viewed` event to the `Analytics.Provider` component.
[View Analytics.CartView](https://shopify.dev/docs/api/hydrogen/2025-05/components/analytics-cartview)

## Analytics.CollectionView

Publishes a `collection_viewed` event to the `Analytics.Provider` component.
[View Analytics.CollectionView](https://shopify.dev/docs/api/hydrogen/2025-05/components/analytics-collectionview)

## Analytics.CustomView

Publishes a custom page view event to the `Analytics.Provider` component. The `type` prop must be preceded by `custom_`.
[View Analytics.CustomView](https://shopify.dev/docs/api/hydrogen/2025-05/components/analytics-customview)

## Analytics.Provider

Provides a context for tracking page views and cart events to send as analytics data to Shopify. This component is integrated with the Customer Privacy API for consent management. The provider can also be used to connect third-party analytics services through its subscribe and publish system. The [`useAnalytics`](https://shopify.dev/docs/api/hydrogen/hooks/useanalytics) hook provides access to the analytics provider context.

You can also listen to a `document` event for `shopifyCustomerPrivacyApiLoaded`. It will be emitted when the Customer Privacy API is loaded.
[View Analytics.Provider](https://shopify.dev/docs/api/hydrogen/2025-05/components/analytics-provider)

## Analytics.ProductView

Publishes a `product_viewed` event to the `Analytics.Provider` component.
[View Analytics.ProductView](https://shopify.dev/docs/api/hydrogen/2025-05/components/analytics-productview)

## Analytics.SearchView

Publishes a `search_viewed` event to the `Analytics.Provider` component.
[View Analytics.SearchView](https://shopify.dev/docs/api/hydrogen/2025-05/components/analytics-searchview)

## CartForm

Creates a form for managing cart operations. Use `CartActionInput` to accept form inputs of known type.
[View CartForm](https://shopify.dev/docs/api/hydrogen/2025-05/components/cartform)

## Script

Use the `Script` component to add third-party scripts to your app. It automatically adds a nonce attribute from your [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy). If you load a script that directly modifies the DOM, you are likely to have hydration errors. Use the `waitForHydration` prop to load the script after the page hydrates.
[View Script](https://shopify.dev/docs/api/hydrogen/2025-05/components/script)

## OptimisticInput

Creates a form input for optimistic UI updates. Use `useOptimisticData` to update the UI with the latest optimistic data.
[View OptimisticInput](https://shopify.dev/docs/api/hydrogen/2025-05/components/optimisticinput)

## Pagination

The [Storefront API uses cursors](https://shopify.dev/docs/api/usage/pagination-graphql) to paginate through lists of data and the `<Pagination />` component makes it easy to paginate data from the Storefront API. It is important for pagination state to be maintained in the URL, so that the user can navigate to a product and return back to the same scrolled position in a list. It is also important that the list state is shareable via URL. The `<Pagination>` component provides a render prop with properties to load more elements into your list.
[View Pagination](https://shopify.dev/docs/api/hydrogen/2025-05/components/pagination)

## VariantSelector

The `VariantSelector` component helps you build a form for selecting available variants of a product. It is important for variant selection state to be maintained in the URL, so that the user can navigate to a product and return back to the same variant selection. It is also important that the variant selection state is shareable via URL. The `VariantSelector` component provides a render prop that renders for each product option.
[View VariantSelector](https://shopify.dev/docs/api/hydrogen/2025-05/components/variantselector)

## Seo

The `<Seo />` component renders SEO meta tags in the document `head`. Add the `<Seo />` to your `root.jsx` before the `<Meta />` and `<Link />` components. SEO metadata is set on a per-route basis using Remix [loader functions](https://remix.run/docs/en/v1/guides/data-loading). Learn more about [how SEO works in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/seo).

**Note: the Seo component is deprecated** - Use [getSeoMeta](https://shopify.dev/docs/api/hydrogen/utilities/getseometa) to migrate.
[View Seo](https://shopify.dev/docs/api/hydrogen/2025-05/components/seo)

## Image

The `Image` component renders an image for the Storefront API's
[Image object](https://shopify.dev/api/storefront/reference/common-objects/image) by using the `data` prop. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.

Images default to being responsive automatically (`width: 100%, height: auto`), and expect an `aspectRatio` prop, which ensures your image doesn't create any layout shift. For fixed-size images, you can set `width` to an exact value, and a `srcSet` with 1x, 2x, and 3x DPI variants will automatically be generated for you.
[View Image](https://shopify.dev/docs/api/hydrogen/2025-05/components/image)

## ExternalVideo

The `ExternalVideo` component renders an embedded video for the Storefront API's [ExternalVideo object](https://shopify.dev/api/storefront/reference/products/externalvideo).
[View ExternalVideo](https://shopify.dev/docs/api/hydrogen/2025-05/components/externalvideo)

## MediaFile

The `MediaFile` component renders the media for the Storefront API's
[Media object](https://shopify.dev/api/storefront/reference/products/media). It renders an `Image`, `Video`, an `ExternalVideo`, or a `ModelViewer` depending on the `__typename` of the `data` prop.
[View MediaFile](https://shopify.dev/docs/api/hydrogen/2025-05/components/mediafile)

## Money

The `Money` component renders a string of the Storefront API's[MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) according to the `locale` in the [`ShopifyProvider` component](/api/hydrogen/components/global/shopifyprovider).
The component outputs a `<div>`. You can [customize this component](https://api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
[View Money](https://shopify.dev/docs/api/hydrogen/2025-05/components/money)

## ModelViewer

The `ModelViewer` component renders a 3D model (with the `model-viewer` custom element) for the Storefront API's [Model3d object](https://shopify.dev/api/storefront/reference/products/model3d). The `model-viewer` custom element is lazily downloaded through a dynamically-injected `<script type='module'>` tag when the `<ModelViewer />` component is rendered. ModelViewer is using version `1.21.1` of the `@google/model-viewer` library.
[View ModelViewer](https://shopify.dev/docs/api/hydrogen/2025-05/components/modelviewer)

## ShopPayButton

The `ShopPayButton` component renders a button that redirects to the Shop Pay checkout. It renders a [`<shop-pay-button>`](https://shopify.dev/custom-storefronts/tools/web-components) custom element, for which it will lazy-load the source code automatically.
[View ShopPayButton](https://shopify.dev/docs/api/hydrogen/2025-05/components/shoppaybutton)

## RichText

The `RichText` component renders a metafield of type `rich_text_field`. By default the rendered output uses semantic HTML tags. Customize how nodes are rendered with the `components` prop.
[View RichText](https://shopify.dev/docs/api/hydrogen/2025-05/components/richtext)

## Video

The `Video` component renders a video for the Storefront API's [Video object](https://shopify.dev/api/storefront/reference/products/video).
The component outputs a `video` element. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.
[View Video](https://shopify.dev/docs/api/hydrogen/2025-05/components/video)
