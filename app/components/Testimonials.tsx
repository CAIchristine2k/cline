import React from 'react';
import {Star, Quote} from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Mike Rodriguez",
      role: "Professional Boxer",
      image: "/images/testimonial-1.jpeg",
      rating: 5,
      text: "Shane's equipment is championship quality. The gloves feel perfect and give me the confidence I need in the ring. This is what legends are made of."
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Boxing Coach",
      image: "/images/testimonial-2.jpeg", 
      rating: 5,
      text: "I've trained fighters for 15 years, and Sugar Shane's gear is simply the best. The quality and craftsmanship are unmatched. My fighters love it."
    },
    {
      id: 3,
      name: "Carlos Martinez",
      role: "Amateur Champion",
      image: "/images/testimonial-3.jpeg",
      rating: 5,
      text: "Wearing Shane's merchandise makes me feel connected to greatness. The quality is incredible and the designs are fire. Proud to represent the legend."
    }
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-gold-500/20 text-gold-500 text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            What Champions Say
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">CHAMPION</span>{' '}
            <span className="text-gold-500">TESTIMONIALS</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Don't just take our word for it. Hear from fighters, coaches, and boxing enthusiasts 
            who trust Sugar Shane's legacy of excellence.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="group bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-gold-500/50 rounded-lg p-8 transition-all duration-300 hover:transform hover:scale-105 hover:bg-gray-900/70"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="h-8 w-8 text-gold-500/60 group-hover:text-gold-500 transition-colors duration-300" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-5 w-5 text-gold-500 fill-current" 
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-600 group-hover:border-gold-500 transition-colors duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div>
                  <div className="text-white font-bold group-hover:text-gold-500 transition-colors duration-300">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-gold-900/20 via-gold-500/10 to-gold-900/20 backdrop-blur-sm border border-gold-500/30 rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-gold-500">
                50K+
              </div>
              <div className="text-gray-300 text-sm uppercase tracking-wider">
                Happy Customers
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-gold-500">
                4.9
              </div>
              <div className="text-gray-300 text-sm uppercase tracking-wider">
                Average Rating
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-gold-500">
                98%
              </div>
              <div className="text-gray-300 text-sm uppercase tracking-wider">
                Satisfaction Rate
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-gold-500">
                24/7
              </div>
              <div className="text-gray-300 text-sm uppercase tracking-wider">
                Champion Support
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Join the <span className="text-gold-500">Champions</span>?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the same quality that champions trust. Elevate your training with Sugar Shane's premium collection.
          </p>
          <button className="bg-gold-500 hover:bg-gold-400 text-black font-bold py-4 px-8 rounded-sm transition-all duration-300 transform hover:scale-105 uppercase tracking-wider">
            Shop Champion Gear
          </button>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-20 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl"></div>
    </section>
  );
}