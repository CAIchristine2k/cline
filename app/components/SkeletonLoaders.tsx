/**
 * Skeleton Loaders - Composants de chargement uniformes
 *
 * Utilisés pour afficher des placeholders pendant le chargement des données
 * afin d'éviter les flashs de contenu et améliorer l'UX perçue
 */

export function SkeletonProduct() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-square bg-gray-200" />

      {/* Content placeholder */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />

        {/* Price */}
        <div className="h-6 bg-gray-300 rounded w-1/3" />

        {/* Button */}
        <div className="h-10 bg-gray-200 rounded w-full mt-4" />
      </div>
    </div>
  );
}

export function SkeletonProductGrid({count = 8}: {count?: number}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({length: count}).map((_, i) => (
        <SkeletonProduct key={i} />
      ))}
    </div>
  );
}

export function SkeletonProductDetail() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 rounded-lg" />
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded" />
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <div className="h-8 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>

          {/* Price */}
          <div className="h-12 bg-gray-300 rounded w-1/3" />

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>

          {/* Variants */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 w-20 bg-gray-200 rounded" />
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <div className="h-12 bg-gray-300 rounded w-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="relative w-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] bg-gray-200 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4 px-4">
          <div className="h-12 bg-gray-300 rounded w-64 mx-auto" />
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto" />
          <div className="h-12 bg-gray-300 rounded w-40 mx-auto mt-8" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
      <div className="h-32 bg-gray-200 rounded mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}

export function SkeletonText({lines = 3}: {lines?: number}) {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({length: lines}).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-gray-200 rounded ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
}

/**
 * Wrapper générique pour le shimmer effect
 */
export function Skeleton({
  className = '',
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`animate-pulse ${className}`}>
      {children || <div className="h-full w-full bg-gray-200 rounded" />}
    </div>
  );
}

/**
 * Custom shimmer animation CSS
 * À ajouter dans app.css si nécessaire
 */
export const skeletonStyles = `
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.shimmer {
  animation: shimmer 2s infinite linear;
  background: linear-gradient(
    to right,
    #f3f4f6 0%,
    #e5e7eb 20%,
    #f3f4f6 40%,
    #f3f4f6 100%
  );
  background-size: 1000px 100%;
}
`;
