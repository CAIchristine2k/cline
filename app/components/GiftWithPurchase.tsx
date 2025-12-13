import {useEffect, useRef} from 'react';
import {useFetcher} from 'react-router';
import {determineGiftAction, GIFT_CONFIG} from '~/utils/giftWithPurchase';

interface GiftWithPurchaseProps {
  cart: any;
}

export function GiftWithPurchase({cart}: GiftWithPurchaseProps) {
  const fetcher = useFetcher();
  const actionInProgressRef = useRef(false);
  const lastActionRef = useRef<'ADD' | 'REMOVE' | 'NONE'>('NONE');

  useEffect(() => {
    // Ne rien faire si une action est déjà en cours
    if (actionInProgressRef.current || fetcher.state !== 'idle') {
      return;
    }

    // Ne rien faire s'il n'y a pas de panier ou de cartId
    if (!cart?.id) {
      console.log('🎁 [GiftWithPurchase] No cart or cartId');
      return;
    }

    console.log('🎁 [GiftWithPurchase] Cart structure:', {
      cartId: cart.id,
      totalQuantity: cart.totalQuantity,
      hasLines: !!cart.lines,
      hasNodes: !!cart.lines?.nodes,
      linesCount: cart.lines?.nodes?.length,
      cost: cart.cost,
    });

    // Déterminer l'action à effectuer
    const action = determineGiftAction(cart);

    // Ne rien faire si aucune action n'est nécessaire
    if (action === 'NONE') {
      lastActionRef.current = 'NONE';
      return;
    }

    // Éviter de déclencher la même action plusieurs fois de suite
    if (action === lastActionRef.current) {
      return;
    }

    console.log('🎁 [Gift Component] Triggering action:', action);

    // Marquer l'action comme en cours
    actionInProgressRef.current = true;
    lastActionRef.current = action;

    // Déclencher l'action via l'API
    const formData = new FormData();
    formData.append('action', action === 'ADD' ? 'ADD_GIFT' : 'REMOVE_GIFT');
    formData.append('cartId', cart.id);

    fetcher.submit(formData, {
      method: 'POST',
      action: '/api/cart/gift',
    });

    // Réinitialiser le flag après un court délai
    setTimeout(() => {
      actionInProgressRef.current = false;
    }, 1000);
  }, [cart, fetcher]);

  // Ce composant est invisible, il gère juste la logique
  return null;
}
