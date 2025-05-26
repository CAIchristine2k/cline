import { useConfig } from '~/utils/themeContext';

export function FooterLogo() {
  const config = useConfig();
  
  return (
    <div className="flex items-center justify-center py-2">
      <a href="#home" className="flex items-center">
        <div className="relative">
          <div className="absolute -inset-1"></div>
          <img 
            src={config.brandLogo || "/images/footer-logo.png"}
            alt={`${config.brandName} Logo`}
            className="h-32 w-auto relative filter drop-shadow-glow"
          />
        </div>
      </a>
    </div>
  );
}

// Add styles to your global CSS
const styles = `
.drop-shadow-glow {
  filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.3));
}
`;