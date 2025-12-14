import React from 'react';

interface ColorSwatch {
  value: string; // Nom de la couleur (ex: "Blond", "#TTS4/PK613")
  imageUrl: string; // URL de l'image de la couleur
  available: boolean; // Est-ce que cette couleur est disponible?
  variantId?: string; // ID de la variante Shopify (optionnel)
}

interface ColorSwatchesProps {
  swatches: ColorSwatch[];
  selectedValue: string; // Couleur actuellement sélectionnée
  onSelect: (value: string) => void; // Callback quand on clique sur un swatch
  className?: string;
}

/**
 * ColorSwatches - Composant de sélection visuelle de couleur
 *
 * Affiche une grille de carrés avec l'image de chaque couleur.
 * - Carrés de 48x48px (w-12 h-12)
 * - Border rose quand sélectionné
 * - Grisé et barré quand indisponible
 * - Hover effet sur les disponibles
 */
export function ColorSwatches({
  swatches,
  selectedValue,
  onSelect,
  className = '',
}: ColorSwatchesProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {swatches.map((swatch) => {
        const isSelected = swatch.value === selectedValue;
        const isAvailable = swatch.available;

        return (
          <button
            key={swatch.value}
            type="button"
            onClick={() => isAvailable && onSelect(swatch.value)}
            disabled={!isAvailable}
            className={`
              relative w-12 h-12 rounded-md overflow-hidden
              transition-all duration-200
              ${
                isSelected
                  ? 'border-[4px] border-primary ring-2 ring-primary/20 ring-offset-2 scale-110'
                  : 'border-2 border-gray-200'
              }
              ${
                isAvailable && !isSelected
                  ? 'hover:border-gray-400 hover:scale-105'
                  : ''
              }
              ${
                !isAvailable
                  ? 'opacity-40 cursor-not-allowed'
                  : 'cursor-pointer'
              }
            `}
            title={swatch.value}
            aria-label={`Couleur ${swatch.value}${!isAvailable ? ' (épuisée)' : ''}${isSelected ? ' (sélectionnée)' : ''}`}
          >
            {/* Image de la couleur en background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${swatch.imageUrl})`,
              }}
            />

            {/* Barre diagonale si indisponible */}
            {!isAvailable && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="absolute w-[150%] h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent"
                  style={{
                    transform: 'rotate(-45deg)',
                  }}
                />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
