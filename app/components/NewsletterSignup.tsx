import React, { useState } from 'react';
import { Mail, ChevronRight, Check, Trophy } from 'lucide-react';
import type { LandingPageConfig } from '~/lib/config';

interface NewsletterSignupProps {
  config: LandingPageConfig;
}

export default function NewsletterSignup({ config }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [interests, setInterests] = useState<string[]>(['products']);

  const benefits = [
    'Early access to limited-edition boxing gear',
    `Exclusive training tips from ${config.influencerName}`,
    '10% off your first purchase',
    `Invites to virtual Q&A sessions with ${config.influencerName.split(' ')[0]}`
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // In a real app, you would send this to your backend or Shopify Customer API
    console.log('Email submitted:', email);
    console.log('Interests:', interests);
    setSubmitted(true);
    setError('');
  };

  const handleInterestChange = (value: string) => {
    setInterests(prev => 
      prev.includes(value) 
        ? prev.filter(interest => interest !== value)
        : [...prev, value]
    );
  };

  if (!config.newsletterEnabled) {
    return null;
  }

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 md:p-12 shadow-xl border border-gray-800 relative overflow-hidden">
          {/* Boxing glove decorative element */}
          <div className="absolute -right-16 -bottom-16 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M12 6v4l2 2" />
              <path d="M15.536 13.9a3 3 0 1 0-4.072-4.4 7.1 7.1 0 0 0-2.464 5.5v1" />
              <path d="M9 16a2 2 0 1 1 4 0v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z" />
              <path d="M9 19h4" />
            </svg>
          </div>
          
          <div className="flex flex-col md:flex-row items-center relative z-10">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <div className="inline-block bg-primary text-black font-bold py-1 px-4 rounded-full text-sm mb-4">
                CHAMPION'S INNER CIRCLE
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                JOIN <span className="text-primary">{config.influencerName.toUpperCase()}'S</span> EXCLUSIVE COMMUNITY
              </h2>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Get ringside access to {config.influencerName}'s world with early product releases, training tips from a {config.influencerTitle.toLowerCase()}, and exclusive content you won't find anywhere else.
              </p>
              
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-primary rounded-full p-1 mr-3 mt-0.5">
                      <Check className="h-3 w-3 text-black" />
                    </div>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:w-1/2 w-full">
              <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-gray-800 shadow-lg">
                {!submitted ? (
                  <>
                    <h3 className="text-xl font-bold mb-4 text-white">
                      Get Ringside Updates
                    </h3>
                    
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4 relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          <Mail className="h-5 w-5" />
                        </div>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                          }}
                          className="w-full py-3 pl-10 pr-4 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-400"
                          placeholder="Enter your email address"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="flex items-start">
                          <input 
                            type="checkbox" 
                            checked={interests.includes('products')}
                            onChange={() => handleInterestChange('products')}
                            className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700 text-primary focus:ring-primary"
                          />
                          <span className="ml-2 text-sm text-gray-300">New product releases &amp; merch drops</span>
                        </label>
                      </div>
                      
                      <div className="mb-4">
                        <label className="flex items-start">
                          <input 
                            type="checkbox" 
                            checked={interests.includes('events')}
                            onChange={() => handleInterestChange('events')}
                            className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700 text-primary focus:ring-primary"
                          />
                          <span className="ml-2 text-sm text-gray-300">Boxing events &amp; appearances</span>
                        </label>
                      </div>
                      
                      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                      
                      <button 
                        type="submit"
                        className="group w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                      >
                        JOIN THE INNER CIRCLE
                        <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </form>
                    
                    <p className="text-gray-500 text-xs mt-4 text-center">
                      By subscribing, you agree to receive marketing emails from us. 
                      You can unsubscribe at any time.
                    </p>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-primary rounded-full p-3 inline-flex items-center justify-center mb-4">
                      <Trophy className="h-8 w-8 text-black" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-white">
                      Welcome to the Champion's Circle!
                    </h3>
                    
                    <p className="text-gray-300">
                      You've successfully joined {config.influencerName}'s exclusive community. 
                      Check your inbox soon for your 10% discount code!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}