# getSeoMeta

Generate a [Remix meta array](https://remix.run/docs/en/main/route/meta) from one or more SEO configuration objects. Pass SEO configuration for the parent route(s) and the current route to preserve meta data for all active routes. Similar to [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), each property is overwritten based on the object order. The exception is `jsonLd`, which is preserved so that each route has it's own independent jsonLd meta data. Learn more about [how SEO works in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/seo).

```js
import {getSeoMeta} from '@shopify/hydrogen';

export async function loader({context}) {
  const {shop} = await context.storefront.query(`
    query layout {
      shop {
        name
        description
      }
    }
  `);

  return {
    seo: {
      title: shop.title,
      description: shop.description,
    },
  };
}

export const meta = ({data, matches}) => {
  // Pass one or more arguments, preserving properties from parent routes
  return getSeoMeta(matches[0].data.seo, data.seo);
};

```

```ts
import {MetaFunction} from 'react-router';
import {LoaderFunctionArgs} from 'react-router';
import {getSeoMeta} from '@shopify/hydrogen';

export async function loader({context}: LoaderFunctionArgs) {
  const {shop} = await context.storefront.query(`
    query layout {
      shop {
        name
        description
      }
    }
  `);

  return {
    seo: {
      title: shop.title,
      description: shop.description,
    },
  };
}

export const meta: MetaFunction<typeof loader> = ({data, matches}) => {
  // Pass one or more arguments, preserving properties from parent routes
  return getSeoMeta((matches as any)[0].data.seo, data!.seo);
};

```

## getSeoMeta

### GetSeoMetaTypeForDocs

### seoInputs

value: `SeoConfig[]`

  - SeoConfig: export interface SeoConfig {
  /**
   * The `title` HTML element defines the document's title that is shown in a browser's title bar or a page's tab. It
   * only contains text; tags within the element are ignored.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title
   */
  title?: Maybe<string>;
  /**
   * Generate the title from a template that includes a `%s` placeholder for the title.
   *
   * @example
   * ```js
   * {
   *   title: 'My Page',
   *   titleTemplate: 'My Site - %s',
   * }
   * ```
   */
  titleTemplate?: Maybe<string> | null;
  /**
   * The media associated with the given page (images, videos, etc). If you pass a string, it will be used as the
   * `og:image` meta tag. If you pass an object or an array of objects, that will be used to generate `og:<type of
   * media>` meta tags. The `url` property should be the URL of the media. The `height` and `width` properties are
   * optional and should be the height and width of the media. The `altText` property is optional and should be a
   * description of the media.
   *
   * @example
   * ```js
   * {
   *   media: [
   *     {
   *       url: 'https://example.com/image.jpg',
   *       type: 'image',
   *       height: '400',
   *       width: '400',
   *       altText: 'A custom snowboard with an alpine color pallet.',
   *     }
   *   ]
   * }
   * ```
   *
   */
  media?:
    | Maybe<string>
    | Partial<SeoMedia>
    | (Partial<SeoMedia> | Maybe<string>)[];
  /**
   * The description of the page. This is used in the `name="description"` meta tag as well as the `og:description` meta
   * tag.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
   */
  description?: Maybe<string>;
  /**
   * The canonical URL of the page. This is used to tell search engines which URL is the canonical version of a page.
   * This is useful when you have multiple URLs that point to the same page. The value here will be used in the
   * `rel="canonical"` link tag as well as the `og:url` meta tag.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
   */
  url?: Maybe<string>;
  /**
   * The handle is used to generate the `twitter:site` and `twitter:creator` meta tags. Include the `@` symbol in the
   * handle.
   *
   * @example
   * ```js
   * {
   *   handle: '@shopify'
   * }
   * ```
   */
  handle?: Maybe<string>;
  /**
   * The `jsonLd` property is used to generate the `application/ld+json` script tag. This is used to provide structured
   * data to search engines. The value should be an object that conforms to the schema.org spec. The `type` property
   * should be the type of schema you are using. The `type` property is required and should be one of the following:
   *
   * - `Product`
   * - `ItemList`
   * - `Organization`
   * - `WebSite`
   * - `WebPage`
   * - `BlogPosting`
   * - `Thing`
   *
   * The value is validated via [schema-dts](https://www.npmjs.com/package/schema-dts)
   *
   * @example
   * ```js
   * {
   *   jsonLd: {
   *     '@context': 'https://schema.org',
   *     '@type': 'Product',
   *     name: 'My Product',
   *     image: 'https://hydrogen.shop/image.jpg',
   *     description: 'A product that is great',
   *     sku: '12345',
   *     mpn: '12345',
   *     brand: {
   *       '@type': 'Thing',
   *       name: 'My Brand',
   *     },
   *     aggregateRating: {
   *       '@type': 'AggregateRating',
   *       ratingValue: '4.5',
   *       reviewCount: '100',
   *     },
   *     offers: {
   *       '@type': 'Offer',
   *       priceCurrency: 'USD',
   *       price: '100',
   *       priceValidUntil: '2020-11-05',
   *       itemCondition: 'https://schema.org/NewCondition',
   *       availability: 'https://schema.org/InStock',
   *       seller: {
   *         '@type': 'Organization',
   *         name: 'My Brand',
   *       },
   *     },
   *   }
   * }
   * ```
   *
   * @see https://schema.org/docs/schemas.html
   * @see https://developers.google.com/search/docs/guides/intro-structured-data
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
   *
   */
  jsonLd?: WithContext<Thing> | WithContext<Thing>[];
  /**
   * The `alternates` property is used to specify the language and geographical targeting when you have multiple
   * versions of the same page in different languages. The `url` property tells search engines about these variations
   * and helps them to serve the correct version to their users.
   *
   * @example
   * ```js
   * {
   *   alternates: [
   *     {
   *       language: 'en-US',
   *       url: 'https://hydrogen.shop/en-us',
   *       default: true,
   *     },
   *     {
   *       language: 'fr-CA',
   *       url: 'https://hydrogen.shop/fr-ca',
   *     },
   *   ]
   * }
   * ```
   *
   * @see https://support.google.com/webmasters/answer/189077?hl=en
   */
  alternates?: LanguageAlternate | LanguageAlternate[];
  /**
   * The `robots` property is used to specify the robots meta tag. This is used to tell search engines which pages
   * should be indexed and which should not.
   *
   * @see https://developers.google.com/search/reference/robots_meta_tag
   */
  robots?: RobotsOptions;
}
`getSeoMeta` takes an arbitrary number of configuration object parameters. Values in each object are overwritten based on the object order. \`jsonLd\` properties are preserved between each configuration object.

### SeoConfig

### alternates

value: `LanguageAlternate | LanguageAlternate[]`

  - LanguageAlternate: export interface LanguageAlternate {
  /**
   * Language code for the alternate page. This is used to generate the hreflang meta tag property.
   */
  language: string;
  /**
   * Whether the alternate page is the default page. This will add the `x-default` attribution to the language code.
   */
  default?: boolean;
  /**
   * The url of the alternate page. This is used to generate the hreflang meta tag property.
   */
  url: string;
}
The `alternates` property is used to specify the language and geographical targeting when you have multiple versions of the same page in different languages. The `url` property tells search engines about these variations and helps them to serve the correct version to their users.

### description

value: `Maybe<string>`

The description of the page. This is used in the `name="description"` meta tag as well as the `og:description` meta tag.

### handle

value: `Maybe<string>`

The handle is used to generate the `twitter:site` and `twitter:creator` meta tags. Include the `@` symbol in the handle.

### jsonLd

value: `WithContext<Thing> | WithContext<Thing>[]`

The `jsonLd` property is used to generate the `application/ld+json` script tag. This is used to provide structured data to search engines. The value should be an object that conforms to the schema.org spec. The `type` property should be the type of schema you are using. The `type` property is required and should be one of the following:

- `Product`
- `ItemList`
- `Organization`
- `WebSite`
- `WebPage`
- `BlogPosting`
- `Thing`

The value is validated via [schema-dts](https://www.npmjs.com/package/schema-dts)

### media

value: `| Maybe<string>
    | Partial<SeoMedia>
    | (Partial<SeoMedia> | Maybe<string>)[]`

  - SeoMedia: {
  /**
   * Used to generate og:<type of media> meta tag
   */
  type: 'image' | 'video' | 'audio';
  /**
   * The url value populates both url and secure_url and is used to infer the og:<type of media>:type meta tag.
   */
  url: Maybe<string> | undefined;
  /**
   * The height in pixels of the media. This is used to generate the og:<type of media>:height meta tag.
   */
  height: Maybe<number> | undefined;
  /**
   * The width in pixels of the media. This is used to generate the og:<type of media>:width meta tag.
   */
  width: Maybe<number> | undefined;
  /**
   * The alt text for the media. This is used to generate the og:<type of media>:alt meta tag.
   */
  altText: Maybe<string> | undefined;
}
The media associated with the given page (images, videos, etc). If you pass a string, it will be used as the `og:image` meta tag. If you pass an object or an array of objects, that will be used to generate `og:<type of media>` meta tags. The `url` property should be the URL of the media. The `height` and `width` properties are optional and should be the height and width of the media. The `altText` property is optional and should be a description of the media.

### robots

value: `RobotsOptions`

  - RobotsOptions: export interface RobotsOptions {
  /**
   * Set the maximum size of an image preview for this page in a search results Can be one of the following:
   *
   * - `none` - No image preview is to be shown.
   * - `standard` - A default image preview may be shown.
   * - `large` - A larger image preview, up to the width of the viewport, may be shown.
   *
   * If no value is specified a default image preview size is used.
   */
  maxImagePreview?: 'none' | 'standard' | 'large';
  /**
   * A number representing the maximum of amount characters to use as a textual snippet for a search result. This value
   * can also be set to one of the following special values:
   *
   * - 0 - No snippet is to be shown. Equivalent to nosnippet.
   * - 1 - The Search engine will choose the snippet length that it believes is most effective to help users discover
   *   your content and direct users to your site
   * - -1 - No limit on the number of characters that can be shown in the snippet.
   */
  maxSnippet?: number;
  /**
   * The maximum number of seconds for videos on this page to show in search results. This value can also be set to one
   * of the following special values:
   *
   * - 0 - A static image may be used with the `maxImagePreview` setting.
   * - 1 - There is no limit to the size of the video preview.
   *
   * This applies to all forms of search results (at Google: web search, Google Images, Google Videos, Discover,
   * Assistant).
   */
  maxVideoPreview?: number;
  /**
   * Do not show a cached link in search results.
   */
  noArchive?: boolean;
  /**
   * Do not follow the links on this page.
   *
   * @see https://developers.google.com/search/docs/advanced/guidelines/qualify-outbound-links
   */
  noFollow?: boolean;
  /**
   * Do not index images on this page.
   */
  noImageIndex?: boolean;
  /**
   * Do not show this page, media, or resource in search results.
   */
  noIndex?: boolean;
  /**
   * Do not show a text snippet or video preview in the search results for this page.
   */
  noSnippet?: boolean;
  /**
   * Do not offer translation of this page in search results.
   */
  noTranslate?: boolean;
  /**
   * Do not show this page in search results after the specified date/time.
   */
  unavailableAfter?: string;
}
The `robots` property is used to specify the robots meta tag. This is used to tell search engines which pages should be indexed and which should not.

### title

value: `Maybe<string>`

The `title` HTML element defines the document's title that is shown in a browser's title bar or a page's tab. It only contains text; tags within the element are ignored.

### titleTemplate

value: `Maybe<string> | null`

Generate the title from a template that includes a `%s` placeholder for the title.

### url

value: `Maybe<string>`

The canonical URL of the page. This is used to tell search engines which URL is the canonical version of a page. This is useful when you have multiple URLs that point to the same page. The value here will be used in the `rel="canonical"` link tag as well as the `og:url` meta tag.

### LanguageAlternate

### default

value: `boolean`

Whether the alternate page is the default page. This will add the `x-default` attribution to the language code.

### language

value: `string`

Language code for the alternate page. This is used to generate the hreflang meta tag property.

### url

value: `string`

The url of the alternate page. This is used to generate the hreflang meta tag property.

### SeoMedia

### altText

value: `Maybe<string> | undefined`

The alt text for the media. This is used to generate the og:<type of media>:alt meta tag.

### height

value: `Maybe<number> | undefined`

The height in pixels of the media. This is used to generate the og:<type of media>:height meta tag.

### type

value: `'image' | 'video' | 'audio'`

Used to generate og:<type of media> meta tag

### url

value: `Maybe<string> | undefined`

The url value populates both url and secure_url and is used to infer the og:<type of media>:type meta tag.

### width

value: `Maybe<number> | undefined`

The width in pixels of the media. This is used to generate the og:<type of media>:width meta tag.

### RobotsOptions

### maxImagePreview

value: `'none' | 'standard' | 'large'`

Set the maximum size of an image preview for this page in a search results Can be one of the following:

- `none` - No image preview is to be shown.
- `standard` - A default image preview may be shown.
- `large` - A larger image preview, up to the width of the viewport, may be shown.

If no value is specified a default image preview size is used.

### maxSnippet

value: `number`

A number representing the maximum of amount characters to use as a textual snippet for a search result. This value can also be set to one of the following special values:

- 0 - No snippet is to be shown. Equivalent to nosnippet.
- 1 - The Search engine will choose the snippet length that it believes is most effective to help users discover   your content and direct users to your site
- -1 - No limit on the number of characters that can be shown in the snippet.

### maxVideoPreview

value: `number`

The maximum number of seconds for videos on this page to show in search results. This value can also be set to one of the following special values:

- 0 - A static image may be used with the `maxImagePreview` setting.
- 1 - There is no limit to the size of the video preview.

This applies to all forms of search results (at Google: web search, Google Images, Google Videos, Discover, Assistant).

### noArchive

value: `boolean`

Do not show a cached link in search results.

### noFollow

value: `boolean`

Do not follow the links on this page.

### noImageIndex

value: `boolean`

Do not index images on this page.

### noIndex

value: `boolean`

Do not show this page, media, or resource in search results.

### noSnippet

value: `boolean`

Do not show a text snippet or video preview in the search results for this page.

### noTranslate

value: `boolean`

Do not offer translation of this page in search results.

### unavailableAfter

value: `string`

Do not show this page in search results after the specified date/time.

