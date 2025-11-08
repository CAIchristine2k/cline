import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import {useConfig} from '~/utils/themeContext';

export function ProductPrice({
  price,
  compareAtPrice,
  className = '',
}: {
  price?: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
  className?: string;
}) {
  const config = useConfig();

  return (
    <div className={`${className}`}>
      {compareAtPrice ? (
        <div className="flex items-center gap-2">
          {price ? (
            <span className="font-medium text-black bg-[#ffa3ae] px-3 py-1 rounded-md">
              <Money data={price} />
            </span>
          ) : null}
          <s className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
            <Money data={compareAtPrice} />
          </s>
        </div>
      ) : price ? (
        <span className="font-medium text-black bg-[#ffa3ae] px-3 py-1 rounded-md">
          <Money data={price} />
        </span>
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}
