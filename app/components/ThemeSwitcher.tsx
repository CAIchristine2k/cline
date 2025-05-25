import React, {useState} from 'react';
import {Palette, Check} from 'lucide-react';
import {useTheme} from '~/utils/themeContext';
import {BrandStyle, colorSchemes} from '~/utils/themeConfig';
import {motion, AnimatePresence} from 'framer-motion';
import {cn} from '~/utils/cn';

export function ThemeSwitcher() {
  const {theme, setTheme} = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleStyleChange = (style: BrandStyle) => {
    setTheme({
      brandStyle: style,
      colors: style !== 'custom' ? colorSchemes[style as Exclude<BrandStyle, 'custom'>] : theme.colors,
    });
    setIsOpen(false);
  };

  const themeOptions: Array<{style: BrandStyle; label: string; description: string}> = [
    {style: 'luxury', label: 'Luxury', description: 'Gold & Black - Premium feel'},
    {style: 'sporty', label: 'Sporty', description: 'Red & Blue - High energy'},
    {style: 'casual', label: 'Casual', description: 'Soft colors - Relaxed vibe'},
    {style: 'technical', label: 'Technical', description: 'Cyan & Pink - Modern tech'},
    {style: 'minimalist', label: 'Minimalist', description: 'Clean & Simple'},
    {style: 'vibrant', label: 'Vibrant', description: 'Colorful & Bold'},
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{opacity: 0, y: 20, scale: 0.9}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 20, scale: 0.9}}
            transition={{duration: 0.2}}
            className="absolute bottom-16 right-0 bg-black/90 backdrop-blur-md border border-gray-700 rounded-lg p-4 min-w-72 shadow-2xl"
          >
            <h3 className="text-lg font-semibold text-gold-500 mb-4">Choose Theme</h3>
            <div className="space-y-2">
              {themeOptions.map((option) => (
                <motion.button
                  key={option.style}
                  onClick={() => handleStyleChange(option.style)}
                  className={cn(
                    'w-full text-left p-3 rounded-lg border transition-all duration-200 hover:scale-105',
                    theme.brandStyle === option.style
                      ? 'border-gold-500 bg-gold-500/10'
                      : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800/50'
                  )}
                  whileHover={{y: -2}}
                  whileTap={{scale: 0.98}}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">{option.label}</div>
                      <div className="text-sm text-gray-400">{option.description}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* Color preview */}
                      {option.style !== 'custom' && (
                        <div className="flex space-x-1">
                          <div
                            className="w-3 h-3 rounded-full border border-gray-600"
                            style={{backgroundColor: colorSchemes[option.style as Exclude<BrandStyle, 'custom'>].primary}}
                          />
                          <div
                            className="w-3 h-3 rounded-full border border-gray-600"
                            style={{backgroundColor: colorSchemes[option.style as Exclude<BrandStyle, 'custom'>].secondary}}
                          />
                        </div>
                      )}
                      {theme.brandStyle === option.style && (
                        <Check className="h-4 w-4 text-gold-500" />
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                Changes apply instantly across the entire site
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'bg-black/80 backdrop-blur-md border text-white p-3 rounded-full shadow-lg transition-all duration-200',
          isOpen ? 'border-gold-500 bg-gold-500/10' : 'border-gray-700 hover:border-gray-600'
        )}
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}}
        animate={isOpen ? {rotate: 180} : {rotate: 0}}
        transition={{duration: 0.2}}
      >
        <Palette className="h-5 w-5" />
      </motion.button>
    </div>
  );
}

// Admin-style configuration panel (for development/customization)
export function ThemeConfigPanel() {
  const {theme, setTheme, config, updateConfig} = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  if (process.env.NODE_ENV === 'production') {
    return null; // Hide in production
  }

  return (
    <div className="fixed top-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{opacity: 0, y: -20, scale: 0.9}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: -20, scale: 0.9}}
            transition={{duration: 0.2}}
            className="absolute top-16 right-0 bg-black/95 backdrop-blur-md border border-gray-700 rounded-lg p-6 min-w-96 shadow-2xl max-h-96 overflow-y-auto"
          >
            <h3 className="text-lg font-semibold text-gold-500 mb-4">Theme Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={config.brandName}
                  onChange={(e) => updateConfig({brandName: e.target.value})}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Influencer Name
                </label>
                <input
                  type="text"
                  value={config.influencerName}
                  onChange={(e) => updateConfig({influencerName: e.target.value})}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hero Title
                </label>
                <input
                  type="text"
                  value={config.heroTitle}
                  onChange={(e) => updateConfig({heroTitle: e.target.value})}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  CTA Text
                </label>
                <input
                  type="text"
                  value={config.ctaText}
                  onChange={(e) => updateConfig({ctaText: e.target.value})}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                Development mode only - Changes save temporarily
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600/80 backdrop-blur-md border border-purple-500 text-white p-2 rounded-lg shadow-lg text-xs font-medium"
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
      >
        Config
      </motion.button>
    </div>
  );
} 