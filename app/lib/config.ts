// Configuration system for Sugar Shane landing page
export interface ProductInfo {
  name: string;
  description: string;
  price: string;
  image: string;
  label?: string;
  features?: string[];
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
  brandStyle: 'luxury' | 'sporty' | 'casual' | 'technical' | 'minimalist' | 'vibrant' | 'custom';
  heroBackgroundImage: string;
  
  // Content
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  ctaLink: string;
  
  // Product Information
  mainProduct: ProductInfo;
  additionalProducts?: ProductInfo[];
  products: ProductInfo[];
  
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
}

// Sugar Shane specific configuration
export const sugarShaneConfig: LandingPageConfig = {
  // Brand & Influencer Details
  influencerName: "Shane Mosley",
  influencerTitle: "Boxing Legend & 9-Time World Champion",
  influencerBio: "Known as 'Sugar' Shane Mosley, one of boxing's most decorated champions with titles in three weight divisions and a legacy of spectacular performances against the sport's greatest names.",
  influencerImage: "/images/shane-portrait.jpg",
  brandName: "Sugar Shane",
  brandLogo: "/images/logo.png",
  
  // Visual Theme
  brandStyle: "luxury",
  heroBackgroundImage: "/videos/boxing-hero.mp4",
  
  // Content
  heroTitle: "THE LEGACY OF SUGAR SHANE",
  heroSubtitle: "Premium boxing gear and exclusive merchandise inspired by one of the greatest pound-for-pound fighters in boxing history.",
  ctaText: "SHOP THE COLLECTION",
  ctaLink: "#shop",
  
  // Product Information
  mainProduct: {
    name: "Signature Boxing Gloves",
    description: "Professional-grade boxing gloves worn by Shane during his championship fights.",
    price: "$299.99",
    image: "/images/product-1.png",
    label: "SIGNATURE",
    features: [
      "Premium leather construction",
      "Championship-grade padding",
      "Autographed by Shane Mosley",
      "Limited edition numbering"
    ]
  },
  
  // Social Media
  instagramHandle: "sugarshanemosley",
  twitterHandle: "ShaneMosley_",
  youtubeChannel: "SugarShaneM",
  
  // Contact Information
  contactEmail: "contact@sugarshanemosley.store",
  newsletterEnabled: true,
  
  // Features & Sections
  showLimitedEdition: true,
  showCareerHighlights: true,
  showTestimonials: true,
  showSocialFeed: true,
  
  // Products
  products: [
    {
      name: "Signature Boxing Gloves",
      description: "Professional-grade boxing gloves worn by Shane during his championship fights.",
      price: "$299.99",
      image: "/images/product-1.png",
      label: "SIGNATURE",
      features: [
        "Premium leather construction",
        "Championship-grade padding",
        "Autographed by Shane Mosley",
        "Limited edition numbering"
      ]
    },
    {
      name: "Championship Belt Replica",
      description: "Exact replica of Shane's IBF Welterweight Championship belt.",
      price: "$499.99",
      image: "/images/product-2.png",
      label: "EXCLUSIVE",
      features: [
        "Real gold plating",
        "Authentic weight and size",
        "Engraved nameplate",
        "Display case included"
      ]
    },
    {
      name: "Training Headgear",
      description: "Professional training headgear used in Shane's training camps.",
      price: "$149.99",
      image: "/images/product-3.png",
      features: [
        "Superior head protection",
        "Comfortable fit",
        "Durable construction",
        "Professional grade"
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