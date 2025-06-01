# createCustomerAccountClient

The `createCustomerAccountClient` function creates a GraphQL client for querying the [Customer Account API](https://shopify.dev/docs/api/customer). It also provides methods to authenticate and check if the user is logged in.

```jsx
import {createCustomerAccountClient} from '@shopify/hydrogen';
// @ts-expect-error
import * as reactRouterBuild from 'virtual:react-router/server-build';
import {createRequestHandler, createCookieSessionStorage} from 'react-router';

export default {
  async fetch(request, env, executionContext) {
    const session = await AppSession.init(request, [env.SESSION_SECRET]);

    /* Create a Customer API client with your credentials and options */
    const customerAccount = createCustomerAccountClient({
      /* Runtime utility in serverless environments */
      waitUntil: (p) => executionContext.waitUntil(p),
      /* Public Customer Account API token for your store */
      customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_ID,
      /* Shop Id */
      shopId: env.SHOP_ID,
      request,
      session,
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      /* Inject the customer account client in the Remix context */
      getLoadContext: () => ({customerAccount}),
    });

    const response = await handleRequest(request);

    if (session.isPending) {
      response.headers.set('Set-Cookie', await session.commit());
    }

    return response;
  },
};

class AppSession {
  isPending = false;

  static async init(request, secrets) {
    const storage = createCookieSessionStorage({
      cookie: {
        name: 'session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets,
      },
    });

    const session = await storage.getSession(request.headers.get('Cookie'));

    return new this(storage, session);
  }

  get(key) {
    return this.session.get(key);
  }

  destroy() {
    return this.sessionStorage.destroySession(this.session);
  }

  flash(key, value) {
    this.session.flash(key, value);
  }

  unset(key) {
    this.isPending = true;
    this.session.unset(key);
  }

  set(key, value) {
    this.isPending = true;
    this.session.set(key, value);
  }

  commit() {
    this.isPending = false;
    return this.sessionStorage.commitSession(this.session);
  }
}
```

```tsx
import {
  createCustomerAccountClient,
  type HydrogenSession,
} from '@shopify/hydrogen';
// @ts-expect-error
import * as reactRouterBuild from 'virtual:react-router/server-build';
import {
  createRequestHandler,
  createCookieSessionStorage,
  type SessionStorage,
  type Session,
} from 'react-router';

export default {
  async fetch(
    request: Request,
    env: Record<string, string>,
    executionContext: ExecutionContext,
  ) {
    const session = await AppSession.init(request, [env.SESSION_SECRET]);

    /* Create a Customer API client with your credentials and options */
    const customerAccount = createCustomerAccountClient({
      /* Runtime utility in serverless environments */
      waitUntil: (p) => executionContext.waitUntil(p),
      /* Public Customer Account API client ID for your store */
      customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_ID,
      /* Shop Id */
      shopId: env.SHOP_ID,
      request,
      session,
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      /* Inject the customer account client in the Remix context */
      getLoadContext: () => ({customerAccount}),
    });

    const response = await handleRequest(request);

    if (session.isPending) {
      response.headers.set('Set-Cookie', await session.commit());
    }

    return response;
  },
};

class AppSession implements HydrogenSession {
  public isPending = false;

  constructor(
    private sessionStorage: SessionStorage,
    private session: Session,
  ) {}

  static async init(request: Request, secrets: string[]) {
    const storage = createCookieSessionStorage({
      cookie: {
        name: 'session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets,
      },
    });

    const session = await storage.getSession(request.headers.get('Cookie'));

    return new this(storage, session);
  }

  get(key: string) {
    return this.session.get(key);
  }

  destroy() {
    return this.sessionStorage.destroySession(this.session);
  }

  flash(key: string, value: any) {
    this.session.flash(key, value);
  }

  unset(key: string) {
    this.isPending = true;
    this.session.unset(key);
  }

  set(key: string, value: any) {
    this.isPending = true;
    this.session.set(key, value);
  }

  commit() {
    this.isPending = false;
    return this.sessionStorage.commitSession(this.session);
  }
}
```

## createCustomerAccountClient(options)

### CustomerAccountOptions

### authorizePath

value: `string`

The oauth authorize path. Defaults to `/account/authorize`.

### authUrl

value: `string`

This is the route in your app that authorizes the customer after logging in. Make sure to call `customer.authorize()` within the loader on this route. It defaults to `/account/authorize`.

### customAuthStatusHandler

value: `() => DataFunctionValue`

- DataFunctionValue: Response | NonNullable<unknown> | null
  Use this method to overwrite the default logged-out redirect behavior. The default handler [throws a redirect](https://remix.run/docs/en/main/utils/redirect#:~:text=!session) to `/account/login` with current path as `return_to` query param.

### customerAccountId

value: `string`

Unique UUID prefixed with `shp_` associated with the application, this should be visible in the customer account api settings in the Hydrogen admin channel. Mock.shop doesn't automatically supply customerAccountId. Use `npx shopify hydrogen env pull` to link your store credentials.

### customerApiVersion

value: `string`

Override the version of the API

### defaultRedirectPath

value: `string`

The path to redirect to after login. Defaults to `/account`.

### language

value: `LanguageCode`

Localization data.

### logErrors

value: `boolean | ((error?: Error) => boolean)`

Whether it should print GraphQL errors automatically. Defaults to true

### loginPath

value: `string`

The path to login. Defaults to `/account/login`.

### request

value: `CrossRuntimeRequest`

- CrossRuntimeRequest: {
  url?: string;
  method?: string;
  headers: {
  get?: (key: string) => string | null | undefined;
  [key: string]: any;
  };
  }
  The object for the current Request. It should be provided by your platform.

### session

value: `HydrogenSession`

The client requires a session to persist the auth and refresh token. By default Hydrogen ships with cookie session storage, but you can use [another session storage](https://remix.run/docs/en/main/utils/sessions) implementation.

### shopId

value: `string`

The shop id. Mock.shop doesn't automatically supply shopId. Use `npx shopify hydrogen env pull` to link your store credentials

### unstableB2b

value: `boolean`

Deprecated. `unstableB2b` is now stable. Please remove.

### waitUntil

value: `WaitUntil`

The waitUntil function is used to keep the current request/response lifecycle alive even after a response has been sent. It should be provided by your platform.

### CrossRuntimeRequest

### headers

value: `{ [key: string]: any; get?: (key: string) => string; }`

### method

value: `string`

### url

value: `string`

## Related

- [createStorefrontClient](https://shopify.dev/docs/api/hydrogen/utilities/createstorefrontclient)

## Examples

The `createCustomerAccountClient` function creates a GraphQL client for querying the [Customer Account API](https://shopify.dev/docs/api/customer). It also provides methods to authenticate and check if the user is logged in.

### Customized logged-out behavior for the entire application

Throw error instead of redirect```jsx
import {createCustomerAccountClient} from '@shopify/hydrogen';
// @ts-expect-error
import \* as reactRouterBuild from 'virtual:react-router/server-build';
import {
createRequestHandler,
createCookieSessionStorage,
} from 'react-router';

// In server.ts
export default {
async fetch(request, env, executionContext) {
const session = await AppSession.init(request, [env.SESSION_SECRET]);

    function customAuthStatusHandler() {
      return new Response('Customer is not login', {
        status: 401,
      });
    }

    /* Create a Customer API client with your credentials and options */
    const customerAccount = createCustomerAccountClient({
      /* Runtime utility in serverless environments */
      waitUntil: (p) => executionContext.waitUntil(p),
      /* Public Customer Account API client ID for your store */
      customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_ID,
      /* Shop Id */
      shopId: env.SHOP_ID,
      request,
      session,
      customAuthStatusHandler,
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      /* Inject the customer account client in the Remix context */
      getLoadContext: () => ({customerAccount}),
    });

    const response = await handleRequest(request);

    if (session.isPending) {
      response.headers.set('Set-Cookie', await session.commit());
    }

    return response;

},
};

class AppSession {
isPending = false;

static async init(request, secrets) {
const storage = createCookieSessionStorage({
cookie: {
name: 'session',
httpOnly: true,
path: '/',
sameSite: 'lax',
secrets,
},
});

    const session = await storage.getSession(request.headers.get('Cookie'));

    return new this(storage, session);

}

get(key) {
return this.session.get(key);
}

destroy() {
return this.sessionStorage.destroySession(this.session);
}

flash(key, value) {
this.session.flash(key, value);
}

unset(key) {
this.isPending = true;
this.session.unset(key);
}

set(key, value) {
this.isPending = true;
this.session.set(key, value);
}

commit() {
this.isPending = false;
return this.sessionStorage.commitSession(this.session);
}
}

/////////////////////////////////
// In a route
import {
useLoaderData,
useRouteError,
isRouteErrorResponse,
useLocation,
} from 'react-router';

export async function loader({context}) {
const {data} = await context.customerAccount.query(`#graphql
    query getCustomer {
      customer {
        firstName
        lastName
      }
    }
    `);

return {customer: data.customer};
}

export function ErrorBoundary() {
const error = useRouteError();
const location = useLocation();

if (isRouteErrorResponse(error)) {
if (error.status == 401) {
return (
<a
href={`/account/login?${new URLSearchParams({
            return_to: location.pathname,
          }).toString()}`} >
Login
</a>
);
}
}
}

// this should be an default export
export function Route() {
const {customer} = useLoaderData();

return (

<div style={{marginTop: 24}}>
{customer ? (
<>
<div style={{marginBottom: 24}}>
<b>
Welcome {customer.firstName} {customer.lastName}
</b>
</div>
</>
) : null}
</div>
);
}

````

```tsx
import {
  createCustomerAccountClient,
  type HydrogenSession,
} from '@shopify/hydrogen';
// @ts-expect-error
import * as reactRouterBuild from 'virtual:react-router/server-build';
import {
  createRequestHandler,
  createCookieSessionStorage,
  type SessionStorage,
  type Session,
} from 'react-router';

// In server.ts
export default {
  async fetch(
    request: Request,
    env: Record<string, string>,
    executionContext: ExecutionContext,
  ) {
    const session = await AppSession.init(request, [env.SESSION_SECRET]);

    function customAuthStatusHandler() {
      return new Response('Customer is not login', {
        status: 401,
      });
    }

    /* Create a Customer API client with your credentials and options */
    const customerAccount = createCustomerAccountClient({
      /* Runtime utility in serverless environments */
      waitUntil: (p) => executionContext.waitUntil(p),
      /* Public Customer Account API client ID for your store */
      customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_ID,
      /* Shop Id */
      shopId: env.SHOP_ID,
      request,
      session,
      customAuthStatusHandler,
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      /* Inject the customer account client in the Remix context */
      getLoadContext: () => ({session, customerAccount}),
    });

    const response = await handleRequest(request);

    if (session.isPending) {
      response.headers.set('Set-Cookie', await session.commit());
    }

    return response;
  },
};

class AppSession implements HydrogenSession {
  public isPending = false;

  constructor(
    private sessionStorage: SessionStorage,
    private session: Session,
  ) {}

  static async init(request: Request, secrets: string[]) {
    const storage = createCookieSessionStorage({
      cookie: {
        name: 'session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets,
      },
    });

    const session = await storage.getSession(request.headers.get('Cookie'));

    return new this(storage, session);
  }

  get(key: string) {
    return this.session.get(key);
  }

  destroy() {
    return this.sessionStorage.destroySession(this.session);
  }

  flash(key: string, value: any) {
    this.session.flash(key, value);
  }

  unset(key: string) {
    this.isPending = true;
    this.session.unset(key);
  }

  set(key: string, value: any) {
    this.isPending = true;
    this.session.set(key, value);
  }

  commit() {
    this.isPending = false;
    return this.sessionStorage.commitSession(this.session);
  }
}

// In env.d.ts
import type {CustomerAccount, HydrogenSessionData} from '@shopify/hydrogen';
declare module 'react-router' {
  /**
   * Declare local additions to the Remix loader context.
   */
  interface AppLoadContext {
    customerAccount: CustomerAccount;
    session: AppSession;
  }

  // TODO: remove this once we've migrated to `Route.LoaderArgs` instead for our loaders
  interface LoaderFunctionArgs {
    context: AppLoadContext;
  }

  // TODO: remove this once we've migrated to `Route.ActionArgs` instead for our actions
  interface ActionFunctionArgs {
    context: AppLoadContext;
  }

  /**
   * Declare local additions to the Remix session data.
   */
  interface SessionData extends HydrogenSessionData {}
}

/////////////////////////////////
// In a route
import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
  useLocation,
} from 'react-router';
import {type LoaderFunctionArgs} from 'react-router';

export async function loader({context}: LoaderFunctionArgs) {
  const {data} = await context.customerAccount.query<{
    customer: {firstName: string; lastName: string};
  }>(`#graphql
    query getCustomer {
      customer {
        firstName
        lastName
      }
    }
    `);

  return {customer: data.customer};
}

export function ErrorBoundary() {
  const error = useRouteError();
  const location = useLocation();

  if (isRouteErrorResponse(error)) {
    if (error.status == 401) {
      return (
        <a
          href={`/account/login?${new URLSearchParams({
            return_to: location.pathname,
          }).toString()}`}
        >
          Login
        </a>
      );
    }
  }
}

// this should be an default export
export function Route() {
  const {customer} = useLoaderData<typeof loader>();

  return (
    <div style={{marginTop: 24}}>
      {customer ? (
        <>
          <div style={{marginBottom: 24}}>
            <b>
              Welcome {customer.firstName} {customer.lastName}
            </b>
          </div>
        </>
      ) : null}
    </div>
  );
}

````

### Opt out of logged-out behavior for a single route

Handle logged-out ahead of query```jsx
import {createCustomerAccountClient} from '@shopify/hydrogen';
// @ts-expect-error
import \* as reactRouterBuild from 'virtual:react-router/server-build';
import {
createRequestHandler,
createCookieSessionStorage,
} from 'react-router';

// In server.ts
export default {
async fetch(request, env, executionContext) {
const session = await AppSession.init(request, [env.SESSION_SECRET]);

    function customAuthStatusHandler() {
      return new Response('Customer is not login', {
        status: 401,
      });
    }

    /* Create a Customer API client with your credentials and options */
    const customerAccount = createCustomerAccountClient({
      /* Runtime utility in serverless environments */
      waitUntil: (p) => executionContext.waitUntil(p),
      /* Public Customer Account API client ID for your store */
      customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_ID,
      /* Shop Id */
      shopId: env.SHOP_ID,
      request,
      session,
      customAuthStatusHandler,
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      /* Inject the customer account client in the Remix context */
      getLoadContext: () => ({customerAccount}),
    });

    const response = await handleRequest(request);

    if (session.isPending) {
      response.headers.set('Set-Cookie', await session.commit());
    }

    return response;

},
};

class AppSession {
isPending = false;

static async init(request, secrets) {
const storage = createCookieSessionStorage({
cookie: {
name: 'session',
httpOnly: true,
path: '/',
sameSite: 'lax',
secrets,
},
});

    const session = await storage.getSession(request.headers.get('Cookie'));

    return new this(storage, session);

}

get(key) {
return this.session.get(key);
}

destroy() {
return this.sessionStorage.destroySession(this.session);
}

flash(key, value) {
this.session.flash(key, value);
}

unset(key) {
this.isPending = true;
this.session.unset(key);
}

set(key, value) {
this.isPending = true;
this.session.set(key, value);
}

commit() {
this.isPending = false;
return this.sessionStorage.commitSession(this.session);
}
}

/////////////////////////////////
// In a route
import {
useLoaderData,
useRouteError,
isRouteErrorResponse,
useLocation,
} from 'react-router';

export async function loader({context}) {
if (!(await context.customerAccount.isLoggedIn())) {
throw new Response('Customer is not login', {
status: 401,
});
}

const {data} = await context.customerAccount.query(
`#graphql
    query getCustomer {
      customer {
        firstName
        lastName
      }
    }
    `,
);

return {customer: data.customer};
}

export function ErrorBoundary() {
const error = useRouteError();
const location = useLocation();

if (isRouteErrorResponse(error)) {
if (error.status == 401) {
return (
<a
href={`/account/login?${new URLSearchParams({
            return_to: location.pathname,
          }).toString()}`} >
Login
</a>
);
}
}
}

// this should be an default export
export function Route() {
const {customer} = useLoaderData();

return (

<div style={{marginTop: 24}}>
{customer ? (
<>
<div style={{marginBottom: 24}}>
<b>
Welcome {customer.firstName} {customer.lastName}
</b>
</div>
</>
) : null}
</div>
);
}

````

```tsx
import {
  createCustomerAccountClient,
  type HydrogenSession,
} from '@shopify/hydrogen';
// @ts-expect-error
import * as reactRouterBuild from 'virtual:react-router/server-build';
import {
  createRequestHandler,
  createCookieSessionStorage,
  type SessionStorage,
  type Session,
} from 'react-router';

// In server.ts
export default {
  async fetch(
    request: Request,
    env: Record<string, string>,
    executionContext: ExecutionContext,
  ) {
    const session = await AppSession.init(request, [env.SESSION_SECRET]);

    function customAuthStatusHandler() {
      return new Response('Customer is not login', {
        status: 401,
      });
    }

    /* Create a Customer API client with your credentials and options */
    const customerAccount = createCustomerAccountClient({
      /* Runtime utility in serverless environments */
      waitUntil: (p) => executionContext.waitUntil(p),
      /* Public Customer Account API client ID for your store */
      customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_ID,
      /* Shop Id */
      shopId: env.SHOP_ID,
      request,
      session,
      customAuthStatusHandler,
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      /* Inject the customer account client in the Remix context */
      getLoadContext: () => ({customerAccount}),
    });

    const response = await handleRequest(request);

    if (session.isPending) {
      response.headers.set('Set-Cookie', await session.commit());
    }

    return response;
  },
};

class AppSession implements HydrogenSession {
  public isPending = false;

  constructor(
    private sessionStorage: SessionStorage,
    private session: Session,
  ) {}

  static async init(request: Request, secrets: string[]) {
    const storage = createCookieSessionStorage({
      cookie: {
        name: 'session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets,
      },
    });

    const session = await storage.getSession(request.headers.get('Cookie'));

    return new this(storage, session);
  }

  get(key: string) {
    return this.session.get(key);
  }

  destroy() {
    return this.sessionStorage.destroySession(this.session);
  }

  flash(key: string, value: any) {
    this.session.flash(key, value);
  }

  unset(key: string) {
    this.isPending = true;
    this.session.unset(key);
  }

  set(key: string, value: any) {
    this.isPending = true;
    this.session.set(key, value);
  }

  commit() {
    this.isPending = false;
    return this.sessionStorage.commitSession(this.session);
  }
}

/////////////////////////////////
// In a route
import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
  useLocation,
} from 'react-router';
import {type LoaderFunctionArgs} from 'react-router';

export async function loader({context}: LoaderFunctionArgs) {
  if (!(await context.customerAccount.isLoggedIn())) {
    throw new Response('Customer is not login', {
      status: 401,
    });
  }

  const {data} = await context.customerAccount.query(
    `#graphql
    query getCustomer {
      customer {
        firstName
        lastName
      }
    }
    `,
  );

  return {customer: data.customer};
}

export function ErrorBoundary() {
  const error = useRouteError();
  const location = useLocation();

  if (isRouteErrorResponse(error)) {
    if (error.status == 401) {
      return (
        <a
          href={`/account/login?${new URLSearchParams({
            return_to: location.pathname,
          }).toString()}`}
        >
          Login
        </a>
      );
    }
  }
}

// this should be an default export
export function Route() {
  const {customer} = useLoaderData<typeof loader>();

  return (
    <div style={{marginTop: 24}}>
      {customer ? (
        <>
          <div style={{marginBottom: 24}}>
            <b>
              Welcome {customer.firstName} {customer.lastName}
            </b>
          </div>
        </>
      ) : null}
    </div>
  );
}

````

## Returns

### CustomerAccountForDocs

Below are types meant for documentation only. Ensure it stay in sync with the type above.

### authorize

value: `() => Promise<Response>`

On successful login, the customer redirects back to your app. This function validates the OAuth response and exchanges the authorization code for an access token and refresh token. It also persists the tokens on your session. This function should be called and returned from the Remix loader configured as the redirect URI within the Customer Account API settings in admin.

### getAccessToken

value: `() => Promise<string>`

Returns CustomerAccessToken if the customer is logged in. It also run a expiry check and does a token refresh if needed.

### getApiUrl

value: `() => string`

Creates the fully-qualified URL to your store's GraphQL endpoint.

### handleAuthStatus

value: `() => void | DataFunctionValue`

- DataFunctionValue: Response | NonNullable<unknown> | null
  Check for a not logged in customer and redirect customer to login page. The redirect can be overwritten with `customAuthStatusHandler` option.

### isLoggedIn

value: `() => Promise<boolean>`

Returns if the customer is logged in. It also checks if the access token is expired and refreshes it if needed.

### login

value: `(options?: LoginOptions) => Promise<Response>`

- LoginOptions: {
  uiLocales?: LanguageCode;
  }
  Start the OAuth login flow. This function should be called and returned from a Remix action. It redirects the customer to a Shopify login domain. It also defined the final path the customer lands on at the end of the oAuth flow with the value of the `return_to` query param. (This is automatically setup unless `customAuthStatusHandler` option is in use)

### logout

value: `(options?: LogoutOptions) => Promise<Response>`

- LogoutOptions: {
  /** The url to redirect customer to after logout, should be a relative URL. This url will need to included in Customer Account API's application setup for logout URI. The default value is current app origin, which is automatically setup in admin when using `--customer-account-push` flag with dev. \*/
  postLogoutRedirectUri?: string;
  /** Add custom headers to the logout redirect. _/
  headers?: HeadersInit;
  /\*\* If true, custom data in the session will not be cleared on logout. _/
  keepSession?: boolean;
  }
  Logout the customer by clearing the session and redirecting to the login domain. It should be called and returned from a Remix action. The path app should redirect to after logout can be setup in Customer Account API settings in admin.

### mutate

value: `<TData = any>(mutation: string, options: CustomerAccountQueryOptionsForDocs) => Promise<TData>`

- CustomerAccountQueryOptionsForDocs: {
  /\*_ The variables for the GraphQL statement. _/
  variables?: Record<string, unknown>;
  }
  Execute a GraphQL mutation against the Customer Account API. This method execute `handleAuthStatus()` ahead of mutation.

### query

value: `<TData = any>(query: string, options: CustomerAccountQueryOptionsForDocs) => Promise<TData>`

- CustomerAccountQueryOptionsForDocs: {
  /\*_ The variables for the GraphQL statement. _/
  variables?: Record<string, unknown>;
  }
  Execute a GraphQL query against the Customer Account API. This method execute `handleAuthStatus()` ahead of query.

### LoginOptions

### uiLocales

value: `LanguageCode`

### LogoutOptions

### headers

value: `HeadersInit`

Add custom headers to the logout redirect.

### keepSession

value: `boolean`

If true, custom data in the session will not be cleared on logout.

### postLogoutRedirectUri

value: `string`

The url to redirect customer to after logout, should be a relative URL. This url will need to included in Customer Account API's application setup for logout URI. The default value is current app origin, which is automatically setup in admin when using `--customer-account-push` flag with dev.

### CustomerAccountQueryOptionsForDocs

### variables

value: `Record<string, unknown>`

The variables for the GraphQL statement.

## Related

- [createStorefrontClient](https://shopify.dev/docs/api/hydrogen/utilities/createstorefrontclient)

## Examples

The `createCustomerAccountClient` function creates a GraphQL client for querying the [Customer Account API](https://shopify.dev/docs/api/customer). It also provides methods to authenticate and check if the user is logged in.

### Customized logged-out behavior for the entire application

Throw error instead of redirect```jsx
import {createCustomerAccountClient} from '@shopify/hydrogen';
// @ts-expect-error
import \* as reactRouterBuild from 'virtual:react-router/server-build';
import {
createRequestHandler,
createCookieSessionStorage,
} from 'react-router';

// In server.ts
export default {
async fetch(request, env, executionContext) {
const session = await AppSession.init(request, [env.SESSION_SECRET]);

    function customAuthStatusHandler() {
      return new Response('Customer is not login', {
        status: 401,
      });
    }

    /* Create a Customer API client with your credentials and options */
    const customerAccount = createCustomerAccountClient({
      /* Runtime utility in serverless environments */
      waitUntil: (p) => executionContext.waitUntil(p),
      /* Public Customer Account API client ID for your store */
      customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_ID,
      /* Shop Id */
      shopId: env.SHOP_ID,
      request,
      session,
      customAuthStatusHandler,
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      /* Inject the customer account client in the Remix context */
      getLoadContext: () => ({customerAccount}),
    });

    const response = await handleRequest(request);

    if (session.isPending) {
      response.headers.set('Set-Cookie', await session.commit());
    }

    return response;

},
};

class AppSession {
isPending = false;

static async init(request, secrets) {
const storage = createCookieSessionStorage({
cookie: {
name: 'session',
httpOnly: true,
path: '/',
sameSite: 'lax',
secrets,
},
});

    const session = await storage.getSession(request.headers.get('Cookie'));

    return new this(storage, session);

}

get(key) {
return this.session.get(key);
}

destroy() {
return this.sessionStorage.destroySession(this.session);
}

flash(key, value) {
this.session.flash(key, value);
}

unset(key) {
this.isPending = true;
this.session.unset(key);
}

set(key, value) {
this.isPending = true;
this.session.set(key, value);
}

commit() {
this.isPending = false;
return this.sessionStorage.commitSession(this.session);
}
}

/////////////////////////////////
// In a route
import {
useLoaderData,
useRouteError,
isRouteErrorResponse,
useLocation,
} from 'react-router';

export async function loader({context}) {
const {data} = await context.customerAccount.query(`#graphql
    query getCustomer {
      customer {
        firstName
        lastName
      }
    }
    `);

return {customer: data.customer};
}

export function ErrorBoundary() {
const error = useRouteError();
const location = useLocation();

if (isRouteErrorResponse(error)) {
if (error.status == 401) {
return (
<a
href={`/account/login?${new URLSearchParams({
            return_to: location.pathname,
          }).toString()}`} >
Login
</a>
);
}
}
}

// this should be an default export
export function Route() {
const {customer} = useLoaderData();

return (

<div style={{marginTop: 24}}>
{customer ? (
<>
<div style={{marginBottom: 24}}>
<b>
Welcome {customer.firstName} {customer.lastName}
</b>
</div>
</>
) : null}
</div>
);
}

````

```tsx
import {
  createCustomerAccountClient,
  type HydrogenSession,
} from '@shopify/hydrogen';
// @ts-expect-error
import * as reactRouterBuild from 'virtual:react-router/server-build';
import {
  createRequestHandler,
  createCookieSessionStorage,
  type SessionStorage,
  type Session,
} from 'react-router';

// In server.ts
export default {
  async fetch(
    request: Request,
    env: Record<string, string>,
    executionContext: ExecutionContext,
  ) {
    const session = await AppSession.init(request, [env.SESSION_SECRET]);

    function customAuthStatusHandler() {
      return new Response('Customer is not login', {
        status: 401,
      });
    }

    /* Create a Customer API client with your credentials and options */
    const customerAccount = createCustomerAccountClient({
      /* Runtime utility in serverless environments */
      waitUntil: (p) => executionContext.waitUntil(p),
      /* Public Customer Account API client ID for your store */
      customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_ID,
      /* Shop Id */
      shopId: env.SHOP_ID,
      request,
      session,
      customAuthStatusHandler,
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      /* Inject the customer account client in the Remix context */
      getLoadContext: () => ({session, customerAccount}),
    });

    const response = await handleRequest(request);

    if (session.isPending) {
      response.headers.set('Set-Cookie', await session.commit());
    }

    return response;
  },
};

class AppSession implements HydrogenSession {
  public isPending = false;

  constructor(
    private sessionStorage: SessionStorage,
    private session: Session,
  ) {}

  static async init(request: Request, secrets: string[]) {
    const storage = createCookieSessionStorage({
      cookie: {
        name: 'session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets,
      },
    });

    const session = await storage.getSession(request.headers.get('Cookie'));

    return new this(storage, session);
  }

  get(key: string) {
    return this.session.get(key);
  }

  destroy() {
    return this.sessionStorage.destroySession(this.session);
  }

  flash(key: string, value: any) {
    this.session.flash(key, value);
  }

  unset(key: string) {
    this.isPending = true;
    this.session.unset(key);
  }

  set(key: string, value: any) {
    this.isPending = true;
    this.session.set(key, value);
  }

  commit() {
    this.isPending = false;
    return this.sessionStorage.commitSession(this.session);
  }
}

// In env.d.ts
import type {CustomerAccount, HydrogenSessionData} from '@shopify/hydrogen';
declare module 'react-router' {
  /**
   * Declare local additions to the Remix loader context.
   */
  interface AppLoadContext {
    customerAccount: CustomerAccount;
    session: AppSession;
  }

  // TODO: remove this once we've migrated to `Route.LoaderArgs` instead for our loaders
  interface LoaderFunctionArgs {
    context: AppLoadContext;
  }

  // TODO: remove this once we've migrated to `Route.ActionArgs` instead for our actions
  interface ActionFunctionArgs {
    context: AppLoadContext;
  }

  /**
   * Declare local additions to the Remix session data.
   */
  interface SessionData extends HydrogenSessionData {}
}

/////////////////////////////////
// In a route
import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
  useLocation,
} from 'react-router';
import {type LoaderFunctionArgs} from 'react-router';

export async function loader({context}: LoaderFunctionArgs) {
  const {data} = await context.customerAccount.query<{
    customer: {firstName: string; lastName: string};
  }>(`#graphql
    query getCustomer {
      customer {
        firstName
        lastName
      }
    }
    `);

  return {customer: data.customer};
}

export function ErrorBoundary() {
  const error = useRouteError();
  const location = useLocation();

  if (isRouteErrorResponse(error)) {
    if (error.status == 401) {
      return (
        <a
          href={`/account/login?${new URLSearchParams({
            return_to: location.pathname,
          }).toString()}`}
        >
          Login
        </a>
      );
    }
  }
}

// this should be an default export
export function Route() {
  const {customer} = useLoaderData<typeof loader>();

  return (
    <div style={{marginTop: 24}}>
      {customer ? (
        <>
          <div style={{marginBottom: 24}}>
            <b>
              Welcome {customer.firstName} {customer.lastName}
            </b>
          </div>
        </>
      ) : null}
    </div>
  );
}

````

### Opt out of logged-out behavior for a single route

Handle logged-out ahead of query```jsx
import {createCustomerAccountClient} from '@shopify/hydrogen';
// @ts-expect-error
import \* as reactRouterBuild from 'virtual:react-router/server-build';
import {
createRequestHandler,
createCookieSessionStorage,
} from 'react-router';

// In server.ts
export default {
async fetch(request, env, executionContext) {
const session = await AppSession.init(request, [env.SESSION_SECRET]);

    function customAuthStatusHandler() {
      return new Response('Customer is not login', {
        status: 401,
      });
    }

    /* Create a Customer API client with your credentials and options */
    const customerAccount = createCustomerAccountClient({
      /* Runtime utility in serverless environments */
      waitUntil: (p) => executionContext.waitUntil(p),
      /* Public Customer Account API client ID for your store */
      customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_ID,
      /* Shop Id */
      shopId: env.SHOP_ID,
      request,
      session,
      customAuthStatusHandler,
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      /* Inject the customer account client in the Remix context */
      getLoadContext: () => ({customerAccount}),
    });

    const response = await handleRequest(request);

    if (session.isPending) {
      response.headers.set('Set-Cookie', await session.commit());
    }

    return response;

},
};

class AppSession {
isPending = false;

static async init(request, secrets) {
const storage = createCookieSessionStorage({
cookie: {
name: 'session',
httpOnly: true,
path: '/',
sameSite: 'lax',
secrets,
},
});

    const session = await storage.getSession(request.headers.get('Cookie'));

    return new this(storage, session);

}

get(key) {
return this.session.get(key);
}

destroy() {
return this.sessionStorage.destroySession(this.session);
}

flash(key, value) {
this.session.flash(key, value);
}

unset(key) {
this.isPending = true;
this.session.unset(key);
}

set(key, value) {
this.isPending = true;
this.session.set(key, value);
}

commit() {
this.isPending = false;
return this.sessionStorage.commitSession(this.session);
}
}

/////////////////////////////////
// In a route
import {
useLoaderData,
useRouteError,
isRouteErrorResponse,
useLocation,
} from 'react-router';

export async function loader({context}) {
if (!(await context.customerAccount.isLoggedIn())) {
throw new Response('Customer is not login', {
status: 401,
});
}

const {data} = await context.customerAccount.query(
`#graphql
    query getCustomer {
      customer {
        firstName
        lastName
      }
    }
    `,
);

return {customer: data.customer};
}

export function ErrorBoundary() {
const error = useRouteError();
const location = useLocation();

if (isRouteErrorResponse(error)) {
if (error.status == 401) {
return (
<a
href={`/account/login?${new URLSearchParams({
            return_to: location.pathname,
          }).toString()}`} >
Login
</a>
);
}
}
}

// this should be an default export
export function Route() {
const {customer} = useLoaderData();

return (

<div style={{marginTop: 24}}>
{customer ? (
<>
<div style={{marginBottom: 24}}>
<b>
Welcome {customer.firstName} {customer.lastName}
</b>
</div>
</>
) : null}
</div>
);
}

````

```tsx
import {
  createCustomerAccountClient,
  type HydrogenSession,
} from '@shopify/hydrogen';
// @ts-expect-error
import * as reactRouterBuild from 'virtual:react-router/server-build';
import {
  createRequestHandler,
  createCookieSessionStorage,
  type SessionStorage,
  type Session,
} from 'react-router';

// In server.ts
export default {
  async fetch(
    request: Request,
    env: Record<string, string>,
    executionContext: ExecutionContext,
  ) {
    const session = await AppSession.init(request, [env.SESSION_SECRET]);

    function customAuthStatusHandler() {
      return new Response('Customer is not login', {
        status: 401,
      });
    }

    /* Create a Customer API client with your credentials and options */
    const customerAccount = createCustomerAccountClient({
      /* Runtime utility in serverless environments */
      waitUntil: (p) => executionContext.waitUntil(p),
      /* Public Customer Account API client ID for your store */
      customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_ID,
      /* Shop Id */
      shopId: env.SHOP_ID,
      request,
      session,
      customAuthStatusHandler,
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      /* Inject the customer account client in the Remix context */
      getLoadContext: () => ({customerAccount}),
    });

    const response = await handleRequest(request);

    if (session.isPending) {
      response.headers.set('Set-Cookie', await session.commit());
    }

    return response;
  },
};

class AppSession implements HydrogenSession {
  public isPending = false;

  constructor(
    private sessionStorage: SessionStorage,
    private session: Session,
  ) {}

  static async init(request: Request, secrets: string[]) {
    const storage = createCookieSessionStorage({
      cookie: {
        name: 'session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets,
      },
    });

    const session = await storage.getSession(request.headers.get('Cookie'));

    return new this(storage, session);
  }

  get(key: string) {
    return this.session.get(key);
  }

  destroy() {
    return this.sessionStorage.destroySession(this.session);
  }

  flash(key: string, value: any) {
    this.session.flash(key, value);
  }

  unset(key: string) {
    this.isPending = true;
    this.session.unset(key);
  }

  set(key: string, value: any) {
    this.isPending = true;
    this.session.set(key, value);
  }

  commit() {
    this.isPending = false;
    return this.sessionStorage.commitSession(this.session);
  }
}

/////////////////////////////////
// In a route
import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
  useLocation,
} from 'react-router';
import {type LoaderFunctionArgs} from 'react-router';

export async function loader({context}: LoaderFunctionArgs) {
  if (!(await context.customerAccount.isLoggedIn())) {
    throw new Response('Customer is not login', {
      status: 401,
    });
  }

  const {data} = await context.customerAccount.query(
    `#graphql
    query getCustomer {
      customer {
        firstName
        lastName
      }
    }
    `,
  );

  return {customer: data.customer};
}

export function ErrorBoundary() {
  const error = useRouteError();
  const location = useLocation();

  if (isRouteErrorResponse(error)) {
    if (error.status == 401) {
      return (
        <a
          href={`/account/login?${new URLSearchParams({
            return_to: location.pathname,
          }).toString()}`}
        >
          Login
        </a>
      );
    }
  }
}

// this should be an default export
export function Route() {
  const {customer} = useLoaderData<typeof loader>();

  return (
    <div style={{marginTop: 24}}>
      {customer ? (
        <>
          <div style={{marginBottom: 24}}>
            <b>
              Welcome {customer.firstName} {customer.lastName}
            </b>
          </div>
        </>
      ) : null}
    </div>
  );
}

````

## Examples

The `createCustomerAccountClient` function creates a GraphQL client for querying the [Customer Account API](https://shopify.dev/docs/api/customer). It also provides methods to authenticate and check if the user is logged in.

### Customized logged-out behavior for the entire application

Throw error instead of redirect```jsx
import {createCustomerAccountClient} from '@shopify/hydrogen';
// @ts-expect-error
import \* as reactRouterBuild from 'virtual:react-router/server-build';
import {
createRequestHandler,
createCookieSessionStorage,
} from 'react-router';

// In server.ts
export default {
async fetch(request, env, executionContext) {
const session = await AppSession.init(request, [env.SESSION_SECRET]);

    function customAuthStatusHandler() {
      return new Response('Customer is not login', {
        status: 401,
      });
    }

    /* Create a Customer API client with your credentials and options */
    const customerAccount = createCustomerAccountClient({
      /* Runtime utility in serverless environments */
      waitUntil: (p) => executionContext.waitUntil(p),
      /* Public Customer Account API client ID for your store */
      customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_ID,
      /* Shop Id */
      shopId: env.SHOP_ID,
      request,
      session,
      customAuthStatusHandler,
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      /* Inject the customer account client in the Remix context */
      getLoadContext: () => ({customerAccount}),
    });

    const response = await handleRequest(request);

    if (session.isPending) {
      response.headers.set('Set-Cookie', await session.commit());
    }

    return response;

},
};

class AppSession {
isPending = false;

static async init(request, secrets) {
const storage = createCookieSessionStorage({
cookie: {
name: 'session',
httpOnly: true,
path: '/',
sameSite: 'lax',
secrets,
},
});

    const session = await storage.getSession(request.headers.get('Cookie'));

    return new this(storage, session);

}

get(key) {
return this.session.get(key);
}

destroy() {
return this.sessionStorage.destroySession(this.session);
}

flash(key, value) {
this.session.flash(key, value);
}

unset(key) {
this.isPending = true;
this.session.unset(key);
}

set(key, value) {
this.isPending = true;
this.session.set(key, value);
}

commit() {
this.isPending = false;
return this.sessionStorage.commitSession(this.session);
}
}

/////////////////////////////////
// In a route
import {
useLoaderData,
useRouteError,
isRouteErrorResponse,
useLocation,
} from 'react-router';

export async function loader({context}) {
const {data} = await context.customerAccount.query(`#graphql
    query getCustomer {
      customer {
        firstName
        lastName
      }
    }
    `);

return {customer: data.customer};
}

export function ErrorBoundary() {
const error = useRouteError();
const location = useLocation();

if (isRouteErrorResponse(error)) {
if (error.status == 401) {
return (
<a
href={`/account/login?${new URLSearchParams({
            return_to: location.pathname,
          }).toString()}`} >
Login
</a>
);
}
}
}

// this should be an default export
export function Route() {
const {customer} = useLoaderData();

return (

<div style={{marginTop: 24}}>
{customer ? (
<>
<div style={{marginBottom: 24}}>
<b>
Welcome {customer.firstName} {customer.lastName}
</b>
</div>
</>
) : null}
</div>
);
}

````

```tsx
import {
  createCustomerAccountClient,
  type HydrogenSession,
} from '@shopify/hydrogen';
// @ts-expect-error
import * as reactRouterBuild from 'virtual:react-router/server-build';
import {
  createRequestHandler,
  createCookieSessionStorage,
  type SessionStorage,
  type Session,
} from 'react-router';

// In server.ts
export default {
  async fetch(
    request: Request,
    env: Record<string, string>,
    executionContext: ExecutionContext,
  ) {
    const session = await AppSession.init(request, [env.SESSION_SECRET]);

    function customAuthStatusHandler() {
      return new Response('Customer is not login', {
        status: 401,
      });
    }

    /* Create a Customer API client with your credentials and options */
    const customerAccount = createCustomerAccountClient({
      /* Runtime utility in serverless environments */
      waitUntil: (p) => executionContext.waitUntil(p),
      /* Public Customer Account API client ID for your store */
      customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_ID,
      /* Shop Id */
      shopId: env.SHOP_ID,
      request,
      session,
      customAuthStatusHandler,
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      /* Inject the customer account client in the Remix context */
      getLoadContext: () => ({session, customerAccount}),
    });

    const response = await handleRequest(request);

    if (session.isPending) {
      response.headers.set('Set-Cookie', await session.commit());
    }

    return response;
  },
};

class AppSession implements HydrogenSession {
  public isPending = false;

  constructor(
    private sessionStorage: SessionStorage,
    private session: Session,
  ) {}

  static async init(request: Request, secrets: string[]) {
    const storage = createCookieSessionStorage({
      cookie: {
        name: 'session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets,
      },
    });

    const session = await storage.getSession(request.headers.get('Cookie'));

    return new this(storage, session);
  }

  get(key: string) {
    return this.session.get(key);
  }

  destroy() {
    return this.sessionStorage.destroySession(this.session);
  }

  flash(key: string, value: any) {
    this.session.flash(key, value);
  }

  unset(key: string) {
    this.isPending = true;
    this.session.unset(key);
  }

  set(key: string, value: any) {
    this.isPending = true;
    this.session.set(key, value);
  }

  commit() {
    this.isPending = false;
    return this.sessionStorage.commitSession(this.session);
  }
}

// In env.d.ts
import type {CustomerAccount, HydrogenSessionData} from '@shopify/hydrogen';
declare module 'react-router' {
  /**
   * Declare local additions to the Remix loader context.
   */
  interface AppLoadContext {
    customerAccount: CustomerAccount;
    session: AppSession;
  }

  // TODO: remove this once we've migrated to `Route.LoaderArgs` instead for our loaders
  interface LoaderFunctionArgs {
    context: AppLoadContext;
  }

  // TODO: remove this once we've migrated to `Route.ActionArgs` instead for our actions
  interface ActionFunctionArgs {
    context: AppLoadContext;
  }

  /**
   * Declare local additions to the Remix session data.
   */
  interface SessionData extends HydrogenSessionData {}
}

/////////////////////////////////
// In a route
import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
  useLocation,
} from 'react-router';
import {type LoaderFunctionArgs} from 'react-router';

export async function loader({context}: LoaderFunctionArgs) {
  const {data} = await context.customerAccount.query<{
    customer: {firstName: string; lastName: string};
  }>(`#graphql
    query getCustomer {
      customer {
        firstName
        lastName
      }
    }
    `);

  return {customer: data.customer};
}

export function ErrorBoundary() {
  const error = useRouteError();
  const location = useLocation();

  if (isRouteErrorResponse(error)) {
    if (error.status == 401) {
      return (
        <a
          href={`/account/login?${new URLSearchParams({
            return_to: location.pathname,
          }).toString()}`}
        >
          Login
        </a>
      );
    }
  }
}

// this should be an default export
export function Route() {
  const {customer} = useLoaderData<typeof loader>();

  return (
    <div style={{marginTop: 24}}>
      {customer ? (
        <>
          <div style={{marginBottom: 24}}>
            <b>
              Welcome {customer.firstName} {customer.lastName}
            </b>
          </div>
        </>
      ) : null}
    </div>
  );
}

````

### Opt out of logged-out behavior for a single route

Handle logged-out ahead of query```jsx
import {createCustomerAccountClient} from '@shopify/hydrogen';
// @ts-expect-error
import \* as reactRouterBuild from 'virtual:react-router/server-build';
import {
createRequestHandler,
createCookieSessionStorage,
} from 'react-router';

// In server.ts
export default {
async fetch(request, env, executionContext) {
const session = await AppSession.init(request, [env.SESSION_SECRET]);

    function customAuthStatusHandler() {
      return new Response('Customer is not login', {
        status: 401,
      });
    }

    /* Create a Customer API client with your credentials and options */
    const customerAccount = createCustomerAccountClient({
      /* Runtime utility in serverless environments */
      waitUntil: (p) => executionContext.waitUntil(p),
      /* Public Customer Account API client ID for your store */
      customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_ID,
      /* Shop Id */
      shopId: env.SHOP_ID,
      request,
      session,
      customAuthStatusHandler,
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      /* Inject the customer account client in the Remix context */
      getLoadContext: () => ({customerAccount}),
    });

    const response = await handleRequest(request);

    if (session.isPending) {
      response.headers.set('Set-Cookie', await session.commit());
    }

    return response;

},
};

class AppSession {
isPending = false;

static async init(request, secrets) {
const storage = createCookieSessionStorage({
cookie: {
name: 'session',
httpOnly: true,
path: '/',
sameSite: 'lax',
secrets,
},
});

    const session = await storage.getSession(request.headers.get('Cookie'));

    return new this(storage, session);

}

get(key) {
return this.session.get(key);
}

destroy() {
return this.sessionStorage.destroySession(this.session);
}

flash(key, value) {
this.session.flash(key, value);
}

unset(key) {
this.isPending = true;
this.session.unset(key);
}

set(key, value) {
this.isPending = true;
this.session.set(key, value);
}

commit() {
this.isPending = false;
return this.sessionStorage.commitSession(this.session);
}
}

/////////////////////////////////
// In a route
import {
useLoaderData,
useRouteError,
isRouteErrorResponse,
useLocation,
} from 'react-router';

export async function loader({context}) {
if (!(await context.customerAccount.isLoggedIn())) {
throw new Response('Customer is not login', {
status: 401,
});
}

const {data} = await context.customerAccount.query(
`#graphql
    query getCustomer {
      customer {
        firstName
        lastName
      }
    }
    `,
);

return {customer: data.customer};
}

export function ErrorBoundary() {
const error = useRouteError();
const location = useLocation();

if (isRouteErrorResponse(error)) {
if (error.status == 401) {
return (
<a
href={`/account/login?${new URLSearchParams({
            return_to: location.pathname,
          }).toString()}`} >
Login
</a>
);
}
}
}

// this should be an default export
export function Route() {
const {customer} = useLoaderData();

return (

<div style={{marginTop: 24}}>
{customer ? (
<>
<div style={{marginBottom: 24}}>
<b>
Welcome {customer.firstName} {customer.lastName}
</b>
</div>
</>
) : null}
</div>
);
}

````

```tsx
import {
  createCustomerAccountClient,
  type HydrogenSession,
} from '@shopify/hydrogen';
// @ts-expect-error
import * as reactRouterBuild from 'virtual:react-router/server-build';
import {
  createRequestHandler,
  createCookieSessionStorage,
  type SessionStorage,
  type Session,
} from 'react-router';

// In server.ts
export default {
  async fetch(
    request: Request,
    env: Record<string, string>,
    executionContext: ExecutionContext,
  ) {
    const session = await AppSession.init(request, [env.SESSION_SECRET]);

    function customAuthStatusHandler() {
      return new Response('Customer is not login', {
        status: 401,
      });
    }

    /* Create a Customer API client with your credentials and options */
    const customerAccount = createCustomerAccountClient({
      /* Runtime utility in serverless environments */
      waitUntil: (p) => executionContext.waitUntil(p),
      /* Public Customer Account API client ID for your store */
      customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_ID,
      /* Shop Id */
      shopId: env.SHOP_ID,
      request,
      session,
      customAuthStatusHandler,
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      /* Inject the customer account client in the Remix context */
      getLoadContext: () => ({customerAccount}),
    });

    const response = await handleRequest(request);

    if (session.isPending) {
      response.headers.set('Set-Cookie', await session.commit());
    }

    return response;
  },
};

class AppSession implements HydrogenSession {
  public isPending = false;

  constructor(
    private sessionStorage: SessionStorage,
    private session: Session,
  ) {}

  static async init(request: Request, secrets: string[]) {
    const storage = createCookieSessionStorage({
      cookie: {
        name: 'session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets,
      },
    });

    const session = await storage.getSession(request.headers.get('Cookie'));

    return new this(storage, session);
  }

  get(key: string) {
    return this.session.get(key);
  }

  destroy() {
    return this.sessionStorage.destroySession(this.session);
  }

  flash(key: string, value: any) {
    this.session.flash(key, value);
  }

  unset(key: string) {
    this.isPending = true;
    this.session.unset(key);
  }

  set(key: string, value: any) {
    this.isPending = true;
    this.session.set(key, value);
  }

  commit() {
    this.isPending = false;
    return this.sessionStorage.commitSession(this.session);
  }
}

/////////////////////////////////
// In a route
import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
  useLocation,
} from 'react-router';
import {type LoaderFunctionArgs} from 'react-router';

export async function loader({context}: LoaderFunctionArgs) {
  if (!(await context.customerAccount.isLoggedIn())) {
    throw new Response('Customer is not login', {
      status: 401,
    });
  }

  const {data} = await context.customerAccount.query(
    `#graphql
    query getCustomer {
      customer {
        firstName
        lastName
      }
    }
    `,
  );

  return {customer: data.customer};
}

export function ErrorBoundary() {
  const error = useRouteError();
  const location = useLocation();

  if (isRouteErrorResponse(error)) {
    if (error.status == 401) {
      return (
        <a
          href={`/account/login?${new URLSearchParams({
            return_to: location.pathname,
          }).toString()}`}
        >
          Login
        </a>
      );
    }
  }
}

// this should be an default export
export function Route() {
  const {customer} = useLoaderData<typeof loader>();

  return (
    <div style={{marginTop: 24}}>
      {customer ? (
        <>
          <div style={{marginBottom: 24}}>
            <b>
              Welcome {customer.firstName} {customer.lastName}
            </b>
          </div>
        </>
      ) : null}
    </div>
  );
}

````
