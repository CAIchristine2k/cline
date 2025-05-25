import React, {useState, useEffect} from 'react';
import {Clock, Star, Trophy, Zap, ShoppingCart} from 'lucide-react';

export function LimitedEdition() {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return {...prev, seconds: prev.seconds - 1};
        } else if (prev.minutes > 0) {
          return {...prev, minutes: prev.minutes - 1, seconds: 59};
        } else if (prev.hours > 0) {
          return {...prev, hours: prev.hours - 1, minutes: 59, seconds: 59};
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const limitedProducts = [
    {
      id: 1,
      name: 'Championship Gold Gloves',
      originalPrice: 299,
      salePrice: 199,
      image: '/images/product-1.png',
      itemsLeft: 12,
      totalItems: 50,
    },
    {
      id: 2,
      name: 'Legacy Training Set',
      originalPrice: 149,
      salePrice: 99,
      image: '/images/product-2.png',
      itemsLeft: 8,
      totalItems: 30,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-6 py-3 mb-6">
            <Clock className="h-5 w-5 text-red-500 animate-pulse" />
            <span className="text-red-500 font-bold text-sm uppercase tracking-wider">
              Limited Time Offer
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">CHAMPION'S</span>{' '}
            <span className="text-gold-500">EXCLUSIVE</span>
          </h2>

          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed mb-8">
            Get your hands on Sugar Shane's most coveted gear. These
            championship-quality pieces are available for a limited time only.
            Don't miss your chance to own a piece of boxing history.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-gold-900/20 via-gold-500/10 to-gold-900/20 backdrop-blur-sm border border-gold-500/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white text-center mb-6">
              Offer Ends In:
            </h3>

            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="bg-black/60 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                <div className="text-3xl md:text-4xl font-bold text-gold-500 mb-1">
                  {timeLeft.days.toString().padStart(2, '0')}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  Days
                </div>
              </div>
              <div className="bg-black/60 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                <div className="text-3xl md:text-4xl font-bold text-gold-500 mb-1">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  Hours
                </div>
              </div>
              <div className="bg-black/60 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                <div className="text-3xl md:text-4xl font-bold text-gold-500 mb-1">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  Minutes
                </div>
              </div>
              <div className="bg-black/60 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                <div className="text-3xl md:text-4xl font-bold text-gold-500 mb-1 animate-pulse">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  Seconds
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Limited Products */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {limitedProducts.map((product) => {
            const percentageLeft =
              (product.itemsLeft / product.totalItems) * 100;
            const discount = Math.round(
              ((product.originalPrice - product.salePrice) /
                product.originalPrice) *
                100,
            );

            return (
              <div
                key={product.id}
                className="group bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-gold-500/50 rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1 rounded-sm text-sm">
                    -{discount}%
                  </div>

                  {/* Stock Warning */}
                  <div className="absolute top-4 right-4 bg-black/80 text-gold-500 font-bold px-3 py-1 rounded-sm text-sm">
                    {product.itemsLeft} left!
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ShoppingCart className="h-12 w-12 text-white" />
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-500 transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl font-bold text-gold-500">
                      ${product.salePrice}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>

                  {/* Stock Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Stock Level</span>
                      <span className="text-sm font-bold text-gold-500">
                        {product.itemsLeft}/{product.totalItems}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          percentageLeft > 50
                            ? 'bg-green-500'
                            : percentageLeft > 25
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }`}
                        style={{width: `${percentageLeft}%`}}
                      ></div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex items-center space-x-4 mb-6 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-gold-500" />
                      <span>Premium Quality</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4 text-gold-500" />
                      <span>Championship Grade</span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button className="w-full bg-gold-500 hover:bg-gold-400 text-black font-bold py-3 px-6 rounded-sm transition-all duration-300 transform hover:scale-105 uppercase tracking-wider flex items-center justify-center space-x-2">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-red-900/20 via-red-500/10 to-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-lg p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Zap className="h-8 w-8 text-red-500" />
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Don't Miss Out!
              </h3>
            </div>

            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              These exclusive championship pieces are flying off the shelves.
              Once they're gone, they're gone forever. Secure your piece of
              boxing history today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-4 px-8 rounded-sm transition-all duration-300 transform hover:scale-105 uppercase tracking-wider flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Shop Now - Limited Time</span>
              </button>

              <div className="text-center">
                <div className="text-2xl font-bold text-gold-500">
                  FREE SHIPPING
                </div>
                <div className="text-sm text-gray-400">
                  On all limited edition items
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl"></div>
    </section>
  );
}
