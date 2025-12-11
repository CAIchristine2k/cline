import React from 'react';
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Music,
} from 'lucide-react';
import {Link} from 'react-router';
import {FooterLogo} from './FooterLogo';
import {useConfig} from '~/utils/themeContext';
import {PAYMENT_LOGOS, getImageWithFallback} from '~/utils/assetsConfig';

export function Footer() {
  const config = useConfig();

  // Build social links from config
  const socialLinks = Object.entries(config.socialLinks)
    .filter(([_, url]) => url) // Only include links that have URLs
    .map(([platform, url]) => ({
      icon: getSocialIcon(platform),
      label: platform.charAt(0).toUpperCase() + platform.slice(1),
      url,
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

  const quickLinks = [
    {name: 'Boutique', href: '/products'},
    {name: 'Best Sellers', href: '/collections/best-sellers'},
    {name: 'À Propos', href: '/pages/about'},
    {name: 'Contact', href: '/pages/contact'},
  ];

  const supportLinks = [
    {name: 'Politique de Retour', href: '/pages/returns'},
    {name: 'Politique de Livraison', href: '/pages/shipping'},
    {name: 'Paiement Sécurisé', href: '/pages/secure-payment'},
    {name: 'Guide d\'achat', href: '/pages/guide-achat'},
    {name: 'Guide d\'entretien', href: '/pages/guide-entretien'},
    {name: 'FAQ', href: '/pages/faq-produits'},
  ];

  const legalLinks = [
    {name: 'Mentions Légales', href: '/pages/mentions-legales'},
    {name: 'CGV', href: '/pages/cgv'},
    {name: 'Politique de Confidentialité', href: '/pages/privacy-policy'},
  ];

  return (
    <footer className="bg-white">
      <div className="container mx-auto px-3 md:px-4 py-8 md:py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">

          {/* Column 1: About */}
          <div>
            <FooterLogo />

            {/* Social Links */}
            <div className="flex space-x-4 justify-center lg:justify-start">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@c.linehair?_r=1&_t=ZN-91imcHt1ily"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors duration-300"
                aria-label="TikTok"
              >
                <Music className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-black font-bold text-lg mb-4 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-700 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-black font-bold text-lg mb-4 uppercase tracking-wider">Service Client</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-700 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-black font-bold text-lg mb-4 uppercase tracking-wider">Informations Légales</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-700 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="pt-8 mb-8 border-t border-gray-200">
          <div className="flex items-center justify-center pt-8 px-2">
            <img
              src="/images/paiement.webp"
              alt="Méthodes de paiement acceptées"
              className="w-full max-w-[280px] h-auto object-contain"
              style={{ border: 'none' }}
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm text-center md:text-left">
              © {new Date().getFullYear()} C'Line Hair. Tous droits réservés.
            </p>
            <p className="text-gray-500 text-xs text-center md:text-right">
              Développé avec passion pour sublimer votre beauté | Powered by{' '}
              <a
                href="https://odyssey.ad/partners"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors underline"
              >
                Odyssey Technology
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
