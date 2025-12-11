import React, {useState, useEffect} from 'react';
import {
  Menu,
  X,
  ChevronDown,
  ShoppingBag,
  User,
  Search,
  Heart,
} from 'lucide-react';
import {Link, useLocation} from 'react-router';
import {Logo} from './Logo';
import {SearchBar} from './SearchBar';
import {PromoBanner} from './PromoBanner';
import {useConfig} from '~/utils/themeContext';
import {useCart} from '~/providers/CartProvider';
import {WishlistCount} from './WishlistButton';

// Types pour les menus
interface SubMenuItem {
  name: string;
  link: string;
  description?: string;
  image?: string;
}

interface MenuItem {
  name: string;
  link?: string;
  submenu?: SubMenuItem[];
  megaMenu?: boolean;
  premium?: boolean;
}

export function Header() {
  const config = useConfig();
  const {totalQuantity, openCart} = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileActiveMenu, setMobileActiveMenu] = useState<string | null>(null);
  const location = useLocation();

  // Get cart count
  const cartCount = totalQuantity || 0;

  // Configuration des menus principaux (header secondaire)
  const menuItems: MenuItem[] = [
    {
      name: 'BEST SELLERS',
      link: '/collections/best-sellers',
    },
    {
      name: 'VENTE FLASH',
      link: '/collections/vente-flash',
    },
    {
      name: 'PERRUQUES',
      submenu: [
        {name: 'Naturelles', link: '/collections/naturelles-perruques'},
        {name: 'Synthétique', link: '/collections/synthetique-perruques'},
      ],
    },
    {
      name: 'TISSAGES',
      submenu: [
        {name: 'Bundles naturels', link: '/collections/naturelles-bundles'},
        {name: 'Bundles synthétiques', link: '/collections/bundles'},
      ],
    },
    {
      name: 'CLOSURE & FRONTALE',
      submenu: [
        {name: 'Closures naturelles', link: '/collections/naturelles-closure'},
        {name: 'Closures synthétiques', link: '/collections/synthetique-closure'},
      ],
    },
    {
      name: 'CROCHET BRAIDS',
      link: '/collections/crochet-braids',
      premium: true, // Hidden flag - will be shown later
    },
    {
      name: 'ACCESSOIRES',
      submenu: [
        {name: 'Accessoires de maintien', link: '/collections/accessoires-maintien'},
        {name: 'Accessoires de coiffage', link: '/collections/accessoires-coiffage'},
        {name: "Produits d'entretien", link: '/collections/accessoires-entretien'},
        {name: 'Accessoires de rangement & transport', link: '/collections/accessoires-rangement'},
      ],
      premium: true, // Hidden flag - will be shown later
    },
    {
      name: 'NOS PRODUITS',
      link: '/products',
    },
    {
      name: 'CONSEILS',
      submenu: [
        {name: "Guide d'achat", link: '/pages/guide-achat'},
        {name: "Guide d'entretien", link: '/pages/guide-entretien'},
        {name: 'FAQ', link: '/pages/faq-produits'},
      ],
    },
  ];

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 30);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openCart();
  };

  const handleMenuHover = (menuName: string | null) => {
    setActiveMenu(menuName);
  };

  const toggleMobileMenu = (menuName: string) => {
    setMobileActiveMenu(mobileActiveMenu === menuName ? null : menuName);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xl'
          : 'bg-white'
      }`}
    >
      {/* Promo Banner */}
      <PromoBanner />

      {/* Header principal */}
      <div
        className="transition-all duration-300"
      >
        <div className="w-full md:container mx-auto px-3 md:px-4 lg:px-6">
          {/* Desktop Header */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
            {/* Left: Search Bar (plus discrète) */}
            <div className="flex items-center">
              <div className="w-full max-w-xs">
                <SearchBar />
              </div>
            </div>

            {/* Center: Navigation with Logo */}
            <nav className="flex items-center justify-center gap-3 flex-shrink-0">
              <Link
                to="/"
                prefetch="intent"
                className="text-black hover:text-primary transition-all duration-300 font-medium relative group uppercase tracking-wider text-xs whitespace-nowrap"
              >
                Accueil
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              {/* Logo au centre */}
              <div className="mx-4 flex-shrink-0">
                <Logo isScrolled={isScrolled} />
              </div>

              <Link
                to="/pages/about"
                prefetch="intent"
                className="text-black hover:text-primary transition-all duration-300 font-medium relative group uppercase tracking-wider text-xs whitespace-nowrap"
              >
                À propos
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Right: Account & Cart */}
            <div className="flex items-center justify-end gap-4">
              {/* Account Button */}
              <a
                href="https://account.clinehair.com/orders"
                className="text-gray-700 hover:text-black transition-all duration-300 flex items-center gap-2"
                aria-label="Mon compte"
              >
                <User className="h-5 w-5" />
              </a>

              {/* Wishlist Button */}
              <Link
                to="/wishlist"
                className="text-gray-700 hover:text-black transition-all duration-300 flex items-center gap-2 relative"
                aria-label="Mes favoris"
              >
                <Heart className="h-5 w-5" />
                <WishlistCount />
              </Link>

              {/* Cart Button */}
              <button
                onClick={handleCartClick}
                className="bg-black hover:bg-gray-800 text-white font-semibold py-2.5 px-5 rounded-md transition-all duration-300 flex items-center text-sm uppercase tracking-wide shadow-lg relative"
                aria-label="Panier"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                <span>Panier</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="lg:hidden flex justify-between items-center">
            <Logo isScrolled={isScrolled} />

            <div className="flex items-center gap-2">
              <Link
                to="/wishlist"
                className="bg-black text-white p-1.5 md:p-2 rounded-md transition-all duration-300 relative"
                aria-label="Mes favoris"
              >
                <Heart className="h-4 w-4 md:h-5 md:w-5" />
                <WishlistCount />
              </Link>

              <button
                onClick={handleCartClick}
                className="bg-black text-white p-1.5 md:p-2 rounded-md transition-all duration-300 relative"
                aria-label="Panier"
              >
                <ShoppingBag className="h-4 w-4 md:h-5 md:w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-black text-[10px] md:text-xs font-bold rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>

              <button
                className="bg-black text-white p-1.5 md:p-2 rounded-md hover:bg-gray-800 transition-all duration-300"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="h-4 w-4 md:h-5 md:w-5" /> : <Menu className="h-4 w-4 md:h-5 md:w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu de navigation principal (desktop) */}
      <div className="hidden lg:block relative" style={{backgroundColor: '#111111'}}>
        <div className="w-full md:container mx-auto px-4 lg:px-6">
          <nav className="flex items-center justify-center gap-1">
            {menuItems.filter(item => !item.premium).map((item, index) => (
              <div
                key={item.name}
                className="relative flex items-center"
              >
                <span className={`text-gray-500 px-1 ${index === 0 ? 'hidden' : ''}`}>·</span>
                <div
                  className="relative"
                  onMouseEnter={() => item.submenu ? handleMenuHover(item.name) : null}
                  onMouseLeave={() => item.submenu ? handleMenuHover(null) : null}
                >
                  {item.link ? (
                    <Link
                      to={item.link}
                      prefetch="intent"
                      className="text-white hover:text-gray-300 transition-all duration-200 px-4 py-3 text-xs font-medium whitespace-nowrap uppercase tracking-wider inline-flex items-center gap-1"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      className="text-white hover:text-gray-300 transition-all duration-200 px-4 py-3 text-xs font-medium whitespace-nowrap uppercase tracking-wider inline-flex items-center gap-1"
                    >
                      {item.name}
                      {item.submenu ? <ChevronDown className="h-3 w-3" /> : null}
                    </button>
                  )}

                  {/* Dropdown sous-menu positionné juste en dessous */}
                  {item.submenu && activeMenu === item.name && (
                    <div
                      className="absolute top-full left-0 bg-white shadow-lg border border-gray-200 rounded-sm mt-1 z-50 min-w-[250px]"
                      onMouseEnter={() => handleMenuHover(item.name)}
                      onMouseLeave={() => handleMenuHover(null)}
                    >
                      <ul className="py-2">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              to={subItem.link}
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-primary hover:text-black transition-all duration-200 uppercase tracking-wide border-b border-gray-100 last:border-b-0"
                              onClick={() => setActiveMenu(null)}
                              prefetch="intent"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen ? (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl z-50 max-h-[80vh] overflow-y-auto">
          <div className="py-4">
            {/* Search Bar Mobile */}
            <div className="px-4 pb-4">
              <SearchBar onClose={() => setIsOpen(false)} />
            </div>

            <nav className="flex flex-col">
              {/* Liens principaux */}
              <Link
                to="/"
                prefetch="intent"
                onClick={() => setIsOpen(false)}
                className="text-black hover:bg-gray-50 transition-all duration-300 py-4 px-4 text-sm uppercase font-semibold tracking-wider flex items-center justify-between"
              >
                Accueil
              </Link>

              <Link
                to="/pages/about"
                prefetch="intent"
                onClick={() => setIsOpen(false)}
                className="text-black hover:bg-gray-50 transition-all duration-300 py-4 px-4 text-sm uppercase font-semibold tracking-wider flex items-center justify-between"
              >
                À propos
              </Link>

              <Link
                to="/products"
                prefetch="intent"
                onClick={() => setIsOpen(false)}
                className="text-black hover:bg-gray-50 transition-all duration-300 py-4 px-4 text-sm uppercase font-semibold tracking-wider flex items-center justify-between"
              >
                NOS PRODUITS
              </Link>

              {/* Menus avec sous-menus */}
              {menuItems.filter(item => !item.premium).map((item) => (
                <div key={item.name}>
                  {item.link ? (
                    <Link
                      to={item.link}
                      prefetch="intent"
                      onClick={() => setIsOpen(false)}
                      className="text-black hover:bg-gray-50 transition-all duration-300 py-4 px-4 text-sm uppercase font-semibold tracking-wider flex items-center justify-between"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleMobileMenu(item.name)}
                        className="w-full text-black hover:bg-gray-50 transition-all duration-300 py-4 px-4 text-sm uppercase font-semibold tracking-wider flex items-center justify-between"
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            mobileActiveMenu === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {mobileActiveMenu === item.name && item.submenu ? (
                        <div className="bg-gray-50 py-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.link}
                              prefetch="intent"
                              onClick={() => {
                                setIsOpen(false);
                                setMobileActiveMenu(null);
                              }}
                              className="block py-3 px-6 text-sm text-gray-700 hover:text-black hover:bg-white transition-all duration-200"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              ))}

              {/* Account link in mobile */}
              <a
                href="https://account.clinehair.com/orders"
                onClick={() => setIsOpen(false)}
                className="text-black hover:bg-gray-50 transition-all duration-300 py-4 px-4 text-sm uppercase font-semibold tracking-wider flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Mon compte
              </a>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
