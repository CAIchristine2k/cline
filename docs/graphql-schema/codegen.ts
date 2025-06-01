import type {CodegenConfig} from '@graphql-codegen/cli';
import {getSchema} from '@shopify/hydrogen-codegen';

const config: CodegenConfig = {
  generates: {
    './docs/graphql-schema/storefront-schema.generated.ts': {
      schema: getSchema('storefront'),
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        skipTypename: false,
        enumsAsTypes: true,
        avoidOptionals: false,
        scalars: {
          DateTime: 'string',
          Decimal: 'string',
          HTML: 'string',
          URL: 'string',
          Color: 'string',
        },
      },
    },
    './docs/graphql-schema/customer-schema.generated.ts': {
      schema: getSchema('customer-account'),
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        skipTypename: false,
        enumsAsTypes: true,
        avoidOptionals: false,
        scalars: {
          DateTime: 'string',
          Decimal: 'string',
          HTML: 'string',
          URL: 'string',
          Color: 'string',
        },
      },
    },
  },
};

export default config;
