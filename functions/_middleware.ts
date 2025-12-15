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
    const url = new URL(context.request.url);
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
