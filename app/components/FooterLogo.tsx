import {useConfig} from '~/utils/themeContext';
import {Link} from 'react-router';
import {BRAND_LOGOS, getImageWithFallback} from '~/utils/assetsConfig';

export function FooterLogo() {
  const config = useConfig();

  return (
    <div className="flex items-center justify-center py-2">
      <div className="flex items-center">
        <div className="relative">
          <div className="absolute -inset-1"></div>
          <img
            {...getImageWithFallback(config.brandLogo || BRAND_LOGOS.footer, BRAND_LOGOS.main)}
            alt={`${config.brandName} Logo`}
            className="h-32 w-auto relative filter drop-shadow-glow"
          />
        </div>
      </div>
    </div>
  );
}

// The drop-shadow-glow class is already defined in app.css using CSS variables
