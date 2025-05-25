import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeConfig, setTheme as setGlobalTheme, getTheme, colorSchemes, BrandStyle } from './themeConfig';
import { defaultConfig, initConfig, type LandingPageConfig } from './config';

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
  // Initialize config with default values and any custom overrides
  const [config, setConfig] = useState<LandingPageConfig>(() => 
    initConfig(initialConfig)
  );
  
  // Get current theme state
  const [theme, setThemeState] = useState<ThemeConfig>(() => getTheme());

  // Apply theme whenever config changes
  useEffect(() => {
    const configuredTheme: Partial<ThemeConfig> = {
      brandName: config.brandName,
      brandStyle: config.brandStyle,
      brandLogo: config.brandLogo,
      influencerName: config.influencerName,
      influencerTitle: config.influencerTitle,
      influencerImage: config.influencerImage,
      socialLinks: {
        instagram: config.instagramHandle
          ? `https://instagram.com/${config.instagramHandle}`
          : undefined,
        twitter: config.twitterHandle
          ? `https://twitter.com/${config.twitterHandle}`
          : undefined,
        youtube: config.youtubeChannel
          ? `https://youtube.com/${config.youtubeChannel}`
          : undefined,
        tiktok: config.tiktokHandle
          ? `https://tiktok.com/@${config.tiktokHandle}`
          : undefined,
      }
    };

    // Apply the theme
    setGlobalTheme(configuredTheme);
    setThemeState(getTheme());
  }, [config]);

  // Function to update theme
  const updateTheme = (newTheme: Partial<ThemeConfig>) => {
    setGlobalTheme(newTheme);
    setThemeState(getTheme());
  };

  // Function to update config
  const updateConfig = (newConfig: Partial<LandingPageConfig>) => {
    setConfig(current => initConfig({...current, ...newConfig}));
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

// Hook to access theme and config
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Hook to access just the config
export function useConfig() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ThemeProvider');
  }
  return context.config;
}

// Hook to update config
export function useUpdateConfig() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useUpdateConfig must be used within a ThemeProvider');
  }
  return context.updateConfig;
}