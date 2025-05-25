import { useConfig } from '~/utils/themeContext';
import { cssVars } from '~/lib/themeConfig';

interface LogoProps {
  isScrolled?: boolean;
}

export function Logo({ isScrolled = false }: LogoProps) {
  const config = useConfig();
  
  return (
    <div className="flex items-center py-6 transition-all duration-500">
      <a href="#home" className="flex items-center">
        <img 
          src={config.brandLogo} 
          alt={`${config.brandName} Logo`} 
          className={`h-14 w-auto transition-all duration-500 ease-in-out filter drop-shadow-glow ${
            isScrolled ? 'h-10 logo-scrolled' : ''
          }`}
        />
        <span 
          className={`ml-3 text-xl font-bold tracking-wider transition-all duration-500 ${
            !isScrolled ? 'text-white' : 'text-primary'
          }`}
          style={{ 
            color: !isScrolled ? cssVars.text : cssVars.primary
          }}
        >
          {config.brandName}
        </span>
      </a>
    </div>
  );
}

// Add styles to your global CSS or component styles
const styles = `
.logo-scrolled {
  transform-origin: center;
  filter: drop-shadow(0 0 8px rgba(var(--color-primary-rgb), 0.4));
}

.drop-shadow-glow {
  filter: drop-shadow(0 0 5px rgba(var(--color-primary-rgb), 0.2));
}
`;