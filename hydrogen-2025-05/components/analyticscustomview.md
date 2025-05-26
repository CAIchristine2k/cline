# Analytics.CustomView

Publishes a custom page view event to the `Analytics.Provider` component. The `type` prop must be preceded by `custom_`.

```js
import {Analytics} from '@shopify/hydrogen';

export default function Promotion() {
  return (
    <div className="promotion">
      <h1>Promotion page</h1>
      <Analytics.CustomView
        type="custom_promotion_viewed"
        data={{
          promotion: {
            id: '123',
          },
        }}
      />
    </div>
  );
}

```

```ts
import {Analytics} from '@shopify/hydrogen';

export default function Promotion() {
  return (
    <div className="promotion">
      <h1>Promotion page</h1>
      <Analytics.CustomView
        type="custom_promotion_viewed"
        data={{
          promotion: {
            id: '123',
          },
        }}
      />
    </div>
  );
}

```

## Props

### AnalyticsCustomViewGeneratedType

#### Returns: 

#### Params:

- props: CustomViewProps
export function AnalyticsCustomView(props: CustomViewProps) {
  return <AnalyticsView {...props} />;
}


### CustomViewProps

### customData

value: `OtherData`

  - OtherData: OtherData

### data

value: `OtherData`

  - OtherData: OtherData

### type

value: ``custom_${string}``


