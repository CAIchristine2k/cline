import {createContext, useEffect, useState} from 'react';
import {useLoaderData} from 'react-router';

// Define the CartContext
export const CartContext = createContext<any>(undefined);

export function CartProvider({children}: {children: React.ReactNode}) {
  const initialCart = useLoaderData<any>()?.cart;
  const [cart, setCart] = useState<any>(initialCart);

  // Update cart when it changes in loader data
  useEffect(() => {
    if (initialCart && JSON.stringify(initialCart) !== JSON.stringify(cart)) {
      setCart(initialCart);
    }
  }, [initialCart]);

  // Listen for cart changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'shopify-hydrogen-cart') {
        try {
          const newCart = JSON.parse(event.newValue || '');
          setCart(newCart);
        } catch (error) {
          console.error('Error parsing cart data from storage', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
} 