# Storefront Schema

    Hydrogen React ships with a pre-generated GraphQL schema for the Storefront API, which can integrate with your IDE and other GraphQL tooling (such as a [GraphQL config file](https://www.graphql-config.com/docs/user/user-usage)) to provide autocompletion and validation for your Storefront API GraphQL queries.

This schema is generated using the Storefront API's introspection query, and is available at `@shopify/hydrogen-react/storefront.schema.json`.

To get these features working in your IDE, you may need to install an extension. For example, in VSCode you can install this [GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql).

```yml
schema: node_modules/@shopify/hydrogen/storefront.schema.json
```
