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
} from 'lucide-react';
import {Link, useLocation} from 'react-router';
import {Logo} from './Logo';
import {useConfig} from '~/utils/themeContext';
import {useCart} from '~/providers/CartProvider';
import {useAside} from './Aside';
// Import removed - we'll handle navigation directly

export function Header() {
  const config = useConfig();
  const {totalQuantity, openCart} = useCart();
  const {open} = useAside();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
          ? 'bg-white/95 backdrop-blur-sm shadow-xl py-3'
          : 'bg-white py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo Area */}
        <div className="flex items-center space-x-2">
          <Logo isScrolled={isScrolled} />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <div className="flex space-x-10">
            {config.navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }
                }}
                className="text-black hover:text-primary transition-all duration-300 font-medium relative group uppercase tracking-wider text-sm"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Cart Button */}
          <button
            onClick={handleCartClick}
            className="ml-10 bg-primary hover:bg-primary-400 text-black font-bold py-2.5 px-5 rounded-sm transition-all duration-300 flex items-center text-sm uppercase shadow-glow relative"
          >
            <ShoppingBag className="mr-1.5 h-4 w-4" />
            Panier
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-xl border-t border-primary/20">
          <div className="container mx-auto py-4">
            <nav className="flex flex-col divide-y divide-primary/10">
              {config.navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith('#')) {
                      e.preventDefault();
                      handleNavClick(item.href);
                    } else {
                      // For regular links, just close the mobile menu
                      setIsOpen(false);
                    }
                  }}
                  className="text-black hover:text-primary hover:bg-primary/5 transition-all duration-300 py-4 px-4 text-sm uppercase font-medium tracking-wider flex items-center justify-between"
                >
                  {item.name}
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              ))}
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
        `,
        }}
      />
    </header>
  );
}
