import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import {formatMoney} from '~/utils/formatMoney';

/**
 * Custom Money component that formats prices with € at the end (French format)
 * Example: 45.00€ instead of €45.00
 */
export function Money({
  data,
  className = '',
}: {
  data: MoneyV2;
  className?: string;
}) {
  if (!data) return null;

  const formattedPrice = formatMoney(data);

  return <span className={className}>{formattedPrice}</span>;
}
