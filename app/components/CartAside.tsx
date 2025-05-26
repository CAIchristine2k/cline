import React from 'react';
import { Aside } from './Aside';
import { useAside } from './Aside';

/**
 * A specialized version of Aside that is guaranteed to appear on the right side
 * This component forces right-side positioning for the cart
 */
export function CartAside({ children, heading = "CART" }: { children: React.ReactNode, heading?: string }) {
  const { type, close } = useAside();
  const expanded = type === 'cart';
  
  // Track header height to position the cart below it
  const [headerHeight, setHeaderHeight] = React.useState(0);
  
  // Calculate header height
  React.useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        const newHeight = header.offsetHeight;
        if (newHeight !== headerHeight) {
          setHeaderHeight(newHeight);
          console.log(`CartAside: Header height updated: ${newHeight}px`);
        }
      }
    };

    updateHeaderHeight();
    
    // Use throttle for scroll event
    let ticking = false;
    const throttledUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateHeaderHeight();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('resize', updateHeaderHeight);
    window.addEventListener('scroll', throttledUpdate);
    
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      window.removeEventListener('scroll', throttledUpdate);
    };
  }, [headerHeight]);
  
  // The key trick here is to create a completely separate component
  // with absolute right-side positioning
  return (
    <div
      aria-modal
      aria-hidden={!expanded}
      className={`fixed inset-0 z-50 transition-all duration-500 ease-out ${
        expanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
    >
      {/* Background overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/70 backdrop-blur-md transition-all duration-500 ${
          expanded ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={close}
      ></div>
      
      {/* CART PANEL - FORCED RIGHT SIDE POSITIONING */}
      <div 
        className={`fixed right-0 bottom-0 w-full max-w-md 
          bg-background/95 backdrop-blur-xl shadow-2xl 
          border-l border-r border-primary/20 
          transition-all duration-500 ease-out
          flex flex-col ${expanded ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ 
          zIndex: 100,
          bottom: `1%`,
          top: `1hv`,
        //   height: `100%`,
          right: '0px',
          left: 'auto'
        }}
      >
        <header className="flex items-center justify-between p-6 border-b border-primary/20 bg-gradient-to-r from-background/50 to-background backdrop-blur-sm">
          <h3 className="text-xl font-bold text-primary tracking-wide">{heading}</h3>
          <button 
            className="w-10 h-10 flex items-center justify-center text-primary hover:text-primary-600 rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110 hover:rotate-90" 
            onClick={close}
            aria-label="Close"
          >
            <svg 
              className="w-5 h-5 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        
        <main className="flex-1 overflow-hidden bg-gradient-to-b from-background/80 to-background text-text min-h-0 relative">
          <div className="relative h-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 