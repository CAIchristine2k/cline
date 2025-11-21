import React, {useEffect, useRef} from 'react';
import {ShoppingBag, Leaf} from 'lucide-react';
import {Link} from 'react-router';
import {useConfig} from '~/utils/themeContext';

export function Hero() {
  // Get config from context instead of props
  const config = useConfig();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;

      // Try to play the video - handle autoplay restrictions
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Auto-play was prevented by browser:', error);
          // We'll show the poster image as fallback
        });
      }
    }
  }, []);

  return (
    <section
      id="home"
      className="relative w-full pt-[120px]"
    >
      {/* Full width image - visible en entier */}
      <div className="w-full">
        <img
          src="/images/web.png"
          alt="cline"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Add the CSS styles directly to match Vue template */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .hero-title-glow {
            text-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.4);
          }
          
          .hero-stat-glow {
            text-shadow: 0 0 8px rgba(var(--color-primary-rgb), 0.3);
          }
          
          .shadow-glow {
            box-shadow: 0 4px 20px rgba(var(--color-primary-rgb), 0.25);
          }
          
          video {
            filter: brightness(0.9) contrast(1.1);
          }
        `,
        }}
      />
    </section>
  );
}
