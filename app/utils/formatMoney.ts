import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

/**
 * Format money with € symbol at the end (French format)
 * Example: 45.00€ instead of €45.00
 */
export function formatMoney(money: MoneyV2): string {
  const amount = parseFloat(money.amount);
  const currencyCode = money.currencyCode || 'EUR';

  // Format with French locale but customize the output
  const formatted = new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  // Get currency symbol
  const currencySymbol = getCurrencySymbol(currencyCode);

  // Return with symbol at the end
  return `${formatted}${currencySymbol}`;
}

/**
 * Get currency symbol for a given currency code
 */
function getCurrencySymbol(currencyCode: string): string {
  const symbols: Record<string, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
    CAD: '$',
    AUD: '$',
    JPY: '¥',
    CNY: '¥',
  };

  return symbols[currencyCode] || currencyCode;
}
