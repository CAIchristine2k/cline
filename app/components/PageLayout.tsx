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
import {ThemeSwitcher, ThemeConfigPanel} from '~/components/ThemeSwitcher';

export type PageLayoutProps = {
  cart: Promise<CartApiQueryFragment | null>;
  footer: Promise<FooterQuery | null>;
  header: Promise<HeaderQuery | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  children?: React.ReactNode;
};

export function PageLayout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain,
}: PageLayoutProps) {
  return (
    <Aside.Provider>
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Header />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </div>
      
      {/* Aside Components */}
      <Aside type="search" heading="SEARCH">
        <div className="bg-black text-white p-4">
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
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                &nbsp;
                <button
                  onClick={() => {
                    window.location.href = inputRef?.current?.value
                      ? `/search?q=${inputRef.current.value}`
                      : `/search`;
                  }}
                  className="mt-2 bg-gold-500 hover:bg-gold-400 text-black font-bold py-2 px-4 rounded-sm transition-colors duration-300"
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
        <Suspense fallback={<p>Loading cart...</p>}>
          <Await resolve={cart}>
            {(cart) => {
              return <CartMain cart={cart} layout="aside" />;
            }}
          </Await>
        </Suspense>
      </Aside>
      
      <Aside type="mobile" heading="MENU">
        <div className="bg-black text-white p-4">
          <nav className="space-y-4">
            <a href="/" className="block text-white hover:text-gold-500 font-semibold text-lg transition-colors duration-300">
              Home
            </a>
            <a href="#shop" className="block text-white hover:text-gold-500 font-semibold text-lg transition-colors duration-300">
              Shop
            </a>
            <a href="#career" className="block text-white hover:text-gold-500 font-semibold text-lg transition-colors duration-300">
              Career
            </a>
            <a href="/collections" className="block text-white hover:text-gold-500 font-semibold text-lg transition-colors duration-300">
              Collections
            </a>
            <a href="/pages/about" className="block text-white hover:text-gold-500 font-semibold text-lg transition-colors duration-300">
              About
            </a>
          </nav>
        </div>
      </Aside>

      {/* Theme Customization Tools */}
      <ThemeSwitcher />
      <ThemeConfigPanel />
    </Aside.Provider>
  );
}
