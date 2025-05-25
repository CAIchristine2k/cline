import { useLoaderData } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { getPaginationVariables } from '@shopify/hydrogen';
import { getConfig } from '~/lib/config';

// Import configuration and theme system
import { defaultConfig } from '~/lib/config';
import { initThemeFromConfig } from '~/lib/themeConfig';

// Import components that match Vue template structure
import { Hero } from '~/components/Hero';
import ProductShowcase from '~/components/ProductShowcase';
import LimitedEdition from '~/components/LimitedEdition';
import CareerHighlights from '~/components/CareerHighlights';
import SocialFeed from '~/components/SocialFeed';
import Testimonials from '~/components/Testimonials';
import NewsletterSignup from '~/components/NewsletterSignup';

export const meta = () => {
  return [{ title: `${defaultConfig.brandName} | ${defaultConfig.influencerTitle}` }];
};

export async function loader(args: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(args.request, {
    pageBy: 8,
  });

  // Handle pagination variables properly - check if it has 'first' property
  const queryVariables = 'first' in paginationVariables 
    ? { first: paginationVariables.first, after: paginationVariables.endCursor }
    : { first: 8, after: null };

  // Simplified queries for now - we'll enhance these later
  const [collectionsResponse] = await Promise.all([
    args.context.storefront.query(COLLECTIONS_QUERY, {
      variables: queryVariables,
    }).catch(() => ({ collections: { nodes: [] } })),
  ]);

  // Get configuration - pass the whole env object
  const config = getConfig();
  
  // Add theme property to config
  const configWithTheme = {
    ...config,
    theme: config.influencerName.toLowerCase().replace(/\s+/g, '-'),
  };

  return {
    collections: collectionsResponse.collections,
    config: configWithTheme,
  };
}

export default function Homepage() {
  const { collections, config } = useLoaderData<typeof loader>();

  return (
    <div data-theme={config.theme} className="min-h-screen bg-black text-white overflow-x-hidden">
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Product Showcase */}
        <ProductShowcase config={config} />
        
        {/* Conditional Sections based on config */}
        <LimitedEdition config={config} />
        
        <CareerHighlights config={config} />
        
        <Testimonials config={config} />
        
        <SocialFeed config={config} />
        
        <NewsletterSignup config={config} />
      </main>
    </div>
  );
}

// Simplified GraphQL queries
const COLLECTIONS_QUERY = `#graphql
  query Collections($first: Int, $after: String) {
    collections(first: $first, after: $after) {
      nodes {
        id
        title
        handle
        description
        image {
          id
          url
          altText
          width
          height
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
` as const;
