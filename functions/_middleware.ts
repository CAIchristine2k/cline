/**
 * Cloudflare Pages Functions middleware
 * Handles all SSR requests using React Router + Shopify Hydrogen
 *
 * This middleware integrates:
 * - React Router SSR
 * - Shopify Hydrogen context (storefront, cart, session)
 * - Cloudflare Pages environment
 */

interface CloudflarePagesContext {
  request: Request;
  env: any;
  waitUntil: (promise: Promise<any>) => void;
  passThroughOnException: () => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  functionPath: string;
  params: Record<string, string>;
  data: Record<string, any>;
}

// @ts-ignore - Types will be resolved at runtime
export async function onRequest(context: CloudflarePagesContext) {
  try {
    const url = new URL(context.request.url);

    // Let Cloudflare Pages serve static assets directly (bypass SSR for performance)
    if (
      url.pathname.startsWith('/assets/') ||
      url.pathname.startsWith('/images/') ||
      url.pathname.startsWith('/manifest.json') ||
      url.pathname.startsWith('/favicon') ||
      url.pathname.startsWith('/videos/') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.js') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.PNG') ||
      url.pathname.endsWith('.jpg') ||
      url.pathname.endsWith('.JPG') ||
      url.pathname.endsWith('.jpeg') ||
      url.pathname.endsWith('.webp') ||
      url.pathname.endsWith('.svg') ||
      url.pathname.endsWith('.ico') ||
      url.pathname.endsWith('.woff') ||
      url.pathname.endsWith('.woff2') ||
      url.pathname.endsWith('.ttf')
    ) {
      return context.next(); // Pass through to Cloudflare Pages static asset handler
    }

    // Import React Router's createRequestHandler
    const {createRequestHandler} = await import('react-router');

    // Import Hydrogen's context creator
    const {createAppLoadContext} = await import('../app/lib/context.ts');

    // Import the server build
    const serverBuild = await import('../dist/server/index.js');

    // Create ExecutionContext compatible object for Cloudflare Pages
    const executionContext = {
      waitUntil: context.waitUntil.bind(context),
      passThroughOnException: context.passThroughOnException.bind(context),
    };

    // Redirect non-www to www (SEO best practice) - from workers/app.ts
    if (url.hostname === 'clinehair.com') {
      return Response.redirect(`https://www.clinehair.com${url.pathname}${url.search}`, 301);
    }

    // Create Hydrogen's app load context (includes storefront, session, etc.)
    const hydrogenContext = await createAppLoadContext(
      context.request,
      context.env,
      executionContext
    );

    // Merge with Cloudflare context
    const appLoadContext = {
      ...hydrogenContext,
      cloudflare: {env: context.env, ctx: executionContext},
      env: context.env, // Direct env access for backwards compatibility
    };

    // Create React Router request handler
    const requestHandler = createRequestHandler(serverBuild, 'production');

    // Handle the request
    const response = await requestHandler(context.request, appLoadContext);

    // Handle Hydrogen session commits
    if (hydrogenContext.session && hydrogenContext.session.isPending) {
      response.headers.set(
        'Set-Cookie',
        await hydrogenContext.session.commit()
      );
    }

    return response;
  } catch (error) {
    console.error('SSR Error:', error);

    // Return detailed error in development
    const isDev = context.env?.MODE === 'development';

    return new Response(
      isDev
        ? `Internal Server Error: ${error instanceof Error ? error.message : 'Unknown error'}\n\nStack: ${error instanceof Error ? error.stack : ''}`
        : 'Internal Server Error',
      {
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    );
  }
}
