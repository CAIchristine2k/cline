// Main configuration file for influencer landing page
import { setTheme } from "./themeConfig";

// Influencer and product configuration
export interface ProductInfo {
  name: string;
  description: string;
  price?: string;
  image: string;
  features?: string[];
  label?: string;
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
  // Content
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  ctaLink: string;
  // Product Information
  mainProduct: ProductInfo;
  additionalProducts?: ProductInfo[];
  // Social Media
  instagramHandle?: string;
  twitterHandle?: string;
  youtubeChannel?: string;
  tiktokHandle?: string;
  // Contact Information
  contactEmail?: string;
  newsletterEnabled: boolean;
  // Features & Sections
  showLimitedEdition: boolean;
  showCareerHighlights: boolean;
  showTestimonials: boolean;
  showSocialFeed: boolean;
  // Products
  products: ProductInfo[];
}

// Shane Mosley specific configuration
export const defaultConfig: LandingPageConfig = {
  // Brand & Influencer Details
  influencerName: "Shane Mosley",
  influencerTitle: "Boxing Legend & 9-Time World Champion",
  influencerBio:
    "Known as 'Sugar' Shane Mosley, one of boxing's most decorated champions with titles in three weight divisions and a legacy of spectacular performances against the sport's greatest names.",
  influencerImage: "https://images.unsplash.com/photo-1516150486159-4f71b8189d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDMwMTF8MHwxfHNlYXJjaHwxfHxib3hpbmclMjBjaGFtcGlvbiUyMHRyYWluaW5nfGVufDB8MHx8fDE3NDc4NjQ1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  brandName: "SUGAR SHANE",
  brandLogo: "/images/logo.png",

  // Visual Theme - Boxing champions typically go with luxury styling
  brandStyle: "luxury",
  heroBackgroundImage: "https://images.unsplash.com/photo-1516150486159-4f71b8189d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDMwMTF8MHwxfHNlYXJjaHwxfHxib3hpbmclMjBjaGFtcGlvbiUyMHRyYWluaW5nfGVufDB8MHx8fDE3NDc4NjQ1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",

  // Content
  heroTitle: "CHAMPIONSHIP LEGACY",
  heroSubtitle:
    "Premium boxing equipment and apparel from a 9-time world champion",
  ctaText: "SHOP THE COLLECTION",
  ctaLink: "#shop",

  // Product Information
  mainProduct: {
    name: "Champion Gloves",
    description: "Professional-grade boxing gloves designed by Shane Mosley. Ideal for training and competition.",
    price: "$149.99",
    image: "/images/product-1.png",
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

  // Contact Information
  contactEmail: "team@sugarshanemosley.com",
  newsletterEnabled: true,

  // Features & Sections
  showLimitedEdition: true,
  showCareerHighlights: true,
  showTestimonials: true,
  showSocialFeed: true,

  // Products
  products: [
    {
      name: "Champion Gloves",
      description: "Professional-grade boxing gloves designed by Shane Mosley. Ideal for training and competition.",
      price: "$149.99",
      image: "/images/product-1.png",
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
      features: [
        "Perfect length and elasticity",
        "Secure thumb loop",
        "Machine washable",
        "Prevents injuries"
      ]
    }
  ],
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

  // Initialize theme based on config
  setTheme({
    brandName: config.brandName,
    brandStyle: config.brandStyle,
    brandLogo: config.brandLogo,
    influencerName: config.influencerName,
    influencerTitle: config.influencerTitle,
    influencerImage: config.influencerImage,
    socialLinks: {
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
    },
  });

  return config;
}

// Export the configuration
export default initConfig();