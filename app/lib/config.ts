// Main configuration file for influencer landing page - Hydrogen version
// This centralizes all content, theming, and brand configuration

export interface ProductInfo {
  name: string;
  description: string;
  price?: string;
  handle?: string; // Shopify product handle
  image: string;
  features?: string[];
  label?: string;
  shopifyId?: string; // Shopify product ID
}

export interface SocialLinks {
  instagram?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  facebook?: string;
  website?: string;
}

export interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
}

export interface NavigationItem {
  name: string;
  href: string;
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
  brandStyle: "luxury" | "sporty" | "casual" | "technical" | "minimalist" | "vibrant" | "custom";
  heroBackgroundImage: string;
  heroVideoUrl?: string;
  
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
  socialLinks: SocialLinks;
  
  // Contact Information
  contactEmail?: string;
  contactInfo?: ContactInfo;
  newsletterEnabled: boolean;
  
  // Features & Sections
  showLimitedEdition: boolean;
  showCareerHighlights: boolean;
  showTestimonials: boolean;
  showSocialFeed: boolean;
  
  // Shopify Store Configuration
  shopDomain: string;
  shopifyCollections?: any[]; // Shopify collections from API
  
  // Products with Shopify integration
  products: ProductInfo[];
  
  // Career highlights for athletes/influencers
  careerHighlights: Array<{
    year: string;
    title: string;
    description: string;
    image?: string;
  }>;
  
  // Testimonials
  testimonials: Array<{
    name: string;
    role?: string;
    content: string;
    image?: string;
    rating?: number;
  }>;
  
  // Limited edition configuration
  limitedEdition?: {
    title: string;
    description: string;
    endDate: string;
    productHandle: string;
    originalPrice: string;
    salePrice: string;
  };
}

// Shane Mosley specific configuration
export const defaultConfig: LandingPageConfig = {
  // Brand & Influencer Details
  influencerName: "Shane Mosley",
  influencerTitle: "Boxing Legend & 9-Time World Champion",
  influencerBio: "Known as 'Sugar' Shane Mosley, one of boxing's most decorated champions with titles in three weight divisions and a legacy of spectacular performances against the sport's greatest names.",
  influencerImage: "https://images.unsplash.com/photo-1516150486159-4f71b8189d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDMwMTF8MHwxfHNlYXJjaHwxfHxib3hpbmclMjBjaGFtcGlvbiUyMHRyYWluaW5nfGVufDB8MHx8fDE3NDc4NjQ1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  brandName: "SUGAR SHANE",
  brandLogo: "/images/logo.png",

  // Visual Theme
  brandStyle: "luxury",
  heroBackgroundImage: "https://images.unsplash.com/photo-1516150486159-4f71b8189d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDMwMTF8MHwxfHNlYXJjaHwxfHxib3hpbmclMjBjaGFtcGlvbiUyMHRyYWluaW5nfGVufDB8MHx8fDE3NDc4NjQ1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  heroVideoUrl: "/videos/boxing-hero.mp4",

  // Content
  heroTitle: "CHAMPIONSHIP LEGACY",
  heroSubtitle: "Premium boxing equipment and apparel from a 9-time world champion",
  ctaText: "SHOP THE COLLECTION",
  ctaLink: "#shop",

  // Navigation
  navigation: [
    { name: "Home", href: "#" },
    { name: "Shop", href: "#shop" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ],
  
  // Product Information
  mainProduct: {
    name: "Champion Gloves",
    description: "Professional-grade boxing gloves designed by Shane Mosley. Ideal for training and competition.",
    price: "$149.99",
    handle: "champion-gloves",
    image: "/images/product-1.png",
    features: [
      "Premium leather construction",
      "Perfect weight distribution", 
      "Pro-level wrist support",
      "Sweat-resistant lining"
    ],
    label: "Bestseller"
  },

  // Social Media
  socialLinks: {
    instagram: "https://instagram.com/sugarshanemosley",
    twitter: "https://twitter.com/ShaneMosley_",
    youtube: "https://youtube.com/@SugarShaneM",
    tiktok: "https://tiktok.com/@sugarshanemosley"
  },

  // Contact Information
  contactEmail: "team@sugarshanemosley.com",
  contactInfo: {
    address: "123 Champion St, Boxingtown, BX 12345",
    phone: "+1 (234) 567-8901",
    email: "contact@sugarshanemosley.com"
  },
  newsletterEnabled: true,

  // Features & Sections
  showLimitedEdition: true,
  showCareerHighlights: true,
  showTestimonials: true,
  showSocialFeed: true,

  // Shopify Store Configuration
  shopDomain: "sugar-shane.myshopify.com",

  // Products
  products: [
    {
      name: "Champion Gloves",
      description: "Professional-grade boxing gloves designed by Shane Mosley.",
      price: "$149.99",
      handle: "champion-gloves",
      image: "/images/product-1.png",
      label: "Bestseller",
      features: ["Premium leather construction", "Perfect weight distribution", "Pro-level wrist support"]
    },
    {
      name: "Sugar Shane Hoodie", 
      description: "Comfortable and stylish hoodie featuring the Sugar Shane logo.",
      price: "$89.99",
      handle: "sugar-shane-hoodie",
      image: "/images/product-2.png",
      label: "New",
      features: ["Premium cotton blend", "Embroidered logo", "Comfortable fit"]
    },
    {
      name: "Training DVD Set",
      description: "Complete training program featuring Shane's signature techniques.",
      price: "$49.99", 
      handle: "training-dvd-set",
      image: "/images/product-3.png",
      features: ["Over 10 hours of content", "Beginner to advanced techniques", "Fitness routines"]
    },
    {
      name: "Pro Hand Wraps",
      description: "Professional hand wraps used by Shane throughout his career.",
      price: "$24.99",
      handle: "pro-hand-wraps", 
      image: "/images/product-4.png",
      features: ["Perfect length and elasticity", "Secure thumb loop", "Machine washable"]
    }
  ],

  // Career Highlights
  careerHighlights: [
    {
      year: "2000",
      title: "WBC Welterweight Champion",
      description: "Defeated Oscar De La Hoya to capture the WBC welterweight title in a stunning upset victory.",
      image: "/images/career-1.jpg"
    },
    {
      year: "2001", 
      title: "Unified Welterweight Champion",
      description: "Added the WBA and IBF welterweight titles to become the undisputed champion.",
      image: "/images/career-2.jpg"
    },
    {
      year: "2003",
      title: "Light Middleweight Champion", 
      description: "Moved up in weight to capture the WBA and WBC light middleweight titles.",
      image: "/images/career-3.jpg"
    }
  ],

  // Testimonials
  testimonials: [
    {
      name: "Mike Rodriguez",
      role: "Professional Boxer",
      content: "Shane's equipment helped take my training to the next level. The quality is unmatched.",
      rating: 5
    },
    {
      name: "Sarah Johnson", 
      role: "Boxing Trainer",
      content: "I recommend Shane's gear to all my students. The attention to detail shows his championship experience.",
      rating: 5
    },
    {
      name: "Carlos Martinez",
      role: "Amateur Fighter", 
      content: "Using the same gear as a legend like Shane gives me confidence in the ring.",
      rating: 5
    }
  ],

  // Limited Edition
  limitedEdition: {
    title: "CHAMPIONSHIP EDITION GLOVES",
    description: "Limited edition replica of the gloves Shane wore during his championship fights. Only 100 pairs available.",
    endDate: "2025-06-01T00:00:00Z",
    productHandle: "championship-edition-gloves",
    originalPrice: "$299.99",
    salePrice: "$199.99"
  }
};

/**
 * Get the current configuration - can be extended to support multiple influencers
 */
export function getConfig(influencerId?: string): LandingPageConfig {
  // For now, return default Shane Mosley config
  // Later this can be extended to support multiple influencers
  return defaultConfig;
}

export default defaultConfig;