# CartForm

Creates a form for managing cart operations. Use `CartActionInput` to accept form inputs of known type.

```js
import {data} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

export default function Cart() {
  return (
    <CartForm
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{
        lines: [
          {
            id: 'gid://shopify/CartLine/123456789',
            quantity: 3,
          },
        ],
        other: 'data',
      }}
    >
      <button>Quantity up</button>
    </CartForm>
  );
}

export async function action({request, context}) {
  const {cart} = context;

  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  let status = 200;
  let result;

  if (action === CartForm.ACTIONS.LinesUpdate) {
    result = await cart.updateLines(inputs.lines);
  } else {
    invariant(false, `${action} cart action is not defined`);
  }

  const headers = cart.setCartId(result.cart.id);

  return data(result, {status, headers});
}
```

```ts
import {type ActionFunctionArgs, data} from 'react-router';
import {
  type CartQueryDataReturn,
  type HydrogenCart,
  CartForm,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

export default function Cart() {
  return (
    <CartForm
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{
        lines: [
          {
            id: 'gid://shopify/CartLine/123456789',
            quantity: 3,
          },
        ],
        other: 'data',
      }}
    >
      <button>Quantity up</button>
    </CartForm>
  );
}

export async function action({request, context}: ActionFunctionArgs) {
  const cart = context.cart as HydrogenCart;
  // cart is type HydrogenCart or HydrogenCartCustom
  // Declare cart type in remix.env.d.ts for interface AppLoadContext to avoid type casting
  // const {cart} = context;

  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  let status = 200;
  let result: CartQueryDataReturn;

  if (action === CartForm.ACTIONS.LinesUpdate) {
    result = await cart.updateLines(inputs.lines);
  } else {
    invariant(false, `${action} cart action is not defined`);
  }

  const headers = cart.setCartId(result.cart.id);

  return data(result, {status, headers});
}

```

## Props

### CartAttributesUpdateProps

### action

value: `"AttributesUpdateInput"`

### inputs

value: `{ attributes: AttributeInput[]; } & OtherFormData`

- AttributeInput: AttributeInput
- OtherFormData: OtherFormData

### CartBuyerIdentityUpdateProps

### action

value: `"BuyerIdentityUpdate"`

### inputs

value: `{ buyerIdentity: CartBuyerIdentityInput; } & OtherFormData`

- OtherFormData: OtherFormData
- CartBuyerIdentityInput: CartBuyerIdentityInput

### CartCreateProps

### action

value: `"Create"`

### inputs

value: `{ input: CartInput; } & OtherFormData`

- OtherFormData: OtherFormData
- CartInput: CartInput

### CartDiscountCodesUpdateProps

### action

value: `"DiscountCodesUpdate"`

### inputs

value: `{ discountCodes: string[]; } & OtherFormData`

- OtherFormData: OtherFormData

### CartGiftCardCodesUpdateProps

### action

value: `"GiftCardCodesUpdate"`

### inputs

value: `{ giftCardCodes: string[]; } & OtherFormData`

- OtherFormData: OtherFormData

### CartLinesAddProps

### action

value: `"LinesAdd"`

### inputs

value: `{ lines: OptimisticCartLineInput[]; } & OtherFormData`

- OtherFormData: OtherFormData
- OptimisticCartLineInput: CartLineInput & {
  selectedVariant?: unknown;
  }
- CartLineInput: CartLineInput

### CartLinesUpdateProps

### action

value: `"LinesUpdate"`

### inputs

value: `{ lines: CartLineUpdateInput[]; } & OtherFormData`

- OtherFormData: OtherFormData
- CartLineUpdateInput: CartLineUpdateInput

### CartLinesRemoveProps

### action

value: `"LinesRemove"`

### inputs

value: `{ lineIds: string[]; } & OtherFormData`

- OtherFormData: OtherFormData

### CartNoteUpdateProps

### action

value: `"NoteUpdate"`

### inputs

value: `{ note: string; } & OtherFormData`

- OtherFormData: OtherFormData

### CartSelectedDeliveryOptionsUpdateProps

### action

value: `"SelectedDeliveryOptionsUpdate"`

### inputs

value: `{ selectedDeliveryOptions: CartSelectedDeliveryOptionInput[]; } & OtherFormData`

- OtherFormData: OtherFormData
- CartSelectedDeliveryOptionInput: CartSelectedDeliveryOptionInput

### CartMetafieldsSetProps

### action

value: `"MetafieldsSet"`

### inputs

value: `{ metafields: MetafieldWithoutOwnerId[]; } & OtherFormData`

- OtherFormData: OtherFormData
- MetafieldWithoutOwnerId: MetafieldWithoutOwnerId

### CartMetafieldDeleteProps

### action

value: `"MetafieldsDelete"`

### inputs

value: `{ key: string; } & OtherFormData`

- OtherFormData: OtherFormData

### CartDeliveryAddressesAddProps

### action

value: `"DeliveryAddressesAdd"`

### inputs

value: `{ addresses: CartSelectableAddressInput[]; } & OtherFormData`

- OtherFormData: OtherFormData

### CartDeliveryAddressesRemoveProps

### action

value: `"DeliveryAddressesRemove"`

### inputs

value: `{ addressIds: string[]; } & OtherFormData`

- OtherFormData: OtherFormData

### CartDeliveryAddressesUpdateProps

### action

value: `"DeliveryAddressesUpdate"`

### inputs

value: `{ addresses: CartSelectableAddressUpdateInput[]; } & OtherFormData`

- OtherFormData: OtherFormData

### CartCustomProps

### action

value: `Custom${string}`

### inputs

value: `Record<string, unknown>`

### CartFormCommonProps

### children

value: `ReactNode | ((fetcher: FetcherWithComponents<any>) => ReactNode)`

Children nodes of CartForm. Children can be a render prop that receives the fetcher.

### fetcherKey

value: `string`

Optional key to use for the fetcher.

### route

value: `string`

The route to submit the form to. Defaults to the current route.

## Examples

Creates a form for managing cart operations. Use `CartActionInput` to accept form inputs of known type.

### CartForm using HTML input tags as form inputs

Use HTML input tags with CartForm to accept form inputs.```jsx
import {data} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

export default function Note() {
return (
<CartForm action={CartForm.ACTIONS.NoteUpdate}>
<input type="text" name="note" />
<button>Update Note</button>
</CartForm>
);
}

export async function action({request, context}) {
const cart = context.cart;

const formData = await request.formData();
const {action, inputs} = CartForm.getFormInput(formData);

let status = 200;
let result;

if (action === CartForm.ACTIONS.NoteUpdate) {
result = await cart.updateNote(inputs.note);
} else {
invariant(false, `${action} cart action is not defined`);
}

const headers = cart.setCartId(result.cart.id);

return data(result, {status, headers});
}

````

```tsx
import {type ActionFunctionArgs, data} from 'react-router';
import {
  type CartQueryDataReturn,
  type HydrogenCart,
  CartForm,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

export default function Note() {
  return (
    <CartForm action={CartForm.ACTIONS.NoteUpdate}>
      <input type="text" name="note" />
      <button>Update Note</button>
    </CartForm>
  );
}

export async function action({request, context}: ActionFunctionArgs) {
  const cart = context.cart as HydrogenCart;
  // cart is type HydrogenCart or HydrogenCartCustom
  // Declare cart type in remix.env.d.ts for interface AppLoadContext to avoid type casting
  // const {cart} = context;

  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  let status = 200;
  let result: CartQueryDataReturn;

  if (action === CartForm.ACTIONS.NoteUpdate) {
    result = await cart.updateNote(inputs.note);
  } else {
    invariant(false, `${action} cart action is not defined`);
  }

  const headers = cart.setCartId(result.cart.id);

  return data(result, {status, headers});
}

````

### Custom actions

Create custom actions to accept form inputs of unknown type. Just prepend `Custom` in front of your custom action name.```jsx
import {data} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

export default function Cart() {
return (
<CartForm
action="CustomEditInPlace"
inputs={{
        addLines: [
          {
            merchandiseId: 'gid://shopify/Product/123456789',
            quantity: 1,
          },
        ],
        removeLines: ['gid://shopify/CartLine/123456789'],
      }} >
<button>Green color swatch</button>
</CartForm>
);
}

export async function action({request, context}) {
const {cart} = context;

const formData = await request.formData();
const {action, inputs} = CartForm.getFormInput(formData);

let status = 200;
let result;

if (action === 'CustomEditInPlace') {
result = await cart.addLines(inputs.addLines);
result = await cart.removeLines(inputs.removeLines);
} else {
invariant(false, `${action} cart action is not defined`);
}

const headers = cart.setCartId(result.cart.id);

return data(result, {status, headers});
}

````

```tsx
import {type ActionFunctionArgs, data} from 'react-router';
import {
  type CartQueryDataReturn,
  type HydrogenCart,
  CartForm,
} from '@shopify/hydrogen';
import {type CartLineInput} from '@shopify/hydrogen-react/storefront-api-types';
import invariant from 'tiny-invariant';

export default function Cart() {
  return (
    <CartForm
      action="CustomEditInPlace"
      inputs={{
        addLines: [
          {
            merchandiseId: 'gid://shopify/Product/123456789',
            quantity: 1,
          },
        ],
        removeLines: ['gid://shopify/CartLine/123456789'],
      }}
    >
      <button>Green color swatch</button>
    </CartForm>
  );
}

export async function action({request, context}: ActionFunctionArgs) {
  const cart = context.cart as HydrogenCart;
  // cart is type HydrogenCart or HydrogenCartCustom
  // Declare cart type in remix.env.d.ts for interface AppLoadContext to avoid type casting
  // const {cart} = context;

  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  let status = 200;
  let result: CartQueryDataReturn;

  if (action === 'CustomEditInPlace') {
    result = await cart.addLines(inputs.addLines as CartLineInput[]);
    result = await cart.removeLines(inputs.removeLines as string[]);
  } else {
    invariant(false, `${action} cart action is not defined`);
  }

  const headers = cart.setCartId(result.cart.id);

  return data(result, {status, headers});
}

````

### CartForm with fetcher

Use `CartForm` with a fetcher to manually submit the form. An example usage is to submit the form on changes to the state of a checkbox.

When using fetcher to submit, make sure to have a `CartForm.INPUT_NAME` data key and its data should be a JSON stringify object.```jsx
import {useFetcher} from 'react-router';
import {data} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

export function ThisIsGift({metafield}) {
const fetcher = useFetcher();

const buildFormInput = (event) => ({
action: CartForm.ACTIONS.MetafieldsSet,
inputs: {
metafields: [
{
key: 'custom.gift',
type: 'boolean',
value: event.target.checked.toString(),
},
],
},
});

return (

<div>
<input
checked={metafield?.value === 'true'}
type="checkbox"
id="isGift"
onChange={(event) => {
fetcher.submit(
{
[CartForm.INPUT_NAME]: JSON.stringify(buildFormInput(event)),
},
{method: 'POST', action: '/cart'},
);
}}
/>
<label htmlFor="isGift">This is a gift</label>
</div>
);
}

export async function action({request, context}) {
const {cart} = context;

const formData = await request.formData();
const {action, inputs} = CartForm.getFormInput(formData);

let status = 200;
let result;

if (action === CartForm.ACTIONS.MetafieldsSet) {
result = await cart.setMetafields(inputs.metafields);
} else {
invariant(false, `${action} cart action is not defined`);
}

const headers = cart.setCartId(result.cart.id);

return data(result, {status, headers});
}

````

```tsx
import {useFetcher} from 'react-router';
import {type ActionFunctionArgs, data} from 'react-router';
import {
  type CartQueryDataReturn,
  type HydrogenCart,
  CartForm,
  type CartActionInput,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import type {Cart} from '@shopify/hydrogen/storefront-api-types';

export function ThisIsGift({metafield}: {metafield: Cart['metafield']}) {
  const fetcher = useFetcher();

  const buildFormInput: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => CartActionInput = (event) => ({
    action: CartForm.ACTIONS.MetafieldsSet,
    inputs: {
      metafields: [
        {
          key: 'custom.gift',
          type: 'boolean',
          value: event.target.checked.toString(),
        },
      ],
    },
  });

  return (
    <div>
      <input
        checked={metafield?.value === 'true'}
        type="checkbox"
        id="isGift"
        onChange={(event) => {
          fetcher.submit(
            {
              [CartForm.INPUT_NAME]: JSON.stringify(buildFormInput(event)),
            },
            {method: 'POST', action: '/cart'},
          );
        }}
      />
      <label htmlFor="isGift">This is a gift</label>
    </div>
  );
}

export async function action({request, context}: ActionFunctionArgs) {
  const cart = context.cart as HydrogenCart;
  // cart is type HydrogenCart or HydrogenCartCustom
  // Declare cart type in remix.env.d.ts for interface AppLoadContext to avoid type casting
  // const {cart} = context;

  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  let status = 200;
  let result: CartQueryDataReturn;

  if (action === CartForm.ACTIONS.MetafieldsSet) {
    result = await cart.setMetafields(inputs.metafields);
  } else {
    invariant(false, `${action} cart action is not defined`);
  }

  const headers = cart.setCartId(result.cart.id);

  return data(result, {status, headers});
}

````

## Examples

Creates a form for managing cart operations. Use `CartActionInput` to accept form inputs of known type.

### CartForm using HTML input tags as form inputs

Use HTML input tags with CartForm to accept form inputs.```jsx
import {data} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

export default function Note() {
return (
<CartForm action={CartForm.ACTIONS.NoteUpdate}>
<input type="text" name="note" />
<button>Update Note</button>
</CartForm>
);
}

export async function action({request, context}) {
const cart = context.cart;

const formData = await request.formData();
const {action, inputs} = CartForm.getFormInput(formData);

let status = 200;
let result;

if (action === CartForm.ACTIONS.NoteUpdate) {
result = await cart.updateNote(inputs.note);
} else {
invariant(false, `${action} cart action is not defined`);
}

const headers = cart.setCartId(result.cart.id);

return data(result, {status, headers});
}

````

```tsx
import {type ActionFunctionArgs, data} from 'react-router';
import {
  type CartQueryDataReturn,
  type HydrogenCart,
  CartForm,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

export default function Note() {
  return (
    <CartForm action={CartForm.ACTIONS.NoteUpdate}>
      <input type="text" name="note" />
      <button>Update Note</button>
    </CartForm>
  );
}

export async function action({request, context}: ActionFunctionArgs) {
  const cart = context.cart as HydrogenCart;
  // cart is type HydrogenCart or HydrogenCartCustom
  // Declare cart type in remix.env.d.ts for interface AppLoadContext to avoid type casting
  // const {cart} = context;

  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  let status = 200;
  let result: CartQueryDataReturn;

  if (action === CartForm.ACTIONS.NoteUpdate) {
    result = await cart.updateNote(inputs.note);
  } else {
    invariant(false, `${action} cart action is not defined`);
  }

  const headers = cart.setCartId(result.cart.id);

  return data(result, {status, headers});
}

````

### Custom actions

Create custom actions to accept form inputs of unknown type. Just prepend `Custom` in front of your custom action name.```jsx
import {data} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

export default function Cart() {
return (
<CartForm
action="CustomEditInPlace"
inputs={{
        addLines: [
          {
            merchandiseId: 'gid://shopify/Product/123456789',
            quantity: 1,
          },
        ],
        removeLines: ['gid://shopify/CartLine/123456789'],
      }} >
<button>Green color swatch</button>
</CartForm>
);
}

export async function action({request, context}) {
const {cart} = context;

const formData = await request.formData();
const {action, inputs} = CartForm.getFormInput(formData);

let status = 200;
let result;

if (action === 'CustomEditInPlace') {
result = await cart.addLines(inputs.addLines);
result = await cart.removeLines(inputs.removeLines);
} else {
invariant(false, `${action} cart action is not defined`);
}

const headers = cart.setCartId(result.cart.id);

return data(result, {status, headers});
}

````

```tsx
import {type ActionFunctionArgs, data} from 'react-router';
import {
  type CartQueryDataReturn,
  type HydrogenCart,
  CartForm,
} from '@shopify/hydrogen';
import {type CartLineInput} from '@shopify/hydrogen-react/storefront-api-types';
import invariant from 'tiny-invariant';

export default function Cart() {
  return (
    <CartForm
      action="CustomEditInPlace"
      inputs={{
        addLines: [
          {
            merchandiseId: 'gid://shopify/Product/123456789',
            quantity: 1,
          },
        ],
        removeLines: ['gid://shopify/CartLine/123456789'],
      }}
    >
      <button>Green color swatch</button>
    </CartForm>
  );
}

export async function action({request, context}: ActionFunctionArgs) {
  const cart = context.cart as HydrogenCart;
  // cart is type HydrogenCart or HydrogenCartCustom
  // Declare cart type in remix.env.d.ts for interface AppLoadContext to avoid type casting
  // const {cart} = context;

  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  let status = 200;
  let result: CartQueryDataReturn;

  if (action === 'CustomEditInPlace') {
    result = await cart.addLines(inputs.addLines as CartLineInput[]);
    result = await cart.removeLines(inputs.removeLines as string[]);
  } else {
    invariant(false, `${action} cart action is not defined`);
  }

  const headers = cart.setCartId(result.cart.id);

  return data(result, {status, headers});
}

````

### CartForm with fetcher

Use `CartForm` with a fetcher to manually submit the form. An example usage is to submit the form on changes to the state of a checkbox.

When using fetcher to submit, make sure to have a `CartForm.INPUT_NAME` data key and its data should be a JSON stringify object.```jsx
import {useFetcher} from 'react-router';
import {data} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

export function ThisIsGift({metafield}) {
const fetcher = useFetcher();

const buildFormInput = (event) => ({
action: CartForm.ACTIONS.MetafieldsSet,
inputs: {
metafields: [
{
key: 'custom.gift',
type: 'boolean',
value: event.target.checked.toString(),
},
],
},
});

return (

<div>
<input
checked={metafield?.value === 'true'}
type="checkbox"
id="isGift"
onChange={(event) => {
fetcher.submit(
{
[CartForm.INPUT_NAME]: JSON.stringify(buildFormInput(event)),
},
{method: 'POST', action: '/cart'},
);
}}
/>
<label htmlFor="isGift">This is a gift</label>
</div>
);
}

export async function action({request, context}) {
const {cart} = context;

const formData = await request.formData();
const {action, inputs} = CartForm.getFormInput(formData);

let status = 200;
let result;

if (action === CartForm.ACTIONS.MetafieldsSet) {
result = await cart.setMetafields(inputs.metafields);
} else {
invariant(false, `${action} cart action is not defined`);
}

const headers = cart.setCartId(result.cart.id);

return data(result, {status, headers});
}

````

```tsx
import {useFetcher} from 'react-router';
import {type ActionFunctionArgs, data} from 'react-router';
import {
  type CartQueryDataReturn,
  type HydrogenCart,
  CartForm,
  type CartActionInput,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import type {Cart} from '@shopify/hydrogen/storefront-api-types';

export function ThisIsGift({metafield}: {metafield: Cart['metafield']}) {
  const fetcher = useFetcher();

  const buildFormInput: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => CartActionInput = (event) => ({
    action: CartForm.ACTIONS.MetafieldsSet,
    inputs: {
      metafields: [
        {
          key: 'custom.gift',
          type: 'boolean',
          value: event.target.checked.toString(),
        },
      ],
    },
  });

  return (
    <div>
      <input
        checked={metafield?.value === 'true'}
        type="checkbox"
        id="isGift"
        onChange={(event) => {
          fetcher.submit(
            {
              [CartForm.INPUT_NAME]: JSON.stringify(buildFormInput(event)),
            },
            {method: 'POST', action: '/cart'},
          );
        }}
      />
      <label htmlFor="isGift">This is a gift</label>
    </div>
  );
}

export async function action({request, context}: ActionFunctionArgs) {
  const cart = context.cart as HydrogenCart;
  // cart is type HydrogenCart or HydrogenCartCustom
  // Declare cart type in remix.env.d.ts for interface AppLoadContext to avoid type casting
  // const {cart} = context;

  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  let status = 200;
  let result: CartQueryDataReturn;

  if (action === CartForm.ACTIONS.MetafieldsSet) {
    result = await cart.setMetafields(inputs.metafields);
  } else {
    invariant(false, `${action} cart action is not defined`);
  }

  const headers = cart.setCartId(result.cart.id);

  return data(result, {status, headers});
}

````
