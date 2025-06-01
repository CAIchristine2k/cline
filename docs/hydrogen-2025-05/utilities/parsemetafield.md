# parseMetafield

    A function that uses `metafield.type` to parse the Metafield's `value` or `reference` or `references` (depending on the `metafield.type`) and places the result in `metafield.parsedValue`.

```jsx
import {parseMetafield} from '@shopify/hydrogen';

export function DateMetafield({metafield}) {
  const parsedMetafield = parseMetafield(metafield);

  return <div>Date: {parsedMetafield.parsedValue?.toDateString()}</div>;
}

export function VariantReferenceMetafield({metafield}) {
  const parsedMetafield = parseMetafield(metafield);

  return <div>Variant title: {parsedMetafield.parsedValue?.title}</div>;
}

export function ListCollectionReferenceMetafield({metafield}) {
  const parsedMetafield = parseMetafield(metafield);

  return (
    <div>
      The first collection title: {parsedMetafield.parsedValue?.[0].title}
    </div>
  );
}
```

```tsx
import {parseMetafield, type ParsedMetafields} from '@shopify/hydrogen';
import type {Metafield} from '@shopify/hydrogen/storefront-api-types';

export function DateMetafield({metafield}: {metafield: Metafield}) {
  const parsedMetafield = parseMetafield<ParsedMetafields['date']>(metafield);

  return <div>Date: {parsedMetafield.parsedValue?.toDateString()}</div>;
}

export function VariantReferenceMetafield({metafield}: {metafield: Metafield}) {
  const parsedMetafield =
    parseMetafield<ParsedMetafields['variant_reference']>(metafield);

  return <div>Variant title: {parsedMetafield.parsedValue?.title}</div>;
}

export function ListCollectionReferenceMetafield({
  metafield,
}: {
  metafield: Metafield;
}) {
  const parsedMetafield =
    parseMetafield<ParsedMetafields['list.collection_reference']>(metafield);

  return (
    <div>
      The first collection title: {parsedMetafield.parsedValue?.[0].title}
    </div>
  );
}
```

## Props

Use the `ParsedMetafields` type as the returned type of `parseMetafield(metafield)`

### ParseMetafieldGeneratedType

A function that uses `metafield.type` to parse the Metafield's `value` or `reference` or `references` (depending on the `metafield.type`) and places the result in `metafield.parsedValue`

TypeScript developers can use the type `ParsedMetafields` from this package to get the returned object's type correct. For example:

`parseMetafield<ParsedMetafields['boolean']>({type: 'boolean', value: 'false'}`

#### Returns: ReturnGeneric

#### Params:

- metafield: PartialObjectDeep<Metafield, { recurseIntoArrays: true; }>
  export function parseMetafield<ReturnGeneric>(
  metafield: PartialDeep<MetafieldBaseType, {recurseIntoArrays: true}>,
  ): ReturnGeneric {
  if (!metafield.type) {
  const noTypeError = `parseMetafield(): The 'type' field is required in order to parse the Metafield.`;
  if (**HYDROGEN_DEV**) {
  throw new Error(noTypeError);
  } else {
  console.error(`${noTypeError} Returning 'parsedValue' of 'null'`);
  return {
  ...metafield,
  parsedValue: null,
  } as ReturnGeneric;
  }
  }

  switch (metafield.type) {
  case 'boolean':
  return {
  ...metafield,
  parsedValue: metafield.value === 'true',
  } as ReturnGeneric;

      case 'collection_reference':
      case 'file_reference':
      case 'page_reference':
      case 'product_reference':
      case 'variant_reference':
        return {
          ...metafield,
          parsedValue: metafield.reference,
        } as ReturnGeneric;

      case 'color':
      case 'multi_line_text_field':
      case 'single_line_text_field':
      case 'url':
        return {
          ...metafield,
          parsedValue: metafield.value,
        } as ReturnGeneric;

      // TODO: 'money' should probably be parsed even further to like `useMoney()`, but that logic needs to be extracted first so it's not a hook
      case 'dimension':
      case 'money':
      case 'json':
      case 'rating':
      case 'volume':
      case 'weight':
      case 'rich_text_field':
      case 'list.color':
      case 'list.dimension':
      case 'list.number_integer':
      case 'list.number_decimal':
      case 'list.rating':
      case 'list.single_line_text_field':
      case 'list.url':
      case 'list.volume':
      case 'list.weight': {
        let parsedValue = null;
        try {
          parsedValue = parseJSON(metafield.value ?? '');
        } catch (err) {
          const parseError = `parseMetafield(): attempted to JSON.parse the 'metafield.value' property, but failed.`;
          if (__HYDROGEN_DEV__) {
            throw new Error(parseError);
          } else {
            console.error(`${parseError} Returning 'null' for 'parsedValue'`);
          }
          parsedValue = null;
        }
        return {
          ...metafield,
          parsedValue,
        } as ReturnGeneric;
      }

      case 'date':
      case 'date_time':
        return {
          ...metafield,
          parsedValue: new Date(metafield.value ?? ''),
        } as ReturnGeneric;

      case 'list.date':
      case 'list.date_time': {
        const jsonParseValue = parseJSON(metafield?.value ?? '') as string[];
        return {
          ...metafield,
          parsedValue: jsonParseValue.map((dateString) => new Date(dateString)),
        } as ReturnGeneric;
      }

      case 'number_decimal':
      case 'number_integer':
        return {
          ...metafield,
          parsedValue: Number(metafield.value),
        } as ReturnGeneric;

      case 'list.collection_reference':
      case 'list.file_reference':
      case 'list.page_reference':
      case 'list.product_reference':
      case 'list.variant_reference':
        return {
          ...metafield,
          parsedValue: flattenConnection(metafield.references ?? undefined),
        } as ReturnGeneric;

      default: {
        const typeNotFoundError = `parseMetafield(): the 'metafield.type' you passed in is not supported. Your type: "${metafield.type}". If you believe this is an error, please open an issue on GitHub.`;
        if (__HYDROGEN_DEV__) {
          throw new Error(typeNotFoundError);
        } else {
          console.error(
            `${typeNotFoundError}  Returning 'parsedValue' of 'null'`,
          );
          return {
            ...metafield,
            parsedValue: null,
          } as ReturnGeneric;
        }
      }

  }
  }
