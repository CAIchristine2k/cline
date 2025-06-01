# storefrontApiCustomScalars

    Meant to be used with GraphQL CodeGen to type the Storefront API's custom scalars correctly when using TypeScript.By default, GraphQL CodeGen uses `any` for custom scalars; by using these definitions, GraphQL Codegen will generate the correct types for the Storefront API's custom scalars.

See more about [GraphQL CodeGen](https://graphql-code-generator.com/) and [custom scalars for TypeScript](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript#scalars).

Note that `@shopify/hydrogen-react` has already generated types for the Storefront API, so you may not need to setup GraphQL Codegen on your own.

```js
import {storefrontApiCustomScalars} from '@shopify/hydrogen';

const config = {
  overwrite: true,
  schema: require.resolve('@shopify/hydrogen/storefront.schema.json'),
  documents: 'pages/**/*.tsx',
  generates: {
    './gql/': {
      preset: 'client',
      plugins: [],
      config: {
        // defines the custom scalars used in the Storefront API
        scalars: storefrontApiCustomScalars,
      },
    },
  },
};

export default config;
```
