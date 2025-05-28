import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData, Link, type MetaFunction} from 'react-router';
import {ArrowLeft, FileText, Shield} from 'lucide-react';
import {useConfig} from '~/utils/themeContext';

export const meta: MetaFunction = () => {
  const config = useConfig();
  return [{title: `${config.brandName} | Policies`}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const data = await context.storefront.query(POLICIES_QUERY);
  const policies = Object.values(data.shop || {});

  if (!policies.length) {
    throw new Response('No policies found', {status: 404});
  }

  return {policies};
}

export default function Policies() {
  const {policies} = useLoaderData<typeof loader>();
  const config = useConfig();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-24">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            to="/"
            className="inline-flex items-center text-gold-500 hover:text-gold-400 transition-colors duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-gold-500/20 text-gold-500 text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gold-500">STORE</span> POLICIES
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Review our store policies to understand your rights and our commitment to providing championship-quality service.
          </p>
        </div>

        {/* Policies Grid */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {policies.map((policy) => {
              if (!policy) return null;
              return (
                <Link
                  key={policy.id}
                  to={`/policies/${policy.handle}`}
                  className="group block bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-gold-500 rounded-sm p-6 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-3px]"
                >
                  <div className="flex items-center mb-4">
                    <FileText className="w-6 h-6 text-gold-500 mr-3" />
                    <h2 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors duration-300">
                      {policy.title}
                    </h2>
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Read our {policy.title.toLowerCase()} to understand how we protect your interests and ensure a championship shopping experience.
                  </p>
                  
                  <div className="flex items-center text-gold-500 text-sm font-bold">
                    <span>Read Policy</span>
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Championship Banner */}
        <div className="bg-gradient-to-r from-gold-900/20 via-gold-500/10 to-gold-900/20 border border-gold-500/30 rounded-sm p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-gold-500 mr-3" />
            <h3 className="text-2xl font-bold text-gold-500">
              Championship Protection
            </h3>
          </div>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            Just like {config.influencerName} protected himself in the ring, we protect your rights as a customer. Our policies ensure fair, transparent, and championship-quality service.
          </p>
          <Link 
            to="/collections/all"
            className="inline-flex items-center bg-gold-500 hover:bg-gold-400 text-black font-bold py-3 px-6 rounded-sm transition-all duration-300 uppercase tracking-wider"
          >
            Shop with Confidence
          </Link>
        </div>
      </div>
    </div>
  );
}

const POLICIES_QUERY = `#graphql
  fragment PolicyItem on ShopPolicy {
    id
    title
    handle
  }
  query Policies ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    shop {
      privacyPolicy {
        ...PolicyItem
      }
      shippingPolicy {
        ...PolicyItem
      }
      termsOfService {
        ...PolicyItem
      }
      refundPolicy {
        ...PolicyItem
      }
      subscriptionPolicy {
        id
        title
        handle
      }
    }
  }
` as const;
