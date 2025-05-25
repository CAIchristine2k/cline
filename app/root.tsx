import {getShopAnalytics, useNonce} from '@shopify/hydrogen';
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
import {useEffect} from 'react';
import {initializeTheme} from '~/utils/themeConfig';
import config from '~/utils/config';
import {ThemeProvider} from '~/utils/themeContext';
import {CartProvider} from '~/providers/CartProvider';
import {Aside} from '~/components/Aside';

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
    // Google Fonts for theme compatibility
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
    {title: `${config.brandName} - ${config.influencerTitle} | Official Store`},
    {name: 'description', content: `${config.influencerBio.substring(0, 160)}...`},
    {name: 'keywords', content: `${config.influencerName}, ${config.brandName}, boxing equipment, merchandise, champion gear`},
    {property: 'og:title', content: `${config.brandName} - Official Store`},
    {property: 'og:description', content: config.heroSubtitle},
    {property: 'og:image', content: config.brandLogo},
    {property: 'og:type', content: 'website'},
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

// Helper function to convert hex to RGB for CSS variables
function hexToRgb(hex: string) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}

export function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();
  const data = useLoaderData<typeof loader>();

  // Initialize theme on client side
  useEffect(() => {
    initializeTheme();

    // Add RGB versions of color variables for shadows and opacity
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const primaryColor = getComputedStyle(root).getPropertyValue('--color-primary').trim();
      
      if (primaryColor) {
        root.style.setProperty('--color-primary-rgb', hexToRgb(primaryColor));
      }
    }
  }, []);

  const hasUserConsent = true;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Theme CSS Variables - matches Vue template approach */
              :root {
                --color-primary: #D4AF37;
                --color-secondary: #1F1F1F;
                --color-accent: #FFFFFF;
                --color-background: #000000;
                --color-text: #FFFFFF;
                
                /* RGB versions for opacity/shadows */
                --color-primary-rgb: 212, 175, 55;
                --color-secondary-rgb: 31, 31, 31;
                
                /* Gold color theme variables - Vue template compatibility */
                --color-gold-400: #E5C158;
                --color-gold-500: #D4AF37;
                --color-gold-600: #BF9B2F;
                
                /* Primary color variants */
                --color-primary-50: #F9F7F0;
                --color-primary-100: #F3EFE1;
                --color-primary-200: #E7DFC3;
                --color-primary-300: #DBCFA5;
                --color-primary-400: #CFBF87;
                --color-primary-500: #D4AF37;
                --color-primary-600: #AA8C2C;
                --color-primary-700: #806921;
                --color-primary-800: #554616;
                --color-primary-900: #2B230B;
                
                /* Typography */
                --font-primary: 'Inter', system-ui, sans-serif;
                --font-secondary: 'Montserrat', system-ui, sans-serif;
                
                /* Spacing scale */
                --spacing-xs: 0.25rem;
                --spacing-sm: 0.5rem;
                --spacing-md: 1rem;
                --spacing-lg: 1.5rem;
                --spacing-xl: 2rem;
                --spacing-2xl: 3rem;
                --spacing-3xl: 4rem;
                
                /* Border radius */
                --radius-sm: 0.25rem;
                --radius-md: 0.5rem;
                --radius-lg: 0.75rem;
                --radius-xl: 1rem;
                
                /* Shadows */
                --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                --shadow-primary: 0 0 15px rgba(var(--color-primary-rgb), 0.3);
              }
              
              /* Dark theme support */
              @media (prefers-color-scheme: dark) {
                :root {
                  --color-background: #000000;
                  --color-text: #FFFFFF;
                }
              }
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <CartProvider>
            <Aside.Provider>
              <PageLayout {...data}>{children}</PageLayout>
            </Aside.Provider>
          </CartProvider>
        </ThemeProvider>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
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
    <div className="route-error">
      <h1>Oops!</h1>
      <h2>{errorStatus}</h2>
      {errorMessage && (
        <fieldset>
          <pre>{errorMessage}</pre>
        </fieldset>
      )}
    </div>
  );
}
