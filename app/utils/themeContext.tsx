import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeConfig, setTheme as setGlobalTheme, getTheme, colorSchemes, BrandStyle } from '~/lib/themeConfig';
import { getConfig, type LandingPageConfig } from '~/lib/config';

interface ThemeContextType {
  theme: ThemeConfig;
  config: LandingPageConfig;
  setTheme: (newTheme: Partial<ThemeConfig>) => void;
  updateConfig: (newConfig: Partial<LandingPageConfig>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialConfig?: Partial<LandingPageConfig>;
}

export function ThemeProvider({ children, initialConfig = {} }: ThemeProviderProps) {
  const baseConfig = getConfig();
  const [config, setConfig] = useState<LandingPageConfig>(() => ({
    ...baseConfig,
    ...initialConfig
  }));
  const [theme, setThemeState] = useState<ThemeConfig>(() => getTheme());

  // Initialize theme based on config
  useEffect(() => {
    const configuredTheme: Partial<ThemeConfig> = {
      brandName: config.brandName,
      brandStyle: config.brandStyle,
      brandLogo: config.brandLogo,
      influencerName: config.influencerName,
      influencerTitle: config.influencerTitle,
      influencerImage: config.influencerImage,
      socialLinks: {
        instagram: config.socialLinks.instagram,
        twitter: config.socialLinks.twitter,
        youtube: config.socialLinks.youtube,
        tiktok: config.socialLinks.tiktok,
      }
    };

    // Apply the brand style colors
    if (config.brandStyle !== 'custom' && config.brandStyle in colorSchemes) {
      configuredTheme.colors = colorSchemes[config.brandStyle as Exclude<BrandStyle, 'custom'>];
    }

    setGlobalTheme(configuredTheme);
    setThemeState(getTheme());
  }, [config]);

  const updateTheme = (newTheme: Partial<ThemeConfig>) => {
    setGlobalTheme(newTheme);
    setThemeState(getTheme());
  };

  const updateConfig = (newConfig: Partial<LandingPageConfig>) => {
    const baseConfig = getConfig();
    const updatedConfig = {
      ...baseConfig,
      ...config,
      ...newConfig
    };
    setConfig(updatedConfig);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        config, 
        setTheme: updateTheme, 
        updateConfig 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function useConfig() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ThemeProvider');
  }
  return context.config;
}