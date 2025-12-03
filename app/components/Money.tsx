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
  data: MoneyV2 | Pick<MoneyV2, 'amount' | 'currencyCode'> | {amount?: string; currencyCode?: string};
  className?: string;
}) {
  if (!data || !data.amount || !data.currencyCode) return null;

  const formattedPrice = formatMoney(data as MoneyV2);

  return <span className={className}>{formattedPrice}</span>;
}
