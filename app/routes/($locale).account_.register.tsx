import type {LoaderFunctionArgs} from 'react-router';

export async function loader({context, request}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const returnTo = url.searchParams.get('return_to') || '/';

  // For Shopify Customer Account API, registration is handled through the login flow
  // The login page will have options for both login and registration
  return context.customerAccount.login({
    uiLocales: 'EN',
  });
}
