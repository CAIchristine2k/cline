import React, {useState} from 'react';
import {getImageWithFallback, PLACEHOLDER_IMAGE} from '~/utils/assetsConfig';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string | null;
  showPlaceholder?: boolean;
}

/**
 * SafeImage component with automatic fallback handling
 * Displays a placeholder or hides gracefully when images fail to load
 */
export function SafeImage({
  src,
  alt,
  fallback = null,
  showPlaceholder = false,
  className = '',
  ...props
}: SafeImageProps) {
  const [imageError, setImageError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!imageError && fallback) {
      // Try fallback image
      setImageError(true);
      e.currentTarget.src = fallback;
    } else if (!fallbackError) {
      // Fallback also failed, show placeholder or hide
      setFallbackError(true);
      if (showPlaceholder) {
        e.currentTarget.src = PLACEHOLDER_IMAGE;
      } else {
        e.currentTarget.style.display = 'none';
      }
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
}

/**
 * Example usage:
 *
 * <SafeImage
 *   src="/images/logo.png"
 *   alt="Logo"
 *   fallback="/images/logo-backup.png"
 *   showPlaceholder={true}
 *   className="h-10 w-auto"
 * />
 */
