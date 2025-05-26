import {createContext, useContext, useEffect, useState, useCallback} from 'react';
import {useLoaderData} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

// Define the CartContext with proper types and methods
interface CartContextType {
  cart: CartApiQueryFragment | null;
  totalQuantity: number;
  totalAmount: string;
  currencyCode: string;
  isEmpty: boolean;
  addItem: (lines: {merchandiseId: string; quantity: number}[]) => void;
  updateItem: (lines: {id: string; quantity: number}[]) => void;
  removeItem: (lineIds: string[]) => void;
  applyDiscount: (discountCode: string) => void;
  removeDiscount: (discountId: string) => void;
  openCart: () => void;
  closeCart: () => void;
  refreshCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | null>(null);

// A function to fetch the current cart outside of React components
async function fetchCart() {
  try {
    const response = await fetch('/en/cart?cartOnly=true');
    if (!response.ok) {
      throw new Error(`Failed to fetch cart: ${response.status}`);
    }
    const data = await response.json() as {cart: CartApiQueryFragment | null};
    return data.cart || null;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
}

export function CartProvider({children}: {children: React.ReactNode}) {
  // Use null as initial state to prevent hydration mismatch
  const [cart, setCart] = useState<CartApiQueryFragment | null>(null);
  const {open, close, type} = useAside();
  
  // Get cart data from loader data
  const loaderData = useLoaderData<{cart?: CartApiQueryFragment | null}>();
  
  // Use an effect to set the cart after initial render to prevent hydration mismatch
  useEffect(() => {
    const initialCart = loaderData?.cart || null;
    console.log('Setting initial cart:', initialCart);
    setCart(initialCart);
  }, [loaderData?.cart]);

  // Function to refresh the cart data manually
  const refreshCart = useCallback(async () => {
    console.log('Manually refreshing cart data');
    try {
      // Small delay to ensure the cart action has completed
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const freshCart = await fetchCart();
      console.log('Fresh cart data fetched:', freshCart);
      
      if (freshCart) {
        setCart(freshCart);
      }
    } catch (error) {
      console.error('Failed to refresh cart:', error);
    }
  }, []);

  // Listen for cart changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'shopify-hydrogen-cart') {
        try {
          const newCart = JSON.parse(event.newValue || '');
          if (newCart) {
            console.log('Cart updated from storage event:', newCart);
            setCart(newCart as CartApiQueryFragment);
          }
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

  // Calculate total quantity of items in cart
  const totalQuantity = cart?.totalQuantity || 0;
  const isEmpty = totalQuantity === 0;
  
  // Calculate total amount
  const totalAmount = cart?.cost?.totalAmount?.amount || '0';
  const currencyCode = cart?.cost?.totalAmount?.currencyCode || 'USD';

  // Cart management functions
  const openCart = () => {
    // Ensure the cart is opened using the Aside component
    open('cart');
  };
  
  const closeCart = () => {
    // Close the cart using the Aside component
    close();
  };

  // These functions will be used in forms throughout the app
  // They don't directly modify the cart, but provide the functions for forms to use
  const addItem = (lines: {merchandiseId: string; quantity: number}[]) => {
    // This is handled by CartForm component, but we need the function signature in the context
    // The actual implementation happens in app/routes/($locale).cart.tsx action function
    
    // Automatically open the cart when adding an item
    openCart();
    
    // Refresh the cart after a short delay to ensure the item was added
    refreshCart();
  };

  const updateItem = (lines: {id: string; quantity: number}[]) => {
    // This is handled by CartForm component, but we need the function signature in the context
    // The actual implementation happens in app/routes/($locale).cart.tsx action function
    
    // Refresh the cart after a short delay
    refreshCart();
  };

  const removeItem = (lineIds: string[]) => {
    // This is handled by CartForm component, but we need the function signature in the context
    // The actual implementation happens in app/routes/($locale).cart.tsx action function
    
    // Refresh the cart after a short delay
    refreshCart();
  };

  const applyDiscount = (discountCode: string) => {
    // This is handled by CartForm component, but we need the function signature in the context
    // The actual implementation happens in app/routes/($locale).cart.tsx action function
    
    // Refresh the cart after a short delay
    refreshCart();
  };

  const removeDiscount = (discountId: string) => {
    // This is handled by CartForm component, but we need the function signature in the context
    // The actual implementation happens in app/routes/($locale).cart.tsx action function
    
    // Refresh the cart after a short delay
    refreshCart();
  };

  const contextValue: CartContextType = {
    cart,
    totalQuantity,
    totalAmount,
    currencyCode,
    isEmpty,
    addItem,
    updateItem,
    removeItem,
    applyDiscount,
    removeDiscount,
    openCart,
    closeCart,
    refreshCart
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 