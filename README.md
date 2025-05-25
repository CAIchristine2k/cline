# Shane Hydrogen - Customizable Influencer Store Template

This is a highly customizable Shopify Hydrogen template for influencer stores, built with React, TypeScript, and Tailwind CSS. The template is designed to be easily customized through a central configuration system, making it simple to adapt for different influencers and brands.

## Features

- Centralized configuration for easy customization
- Multiple theme styles (luxury, sporty, casual, technical, minimalist, vibrant)
- Fully responsive design
- Integration with Shopify Storefront API
- Customizable sections that can be toggled on/off
- SEO optimized
- Smooth animations and transitions

## Customization

The template is designed to be customized primarily through its configuration system. The main configuration files are:

### 1. `app/utils/config.ts`

This file contains the main configuration for the landing page, including:

- Brand and influencer details
- Visual theme settings
- Content text and CTAs
- Product information
- Social media links
- Section visibility toggles

Example configuration:

```typescript
export const defaultConfig: LandingPageConfig = {
  // Brand & Influencer Details
  influencerName: "Shane Mosley",
  influencerTitle: "Boxing Legend & 9-Time World Champion",
  influencerBio: "Known as 'Sugar' Shane Mosley...",
  influencerImage: "/path/to/image.jpg",
  brandName: "SUGAR SHANE",
  brandLogo: "/images/logo.png",

  // Visual Theme
  brandStyle: "luxury", // Options: luxury, sporty, casual, technical, minimalist, vibrant, custom
  heroBackgroundImage: "/path/to/background.jpg",
  heroVideoUrl: "/path/to/video.mp4", // Optional

  // Content
  heroTitle: "CHAMPIONSHIP LEGACY",
  heroSubtitle: "Premium boxing equipment and apparel...",
  ctaText: "SHOP THE COLLECTION",
  ctaLink: "#shop",

  // Product Information, Social Media, etc.
  // ...

  // Features & Sections
  showLimitedEdition: true,
  showCareerHighlights: true,
  showTestimonials: true,
  showSocialFeed: true,
};
```

### 2. `app/utils/themeConfig.ts`

This file handles the theme styling, including:

- Color schemes for different brand styles
- CSS variable generation
- Dynamic theme application

### 3. `app/utils/styleUtils.ts`

Provides consistent styling utilities across components:

- Button styles
- Section styles
- Card styles
- Animation classes
- Inline style helpers

## How to Customize for a New Influencer

1. **Update Basic Information**:
   - Modify `app/utils/config.ts` with the new influencer's details
   - Update images, text, and links

2. **Choose a Theme Style**:
   - Set `brandStyle` to one of the available options (luxury, sporty, etc.)
   - For custom styling, use "custom" and define your own colors

3. **Configure Sections**:
   - Toggle sections on/off using the configuration toggles
   - Customize product information and imagery

4. **Connect Shopify Store**:
   - Update Shopify credentials in the appropriate environment files
   - The template will automatically fetch and display products from your Shopify store

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Customizing Components

While the template is designed to be customized primarily through configuration, you can also modify the React components directly if needed. The main components are located in `app/components/`.

## License

[MIT License](LICENSE) 