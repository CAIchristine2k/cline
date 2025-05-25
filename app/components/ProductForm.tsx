import {useState} from 'react';
import {useConfig} from '~/utils/themeContext';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';

export function ProductForm({product}: {product: any}) {
  const config = useConfig();
  const {open} = useAside();
  const [selectedVariant, setSelectedVariant] = useState(product.variants.nodes[0]);
  const [selectedOptions, setSelectedOptions] = useState(
    product.variants.nodes[0].selectedOptions.reduce(
      (acc: Record<string, string>, option: any) => {
        acc[option.name] = option.value;
        return acc;
      },
      {}
    )
  );

  // Find options available in this product
  const options = product.options.filter(
    (option: any) => option.values.length > 1
  );

  // Update the selected variant when options change
  const updateSelectedVariant = (name: string, value: string) => {
    // Update the selected options
    const newSelectedOptions = {...selectedOptions, [name]: value};
    setSelectedOptions(newSelectedOptions);

    // Find the variant that matches all selected options
    const newVariant = product.variants.nodes.find((variant: any) => {
      return variant.selectedOptions.every((option: any) => {
        return newSelectedOptions[option.name] === option.value;
      });
    });

    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  // Prepare the lines for the cart
  const lines = [{
    merchandiseId: selectedVariant.id,
    quantity: 1
  }];

  return (
    <div>
      {/* Options Selection */}
      {options.length > 0 && (
        <div className="mb-6 space-y-4">
          {options.map((option: any) => (
            <div key={option.name}>
              <label htmlFor={option.name} className="block text-sm font-medium mb-2">
                {option.name}
              </label>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value: string) => {
                  const isSelected = selectedOptions[option.name] === value;
                  return (
                    <button
                      key={value}
                      onClick={() => updateSelectedVariant(option.name, value)}
                      className={`px-4 py-2 border text-sm rounded-sm transition-colors ${
                        isSelected
                          ? 'border-primary bg-primary text-background'
                          : 'border-primary/20 hover:border-primary/50'
                      }`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add to Cart Button */}
      <AddToCartButton
        lines={lines}
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          // Open cart aside after adding item
          setTimeout(() => {
            open('cart');
          }, 300);
        }}
      >
        {selectedVariant?.availableForSale ? 'Add to Cart' : 'Sold Out'}
      </AddToCartButton>
    </div>
  );
}
