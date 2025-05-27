export const CUSTOMER_UPDATE = `#graphql
  # https://shopify.dev/docs/api/customer/latest/mutations/customerUpdate
  mutation customerUpdate($customer: CustomerUpdateInput!) {
    customerUpdate(input: $customer) {
      userErrors {
        field
        message
      }
    }
  }
` as const;

// Mutation to update customer metafields for AI generation usage tracking
export const CUSTOMER_METAFIELD_UPDATE = `#graphql
  mutation customerMetafieldUpdate($customer: CustomerUpdateInput!) {
    customerUpdate(input: $customer) {
      customer {
        id
        metafields(identifiers: [
          {namespace: "ai_generation", key: "monthly_usage"}
          {namespace: "ai_generation", key: "last_reset"}
        ]) {
          id
          namespace
          key
          value
          type
        }
      }
      userErrors {
        field
        message
      }
    }
  }
` as const;
