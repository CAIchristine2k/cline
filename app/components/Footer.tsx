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
    {name: 'Boutique', href: '/collections/all'},
    {name: 'Best Sellers', href: '/collections/best-sellers'},
    {name: 'Nouveautés', href: '/collections/nouveautes'},
    {name: 'À Propos', href: '/about'},
    {name: 'Notre Histoire', href: '/#brand-story'},
  ];

  const supportLinks = [
    {name: 'Contactez-nous', href: '/pages/contact'},
    {name: 'FAQ', href: '/pages/faq'},
    {name: 'Livraison & Retours', href: '/pages/shipping'},
    {name: 'Guide des Tailles', href: '/pages/size-guide'},
  ];

  const legalLinks = [
    {name: 'Mentions Légales', href: '/pages/mentions-legales'},
    {name: 'CGV', href: '/pages/cgv'},
    {name: 'Politique de Confidentialité', href: '/pages/privacy-policy'},
    {name: 'Cookies', href: '/pages/cookies'},
  ];

  return (
    <footer className="bg-white border-t border-primary/20">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Column 1: About */}
          <div>
            <FooterLogo />
            <p className="text-gray-700 text-sm leading-relaxed mb-6 mt-4">
              Depuis plus de 20 ans, C'Line Hair sublime la beauté des femmes avec des perruques et extensions éthiques, durables et accessibles.
            </p>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex space-x-4">
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
              </div>
            )}
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
        <div className="border-t border-primary/20 pt-8 mb-8">
          <p className="text-gray-600 text-sm text-center mb-4">Moyens de paiement acceptés</p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {/* Klarna */}
            <div className="h-10 px-4 flex items-center justify-center bg-[#FFB3C7] rounded-md">
              <span className="font-bold text-black text-base">klarna</span>
            </div>
            {/* American Express */}
            <div className="h-10 px-4 flex items-center justify-center bg-[#006FCF] rounded-md">
              <span className="font-bold text-white text-sm tracking-wide">AMERICAN EXPRESS</span>
            </div>
            {/* Apple Pay */}
            <div className="h-10 px-4 flex items-center justify-center bg-white border border-gray-300 rounded-md">
              <svg className="h-6 w-auto" viewBox="0 0 65 25" fill="none">
                <g>
                  <path d="M11.5 5.5c.7-1 1.2-2.3 1-3.7-1 0-2.2.7-2.9 1.5-.7.7-1.2 1.9-1.1 3 1.1.1 2.3-.6 3-1.8z" fill="black"/>
                  <path d="M12.5 6.2c-1.7-.1-3.1.9-3.9.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.3 2.5 1.3 0 1.8-.8 3.4-.8 1.5 0 2 .8 3.3.8 1.4 0 2.3-1.2 3.2-2.4.5-.7.9-1.4 1.2-2.2-2.5-1-2.9-4.4-.3-5.5-.9-1.3-2.3-2-3.9-2.1z" fill="black"/>
                </g>
                <text x="22" y="17" fill="black" fontSize="10" fontWeight="500" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif">Pay</text>
              </svg>
            </div>
            {/* Google Pay */}
            <div className="h-10 px-4 flex items-center justify-center bg-white border border-gray-300 rounded-md">
              <svg className="h-5 w-auto" viewBox="0 0 50 20" fill="none">
                <text x="0" y="14" fill="#5F6368" fontSize="11" fontWeight="500" fontFamily="system-ui">G Pay</text>
              </svg>
            </div>
            {/* Maestro */}
            <div className="h-10 px-3 flex items-center justify-center bg-white rounded-md border border-gray-200">
              <svg className="h-6 w-10" viewBox="0 0 40 24">
                <circle cx="12" cy="12" r="10" fill="#0099DF"/>
                <circle cx="28" cy="12" r="10" fill="#ED0006" fillOpacity="0.85"/>
              </svg>
            </div>
            {/* Mastercard */}
            <div className="h-10 px-3 flex items-center justify-center bg-white rounded-md border border-gray-200">
              <svg className="h-6 w-10" viewBox="0 0 40 24">
                <circle cx="12" cy="12" r="10" fill="#EB001B"/>
                <circle cx="28" cy="12" r="10" fill="#FF5F00" fillOpacity="0.8"/>
              </svg>
            </div>
            {/* PayPal */}
            <div className="h-10 px-4 flex items-center justify-center bg-[#0070BA] rounded-md">
              <span className="font-bold text-white text-sm">PayPal</span>
            </div>
            {/* Shop Pay */}
            <div className="h-10 px-4 flex items-center justify-center bg-[#5A31F4] rounded-md">
              <span className="font-bold text-white text-sm">Shop Pay</span>
            </div>
            {/* Visa */}
            <div className="h-10 px-4 flex items-center justify-center bg-[#1A1F71] rounded-md">
              <span className="font-bold text-white text-lg" style={{fontFamily: 'serif'}}>VISA</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm text-center md:text-left">
              © {new Date().getFullYear()} C'Line Hair. Tous droits réservés.
            </p>
            <p className="text-gray-500 text-xs text-center md:text-right">
              Développé avec passion pour sublimer votre beauté
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
