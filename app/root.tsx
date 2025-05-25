import {Analytics, getShopAnalytics, useNonce} from '@shopify/hydrogen';
import {
  type LoaderFunctionArgs,
  type MetaFunction,
  type LinksFunction,
} from 'react-router';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
} from 'react-router';
import {PageLayout} from '~/components/PageLayout';
import {FOOTER_QUERY, HEADER_QUERY} from '~/lib/fragments';
import {ThemeProvider} from '~/utils/themeContext';

import appStyles from './styles/app.css?url';
import favicon from '~/assets/favicon.svg';

export const links: LinksFunction = () => {
  return [
    {rel: 'stylesheet', href: appStyles},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    // Google Fonts for Sugar Shane theme
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700;800;900&display=swap',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
};

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {title: data?.layout?.shop?.name ?? 'Sugar Shane Mosley'},
    {name: 'description', content: data?.layout?.shop?.description ?? 'Official store of boxing legend Sugar Shane Mosley'},
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {
    ...criticalData,
    ...deferredData,
  };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const [{shop}] = await Promise.all([
    context.storefront.query(LAYOUT_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    layout: {shop},
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched and rendered later, improving the initial page load performance.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const {storefront, customerAccount, cart, env} = context;

  // defer the footer query (below the fold)
  const footer = storefront
    .query(FOOTER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        footerMenuHandle: 'footer', // Adjust to your footer menu handle
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  // defer the header query (above the fold, but not critical)
  const header = storefront
    .query(HEADER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        headerMenuHandle: 'main-menu', // Adjust to your header menu handle
      },
    })
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    footer,
    header,
    cart: cart.get(),
    isLoggedIn: customerAccount.isLoggedIn(),
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
  };
}

const LAYOUT_QUERY = `#graphql
  query layout($language: LanguageCode) @inContext(language: $language) {
    shop {
      id
      name
      description
    }
  }
` as const;

export function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();
  const data = useLoaderData<typeof loader>();

  const hasUserConsent = true;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-black text-white overflow-x-hidden font-display">
        <ThemeProvider>
          <PageLayout {...data}>{children}</PageLayout>
        </ThemeProvider>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        {hasUserConsent && (
          <Analytics.Provider
            cart={data.cart}
            shop={null}
            consent={{
              checkoutDomain: undefined,
              storefrontAccessToken: 'dummy-token',
            }}
          >
            <Analytics.CartView />
          </Analytics.Provider>
        )}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data ?? errorMessage;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gold-500 mb-4">Oops!</h1>
        <h2 className="text-2xl mb-4">{errorStatus}</h2>
        {errorMessage && (
          <fieldset className="bg-gray-900 p-4 rounded border border-gray-700">
            <pre className="text-sm text-gray-300">{errorMessage}</pre>
          </fieldset>
        )}
      </div>
    </div>
  );
}
