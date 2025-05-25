import {useContext} from 'react';
import {CartContext} from '../providers/CartProvider';

export function useCart() {
  const cart = useContext(CartContext);
  
  if (cart === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return cart;
} 