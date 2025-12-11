import {useState, useEffect} from 'react';
import {Link} from 'react-router';
import {Heart, ShoppingBag, Trash2, ArrowLeft} from 'lucide-react';
import {OptimizedImage} from '~/components/OptimizedImage';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useWishlist} from '~/components/WishlistButton';

interface WishlistItem {
  id: string;
  handle?: string;
  title: string;
  image?: string;
  price?: string;
  addedAt: string;
}

export default function WishlistPage() {
  const {wishlist, removeFromWishlist, clearWishlist} = useWishlist();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate handle from product title if not available
  const getProductHandle = (item: WishlistItem): string => {
    if (item.handle) return item.handle;

    // Try to extract from product ID
    const idParts = item.id.split('/');
    const numericId = idParts[idParts.length - 1];

    // Try to create a handle from the title
    if (item.title) {
      return item.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // Fallback to numeric ID
    return numericId;
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-10 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors duration-300 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="bg-primary/10 p-2 md:p-3 rounded-full">
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-primary fill-current" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
                  Mes Favoris
                </h1>
                <p className="text-gray-600 mt-1 text-sm md:text-base">
                  {wishlist.length} {wishlist.length > 1 ? 'produits' : 'produit'}
                </p>
              </div>
            </div>

            {wishlist.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('Voulez-vous vraiment vider votre liste de favoris ?')) {
                    clearWishlist();
                  }
                }}
                className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Tout supprimer
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">
              Votre liste de favoris est vide
            </h2>
            <p className="text-gray-600 mb-8">
              Parcourez nos produits et ajoutez vos articles préférés à votre wishlist
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ShoppingBag className="w-5 h-5" />
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/30"
              >
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-red-500 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label={`Retirer ${item.title} des favoris`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Product Image */}
                <Link
                  to={`/products/${getProductHandle(item)}`}
                  className="block aspect-square bg-gray-50 overflow-hidden"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400 text-sm">Aucune image</span>
                    </div>
                  )}
                </Link>

                {/* Product Info */}
                <div className="p-4">
                  <Link
                    to={`/products/${getProductHandle(item)}`}
                    className="block mb-3"
                  >
                    <h3 className="text-base font-semibold text-black leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </Link>

                  {item.price && (
                    <p className="text-lg font-bold text-black mb-3">
                      {item.price} €
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      to={`/products/${getProductHandle(item)}`}
                      className="flex-1 bg-primary hover:bg-primary/90 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-center text-sm"
                    >
                      Voir le produit
                    </Link>
                  </div>

                  <p className="text-xs text-gray-500 mt-3">
                    Ajouté le {new Date(item.addedAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Continue Shopping */}
        {wishlist.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Continuer mes achats
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
