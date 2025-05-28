import { createRequestHandler } from "react-router";
import { createAppLoadContext } from "~/lib/context";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
    // Preserve Hydrogen's existing context structure
    storefront: any;
    session: any;
    cart: any;
    customerAccount: any;
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    try {
      // Create Hydrogen's app load context (includes storefront, session, etc.)
      const hydrogenContext = await createAppLoadContext(request, env, ctx);
      
      // Merge with Cloudflare context
      const appLoadContext = {
        ...hydrogenContext,
        cloudflare: { env, ctx },
      };

      const response = await requestHandler(request, appLoadContext);

      // Handle Hydrogen session commits
      if (hydrogenContext.session.isPending) {
        response.headers.set(
          'Set-Cookie',
          await hydrogenContext.session.commit(),
        );
      }

      return response;
    } catch (error) {
      console.error('Worker error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>; 