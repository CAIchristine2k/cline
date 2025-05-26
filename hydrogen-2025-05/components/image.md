# Image

The `Image` component renders an image for the Storefront API's
[Image object](https://shopify.dev/api/storefront/reference/common-objects/image) by using the `data` prop. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.

Images default to being responsive automatically (`width: 100%, height: auto`), and expect an `aspectRatio` prop, which ensures your image doesn't create any layout shift. For fixed-size images, you can set `width` to an exact value, and a `srcSet` with 1x, 2x, and 3x DPI variants will automatically be generated for you.

```jsx
import {Image} from '@shopify/hydrogen';

// An example query
const IMAGE_QUERY = `#graphql
  query {
    product {
      featuredImage {
        altText
        url
        height
        width
      }
    }
  }
`;

export default function ProductImage({product}) {
  if (!product.featuredImage) {
    return null;
  }

  return (
    <Image
      data={product.featuredImage}
      sizes="(min-width: 45em) 50vw, 100vw"
      aspectRatio="4/5"
    />
  );
}

```

```tsx
import React from 'react';
import {Image} from '@shopify/hydrogen';
import type {Product} from '@shopify/hydrogen/storefront-api-types';

// An example query
const IMAGE_QUERY = `#graphql
  query {
    product {
      featuredImage {
        altText
        url
        height
        width
      }
    }
  }
`;

export default function ProductImage({product}: {product: Product}) {
  if (!product.featuredImage) {
    return null;
  }

  return (
    <Image
      data={product.featuredImage}
      sizes="(min-width: 45em) 50vw, 100vw"
      aspectRatio="4/5"
    />
  );
}

```

## Props

### HydrogenImageBaseProps

### aspectRatio

value: `string`

The aspect ratio of the image, in the format of `width/height`.

### crop

value: `Crop`

  - Crop: 'center' | 'top' | 'bottom' | 'left' | 'right'
The crop position of the image.

### data

value: `PartialDeep<ImageType, {recurseIntoArrays: true}>`

Data mapping to the [Storefront API `Image`](https://shopify.dev/docs/api/storefront/2025-04/objects/Image) object. Must be an Image object.

### loader

value: `Loader`

  - Loader: export type Loader = (params: LoaderParams) => string;
A function that returns a URL string for an image.

### srcSetOptions

value: `SrcSetOptions`

  - SrcSetOptions: {
  /** The number of sizes to generate */
  intervals: number;
  /** The smallest image size */
  startingWidth: number;
  /** The increment by which to increase for each size, in pixels */
  incrementSize: number;
  /** The size used for placeholder fallback images */
  placeholderWidth: number;
}
An optional prop you can use to change the default srcSet generation behaviour

### Loader

#### Returns: string

#### Params:

- params: LoaderParams
export type Loader = (params: LoaderParams) => string;


### LoaderParams

### crop

value: `Crop`

  - Crop: 'center' | 'top' | 'bottom' | 'left' | 'right'
The URL param that controls the cropping region

### height

value: `number`

The URL param that controls height

### src

value: `string`

The base URL of the image

### width

value: `number`

The URL param that controls width

### SrcSetOptions

### incrementSize

value: `number`

The increment by which to increase for each size, in pixels

### intervals

value: `number`

The number of sizes to generate

### placeholderWidth

value: `number`

The size used for placeholder fallback images

### startingWidth

value: `number`

The smallest image size

## Related

- [MediaFile](/api/hydrogen/components/mediafile)

