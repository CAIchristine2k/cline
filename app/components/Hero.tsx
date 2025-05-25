import React, { useEffect, useRef } from 'react';
import { ShoppingBag, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { getConfig, type LandingPageConfig } from '~/lib/config';

interface HeroProps {
  className?: string;
}

interface HeroStat {
  value: string;
  label: string;
}

export function Hero({ className = '' }: HeroProps) {
  const config = getConfig();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Create hero stats for Shane Mosley
  const heroStats: HeroStat[] = [
    { value: "9x", label: "World Champion" },
    { value: "47", label: "Total Wins" },
    { value: "39", label: "Knockouts" },
    { value: "3", label: "Weight Classes" }
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/shane-training.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 hero-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white hero-title-glow font-display tracking-tight">
              <span className="block text-primary-400">SUGAR</span>
              <span className="block text-white">SHANE</span>
              <span className="block text-primary-400">MOSLEY</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-neutral-200 font-light max-w-3xl mx-auto">
              {config.heroSubtitle}
            </p>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12"
          >
            {heroStats.map((stat: HeroStat, index: number) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-400 hero-stat-glow font-display">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-neutral-300 uppercase tracking-wider font-medium mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-4 text-lg font-semibold rounded-lg shadow-glow transition-all duration-300"
            >
              {config.ctaText}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
            >
              Watch Training Videos
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-primary-400 rounded-full mt-2"
              />
            </motion.div>
            <p className="text-primary-400 text-sm mt-2 font-medium">Scroll Down</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}