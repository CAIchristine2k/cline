import React, {useState} from 'react';
import {ChevronRight} from 'lucide-react';
import {defaultConfig, type LandingPageConfig} from '~/utils/config';
import {useConfig} from '~/utils/themeContext';

interface CareerHighlightsProps {
  config?: LandingPageConfig;
}

export default function CareerHighlights({config}: CareerHighlightsProps) {
  const defaultConfigFromContext = useConfig();
  const effectiveConfig = config || defaultConfigFromContext;
  const [activeHighlight, setActiveHighlight] = useState(0);

  // Skip rendering if career highlights section is disabled in config
  if (
    !effectiveConfig.showCareerHighlights ||
    !effectiveConfig.careerHighlights ||
    effectiveConfig.careerHighlights.length === 0
  ) {
    return null;
  }

  return (
    <section id="career" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            CHAMPIONSHIP <span className="text-primary">LEGACY</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            A career defined by excellence, determination, and championship
            victories. Explore the key moments that established{' '}
            {effectiveConfig.influencerName} as a boxing legend.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline Navigation */}
          <div className="order-2 lg:order-1 lg:border-r border-gray-800 pr-8">
            <div className="space-y-1">
              {effectiveConfig.careerHighlights.map((highlight, index) => (
                <button
                  key={index}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center ${
                    activeHighlight === index
                      ? 'bg-gray-900 border-l-4 border-primary'
                      : 'hover:bg-gray-900/50'
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
                    {highlight.year}
                  </div>
                  <div className="ml-2">
                    <h3
                      className={`font-semibold ${
                        activeHighlight === index
                          ? 'text-white'
                          : 'text-gray-400'
                      }`}
                    >
                      {highlight.title}
                    </h3>
                  </div>
                  <ChevronRight
                    className={`ml-auto h-5 w-5 ${
                      activeHighlight === index
                        ? 'text-primary'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Feature Image */}
          <div className="order-1 lg:order-2 col-span-2">
            <div className="relative h-80 lg:h-full overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-black/60 z-10"></div>
              <img
                src={
                  effectiveConfig.careerHighlights[activeHighlight]?.image ||
                  effectiveConfig.influencerImage
                }
                alt={`${effectiveConfig.influencerName} boxing career - ${effectiveConfig.careerHighlights[activeHighlight]?.title}`}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out"
              />

              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="bg-black/70 p-6 md:p-8 rounded-lg max-w-lg backdrop-blur-sm border border-gray-800/50 hover:border-primary/20 transition-all duration-300">
                  <div className="text-primary font-semibold mb-2">
                    {effectiveConfig.careerHighlights[activeHighlight]?.year}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
                    {effectiveConfig.careerHighlights[activeHighlight]?.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {
                      effectiveConfig.careerHighlights[activeHighlight]
                        ?.description
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
