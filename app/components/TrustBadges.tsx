import React from 'react';
import {Shield} from 'lucide-react';
import {useConfig} from '~/utils/themeContext';

interface Badge {
  emoji: string;
  title: string;
  description: string;
  category: 'security' | 'quality' | 'delivery' | 'reputation';
}

export default function TrustBadges() {
  const config = useConfig();

  const badges: Badge[] = [
    // Sécurité & paiement
    {
      emoji: '🔒',
      title: 'Paiement 100% Sécurisé',
      description: 'SSL certifié · Données protégées',
      category: 'security',
    },
    {
      emoji: '💳',
      title: 'Tous moyens de paiement',
      description: 'Visa · Mastercard · PayPal · Apple Pay',
      category: 'security',
    },

    // Livraison & service
    {
      emoji: '🚚',
      title: 'Livraison Rapide',
      description: '48h France · Suivi en temps réel',
      category: 'delivery',
    },
    {
      emoji: '🔄',
      title: 'Retours Faciles',
      description: '14 jours satisfait ou remboursé',
      category: 'delivery',
    },

    // Réputation & satisfaction
    {
      emoji: '⭐',
      title: '+500 000 Clientes',
      description: 'Satisfaites depuis 2005',
      category: 'reputation',
    },
    {
      emoji: '🇫🇷',
      title: 'Marque Française',
      description: 'Service client réactif & bienveillant',
      category: 'reputation',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Titre de section optionnel */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Shield className="w-4 h-4" />
            Vos Garanties C'Line Hair
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Achetez en toute confiance
          </h2>
        </div>

        {/* Grille de badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
            >
              {/* Emoji avec fond */}
              <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-pink-100 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl" role="img" aria-label={badge.title}>
                  {badge.emoji}
                </span>
              </div>

              {/* Contenu */}
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 leading-tight">
                {badge.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {badge.description}
              </p>

              {/* Accent décoratif */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Message de réassurance supplémentaire */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2 flex-wrap">
            <Shield className="w-4 h-4 text-primary" />
            <span>
              Votre satisfaction est notre priorité depuis plus de 20 ans
            </span>
          </p>
        </div>
      </div>

      {/* Styles personnalisés */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media (max-width: 640px) {
            .trust-badges-grid {
              grid-template-columns: 1fr;
            }
          }
        `,
        }}
      />
    </section>
  );
}
