import React from 'react';
import {Sparkles, Camera} from 'lucide-react';
import {useConfig} from '~/utils/themeContext';
import {Link} from 'react-router';

export function AIMediaGeneration() {
  const config = useConfig();

  if (!config.showAIMediaGeneration || !config.aiMediaGeneration) {
    return null;
  }

  const {aiMediaGeneration} = config;

  return (
    <section className="py-16 bg-secondary/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        {/* Compact Hero */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-2 rounded-full mr-2">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <span className="text-primary text-sm font-bold tracking-wider uppercase">
              {aiMediaGeneration.subtitle}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {aiMediaGeneration.title}
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
            Upload your photo and see yourself with{' '}
            <span className="text-primary font-semibold">
              {config.influencerName}
            </span>{' '}
            in different poses or try on products virtually!
          </p>
        </div>

        {/* Preview Card */}
        <div className="max-w-4xl mx-auto bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-8 mb-8 shadow-md">
          {/* Before/After Demo - Simplified */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-8">
            {/* Before */}
            <div className="text-center">
              <div className="relative rounded-lg overflow-hidden h-36 mb-3 border border-secondary/60">
                <img
                  src="/images/testimonial-3.jpeg"
                  alt="Your photo"
                  className="w-full h-full object-cover bg-secondary"
                />
                <div className="absolute top-2 left-2 bg-secondary/70 px-2 py-1 rounded-md text-xs text-white font-medium">
                  YOUR PHOTO
                </div>
              </div>
              <p className="text-gray-300 text-xs">Upload any selfie</p>
            </div>

            {/* Arrow */}
            <div className="text-center">
              <div className="bg-primary/10 p-3 rounded-full mx-auto w-fit mb-2">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <p className="text-primary text-xs font-bold">
                AI TRANSFORMATION
              </p>
            </div>

            {/* After */}
            <div className="text-center">
              <div className="relative rounded-lg overflow-hidden h-36 mb-3 border border-primary/40">
                <img
                  src="/images/influencer.jpeg"
                  alt="AI result"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-primary/80 px-2 py-1 rounded-md">
                  <p className="text-background text-xs font-bold">AI RESULT</p>
                </div>
              </div>
              <p className="text-primary text-xs font-bold">
                You + {config.influencerName}
              </p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <div className="bg-secondary/50 border border-primary/10 rounded-md p-3 text-center">
              <p className="text-white text-xs font-bold mb-1">4 POSES</p>
              <p className="text-gray-400 text-xs">Training, Hugging & More</p>
            </div>
            <div className="bg-secondary/50 border border-primary/10 rounded-md p-3 text-center">
              <p className="text-white text-xs font-bold mb-1">TRY ON MERCH</p>
              <p className="text-gray-400 text-xs">Virtual Try-On Technology</p>
            </div>
            <div className="bg-secondary/50 border border-primary/10 rounded-md p-3 text-center">
              <p className="text-white text-xs font-bold mb-1">HD QUALITY</p>
              <p className="text-gray-400 text-xs">Professional Results</p>
            </div>
            <div className="bg-secondary/50 border border-primary/10 rounded-md p-3 text-center">
              <p className="text-white text-xs font-bold mb-1">EASY SHARING</p>
              <p className="text-gray-400 text-xs">Download & Post</p>
            </div>
          </div>

          {/* Main CTA */}
          <div className="text-center">
            <a
              href="/ai-photo-generator"
              className="inline-flex items-center bg-primary hover:bg-primary-600 text-background font-bold py-3 px-8 rounded-md text-md transition-all duration-200 shadow-sm"
            >
              <Camera className="w-5 h-5 mr-2" />
              {aiMediaGeneration.buttonText}
            </a>
            <p className="text-gray-400 text-xs mt-3">
              {aiMediaGeneration.requiresAuth ? 'Sign in required • ' : ''}
              {aiMediaGeneration.usageLimit} free generations per month
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
