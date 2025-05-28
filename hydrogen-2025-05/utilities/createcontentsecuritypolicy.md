# createContentSecurityPolicy

Create a [content security policy](https://shopify.dev/docs/custom-storefronts/hydrogen/content-security-policy) to secure your application. The default content security policy includes exclusions for cdn.shopify.com and a script nonce.

```jsx
import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    // pass a custom directive to load content from a third party domain
    styleSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://some-custom-css.cdn',
    ],
  });
  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter context={remixContext} url={request.url} nonce={nonce} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

```

```tsx
import type {EntryContext} from 'react-router';
import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    // pass a custom directive to load content from a third party domain
    styleSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://some-custom-css.cdn',
    ],
  });
  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter context={remixContext} url={request.url} nonce={nonce} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

```

## Props

### CreateContentSecurityPolicyGeneratedType

#### Returns: ContentSecurityPolicy

#### Params:

- props: CreateContentSecurityPolicy & ShopProp
export function createContentSecurityPolicy(
  props?: CreateContentSecurityPolicy & ShopProp,
): ContentSecurityPolicy {
  const nonce = generateNonce();
  const header = createCSPHeader(nonce, props);

  const Provider = ({children}: {children: ReactNode}) => {
    return createElement(NonceProvider, {value: nonce}, children);
  };

  return {
    nonce,
    header,
    NonceProvider: Provider,
  };
}


### CreateContentSecurityPolicy

### baseUri

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### blockAllMixedContent

value: `boolean`


### childSrc

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### connectSrc

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### defaultSrc

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### fontSrc

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### formAction

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### frameAncestors

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### frameSrc

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### imgSrc

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### manifestSrc

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### mediaSrc

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### navigateTo

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### objectSrc

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### pluginTypes

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### prefetchSrc

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### reportTo

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### reportUri

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### sandbox

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### scriptSrc

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### scriptSrcElem

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### styleSrc

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### upgradeInsecureRequests

value: `boolean`


### workerSrc

value: `DirectiveValues`

  - DirectiveValues: string[] | string | boolean

### ShopProp

### shop

value: `ShopifyDomains`

  - ShopifyDomains: {
  /** The production shop checkout domain url.  */
  checkoutDomain?: string;
  /** The production shop domain url. */
  storeDomain?: string;
}
Shop specific configurations

### ShopifyDomains

### checkoutDomain

value: `string`

The production shop checkout domain url.

### storeDomain

value: `string`

The production shop domain url.

### ContentSecurityPolicy

### header

value: `string`

The content security policy header

### nonce

value: `string`

A randomly generated nonce string that should be passed to any custom `script` element

### NonceProvider

value: `ComponentType<{children: ReactNode}>`


## Related

- [useNonce](https://shopify.dev/docs/api/hydrogen/hooks/usenonce)
- [Script](https://shopify.dev/docs/api/hydrogen/components/script)

