import React from 'react';
import {ColorSwatches} from './ColorSwatches';

interface ColorOption {
  value: string; // Valeur Shopify réelle (ex: "#TT1B/27")
  label?: string; // Label affiché (ex: "Blond Platine")
  imageUrl: string; // URL de l'image
  available: boolean; // Disponibilité
  variantId?: string; // ID de la variante (optionnel)
}

interface ColorSelectorProps {
  label?: string; // Texte du label (par défaut "Couleur")
  colors: ColorOption[]; // Liste des couleurs disponibles
  selectedColor: string; // Couleur actuellement sélectionnée
  onChange: (colorValue: string) => void; // Callback quand la couleur change
  showSelect?: boolean; // Afficher le <select> en plus des swatches (par défaut: true)
  className?: string;
}

/**
 * ColorSelector - Sélecteur de couleur complet avec swatches + select
 *
 * Combine :
 * - Un label "Couleur : {nom}"
 * - Une grille de swatches visuels
 * - Un <select> synchronisé (optionnel)
 *
 * Synchronisation bidirectionnelle entre swatches et select.
 */
export function ColorSelector({
  label = 'Couleur',
  colors,
  selectedColor,
  onChange,
  showSelect = false,
  className = '',
}: ColorSelectorProps) {
  // Trouver le nom de la couleur sélectionnée
  const selectedColorObj = colors.find((c) => c.value === selectedColor);
  const selectedColorName = selectedColorObj?.label || selectedColorObj?.value || selectedColor;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Label avec nom de la couleur sélectionnée */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-900">
          {label} : <span className="text-primary">{selectedColorName}</span>
        </label>
      </div>

      {/* Swatches visuels */}
      <ColorSwatches
        swatches={colors.map((color) => ({
          value: color.value,
          imageUrl: color.imageUrl,
          available: color.available,
          variantId: color.variantId,
        }))}
        selectedValue={selectedColor}
        onSelect={onChange}
      />

      {/* Select dropdown (optionnel) */}
      {showSelect && (
        <select
          value={selectedColor}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-md text-sm font-medium text-gray-900 bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none transition-all"
        >
          {colors.map((color) => (
            <option
              key={color.value}
              value={color.value}
              disabled={!color.available}
            >
              {color.value} {!color.available ? '(Épuisé)' : ''}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
