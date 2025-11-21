import React, {useState, useEffect} from 'react';
import {
  Menu,
  X,
  ChevronDown,
  ShoppingBag,
  User,
  Search,
} from 'lucide-react';
import {Link, useLocation} from 'react-router';
import {Logo} from './Logo';
import {SearchBar} from './SearchBar';
import {PromoBanner} from './PromoBanner';
import {useConfig} from '~/utils/themeContext';
import {useCart} from '~/providers/CartProvider';

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
      name: 'PERRUQUES',
      link: '/collections/perruques',
      premium: true,
    },
    {
      name: 'NATURELLES',
      megaMenu: true,
      premium: true,
      submenu: [
        {name: 'Toutes les Naturelles', link: '/collections/naturelles'},
        {name: 'Perruques', link: '/collections/naturelles-perruques'},
        {name: 'Bundles', link: '/collections/naturelles-bundles'},
        {name: 'Closures', link: '/collections/naturelles-closure'},
        {name: 'Ponytails', link: '/collections/naturelles-ponytail'},
        {name: 'Bulk', link: '/collections/naturelles-bulk'},
      ],
    },
    {
      name: 'SYNTHÉTIQUE',
      megaMenu: true,
      submenu: [
        {name: 'Toutes les Synthétiques', link: '/collections/synthetique'},
        {name: 'Perruques', link: '/collections/synthetique-perruques'},
        {name: 'Bundles', link: '/collections/synthetique-bundles'},
        {name: 'Closures', link: '/collections/synthetique-closure'},
        {name: 'Ponytails', link: '/collections/synthetique-ponytail'},
        {name: 'Bulk', link: '/collections/synthetique-bulk'},
      ],
    },
    {
      name: 'CONSEILS',
      submenu: [
        {name: "Guide d'achat", link: '/pages/guide-achat'},
        {name: "Guide d'entretien", link: '/pages/guide-entretien'},
        {name: 'FAQ', link: '/pages/faq-produits'},
      ],
    },
    {
      name: 'BEST SELLERS',
      link: '/collections/best-sellers',
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
        className={`border-b border-gray-200 transition-all duration-300 ${
          isScrolled ? 'py-2 md:py-3' : 'py-3 md:py-4'
        }`}
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
                className="text-black hover:text-primary transition-all duration-300 font-medium relative group uppercase tracking-wider text-xs whitespace-nowrap"
              >
                À propos
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Right: Account & Cart */}
            <div className="flex items-center justify-end gap-4">
              {/* Account Button */}
              <Link
                to="/account"
                className="text-gray-700 hover:text-black transition-all duration-300 flex items-center gap-2"
                aria-label="Mon compte"
              >
                <User className="h-5 w-5" />
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
      <div className="hidden lg:block border-b border-gray-100" style={{backgroundColor: '#111111'}}>
        <div className="w-full md:container mx-auto px-4 lg:px-6">
          <nav className="flex items-center justify-center gap-1">
            {menuItems.map((item, index) => (
              <React.Fragment key={item.name}>
                {index > 0 && <span className="text-gray-500 px-1">·</span>}
                <div
                  className="relative"
                  onMouseEnter={() => handleMenuHover(item.name)}
                  onMouseLeave={() => handleMenuHover(null)}
                >
                  {item.link ? (
                    <Link
                      to={item.link}
                      className="text-white hover:text-gray-300 transition-all duration-200 px-4 py-3 text-xs font-medium whitespace-nowrap uppercase tracking-wider inline-flex items-center gap-1"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      className="text-white hover:text-gray-300 transition-all duration-200 px-4 py-3 text-xs font-medium whitespace-nowrap uppercase tracking-wider inline-flex items-center gap-1"
                    >
                      {item.name}
                      {item.submenu && <ChevronDown className="h-3 w-3" />}
                    </button>
                  )}
                </div>
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      {/* Mega Menus / Dropdown (desktop) */}
      {activeMenu && (
        <div
          className="hidden lg:block absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-2xl"
          onMouseEnter={() => handleMenuHover(activeMenu)}
          onMouseLeave={() => handleMenuHover(null)}
        >
          <div className="container mx-auto px-4 lg:px-6 py-8">
            {(() => {
              const activeItem = menuItems.find((item) => item.name === activeMenu);
              if (!activeItem?.submenu) return null;

              // Mega menu avec grille (pour Naturel, Semi-Naturel, Accessoires)
              if (activeItem.megaMenu) {
                return (
                  <div className="max-w-3xl mx-auto">
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {activeItem.submenu.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            to={subItem.link}
                            className="block px-4 py-3 text-sm text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                            onClick={() => setActiveMenu(null)}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }

              // Menu simple liste (pour Conseils, Centre d'Aide)
              return (
                <div className="max-w-2xl mx-auto">
                  <ul className="grid grid-cols-2 gap-4">
                    {activeItem.submenu.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          to={subItem.link}
                          className="block px-4 py-3 text-sm text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                          onClick={() => setActiveMenu(null)}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-200 z-50 max-h-[80vh] overflow-y-auto">
          <div className="py-4">
            {/* Search Bar Mobile */}
            <div className="px-4 pb-4 border-b border-gray-100">
              <SearchBar />
            </div>

            <nav className="flex flex-col">
              {/* Liens principaux */}
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-black hover:bg-gray-50 transition-all duration-300 py-4 px-4 text-sm uppercase font-semibold tracking-wider flex items-center justify-between border-b border-gray-100"
              >
                Accueil
              </Link>

              <Link
                to="/pages/about"
                onClick={() => setIsOpen(false)}
                className="text-black hover:bg-gray-50 transition-all duration-300 py-4 px-4 text-sm uppercase font-semibold tracking-wider flex items-center justify-between border-b border-gray-100"
              >
                À propos
              </Link>

              {/* Menus avec sous-menus */}
              {menuItems.map((item) => (
                <div key={item.name} className="border-b border-gray-100">
                  {item.link ? (
                    <Link
                      to={item.link}
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
                      {mobileActiveMenu === item.name && item.submenu && (
                        <div className="bg-gray-50 py-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.link}
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
                      )}
                    </>
                  )}
                </div>
              ))}

              {/* Account link in mobile */}
              <Link
                to="/account"
                onClick={() => setIsOpen(false)}
                className="text-black hover:bg-gray-50 transition-all duration-300 py-4 px-4 text-sm uppercase font-semibold tracking-wider flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Mon compte
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
