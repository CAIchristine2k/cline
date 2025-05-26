import {useLoaderData} from 'react-router';
import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {useConfig} from '~/utils/themeContext';
import type {LoaderFunctionArgs} from 'react-router';

export function loader({context}: LoaderFunctionArgs) {
  return context.storefront.query(COLLECTIONS_QUERY);
}

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();
  const config = useConfig();

  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-primary/20 text-primary text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            Collections
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Shop by <span className="text-primary">Category</span>
          </h1>
          <p className="text-text/80 max-w-3xl mx-auto leading-relaxed">
            Browse our curated collections of premium boxing equipment and merchandise, 
            designed by {config.influencerName}, {config.influencerTitle.toLowerCase()}.
          </p>
        </div>

        {collections.nodes.length === 0 ? (
          <div className="text-center">
            <p className="mb-8 text-lg">No collections found.</p>
            <Link to="/" className="bg-primary text-background px-6 py-3 rounded-sm">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.nodes.map((collection: any) => (
              <Link 
                key={collection.id} 
                to={`/collections/${collection.handle}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-sm border border-primary/10 bg-background/30 backdrop-blur-sm transition-all duration-300 group-hover:shadow-glow">
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                    {collection.image ? (
                      <Image 
                        data={collection.image} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-primary/5 flex items-center justify-center">
                        <span className="text-primary-700">No image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                  
                  <div className="relative p-6">
                    <h2 className="text-xl font-bold text-text group-hover:text-primary transition-colors duration-300">
                      {collection.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm text-text/70">
                      {collection.description || `Shop all ${collection.title} products`}
                    </p>
                    <div className="mt-4 flex items-center text-primary text-sm font-medium">
                      Shop Collection
                      <svg className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query AllCollections {
    collections(first: 12) {
      nodes {
        id
        title
        description
        handle
        image {
          id
          url
          altText
          width
          height
        }
      }
    }
  }
`; 