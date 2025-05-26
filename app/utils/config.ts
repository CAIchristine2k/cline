// Main configuration file for influencer landing page
import { setTheme } from "~/lib/themeConfig";

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

export interface LandingPageConfig {
  // Brand & Influencer Details
  influencerName: string;
  influencerTitle: string;
  influencerBio: string;
  influencerImage: string;
  brandName: string;
  brandLogo: string;
  // Visual Theme
  brandStyle:
  | "luxury"
  | "sporty"
  | "casual"
  | "technical"
  | "minimalist"
  | "vibrant"
  | "custom";
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
  // Limited Edition
  limitedEdition?: {
    title: string;
    description: string;
    productHandle: string;
    originalPrice: string;
    salePrice: string;
    endDate: string; // ISO date string
  };
  // Products
  products: ProductInfo[];
  // Career Highlights
  careerHighlights: {
    year: string;
    title: string;
    description: string;
    image: string;
  }[];
  
  // Shopify Configuration
  shopify: {
    // Default collections to feature on the homepage and collection pages
    featuredCollections: ShopifyCollection[];
    // Default products to feature on the homepage
    featuredProducts: string[]; // Array of product handles
    // Collection to use for the main shop section
    mainCollectionHandle: string;
    // Collection for limited edition products
    limitedEditionCollectionHandle?: string;
    // Default sorting for collection pages
    defaultSorting: 'manual' | 'best-selling' | 'newest' | 'price-low-high' | 'price-high-low' | 'title-ascending' | 'title-descending';
    // Number of products to show per page in collection grids
    productsPerPage: number;
    // Enable customer accounts
    enableCustomerAccounts: boolean;
  };
  
  // Dynamically loaded Shopify collections (added during runtime)
  shopifyCollections?: ShopifyCollection[];
  
  // Testimonials
  testimonials?: {
    name: string;
    role?: string;
    content: string;
    image?: string;
    rating?: number;
  }[];
}

// Shane Mosley specific configuration
export const defaultConfig: LandingPageConfig = {
  // Brand & Influencer Details
  influencerName: "Shane Mosley",
  influencerTitle: "Boxing Legend & 9-Time World Champion",
  influencerBio:
    "Known as 'Sugar' Shane Mosley, one of boxing's most decorated champions with titles in three weight divisions and a legacy of spectacular performances against the sport's greatest names.",
  influencerImage: "/images/influencer.jpeg",
  brandName: "SUGAR SHANE",
  brandLogo: "/images/logo.png",

  // Visual Theme - Boxing champions typically go with luxury styling
  brandStyle: "luxury",
  heroBackgroundImage: "/images/hero-background.jpg",
  heroVideoUrl: "/videos/boxing-hero.mp4",

  // Content
  heroTitle: "CHAMPIONSHIP LEGACY",
  heroSubtitle:
    "Premium boxing equipment and apparel from a 9-time world champion",
  ctaText: "SHOP THE COLLECTION",
  ctaLink: "/collections",
  
  // Navigation
  navigation: [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/collections" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "#contact" },
  ],

  // Product Information
  mainProduct: {
    name: "Champion Gloves",
    description: "Professional-grade boxing gloves designed by Shane Mosley. Ideal for training and competition.",
    price: "$149.99",
    image: "/images/product-1.png",
    handle: "champion-gloves",
    features: [
      "Premium leather construction",
      "Perfect weight distribution",
      "Pro-level wrist support",
      "Sweat-resistant lining"
    ]
  },
  additionalProducts: [
    {
      name: "Sugar Shane Hoodie",
      description: "Comfortable and stylish hoodie featuring the Sugar Shane logo. Perfect for pre and post workout.",
      price: "$89.99",
      image: "/images/product-2.png",
      handle: "sugar-shane-hoodie",
      features: [
        "Premium cotton blend",
        "Embroidered logo",
        "Comfortable fit",
        "Available in multiple sizes"
      ]
    },
    {
      name: "Training DVD Set",
      description: "Complete training program featuring Shane's signature techniques and workout routines.",
      price: "$49.99",
      image: "/images/product-3.png",
      handle: "training-dvd-set",
      features: [
        "Over 10 hours of content",
        "Beginner to advanced techniques",
        "Fitness and conditioning routines",
        "Strategy and mental preparation"
      ]
    },
    {
      name: "Pro Hand Wraps",
      description: "Professional hand wraps used by Shane throughout his championship career.",
      price: "$24.99",
      image: "/images/product-4.png",
      handle: "pro-hand-wraps",
      features: [
        "Perfect length and elasticity",
        "Secure thumb loop",
        "Machine washable",
        "Prevents injuries"
      ]
    }
  ],

  // Social Media - using Shane's actual handles where possible
  instagramHandle: "sugarshanemosley",
  twitterHandle: "ShaneMosley_",
  youtubeChannel: "@SugarShaneM",
  tiktokHandle: "sugarshanemosley",
  
  // Social Links
  socialLinks: {
    instagram: "https://instagram.com/sugarshanemosley",
    twitter: "https://twitter.com/ShaneMosley_",
    youtube: "https://youtube.com/@SugarShaneM",
    tiktok: "https://tiktok.com/@sugarshanemosley"
  },

  // Contact Information
  contactEmail: "team@sugarshanemosley.com",
  contactInfo: {
    address: "123 Main St, Anytown, USA",
    phone: "(555) 123-4567",
    email: "team@sugarshanemosley.com"
  },
  newsletterEnabled: true,

  // Features & Sections
  showLimitedEdition: true,
  showCareerHighlights: true,
  showTestimonials: true,
  showSocialFeed: true,

  // Limited Edition
  limitedEdition: {
    title: "CHAMPIONSHIP COLLECTION",
    description: "Exclusive limited edition gloves signed by Shane Mosley. Only 100 pairs available. Each pair includes a certificate of authenticity.",
    productHandle: "championship-signed-gloves",
    originalPrice: "$249.99",
    salePrice: "$199.99",
    endDate: "2024-12-31T23:59:59", // ISO date string
  },

  // Products
  products: [
    {
      name: "Champion Gloves",
      description: "Professional-grade boxing gloves designed by Shane Mosley. Ideal for training and competition.",
      price: "$149.99",
      image: "/images/product-1.png",
      handle: "champion-gloves",
      label: "Bestseller",
      features: [
        "Premium leather construction",
        "Perfect weight distribution",
        "Pro-level wrist support",
        "Sweat-resistant lining"
      ]
    },
    {
      name: "Sugar Shane Hoodie",
      description: "Comfortable and stylish hoodie featuring the Sugar Shane logo. Perfect for pre and post workout.",
      price: "$89.99",
      image: "/images/product-2.png",
      handle: "sugar-shane-hoodie",
      label: "New",
      features: [
        "Premium cotton blend",
        "Embroidered logo",
        "Comfortable fit",
        "Available in multiple sizes"
      ]
    },
    {
      name: "Training DVD Set",
      description: "Complete training program featuring Shane's signature techniques and workout routines.",
      price: "$49.99",
      image: "/images/product-3.png",
      handle: "training-dvd-set",
      features: [
        "Over 10 hours of content",
        "Beginner to advanced techniques",
        "Fitness and conditioning routines",
        "Strategy and mental preparation"
      ]
    },
    {
      name: "Pro Hand Wraps",
      description: "Professional hand wraps used by Shane throughout his championship career.",
      price: "$24.99",
      image: "/images/product-4.png",
      handle: "pro-hand-wraps",
      features: [
        "Perfect length and elasticity",
        "Secure thumb loop",
        "Machine washable",
        "Prevents injuries"
      ]
    }
  ],
  
  // Career Highlights
  careerHighlights: [
    {
      year: "2000",
      title: "WBC Welterweight Champion",
      description: "Defeated Oscar De La Hoya to capture the WBC welterweight title in a stunning upset victory.",
      image: "/images/product-1.png"
    },
    {
      year: "2001", 
      title: "Unified Welterweight Champion",
      description: "Added the WBA and IBF welterweight titles to become the undisputed champion.",
      image: "/images/product-2.png"
    },
    {
      year: "2003",
      title: "Light Middleweight Champion", 
      description: "Moved up in weight to capture the WBA and WBC light middleweight titles.",
      image: "/images/product-3.png"
    },
    {
      title: "Professional Debut",
      year: "1993",
      description: "Made professional boxing debut, winning by TKO in the first round.",
      image: "/images/product-4.png"
    }
  ],
  
  // Shopify Configuration
  shopify: {
    featuredCollections: [
      {
        handle: "boxing-gloves",
        title: "Boxing Gloves",
        featured: true
      },
      {
        handle: "training-equipment",
        title: "Training Equipment",
        featured: true
      },
      {
        handle: "apparel",
        title: "Apparel",
        featured: true
      },
      {
        handle: "accessories",
        title: "Accessories",
        featured: false
      }
    ],
    featuredProducts: [
      "champion-gloves",
      "sugar-shane-hoodie",
      "pro-hand-wraps",
      "training-dvd-set"
    ],
    mainCollectionHandle: "featured",
    limitedEditionCollectionHandle: "limited-edition",
    defaultSorting: "manual",
    productsPerPage: 12,
    enableCustomerAccounts: true
  },
  
  // Testimonials
  testimonials: [
    {
      name: "John Doe",
      role: "Customer",
      content: "I absolutely love the products! Shane Mosley's boxing gloves are the best I've ever used. They fit perfectly and provide the support I need for training.",
      image: "/images/testimonial-1.jpg",
      rating: 5
    },
    {
      name: "Jane Smith",
      role: "Customer",
      content: "The Sugar Shane Hoodie is incredibly comfortable and stylish. It's perfect for pre and post workout.",
      image: "/images/testimonial-2.jpg",
      rating: 4
    },
    {
      name: "Bob Johnson",
      role: "Customer",
      content: "The Training DVD Set has been a game-changer for my boxing training. Shane's techniques and routines have improved my skills significantly.",
      image: "/images/testimonial-3.jpg",
      rating: 5
    }
  ]
};

/**
 * Initialize the landing page configuration
 *
 * @param customConfig Optional custom configuration to override defaults
 * @returns The final configuration
 */
export function initConfig(
  customConfig: Partial<LandingPageConfig> = {}
): LandingPageConfig {
  const config = { ...defaultConfig, ...customConfig };

  // Update social links from handles if not directly provided
  if (!customConfig.socialLinks) {
    config.socialLinks = {
      instagram: config.instagramHandle ? `https://instagram.com/${config.instagramHandle}` : undefined,
      twitter: config.twitterHandle ? `https://twitter.com/${config.twitterHandle}` : undefined,
      youtube: config.youtubeChannel ? `https://youtube.com/${config.youtubeChannel}` : undefined,
      tiktok: config.tiktokHandle ? `https://tiktok.com/@${config.tiktokHandle}` : undefined,
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

// Export the configuration
export default initConfig();