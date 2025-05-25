import {Suspense, useState, useEffect} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {Menu, X, Search, ShoppingBag, User} from 'lucide-react';

interface HeaderProps {
  header: Promise<HeaderQuery | null>;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Suspense fallback={<div className="h-16 bg-black" />}>
      <Await resolve={header}>
        {(header) => (
          <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled 
              ? 'bg-black/95 backdrop-blur-sm border-b border-gold-500/20' 
              : 'bg-transparent'
          }`}>
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <NavLink 
                  prefetch="intent" 
                  to="/" 
                  className="flex items-center space-x-2 group"
                >
                  <img 
                    src="/images/logo.png" 
                    alt="Sugar Shane" 
                    className="h-8 w-auto transition-transform group-hover:scale-105"
                  />
                  <span className="text-gold-500 font-bold text-xl tracking-wider hidden sm:block">
                    SUGAR SHANE
                  </span>
                </NavLink>

                {/* Desktop Navigation */}
                <HeaderMenu
                  menu={header?.menu}
                  viewport="desktop"
                  primaryDomainUrl={header?.shop?.primaryDomain?.url}
                  publicStoreDomain={publicStoreDomain}
                />

                {/* Header Actions */}
                <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
              </div>
            </div>
          </header>
        )}
      </Await>
    </Suspense>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderQuery['menu'];
  primaryDomainUrl?: string;
  viewport: Viewport;
  publicStoreDomain: string;
}) {
  const {close} = useAside();

  // Sugar Shane specific navigation items
  const sugarShaneNavItems = [
    { title: 'Home', url: '/' },
    { title: 'Shop', url: '#shop' },
    { title: 'Career', url: '#career' },
    { title: 'Collections', url: '/collections' },
    { title: 'About', url: '/pages/about' },
  ];

  const navigationItems = menu?.items?.length ? menu.items : sugarShaneNavItems;

  if (viewport === 'mobile') {
    return (
      <nav className="flex flex-col space-y-4 p-4" role="navigation">
        {navigationItems.map((item, index) => {
          const url = item.url?.includes('myshopify.com') ||
                     item.url?.includes(publicStoreDomain) ||
                     (primaryDomainUrl && item.url?.includes(primaryDomainUrl))
                     ? new URL(item.url).pathname
                     : item.url || '/';

          return (
            <a
              key={('id' in item ? item.id : null) || index}
              href={url}
              onClick={(e) => {
                close();
                if (url.startsWith('#')) {
                  e.preventDefault();
                  const element = document.querySelector(url);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-white hover:text-gold-500 font-semibold text-lg transition-colors duration-300"
            >
              {item.title}
            </a>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="hidden md:flex items-center space-x-8" role="navigation">
      {navigationItems.map((item, index) => {
        const url = item.url?.includes('myshopify.com') ||
                   item.url?.includes(publicStoreDomain) ||
                   (primaryDomainUrl && item.url?.includes(primaryDomainUrl))
                   ? new URL(item.url).pathname
                   : item.url || '/';

        return (
          <a
            key={('id' in item ? item.id : null) || index}
            href={url}
            onClick={(e) => {
              if (url.startsWith('#')) {
                e.preventDefault();
                const element = document.querySelector(url);
                element?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-white hover:text-gold-500 font-semibold transition-colors duration-300 uppercase tracking-wider text-sm"
          >
            {item.title}
          </a>
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <div className="flex items-center space-x-4">
      {/* Search Toggle */}
      <SearchToggle />

      {/* Account Link */}
      <NavLink 
        prefetch="intent" 
        to="/account" 
        className="hidden sm:flex items-center text-white hover:text-gold-500 transition-colors duration-300"
      >
        <User className="h-5 w-5 mr-1" />
        <Suspense fallback="Account">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </NavLink>

      {/* Cart Toggle */}
      <CartToggle cart={cart} />

      {/* Mobile Menu Toggle */}
      <HeaderMenuMobileToggle />
    </div>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="md:hidden text-white hover:text-gold-500 transition-colors duration-300"
      onClick={() => open('mobile')}
      aria-label="Open mobile menu"
    >
      <Menu className="h-6 w-6" />
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button 
      className="text-white hover:text-gold-500 transition-colors duration-300"
      onClick={() => open('search')}
      aria-label="Open search"
    >
      <Search className="h-5 w-5" />
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
      className="relative text-white hover:text-gold-500 transition-colors duration-300"
      aria-label="Open cart"
    >
      <ShoppingBag className="h-5 w-5" />
      {count !== null && count > 0 && (
        <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}
