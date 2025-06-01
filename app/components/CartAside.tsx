import React from 'react';
import {Aside} from './Aside';
import {useAside} from './Aside';

/**
 * A specialized version of Aside that is guaranteed to appear on the right side
 * This component forces right-side positioning for the cart
 */
export function CartAside({
  children,
  heading = 'CART',
}: {
  children: React.ReactNode;
  heading?: string;
}) {
  const {type, close} = useAside();
  const expanded = type === 'cart';

  return (
    <div
      aria-modal
      aria-hidden={!expanded}
      className={`fixed inset-0 z-50 transition-all duration-500 ease-out ${
        expanded
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
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

      {/* CART PANEL - FORCED RIGHT SIDE POSITIONING WITH PROPER HEADER CLEARANCE */}
      <div
        className={`fixed right-0 
          bg-background/95 backdrop-blur-xl shadow-2xl 
          transition-all duration-500 ease-out
          flex flex-col ${expanded ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          zIndex: 100,
          top: 'var(--header-height-desktop)',
          height: 'calc(100vh - var(--header-height-desktop))',
          width: 'var(--cart-width-desktop)',
          minWidth: 'var(--cart-min-width)',
          maxWidth: 'var(--cart-max-width-desktop)',
          right: '0px',
          left: 'auto',
        }}
      >
        <main className="flex-1 pt-4 overflow-hidden bg-gradient-to-b from-background/80 to-background text-text min-h-0 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5 pointer-events-none"></div>
          <div className="relative h-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
