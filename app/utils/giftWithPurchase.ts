/**
 * Configuration et logique métier pour le cadeau automatique
 */

export const GIFT_CONFIG = {
  // Produit cadeau - Variante "OFFERT" à 0€
  productHandle: 'brosse-plate-pour-baby-hair',
  variantId: 'gid://shopify/ProductVariant/56860507439449', // Variante "OFFERT" à 0€

  // Seuil d'éligibilité
  threshold: 40, // en euros

  // Attribute pour identifier le cadeau automatique
  giftAttribute: {
    key: '_gift',
    value: 'peigne40',
  },
} as const;

/**
 * Calcule le sous-total du panier SANS le cadeau automatique
 */
export function calculateSubtotalWithoutGift(cart: any): number {
  if (!cart?.lines?.nodes) return 0;

  return cart.lines.nodes.reduce((total: number, line: any) => {
    // Ignorer la ligne si c'est le cadeau automatique
    const isAutoGift = line.attributes?.some(
      (attr: any) =>
        attr.key === GIFT_CONFIG.giftAttribute.key &&
        attr.value === GIFT_CONFIG.giftAttribute.value
    );

    if (isAutoGift) return total;

    // Ajouter le montant de cette ligne
    const amount = parseFloat(line.cost?.totalAmount?.amount || '0');
    return total + amount;
  }, 0);
}

/**
 * Vérifie si le cadeau automatique est déjà dans le panier
 */
export function findAutoGiftLine(cart: any): any | null {
  if (!cart?.lines?.nodes) {
    console.log('🎁 [findAutoGiftLine] No cart.lines.nodes found');
    return null;
  }

  console.log('🎁 [findAutoGiftLine] Checking cart lines:', {
    totalLines: cart.lines.nodes.length,
    lines: cart.lines.nodes.map((line: any) => ({
      id: line.id,
      productHandle: line.merchandise?.product?.handle,
      hasAttributes: !!line.attributes,
      attributes: line.attributes,
    })),
  });

  const giftLine = cart.lines.nodes.find((line: any) =>
    line.attributes?.some(
      (attr: any) =>
        attr.key === GIFT_CONFIG.giftAttribute.key &&
        attr.value === GIFT_CONFIG.giftAttribute.value
    )
  );

  console.log('🎁 [findAutoGiftLine] Gift line found:', !!giftLine, giftLine);

  return giftLine;
}

/**
 * Détermine l'action à effectuer (ADD, REMOVE, ou NONE)
 */
export function determineGiftAction(cart: any): 'ADD' | 'REMOVE' | 'NONE' {
  const subtotal = calculateSubtotalWithoutGift(cart);
  const hasAutoGift = !!findAutoGiftLine(cart); // !! pour convertir undefined/null en boolean
  const isEligible = subtotal >= GIFT_CONFIG.threshold;

  console.log('🎁 [Gift] Eligibility check:', {
    subtotal,
    threshold: GIFT_CONFIG.threshold,
    isEligible,
    hasAutoGift,
  });

  if (isEligible && !hasAutoGift) {
    return 'ADD';
  } else if (!isEligible && hasAutoGift) {
    return 'REMOVE';
  }

  return 'NONE';
}
