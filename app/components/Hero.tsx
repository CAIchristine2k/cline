import React, {useState, useEffect} from 'react';
import {Play, Star, Trophy, Users, Calendar} from 'lucide-react';
import {useConfig} from '~/utils/themeContext';
import {AnimatedSection, StaggerContainer, StaggerItem, AnimatedCounter} from '~/utils/animations';
import {cn, responsiveText, container} from '~/utils/cn';
import {motion} from 'framer-motion';

export function Hero() {
  const config = useConfig();
  const [currentVideoTime, setCurrentVideoTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        {config.heroBackgroundImage && (
          <motion.div
            initial={{scale: 1.1, opacity: 0}}
            animate={{scale: 1, opacity: 0.6}}
            transition={{duration: 1.5, ease: 'easeOut'}}
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${config.heroBackgroundImage})`,
            }}
          />
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
      </div>

      {/* Content */}
      <div className={cn('relative z-10 text-center', container('5xl'))}>
        <StaggerContainer className="max-w-5xl mx-auto" staggerDelay={0.2}>
          {/* Championship Badge */}
          <StaggerItem>
            <div className="inline-flex items-center space-x-2 bg-gold-500/20 backdrop-blur-sm border border-gold-500/30 rounded-full px-6 py-3 mb-8">
              <Trophy className="h-5 w-5 text-gold-500" />
              <span className="text-gold-500 font-bold text-sm uppercase tracking-wider">
                {config.influencerTitle}
              </span>
            </div>
          </StaggerItem>

          {/* Main Heading */}
          <StaggerItem>
            <h1 className={cn(
              'font-bold mb-6 leading-tight',
              responsiveText('7xl')
            )}>
              <span className="text-white">{config.heroTitle}</span>
            </h1>
          </StaggerItem>

          {/* Subtitle */}
          <StaggerItem>
            <p className={cn(
              'text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed',
              responsiveText('xl')
            )}>
              {config.heroSubtitle}
            </p>
          </StaggerItem>

          {/* Stats - Dynamic based on influencer */}
          <StaggerItem>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              <motion.div 
                className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg p-4"
                whileHover={{
                  scale: 1.05,
                  borderColor: 'rgb(212, 175, 55)',
                  transition: {duration: 0.2}
                }}
              >
                <AnimatedCounter 
                  value={49} 
                  className="text-2xl md:text-3xl font-bold text-gold-500 mb-1 block"
                />
                <div className="text-sm text-gray-400 uppercase tracking-wider">Total Fights</div>
              </motion.div>
              <motion.div 
                className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg p-4"
                whileHover={{
                  scale: 1.05,
                  borderColor: 'rgb(212, 175, 55)',
                  transition: {duration: 0.2}
                }}
              >
                <AnimatedCounter 
                  value={39} 
                  className="text-2xl md:text-3xl font-bold text-gold-500 mb-1 block"
                />
                <div className="text-sm text-gray-400 uppercase tracking-wider">Wins</div>
              </motion.div>
              <motion.div 
                className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg p-4"
                whileHover={{
                  scale: 1.05,
                  borderColor: 'rgb(212, 175, 55)',
                  transition: {duration: 0.2}
                }}
              >
                <AnimatedCounter 
                  value={30} 
                  className="text-2xl md:text-3xl font-bold text-gold-500 mb-1 block"
                />
                <div className="text-sm text-gray-400 uppercase tracking-wider">Knockouts</div>
              </motion.div>
              <motion.div 
                className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg p-4"
                whileHover={{
                  scale: 1.05,
                  borderColor: 'rgb(212, 175, 55)',
                  transition: {duration: 0.2}
                }}
              >
                <AnimatedCounter 
                  value={3} 
                  className="text-2xl md:text-3xl font-bold text-gold-500 mb-1 block"
                />
                <div className="text-sm text-gray-400 uppercase tracking-wider">World Titles</div>
              </motion.div>
            </div>
          </StaggerItem>

          {/* Call to Action Buttons */}
          <StaggerItem>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <motion.button
                onClick={() => scrollToSection('shop')}
                className="group bg-gold-500 hover:bg-gold-400 text-black font-bold py-4 px-8 rounded-sm transition-all duration-300 flex items-center space-x-2 uppercase tracking-wider shadow-2xl"
                whileHover={{scale: 1.05, boxShadow: '0 0 25px rgba(212, 175, 55, 0.5)'}}
                whileTap={{scale: 0.95}}
              >
                <Trophy className="h-5 w-5" />
                <span>{config.ctaText}</span>
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('career')}
                className="group bg-transparent hover:bg-white/10 text-white border-2 border-white hover:border-gold-500 hover:text-gold-500 font-bold py-4 px-8 rounded-sm transition-all duration-300 flex items-center space-x-2 uppercase tracking-wider backdrop-blur-sm"
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
              >
                <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span>Watch Legacy</span>
              </motion.button>
            </div>
          </StaggerItem>

          {/* Social Proof */}
          <StaggerItem>
            <div className="flex items-center justify-center space-x-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-gold-500 fill-current" />
                <span className="text-sm">
                  <span className="text-gold-500 font-bold">4.9</span> Champion Rating
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-gold-500" />
                <span className="text-sm">
                  <span className="text-gold-500 font-bold">50K+</span> Boxing Fans
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gold-500" />
                <span className="text-sm">
                  <span className="text-gold-500 font-bold">30+</span> Years Legacy
                </span>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>

      {/* Scroll Indicator */}
      <AnimatedSection 
        variant="fadeIn" 
        delay={1.5}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-gold-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gold-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </AnimatedSection>

      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div 
        className="absolute bottom-40 right-20 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </section>
  );
}