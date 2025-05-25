import {Suspense} from 'react';
import {Await, NavLink} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import {Instagram, Twitter, Youtube, Mail, Phone, MapPin} from 'lucide-react';

interface FooterProps {
  menu: FooterQuery['menu'];
  shop: HeaderQuery['shop'] | undefined;
}

export function Footer({menu, shop}: FooterProps) {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <img 
                src="/images/footer-logo.png" 
                alt="Sugar Shane" 
                className="h-10 w-auto"
              />
              <span className="text-gold-500 font-bold text-xl tracking-wider">
                SUGAR SHANE
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Premium boxing equipment and exclusive merchandise from the legendary Sugar Shane Mosley. 
              Championship quality for champions.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/sugarshanemosley"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gold-500 text-white hover:text-black p-2 rounded-sm transition-all duration-300"
                aria-label="Follow on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/ShaneMosley_"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gold-500 text-white hover:text-black p-2 rounded-sm transition-all duration-300"
                aria-label="Follow on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/c/SugarShaneM"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gold-500 text-white hover:text-black p-2 rounded-sm transition-all duration-300"
                aria-label="Subscribe on YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 tracking-wider">QUICK LINKS</h3>
            <FooterMenu menu={menu} />
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 tracking-wider">CUSTOMER SERVICE</h3>
            <ul className="space-y-3">
              <li>
                <NavLink 
                  to="/pages/size-guide" 
                  className="text-gray-400 hover:text-gold-500 transition-colors duration-300"
                >
                  Size Guide
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/pages/shipping" 
                  className="text-gray-400 hover:text-gold-500 transition-colors duration-300"
                >
                  Shipping Info
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/pages/returns" 
                  className="text-gray-400 hover:text-gold-500 transition-colors duration-300"
                >
                  Returns & Exchanges
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/pages/faq" 
                  className="text-gray-400 hover:text-gold-500 transition-colors duration-300"
                >
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/pages/contact" 
                  className="text-gray-400 hover:text-gold-500 transition-colors duration-300"
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 tracking-wider">GET IN TOUCH</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gold-500" />
                <a 
                  href="mailto:contact@sugarshanemosley.store"
                  className="text-gray-400 hover:text-gold-500 transition-colors duration-300"
                >
                  contact@sugarshanemosley.store
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gold-500" />
                <a 
                  href="tel:+1-555-SHANE-01"
                  className="text-gray-400 hover:text-gold-500 transition-colors duration-300"
                >
                  +1 (555) SHANE-01
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gold-500 mt-0.5" />
                <div className="text-gray-400">
                  <p>Sugar Shane Boxing</p>
                  <p>Los Angeles, CA</p>
                  <p>United States</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Sugar Shane Mosley. All rights reserved. | Championship quality since 1993.
            </div>
            
            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <NavLink 
                to="/policies/privacy-policy" 
                className="text-gray-400 hover:text-gold-500 transition-colors duration-300"
              >
                Privacy Policy
              </NavLink>
              <NavLink 
                to="/policies/terms-of-service" 
                className="text-gray-400 hover:text-gold-500 transition-colors duration-300"
              >
                Terms of Service
              </NavLink>
              <NavLink 
                to="/policies/refund-policy" 
                className="text-gray-400 hover:text-gold-500 transition-colors duration-300"
              >
                Refund Policy
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterMenu({menu}: {menu: FooterQuery['menu']}) {
  const sugarShaneFooterItems = [
    { title: 'Collections', url: '/collections' },
    { title: 'New Arrivals', url: '/collections/new-arrivals' },
    { title: 'Best Sellers', url: '/collections/best-sellers' },
    { title: 'About Shane', url: '/pages/about' },
    { title: 'Boxing Legacy', url: '/pages/legacy' },
  ];

  const menuItems = menu?.items?.length ? menu.items : sugarShaneFooterItems;

  return (
    <ul className="space-y-3">
      {menuItems.map((item, index) => {
        if (!item.url) return null;
        
        const url = item.url.includes('myshopify.com') ||
                   item.url.includes('shopify.com')
                   ? new URL(item.url).pathname
                   : item.url;
                   
        const isExternal = !url.startsWith('/');
        
        return (
          <li key={('id' in item ? item.id : null) || index}>
            {isExternal ? (
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold-500 transition-colors duration-300"
              >
                {item.title}
              </a>
            ) : (
              <NavLink
                to={url}
                className="text-gray-400 hover:text-gold-500 transition-colors duration-300"
              >
                {item.title}
              </NavLink>
            )}
          </li>
        );
      })}
    </ul>
  );
}
