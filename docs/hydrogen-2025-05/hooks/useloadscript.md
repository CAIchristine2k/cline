# useLoadScript

The `useLoadScript` hook loads an external script tag in the browser. It allows React components to lazy-load third-party dependencies.

```jsx
import React, {useEffect} from 'react';
import {useLoadScript} from '@shopify/hydrogen';

export default function Homepage() {
  const scriptStatus = useLoadScript('https://some-cdn.com/some-script.js');

  useEffect(() => {
    if (scriptStatus === 'done') {
      // do something
    }
  }, [scriptStatus]);

  return <div>{scriptStatus === 'done' && <p>Script loaded!</p>}</div>;
}
```

```tsx
import React, {useEffect} from 'react';
import {useLoadScript} from '@shopify/hydrogen';

export default function Homepage() {
  const scriptStatus = useLoadScript('https://some-cdn.com/some-script.js');

  useEffect(() => {
    if (scriptStatus === 'done') {
      // do something
    }
  }, [scriptStatus]);

  return <div>{scriptStatus === 'done' && <p>Script loaded!</p>}</div>;
}
```

## Props

### LoadScriptOptions

### attributes

value: `Record<string, string>`

### in

value: `'head' | 'body'`

### module

value: `boolean`
