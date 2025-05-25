# Sugar Shane Mosley - Hydrogen Landing Page Template

A highly customizable, production-ready influencer/product landing page template built with Shopify's Hydrogen React framework. Originally designed for boxing legend Sugar Shane Mosley, this template can be easily adapted for any influencer, athlete, or brand.

## 🚀 Features

- **🎨 Dynamic Theming System** - 6 pre-built themes (Luxury, Sporty, Casual, Technical, Minimalist, Vibrant)
- **⚡ Hydrogen Framework** - Built on Shopify's modern React framework with GraphQL
- **🎬 Smooth Animations** - Framer Motion powered animations throughout
- **📱 Fully Responsive** - Mobile-first design that works on all devices
- **🛒 E-commerce Ready** - Integrated with Shopify's commerce platform
- **🔧 Easy Customization** - Live theme switcher and configuration panel
- **⚡ Performance Optimized** - Built with Vite and optimized for speed
- **♿ Accessible** - Built with semantic HTML and accessibility in mind

## 🎨 Theme System

### Pre-built Themes

1. **Luxury** (Default) - Gold & Black, perfect for premium brands
2. **Sporty** - Red & Blue, high-energy athletic vibe
3. **Casual** - Soft colors, relaxed and approachable
4. **Technical** - Cyan & Pink, modern tech aesthetic
5. **Minimalist** - Clean & Simple, pure and focused
6. **Vibrant** - Colorful & Bold, eye-catching and energetic

### Live Theme Switching

- **Theme Switcher**: Click the palette icon (bottom-right) to switch themes instantly
- **Config Panel**: Development mode panel (top-right) for real-time customization
- **CSS Variables**: Automatic CSS custom property generation for seamless styling

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Shopify store (for products and data)

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd shane-hydrogen

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Shopify Integration

1. **Connect Your Store**: Update `.env` with your Shopify store credentials
2. **Configure GraphQL**: The template uses Shopify's Storefront API
3. **Products**: Products are automatically pulled from your Shopify store

## 🛠️ Customization Guide

### Quick Configuration

Edit `app/utils/config.ts` to customize the landing page:

```typescript
export const defaultConfig: LandingPageConfig = {
  // Brand & Influencer Details
  influencerName: "Your Influencer Name",
  influencerTitle: "Professional Title",
  influencerBio: "Brief bio description...",
  brandName: "YOUR BRAND",
  brandLogo: "/images/logo.png",
  
  // Visual Theme
  brandStyle: "luxury", // Choose: luxury, sporty, casual, technical, minimalist, vibrant
  heroBackgroundImage: "/images/hero-bg.jpg",
  
  // Content
  heroTitle: "YOUR HERO TITLE",
  heroSubtitle: "Your compelling subtitle...",
  ctaText: "SHOP NOW",
  ctaLink: "#shop",
  
  // Social Media
  instagramHandle: "yourusername",
  twitterHandle: "yourusername",
  youtubeChannel: "@yourchannel",
  tiktokHandle: "yourusername",
  
  // Features Toggle
  showLimitedEdition: true,
  showCareerHighlights: true,
  showTestimonials: true,
  showSocialFeed: true,
};
```

### Advanced Customization

1. **Colors**: Modify `app/utils/themeConfig.ts` to create custom color schemes
2. **Components**: Edit components in `app/components/` to change layout and functionality
3. **Animations**: Customize animations in `app/utils/animations.tsx`
4. **Styling**: Update Tailwind config in `tailwind.config.ts`

### Adding Your Content

#### Images
Place your images in `public/images/`:
- `logo.png` - Brand logo
- `hero-bg.jpg` - Hero background image
- `product-*.png` - Product images
- `testimonial-*.jpg` - Testimonial photos
- `social-feed-*.jpg` - Social media feed images

#### Products
Products are automatically pulled from your Shopify store via GraphQL. Update the queries in your route files if needed.

## 🎬 Animation System

The template includes a comprehensive animation system using Framer Motion:

```tsx
import {AnimatedSection, StaggerContainer, StaggerItem} from '~/utils/animations';

// Animated section with various effects
<AnimatedSection variant="fadeInUp" delay={0.2}>
  <YourContent />
</AnimatedSection>

// Staggered animations for multiple items
<StaggerContainer>
  <StaggerItem><Item1 /></StaggerItem>
  <StaggerItem><Item2 /></StaggerItem>
  <StaggerItem><Item3 /></StaggerItem>
</StaggerContainer>
```

## 📱 Responsive Design

The template uses a mobile-first approach with Tailwind CSS:

- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Responsive Text**: Use `responsiveText()` utility for consistent scaling
- **Flexible Layouts**: CSS Grid and Flexbox for adaptable layouts

## 🚀 Performance

- **Lazy Loading**: Images and components load when needed
- **Code Splitting**: Automatic route-based code splitting
- **Optimized Images**: WebP format with fallbacks
- **Minimal JavaScript**: Only load what's necessary

## 🔧 Development Tools

### Live Customization
- **Theme Switcher**: Test different themes instantly
- **Config Panel**: Real-time content editing (development only)
- **Hot Reload**: Instant updates during development

### Code Quality
```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# GraphQL codegen
npm run codegen
```

## 📁 Project Structure

```
shane-hydrogen/
├── app/
│   ├── components/          # React components
│   │   ├── Hero.tsx        # Hero section
│   │   ├── ProductShowcase.tsx
│   │   ├── Testimonials.tsx
│   │   └── ...
│   ├── routes/             # Route handlers
│   ├── utils/              # Utilities and configuration
│   │   ├── config.ts       # Main configuration
│   │   ├── themeConfig.ts  # Theme system
│   │   ├── animations.tsx  # Animation utilities
│   │   └── cn.ts           # Class name utilities
│   └── styles/             # CSS styles
├── public/
│   └── images/             # Static images
└── ...
```

## 🎯 Sections Overview

1. **Hero**: Full-screen introduction with stats and CTAs
2. **Product Showcase**: Featured products from Shopify
3. **Career Highlights**: Achievements and milestones
4. **Limited Edition**: Special offers with countdown timer
5. **Testimonials**: Customer reviews and feedback
6. **Social Feed**: Instagram-style content grid
7. **Newsletter**: Email signup with animations

## 🌐 Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 📄 License

This template is provided as-is for educational and commercial use. Customize freely for your projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 🆘 Support

For questions or issues:
1. Check the documentation
2. Review the code comments
3. Open an issue on GitHub

---

**Built with ❤️ using Shopify Hydrogen, React, TypeScript, Tailwind CSS, and Framer Motion.**
