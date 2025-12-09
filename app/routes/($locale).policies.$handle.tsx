import {type LoaderFunctionArgs} from 'react-router';
import {Link, useLoaderData, type MetaFunction} from 'react-router';
import {type Shop} from '@shopify/hydrogen/storefront-api-types';
import {getConfig} from '~/utils/config';
import {ArrowLeft, FileText} from 'lucide-react';

type SelectedPolicies = keyof Pick<
  Shop,
  'privacyPolicy' | 'shippingPolicy' | 'termsOfService' | 'refundPolicy'
>;

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const config = getConfig();
  return [{title: `${config.brandName} | ${data?.policy.title ?? ''}`}];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  if (!params.handle) {
    throw new Response('No handle was passed in', {status: 404});
  }

  const policyName = params.handle.replace(
    /-([a-z])/g,
    (_: unknown, m1: string) => m1.toUpperCase(),
  ) as SelectedPolicies;

  const data = await context.storefront.query(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
      refundPolicy: false,
      [policyName]: true,
      language: context.storefront.i18n?.language,
    },
  });

  const policy = data.shop?.[policyName];

  if (!policy) {
    throw new Response('Could not find the policy', {status: 404});
  }

  // Get configuration
  const config = getConfig();

  return {
    policy,
    config: {
      ...config,
      theme: config.influencerName.toLowerCase().replace(/\s+/g, '-'),
    },
  };
}

export default function Policy() {
  const {policy, config} = useLoaderData<typeof loader>();

  return (
    <div data-theme={config.theme} className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-24">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            to="/policies"
            className="inline-flex items-center text-gold-500 hover:text-gold-400 transition-colors duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Policies
          </Link>
        </div>

        {/* Policy Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-gold-500/20 text-gold-500 text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            Policy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {policy.title}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Our commitment to transparency and excellence in every aspect of our
            business.
          </p>
        </div>

        {/* Policy Content */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-sm p-8">
            <div className="flex items-center mb-8">
              <FileText className="w-6 h-6 text-gold-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">{policy.title}</h2>
            </div>

            <div
              className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed [&>h1]:text-white [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-4 [&>h1]:mt-6 [&>h2]:text-white [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mb-3 [&>h2]:mt-5 [&>h3]:text-white [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mb-2 [&>h3]:mt-4 [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:mb-4 [&>ul]:pl-6 [&>li]:mb-2 [&>li]:text-gray-300 [&>ol]:mb-4 [&>ol]:pl-6 [&>strong]:text-white [&>strong]:font-semibold [&>em]:text-gold-300 [&>em]:italic [&>a]:text-gold-500 [&>a]:hover:text-gold-400 [&>a]:transition-colors [&>a]:duration-300"
              dangerouslySetInnerHTML={{__html: policy.body}}
            />
          </div>
        </div>

        {/* Contact Banner */}
        <div className="bg-gradient-to-r from-gold-900/20 via-gold-500/10 to-gold-900/20 border border-gold-500/30 rounded-sm p-8 text-center">
          <h3 className="text-2xl font-bold text-gold-500 mb-4">
            Questions About This Policy?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            We're committed to transparency and championship-quality service. If
            you have any questions about our policies, don't hesitate to reach
            out.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center bg-gold-500 hover:bg-gold-400 text-black font-bold py-3 px-6 rounded-sm transition-all duration-300 uppercase tracking-wider"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/Shop
const POLICY_CONTENT_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }
  query Policy(
    $country: CountryCode
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $refundPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
  ) @inContext(language: $language, country: $country) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) {
        ...Policy
      }
      shippingPolicy @include(if: $shippingPolicy) {
        ...Policy
      }
      termsOfService @include(if: $termsOfService) {
        ...Policy
      }
      refundPolicy @include(if: $refundPolicy) {
        ...Policy
      }
    }
  }
` as const;
