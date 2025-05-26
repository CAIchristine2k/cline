# useOptimisticVariant

The `useOptimisticVariant` takes an existing product variant, processes a pending navigation to another product variant, and returns the data of the destination variant. This makes switching product options immediate.

```jsx
import {useLoaderData} from 'react-router';
import {useOptimisticVariant} from '@shopify/hydrogen';

export async function loader({context}) {
  return {
    product: await context.storefront.query('/** product query **/'),
    // Note that variants does not need to be awaited to be used by `useOptimisticVariant`
    variants: context.storefront.query('/** variants query **/'),
  };
}

function Product() {
  const {product, variants} = useLoaderData();

  // The selectedVariant optimistically changes during page
  // transitions with one of the preloaded product variants
  const selectedVariant = useOptimisticVariant(
    product.selectedVariant,
    variants,
  );

  // @ts-ignore
  return <ProductMain selectedVariant={selectedVariant} />;
}

```

```tsx
import {useLoaderData} from 'react-router';
import {LoaderFunctionArgs} from 'react-router';
import {useOptimisticVariant} from '@shopify/hydrogen';

export async function loader({context}: LoaderFunctionArgs) {
  return {
    product: await context.storefront.query('/** product query */'),
    // Note that variants does not need to be awaited to be used by `useOptimisticVariant`
    variants: context.storefront.query('/** variants query */'),
  };
}

function Product() {
  const {product, variants} = useLoaderData<typeof loader>();

  // The selectedVariant optimistically changes during page
  // transitions with one of the preloaded product variants
  const selectedVariant = useOptimisticVariant(
    product.selectedVariant,
    variants,
  );

  // @ts-ignore
  return <ProductMain selectedVariant={selectedVariant} />;
}

```

## Props

### UseOptimisticVariantGeneratedType

#### Returns: OptimisticVariant<SelectedVariant = OptimisticVariantInput>A new product object where the `selectedVariant` property is set to the variant that matches the current URL search params. If no variant is found, the original product object is returned. The `isOptimistic` property is set to `true` if the `selectedVariant` has been optimistically changed.

#### Params:

- selectedVariant: SelectedVariant
- variants: Variants
export function useOptimisticVariant<
  SelectedVariant = OptimisticVariantInput,
  Variants = OptimisticProductVariants,
>(
  selectedVariant: SelectedVariant,
  variants: Variants,
): OptimisticVariant<SelectedVariant> {
  const navigation = useNavigation();
  const [resolvedVariants, setResolvedVariants] = useState<
    Array<PartialDeep<ProductVariant>>
  >([]);

  useEffect(() => {
    Promise.resolve(variants)
      .then((productWithVariants) => {
        if (productWithVariants) {
          setResolvedVariants(
            productWithVariants instanceof Array
              ? productWithVariants
              : (productWithVariants as PartialDeep<ProductVariant>).product
                  ?.variants?.nodes || [],
          );
        }
      })
      .catch((error) => {
        reportError(
          new Error(
            '[h2:error:useOptimisticVariant] An error occurred while resolving the variants for the optimistic product hook.',
            {
              cause: error,
            },
          ),
        );
      });
  }, [JSON.stringify(variants)]);

  if (navigation.state === 'loading') {
    const queryParams = new URLSearchParams(navigation.location.search);
    let reportedError = false;

    // Find matching variant
    const matchingVariant = resolvedVariants.find((variant) => {
      if (!variant.selectedOptions) {
        if (!reportedError) {
          reportedError = true;
          reportError(
            new Error(
              '[h2:error:useOptimisticVariant] The optimistic product hook requires your product query to include variants with the selectedOptions field.',
            ),
          );
        }
        return false;
      }

      return variant.selectedOptions.every((option) => {
        return queryParams.get(option.name) === option.value;
      });
    });

    if (matchingVariant) {
      return {
        ...matchingVariant,
        isOptimistic: true,
      } as OptimisticVariant<SelectedVariant>;
    }
  }

  return selectedVariant as OptimisticVariant<SelectedVariant>;
}


## Related

- [VariantSelector](https://shopify.dev/docs/api/hydrogen/components/variantselector)
- [useOptimisticCart](https://shopify.dev/docs/api/hydrogen/hooks/useoptimisticcart)

