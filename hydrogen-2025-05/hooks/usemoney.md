# useMoney


    The `useMoney` hook takes a [MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) and returns a
    default-formatted string of the amount with the correct currency indicator, along with some of the parts provided by
    [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
  

```jsx
import {useMoney, ShopifyProvider} from '@shopify/hydrogen';

export function App() {
  return (
    <ShopifyProvider languageIsoCode="EN" countryIsoCode="US">
      <UsingMoney />
    </ShopifyProvider>
  );
}

function UsingMoney() {
  const myMoney = {amount: '100', currencyCode: 'USD'};
  const money = useMoney(myMoney);
  return (
    <>
      <div>Localized money: {money.localizedString}</div>
      <div>Money without trailing zeros: {money.withoutTrailingZeros}</div>
    </>
  );
}

```

```tsx
import {useMoney, ShopifyProvider} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

export function App() {
  return (
    // @ts-expect-error intentionally missing the rest of the props
    <ShopifyProvider countryIsoCode="US" languageIsoCode="EN">
      <UsingMoney />
    </ShopifyProvider>
  );
}

function UsingMoney() {
  const myMoney = {amount: '100', currencyCode: 'USD'} satisfies MoneyV2;
  const money = useMoney(myMoney);
  return (
    <>
      <div>Localized money: {money.localizedString}</div>
      <div>Money without trailing zeros: {money.withoutTrailingZeros}</div>
    </>
  );
}

```

## Props

`useMoney` must be a descendent of a `ShopifyProvider` component.

### UseMoneyGeneratedType

The `useMoney` hook takes a [MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) and returns a default-formatted string of the amount with the correct currency indicator, along with some of the parts provided by [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat). Uses `locale` from `ShopifyProvider` &nbsp;

#### Returns: UseMoneyValue

#### Params:

- money: MoneyV2
export function useMoney(money: MoneyV2): UseMoneyValue {
  const {countryIsoCode, languageIsoCode} = useShop();
  const locale = languageIsoCode.includes('_')
    ? languageIsoCode.replace('_', '-')
    : `${languageIsoCode}-${countryIsoCode}`;

  if (!locale) {
    throw new Error(
      `useMoney(): Unable to get 'locale' from 'useShop()', which means that 'locale' was not passed to '<ShopifyProvider/>'. 'locale' is required for 'useMoney()' to work`,
    );
  }

  const amount = parseFloat(money.amount);

  const {
    defaultFormatter,
    nameFormatter,
    narrowSymbolFormatter,
    withoutTrailingZerosFormatter,
    withoutCurrencyFormatter,
    withoutTrailingZerosOrCurrencyFormatter,
  } = useMemo(() => {
    const options = {
      style: 'currency' as const,
      currency: money.currencyCode,
    };

    return {
      defaultFormatter: getLazyFormatter(locale, options),
      nameFormatter: getLazyFormatter(locale, {
        ...options,
        currencyDisplay: 'name',
      }),
      narrowSymbolFormatter: getLazyFormatter(locale, {
        ...options,
        currencyDisplay: 'narrowSymbol',
      }),
      withoutTrailingZerosFormatter: getLazyFormatter(locale, {
        ...options,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
      withoutCurrencyFormatter: getLazyFormatter(locale),
      withoutTrailingZerosOrCurrencyFormatter: getLazyFormatter(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
    };
  }, [money.currencyCode, locale]);

  const isPartCurrency = (part: Intl.NumberFormatPart): boolean =>
    part.type === 'currency';

  // By wrapping these properties in functions, we only
  // create formatters if they are going to be used.
  const lazyFormatters = useMemo(
    () => ({
      original: (): MoneyV2 => money,
      currencyCode: (): CurrencyCode => money.currencyCode,

      localizedString: (): string => defaultFormatter().format(amount),

      parts: (): Intl.NumberFormatPart[] =>
        defaultFormatter().formatToParts(amount),

      withoutTrailingZeros: (): string =>
        amount % 1 === 0
          ? withoutTrailingZerosFormatter().format(amount)
          : defaultFormatter().format(amount),

      withoutTrailingZerosAndCurrency: (): string =>
        amount % 1 === 0
          ? withoutTrailingZerosOrCurrencyFormatter().format(amount)
          : withoutCurrencyFormatter().format(amount),

      currencyName: (): string =>
        nameFormatter().formatToParts(amount).find(isPartCurrency)?.value ??
        money.currencyCode, // e.g. "US dollars"

      currencySymbol: (): string =>
        defaultFormatter().formatToParts(amount).find(isPartCurrency)?.value ??
        money.currencyCode, // e.g. "USD"

      currencyNarrowSymbol: (): string =>
        narrowSymbolFormatter().formatToParts(amount).find(isPartCurrency)
          ?.value ?? '', // e.g. "$"

      amount: (): string =>
        defaultFormatter()
          .formatToParts(amount)
          .filter((part) =>
            ['decimal', 'fraction', 'group', 'integer', 'literal'].includes(
              part.type,
            ),
          )
          .map((part) => part.value)
          .join(''),
    }),
    [
      money,
      amount,
      nameFormatter,
      defaultFormatter,
      narrowSymbolFormatter,
      withoutCurrencyFormatter,
      withoutTrailingZerosFormatter,
      withoutTrailingZerosOrCurrencyFormatter,
    ],
  );

  // Call functions automatically when the properties are accessed
  // to keep these functions as an implementation detail.
  return useMemo(
    () =>
      new Proxy(lazyFormatters as unknown as UseMoneyValue, {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        get: (target, key) => Reflect.get(target, key)?.call(null),
      }),
    [lazyFormatters],
  );
}


### UseMoneyValue

### amount

value: `string`

The localized amount, without any currency symbols or non-number types from the `Intl.NumberFormat.formatToParts` parts.

### currencyCode

value: `CurrencyCode`

The currency code from the `MoneyV2` object.

### currencyName

value: `string`

The name for the currency code, returned by `Intl.NumberFormat`.

### currencyNarrowSymbol

value: `string`

The currency narrow symbol returned by `Intl.NumberFormat`.

### currencySymbol

value: `string`

The currency symbol returned by `Intl.NumberFormat`.

### localizedString

value: `string`

A string returned by `new Intl.NumberFormat` for the amount and currency code, using the `locale` value in the [`LocalizationProvider` component](https://shopify.dev/api/hydrogen/components/localization/localizationprovider).

### original

value: `MoneyV2`

The `MoneyV2` object provided as an argument to the hook.

### parts

value: `NumberFormatPart[]`

All parts returned by `Intl.NumberFormat.formatToParts`.

### withoutTrailingZeros

value: `string`

A string with trailing zeros removed from the fractional part, if any exist. If there are no trailing zeros, then the fractional part remains. For example, `$640.00` turns into `$640`. `$640.42` remains `$640.42`.

### withoutTrailingZerosAndCurrency

value: `string`

A string without currency and without trailing zeros removed from the fractional part, if any exist. If there are no trailing zeros, then the fractional part remains. For example, `$640.00` turns into `640`. `$640.42` turns into `640.42`.

## Related

- [Money](/api/hydrogen/components/money)

