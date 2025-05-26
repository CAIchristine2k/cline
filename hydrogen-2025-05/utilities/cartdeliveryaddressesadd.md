# cartDeliveryAddressesAdd

Creates a function that accepts an array of [CartSelectableAddressInput](https://shopify.dev/docs/api/storefront/2025-04/input-objects/CartSelectableAddressInput) to add to a cart

```js
import {cartDeliveryAddressesAddDefault} from '@shopify/hydrogen';

const addDeliveryAddresses = cartDeliveryAddressesAddDefault({
  storefront,
  getCartId,
});

const result = await addDeliveryAddresses(
  [
    {
      address1: '<your-address1>',
      address2: '<your-address2>',
      city: '<your-city>',
      company: '<your-company>',
      countryCode: 'AC',
      firstName: '<your-firstName>',
      lastName: '<your-lastName>',
      phone: '<your-phone>',
      provinceCode: '<your-provinceCode>',
      zip: '<your-zip>',
      // other address fields...
    },
  ],
  {someOptionalParam: 'value'},
);

```

## cartDeliveryAddressesAddDefault

### CartDeliveryAddressesAddDefaultGeneratedType

Adds delivery addresses to the cart.

This function sends a mutation to the storefront API to add one or more delivery addresses to the cart. It returns the result of the mutation, including any errors that occurred.

#### Returns: CartDeliveryAddressesAddFunction- A function that takes an array of addresses and optional parameters, and returns the result of the API call.

#### Params:

- options: CartQueryOptions
export function cartDeliveryAddressesAddDefault(
  options: CartQueryOptions,
): CartDeliveryAddressesAddFunction {
  return async (
    addresses: Array<CartSelectableAddressInput>,
    optionalParams,
  ) => {
    const {cartDeliveryAddressesAdd, errors} = await options.storefront.mutate<{
      cartDeliveryAddressesAdd: CartQueryData;
      errors: StorefrontApiErrors;
    }>(CART_DELIVERY_ADDRESSES_ADD_MUTATION(options.cartFragment), {
      variables: {
        cartId: options.getCartId(),
        addresses,
        ...optionalParams,
      },
    });

    return formatAPIResult(cartDeliveryAddressesAdd, errors);
  };
}


### CartQueryOptions

### cartFragment

value: `string`

The cart fragment to override the one used in this query.

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
The customer account instance created by [`createCustomerAccount`](docs/api/hydrogen/latest/customer/createcustomeraccount).

### getCartId

value: `() => string`

A function that returns the cart ID.

### storefront

value: `Storefront`

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
The storefront client instance created by [`createStorefrontClient`](docs/api/hydrogen/latest/utilities/createstorefrontclient).

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

### CartDeliveryAddressesAddFunction

#### Returns: Promise<CartQueryDataReturn>

#### Params:

- addresses: CartSelectableAddressInput[]
- optionalParams: CartOptionalInput
export type CartDeliveryAddressesAddFunction = (
  addresses: Array<CartSelectableAddressInput>,
  optionalParams?: CartOptionalInput,
) => Promise<CartQueryDataReturn>;


### CartOptionalInput

### cartId

value: `string`

The cart id.

### country

value: `CountryCode`

The country code.

### language

value: `LanguageCode`

The language code.

### CartQueryData

### cart

value: `Cart`

  - Cart: Cart

### userErrors

value: `| CartUserError[]
    | MetafieldsSetUserError[]
    | MetafieldDeleteUserError[]`

  - Cart: Cart
  - CartUserError: CartUserError
  - MetafieldsSetUserError: MetafieldsSetUserError
  - MetafieldDeleteUserError: MetafieldDeleteUserError

### warnings

value: `CartWarning[]`

  - Cart: Cart
  - CartWarning: CartWarning

