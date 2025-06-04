import type {LoaderFunctionArgs} from 'react-router';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';

// Define type for metafield to address TypeScript errors
interface CustomerMetafield {
  id?: string | null;
  namespace?: string | null;
  key?: string | null;
  value?: string | null;
  type?: string | null;
}

export async function loader({context}: LoaderFunctionArgs) {
  try {
    // Check if customer is logged in
    const isLoggedIn = await context.customerAccount.isLoggedIn();

    if (!isLoggedIn) {
      return new Response(
        JSON.stringify({
          customer: null,
          isLoggedIn: false,
        }),
        {
          headers: {'Content-Type': 'application/json'},
        },
      );
    }

    // Get customer details including metafields for usage tracking
    const {data} = await context.customerAccount.query(CUSTOMER_DETAILS_QUERY);

    // Sanitize customer data before sending
    // This ensures we're sending a consistent structure regardless of API response
    const sanitizedCustomer = {
      id: data?.customer?.id || null,
      firstName: data?.customer?.firstName || null,
      lastName: data?.customer?.lastName || null,
      // Sanitize metafields to ensure they always have the required properties
      // and transform to a consistent format
      metafields: Array.isArray(data?.customer?.metafields)
        ? data.customer.metafields
            .map((metafield: CustomerMetafield) => ({
              id: metafield?.id || null,
              namespace: metafield?.namespace || null,
              key: metafield?.key || null,
              value: metafield?.value || null,
              type: metafield?.type || null,
            }))
            .filter((m: CustomerMetafield) => m.id !== null) // Filter out invalid entries
        : [],
    };

    return new Response(
      JSON.stringify({
        customer: sanitizedCustomer,
        isLoggedIn: true,
      }),
      {
        headers: {'Content-Type': 'application/json'},
      },
    );
  } catch (error) {
    console.error('Auth check error:', error);
    return new Response(
      JSON.stringify({
        customer: null,
        isLoggedIn: false,
        error: 'Authentication check failed',
      }),
      {
        status: 500,
        headers: {'Content-Type': 'application/json'},
      },
    );
  }
}
