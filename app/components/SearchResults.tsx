import {Link} from 'react-router';
import {Image, Pagination} from '@shopify/hydrogen';
import {Money} from '~/components/Money';
import {urlWithTrackingParams, type RegularSearchReturn} from '~/lib/search';

type SearchItems = RegularSearchReturn['result']['items'];
type PartialSearchResult<ItemType extends keyof SearchItems> = Pick<
  SearchItems,
  ItemType
> &
  Pick<RegularSearchReturn, 'term'>;

type SearchResultsProps = RegularSearchReturn & {
  children: (args: SearchItems & {term: string}) => React.ReactNode;
};

export function SearchResults({
  term,
  result,
  children,
}: Omit<SearchResultsProps, 'error' | 'type'>) {
  if (!result?.total) {
    return null;
  }

  return children({...result.items, term});
}

SearchResults.Articles = SearchResultsArticles;
SearchResults.Pages = SearchResultsPages;
SearchResults.Products = SearchResultsProducts;
SearchResults.Empty = SearchResultsEmpty;

function SearchResultsArticles({
  term,
  articles,
}: PartialSearchResult<'articles'>) {
  if (!articles?.nodes.length) {
    return null;
  }

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-6 text-black border-b-2 border-primary/30 pb-3">Articles</h3>
      <div className="grid gap-4">
        {articles?.nodes?.map((article) => {
          const articleUrl = urlWithTrackingParams({
            baseUrl: `/blogs/${article.handle}`,
            trackingParams: article.trackingParameters,
            term,
          });

          return (
            <Link
              key={article.id}
              prefetch="intent"
              to={articleUrl}
              className="block p-4 bg-white border-2 border-primary/20 rounded-lg hover:border-primary hover:shadow-lg transition-all duration-300 group"
            >
              <p className="text-black font-medium group-hover:text-primary transition-colors">{article.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function SearchResultsPages({term, pages}: PartialSearchResult<'pages'>) {
  if (!pages?.nodes.length) {
    return null;
  }

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-6 text-black border-b-2 border-primary/30 pb-3">Pages</h3>
      <div className="grid gap-4">
        {pages?.nodes?.map((page) => {
          const pageUrl = urlWithTrackingParams({
            baseUrl: `/pages/${page.handle}`,
            trackingParams: page.trackingParameters,
            term,
          });

          return (
            <Link
              key={page.id}
              prefetch="intent"
              to={pageUrl}
              className="block p-4 bg-white border-2 border-primary/20 rounded-lg hover:border-primary hover:shadow-lg transition-all duration-300 group"
            >
              <p className="text-black font-medium group-hover:text-primary transition-colors">{page.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function SearchResultsProducts({
  term,
  products,
}: PartialSearchResult<'products'>) {
  if (!products?.nodes.length) {
    return null;
  }

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-6 text-black border-b-2 border-primary/30 pb-3">Produits</h3>
      <Pagination connection={products}>
        {({nodes, isLoading, NextLink, PreviousLink}) => {
          const ItemsMarkup = nodes.map((product) => {
            const productUrl = urlWithTrackingParams({
              baseUrl: `/products/${product.handle}`,
              trackingParams: product.trackingParameters,
              term,
            });

            const price = product?.selectedOrFirstAvailableVariant?.price;
            const image = product?.selectedOrFirstAvailableVariant?.image;

            return (
              <Link
                key={product.id}
                prefetch="intent"
                to={productUrl}
                className="flex items-center gap-4 p-4 bg-white border-2 border-primary/20 rounded-lg hover:border-primary hover:shadow-lg transition-all duration-300 group"
              >
                {image && (
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-primary/20">
                    <Image
                      data={image}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-bold text-black group-hover:text-primary transition-colors mb-1">{product.title}</p>
                  {price && (
                    <p className="font-semibold" style={{ color: '#F5A6C6' }}>
                      <Money data={price} />
                    </p>
                  )}
                </div>
              </Link>
            );
          });

          return (
            <div>
              {/* Previous Link */}
              <div className="mb-4">
                <PreviousLink className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-primary/30 rounded-lg hover:border-primary hover:bg-primary/10 text-black font-medium transition-all duration-300">
                  {isLoading ? 'Chargement...' : <span>↑ Précédent</span>}
                </PreviousLink>
              </div>

              {/* Items Grid */}
              <div className="grid gap-4 mb-4">
                {ItemsMarkup}
              </div>

              {/* Next Link */}
              <div>
                <NextLink className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-primary/30 rounded-lg hover:border-primary hover:bg-primary/10 text-black font-medium transition-all duration-300">
                  {isLoading ? 'Chargement...' : <span>Suivant ↓</span>}
                </NextLink>
              </div>
            </div>
          );
        }}
      </Pagination>
    </div>
  );
}

function SearchResultsEmpty() {
  return <p className="text-gray-600 text-center">Aucun résultat trouvé, essayez une autre recherche.</p>;
}
