import {useState, useEffect} from 'react';
import {useConfig} from '~/utils/themeContext';

interface WishlistButtonProps {
  productId: string;
  productTitle?: string;
  productImage?: string;
  productPrice?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

interface WishlistItem {
  id: string;
  title: string;
  image?: string;
  price?: string;
  addedAt: string;
}

export function WishlistButton({
  productId,
  productTitle = '',
  productImage,
  productPrice,
  className = '',
  size = 'md',
  showLabel = false,
}: WishlistButtonProps) {
  const config = useConfig();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Size classes
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const buttonSizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  // Check if item is in wishlist on mount
  useEffect(() => {
    const wishlist = getWishlist();
    setIsInWishlist(wishlist.some((item) => item.id === productId));
  }, [productId]);

  // Get wishlist from localStorage
  const getWishlist = (): WishlistItem[] => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('wishlist');
      return stored ? (JSON.parse(stored) as WishlistItem[]) : [];
    } catch {
      return [];
    }
  };

  // Save wishlist to localStorage
  const saveWishlist = (wishlist: WishlistItem[]) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      // Dispatch custom event for other components to listen
      window.dispatchEvent(
        new CustomEvent('wishlistUpdated', {
          detail: {wishlist, count: wishlist.length},
        }),
      );
    } catch (error) {
      console.error('Failed to save wishlist:', error);
    }
  };

  // Add to wishlist
  const addToWishlist = () => {
    const wishlist = getWishlist();
    const newItem: WishlistItem = {
      id: productId,
      title: productTitle,
      image: productImage,
      price: productPrice,
      addedAt: new Date().toISOString(),
    };

    const updatedWishlist = [...wishlist, newItem];
    saveWishlist(updatedWishlist);
    setIsInWishlist(true);

    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Remove from wishlist
  const removeFromWishlist = () => {
    const wishlist = getWishlist();
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    saveWishlist(updatedWishlist);
    setIsInWishlist(false);
  };

  // Toggle wishlist status
  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist();
    } else {
      addToWishlist();
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`
        group relative flex items-center justify-center
        bg-black/40 backdrop-blur-sm border border-primary/30 rounded-sm
        hover:bg-primary/10 hover:border-primary/50
        transition-all duration-200
        ${buttonSizeClasses[size]}
        ${className}
      `}
      aria-label={
        isInWishlist
          ? `Remove ${productTitle} from wishlist`
          : `Add ${productTitle} to wishlist`
      }
      title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {/* Heart Icon */}
      <div className={`relative ${sizeClasses[size]}`}>
        <svg
          className={`
            absolute inset-0 transition-all duration-300
            ${isInWishlist ? 'text-red-500 fill-current scale-110' : 'text-gray-400 hover:text-red-400'}
            ${isAnimating ? 'animate-ping' : ''}
          `}
          fill={isInWishlist ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={isInWishlist ? 0 : 2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>

        {/* Animated particles on add */}
        {isAnimating && (
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-red-500 rounded-full animate-ping"
                style={{
                  top: '50%',
                  left: '50%',
                  animationDelay: `${i * 100}ms`,
                  animationDuration: '600ms',
                  transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-${8 + i * 2}px)`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Label */}
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {isInWishlist ? 'Saved' : 'Save'}
        </span>
      )}

      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs py-1 px-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        {isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      </div>
    </button>
  );
}

// Wishlist count badge for header
export function WishlistCount({className = ''}: {className?: string}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Update count on mount
    const updateCount = () => {
      if (typeof window !== 'undefined') {
        const wishlist = JSON.parse(
          localStorage.getItem('wishlist') || '[]',
        ) as WishlistItem[];
        setCount(wishlist.length);
      }
    };

    updateCount();

    // Listen for wishlist updates
    const handleWishlistUpdate = (event: CustomEvent) => {
      setCount(event.detail.count);
    };

    window.addEventListener(
      'wishlistUpdated',
      handleWishlistUpdate as EventListener,
    );
    return () => {
      window.removeEventListener(
        'wishlistUpdated',
        handleWishlistUpdate as EventListener,
      );
    };
  }, []);

  if (count === 0) return null;

  return (
    <div className={`relative ${className}`}>
      <span className="absolute -top-2 -right-2 bg-primary text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px]">
        {count > 99 ? '99+' : count}
      </span>
    </div>
  );
}

// Hook for managing wishlist
export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wishlist');
      setWishlist(stored ? (JSON.parse(stored) as WishlistItem[]) : []);
    }

    const handleWishlistUpdate = (event: CustomEvent) => {
      setWishlist(event.detail.wishlist as WishlistItem[]);
    };

    window.addEventListener(
      'wishlistUpdated',
      handleWishlistUpdate as EventListener,
    );
    return () => {
      window.removeEventListener(
        'wishlistUpdated',
        handleWishlistUpdate as EventListener,
      );
    };
  }, []);

  const addToWishlist = (item: Omit<WishlistItem, 'addedAt'>) => {
    const newItem: WishlistItem = {
      ...item,
      addedAt: new Date().toISOString(),
    };
    const updatedWishlist = [...wishlist, newItem];
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(
      new CustomEvent('wishlistUpdated', {
        detail: {wishlist: updatedWishlist, count: updatedWishlist.length},
      }),
    );
  };

  const removeFromWishlist = (productId: string) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(
      new CustomEvent('wishlistUpdated', {
        detail: {wishlist: updatedWishlist, count: updatedWishlist.length},
      }),
    );
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('wishlist');
    window.dispatchEvent(
      new CustomEvent('wishlistUpdated', {
        detail: {wishlist: [], count: 0},
      }),
    );
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    count: wishlist.length,
  };
}
