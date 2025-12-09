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
  showTrainingSection: boolean;

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
    // Photo ordering features
    enablePrinting?: boolean;
    printProductId?: string;
    printProductName?: string;
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

  // Training Programs
  trainingPrograms?: Array<{
    id: string;
    title: string;
    description: string;
    link: string;
    icon?: string;
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

// Cline store configuration
export const defaultConfig: LandingPageConfig = {
  // Brand & Influencer Details
  influencerName: 'Cline',
  influencerTitle: 'Créatrice & Designer',
  influencerBio:
    "Créatrice passionnée proposant des produits personnalisés et uniques pour célébrer vos moments spéciaux.",
  influencerImage: '/images/cline.jpg',
  brandName: 'CLINE',
  brandLogo: '/images/logo.png',
  industry: 'lifestyle',

  // Visual Theme
  brandStyle: 'luxury',
  heroBackgroundImage: '/images/cline5.jpg',
  heroVideoUrl: '/videos/vid.mp4',

  // Content
  heroTitle: 'CRÉATIONS PERSONNALISÉES',
  heroSubtitle:
    'Des produits uniques et personnalisés pour vos moments spéciaux',
  ctaText: 'DÉCOUVRIR LA COLLECTION',
  ctaLink: '/collections/all',

  // Navigation
  navigation: [
    {name: 'Accueil', href: '/'},
    {name: 'Boutique', href: '/products'},
    {name: 'À Propos', href: '/about'},
    {name: 'Contact', href: '/pages/contact'},
  ],

  // Product Information
  mainProduct: {
    name: 'Produit Personnalisé',
    description:
      'Créez votre propre produit unique avec nos options de personnalisation.',
    price: '$49.99',
    image: '/images/product-1.png',
    handle: 'custom-product',
    features: [
      'Personnalisation complète',
      'Qualité premium',
      'Design unique',
      'Livraison rapide',
    ],
  },
  additionalProducts: [
    {
      name: 'Décoration Murale',
      description:
        'Décorations murales personnalisées pour embellir votre intérieur.',
      price: '$39.99',
      image: '/images/product-2.png',
      handle: 'wall-decoration',
      features: [
        'Impression haute qualité',
        'Différentes tailles disponibles',
        'Installation facile',
        'Résistant aux UV',
      ],
    },
    {
      name: 'Carte Personnalisée',
      description:
        'Cartes de vœux personnalisées pour toutes les occasions.',
      price: '$9.99',
      image: '/images/product-3.png',
      handle: 'custom-card',
      features: [
        'Design sur mesure',
        'Papier premium',
        'Enveloppe incluse',
        'Livraison rapide',
      ],
    },
    {
      name: 'Cadeau Photo',
      description:
        'Transformez vos photos en cadeaux mémorables.',
      price: '$29.99',
      image: '/images/product-4.png',
      handle: 'photo-gift',
      features: [
        'Plusieurs formats disponibles',
        'Qualité professionnelle',
        'Emballage soigné',
        'Idéal pour offrir',
      ],
    },
  ],

  // Social Media
  instagramHandle: 'c_line.cheveux',
  twitterHandle: '',
  youtubeChannel: '',
  tiktokHandle: '',

  // Social Links
  socialLinks: {
    instagram: 'https://www.instagram.com/c_line.cheveux/',
    twitter: undefined,
    youtube: undefined,
    tiktok: undefined,
  },

  // Contact Information
  contactEmail: 'contact@clineshop.com',
  contactInfo: {
    address: '',
    phone: '',
    email: 'contact@clineshop.com',
  },
  newsletterEnabled: true,

  // Features & Sections
  showLimitedEdition: true,
  showCareerHighlights: true,
  showTestimonials: true,
  showSocialFeed: true,
  showAIMediaGeneration: true,
  showTrainingSection: true,

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
    title: 'EXPÉRIENCE PHOTO IA',
    subtitle: 'Création photo avec Intelligence Artificielle',
    description:
      'Téléchargez votre photo et créez des moments uniques avec la technologie IA de pointe.',
    buttonText: 'Générer Ma Photo',
    influencerReferenceImage: '/images/cline.jpg',
    placeholderText: 'Téléchargez votre photo pour commencer',
    successMessage: 'Votre photo est prête ! Découvrez le résultat ci-dessous.',
    errorMessage:
      'Une erreur s\'est produite lors de la génération. Veuillez réessayer.',
    processingMessage:
      'Création de votre photo en cours... Cela peut prendre quelques minutes.',
    shareText:
      'Découvrez ma photo générée par IA ! ✨',
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
        id: 'celebrity',
        name: 'Style Célébrité',
        description: 'Photo avec effet professionnel',
        icon: 'users',
      },
      {
        id: 'hugging',
        name: 'Rencontre',
        description: 'Photo de rencontre conviviale',
        icon: 'users',
      },
      {
        id: 'heart',
        name: 'Avec Cœur',
        description: 'Affichez votre style avec un geste de cœur',
        icon: 'heart',
      },
      {
        id: 'try-on',
        name: 'Essayage Virtuel',
        description: 'Essayez des produits virtuellement',
        icon: 'shirt',
      },
    ],
    // Photo ordering features
    enablePrinting: true,
    printProductId: 'ai-photo-print',
    printProductName: 'AI Photo Print',
    // Product try-on options
    productOptions: [
      {
        id: 'product-1',
        name: 'T-Shirt Premium',
        description: 'T-shirt de qualité supérieure',
        imagePath: '/images/product-1.png',
        price: '$39.99',
      },
      {
        id: 'product-2',
        name: 'Sweat à Capuche',
        description: 'Sweat confortable et élégant',
        imagePath: '/images/product-2.png',
        price: '$59.99',
      },
      {
        id: 'product-3',
        name: 'Vêtement Personnalisé',
        description: 'Vêtement unique personnalisé',
        imagePath: '/images/product-3.png',
        price: '$79.99',
      },
      {
        id: 'product-4',
        name: 'Casquette',
        description: 'Casquette édition limitée',
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
    title: 'COLLECTION LIMITÉE',
    description:
      'Produits exclusifs en édition limitée. Quantité limitée disponible. Chaque produit inclut un certificat d\'authenticité.',
    productHandle: 'limited-edition-product',
    originalPrice: '$99.99',
    salePrice: '$79.99',
    endDate: '2025-12-31T23:59:59', // ISO date string
  },

  // Products
  products: [
    {
      name: 'Produit Personnalisé Premium',
      description:
        'Créez votre produit unique avec nos options de personnalisation complètes.',
      price: '$49.99',
      image: '/images/product-1.png',
      handle: 'custom-product-premium',
      label: 'Bestseller',
      features: [
        'Personnalisation complète',
        'Qualité supérieure',
        'Design sur mesure',
        'Livraison rapide',
      ],
    },
    {
      name: 'Décoration Murale',
      description:
        'Décorations murales personnalisées pour embellir votre intérieur.',
      price: '$39.99',
      image: '/images/product-2.png',
      handle: 'wall-decoration',
      label: 'Nouveau',
      features: [
        'Impression haute qualité',
        'Différentes tailles',
        'Installation facile',
        'Résistant aux UV',
      ],
    },
    {
      name: 'Carte Personnalisée',
      description:
        'Cartes de vœux personnalisées pour toutes vos occasions spéciales.',
      price: '$9.99',
      image: '/images/product-3.png',
      handle: 'custom-card',
      features: [
        'Design sur mesure',
        'Papier premium',
        'Enveloppe incluse',
        'Livraison rapide',
      ],
    },
    {
      name: 'Cadeau Photo',
      description:
        'Transformez vos photos préférées en cadeaux mémorables et uniques.',
      price: '$29.99',
      image: '/images/product-4.png',
      handle: 'photo-gift',
      features: [
        'Plusieurs formats',
        'Qualité professionnelle',
        'Emballage soigné',
        'Idéal pour offrir',
      ],
    },
  ],

  // Career Highlights
  careerHighlights: [
    {
      year: '2024',
      title: 'Lancement Cline Shop',
      description:
        'Ouverture de la boutique en ligne avec une collection de produits personnalisés uniques.',
      image: '/images/cline1.jpg',
    },
    {
      year: '2024',
      title: 'Collection Naissance',
      description:
        'Lancement de notre collection spéciale naissance pour célébrer les nouveaux arrivés.',
      image: '/images/naissance.png',
    },
    {
      year: '2024',
      title: 'Collection Fêtes',
      description:
        'Introduction de produits personnalisés pour toutes vos célébrations.',
      image: '/images/bgfete.png',
    },
    {
      title: '50K Clients Satisfaits',
      year: '2025',
      description:
        'Plus de 50 000 clients ont fait confiance à nos créations personnalisées.',
      image: '/images/50kclient.png',
    },
  ],

  // Training Programs
  trainingPrograms: [
    {
      id: 'personal',
      title: 'PERSONNALISATION',
      description:
        'Créez vos produits uniques avec notre outil de personnalisation complet',
      icon: 'palette',
      link: '/customize-products',
    },
    {
      id: 'masterclass',
      title: 'COLLECTIONS SPÉCIALES',
      description:
        'Découvrez nos collections thématiques pour toutes vos occasions',
      icon: 'gift',
      link: '/collections/all',
    },
    {
      id: 'community',
      title: 'COMMUNAUTÉ CLINE',
      description:
        'Rejoignez notre communauté et accédez à des offres et événements exclusifs',
      icon: 'users',
      link: '/about',
    },
  ],

  // Shopify Configuration
  shopify: {
    featuredCollections: [
      {
        handle: 'personnalisation',
        title: 'Personnalisation',
        featured: true,
      },
      {
        handle: 'naissance',
        title: 'Naissance',
        featured: true,
      },
      {
        handle: 'fetes',
        title: 'Fêtes',
        featured: true,
      },
      {
        handle: 'accessoires',
        title: 'Accessoires',
        featured: false,
      },
    ],
    featuredProducts: [
      'custom-product-premium',
      'wall-decoration',
      'custom-card',
      'photo-gift',
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
      name: 'Marie Dubois',
      role: 'Cliente Fidèle',
      content:
        "Les produits personnalisés de Cline sont incroyables ! J'ai commandé plusieurs créations pour ma famille et la qualité est toujours au rendez-vous. Le service client est exceptionnel.",
      image: '/images/testimonial-2.jpeg',
      rating: 5,
    },
    {
      name: 'Sophie Martin',
      role: 'Maman Comblée',
      content:
        "J'ai adoré personnaliser les faire-part de naissance de mon bébé avec Cline. Le rendu est magnifique et l'outil de personnalisation est très facile à utiliser !",
      image: '/images/testimonial-3.jpeg',
      rating: 5,
    },
    {
      name: 'Lucas Petit',
      role: 'Client Satisfait',
      content:
        "Service impeccable et produits de qualité supérieure. J'ai commandé des décorations murales personnalisées et je suis ravi du résultat. Je recommande vivement !",
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
 * Get the current configuration - can be extended to support multiple stores
 */
export function getConfig(storeId?: string): LandingPageConfig {
  // For now, return default Cline config
  // Later this can be extended to support multiple stores
  return defaultConfig;
}

// Export the configuration
export default initConfig();
