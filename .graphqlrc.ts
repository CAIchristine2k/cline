import type {IGraphQLConfig} from 'graphql-config';
import {getSchema} from '@shopify/hydrogen-codegen';

/**
 * GraphQL Config
 * @see https://the-guild.dev/graphql/config/docs/user/usage
 * @type {IGraphQLConfig}
 */
export default {
  projects: {
    default: {
      schema: getSchema('storefront'),
      documents: [
        './*.{ts,tsx,js,jsx}',
        './app/**/*.{ts,tsx,js,jsx}',
        '!./app/graphql/**/*.{ts,tsx,js,jsx}',
      ],
    
    },

    customer: {
      schema: getSchema('customer-account'),
      documents: ['./app/graphql/customer-account/*.{ts,tsx,js,jsx}'],
    },

    // Full reference schema generation
    storefront_reference: {
      schema: getSchema('storefront'),
      documents: [], // No documents needed for full schema
      extensions: {
        codegen: {
          generates: {
            './graphql-schema/storefront-schema.generated.ts': {
              plugins: ['typescript', 'typescript-resolvers'],
              config: {
                skipTypename: false,
                enumsAsTypes: true,
                avoidOptionals: false,
                enumValues: {},
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
        },
      },
    },

    customer_reference: {
      schema: getSchema('customer-account'),
      documents: [], // No documents needed for full schema
      extensions: {
        codegen: {
          generates: {
            './graphql-schema/customer-schema.generated.ts': {
              plugins: ['typescript', 'typescript-resolvers'],
              config: {
                skipTypename: false,
                enumsAsTypes: true,
                avoidOptionals: false,
                enumValues: {},
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
        },
      },
    },

    // Add your own GraphQL projects here for CMS, Shopify Admin API, etc.
  },
} as IGraphQLConfig;
