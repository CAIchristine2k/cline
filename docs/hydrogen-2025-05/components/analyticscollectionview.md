# Analytics.CollectionView

Publishes a `collection_viewed` event to the `Analytics.Provider` component.

```js
import {useLoaderData} from 'react-router';
import {Analytics} from '@shopify/hydrogen';

export async function loader() {
  return {
    collection: {
      id: '123',
      title: 'ABC',
      handle: 'abc',
    },
  };
}

export default function Collection() {
  const {collection} = useLoaderData();
  return (
    <div className="collection">
      <h1>{collection.title}</h1>
      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </div>
  );
}
```

```ts
import {useLoaderData} from 'react-router';
import {Analytics} from '@shopify/hydrogen';

export async function loader() {
  return {
    collection: {
      id: '123',
      title: 'ABC',
      handle: 'abc',
    },
  };
}

export default function Collection() {
  const {collection} = useLoaderData<typeof loader>();
  return (
    <div className="collection">
      <h1>{collection.title}</h1>
      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </div>
  );
}

```

## Props

### AnalyticsCollectionViewGeneratedType

#### Returns:

#### Params:

- props: CollectionViewProps
  export function AnalyticsCollectionView(props: CollectionViewProps) {
  return <AnalyticsView {...props} type="collection_viewed" />;
  }

### CollectionViewProps

### customData

value: `OtherData`

- OtherData: OtherData

### data

value: `CollectionPayload`

- CollectionPayload: {
  collection: CollectionPayloadDetails;
  }

### CollectionPayload

### collection

value: `CollectionPayloadDetails`

- CollectionPayload: {
  collection: CollectionPayloadDetails;
  }
- CollectionPayloadDetails: {
  /** The collection id. \*/
  id: string;
  /** The collection handle. \*/
  handle: string;
  }

### CollectionPayloadDetails

### handle

value: `string`

The collection handle.

### id

value: `string`

The collection id.
