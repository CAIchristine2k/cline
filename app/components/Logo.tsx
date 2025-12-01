import {useConfig} from '~/utils/themeContext';
import {Link} from 'react-router';

interface LogoProps {
  isScrolled?: boolean;
}

export function Logo({isScrolled = false}: LogoProps) {
  const config = useConfig();

  return (
    <div className="flex items-center transition-all duration-500">
      <Link to="/" prefetch="intent" className="flex items-center">
        <img
          src={config.brandLogo}
          alt={`${config.brandName} Logo`}
          className={`transition-all duration-500 ease-in-out ${
            isScrolled ? 'h-14 w-auto' : 'h-20 w-auto'
          }`}
        />
      </Link>
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
