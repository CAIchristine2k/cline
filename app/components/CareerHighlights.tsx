import React, {useState} from 'react';
import {ChevronRight} from 'lucide-react';
import {useConfig} from '~/utils/themeContext';

// C'Line Hair Timeline Data
const brandTimeline = [
  {
    year: '2005',
    title: 'Naissance de C\'Line Hair',
    subtitle: 'Atelier parisien, exigence haute couture',
    description: 'Dans un petit atelier, C\'Line Hair voit le jour avec une idée simple : créer des extensions et perruques d\'exception, aussi naturelles que durables, accessibles à toutes.',
    image: '/images/naissance.png',
  },
  {
    year: '2018',
    title: '50 000 clientes satisfaites',
    subtitle: '',
    description: 'Un cap symbolique franchi avec plus de 50 000 femmes qui ont choisi C\'Line Hair pour sublimer leur beauté naturelle. Une communauté fidèle et engagée.',
    image: '/images/50kclient.png',
  },
  {
    year: '2020',
    title: 'Lace HD & finitions invisibles',
    subtitle: '',
    description: 'Innovation technologique avec le lancement des laces HD : des finitions ultra-naturelles et invisibles qui révolutionnent l\'expérience du port de perruques et lace wigs.',
    image: '/images/lace.png',
  },
  {
    year: '2025',
    title: 'Première boutique & pose pro',
    subtitle: '',
    description: 'Ouverture de la première boutique physique et développement d\'un service de pose professionnel. C\'Line Hair s\'impose comme référence dans la qualité de service et d\'accompagnement personnalisé.',
    image: '/images/bgfete.png',
  },
];

export default function CareerHighlights() {
  const config = useConfig();
  const [activeHighlight, setActiveHighlight] = useState(0);

  // Skip rendering if career highlights section is disabled in config
  if (!config.showCareerHighlights) {
    return null;
  }

  return (
    <section id="brand-story" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            C'LINE HAIR <span className="text-primary">HERITAGE</span>
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Deux décennies de passion capillaire : qualité irréprochable, sourcing responsable et beauté accessible.
            Explorez les étapes qui ont forgé l'ADN C'Line Hair.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline (left) */}
          <div className="order-2 lg:order-1 lg:border-r border-gray-800 pr-8">
            <div className="space-y-1">
              {brandTimeline.map((milestone, index) => (
                <button
                  key={index}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center ${
                    activeHighlight === index
                      ? 'bg-primary/10 border-l-4 border-primary'
                      : 'hover:bg-primary/5'
                  }`}
                  onClick={() => setActiveHighlight(index)}
                >
                  <div
                    className={`w-16 text-2xl font-bold ${
                      activeHighlight === index
                        ? 'text-primary'
                        : 'text-gray-500'
                    }`}
                  >
                    {milestone.year}
                  </div>
                  <div className="ml-2">
                    <h3
                      className={`font-semibold ${
                        activeHighlight === index
                          ? 'text-black'
                          : 'text-gray-600'
                      }`}
                    >
                      {milestone.title}
                    </h3>
                    {milestone.subtitle && (
                      <p className="text-xs text-gray-600">{milestone.subtitle}</p>
                    )}
                  </div>
                  <ChevronRight
                    className={`ml-auto h-5 w-5 ${
                      activeHighlight === index
                        ? 'text-primary'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Panel (right) */}
          <div className="order-1 lg:order-2 col-span-2">
            <div className="relative h-80 lg:h-full overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-white/20 z-10"></div>
              {/* Remplace l'image par un visuel de produit/atelier */}
              <img
                src={brandTimeline[activeHighlight].image}
                alt={`C'Line Hair - ${brandTimeline[activeHighlight].title}`}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="bg-white/90 p-6 md:p-8 rounded-lg max-w-lg backdrop-blur-sm border border-primary/30 hover:border-primary/50 transition-all duration-300">
                  <div className="text-primary font-semibold mb-2">
                    {brandTimeline[activeHighlight].year}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-black">
                    {brandTimeline[activeHighlight].title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {brandTimeline[activeHighlight].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* /Panel */}
        </div>
      </div>
    </section>
  );
}
