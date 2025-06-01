# graphiqlLoader

This function creates an instance of [GraphiQL](https://graphql.org/swapi-graphql) in your Hydrogen app when running on a development server. This enables you to explore, write, and test GraphQL queries using your store's live data from the Storefront API. You can visit the GraphiQL app at your storefront route /graphiql. Learn more about [using GraphiQL in Hydrogen](https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/graphiql).

```js
import {graphiqlLoader} from '@shopify/hydrogen';
import {redirect} from 'react-router';

export async function loader(args) {
  if (process.env.NODE_ENV === 'development') {
    return graphiqlLoader(args);
  }

  return redirect('/');
}
```

```ts
import {graphiqlLoader} from '@shopify/hydrogen';
import {redirect, type LoaderFunctionArgs} from 'react-router';

export async function loader(args: LoaderFunctionArgs) {
  if (process.env.NODE_ENV === 'development') {
    return graphiqlLoader(args);
  }

  return redirect('/');
}
```

## Arguments

### GraphiQLLoader

#### Returns: Promise<Response>

#### Params:

- args: LoaderFunctionArgs<any>
  type GraphiQLLoader = (args: LoaderFunctionArgs) => Promise<Response>;
