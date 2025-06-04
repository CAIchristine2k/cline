import React from 'react';
import {Sparkles, Camera, ArrowRight} from 'lucide-react';
import {useConfig} from '~/utils/themeContext';
import {Link} from 'react-router';

export function AIMediaGeneration() {
  const config = useConfig();

  if (!config.showAIMediaGeneration || !config.aiMediaGeneration) {
    return null;
  }

  const {aiMediaGeneration} = config;

  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-900/90 to-black relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-4">
            {aiMediaGeneration.subtitle}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary">
              {aiMediaGeneration.title.split(' ')[0]}
            </span>{' '}
            {aiMediaGeneration.title.split(' ').slice(1).join(' ')}
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Upload your photo and create memorable moments with{' '}
            <span className="text-primary font-medium">
              {config.influencerName}
            </span>
            . Try on products or create custom poses - all powered by
            cutting-edge AI.
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Image Demo + Features */}
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: Visual Demo */}
            <div className="relative aspect-[4/3] md:aspect-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-black/50"></div>

              <img
                src="/images/influencer.jpeg"
                alt="AI Result Example"
                className="w-full h-full object-cover"
              />

              {/* Demo Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-8 text-center">
                  <div className="bg-black/60 backdrop-blur-sm border border-primary/20 rounded-xl p-6 shadow-xl">
                    <div className="mb-4">
                      <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h3 className="text-xl font-bold text-white">
                        AI-Generated Photo
                      </h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">
                      See yourself alongside {config.influencerName} in stunning
                      AI-generated photos
                    </p>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <div className="w-2 h-2 rounded-full bg-white/30"></div>
                      <div className="w-2 h-2 rounded-full bg-white/30"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Features & CTA */}
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Create Your{' '}
                  <span className="text-primary">Championship Moment</span>
                </h3>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="bg-primary/20 p-1 rounded-full mr-3 mt-0.5">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Multiple Pose Options
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Choose from celebrity, casual, and fan poses
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/20 p-1 rounded-full mr-3 mt-0.5">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Virtual Product Try-On
                      </h4>
                      <p className="text-gray-400 text-sm">
                        See yourself wearing official merchandise
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/20 p-1 rounded-full mr-3 mt-0.5">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        HD Quality Results
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Professional-grade images perfect for sharing
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* CTA Button */}
              <div>
                <Link
                  to="/ai-photo-generator"
                  className="w-full flex items-center justify-center bg-primary hover:bg-primary-600 text-black font-bold py-4 px-6 rounded-lg transition-all duration-200 group"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  {aiMediaGeneration.buttonText}
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-center text-gray-400 text-xs mt-3">
                  {aiMediaGeneration.requiresAuth ? 'Sign in required • ' : ''}
                  {aiMediaGeneration.usageLimit} free generations per month
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Feature Row */}
          <div className="grid grid-cols-4 divide-x divide-gray-800 border-t border-gray-800">
            {aiMediaGeneration.poseOptions.map((pose, index) => (
              <div
                key={pose.id}
                className="py-5 px-4 text-center hover:bg-gray-900/50 transition-colors"
              >
                <p className="text-white text-xs font-bold mb-1">
                  {pose.name.toUpperCase()}
                </p>
                <p className="text-gray-400 text-xs line-clamp-1">
                  {pose.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 text-center">
          <p className="text-gray-400 text-sm">
            <span className="text-primary font-medium">+5,000</span> photos
            generated this month
          </p>
          <span className="text-gray-600">•</span>
          <p className="text-gray-400 text-sm">
            <span className="text-primary font-medium">4.9/5</span> user
            satisfaction
          </p>
          <span className="text-gray-600">•</span>
          <p className="text-gray-400 text-sm">
            <span className="text-white font-medium">Try it yourself!</span>
          </p>
        </div>
      </div>
    </section>
  );
}
