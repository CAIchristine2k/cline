import {redirect, type LoaderFunctionArgs} from 'react-router';

export function loader({request}: LoaderFunctionArgs) {
  // Redirect to collections/all instead of showing a collections index page
  // since collections are specific to individual storefronts
  return redirect('/collections/all');
}
