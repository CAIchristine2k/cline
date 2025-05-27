import { useConfig } from '~/utils/themeContext';
import { Link } from 'react-router';

export function FooterLogo() {
  const config = useConfig();
  
  return (
    <div className="flex items-center justify-center py-2">
      <div className="flex items-center">
        <div className="relative">
          <div className="absolute -inset-1"></div>
          <img 
            src={config.brandLogo || "/images/footer-logo.png"}
            alt={`${config.brandName} Logo`}
            className="h-32 w-auto relative filter drop-shadow-glow"
          />
        </div>
      </div>
    </div>
  );
}

// The drop-shadow-glow class is already defined in app.css using CSS variables