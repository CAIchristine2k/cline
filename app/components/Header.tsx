import React, {useState, useEffect} from 'react';
import {
  Menu,
  X,
  ChevronRight,
  ShoppingBag,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Music,
  User,
} from 'lucide-react';
import {Link, useLocation} from 'react-router';
import {Logo} from './Logo';
import {SearchBar} from './SearchBar';
import {useConfig} from '~/utils/themeContext';
import {useCart} from '~/providers/CartProvider';
import {useAside} from './Aside';

export function Header() {
  const config = useConfig();
  const {totalQuantity, openCart} = useCart();
  const {open} = useAside();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const location = useLocation();

  // Get cart count
  const cartCount = totalQuantity || 0;

  // Build social links from config
  const socialLinks = Object.entries(config.socialLinks || {})
    .filter(([_, url]) => url) // Only include links that have URLs
    .map(([platform, url]) => ({
      name: platform.charAt(0).toUpperCase() + platform.slice(1),
      icon: getSocialIcon(platform),
      link: url,
    }));

  function getSocialIcon(platform: string) {
    switch (platform) {
      case 'instagram':
        return Instagram;
      case 'twitter':
        return Twitter;
      case 'youtube':
        return Youtube;
      case 'facebook':
        return Facebook;
      case 'tiktok':
        return Music;
      default:
        return Instagram;
    }
  }

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 30);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Set initial scroll state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (link: string) => {
    setIsOpen(false);
    // Handle hash links with smooth scrolling
    if (link.startsWith('#')) {
      // If we're on homepage, scroll to section
      if (location.pathname === '/') {
        const id = link.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 80;
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight - 20;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      } else {
        // If not on homepage, redirect to homepage with hash
        window.location.href = `/${link}`;
      }
    }
    // For regular links, React Router will handle them naturally
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Use the openCart method from CartProvider
    openCart();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-xl'
          : 'bg-white'
      }`}
    >
      {/* Rangée 1 : Header principal */}
      <div className={`border-b border-primary/10 transition-all duration-300 ${
        isScrolled ? 'py-2 lg:py-3' : 'py-4 lg:py-5'
      }`}>
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        {/* Desktop Header */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-4 xl:gap-8 items-center">
          {/* Left: Search Bar */}
          <div className="flex items-center">
            <div className="w-full lg:max-w-[200px] xl:max-w-sm">
              <SearchBar />
            </div>
          </div>

          {/* Center: Navigation with Logo */}
          <nav className="flex items-center justify-center lg:gap-2 xl:gap-4 flex-shrink-0">
            <Link
              to="/"
              className="text-black hover:text-primary transition-all duration-300 font-medium relative group uppercase tracking-wider lg:text-[10px] xl:text-xs whitespace-nowrap flex-shrink-0"
            >
              Accueil
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Logo au centre */}
            <div className="lg:mx-1 xl:mx-3 flex-shrink-0">
              <Logo isScrolled={isScrolled} />
            </div>

            <Link
              to="/collections/all"
              className="text-black hover:text-primary transition-all duration-300 font-medium relative group uppercase tracking-wider lg:text-[10px] xl:text-xs whitespace-nowrap flex-shrink-0"
            >
              Boutique
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/about"
              className="text-black hover:text-primary transition-all duration-300 font-medium relative group uppercase tracking-wider lg:text-[10px] xl:text-xs whitespace-nowrap flex-shrink-0"
            >
              À propos
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right: Account & Cart */}
          <div className="flex items-center justify-end lg:gap-2 xl:gap-4">
            {/* Account Button */}
            <Link
              to="/account"
              className="text-black hover:text-primary transition-all duration-300 flex items-center gap-2"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Cart Button */}
            <button
              onClick={handleCartClick}
              className="bg-primary hover:bg-primary-400 text-black font-bold lg:py-2 lg:px-3 xl:py-2.5 xl:px-5 rounded-sm transition-all duration-300 flex items-center lg:text-xs xl:text-sm uppercase shadow-glow relative whitespace-nowrap"
            >
              <ShoppingBag className="lg:mr-1 xl:mr-1.5 h-4 w-4" />
              <span className="hidden xl:inline">Panier</span>
              <span className="lg:inline xl:hidden">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Header */}
        <div className="lg:hidden flex justify-between items-center">
          <Logo isScrolled={isScrolled} />

          <div className="flex items-center gap-3">
            <button
              onClick={handleCartClick}
              className="bg-primary hover:bg-primary-400 text-black p-2 rounded-sm transition-all duration-300 shadow-glow relative"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            <button
              className="bg-primary text-white focus:outline-none p-1.5 border border-primary rounded-sm hover:bg-primary-400 transition-all duration-300"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* Rangée 2 : Sous-header navigation catégories (toujours visible) */}
      <div className="hidden lg:block border-b border-primary/10" style={{backgroundColor: 'rgb(255, 234, 191)'}}>
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <nav className="flex items-center justify-center gap-1 py-3 overflow-x-auto scrollbar-hide">
            <a
              href="#"
              onMouseEnter={() => setActiveCategory('nouvelle-collection')}
              onMouseLeave={() => setActiveCategory(null)}
              className="text-black hover:text-black/80 hover:bg-black/10 transition-all duration-200 px-3 py-2 rounded-sm text-xs font-medium whitespace-nowrap uppercase tracking-wide">
              Nouvelle collection
            </a>
            <span className="text-black/30">|</span>
            <a
              href="#"
              onMouseEnter={() => setActiveCategory('perruques')}
              onMouseLeave={() => setActiveCategory(null)}
              className="text-black hover:text-black/80 hover:bg-black/10 transition-all duration-200 px-3 py-2 rounded-sm text-xs font-medium whitespace-nowrap uppercase tracking-wide">
              Perruques
            </a>
            <span className="text-black/30">|</span>
            <a
              href="#"
              onMouseEnter={() => setActiveCategory('extensions')}
              onMouseLeave={() => setActiveCategory(null)}
              className="text-black hover:text-black/80 hover:bg-black/10 transition-all duration-200 px-3 py-2 rounded-sm text-xs font-medium whitespace-nowrap uppercase tracking-wide">
              Extensions
            </a>
            <span className="text-black/30">|</span>
            <a
              href="#"
              onMouseEnter={() => setActiveCategory('lots')}
              onMouseLeave={() => setActiveCategory(null)}
              className="text-black hover:text-black/80 hover:bg-black/10 transition-all duration-200 px-3 py-2 rounded-sm text-xs font-medium whitespace-nowrap uppercase tracking-wide">
              Lots & frontales
            </a>
            <span className="text-black/30">|</span>
            <a
              href="#"
              onMouseEnter={() => setActiveCategory('queues')}
              onMouseLeave={() => setActiveCategory(null)}
              className="text-black hover:text-black/80 hover:bg-black/10 transition-all duration-200 px-3 py-2 rounded-sm text-xs font-medium whitespace-nowrap uppercase tracking-wide">
              Coiffures
            </a>
            <span className="text-black/30">|</span>
            <a
              href="#"
              onMouseEnter={() => setActiveCategory('accessoires')}
              onMouseLeave={() => setActiveCategory(null)}
              className="text-black hover:text-black/80 hover:bg-black/10 transition-all duration-200 px-3 py-2 rounded-sm text-xs font-medium whitespace-nowrap uppercase tracking-wide">
              Accessoires & entretien
            </a>
            <span className="text-black/30">|</span>
            <a
              href="#"
              onMouseEnter={() => setActiveCategory('conseils')}
              onMouseLeave={() => setActiveCategory(null)}
              className="text-black hover:text-black/80 hover:bg-black/10 transition-all duration-200 px-3 py-2 rounded-sm text-xs font-medium whitespace-nowrap uppercase tracking-wide">
              Conseils
            </a>
            <span className="text-black/30">|</span>
            <a href="#" className="text-black hover:text-black/80 hover:bg-black/10 transition-all duration-200 px-3 py-2 rounded-sm text-xs font-medium whitespace-nowrap uppercase tracking-wide">
              Centre d'aide
            </a>
            <span className="text-black/30">|</span>
            <a href="#" className="text-black hover:text-black/80 hover:bg-black/10 transition-all duration-200 px-3 py-2 rounded-sm text-xs font-medium whitespace-nowrap uppercase tracking-wide">
              Contact
            </a>
          </nav>
        </div>
      </div>

      {/* Rangée 3 : Sous-catégories contextuelles - affichée au survol de la catégorie correspondante */}
      {activeCategory === 'perruques' && (
        <div
          className="hidden lg:block bg-primary/5 border-b border-primary/10"
          onMouseEnter={() => setActiveCategory('perruques')}
          onMouseLeave={() => setActiveCategory(null)}
        >
          <div className="container mx-auto px-3 sm:px-4 lg:px-6">
            <nav className="flex items-center justify-center flex-wrap gap-2 py-3">
            <a href="#" className="text-black hover:text-primary hover:bg-white/60 transition-all duration-200 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap bg-white/40 backdrop-blur-sm">
              Wear & Go
            </a>
            <span className="text-primary/20">·</span>
            <a href="#" className="text-black hover:text-primary hover:bg-white/60 transition-all duration-200 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap bg-white/40 backdrop-blur-sm">
              HD Lace 9×6
            </a>
            <span className="text-primary/20">·</span>
            <a href="#" className="text-black hover:text-primary hover:bg-white/60 transition-all duration-200 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap bg-white/40 backdrop-blur-sm">
              360° InvisiFit
            </a>
            <span className="text-primary/20">·</span>
            <a href="#" className="text-black hover:text-primary hover:bg-white/60 transition-all duration-200 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap bg-white/40 backdrop-blur-sm">
              Raie U
            </a>
            <span className="text-primary/20">·</span>
            <a href="#" className="text-black hover:text-primary hover:bg-white/60 transition-all duration-200 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap bg-white/40 backdrop-blur-sm">
              Bob
            </a>
            <span className="text-primary/20">·</span>
            <a href="#" className="text-black hover:text-primary hover:bg-white/60 transition-all duration-200 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap bg-white/40 backdrop-blur-sm">
              Bouclées/Deep Wave
            </a>
            <span className="text-primary/20">·</span>
            <a href="#" className="text-black hover:text-primary hover:bg-white/60 transition-all duration-200 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap bg-white/40 backdrop-blur-sm">
              Colorées
            </a>
          </nav>
        </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-xl border-t border-primary/20 z-50">
          <div className="container mx-auto py-4">
            {/* Search Bar Mobile */}
            <div className="px-4 pb-4 border-b border-primary/10">
              <SearchBar />
            </div>

            <nav className="flex flex-col divide-y divide-primary/10">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-black hover:text-primary hover:bg-primary/5 transition-all duration-300 py-4 px-4 text-sm uppercase font-medium tracking-wider flex items-center justify-between"
              >
                Accueil
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>

              <Link
                to="/collections/all"
                onClick={() => setIsOpen(false)}
                className="text-black hover:text-primary hover:bg-primary/5 transition-all duration-300 py-4 px-4 text-sm uppercase font-medium tracking-wider flex items-center justify-between"
              >
                Boutique
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>

              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="text-black hover:text-primary hover:bg-primary/5 transition-all duration-300 py-4 px-4 text-sm uppercase font-medium tracking-wider flex items-center justify-between"
              >
                À propos
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>

              <Link
                to="/pages/contact"
                onClick={() => setIsOpen(false)}
                className="text-black hover:text-primary hover:bg-primary/5 transition-all duration-300 py-4 px-4 text-sm uppercase font-medium tracking-wider flex items-center justify-between"
              >
                Contact
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>

              <Link
                to="/account"
                onClick={() => setIsOpen(false)}
                className="text-black hover:text-primary hover:bg-primary/5 transition-all duration-300 py-4 px-4 text-sm uppercase font-medium tracking-wider flex items-center justify-between"
              >
                Mon compte
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            </nav>

            {/* Social Icons (Mobile) - built from config */}
            {socialLinks.length > 0 && (
              <div className="flex justify-center space-x-8 mt-6 pt-6 border-t border-primary/20">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.link as string}
                      className="text-gray-600 hover:text-primary transition-all duration-300"
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add the subtle gold underline animation and shadow-glow effects */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .group:hover span {
            box-shadow: 0 0 8px rgba(var(--color-primary-rgb), 0.5);
          }

          .shadow-glow {
            box-shadow: 0 4px 15px rgba(var(--color-primary-rgb), 0.2);
          }

          /* Hide scrollbar for navigation overflow */
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `,
        }}
      />
    </header>
  );
}
