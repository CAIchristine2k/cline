import {Suspense} from 'react';
import {Await} from 'react-router';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header} from '~/components/Header';
import {CartMain} from '~/components/CartMain';
import {SearchFormPredictive} from '~/components/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';
import {useConfig} from '~/utils/themeContext';

export type PageLayoutProps = {
  children?: React.ReactNode;
  layout?: {
    shop: any;
  };
  cart?: Promise<CartApiQueryFragment | null>;
  header?: Promise<HeaderQuery | null>;
  footer?: Promise<FooterQuery | null>;
  isLoggedIn?: Promise<boolean>;
  publicStoreDomain?: string;
};

export function PageLayout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain,
}: PageLayoutProps) {
  const config = useConfig();
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-text">
      <Header />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
      
      {/* Aside Components */}
      <Aside type="search" heading="SEARCH">
        <div className="bg-background text-text p-4">
          <SearchFormPredictive>
            {({fetchResults, inputRef}) => (
              <div>
                <input
                  name="q"
                  onChange={fetchResults}
                  onFocus={fetchResults}
                  placeholder="Search products..."
                  ref={inputRef}
                  type="search"
                  className="w-full p-3 bg-gray-800 border border-primary/20 rounded-sm text-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={() => {
                    window.location.href = inputRef?.current?.value
                      ? `/search?q=${inputRef.current.value}`
                      : `/search`;
                  }}
                  className="mt-2 bg-primary hover:bg-primary-600 text-background font-bold py-2 px-4 rounded-sm transition-colors duration-300"
                >
                  Search
                </button>
              </div>
            )}
          </SearchFormPredictive>
          <SearchResultsPredictive>
            {({items, total, term, state, closeSearch}) => (
              <div>
                {state === 'loading' && <p>Loading...</p>}
                {items && (
                  <div>
                    <SearchResultsPredictive.Products
                      products={items.products}
                      closeSearch={closeSearch}
                      term={term}
                    />
                    <SearchResultsPredictive.Collections
                      collections={items.collections}
                      closeSearch={closeSearch}
                      term={term}
                    />
                    <SearchResultsPredictive.Pages
                      pages={items.pages}
                      closeSearch={closeSearch}
                      term={term}
                    />
                    <SearchResultsPredictive.Articles
                      articles={items.articles}
                      closeSearch={closeSearch}
                      term={term}
                    />
                  </div>
                )}
                {!total && term.current && (
                  <SearchResultsPredictive.Empty term={term} />
                )}
              </div>
            )}
          </SearchResultsPredictive>
        </div>
      </Aside>
      
      <Aside type="cart" heading="CART">
        {cart && (
          <Suspense fallback={<p className="p-4 text-center">Loading cart...</p>}>
            <Await resolve={cart}>
              {(resolvedCart) => {
                return <CartMain cart={resolvedCart} layout="aside" />;
              }}
            </Await>
          </Suspense>
        )}
      </Aside>
      
      <Aside type="mobile" heading="MENU">
        <div className="bg-background text-text p-4">
          <nav className="space-y-4">
            {config.navigation.map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className="block text-text hover:text-primary font-semibold text-lg transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </Aside>
    </div>
  );
}
