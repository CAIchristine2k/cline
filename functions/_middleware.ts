/**
 * Cloudflare Pages Functions middleware
 * Handles all SSR requests by forwarding to the Workers entry point
 *
 * This middleware ensures compatibility between Cloudflare Pages and the
 * existing Hydrogen + React Router setup designed for Workers.
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
    // Import the Workers entry point via index.js (handles hash-based file names)
    const workerModule = await import('../dist/server/index.js');

    // Create ExecutionContext compatible object for Cloudflare Pages
    const executionContext = {
      waitUntil: context.waitUntil.bind(context),
      passThroughOnException: context.passThroughOnException.bind(context),
    };

    // Call the Workers fetch handler with Pages context
    if (workerModule.default && typeof workerModule.default.fetch === 'function') {
      return await workerModule.default.fetch(
        context.request,
        context.env,
        executionContext
      );
    }

    throw new Error('Worker entry point not found or invalid');
  } catch (error) {
    console.error('SSR Error:', error);

    // Return detailed error in development
    const isDev = context.env?.MODE === 'development';

    return new Response(
      isDev
        ? `Internal Server Error: ${error instanceof Error ? error.message : 'Unknown error'}`
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
