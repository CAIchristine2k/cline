// Main configuration file for influencer landing page
import {setTheme} from '~/lib/themeConfig';

// Navigation item type
export interface NavigationItem {
  name: string;
  href: string;
}

// Influencer and product configuration
export interface ProductInfo {
  name: string;
  description: string;
  price?: string;
  image: string;
  features?: string[];
  label?: string;
  handle?: string; // Shopify product handle
}

// Shopify-specific collection configuration
export interface ShopifyCollection {
  handle: string;
  title: string;
  description?: string;
  featured?: boolean;
  id?: string;
}

// Add the pose options interface
interface AIGenerationPose {
  id: string;
  name: string;
  description: string;
  icon?: string; // Lucide icon name
}

interface AIGenerationProduct {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  price: string;
}

export interface LandingPageConfig {
  // Brand & Influencer Details
  influencerName: string;
  influencerTitle: string;
  influencerBio: string;
  influencerImage: string;
  brandName: string;
  brandLogo: string;
  industry?: string;
  // Visual Theme
  brandStyle:
    | 'luxury'
    | 'sporty'
    | 'casual'
    | 'technical'
    | 'minimalist'
    | 'vibrant'
    | 'custom';
  heroBackgroundImage: string;
  heroVideoUrl?: string; // Optional video URL for background
  // Content
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  ctaLink: string;
  // Navigation
  navigation: NavigationItem[];
  // Product Information
  mainProduct: ProductInfo;
  additionalProducts?: ProductInfo[];
  // Social Media
  instagramHandle?: string;
  twitterHandle?: string;
  youtubeChannel?: string;
  tiktokHandle?: string;
  // Social Links (processed from social media handles)
  socialLinks: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
    facebook?: string;
    website?: string;
  };
  // Contact Information
  contactEmail?: string;
  contactInfo?: {
    address?: string;
    phone?: string;
    email?: string;
  };
  newsletterEnabled: boolean;
  // Features & Sections
  showLimitedEdition: boolean;
  showCareerHighlights: boolean;
  showTestimonials: boolean;
  showSocialFeed: boolean;
  showAIMediaGeneration: boolean;

  // Customizable Products
  customizableProducts?: {
    title?: string;
    subtitle?: string;
    badgeText?: string;
    showcaseTitle?: string;
    showcaseTitleHighlight?: string;
    showcaseDescription?: string;
    features?: string[];
    ctaText?: string;
    ctaLink?: string;
    showcaseImage?: string;
    showcaseImageAlt?: string;
    viewAllText?: string;
    viewAllLink?: string;
  };

  // Testimonials
  testimonials?: Array<{
    name: string;
    role?: string;
    content: string;
    image?: string;
    rating?: number;
  }>;

  // Layout & UI Configuration
  layout: {
    cart: {
      width: {
        mobile: string;
        tablet: string;
        desktop: string;
      };
      maxWidth: {
        mobile: string;
        tablet: string;
        desktop: string;
      };
      minWidth: string;
      itemsAreaMaxHeight: string;
      itemsAreaMinHeight: string;
      summaryMinHeight: string;
    };
    header: {
      height: {
        mobile: string;
        desktop: string;
      };
      blur: boolean;
    };
    spacing: {
      containerPadding: string;
      sectionSpacing: string;
      cardSpacing: string;
    };
  };

  // AI Media Generation
  aiMediaGeneration: {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    influencerReferenceImage: string; // Image of influencer for AI generation
    placeholderText: string;
    successMessage: string;
    errorMessage: string;
    processingMessage: string;
    shareText?: string; // Optional text for sharing generated content
    maxFileSize: number; // in MB
    allowedFormats: string[];
    features: string[];
    // Pose options
    poseOptions: AIGenerationPose[];
    // Product try-on options
    productOptions: AIGenerationProduct[];
    // Authentication and limits
    requiresAuth: boolean; // Require user authentication
    usageLimit: number; // Maximum generations per user per month
    resetPeriod: 'monthly' | 'weekly' | 'daily'; // How often limits reset
    loginPromptTitle: string;
    loginPromptMessage: string;
    limitReachedTitle: string;
    limitReachedMessage: string;
  };

  // Limited Edition
  limitedEdition: {
    title: string;
    description: string;
    productHandle: string;
    originalPrice: string;
    salePrice: string;
    endDate: string; // ISO date string
  };

  // Career Highlights
  careerHighlights: Array<{
    year: string;
    title: string;
    description: string;
    image?: string;
  }>;

  // Shopify Configuration
  shopify: {
    featuredCollections: Array<{
      handle: string;
      title: string;
      featured: boolean;
    }>;
    featuredProducts: string[];
    mainCollectionHandle: string;
    limitedEditionCollectionHandle: string;
    defaultSorting: string;
    productsPerPage: number;
    enableCustomerAccounts: boolean;
  };

  // Products
  products: ProductInfo[];

  // Dynamically loaded Shopify collections (added during runtime)
  shopifyCollections?: Array<{
    handle: string;
    title: string;
    featured: boolean;
  }>;
}

// Shane Mosley specific configuration
export const defaultConfig: LandingPageConfig = {
  // Brand & Influencer Details
  influencerName: 'Shane Mosley',
  influencerTitle: 'Boxing Legend & 9-Time World Champion',
  influencerBio:
    "Known as 'Sugar' Shane Mosley, one of boxing's most decorated champions with titles in three weight divisions and a legacy of spectacular performances against the sport's greatest names.",
  influencerImage: '/images/influencer.jpeg',
  brandName: 'SUGAR SHANE',
  brandLogo: '/images/logo.png',
  industry: 'boxing',

  // Visual Theme - Boxing champions typically go with luxury styling
  brandStyle: 'luxury',
  heroBackgroundImage: '/images/hero-background.jpg',
  heroVideoUrl: '/videos/boxing-hero.mp4',

  // Content
  heroTitle: 'CHAMPIONSHIP LEGACY',
  heroSubtitle:
    'Premium boxing equipment and apparel from a 9-time world champion',
  ctaText: 'SHOP THE COLLECTION',
  ctaLink: '/collections/all',

  // Navigation
  navigation: [
    {name: 'Home', href: '/'},
    {name: 'Shop', href: '/collections/all'},
    {name: 'About', href: '/about'},
    {name: 'Career', href: '#career'},
    {name: 'Contact', href: '#newsletter'},
  ],

  // Product Information
  mainProduct: {
    name: 'Champion Gloves',
    description:
      'Professional-grade boxing gloves designed by Shane Mosley. Ideal for training and competition.',
    price: '$149.99',
    image: '/images/product-1.png',
    handle: 'champion-gloves',
    features: [
      'Premium leather construction',
      'Perfect weight distribution',
      'Pro-level wrist support',
      'Sweat-resistant lining',
    ],
  },
  additionalProducts: [
    {
      name: 'Sugar Shane Hoodie',
      description:
        'Comfortable and stylish hoodie featuring the Sugar Shane logo. Perfect for pre and post workout.',
      price: '$89.99',
      image: '/images/product-2.png',
      handle: 'sugar-shane-hoodie',
      features: [
        'Premium cotton blend',
        'Embroidered logo',
        'Comfortable fit',
        'Available in multiple sizes',
      ],
    },
    {
      name: 'Training DVD Set',
      description:
        "Complete training program featuring Shane's signature techniques and workout routines.",
      price: '$49.99',
      image: '/images/product-3.png',
      handle: 'training-dvd-set',
      features: [
        'Over 10 hours of content',
        'Beginner to advanced techniques',
        'Fitness and conditioning routines',
        'Strategy and mental preparation',
      ],
    },
    {
      name: 'Pro Hand Wraps',
      description:
        'Professional hand wraps used by Shane throughout his championship career.',
      price: '$24.99',
      image: '/images/product-4.png',
      handle: 'pro-hand-wraps',
      features: [
        'Perfect length and elasticity',
        'Secure thumb loop',
        'Machine washable',
        'Prevents injuries',
      ],
    },
  ],

  // Social Media - using Shane's actual handles where possible
  instagramHandle: 'sugarshanemosley',
  twitterHandle: 'ShaneMosley_',
  youtubeChannel: '@SugarShaneM',
  tiktokHandle: 'sugarshanemosley',

  // Social Links
  socialLinks: {
    instagram: 'https://instagram.com/sugarshanemosley',
    twitter: 'https://twitter.com/ShaneMosley_',
    youtube: 'https://youtube.com/@SugarShaneM',
    tiktok: 'https://tiktok.com/@sugarshanemosley',
  },

  // Contact Information
  contactEmail: 'team@sugarshanemosley.com',
  contactInfo: {
    address: '123 Main St, Anytown, USA',
    phone: '(555) 123-4567',
    email: 'team@sugarshanemosley.com',
  },
  newsletterEnabled: true,

  // Features & Sections
  showLimitedEdition: true,
  showCareerHighlights: true,
  showTestimonials: true,
  showSocialFeed: true,
  showAIMediaGeneration: true,

  // Customizable Products
  customizableProducts: {
    title: 'Customize Your Own',
    subtitle:
      'Create one-of-a-kind products featuring your own photos, text, and designs.',
    badgeText: 'Personalization',
    showcaseTitle: 'Create Custom Products',
    showcaseTitleHighlight: 'Your Way',
    showcaseDescription:
      'Upload your photos, add text, and personalize our products with our easy-to-use design tool.',
    features: [
      'Upload your own photos',
      'Add custom text and styling',
      'Choose colors and designs',
    ],
    ctaText: 'Start Designing',
    ctaLink: '/customize-products',
    showcaseImage: '/images/customization-preview.jpg',
    showcaseImageAlt: 'Product customization preview',
    viewAllText: 'View All Customizable Products',
    viewAllLink: '/customize-products',
  },

  // Layout & UI Configuration
  layout: {
    cart: {
      width: {
        mobile: '100vw',
        tablet: 'min(85vw, 380px)',
        desktop: 'min(90vw, 420px)',
      },
      maxWidth: {
        mobile: '100vw',
        tablet: '380px',
        desktop: '420px',
      },
      minWidth: '320px',
      itemsAreaMaxHeight: 'calc(100vh - 350px)',
      itemsAreaMinHeight: '200px',
      summaryMinHeight: '150px',
    },
    header: {
      height: {
        mobile: '60px',
        desktop: '80px',
      },
      blur: true,
    },
    spacing: {
      containerPadding: '1rem',
      sectionSpacing: '4rem',
      cardSpacing: '1.5rem',
    },
  },

  // AI Media Generation
  aiMediaGeneration: {
    title: 'TRAIN WITH THE CHAMP',
    subtitle: 'AI-Powered Fan Experience',
    description:
      'Upload your photo and see yourself training alongside Sugar Shane Mosley using cutting-edge AI technology. Create your own championship moment!',
    buttonText: 'Generate My Training Photo',
    influencerReferenceImage: '/images/influencer.jpeg',
    placeholderText: 'Upload your photo to get started',
    successMessage: 'Your training photo is ready! Check it out below.',
    errorMessage:
      'Something went wrong generating your photo. Please try again.',
    processingMessage:
      'Creating your championship moment... This may take a few minutes.',
    shareText:
      'Check out my AI-generated training photo with Sugar Shane Mosley! 🥊✨',
    maxFileSize: 10,
    allowedFormats: ['jpg', 'jpeg', 'png'],
    features: [
      'High-quality AI generation',
      'Instant training scenarios',
      'Shareable results',
      'Multiple poses available',
    ],
    // Pose options
    poseOptions: [
      {
        id: 'training',
        name: 'Training Session',
        description: 'Train with the champion',
        icon: 'dumbbell',
      },
      {
        id: 'hugging',
        name: 'Meet & Greet',
        description: 'Photo with Sugar Shane Mosley',
        icon: 'users',
      },
      {
        id: 'heart',
        name: 'Fan Love',
        description: 'Show your support with a heart gesture',
        icon: 'heart',
      },
      {
        id: 'try-on',
        name: 'Virtual Try-On',
        description: 'Try on official merchandise',
        icon: 'shirt',
      },
    ],
    // Product try-on options
    productOptions: [
      {
        id: 'product-1',
        name: 'Championship Tee',
        description: 'Official championship t-shirt',
        imagePath: '/images/product-1.png',
        price: '$39.99',
      },
      {
        id: 'product-2',
        name: 'Training Hoodie',
        description: 'Premium training hoodie',
        imagePath: '/images/product-2.png',
        price: '$59.99',
      },
      {
        id: 'product-3',
        name: 'Elite Jersey',
        description: 'Elite fighter jersey',
        imagePath: '/images/product-3.png',
        price: '$79.99',
      },
      {
        id: 'product-4',
        name: 'Limited Cap',
        description: 'Limited edition cap',
        imagePath: '/images/product-4.png',
        price: '$34.99',
      },
    ],
    // Authentication and limits
    requiresAuth: true,
    usageLimit: 10,
    resetPeriod: 'monthly',
    loginPromptTitle: 'Authentication Required',
    loginPromptMessage: 'Please log in to generate more photos.',
    limitReachedTitle: 'Usage Limit Reached',
    limitReachedMessage:
      "You've reached the maximum number of photos you can generate this month.",
  },

  // Limited Edition
  limitedEdition: {
    title: 'CHAMPIONSHIP COLLECTION',
    description:
      'Exclusive limited edition gloves signed by Shane Mosley. Only 100 pairs available. Each pair includes a certificate of authenticity.',
    productHandle: 'championship-signed-gloves',
    originalPrice: '$249.99',
    salePrice: '$199.99',
    endDate: '2024-12-31T23:59:59', // ISO date string
  },

  // Products
  products: [
    {
      name: 'Champion Gloves',
      description:
        'Professional-grade boxing gloves designed by Shane Mosley. Ideal for training and competition.',
      price: '$149.99',
      image: '/images/product-1.png',
      handle: 'champion-gloves',
      label: 'Bestseller',
      features: [
        'Premium leather construction',
        'Perfect weight distribution',
        'Pro-level wrist support',
        'Sweat-resistant lining',
      ],
    },
    {
      name: 'Sugar Shane Hoodie',
      description:
        'Comfortable and stylish hoodie featuring the Sugar Shane logo. Perfect for pre and post workout.',
      price: '$89.99',
      image: '/images/product-2.png',
      handle: 'sugar-shane-hoodie',
      label: 'New',
      features: [
        'Premium cotton blend',
        'Embroidered logo',
        'Comfortable fit',
        'Available in multiple sizes',
      ],
    },
    {
      name: 'Training DVD Set',
      description:
        "Complete training program featuring Shane's signature techniques and workout routines.",
      price: '$49.99',
      image: '/images/product-3.png',
      handle: 'training-dvd-set',
      features: [
        'Over 10 hours of content',
        'Beginner to advanced techniques',
        'Fitness and conditioning routines',
        'Strategy and mental preparation',
      ],
    },
    {
      name: 'Pro Hand Wraps',
      description:
        'Professional hand wraps used by Shane throughout his championship career.',
      price: '$24.99',
      image: '/images/product-4.png',
      handle: 'pro-hand-wraps',
      features: [
        'Perfect length and elasticity',
        'Secure thumb loop',
        'Machine washable',
        'Prevents injuries',
      ],
    },
  ],

  // Career Highlights
  careerHighlights: [
    {
      year: '2000',
      title: 'WBC Welterweight Champion',
      description:
        'Defeated Oscar De La Hoya to capture the WBC welterweight title in a stunning upset victory.',
      image: '/images/product-1.png',
    },
    {
      year: '2001',
      title: 'Unified Welterweight Champion',
      description:
        'Added the WBA and IBF welterweight titles to become the undisputed champion.',
      image: '/images/product-2.png',
    },
    {
      year: '2003',
      title: 'Light Middleweight Champion',
      description:
        'Moved up in weight to capture the WBA and WBC light middleweight titles.',
      image: '/images/product-3.png',
    },
    {
      title: 'Professional Debut',
      year: '1993',
      description:
        'Made professional boxing debut, winning by TKO in the first round.',
      image: '/images/product-4.png',
    },
  ],

  // Shopify Configuration
  shopify: {
    featuredCollections: [
      {
        handle: 'boxing-gloves',
        title: 'Boxing Gloves',
        featured: true,
      },
      {
        handle: 'training-equipment',
        title: 'Training Equipment',
        featured: true,
      },
      {
        handle: 'apparel',
        title: 'Apparel',
        featured: true,
      },
      {
        handle: 'accessories',
        title: 'Accessories',
        featured: false,
      },
    ],
    featuredProducts: [
      'champion-gloves',
      'sugar-shane-hoodie',
      'pro-hand-wraps',
      'training-dvd-set',
    ],
    mainCollectionHandle: 'featured',
    limitedEditionCollectionHandle: 'limited-edition',
    defaultSorting: 'manual',
    productsPerPage: 12,
    enableCustomerAccounts: true,
  },

  // Testimonials
  testimonials: [
    {
      name: 'Marcus Rodriguez',
      role: 'Amateur Boxer',
      content:
        "Training with Shane's techniques has completely transformed my boxing game. The AI photo feature is incredible - seeing myself train alongside the champ is pure motivation!",
      image: '/images/testimonial-2.jpeg',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      content:
        "The Sugar Shane gear is top quality, and the AI training photos are such a unique experience. It's like having a personal session with a legend!",
      image: '/images/testimonial-3.jpeg',
      rating: 5,
    },
    {
      name: 'Tony Martinez',
      role: 'Boxing Coach',
      content:
        "My students love generating AI photos with Shane. It's become a huge motivation tool in our gym. The quality is incredible and it brings real excitement to training.",
      image: '/images/social-feed-1.jpeg',
      rating: 5,
    },
  ],
};

/**
 * Initialize the landing page configuration
 *
 * @param customConfig Optional custom configuration to override defaults
 * @returns The final configuration
 */
export function initConfig(
  customConfig: Partial<LandingPageConfig> = {},
): LandingPageConfig {
  const config = {...defaultConfig, ...customConfig};

  // Update social links from handles if not directly provided
  if (!customConfig.socialLinks) {
    config.socialLinks = {
      instagram: config.instagramHandle
        ? `https://instagram.com/${config.instagramHandle}`
        : undefined,
      twitter: config.twitterHandle
        ? `https://twitter.com/${config.twitterHandle}`
        : undefined,
      youtube: config.youtubeChannel
        ? `https://youtube.com/${config.youtubeChannel}`
        : undefined,
      tiktok: config.tiktokHandle
        ? `https://tiktok.com/@${config.tiktokHandle}`
        : undefined,
    };
  }

  // Initialize theme based on config
  setTheme({
    brandName: config.brandName,
    brandStyle: config.brandStyle,
    brandLogo: config.brandLogo,
    influencerName: config.influencerName,
    influencerTitle: config.influencerTitle,
    influencerImage: config.influencerImage,
    socialLinks: config.socialLinks,
  });

  return config;
}

/**
 * Get the current configuration - can be extended to support multiple influencers
 */
export function getConfig(influencerId?: string): LandingPageConfig {
  // For now, return default Shane Mosley config
  // Later this can be extended to support multiple influencers
  return defaultConfig;
}

// Export the configuration
export default initConfig();
