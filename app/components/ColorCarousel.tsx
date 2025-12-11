import {useState, useEffect} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';

// ==================== TYPES ====================

/**
 * Représente une option de couleur dans le carrousel
 */
export interface ColorOption {
  /** Nom de la couleur (ex: "Natural", "Bleach Blonde") */
  name: string;
  /** Valeur réelle Shopify (ex: "#TT1B/27", "Blond") */
  value?: string;
  /** URL de l'image swatch/mèche de cheveux */
  imageUrl: string;
  /** ID de la variante associée */
  variantId: string;
  /** Indique si cette couleur est disponible */
  availableForSale: boolean;
}

interface ColorCarouselProps {
  /** Liste des options de couleurs à afficher */
  colors: ColorOption[];
  /** Couleur actuellement sélectionnée */
  selectedColorName: string;
  /** Callback appelé lors de la sélection d'une couleur */
  onColorSelect: (colorOption: ColorOption) => void;
  /** Classe CSS personnalisée (optionnel) */
  className?: string;
}

// ==================== COMPOSANT PRINCIPAL ====================

/**
 * Carrousel de couleurs avec affichage de 3 ronds (précédent, sélectionné, suivant)
 *
 * Design :
 * - 3 ronds alignés horizontalement
 * - Le rond sélectionné est au centre, plus grand, avec un contour rose
 * - Les ronds voisins sont plus petits sur les côtés
 * - Navigation par flèches (desktop et mobile)
 * - Texte "COLOUR — NomCouleur" en dessous
 */
export function ColorCarousel({
  colors,
  selectedColorName,
  onColorSelect,
  className = '',
}: ColorCarouselProps) {
  // ==================== STATE ====================

  const [currentIndex, setCurrentIndex] = useState(0);

  // ==================== EFFECTS ====================

  /**
   * Met à jour l'index quand la couleur sélectionnée change
   */
  useEffect(() => {
    const selectedIndex = colors.findIndex(
      (color) => color.name === selectedColorName
    );
    if (selectedIndex !== -1 && selectedIndex !== currentIndex) {
      setCurrentIndex(selectedIndex);
    }
  }, [selectedColorName, colors, currentIndex]);

  // ==================== HANDLERS ====================

  /**
   * Navigation vers la couleur précédente (avec boucle circulaire)
   */
  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : colors.length - 1;
    setCurrentIndex(newIndex);
    onColorSelect(colors[newIndex]);
  };

  /**
   * Navigation vers la couleur suivante (avec boucle circulaire)
   */
  const handleNext = () => {
    const newIndex = currentIndex < colors.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    onColorSelect(colors[newIndex]);
  };

  /**
   * Clic direct sur un rond de couleur
   */
  const handleColorClick = (color: ColorOption, index: number) => {
    if (!color.availableForSale) return;

    setCurrentIndex(index);
    onColorSelect(color);
  };

  // ==================== RENDER CONDITIONS ====================

  // Ne rien afficher si pas de couleurs
  if (!colors || colors.length === 0) {
    return null;
  }

  // Affichage simple si une seule couleur
  if (colors.length === 1) {
    const singleColor = colors[0];
    return (
      <div className={`py-6 ${className}`}>
        <div className="flex justify-center">
          <div
            className="rounded-full overflow-hidden border-[3px] border-primary shadow-xl w-[100px] h-[100px] md:w-[180px] md:h-[180px]"
          >
            <img
              src={singleColor.imageUrl}
              alt={singleColor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm font-medium text-black tracking-wider">
            <span className="uppercase font-bold">COULEUR</span>
            <span className="mx-2 text-primary">—</span>
            <span>{singleColor.name}</span>
          </p>
        </div>
      </div>
    );
  }

  // ==================== CALCUL DES 3 RONDS VISIBLES ====================

  // Index du rond précédent (avec boucle circulaire)
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : colors.length - 1;

  // Index du rond suivant (avec boucle circulaire)
  const nextIndex = currentIndex < colors.length - 1 ? currentIndex + 1 : 0;

  // Les 3 couleurs à afficher
  const prevColor = colors[prevIndex];
  const currentColor = colors[currentIndex];
  const nextColor = colors[nextIndex];

  // ==================== RENDER PRINCIPAL ====================

  return (
    <div className={`relative py-6 ${className}`}>
      {/* Container principal avec les 3 ronds */}
      <div className="relative flex items-center justify-center gap-2 md:gap-8 px-2 md:px-4">

        {/* Bouton gauche - Desktop et Mobile */}
        <button
          onClick={handlePrev}
          className="flex-shrink-0 bg-white border-2 border-primary/30 hover:bg-primary/10 text-primary p-1.5 md:p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 z-10"
          aria-label="Couleur précédente"
        >
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
        </button>

        {/* Les 3 ronds de couleur */}
        <div className="flex items-center justify-center gap-2 md:gap-8">

          {/* Rond précédent (gauche) */}
          <button
            onClick={() => handleColorClick(prevColor, prevIndex)}
            disabled={!prevColor.availableForSale}
            className={`
              rounded-full overflow-hidden flex-shrink-0
              transition-all duration-300
              border-2 border-gray-200
              shadow-md hover:scale-105
              w-[70px] h-[70px] md:w-[130px] md:h-[130px]
              ${!prevColor.availableForSale ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
            `}
            aria-label={`Sélectionner la couleur ${prevColor.name}`}
          >
            <div className="relative w-full h-full">
              <img
                src={prevColor.imageUrl}
                alt={prevColor.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {!prevColor.availableForSale && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-xs font-bold uppercase">
                    Épuisé
                  </span>
                </div>
              )}
            </div>
          </button>

          {/* Rond sélectionné (centre) - PLUS GRAND avec BORDURE ROSE */}
          <button
            onClick={() => handleColorClick(currentColor, currentIndex)}
            disabled={!currentColor.availableForSale}
            className={`
              rounded-full overflow-hidden flex-shrink-0
              transition-all duration-300
              border-[3px] border-primary
              shadow-xl ring-2 ring-primary/20
              w-[100px] h-[100px] md:w-[180px] md:h-[180px]
              ${!currentColor.availableForSale ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
            `}
            aria-label={`Couleur sélectionnée: ${currentColor.name}`}
            aria-pressed="true"
          >
            <div className="relative w-full h-full">
              <img
                src={currentColor.imageUrl}
                alt={currentColor.name}
                className="w-full h-full object-cover"
                loading="eager"
              />
              {!currentColor.availableForSale && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-xs font-bold uppercase">
                    Épuisé
                  </span>
                </div>
              )}
            </div>
          </button>

          {/* Rond suivant (droite) */}
          <button
            onClick={() => handleColorClick(nextColor, nextIndex)}
            disabled={!nextColor.availableForSale}
            className={`
              rounded-full overflow-hidden flex-shrink-0
              transition-all duration-300
              border-2 border-gray-200
              shadow-md hover:scale-105
              w-[70px] h-[70px] md:w-[130px] md:h-[130px]
              ${!nextColor.availableForSale ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
            `}
            aria-label={`Sélectionner la couleur ${nextColor.name}`}
          >
            <div className="relative w-full h-full">
              <img
                src={nextColor.imageUrl}
                alt={nextColor.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {!nextColor.availableForSale && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-xs font-bold uppercase">
                    Épuisé
                  </span>
                </div>
              )}
            </div>
          </button>

        </div>

        {/* Bouton droit - Desktop et Mobile */}
        <button
          onClick={handleNext}
          className="flex-shrink-0 bg-white border-2 border-primary/30 hover:bg-primary/10 text-primary p-1.5 md:p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 z-10"
          aria-label="Couleur suivante"
        >
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Label de la couleur sélectionnée */}
      <div className="text-center mt-6">
        <p className="text-sm md:text-base font-medium text-black tracking-wider">
          <span className="uppercase font-bold" style={{letterSpacing: '0.1em'}}>
            COULEUR
          </span>
          <span className="mx-2 md:mx-3 text-primary font-bold">—</span>
          <span className="font-normal">{currentColor.name}</span>
        </p>
      </div>

      {/* Indicateur de position (optionnel, uniquement si plus de 3 couleurs) */}
      {colors.length > 3 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {colors.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                onColorSelect(colors[index]);
              }}
              className={`
                h-1.5 rounded-full transition-all duration-300
                ${index === currentIndex
                  ? 'bg-primary w-6'
                  : 'bg-gray-300 w-1.5 hover:bg-gray-400'
                }
              `}
              aria-label={`Aller à la couleur ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
