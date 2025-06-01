import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData, type MetaFunction, Link} from 'react-router';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {ArrowLeft, FileText} from 'lucide-react';
import {getConfig} from '~/utils/config';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const config = getConfig();
  return [{title: `${config.brandName} | ${data?.page.title ?? ''}`}];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  // Get configuration
  const config = getConfig();

  return {
    ...deferredData,
    ...criticalData,
    config: {
      ...config,
      theme: config.influencerName.toLowerCase().replace(/\s+/g, '-'),
    },
  };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({
  context,
  request,
  params,
}: LoaderFunctionArgs) {
  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  const [{page}] = await Promise.all([
    context.storefront.query(PAGE_QUERY, {
      variables: {
        handle: params.handle,
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!page) {
    throw new Response('Not Found', {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle: params.handle, data: page});

  return {
    page,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  // No deferred data needed for this page
  return {};
}

export default function Page() {
  const {page, config} = useLoaderData<typeof loader>();

  return (
    <div data-theme={config.theme} className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-24">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-primary/20 text-primary text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            Page
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{page.title}</h1>
          {page.seo?.description && (
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {page.seo.description}
            </p>
          )}
        </div>

        {/* Page Content */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-sm p-8">
            <div className="flex items-center mb-8">
              <FileText className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-white">{page.title}</h2>
            </div>

            <div
              className="prose prose-invert prose-primary max-w-none text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{__html: page.body}}
            />
          </div>
        </div>

        {/* Championship Banner */}
        <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/30 rounded-sm p-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">
            Questions About Our Policies?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            We're committed to transparency and championship-quality service. If
            you have any questions, don't hesitate to reach out.
          </p>
          <Link
            to="/collections/all"
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-black font-bold py-3 px-6 rounded-sm transition-all duration-300 uppercase tracking-wider"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

const PAGE_QUERY = `#graphql
  query PageDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    page(handle: $handle) {
      handle
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
` as const;
