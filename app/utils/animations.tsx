import React, {ReactNode} from 'react';
import {motion, MotionProps} from 'framer-motion';

// Common animation variants
export const fadeInUp = {
  initial: {opacity: 0, y: 60},
  animate: {opacity: 1, y: 0},
  transition: {duration: 0.6, ease: 'easeOut'},
};

export const fadeInDown = {
  initial: {opacity: 0, y: -60},
  animate: {opacity: 1, y: 0},
  transition: {duration: 0.6, ease: 'easeOut'},
};

export const fadeInLeft = {
  initial: {opacity: 0, x: -60},
  animate: {opacity: 1, x: 0},
  transition: {duration: 0.6, ease: 'easeOut'},
};

export const fadeInRight = {
  initial: {opacity: 0, x: 60},
  animate: {opacity: 1, x: 0},
  transition: {duration: 0.6, ease: 'easeOut'},
};

export const fadeIn = {
  initial: {opacity: 0},
  animate: {opacity: 1},
  transition: {duration: 0.6, ease: 'easeOut'},
};

export const scaleIn = {
  initial: {opacity: 0, scale: 0.8},
  animate: {opacity: 1, scale: 1},
  transition: {duration: 0.6, ease: 'easeOut'},
};

export const slideInUp = {
  initial: {y: 100, opacity: 0},
  animate: {y: 0, opacity: 1},
  transition: {duration: 0.8, ease: 'easeOut'},
};

// Stagger children animation
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Hover animations
export const hoverScale = {
  whileHover: {scale: 1.05},
  whileTap: {scale: 0.95},
  transition: {duration: 0.2},
};

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 0 25px rgba(212, 175, 55, 0.4)',
    transition: {duration: 0.3},
  },
};

// Animation wrapper components
interface AnimatedSectionProps extends MotionProps {
  children: ReactNode;
  className?: string;
  variant?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn' | 'slideInUp';
  delay?: number;
}

export function AnimatedSection({
  children,
  className = '',
  variant = 'fadeInUp',
  delay = 0,
  ...props
}: AnimatedSectionProps) {
  const variants = {
    fadeInUp,
    fadeInDown,
    fadeInLeft,
    fadeInRight,
    fadeIn,
    scaleIn,
    slideInUp,
  };

  const selectedVariant = variants[variant];
  const animation = {
    initial: selectedVariant.initial,
    animate: selectedVariant.animate,
    transition: {
      ...selectedVariant.transition,
      delay,
    },
  };

  return (
    <motion.div
      whileInView="animate"
      viewport={{once: true, amount: 0.3}}
      className={className}
      {...animation}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Staggered children container
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{once: true, amount: 0.3}}
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Individual stagger item
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  variant?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn';
}

export function StaggerItem({
  children,
  className = '',
  variant = 'fadeInUp',
}: StaggerItemProps) {
  const variants = {
    fadeInUp,
    fadeInDown,
    fadeInLeft,
    fadeInRight,
    fadeIn,
    scaleIn,
  };

  return (
    <motion.div variants={variants[variant]} className={className}>
      {children}
    </motion.div>
  );
}

// Animated counter
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({
  value,
  duration = 2,
  className = '',
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) {
  return (
    <motion.span
      className={className}
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      viewport={{once: true}}
      transition={{duration: 0.5}}
    >
      <motion.span
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        viewport={{once: true}}
        transition={{duration}}
        onUpdate={(latest) => {
          if (typeof latest.opacity === 'number') {
            const currentValue = Math.round(latest.opacity * value);
            const element = document.querySelector(`[data-counter="${value}"]`);
            if (element) {
              element.textContent = `${prefix}${currentValue}${suffix}`;
            }
          }
        }}
      />
      <span data-counter={value}>
        {prefix}
        {value}
        {suffix}
      </span>
    </motion.span>
  );
}

// Page transition wrapper
export function PageTransition({children}: {children: ReactNode}) {
  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: -20}}
      transition={{duration: 0.3}}
    >
      {children}
    </motion.div>
  );
} 