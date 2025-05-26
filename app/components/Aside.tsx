import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import {useConfig} from '~/utils/themeContext';

type AsideType = 'search' | 'cart' | 'mobile' | 'closed';
type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
  isOpen: boolean;
};

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 */
export function Aside({
  children,
  heading,
  type,
  className = '',
}: {
  children?: React.ReactNode;
  type: AsideType;
  heading: React.ReactNode;
  className?: string;
}) {
  const {type: activeType, close} = useAside();
  const config = useConfig();
  const expanded = type === activeType;
  const asideRef = useRef<HTMLDivElement>(null);
  
  // For debugging
  useEffect(() => {
    if (expanded && type === 'cart') {
      console.log('Cart aside is now open');
    }
  }, [expanded, type]);

  // Handle clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
        close();
      }
    }

    if (expanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expanded, close]);

  // Handle escape key
  useEffect(() => {
    const abortController = new AbortController();

    if (expanded) {
      document.addEventListener(
        'keydown',
        function handler(event: KeyboardEvent) {
          if (event.key === 'Escape') {
            close();
          }
        },
        {signal: abortController.signal},
      );
      
      // Prevent body scrolling when aside is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      abortController.abort();
      document.body.style.overflow = '';
    };
  }, [close, expanded]);

  return (
    <div
      aria-modal
      aria-hidden={!expanded}
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        expanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close}></div>
      
      {/* Aside panel */}
      <aside 
        ref={asideRef}
        className={`absolute top-0 bottom-0 right-0 w-full max-w-md bg-background shadow-xl transform transition-transform duration-300 h-full flex flex-col ${
          expanded ? 'translate-x-0' : 'translate-x-full'
        } ${className}`}
        style={{zIndex: 100}}
      >
        <header className="flex items-center justify-between p-4 border-b border-primary/10 flex-shrink-0">
          <h3 className="text-lg font-bold text-primary">{heading}</h3>
          <button 
            className="w-8 h-8 flex items-center justify-center text-primary hover:text-primary-600 rounded-full hover:bg-primary/5 transition-colors" 
            onClick={close} 
            aria-label="Close"
          >
            &times;
          </button>
        </header>
        <main className="flex-1 overflow-hidden bg-background text-text min-h-0">
          {children}
        </main>
      </aside>
    </div>
  );
}

const AsideContext = createContext<AsideContextValue | null>(null);

Aside.Provider = function AsideProvider({children}: {children: ReactNode}) {
  const [type, setType] = useState<AsideType>('closed');
  const isOpen = type !== 'closed';
  
  // Enhanced debugging
  useEffect(() => {
    console.log('Aside type changed to:', type);
  }, [type]);

  return (
    <AsideContext.Provider
      value={{
        type,
        isOpen,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}
