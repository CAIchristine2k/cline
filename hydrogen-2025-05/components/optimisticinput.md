# OptimisticInput

Creates a form input for optimistic UI updates. Use `useOptimisticData` to update the UI with the latest optimistic data.

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

### OptimisticInputProps

### data

value: `Record<string, unknown>`

The data to be stored in the optimistic input. Use for creating an optimistic successful state of this form action.

### id

value: `string`

A unique identifier for the optimistic input. Use the same identifier in `useOptimisticData` to retrieve the optimistic data from actions.

