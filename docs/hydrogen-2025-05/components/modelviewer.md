# ModelViewer

The `ModelViewer` component renders a 3D model (with the `model-viewer` custom element) for the Storefront API's [Model3d object](https://shopify.dev/api/storefront/reference/products/model3d). The `model-viewer` custom element is lazily downloaded through a dynamically-injected `<script type='module'>` tag when the `<ModelViewer />` component is rendered. ModelViewer is using version `1.21.1` of the `@google/model-viewer` library.

```jsx
import {ModelViewer} from '@shopify/hydrogen';

export default function MyProductModel({products}) {
  const firstMediaElement = products.nodes[0].media.nodes[0];

  if (firstMediaElement.__typename === 'Model3d') {
    return <ModelViewer data={firstMediaElement} />;
  }
}
```

```tsx
import {ModelViewer} from '@shopify/hydrogen';
import type {ProductConnection} from '@shopify/hydrogen/storefront-api-types';

export default function MyProductModel({
  products,
}: {
  products: ProductConnection;
}) {
  const firstMediaElement = products.nodes[0].media.nodes[0];
  if (firstMediaElement.__typename === 'Model3d') {
    return <ModelViewer data={firstMediaElement} />;
  }
}
```

## Props

### ModelViewerBaseProps

### data

value: `PartialDeep<Model3d, {recurseIntoArrays: true}>`

An object with fields that correspond to the Storefront API's [Model3D object](https://shopify.dev/api/storefront/2025-04/objects/model3d).

### onArStatus

value: `(event: Event) => void`

The callback to invoke when the 'ar-status' event is triggered. Refer to [ar-status in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-augmentedreality-events-arStatus).

### onArTracking

value: `(event: Event) => void`

The callback to invoke when the 'ar-tracking' event is triggered. Refer to [ar-tracking in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-augmentedreality-events-arTracking).

### onCameraChange

value: `(event: Event) => void`

The callback to invoke when the 'camera-change' event is triggered. Refer to [camera-change in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-stagingandcameras-events-cameraChange).

### onEnvironmentChange

value: `(event: Event) => void`

The callback to invoke when the 'environment-change' event is triggered. Refer to [environment-change in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-lightingandenv-events-environmentChange).

### onError

value: `(event: Event) => void`

The callback to invoke when the 'error' event is triggered. Refer to [error in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-loading-events-error).

### onLoad

value: `(event: Event) => void`

The callback to invoke when the `load` event is triggered. Refer to [load in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-loading-events-load).

### onModelVisibility

value: `(event: Event) => void`

The callback to invoke when the 'model-visibility' event is triggered. Refer to [model-visibility in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-loading-events-modelVisibility).

### onPause

value: `(event: Event) => void`

The callback to invoke when the 'pause' event is triggered. Refer to [pause in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-animation-events-pause).

### onPlay

value: `(event: Event) => void`

The callback to invoke when the 'play' event is triggered. Refer to [play in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-animation-events-play).

### onPreload

value: `(event: Event) => void`

The callback to invoke when the 'preload' event is triggered. Refer to [preload in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-loading-events-preload).

### onProgress

value: `(event: Event) => void`

The callback to invoke when the 'progress' event is triggered. Refer to [progress in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-loading-events-progress).

### onQuickLookButtonTapped

value: `(event: Event) => void`

The callback to invoke when the 'quick-look-button-tapped' event is triggered. Refer to [quick-look-button-tapped in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-augmentedreality-events-quickLookButtonTapped).

### onSceneGraphReady

value: `(event: Event) => void`

The callback to invoke when the 'scene-graph-ready' event is triggered. Refer to [scene-graph-ready in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-scenegraph-events-sceneGraphReady).

## Related

- [MediaFile](/api/hydrogen/components/mediafile)
