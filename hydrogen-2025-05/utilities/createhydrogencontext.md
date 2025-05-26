# createHydrogenContext


The `createHydrogenContext` function creates the context object required to use Hydrogen utilities throughout a Hydrogen project.

```jsx
import {createHydrogenContext} from '@shopify/hydrogen';
// @ts-expect-error
import * as reactRouterBuild from 'virtual:react-router/server-build';
import {
  createRequestHandler,
  createCookieSessionStorage,
} from '@shopify/remix-oxygen';

export default {
  async fetch(request, env, executionContext) {
    const waitUntil = executionContext.waitUntil.bind(executionContext);
    const [cache, session] = await Promise.all([
      caches.open('hydrogen'),
      AppSession.init(request, [env.SESSION_SECRET]),
    ]);

    /* Create context objects required to use Hydrogen with your credentials and options */
    const hydrogenContext = createHydrogenContext({
      /* Environment variables from the fetch function */
      env,
      /* Request object from the fetch function */
      request,
      /* Cache API instance */
      cache,
      /* Runtime utility in serverless environments */
      waitUntil,
      session,
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      /* Inject the customer account client in the Remix context */
      getLoadContext: () => ({...hydrogenContext}),
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
import {createHydrogenContext, type HydrogenSession} from '@shopify/hydrogen';
// @ts-expect-error
import * as reactRouterBuild from 'virtual:react-router/server-build';
import {
  createRequestHandler,
  createCookieSessionStorage,
  type SessionStorage,
  type Session,
} from '@shopify/remix-oxygen';

export default {
  async fetch(request: Request, env: Env, executionContext: ExecutionContext) {
    const waitUntil = executionContext.waitUntil.bind(executionContext);
    const [cache, session] = await Promise.all([
      caches.open('hydrogen'),
      AppSession.init(request, [env.SESSION_SECRET]),
    ]);

    /* Create context objects required to use Hydrogen with your credentials and options */
    const hydrogenContext = createHydrogenContext({
      /* Environment variables from the fetch function */
      env,
      /* Request object from the fetch function */
      request,
      /* Cache API instance */
      cache,
      /* Runtime utility in serverless environments */
      waitUntil,
      session,
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      /* Inject the customer account client in the Remix context */
      getLoadContext: () => ({...hydrogenContext}),
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

## createHydrogenContext(options)

### HydrogenContextOptionsForDocs

### cache

value: `Cache`

An instance that implements the [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache)

### cart

value: `{ getId?: () => string; setId?: (cartId: string) => Headers; queryFragment?: string; mutateFragment?: string; customMethods?: Record<string, Function>; }`

  - Headers: Headers
Cart handler overwrite options. See documentation for createCartHandler for more information.

### customerAccount

value: `{ apiVersion?: string; authUrl?: string; customAuthStatusHandler?: () => {} | Response; unstableB2b?: boolean; }`

Customer Account client overwrite options. See documentation for createCustomerAccountClient for more information.

### env

value: `TEnv`


### i18n

value: `TI18n`

An object containing a country code and language code

### logErrors

value: `boolean | ((error?: Error) => boolean)`

Whether it should print GraphQL errors automatically. Defaults to true

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

### session

value: `TSession`

Any cookie implementation. By default Hydrogen ships with cookie session storage, but you can use [another session storage](https://remix.run/docs/en/main/utils/sessions) implementation.

### storefront

value: `{ headers?: StorefrontHeaders; apiVersion?: string; }`

  - Headers: Headers
Storefront client overwrite options. See documentation for createStorefrontClient for more information.

### waitUntil

value: `WaitUntil`

The `waitUntil` function is used to keep the current request/response lifecycle alive even after a response has been sent. It should be provided by your platform.

### CrossRuntimeRequest

### headers

value: `{ [key: string]: any; get?: (key: string) => string; }`


### method

value: `string`


### url

value: `string`


## Related

- [createHydrogenContext](https://shopify.dev/docs/api/hydrogen/utilities/createhydrogencontext)

## Returns

### HydrogenContext

### cart

value: `TCustomMethods extends CustomMethodsBase ? HydrogenCartCustom<TCustomMethods> : HydrogenCart`

  - CustomMethodsBase: Record<string, Function>
  - HydrogenCartCustom: Omit<HydrogenCart, keyof TCustomMethods> & TCustomMethods
  - HydrogenCart: {
  get: ReturnType<typeof cartGetDefault>;
  getCartId: () => string | undefined;
  setCartId: (cartId: string) => Headers;
  create: ReturnType<typeof cartCreateDefault>;
  addLines: ReturnType<typeof cartLinesAddDefault>;
  updateLines: ReturnType<typeof cartLinesUpdateDefault>;
  removeLines: ReturnType<typeof cartLinesRemoveDefault>;
  updateDiscountCodes: ReturnType<typeof cartDiscountCodesUpdateDefault>;
  updateGiftCardCodes: ReturnType<typeof cartGiftCardCodesUpdateDefault>;
  updateBuyerIdentity: ReturnType<typeof cartBuyerIdentityUpdateDefault>;
  updateNote: ReturnType<typeof cartNoteUpdateDefault>;
  updateSelectedDeliveryOption: ReturnType<
    typeof cartSelectedDeliveryOptionsUpdateDefault
  >;
  updateAttributes: ReturnType<typeof cartAttributesUpdateDefault>;
  setMetafields: ReturnType<typeof cartMetafieldsSetDefault>;
  deleteMetafield: ReturnType<typeof cartMetafieldDeleteDefault>;
  /**
   * Adds delivery addresses to the cart.
   *
   * This function sends a mutation to the storefront API to add one or more delivery addresses to the cart.
   * It returns the result of the mutation, including any errors that occurred.
   *
   * @param {CartQueryOptions} options - The options for the cart query, including the storefront API client and cart fragment.
   * @returns {ReturnType<typeof cartDeliveryAddressesAddDefault>} - A function that takes an array of addresses and optional parameters, and returns the result of the API call.
   *
   * @example
   * const result = await cart.addDeliveryAddresses(
   *   [
   *     {
   *       address1: '123 Main St',
   *       city: 'Anytown',
   *       countryCode: 'US'
   *     }
   *   ],
   *   { someOptionalParam: 'value' }
   * );
   */
  addDeliveryAddresses: ReturnType<typeof cartDeliveryAddressesAddDefault>;
  /**
   * Removes delivery addresses from the cart.
   *
   * This function sends a mutation to the storefront API to remove one or more delivery addresses from the cart.
   * It returns the result of the mutation, including any errors that occurred.
   *
   * @param {CartQueryOptions} options - The options for the cart query, including the storefront API client and cart fragment.
   * @returns {CartDeliveryAddressRemoveFunction} - A function that takes an array of address IDs and optional parameters, and returns the result of the API call.
   *
   * @example
   * const result = await cart.removeDeliveryAddresses([
   *   "gid://shopify/<objectName>/10079785100"
   * ],
   * { someOptionalParam: 'value' });
   */

  removeDeliveryAddresses: ReturnType<
    typeof cartDeliveryAddressesRemoveDefault
  >;
  /**
  * Updates delivery addresses in the cart.
  *
  * This function sends a mutation to the storefront API to update one or more delivery addresses in the cart.
  * It returns the result of the mutation, including any errors that occurred.
  *
  * @param {CartQueryOptions} options - The options for the cart query, including the storefront API client and cart fragment.
  * @returns {CartDeliveryAddressUpdateFunction} - A function that takes an array of addresses and optional parameters, and returns the result of the API call.
  *
  * const result = await cart.updateDeliveryAddresses([
      {
        "address": {
          "copyFromCustomerAddressId": "gid://shopify/<objectName>/10079785100",
          "deliveryAddress": {
            "address1": "<your-address1>",
            "address2": "<your-address2>",
            "city": "<your-city>",
            "company": "<your-company>",
            "countryCode": "AC",
            "firstName": "<your-firstName>",
            "lastName": "<your-lastName>",
            "phone": "<your-phone>",
            "provinceCode": "<your-provinceCode>",
            "zip": "<your-zip>"
          }
        },
        "id": "gid://shopify/<objectName>/10079785100",
        "oneTimeUse": true,
        "selected": true,
        "validationStrategy": "COUNTRY_CODE_ONLY"
      }
    ],{ someOptionalParam: 'value' });
  */
  updateDeliveryAddresses: ReturnType<
    typeof cartDeliveryAddressesUpdateDefault
  >;
}
A collection of utilities used to interact with the cart.

### customerAccount

value: `CustomerAccount`

  - CustomerAccount: {
  /** Start the OAuth login flow. This function should be called and returned from a Remix loader.
   * It redirects the customer to a Shopify login domain. It also defined the final path the customer
   * lands on at the end of the oAuth flow with the value of the `return_to` query param. (This is
   * automatically setup unless `customAuthStatusHandler` option is in use)
   *
   * @param options.uiLocales - The displayed language of the login page. Only support for the following languages:
   * `en`, `fr`, `cs`, `da`, `de`, `es`, `fi`, `it`, `ja`, `ko`, `nb`, `nl`, `pl`, `pt-BR`, `pt-PT`,
   * `sv`, `th`, `tr`, `vi`, `zh-CN`, `zh-TW`. If supplied any other language code, it will default to `en`.
   * */
  login: (options?: LoginOptions) => Promise<Response>;
  /** On successful login, the customer redirects back to your app. This function validates the OAuth response and exchanges the authorization code for an access token and refresh token. It also persists the tokens on your session. This function should be called and returned from the Remix loader configured as the redirect URI within the Customer Account API settings in admin. */
  authorize: () => Promise<Response>;
  /** Returns if the customer is logged in. It also checks if the access token is expired and refreshes it if needed. */
  isLoggedIn: () => Promise<boolean>;
  /** Check for a not logged in customer and redirect customer to login page. The redirect can be overwritten with `customAuthStatusHandler` option. */
  handleAuthStatus: () => void | DataFunctionValue;
  /** Returns CustomerAccessToken if the customer is logged in. It also run a expiry check and does a token refresh if needed. */
  getAccessToken: () => Promise<string | undefined>;
  /** Creates the fully-qualified URL to your store's GraphQL endpoint.*/
  getApiUrl: () => string;
  /** Logout the customer by clearing the session and redirecting to the login domain. It should be called and returned from a Remix action. The path app should redirect to after logout can be setup in Customer Account API settings in admin.
   *
   * @param options.postLogoutRedirectUri - The url to redirect customer to after logout, should be a relative URL. This url will need to included in Customer Account API's application setup for logout URI. The default value is current app origin, which is automatically setup in admin when using `--customer-account-push` flag with dev.
   * @param options.headers - These will be passed along to the logout redirect. You can use these to set/clear cookies on logout, like the cart.
   * @param options.keepSession - If true, custom data in the session will not be cleared on logout.
   * */
  logout: (options?: LogoutOptions) => Promise<Response>;
  /** Execute a GraphQL query against the Customer Account API. This method execute `handleAuthStatus()` ahead of query. */
  query: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    query: RawGqlString,
    ...options: ClientVariablesInRestParams<
      CustomerAccountQueries,
      RawGqlString
    >
  ) => Promise<
    Omit<
      CustomerAPIResponse<
        ClientReturn<CustomerAccountQueries, RawGqlString, OverrideReturnType>
      >,
      'errors'
    > & {errors?: JsonGraphQLError[]}
  >;
  /** Execute a GraphQL mutation against the Customer Account API. This method execute `handleAuthStatus()` ahead of mutation. */
  mutate: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    mutation: RawGqlString,
    ...options: ClientVariablesInRestParams<
      CustomerAccountMutations,
      RawGqlString
    >
  ) => Promise<
    Omit<
      CustomerAPIResponse<
        ClientReturn<CustomerAccountMutations, RawGqlString, OverrideReturnType>
      >,
      'errors'
    > & {errors?: JsonGraphQLError[]}
  >;
  /** Set buyer information into session.*/
  setBuyer: (buyer: Buyer) => void;
  /** Get buyer token and company location id from session.*/
  getBuyer: () => Promise<Buyer>;
  /** Deprecated. Please use setBuyer. Set buyer information into session.*/
  UNSTABLE_setBuyer: (buyer: Buyer) => void;
  /** Deprecated. Please use getBuyer. Get buyer token and company location id from session.*/
  UNSTABLE_getBuyer: () => Promise<Buyer>;
}
A GraphQL client for querying the [Customer Account API](https://shopify.dev/docs/api/customer). It also provides methods to authenticate and check if the user is logged in.

### env

value: `TEnv`


### session

value: `TSession`

Any cookie implementation. By default Hydrogen ships with cookie session storage, but you can use [another session storage](https://remix.run/docs/en/main/utils/sessions) implementation.

### storefront

value: `Storefront<TI18n>`

  - Storefront: {
  query: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    query: RawGqlString,
    ...options: ClientVariablesInRestParams<
      StorefrontQueries,
      RawGqlString,
      StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, 'cache'>,
      AutoAddedVariableNames
    >
  ) => Promise<
    ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> &
      StorefrontError
  >;
  mutate: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    mutation: RawGqlString,
    ...options: ClientVariablesInRestParams<
      StorefrontMutations,
      RawGqlString,
      StorefrontCommonExtraParams,
      AutoAddedVariableNames
    >
  ) => Promise<
    ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> &
      StorefrontError
  >;
  cache?: Cache;
  CacheNone: typeof CacheNone;
  CacheLong: typeof CacheLong;
  CacheShort: typeof CacheShort;
  CacheCustom: typeof CacheCustom;
  generateCacheControlHeader: typeof generateCacheControlHeader;
  getPublicTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPublicTokenHeaders'];
  getPrivateTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPrivateTokenHeaders'];
  getShopifyDomain: ReturnType<
    typeof createStorefrontUtilities
  >['getShopifyDomain'];
  getApiUrl: ReturnType<
    typeof createStorefrontUtilities
  >['getStorefrontApiUrl'];
  i18n: TI18n;
}
A GraphQL client for querying the [Storefront API](https://shopify.dev/docs/api/storefront).

### waitUntil

value: `WaitUntil`

The `waitUntil` function is used to keep the current request/response lifecycle alive even after a response has been sent. It should be provided by your platform.

### HydrogenCart

### addDeliveryAddresses

value: `ReturnType<typeof cartDeliveryAddressesAddDefault>`

Adds delivery addresses to the cart.

This function sends a mutation to the storefront API to add one or more delivery addresses to the cart. It returns the result of the mutation, including any errors that occurred.

### addLines

value: `ReturnType<typeof cartLinesAddDefault>`


### create

value: `ReturnType<typeof cartCreateDefault>`


### deleteMetafield

value: `ReturnType<typeof cartMetafieldDeleteDefault>`


### get

value: `ReturnType<typeof cartGetDefault>`


### getCartId

value: `() => string`


### removeDeliveryAddresses

value: `ReturnType<
    typeof cartDeliveryAddressesRemoveDefault
  >`

Removes delivery addresses from the cart.

This function sends a mutation to the storefront API to remove one or more delivery addresses from the cart. It returns the result of the mutation, including any errors that occurred.

### removeLines

value: `ReturnType<typeof cartLinesRemoveDefault>`


### setCartId

value: `(cartId: string) => Headers`

  - Headers: Headers

### setMetafields

value: `ReturnType<typeof cartMetafieldsSetDefault>`


### updateAttributes

value: `ReturnType<typeof cartAttributesUpdateDefault>`


### updateBuyerIdentity

value: `ReturnType<typeof cartBuyerIdentityUpdateDefault>`


### updateDeliveryAddresses

value: `ReturnType<
    typeof cartDeliveryAddressesUpdateDefault
  >`

Updates delivery addresses in the cart.

This function sends a mutation to the storefront API to update one or more delivery addresses in the cart. It returns the result of the mutation, including any errors that occurred.

### updateDiscountCodes

value: `ReturnType<typeof cartDiscountCodesUpdateDefault>`


### updateGiftCardCodes

value: `ReturnType<typeof cartGiftCardCodesUpdateDefault>`


### updateLines

value: `ReturnType<typeof cartLinesUpdateDefault>`


### updateNote

value: `ReturnType<typeof cartNoteUpdateDefault>`


### updateSelectedDeliveryOption

value: `ReturnType<
    typeof cartSelectedDeliveryOptionsUpdateDefault
  >`


### CustomerAccount

### authorize

value: `() => Promise<Response>`

On successful login, the customer redirects back to your app. This function validates the OAuth response and exchanges the authorization code for an access token and refresh token. It also persists the tokens on your session. This function should be called and returned from the Remix loader configured as the redirect URI within the Customer Account API settings in admin.

### getAccessToken

value: `() => Promise<string>`

Returns CustomerAccessToken if the customer is logged in. It also run a expiry check and does a token refresh if needed.

### getApiUrl

value: `() => string`

Creates the fully-qualified URL to your store's GraphQL endpoint.

### getBuyer

value: `() => Promise<Partial<BuyerInput>>`

Get buyer token and company location id from session.

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
Start the OAuth login flow. This function should be called and returned from a Remix loader. It redirects the customer to a Shopify login domain. It also defined the final path the customer lands on at the end of the oAuth flow with the value of the `return_to` query param. (This is automatically setup unless `customAuthStatusHandler` option is in use)

### logout

value: `(options?: LogoutOptions) => Promise<Response>`

  - LogoutOptions: {
  /** The url to redirect customer to after logout, should be a relative URL. This url will need to included in Customer Account API's application setup for logout URI. The default value is current app origin, which is automatically setup in admin when using `--customer-account-push` flag with dev. */
  postLogoutRedirectUri?: string;
  /** Add custom headers to the logout redirect. */
  headers?: HeadersInit;
  /** If true, custom data in the session will not be cleared on logout. */
  keepSession?: boolean;
}
Logout the customer by clearing the session and redirecting to the login domain. It should be called and returned from a Remix action. The path app should redirect to after logout can be setup in Customer Account API settings in admin.

### mutate

value: `<OverrideReturnType extends unknown = never, RawGqlString extends string = string>(mutation: RawGqlString, ...options: IsOptionalVariables<CustomerAccountMutations[RawGqlString]["variables"], never, Omit<CustomerAccountMutations[RawGqlString]["variables"], never>> extends true ? [({} & ClientVariables<CustomerAccountMutations, RawGqlString, never, "variables", RawGqlString extends never ? SetOptional<CustomerAccountMutations[RawGqlString]["variables"], Extract<keyof CustomerAccountMutations[RawGqlString]["variables"], never>> : { readonly [variable: string]: unknown; }, Record<"variables", RawGqlString extends never ? SetOptional<CustomerAccountMutations[RawGqlString]["variables"], Extract<keyof CustomerAccountMutations[RawGqlString]["variables"], never>> : { readonly [variable: string]: unknown; }>>)?] : [{} & ClientVariables<CustomerAccountMutations, RawGqlString, never, "variables", RawGqlString extends never ? SetOptional<CustomerAccountMutations[RawGqlString]["variables"], Extract<keyof CustomerAccountMutations[RawGqlString]["variables"], never>> : { readonly [variable: string]: unknown; }, Record<"variables", RawGqlString extends never ? SetOptional<CustomerAccountMutations[RawGqlString]["variables"], Extract<keyof CustomerAccountMutations[RawGqlString]["variables"], never>> : { readonly [variable: string]: unknown; }>>]) => Promise<Omit<CustomerAPIResponse<ClientReturn<CustomerAccountMutations, RawGqlString, OverrideReturnType>>, "errors"> & { errors?: Pick<GraphQLError, "path" | "name" | "message" | "extensions" | "locations" | "stack">[]; }>`

  - CustomerAccount: {
  /** Start the OAuth login flow. This function should be called and returned from a Remix loader.
   * It redirects the customer to a Shopify login domain. It also defined the final path the customer
   * lands on at the end of the oAuth flow with the value of the `return_to` query param. (This is
   * automatically setup unless `customAuthStatusHandler` option is in use)
   *
   * @param options.uiLocales - The displayed language of the login page. Only support for the following languages:
   * `en`, `fr`, `cs`, `da`, `de`, `es`, `fi`, `it`, `ja`, `ko`, `nb`, `nl`, `pl`, `pt-BR`, `pt-PT`,
   * `sv`, `th`, `tr`, `vi`, `zh-CN`, `zh-TW`. If supplied any other language code, it will default to `en`.
   * */
  login: (options?: LoginOptions) => Promise<Response>;
  /** On successful login, the customer redirects back to your app. This function validates the OAuth response and exchanges the authorization code for an access token and refresh token. It also persists the tokens on your session. This function should be called and returned from the Remix loader configured as the redirect URI within the Customer Account API settings in admin. */
  authorize: () => Promise<Response>;
  /** Returns if the customer is logged in. It also checks if the access token is expired and refreshes it if needed. */
  isLoggedIn: () => Promise<boolean>;
  /** Check for a not logged in customer and redirect customer to login page. The redirect can be overwritten with `customAuthStatusHandler` option. */
  handleAuthStatus: () => void | DataFunctionValue;
  /** Returns CustomerAccessToken if the customer is logged in. It also run a expiry check and does a token refresh if needed. */
  getAccessToken: () => Promise<string | undefined>;
  /** Creates the fully-qualified URL to your store's GraphQL endpoint.*/
  getApiUrl: () => string;
  /** Logout the customer by clearing the session and redirecting to the login domain. It should be called and returned from a Remix action. The path app should redirect to after logout can be setup in Customer Account API settings in admin.
   *
   * @param options.postLogoutRedirectUri - The url to redirect customer to after logout, should be a relative URL. This url will need to included in Customer Account API's application setup for logout URI. The default value is current app origin, which is automatically setup in admin when using `--customer-account-push` flag with dev.
   * @param options.headers - These will be passed along to the logout redirect. You can use these to set/clear cookies on logout, like the cart.
   * @param options.keepSession - If true, custom data in the session will not be cleared on logout.
   * */
  logout: (options?: LogoutOptions) => Promise<Response>;
  /** Execute a GraphQL query against the Customer Account API. This method execute `handleAuthStatus()` ahead of query. */
  query: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    query: RawGqlString,
    ...options: ClientVariablesInRestParams<
      CustomerAccountQueries,
      RawGqlString
    >
  ) => Promise<
    Omit<
      CustomerAPIResponse<
        ClientReturn<CustomerAccountQueries, RawGqlString, OverrideReturnType>
      >,
      'errors'
    > & {errors?: JsonGraphQLError[]}
  >;
  /** Execute a GraphQL mutation against the Customer Account API. This method execute `handleAuthStatus()` ahead of mutation. */
  mutate: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    mutation: RawGqlString,
    ...options: ClientVariablesInRestParams<
      CustomerAccountMutations,
      RawGqlString
    >
  ) => Promise<
    Omit<
      CustomerAPIResponse<
        ClientReturn<CustomerAccountMutations, RawGqlString, OverrideReturnType>
      >,
      'errors'
    > & {errors?: JsonGraphQLError[]}
  >;
  /** Set buyer information into session.*/
  setBuyer: (buyer: Buyer) => void;
  /** Get buyer token and company location id from session.*/
  getBuyer: () => Promise<Buyer>;
  /** Deprecated. Please use setBuyer. Set buyer information into session.*/
  UNSTABLE_setBuyer: (buyer: Buyer) => void;
  /** Deprecated. Please use getBuyer. Get buyer token and company location id from session.*/
  UNSTABLE_getBuyer: () => Promise<Buyer>;
}
  - CustomerAccountMutations: export interface CustomerAccountMutations {
  // Example of how a generated mutation type looks like:
  // '#graphql mutation m1 {...}': {return: M1Mutation; variables: M1MutationVariables};
}
  - CustomerAPIResponse: {
  data: ReturnType;
  errors: Array<{
    message: string;
    locations?: Array<{line: number; column: number}>;
    path?: Array<string>;
    extensions: {code: string};
  }>;
  extensions: {
    cost: {
      requestQueryCost: number;
      actualQueryCakes: number;
      throttleStatus: {
        maximumAvailable: number;
        currentAvailable: number;
        restoreRate: number;
      };
    };
  };
}
  - GraphQLError: export class GraphQLError extends Error {
  /**
   * If an error can be associated to a particular point in the requested
   * GraphQL document, it should contain a list of locations.
   */
  locations?: Array<{line: number; column: number}>;
  /**
   * If an error can be associated to a particular field in the GraphQL result,
   * it _must_ contain an entry with the key `path` that details the path of
   * the response field which experienced the error. This allows clients to
   * identify whether a null result is intentional or caused by a runtime error.
   */
  path?: Array<string | number>;
  /**
   * Reserved for implementors to extend the protocol however they see fit,
   * and hence there are no additional restrictions on its contents.
   */
  extensions?: {[key: string]: unknown};

  constructor(
    message?: string,
    options: Pick<
      GraphQLError,
      'locations' | 'path' | 'extensions' | 'stack' | 'cause'
    > & {
      query?: string;
      queryVariables?: GenericVariables;
      requestId?: string | null;
      clientOperation?: string;
    } = {},
  ) {
    const h2Prefix = options.clientOperation
      ? `[h2:error:${options.clientOperation}] `
      : '';

    const enhancedMessage =
      h2Prefix +
      message +
      (options.requestId ? ` - Request ID: ${options.requestId}` : '');

    super(enhancedMessage);
    this.name = 'GraphQLError';
    this.extensions = options.extensions;
    this.locations = options.locations;
    this.path = options.path;
    this.stack = options.stack || undefined;

    try {
      this.cause = JSON.stringify({
        ...(typeof options.cause === 'object' ? options.cause : {}),
        requestId: options.requestId,
        ...(process.env.NODE_ENV === 'development' && {
          path: options.path,
          extensions: options.extensions,
          graphql: h2Prefix &&
            options.query && {
              query: options.query,
              variables: JSON.stringify(options.queryVariables),
            },
        }),
      });
    } catch {
      if (options.cause) this.cause = options.cause;
    }
  }

  get [Symbol.toStringTag]() {
    return this.name;
  }

  /**
   * Note: `toString()` is internally used by `console.log(...)` / `console.error(...)`
   * when ingesting logs in Oxygen production. Therefore, we want to make sure that
   * the error message is as informative as possible instead of `[object Object]`.
   */
  override toString() {
    let result = `${this.name}: ${this.message}`;

    if (this.path) {
      try {
        result += ` | path: ${JSON.stringify(this.path)}`;
      } catch {}
    }

    if (this.extensions) {
      try {
        result += ` | extensions: ${JSON.stringify(this.extensions)}`;
      } catch {}
    }

    result += '\n';

    if (this.stack) {
      // Remove the message line from the stack.
      result += `${this.stack.slice(this.stack.indexOf('\n') + 1)}\n`;
    }

    return result;
  }

  /**
   * Note: toJSON` is internally used by `JSON.stringify(...)`.
   * The most common scenario when this error instance is going to be stringified is
   * when it's passed to Remix' `json` and `defer` functions: e.g. `{promise: storefront.query(...)}`.
   * In this situation, we don't want to expose private error information to the browser so we only
   * do it in development.
   */
  toJSON() {
    const formatted: Pick<
      GraphQLError,
      'name' | 'message' | 'path' | 'extensions' | 'locations' | 'stack'
    > = {name: 'Error', message: ''};

    if (process.env.NODE_ENV === 'development') {
      formatted.name = this.name;
      formatted.message = 'Development: ' + this.message;
      if (this.path) formatted.path = this.path;
      if (this.locations) formatted.locations = this.locations;
      if (this.extensions) formatted.extensions = this.extensions;
      // Skip stack on purpose because we don't want to expose it to the browser.
    }

    return formatted;
  }
}
Execute a GraphQL mutation against the Customer Account API. This method execute `handleAuthStatus()` ahead of mutation.

### query

value: `<OverrideReturnType extends unknown = never, RawGqlString extends string = string>(query: RawGqlString, ...options: IsOptionalVariables<CustomerAccountQueries[RawGqlString]["variables"], never, Omit<CustomerAccountQueries[RawGqlString]["variables"], never>> extends true ? [({} & ClientVariables<CustomerAccountQueries, RawGqlString, never, "variables", RawGqlString extends never ? SetOptional<CustomerAccountQueries[RawGqlString]["variables"], Extract<keyof CustomerAccountQueries[RawGqlString]["variables"], never>> : { readonly [variable: string]: unknown; }, Record<"variables", RawGqlString extends never ? SetOptional<CustomerAccountQueries[RawGqlString]["variables"], Extract<keyof CustomerAccountQueries[RawGqlString]["variables"], never>> : { readonly [variable: string]: unknown; }>>)?] : [{} & ClientVariables<CustomerAccountQueries, RawGqlString, never, "variables", RawGqlString extends never ? SetOptional<CustomerAccountQueries[RawGqlString]["variables"], Extract<keyof CustomerAccountQueries[RawGqlString]["variables"], never>> : { readonly [variable: string]: unknown; }, Record<"variables", RawGqlString extends never ? SetOptional<CustomerAccountQueries[RawGqlString]["variables"], Extract<keyof CustomerAccountQueries[RawGqlString]["variables"], never>> : { readonly [variable: string]: unknown; }>>]) => Promise<Omit<CustomerAPIResponse<ClientReturn<CustomerAccountQueries, RawGqlString, OverrideReturnType>>, "errors"> & { errors?: Pick<GraphQLError, "path" | "name" | "message" | "extensions" | "locations" | "stack">[]; }>`

  - CustomerAccount: {
  /** Start the OAuth login flow. This function should be called and returned from a Remix loader.
   * It redirects the customer to a Shopify login domain. It also defined the final path the customer
   * lands on at the end of the oAuth flow with the value of the `return_to` query param. (This is
   * automatically setup unless `customAuthStatusHandler` option is in use)
   *
   * @param options.uiLocales - The displayed language of the login page. Only support for the following languages:
   * `en`, `fr`, `cs`, `da`, `de`, `es`, `fi`, `it`, `ja`, `ko`, `nb`, `nl`, `pl`, `pt-BR`, `pt-PT`,
   * `sv`, `th`, `tr`, `vi`, `zh-CN`, `zh-TW`. If supplied any other language code, it will default to `en`.
   * */
  login: (options?: LoginOptions) => Promise<Response>;
  /** On successful login, the customer redirects back to your app. This function validates the OAuth response and exchanges the authorization code for an access token and refresh token. It also persists the tokens on your session. This function should be called and returned from the Remix loader configured as the redirect URI within the Customer Account API settings in admin. */
  authorize: () => Promise<Response>;
  /** Returns if the customer is logged in. It also checks if the access token is expired and refreshes it if needed. */
  isLoggedIn: () => Promise<boolean>;
  /** Check for a not logged in customer and redirect customer to login page. The redirect can be overwritten with `customAuthStatusHandler` option. */
  handleAuthStatus: () => void | DataFunctionValue;
  /** Returns CustomerAccessToken if the customer is logged in. It also run a expiry check and does a token refresh if needed. */
  getAccessToken: () => Promise<string | undefined>;
  /** Creates the fully-qualified URL to your store's GraphQL endpoint.*/
  getApiUrl: () => string;
  /** Logout the customer by clearing the session and redirecting to the login domain. It should be called and returned from a Remix action. The path app should redirect to after logout can be setup in Customer Account API settings in admin.
   *
   * @param options.postLogoutRedirectUri - The url to redirect customer to after logout, should be a relative URL. This url will need to included in Customer Account API's application setup for logout URI. The default value is current app origin, which is automatically setup in admin when using `--customer-account-push` flag with dev.
   * @param options.headers - These will be passed along to the logout redirect. You can use these to set/clear cookies on logout, like the cart.
   * @param options.keepSession - If true, custom data in the session will not be cleared on logout.
   * */
  logout: (options?: LogoutOptions) => Promise<Response>;
  /** Execute a GraphQL query against the Customer Account API. This method execute `handleAuthStatus()` ahead of query. */
  query: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    query: RawGqlString,
    ...options: ClientVariablesInRestParams<
      CustomerAccountQueries,
      RawGqlString
    >
  ) => Promise<
    Omit<
      CustomerAPIResponse<
        ClientReturn<CustomerAccountQueries, RawGqlString, OverrideReturnType>
      >,
      'errors'
    > & {errors?: JsonGraphQLError[]}
  >;
  /** Execute a GraphQL mutation against the Customer Account API. This method execute `handleAuthStatus()` ahead of mutation. */
  mutate: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    mutation: RawGqlString,
    ...options: ClientVariablesInRestParams<
      CustomerAccountMutations,
      RawGqlString
    >
  ) => Promise<
    Omit<
      CustomerAPIResponse<
        ClientReturn<CustomerAccountMutations, RawGqlString, OverrideReturnType>
      >,
      'errors'
    > & {errors?: JsonGraphQLError[]}
  >;
  /** Set buyer information into session.*/
  setBuyer: (buyer: Buyer) => void;
  /** Get buyer token and company location id from session.*/
  getBuyer: () => Promise<Buyer>;
  /** Deprecated. Please use setBuyer. Set buyer information into session.*/
  UNSTABLE_setBuyer: (buyer: Buyer) => void;
  /** Deprecated. Please use getBuyer. Get buyer token and company location id from session.*/
  UNSTABLE_getBuyer: () => Promise<Buyer>;
}
  - CustomerAPIResponse: {
  data: ReturnType;
  errors: Array<{
    message: string;
    locations?: Array<{line: number; column: number}>;
    path?: Array<string>;
    extensions: {code: string};
  }>;
  extensions: {
    cost: {
      requestQueryCost: number;
      actualQueryCakes: number;
      throttleStatus: {
        maximumAvailable: number;
        currentAvailable: number;
        restoreRate: number;
      };
    };
  };
}
  - GraphQLError: export class GraphQLError extends Error {
  /**
   * If an error can be associated to a particular point in the requested
   * GraphQL document, it should contain a list of locations.
   */
  locations?: Array<{line: number; column: number}>;
  /**
   * If an error can be associated to a particular field in the GraphQL result,
   * it _must_ contain an entry with the key `path` that details the path of
   * the response field which experienced the error. This allows clients to
   * identify whether a null result is intentional or caused by a runtime error.
   */
  path?: Array<string | number>;
  /**
   * Reserved for implementors to extend the protocol however they see fit,
   * and hence there are no additional restrictions on its contents.
   */
  extensions?: {[key: string]: unknown};

  constructor(
    message?: string,
    options: Pick<
      GraphQLError,
      'locations' | 'path' | 'extensions' | 'stack' | 'cause'
    > & {
      query?: string;
      queryVariables?: GenericVariables;
      requestId?: string | null;
      clientOperation?: string;
    } = {},
  ) {
    const h2Prefix = options.clientOperation
      ? `[h2:error:${options.clientOperation}] `
      : '';

    const enhancedMessage =
      h2Prefix +
      message +
      (options.requestId ? ` - Request ID: ${options.requestId}` : '');

    super(enhancedMessage);
    this.name = 'GraphQLError';
    this.extensions = options.extensions;
    this.locations = options.locations;
    this.path = options.path;
    this.stack = options.stack || undefined;

    try {
      this.cause = JSON.stringify({
        ...(typeof options.cause === 'object' ? options.cause : {}),
        requestId: options.requestId,
        ...(process.env.NODE_ENV === 'development' && {
          path: options.path,
          extensions: options.extensions,
          graphql: h2Prefix &&
            options.query && {
              query: options.query,
              variables: JSON.stringify(options.queryVariables),
            },
        }),
      });
    } catch {
      if (options.cause) this.cause = options.cause;
    }
  }

  get [Symbol.toStringTag]() {
    return this.name;
  }

  /**
   * Note: `toString()` is internally used by `console.log(...)` / `console.error(...)`
   * when ingesting logs in Oxygen production. Therefore, we want to make sure that
   * the error message is as informative as possible instead of `[object Object]`.
   */
  override toString() {
    let result = `${this.name}: ${this.message}`;

    if (this.path) {
      try {
        result += ` | path: ${JSON.stringify(this.path)}`;
      } catch {}
    }

    if (this.extensions) {
      try {
        result += ` | extensions: ${JSON.stringify(this.extensions)}`;
      } catch {}
    }

    result += '\n';

    if (this.stack) {
      // Remove the message line from the stack.
      result += `${this.stack.slice(this.stack.indexOf('\n') + 1)}\n`;
    }

    return result;
  }

  /**
   * Note: toJSON` is internally used by `JSON.stringify(...)`.
   * The most common scenario when this error instance is going to be stringified is
   * when it's passed to Remix' `json` and `defer` functions: e.g. `{promise: storefront.query(...)}`.
   * In this situation, we don't want to expose private error information to the browser so we only
   * do it in development.
   */
  toJSON() {
    const formatted: Pick<
      GraphQLError,
      'name' | 'message' | 'path' | 'extensions' | 'locations' | 'stack'
    > = {name: 'Error', message: ''};

    if (process.env.NODE_ENV === 'development') {
      formatted.name = this.name;
      formatted.message = 'Development: ' + this.message;
      if (this.path) formatted.path = this.path;
      if (this.locations) formatted.locations = this.locations;
      if (this.extensions) formatted.extensions = this.extensions;
      // Skip stack on purpose because we don't want to expose it to the browser.
    }

    return formatted;
  }
}
  - CustomerAccountQueries: export interface CustomerAccountQueries {
  // Example of how a generated query type looks like:
  // '#graphql query q1 {...}': {return: Q1Query; variables: Q1QueryVariables};
}
Execute a GraphQL query against the Customer Account API. This method execute `handleAuthStatus()` ahead of query.

### setBuyer

value: `(buyer: Partial<BuyerInput>) => void`

Set buyer information into session.

### UNSTABLE_getBuyer

value: `() => Promise<Partial<BuyerInput>>`

Deprecated. Please use getBuyer. Get buyer token and company location id from session.

### UNSTABLE_setBuyer

value: `(buyer: Partial<BuyerInput>) => void`

Deprecated. Please use setBuyer. Set buyer information into session.

### LoginOptions

### uiLocales

value: `LanguageCode`


### LogoutOptions

### headers

value: `HeadersInit`

  - Headers: Headers
Add custom headers to the logout redirect.

### keepSession

value: `boolean`

If true, custom data in the session will not be cleared on logout.

### postLogoutRedirectUri

value: `string`

The url to redirect customer to after logout, should be a relative URL. This url will need to included in Customer Account API's application setup for logout URI. The default value is current app origin, which is automatically setup in admin when using `--customer-account-push` flag with dev.

### CustomerAPIResponse

### data

value: `ReturnType`


### errors

value: `Array<{
    message: string;
    locations?: Array<{line: number; column: number}>;
    path?: Array<string>;
    extensions: {code: string};
  }>`


### extensions

value: `{ cost: { requestQueryCost: number; actualQueryCakes: number; throttleStatus: { maximumAvailable: number; currentAvailable: number; restoreRate: number; }; }; }`


### GraphQLError

### locations

value: `{ line: number; column: number; }[]`

If an error can be associated to a particular point in the requested GraphQL document, it should contain a list of locations.

### path

value: `(string | number)[]`

If an error can be associated to a particular field in the GraphQL result, it _must_ contain an entry with the key `path` that details the path of the response field which experienced the error. This allows clients to identify whether a null result is intentional or caused by a runtime error.

### extensions

value: `{ [key: string]: unknown; }`

Reserved for implementors to extend the protocol however they see fit, and hence there are no additional restrictions on its contents.

### toString

value: `() => string`

Note: `toString()` is internally used by `console.log(...)` / `console.error(...)` when ingesting logs in Oxygen production. Therefore, we want to make sure that the error message is as informative as possible instead of `[object Object]`.

### toJSON

value: `() => Pick<GraphQLError, "path" | "name" | "message" | "extensions" | "locations" | "stack">`

  - GraphQLError: export class GraphQLError extends Error {
  /**
   * If an error can be associated to a particular point in the requested
   * GraphQL document, it should contain a list of locations.
   */
  locations?: Array<{line: number; column: number}>;
  /**
   * If an error can be associated to a particular field in the GraphQL result,
   * it _must_ contain an entry with the key `path` that details the path of
   * the response field which experienced the error. This allows clients to
   * identify whether a null result is intentional or caused by a runtime error.
   */
  path?: Array<string | number>;
  /**
   * Reserved for implementors to extend the protocol however they see fit,
   * and hence there are no additional restrictions on its contents.
   */
  extensions?: {[key: string]: unknown};

  constructor(
    message?: string,
    options: Pick<
      GraphQLError,
      'locations' | 'path' | 'extensions' | 'stack' | 'cause'
    > & {
      query?: string;
      queryVariables?: GenericVariables;
      requestId?: string | null;
      clientOperation?: string;
    } = {},
  ) {
    const h2Prefix = options.clientOperation
      ? `[h2:error:${options.clientOperation}] `
      : '';

    const enhancedMessage =
      h2Prefix +
      message +
      (options.requestId ? ` - Request ID: ${options.requestId}` : '');

    super(enhancedMessage);
    this.name = 'GraphQLError';
    this.extensions = options.extensions;
    this.locations = options.locations;
    this.path = options.path;
    this.stack = options.stack || undefined;

    try {
      this.cause = JSON.stringify({
        ...(typeof options.cause === 'object' ? options.cause : {}),
        requestId: options.requestId,
        ...(process.env.NODE_ENV === 'development' && {
          path: options.path,
          extensions: options.extensions,
          graphql: h2Prefix &&
            options.query && {
              query: options.query,
              variables: JSON.stringify(options.queryVariables),
            },
        }),
      });
    } catch {
      if (options.cause) this.cause = options.cause;
    }
  }

  get [Symbol.toStringTag]() {
    return this.name;
  }

  /**
   * Note: `toString()` is internally used by `console.log(...)` / `console.error(...)`
   * when ingesting logs in Oxygen production. Therefore, we want to make sure that
   * the error message is as informative as possible instead of `[object Object]`.
   */
  override toString() {
    let result = `${this.name}: ${this.message}`;

    if (this.path) {
      try {
        result += ` | path: ${JSON.stringify(this.path)}`;
      } catch {}
    }

    if (this.extensions) {
      try {
        result += ` | extensions: ${JSON.stringify(this.extensions)}`;
      } catch {}
    }

    result += '\n';

    if (this.stack) {
      // Remove the message line from the stack.
      result += `${this.stack.slice(this.stack.indexOf('\n') + 1)}\n`;
    }

    return result;
  }

  /**
   * Note: toJSON` is internally used by `JSON.stringify(...)`.
   * The most common scenario when this error instance is going to be stringified is
   * when it's passed to Remix' `json` and `defer` functions: e.g. `{promise: storefront.query(...)}`.
   * In this situation, we don't want to expose private error information to the browser so we only
   * do it in development.
   */
  toJSON() {
    const formatted: Pick<
      GraphQLError,
      'name' | 'message' | 'path' | 'extensions' | 'locations' | 'stack'
    > = {name: 'Error', message: ''};

    if (process.env.NODE_ENV === 'development') {
      formatted.name = this.name;
      formatted.message = 'Development: ' + this.message;
      if (this.path) formatted.path = this.path;
      if (this.locations) formatted.locations = this.locations;
      if (this.extensions) formatted.extensions = this.extensions;
      // Skip stack on purpose because we don't want to expose it to the browser.
    }

    return formatted;
  }
}
Note: toJSON` is internally used by `JSON.stringify(...)`. The most common scenario when this error instance is going to be stringified is when it's passed to Remix' `json` and `defer` functions: e.g. `{promise: storefront.query(...)}`. In this situation, we don't want to expose private error information to the browser so we only do it in development.

### __@toStringTag@685

value: `string`


### name

value: `string`


### message

value: `string`


### stack

value: `string`


### Storefront

Interface to interact with the Storefront API.

### cache

value: `Cache`


### CacheCustom

value: `(overrideOptions: AllCacheOptions) => AllCacheOptions`

  - AllCacheOptions: export interface AllCacheOptions {
  /**
   * The caching mode, generally `public`, `private`, or `no-store`.
   */
  mode?: string;
  /**
   * The maximum amount of time in seconds that a resource will be considered fresh. See `max-age` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#:~:text=Response%20Directives-,max%2Dage,-The%20max%2Dage).
   */
  maxAge?: number;
  /**
   * Indicate that the cache should serve the stale response in the background while revalidating the cache. See `stale-while-revalidate` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate).
   */
  staleWhileRevalidate?: number;
  /**
   * Similar to `maxAge` but specific to shared caches. See `s-maxage` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#s-maxage).
   */
  sMaxAge?: number;
  /**
   * Indicate that the cache should serve the stale response if an error occurs while revalidating the cache. See `stale-if-error` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error).
   */
  staleIfError?: number;
}

### CacheLong

value: `(overrideOptions?: AllCacheOptions) => AllCacheOptions`

  - AllCacheOptions: export interface AllCacheOptions {
  /**
   * The caching mode, generally `public`, `private`, or `no-store`.
   */
  mode?: string;
  /**
   * The maximum amount of time in seconds that a resource will be considered fresh. See `max-age` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#:~:text=Response%20Directives-,max%2Dage,-The%20max%2Dage).
   */
  maxAge?: number;
  /**
   * Indicate that the cache should serve the stale response in the background while revalidating the cache. See `stale-while-revalidate` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate).
   */
  staleWhileRevalidate?: number;
  /**
   * Similar to `maxAge` but specific to shared caches. See `s-maxage` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#s-maxage).
   */
  sMaxAge?: number;
  /**
   * Indicate that the cache should serve the stale response if an error occurs while revalidating the cache. See `stale-if-error` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error).
   */
  staleIfError?: number;
}

### CacheNone

value: `() => NoStoreStrategy`

  - NoStoreStrategy: {
  mode: string;
}

### CacheShort

value: `(overrideOptions?: AllCacheOptions) => AllCacheOptions`

  - AllCacheOptions: export interface AllCacheOptions {
  /**
   * The caching mode, generally `public`, `private`, or `no-store`.
   */
  mode?: string;
  /**
   * The maximum amount of time in seconds that a resource will be considered fresh. See `max-age` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#:~:text=Response%20Directives-,max%2Dage,-The%20max%2Dage).
   */
  maxAge?: number;
  /**
   * Indicate that the cache should serve the stale response in the background while revalidating the cache. See `stale-while-revalidate` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate).
   */
  staleWhileRevalidate?: number;
  /**
   * Similar to `maxAge` but specific to shared caches. See `s-maxage` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#s-maxage).
   */
  sMaxAge?: number;
  /**
   * Indicate that the cache should serve the stale response if an error occurs while revalidating the cache. See `stale-if-error` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error).
   */
  staleIfError?: number;
}

### generateCacheControlHeader

value: `(cacheOptions: AllCacheOptions) => string`

  - AllCacheOptions: export interface AllCacheOptions {
  /**
   * The caching mode, generally `public`, `private`, or `no-store`.
   */
  mode?: string;
  /**
   * The maximum amount of time in seconds that a resource will be considered fresh. See `max-age` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#:~:text=Response%20Directives-,max%2Dage,-The%20max%2Dage).
   */
  maxAge?: number;
  /**
   * Indicate that the cache should serve the stale response in the background while revalidating the cache. See `stale-while-revalidate` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate).
   */
  staleWhileRevalidate?: number;
  /**
   * Similar to `maxAge` but specific to shared caches. See `s-maxage` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#s-maxage).
   */
  sMaxAge?: number;
  /**
   * Indicate that the cache should serve the stale response if an error occurs while revalidating the cache. See `stale-if-error` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error).
   */
  staleIfError?: number;
}

### getApiUrl

value: `(props?: Partial<Pick<StorefrontClientProps, "storefrontApiVersion" | "storeDomain">>) => string`

  - Storefront: {
  query: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    query: RawGqlString,
    ...options: ClientVariablesInRestParams<
      StorefrontQueries,
      RawGqlString,
      StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, 'cache'>,
      AutoAddedVariableNames
    >
  ) => Promise<
    ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> &
      StorefrontError
  >;
  mutate: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    mutation: RawGqlString,
    ...options: ClientVariablesInRestParams<
      StorefrontMutations,
      RawGqlString,
      StorefrontCommonExtraParams,
      AutoAddedVariableNames
    >
  ) => Promise<
    ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> &
      StorefrontError
  >;
  cache?: Cache;
  CacheNone: typeof CacheNone;
  CacheLong: typeof CacheLong;
  CacheShort: typeof CacheShort;
  CacheCustom: typeof CacheCustom;
  generateCacheControlHeader: typeof generateCacheControlHeader;
  getPublicTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPublicTokenHeaders'];
  getPrivateTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPrivateTokenHeaders'];
  getShopifyDomain: ReturnType<
    typeof createStorefrontUtilities
  >['getShopifyDomain'];
  getApiUrl: ReturnType<
    typeof createStorefrontUtilities
  >['getStorefrontApiUrl'];
  i18n: TI18n;
}

### getPrivateTokenHeaders

value: `(props?: Partial<Pick<StorefrontClientProps, "contentType">> & Pick<StorefrontClientProps, "privateStorefrontToken"> & { buyerIp?: string; }) => Record<string, string>`

  - Storefront: {
  query: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    query: RawGqlString,
    ...options: ClientVariablesInRestParams<
      StorefrontQueries,
      RawGqlString,
      StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, 'cache'>,
      AutoAddedVariableNames
    >
  ) => Promise<
    ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> &
      StorefrontError
  >;
  mutate: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    mutation: RawGqlString,
    ...options: ClientVariablesInRestParams<
      StorefrontMutations,
      RawGqlString,
      StorefrontCommonExtraParams,
      AutoAddedVariableNames
    >
  ) => Promise<
    ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> &
      StorefrontError
  >;
  cache?: Cache;
  CacheNone: typeof CacheNone;
  CacheLong: typeof CacheLong;
  CacheShort: typeof CacheShort;
  CacheCustom: typeof CacheCustom;
  generateCacheControlHeader: typeof generateCacheControlHeader;
  getPublicTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPublicTokenHeaders'];
  getPrivateTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPrivateTokenHeaders'];
  getShopifyDomain: ReturnType<
    typeof createStorefrontUtilities
  >['getShopifyDomain'];
  getApiUrl: ReturnType<
    typeof createStorefrontUtilities
  >['getStorefrontApiUrl'];
  i18n: TI18n;
}

### getPublicTokenHeaders

value: `(props?: Partial<Pick<StorefrontClientProps, "contentType">> & Pick<StorefrontClientProps, "publicStorefrontToken">) => Record<string, string>`

  - Storefront: {
  query: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    query: RawGqlString,
    ...options: ClientVariablesInRestParams<
      StorefrontQueries,
      RawGqlString,
      StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, 'cache'>,
      AutoAddedVariableNames
    >
  ) => Promise<
    ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> &
      StorefrontError
  >;
  mutate: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    mutation: RawGqlString,
    ...options: ClientVariablesInRestParams<
      StorefrontMutations,
      RawGqlString,
      StorefrontCommonExtraParams,
      AutoAddedVariableNames
    >
  ) => Promise<
    ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> &
      StorefrontError
  >;
  cache?: Cache;
  CacheNone: typeof CacheNone;
  CacheLong: typeof CacheLong;
  CacheShort: typeof CacheShort;
  CacheCustom: typeof CacheCustom;
  generateCacheControlHeader: typeof generateCacheControlHeader;
  getPublicTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPublicTokenHeaders'];
  getPrivateTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPrivateTokenHeaders'];
  getShopifyDomain: ReturnType<
    typeof createStorefrontUtilities
  >['getShopifyDomain'];
  getApiUrl: ReturnType<
    typeof createStorefrontUtilities
  >['getStorefrontApiUrl'];
  i18n: TI18n;
}

### getShopifyDomain

value: `(props?: Partial<Pick<StorefrontClientProps, "storeDomain">>) => string`

  - Storefront: {
  query: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    query: RawGqlString,
    ...options: ClientVariablesInRestParams<
      StorefrontQueries,
      RawGqlString,
      StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, 'cache'>,
      AutoAddedVariableNames
    >
  ) => Promise<
    ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> &
      StorefrontError
  >;
  mutate: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    mutation: RawGqlString,
    ...options: ClientVariablesInRestParams<
      StorefrontMutations,
      RawGqlString,
      StorefrontCommonExtraParams,
      AutoAddedVariableNames
    >
  ) => Promise<
    ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> &
      StorefrontError
  >;
  cache?: Cache;
  CacheNone: typeof CacheNone;
  CacheLong: typeof CacheLong;
  CacheShort: typeof CacheShort;
  CacheCustom: typeof CacheCustom;
  generateCacheControlHeader: typeof generateCacheControlHeader;
  getPublicTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPublicTokenHeaders'];
  getPrivateTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPrivateTokenHeaders'];
  getShopifyDomain: ReturnType<
    typeof createStorefrontUtilities
  >['getShopifyDomain'];
  getApiUrl: ReturnType<
    typeof createStorefrontUtilities
  >['getStorefrontApiUrl'];
  i18n: TI18n;
}

### i18n

value: `TI18n`


### mutate

value: `<OverrideReturnType extends unknown = never, RawGqlString extends string = string>(mutation: RawGqlString, ...options: IsOptionalVariables<StorefrontMutations[RawGqlString]["variables"], AutoAddedVariableNames, Omit<StorefrontMutations[RawGqlString]["variables"], AutoAddedVariableNames>> extends true ? [(StorefrontCommonExtraParams & ClientVariables<StorefrontMutations, RawGqlString, AutoAddedVariableNames, "variables", RawGqlString extends never ? SetOptional<StorefrontMutations[RawGqlString]["variables"], Extract<keyof StorefrontMutations[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }, Record<"variables", RawGqlString extends never ? SetOptional<StorefrontMutations[RawGqlString]["variables"], Extract<keyof StorefrontMutations[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }>>)?] : [StorefrontCommonExtraParams & ClientVariables<StorefrontMutations, RawGqlString, AutoAddedVariableNames, "variables", RawGqlString extends never ? SetOptional<StorefrontMutations[RawGqlString]["variables"], Extract<keyof StorefrontMutations[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }, Record<"variables", RawGqlString extends never ? SetOptional<StorefrontMutations[RawGqlString]["variables"], Extract<keyof StorefrontMutations[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }>>]) => Promise<ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> & StorefrontError>`

  - Storefront: {
  query: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    query: RawGqlString,
    ...options: ClientVariablesInRestParams<
      StorefrontQueries,
      RawGqlString,
      StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, 'cache'>,
      AutoAddedVariableNames
    >
  ) => Promise<
    ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> &
      StorefrontError
  >;
  mutate: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    mutation: RawGqlString,
    ...options: ClientVariablesInRestParams<
      StorefrontMutations,
      RawGqlString,
      StorefrontCommonExtraParams,
      AutoAddedVariableNames
    >
  ) => Promise<
    ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> &
      StorefrontError
  >;
  cache?: Cache;
  CacheNone: typeof CacheNone;
  CacheLong: typeof CacheLong;
  CacheShort: typeof CacheShort;
  CacheCustom: typeof CacheCustom;
  generateCacheControlHeader: typeof generateCacheControlHeader;
  getPublicTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPublicTokenHeaders'];
  getPrivateTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPrivateTokenHeaders'];
  getShopifyDomain: ReturnType<
    typeof createStorefrontUtilities
  >['getShopifyDomain'];
  getApiUrl: ReturnType<
    typeof createStorefrontUtilities
  >['getStorefrontApiUrl'];
  i18n: TI18n;
}
  - StorefrontMutations: export interface StorefrontMutations {
  // Example of how a generated mutation type looks like:
  // '#graphql mutation m1 {...}': {return: M1Mutation; variables: M1MutationVariables};
}
  - AutoAddedVariableNames: 'country' | 'language'
  - StorefrontCommonExtraParams: {
  headers?: HeadersInit;
  storefrontApiVersion?: string;
  displayName?: string;
}
  - StorefrontError: {
  errors?: StorefrontApiErrors;
}

### query

value: `<OverrideReturnType extends unknown = never, RawGqlString extends string = string>(query: RawGqlString, ...options: IsOptionalVariables<StorefrontQueries[RawGqlString]["variables"], AutoAddedVariableNames, Omit<StorefrontQueries[RawGqlString]["variables"], AutoAddedVariableNames>> extends true ? [(StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, "cache"> & ClientVariables<StorefrontQueries, RawGqlString, AutoAddedVariableNames, "variables", RawGqlString extends never ? SetOptional<StorefrontQueries[RawGqlString]["variables"], Extract<keyof StorefrontQueries[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }, Record<"variables", RawGqlString extends never ? SetOptional<StorefrontQueries[RawGqlString]["variables"], Extract<keyof StorefrontQueries[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }>>)?] : [StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, "cache"> & ClientVariables<StorefrontQueries, RawGqlString, AutoAddedVariableNames, "variables", RawGqlString extends never ? SetOptional<StorefrontQueries[RawGqlString]["variables"], Extract<keyof StorefrontQueries[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }, Record<"variables", RawGqlString extends never ? SetOptional<StorefrontQueries[RawGqlString]["variables"], Extract<keyof StorefrontQueries[RawGqlString]["variables"], AutoAddedVariableNames>> : { readonly [variable: string]: unknown; }>>]) => Promise<ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> & StorefrontError>`

  - Storefront: {
  query: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    query: RawGqlString,
    ...options: ClientVariablesInRestParams<
      StorefrontQueries,
      RawGqlString,
      StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, 'cache'>,
      AutoAddedVariableNames
    >
  ) => Promise<
    ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> &
      StorefrontError
  >;
  mutate: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    mutation: RawGqlString,
    ...options: ClientVariablesInRestParams<
      StorefrontMutations,
      RawGqlString,
      StorefrontCommonExtraParams,
      AutoAddedVariableNames
    >
  ) => Promise<
    ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> &
      StorefrontError
  >;
  cache?: Cache;
  CacheNone: typeof CacheNone;
  CacheLong: typeof CacheLong;
  CacheShort: typeof CacheShort;
  CacheCustom: typeof CacheCustom;
  generateCacheControlHeader: typeof generateCacheControlHeader;
  getPublicTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPublicTokenHeaders'];
  getPrivateTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPrivateTokenHeaders'];
  getShopifyDomain: ReturnType<
    typeof createStorefrontUtilities
  >['getShopifyDomain'];
  getApiUrl: ReturnType<
    typeof createStorefrontUtilities
  >['getStorefrontApiUrl'];
  i18n: TI18n;
}
  - AutoAddedVariableNames: 'country' | 'language'
  - StorefrontCommonExtraParams: {
  headers?: HeadersInit;
  storefrontApiVersion?: string;
  displayName?: string;
}
  - StorefrontError: {
  errors?: StorefrontApiErrors;
}
  - StorefrontQueries: export interface StorefrontQueries {
  // Example of how a generated query type looks like:
  // '#graphql query q1 {...}': {return: Q1Query; variables: Q1QueryVariables};
}
  - StorefrontQueryOptions: StorefrontCommonExtraParams & {
  query: string;
  mutation?: never;
  cache?: CachingStrategy;
}

### AllCacheOptions

Override options for a cache strategy.

### maxAge

value: `number`

The maximum amount of time in seconds that a resource will be considered fresh. See `max-age` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#:~:text=Response%20Directives-,max%2Dage,-The%20max%2Dage).

### mode

value: `string`

The caching mode, generally `public`, `private`, or `no-store`.

### sMaxAge

value: `number`

Similar to `maxAge` but specific to shared caches. See `s-maxage` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#s-maxage).

### staleIfError

value: `number`

Indicate that the cache should serve the stale response if an error occurs while revalidating the cache. See `stale-if-error` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error).

### staleWhileRevalidate

value: `number`

Indicate that the cache should serve the stale response in the background while revalidating the cache. See `stale-while-revalidate` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate).

### NoStoreStrategy

### mode

value: `string`


### StorefrontCommonExtraParams

### displayName

value: `string`


### headers

value: `HeadersInit`

  - Headers: Headers

### storefrontApiVersion

value: `string`


### StorefrontError

### errors

value: `StorefrontApiErrors`

  - Storefront: {
  query: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    query: RawGqlString,
    ...options: ClientVariablesInRestParams<
      StorefrontQueries,
      RawGqlString,
      StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, 'cache'>,
      AutoAddedVariableNames
    >
  ) => Promise<
    ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> &
      StorefrontError
  >;
  mutate: <
    OverrideReturnType extends any = never,
    RawGqlString extends string = string,
  >(
    mutation: RawGqlString,
    ...options: ClientVariablesInRestParams<
      StorefrontMutations,
      RawGqlString,
      StorefrontCommonExtraParams,
      AutoAddedVariableNames
    >
  ) => Promise<
    ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> &
      StorefrontError
  >;
  cache?: Cache;
  CacheNone: typeof CacheNone;
  CacheLong: typeof CacheLong;
  CacheShort: typeof CacheShort;
  CacheCustom: typeof CacheCustom;
  generateCacheControlHeader: typeof generateCacheControlHeader;
  getPublicTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPublicTokenHeaders'];
  getPrivateTokenHeaders: ReturnType<
    typeof createStorefrontUtilities
  >['getPrivateTokenHeaders'];
  getShopifyDomain: ReturnType<
    typeof createStorefrontUtilities
  >['getShopifyDomain'];
  getApiUrl: ReturnType<
    typeof createStorefrontUtilities
  >['getStorefrontApiUrl'];
  i18n: TI18n;
}
  - StorefrontApiErrors: JsonGraphQLError[] | undefined

### CachingStrategy

Use the `CachingStrategy` to define a custom caching mechanism for your data. Or use one of the pre-defined caching strategies: CacheNone, CacheShort, CacheLong.

### maxAge

value: `number`

The maximum amount of time in seconds that a resource will be considered fresh. See `max-age` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#:~:text=Response%20Directives-,max%2Dage,-The%20max%2Dage).

### mode

value: `string`

The caching mode, generally `public`, `private`, or `no-store`.

### sMaxAge

value: `number`

Similar to `maxAge` but specific to shared caches. See `s-maxage` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#s-maxage).

### staleIfError

value: `number`

Indicate that the cache should serve the stale response if an error occurs while revalidating the cache. See `stale-if-error` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error).

### staleWhileRevalidate

value: `number`

Indicate that the cache should serve the stale response in the background while revalidating the cache. See `stale-while-revalidate` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate).

## Related

- [createHydrogenContext](https://shopify.dev/docs/api/hydrogen/utilities/createhydrogencontext)

