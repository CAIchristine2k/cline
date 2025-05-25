import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, ShoppingBag, Instagram, Twitter, Youtube, Facebook, Music } from 'lucide-react';
import { Link } from 'react-router';
import { Logo } from './Logo';
import { useConfig } from '~/utils/themeContext';
import { cssVars } from '~/lib/themeConfig';

export function Header() {
  const config = useConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Build social links from config
  const socialLinks = Object.entries(config.socialLinks)
    .filter(([_, url]) => url) // Only include links that have URLs
    .map(([platform, url]) => ({
      name: platform.charAt(0).toUpperCase() + platform.slice(1),
      icon: getSocialIcon(platform),
      link: url
    }));

  function getSocialIcon(platform: string) {
    switch (platform) {
      case 'instagram': return Instagram;
      case 'twitter': return Twitter;
      case 'youtube': return Youtube;
      case 'facebook': return Facebook;
      case 'tiktok': return Music;
      default: return Instagram;
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
    if (link.startsWith('#')) {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-sm shadow-xl py-3' 
          : 'bg-gradient-to-b from-black/90 to-black/50 py-5'
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
                className="text-white hover:text-primary transition-all duration-300 font-medium relative group uppercase tracking-wider text-sm"
                style={{
                  '--hover-text-color': cssVars.primary
                } as React.CSSProperties}
              >
                {item.name}
                <span 
                  className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: cssVars.primary }}
                ></span>
              </Link>
            ))}
          </div>
          
          {/* CTA Button */}
          <Link 
            to={config.ctaLink}
            onClick={(e) => {
              if (config.ctaLink.startsWith('#')) {
                e.preventDefault();
                handleNavClick(config.ctaLink);
              }
            }}
            className="ml-10 bg-primary hover:bg-primary/80 text-black font-bold py-2.5 px-5 rounded-sm transition-all duration-300 flex items-center text-sm uppercase shadow-glow"
            style={{
              backgroundColor: cssVars.primary,
              color: cssVars.background
            }}
          >
            <ShoppingBag className="mr-1.5 h-4 w-4" />
            Shop Now
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <Link 
            to={config.ctaLink}
            onClick={(e) => {
              if (config.ctaLink.startsWith('#')) {
                e.preventDefault();
                handleNavClick(config.ctaLink);
              }
            }}
            className="bg-primary hover:bg-primary/80 text-black p-2 rounded-sm transition-all duration-300 shadow-glow"
            style={{
              backgroundColor: cssVars.primary,
              color: cssVars.background
            }}
            aria-label="Shop Now"
          >
            <ShoppingBag className="h-5 w-5" />
          </Link>
          
          <button
            className="text-white focus:outline-none p-1.5 border border-white/20 rounded-sm hover:border-primary transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              '--hover-border-color': cssVars.primary
            } as React.CSSProperties}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm shadow-xl border-t border-gray-800">
          <div className="container mx-auto py-4">
            <nav className="flex flex-col divide-y divide-gray-800/50">
              {config.navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith('#')) {
                      e.preventDefault();
                    }
                    handleNavClick(item.href);
                  }}
                  className="text-white hover:text-primary hover:bg-gray-900/30 transition-all duration-300 py-4 px-4 text-sm uppercase font-medium tracking-wider flex items-center justify-between"
                  style={{
                    '--hover-text-color': cssVars.primary
                  } as React.CSSProperties}
                >
                  {item.name}
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </Link>
              ))}
            </nav>
            
            {/* Social Icons (Mobile) - built from config */}
            {socialLinks.length > 0 && (
              <div className="flex justify-center space-x-8 mt-6 pt-6 border-t border-gray-800/50">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a 
                      key={social.name}
                      href={social.link}
                      className="text-gray-400 hover:text-primary transition-all duration-300"
                      style={{
                        '--hover-text-color': cssVars.primary
                      } as React.CSSProperties}
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
    </header>
  );
}
