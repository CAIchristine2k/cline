# Analytics.SearchView

Publishes a `search_viewed` event to the `Analytics.Provider` component.

```js
import {Analytics} from '@shopify/hydrogen';
import {useLoaderData} from 'react-router';

export async function loader({request}) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const searchTerm = String(searchParams.get('q') || '');

  return {searchTerm};
}

export default function SearchPage() {
  const {searchTerm} = useLoaderData();
  return (
    <div className="search">
      <h1>Search</h1>
      <Analytics.SearchView data={{searchTerm}} />
    </div>
  );
}
```

```ts
import {Analytics} from '@shopify/hydrogen';
import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData} from 'react-router';

export async function loader({request}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const searchTerm = String(searchParams.get('q') || '');

  return {searchTerm};
}

export default function SearchPage() {
  const {searchTerm} = useLoaderData<typeof loader>();
  return (
    <div className="search">
      <h1>Search</h1>
      <Analytics.SearchView data={{searchTerm}} />
    </div>
  );
}

```

## Props

### AnalyticsSearchViewGeneratedType

#### Returns:

#### Params:

- props: SearchViewProps
  export function AnalyticsSearchView(props: SearchViewProps) {
  return <AnalyticsView {...props} type="search_viewed" />;
  }

### SearchViewProps

### customData

value: `OtherData`

- OtherData: OtherData

### data

value: `SearchPayload`

- SearchPayload: {
  /** The search term used for the search results page \*/
  searchTerm: string;
  /** The search results \*/
  searchResults?: any;
  }

### SearchPayload

### searchResults

value: `any`

The search results

### searchTerm

value: `string`

The search term used for the search results page
