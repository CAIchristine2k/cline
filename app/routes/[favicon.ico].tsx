import type {LoaderFunctionArgs} from 'react-router';
import favicon from '~/assets/favicon.svg';

export async function loader({request}: LoaderFunctionArgs) {
  // Redirect to the SVG favicon
  return new Response(null, {
    status: 301,
    headers: {
      Location: favicon,
    },
  });
}
