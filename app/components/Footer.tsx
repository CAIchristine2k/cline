import React from 'react';
import { Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone, Music } from 'lucide-react';
import { FooterLogo } from './FooterLogo';
import { useConfig } from '~/utils/themeContext';
import { accentStyles, inlineStyles, sectionStyles } from '~/utils/styleUtils';

export function Footer() {
  const config = useConfig();
  
  // Build social links from config
  const socialLinks = Object.entries(config.socialLinks)
    .filter(([_, url]) => url) // Only include links that have URLs
    .map(([platform, url]) => ({
      icon: getSocialIcon(platform),
      label: platform.charAt(0).toUpperCase() + platform.slice(1),
      url
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

  const quickLinks = [
    'Shop All',
    'Boxing Equipment',
    'Apparel',
    'Limited Editions',
    `About ${config.influencerName.split(' ')[0]}`,
    'Career Highlights',
    'Training Tips'
  ];

  const supportLinks = [
    'Contact Us',
    'FAQs',
    'Shipping & Returns',
    'Size Guide',
    'Privacy Policy',
    'Terms of Service'
  ];

  const contactInfo = [
    { icon: MapPin, text: config.contactInfo?.address || `${config.brandName} HQ, 123 Championship Blvd, Los Angeles, CA 90001` },
    { icon: Phone, text: config.contactInfo?.phone || '+1 (800) CHAMPION' },
    { icon: Mail, text: config.contactInfo?.email || `contact@${config.brandName.toLowerCase().replace(/\s+/g, '')}.store` }
  ];

  const policies = ['Privacy Policy', 'Terms of Service', 'Sitemap'];

  return (
    <footer className="bg-gray-950 pt-20 pb-10">
      <div className={sectionStyles.container}>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <FooterLogo />
            <p className="text-gray-400 mt-6 mb-8 leading-relaxed text-sm text-center">
              The official brand of {config.influencerBio || `boxing legend ${config.influencerName}`}. 
              Exclusive merchandise, training resources, and premium content for champions.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex space-x-5 justify-center">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-sm bg-gray-900 hover:bg-primary flex items-center justify-center text-white hover:text-black transition-all duration-300 transform hover:scale-105"
                      style={inlineStyles.hoverPrimary as React.CSSProperties}
                      aria-label={social.label}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-primary" style={inlineStyles.primaryBackground}></span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-400 hover:text-primary transition-all duration-300 text-sm flex items-center group"
                    style={inlineStyles.hoverPrimary as React.CSSProperties}
                  >
                    <span 
                      className="w-1 h-1 bg-primary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={inlineStyles.primaryBackground}
                    ></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Support
              <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-primary" style={inlineStyles.primaryBackground}></span>
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-400 hover:text-primary transition-all duration-300 text-sm flex items-center group"
                    style={inlineStyles.hoverPrimary as React.CSSProperties}
                  >
                    <span 
                      className="w-1 h-1 bg-primary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={inlineStyles.primaryBackground}
                    ></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Contact Info
              <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-primary" style={inlineStyles.primaryBackground}></span>
            </h4>
            <ul className="space-y-5">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <li key={index} className="flex items-start">
                    <div className="bg-gray-900 p-2 rounded-sm mr-3 flex-shrink-0">
                      <IconComponent className={`h-4 w-4 ${accentStyles.primaryText}`} style={inlineStyles.primaryText} />
                    </div>
                    <span className="text-gray-400 text-sm leading-relaxed">{info.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-6 md:mb-0">
              &copy; {new Date().getFullYear()} {config.brandName} Enterprises. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
              {policies.map((policy, index) => (
                <a
                  key={index}
                  href={`#${policy.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-gray-500 hover:text-primary text-sm transition-all duration-300"
                  style={inlineStyles.hoverPrimary as React.CSSProperties}
                >
                  {policy}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
