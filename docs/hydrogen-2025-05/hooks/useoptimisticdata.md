# useOptimisticData

Gets the latest optimistic data with matching optimistic id from actions. Use `OptimisticInput` to accept optimistic data in forms.

```js
import {CartForm, OptimisticInput, useOptimisticData} from '@shopify/hydrogen';

export default function Cart({line}) {
  const optimisticId = line.id;
  const optimisticData = useOptimisticData(optimisticId);

  return (
    <div
      style={{
        // Hide the line item if the optimistic data action is remove
        // Do not remove the form from the DOM
        display: optimisticData?.action === 'remove' ? 'none' : 'block',
      }}
    >
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.LinesRemove}
        inputs={{
          lineIds: [line.id],
        }}
      >
        <button type="submit">Remove</button>
        <OptimisticInput id={optimisticId} data={{action: 'remove'}} />
      </CartForm>
    </div>
  );
}
```

```ts
import {CartForm, OptimisticInput, useOptimisticData} from '@shopify/hydrogen';
import {CartLine} from '@shopify/hydrogen-react/storefront-api-types';

type OptimisticData = {
  action: string;
};

export default function Cart({line}: {line: CartLine}) {
  const optimisticId = line.id;
  const optimisticData = useOptimisticData<OptimisticData>(optimisticId);

  return (
    <div
      style={{
        // Hide the line item if the optimistic data action is remove
        // Do not remove the form from the DOM
        display: optimisticData?.action === 'remove' ? 'none' : 'block',
      }}
    >
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.LinesRemove}
        inputs={{
          lineIds: [line.id],
        }}
      >
        <button type="submit">Remove</button>
        <OptimisticInput id={optimisticId} data={{action: 'remove'}} />
      </CartForm>
    </div>
  );
}

```

## Props

### UseOptimisticDataGeneratedType

#### Returns:

#### Params:

- identifier: string
  export function useOptimisticData<T>(identifier: string) {
  const fetchers = useFetchers();
  const data: Record<string, unknown> = {};

  for (const {formData} of fetchers) {
  if (formData?.get('optimistic-identifier') === identifier) {
  try {
  if (formData.has('optimistic-data')) {
  const dataInForm: unknown = JSON.parse(
  String(formData.get('optimistic-data')),
  );
  Object.assign(data, dataInForm);
  }
  } catch {
  // do nothing
  }
  }
  }
  return data as T;
  }
