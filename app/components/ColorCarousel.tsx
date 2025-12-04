import {useState, useRef, useEffect} from 'react';
import {Image} from '@shopify/hydrogen';
import {ChevronLeft, ChevronRight} from 'lucide-react';

// ==================== TYPES ====================

/**
 * Représente une option de couleur dans le carrousel
 */
export interface ColorOption {
  /** Nom de la couleur (ex: "Natural", "Bleach Blonde") */
  name: string;
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

// ==================== CONSTANTES ====================

/** Taille du rond central (couleur sélectionnée) */
const LARGE_SIZE = 180; // Plus grand pour correspondre à l'image
/** Taille des ronds adjacents */
const SMALL_SIZE = 120; // Légèrement plus grands

// ==================== COMPOSANT PRINCIPAL ====================

/**
 * Carrousel de couleurs pour la sélection de variantes produit
 *
 * Affiche 3 ronds visibles en même temps avec la couleur sélectionnée au centre
 * Navigation par flèches (desktop) ou swipe (mobile)
 */
export function ColorCarousel({
  colors,
  selectedColorName,
  onColorSelect,
  className = '',
}: ColorCarouselProps) {
  // ==================== STATE & REFS ====================

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // ==================== EFFECTS ====================

  /**
   * Met à jour l'index du carrousel quand la couleur sélectionnée change
   */
  useEffect(() => {
    const selectedIndex = colors.findIndex(
      (color) => color.name === selectedColorName
    );
    if (selectedIndex !== -1 && selectedIndex !== currentIndex) {
      setCurrentIndex(selectedIndex);
    }
  }, [selectedColorName, colors, currentIndex]);

  /**
   * Centre automatiquement la couleur sélectionnée
   */
  useEffect(() => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const itemWidth = LARGE_SIZE + 32; // taille + gap
      const offset = currentIndex * itemWidth - container.clientWidth / 2 + itemWidth / 2;

      container.scrollTo({
        left: offset,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  // ==================== HANDLERS ====================

  /**
   * Navigation vers la couleur précédente
   */
  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      onColorSelect(colors[newIndex]);
    }
  };

  /**
   * Navigation vers la couleur suivante
   */
  const handleNext = () => {
    if (currentIndex < colors.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      onColorSelect(colors[newIndex]);
    }
  };

  /**
   * Gestion du clic sur une couleur
   */
  const handleColorClick = (color: ColorOption, index: number) => {
    if (!color.availableForSale) return;

    setCurrentIndex(index);
    onColorSelect(color);
  };

  /**
   * Début du drag/swipe
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  /**
   * Fin du drag/swipe
   */
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  /**
   * Mouvement du drag/swipe
   */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;

    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  /**
   * Gestion du touch sur mobile
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;

    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;

    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // ==================== RENDER CONDITIONS ====================

  // Ne rien afficher si pas de couleurs ou une seule couleur
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
            className="rounded-full overflow-hidden border-4 border-white shadow-xl ring-2 ring-primary/30"
            style={{width: LARGE_SIZE, height: LARGE_SIZE}}
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
            <span className="uppercase">COULEUR</span>
            <span className="mx-2">—</span>
            <span>{singleColor.name}</span>
          </p>
        </div>
      </div>
    );
  }

  // ==================== RENDER PRINCIPAL ====================

  return (
    <div className={`relative py-6 ${className}`}>
      {/* Carrousel scrollable */}
      <div
        ref={carouselRef}
        className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="flex items-center justify-center gap-4 px-4 py-4 min-w-max">
          {colors.map((color, index) => {
            const isSelected = index === currentIndex;
            const size = isSelected ? LARGE_SIZE : SMALL_SIZE;
            const isAvailable = color.availableForSale;

            return (
              <div
                key={color.variantId}
                className="flex-shrink-0 transition-all duration-300"
                style={{
                  width: size,
                  height: size,
                }}
              >
                <button
                  onClick={() => handleColorClick(color, index)}
                  disabled={!isAvailable}
                  className={`
                    w-full h-full rounded-full overflow-hidden
                    transition-all duration-300
                    ${isSelected
                      ? 'border-[3px] border-white shadow-xl ring-1 ring-gray-200/60'
                      : 'border-0 shadow-md hover:scale-105'
                    }
                    ${!isAvailable ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  aria-label={`Sélectionner la couleur ${color.name}`}
                  aria-pressed={isSelected}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={color.imageUrl}
                      alt={color.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Overlay pour couleurs non disponibles */}
                    {!isAvailable && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xs font-bold uppercase">
                          Épuisé
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Flèches de navigation - Desktop uniquement */}
      <div className="hidden md:block">
        {/* Flèche gauche */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-8 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-900 text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 z-10"
            aria-label="Couleur précédente"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Flèche droite */}
        {currentIndex < colors.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-900 text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 z-10"
            aria-label="Couleur suivante"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Label de la couleur sélectionnée */}
      <div className="text-center mt-6">
        <p className="text-sm md:text-base font-medium text-black tracking-wider">
          <span className="uppercase font-bold" style={{letterSpacing: '0.1em'}}>
            COULEUR
          </span>
          <span className="mx-3 text-primary">—</span>
          <span className="font-normal">{colors[currentIndex]?.name || ''}</span>
        </p>
      </div>

      {/* Style pour masquer la scrollbar */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
    </div>
  );
}
