import React, {useState} from 'react';
import {Mail, Send, Gift, Star, Trophy} from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail('');
  };

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-gold-500/20 text-gold-500 text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
              Join the Champions
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">CHAMPION'S</span>{' '}
              <span className="text-gold-500">NEWSLETTER</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
              Get exclusive access to championship insights, training tips, early product releases, 
              and special offers directly from Sugar Shane Mosley.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center space-y-4">
              <div className="bg-gold-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Gift className="h-8 w-8 text-gold-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Exclusive Offers</h3>
              <p className="text-gray-400">
                Be the first to access limited-time discounts and champion-only deals
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-gold-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-gold-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Early Access</h3>
              <p className="text-gray-400">
                Get first access to new product launches and exclusive collections
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-gold-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Trophy className="h-8 w-8 text-gold-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Champion Tips</h3>
              <p className="text-gray-400">
                Receive training insights and boxing wisdom directly from the legend
              </p>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="bg-gradient-to-r from-gold-900/20 via-gold-500/10 to-gold-900/20 backdrop-blur-sm border border-gold-500/30 rounded-lg p-8 md:p-12">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Ready to Train Like a <span className="text-gold-500">Champion</span>?
                  </h3>
                  <p className="text-gray-300">
                    Join 50,000+ boxing enthusiasts and champions in training
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full bg-black/60 border border-gray-600 rounded-sm py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors duration-300"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group bg-gold-500 hover:bg-gold-400 disabled:bg-gold-600 text-black font-bold py-4 px-8 rounded-sm transition-all duration-300 transform hover:scale-105 flex items-center justify-center uppercase tracking-wider min-w-[140px]"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent"></div>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        Join Now
                      </>
                    )}
                  </button>
                </div>
                
                <p className="text-center text-gray-400 text-sm mt-6">
                  By subscribing, you agree to our privacy policy. Unsubscribe at any time.
                </p>
              </form>
            ) : (
              <div className="text-center max-w-2xl mx-auto">
                <div className="bg-green-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Trophy className="h-10 w-10 text-green-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Welcome to the <span className="text-gold-500">Champions Circle</span>!
                </h3>
                <p className="text-gray-300 mb-6">
                  Thank you for joining! You'll receive your first champion's newsletter within 24 hours, 
                  including exclusive content and special offers.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-gold-500 hover:text-gold-400 font-medium transition-colors duration-300"
                >
                  Subscribe another email →
                </button>
              </div>
            )}
          </div>

          {/* Social Proof */}
          <div className="text-center mt-12">
            <div className="flex items-center justify-center space-x-8 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-gold-500 fill-current" />
                <span>50K+ Subscribers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gold-500" />
                <span>Weekly Champion Tips</span>
              </div>
              <div className="flex items-center space-x-2">
                <Gift className="h-4 w-4 text-gold-500" />
                <span>Exclusive Deals</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl"></div>
    </section>
  );
}