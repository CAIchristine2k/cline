# Video

The `Video` component renders a video for the Storefront API's [Video object](https://shopify.dev/api/storefront/reference/products/video).
The component outputs a `video` element. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.

```jsx
import {Video} from '@shopify/hydrogen';

export default function MyProductVideo({products}) {
  const firstMediaElement = products.edges[0].node.media.edges[0].node;

  if (firstMediaElement.__typename === 'Video') {
    return <Video data={firstMediaElement} />;
  }
}
```

```tsx
import {Video} from '@shopify/hydrogen';
import type {ProductConnection} from '@shopify/hydrogen/storefront-api-types';

export default function MyProductVideo({
  products,
}: {
  products: ProductConnection;
}) {
  const firstMediaElement = products.edges[0].node.media.edges[0].node;

  if (firstMediaElement.__typename === 'Video') {
    return <Video data={firstMediaElement} />;
  }
}
```

## Props

### VideoProps

### data

value: `PartialDeep<VideoType, {recurseIntoArrays: true}>`

An object with fields that correspond to the Storefront API's [Video object](https://shopify.dev/api/storefront/2025-04/objects/video).

### previewImageOptions

value: `LoaderParams`

- LoaderParams: {
  /** The base URL of the image \*/
  src?: ImageType['url'];
  /** The URL param that controls width _/
  width?: number;
  /\*\* The URL param that controls height _/
  height?: number;
  /\*_ The URL param that controls the cropping region _/
  crop?: Crop;
  }
  An object of image size options for the video's `previewImage`. Uses `shopifyImageLoader` to generate the `poster` URL.

### sourceProps

value: `HTMLAttributes<HTMLSourceElement> & { 'data-testid'?: string; }`

Props that will be passed to the `video` element's `source` children elements.

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

## Related

- [MediaFile](/api/hydrogen/hooks/mediafile)
- [Image](/api/hydrogen/hooks/image)
