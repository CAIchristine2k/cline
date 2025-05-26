import {createContext, useContext, useEffect, useCallback} from 'react';
import {useLoaderData, useFetcher} from 'react-router';
import {useOptimisticCart} from '@shopify/hydrogen';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

// Define the CartContext with proper types and methods
interface CartContextType {
  cart: CartApiQueryFragment | null;
  isOptimistic: boolean;
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
  refreshCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({children}: {children: React.ReactNode}) {
  // Use data from the loader to initialize the cart
  const loaderData = useLoaderData<{cart?: CartApiQueryFragment | null}>();
  
  // Create a fetcher to handle cart operations
  const cartFetcher = useFetcher<{cart: CartApiQueryFragment | null}>();
  
  // Access the aside context for managing the cart drawer
  const {open, close} = useAside();
  
  // Get the cart from the loader data - this is the actual cart from Shopify
  const originalCart = loaderData?.cart;
  
  // Debug the original cart data
  useEffect(() => {
    console.log('CartProvider: Original cart from loader:', originalCart);
  }, [originalCart]);
  
  // Function to refresh the cart data
  const refreshCart = useCallback(() => {
    console.log('Refreshing cart data...');
    cartFetcher.load('/cart?cartOnly=true');
  }, [cartFetcher]);

  // Calculate total quantity of items in cart from the original cart
  const totalQuantity = originalCart?.totalQuantity || 0;
  const isEmpty = totalQuantity === 0;
  
  // Calculate total amount from the original cart
  const totalAmount = originalCart?.cost?.totalAmount?.amount || '0';
  const currencyCode = originalCart?.cost?.totalAmount?.currencyCode || 'USD';

  // Cart management functions
  const openCart = useCallback(() => {
    open('cart');
  }, [open]);
  
  const closeCart = useCallback(() => {
    close();
  }, [close]);

  // These functions will be used in forms throughout the app
  const addItem = useCallback((lines: {merchandiseId: string; quantity: number}[]) => {
    console.log('Adding item to cart:', lines);
    
    // Open the cart drawer to show the result
    setTimeout(() => {
      openCart();
    }, 300);
  }, [openCart]);

  const updateItem = useCallback((lines: {id: string; quantity: number}[]) => {
    console.log('Updating cart item:', lines);
  }, []);

  const removeItem = useCallback((lineIds: string[]) => {
    console.log('Removing cart item:', lineIds);
  }, []);

  const applyDiscount = useCallback((discountCode: string) => {
    console.log('Applying discount:', discountCode);
  }, []);

  const removeDiscount = useCallback((discountId: string) => {
    console.log('Removing discount:', discountId);
  }, []);

  // Provide the original cart to the context - let components handle optimistic updates
  const contextValue: CartContextType = {
    cart: originalCart || null,
    isOptimistic: false, // This will be handled by useOptimisticCart in individual components
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