import type {LoaderFunctionArgs} from 'react-router';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';

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

    return new Response(
      JSON.stringify({
        customer: data.customer,
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
