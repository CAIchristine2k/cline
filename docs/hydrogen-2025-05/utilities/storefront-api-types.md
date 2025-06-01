# Storefront API Types

    If you are using TypeScript, pre-generated TypeScript types are available that match the Storefront API's GraphQL schema. These types can be used when you need to manually create an object that matches a Storefront API object's shape.

These types also work really well with the new [`satisfies` operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) introduced in TypeScript 4.9, though you don't need to use `satisfies` to use these types.

```ts
import type {Product, Collection} from '@shopify/hydrogen/storefront-api-types';

const myProduct = {id: '123', title: 'My Product'} satisfies Partial<Product>;
console.log(myProduct.title);

const myCollection = {
  id: '456',
  title: 'My Collection',
} satisfies Partial<Collection>;
console.log(myCollection.title);

const myNotSatisfyingProduct: Partial<Product> = {
  id: '789',
  title: 'Other Product',
};
console.log(myNotSatisfyingProduct.title);
```
