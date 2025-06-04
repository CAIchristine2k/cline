# 🚀 Shopify Hydrogen + Cloudflare Workers - AI Coding Guide

## 🎯 Quick Project Context
**Type**: Shopify Hydrogen e-commerce template with influencer customization  
**Platform**: Cloudflare Workers (NOT Oxygen)  
**Stack**: React Router v7 + TypeScript + Tailwind v4 + Shopify APIs  
**Purpose**: Customizable influencer storefronts with AI media generation

---

## ⚡ CRITICAL CODING RULES

### 📦 Import Patterns (MANDATORY)
```typescript
// ✅ ALWAYS USE - React Router v7
import { useLoaderData, Link, Form } from 'react-router';
import { useConfig } from '~/utils/themeContext';

// ❌ NEVER USE - Legacy Remix
import { useLoaderData, Link, Form } from '@remix-run/react';
import { useLoaderData, Link, Form } from 'react-router-dom';
```

### 🏗️ Component Creation Pattern
```typescript
// Standard component structure
import { useConfig } from '~/utils/themeContext';
import { Link } from 'react-router';

export function MyComponent() {
  const config = useConfig(); // Get central config
  
  return (
    <div className="custom-layout">
      <h1 className="text-primary">{config.customText}</h1>
      {/* Custom implementation */}
    </div>
  );
}
```

### 🎨 Styling Approach
1. **Use Tailwind v4 classes first**
2. **Reference CSS variables**: `bg-primary`, `text-primary`, etc.
3. **Custom CSS for complex styling**
4. **Config integration optional** (components can override)

### 🖌️ UI Design System Patterns
1. **Interactive elements**: Use gradients with soft shadows
   ```tsx
   className="bg-gradient-to-br from-blue-600 to-primary shadow-sm shadow-primary/20"
   ```
2. **Hover effects**: Scale transforms + backdrop glow
   ```tsx
   className="group hover:scale-105"
   // With inner element
   className="group-hover:scale-110 transition-transform"
   ```
3. **Icon containers**: Circular with subtle backdrop blur
   ```tsx
   <div className="bg-white/10 backdrop-blur-sm rounded-full p-1">
     <Icon className="w-4 h-4 text-white" />
   </div>
   ```
4. **Action buttons**: Square aspect ratio for visual balance
   ```tsx
   className="aspect-square bg-secondary/70 hover:bg-secondary disabled:opacity-40"
   ```
5. **Card patterns**: Consistent rounding, borders, and shadows
   ```tsx
   className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-xl overflow-hidden shadow-lg"
   ```

---

## 🏭 Infrastructure & Deployment

### Cloudflare Workers Setup
- **Entry Point**: `workers/app.ts`
- **Config**: `wrangler.jsonc` 
- **Deploy**: `npm run deploy`
- **Types**: Auto-generated in `types/worker-configuration.d.ts`

### Development Commands
```bash
npm run dev          # Local development
npm run build        # Production build  
npm run deploy       # Deploy to Cloudflare
npm run typecheck    # Full type checking
npm run codegen      # Regenerate GraphQL types
```

### Environment Variables
- Access via `context.env.VARIABLE_NAME` in routes
- Defined in `types/worker-configuration.d.ts`
- Local: `.env` and `.dev.vars`

---

## 📁 Project Structure Guide

### Core Directories
```
app/
├── components/     # 40+ UI components (ALL EDITABLE)
├── routes/         # 40+ route handlers (ALL EDITABLE)
├── utils/          # Config + theme utilities
├── lib/            # Core libraries + context
├── providers/      # React context providers
├── hooks/          # Custom React hooks
├── graphql/        # GraphQL queries
└── styles/         # Global CSS + variables

workers/            # Cloudflare Workers entry
docs/              # Documentation + examples
types/             # TypeScript definitions
public/            # Static assets
```

### Key Files for Quick Reference
- **Config**: `app/utils/config.ts`
- **Theme**: `app/lib/themeConfig.ts` + `app/utils/themeContext.tsx`
- **Workers**: `workers/app.ts`
- **Types**: `types/worker-configuration.d.ts`

---

## 🧩 Component Categories

### Core UI Components (Priority 1)
```typescript
// Navigation & Layout
Header.tsx, Footer.tsx, PageLayout.tsx, Logo.tsx

// Product Display
ProductCard.tsx, ProductItem.tsx, ProductDetail.tsx, ProductForm.tsx
CustomizableProductCard.tsx, CustomizableProductGrid.tsx
ProductShowcase.tsx, ProductImage.tsx, ProductPrice.tsx

// Shopping Cart
CartMain.tsx, CartSummary.tsx, CartLineItem.tsx, CartAside.tsx
AddToCartButton.tsx

// Search
SearchBar.tsx, SearchForm.tsx, SearchResults.tsx
SearchResultsPredictive.tsx, SearchFormPredictive.tsx
```

### Feature Components (Priority 2)
```typescript
// AI & Customization
AIMediaGeneration.tsx, ProductDesigner.tsx, EnhancedProductDesigner.tsx

// Content Sections  
Hero.tsx, Testimonials.tsx, SocialFeed.tsx, NewsletterSignup.tsx
LimitedEdition.tsx, CareerHighlights.tsx

// Utilities
Toast.tsx, LoadingSpinner.tsx, AuthPrompt.tsx, ClientOnly.tsx
WishlistButton.tsx, Aside.tsx, CollectionHeader.tsx
```

---

## 🛣️ Route Structure Patterns

### Core Routes (Most Common)
```typescript
// Homepage
($locale)._index.tsx

// Product & Collections
($locale).products.$handle.tsx
($locale).collections.$handle.tsx
($locale).collections.all.tsx         // "Shop All" products collection
// IMPORTANT: Never use ($locale).collections._index.tsx or ($locale).collections.index.tsx directly
// as we're operating in a multi-storefront environment and collections are store-specific

// Cart & Search
($locale).cart.tsx
($locale).search.tsx

// Account Management
($locale).account.tsx
($locale).account._index.tsx
($locale).account.profile.tsx
```

### Multi-Storefront Considerations
```typescript
// DO NOT use these patterns:
- Link directly to "/collections" (use "/collections/all" instead)
- Try to display all collections from multiple storefronts
- Create collection routes that aren't store-specific

// Collections in multi-storefront setup
- Each storefront has its own unique collections
- Always link to specific collection handles: "/collections/{handle}"
- Use "/collections/all" as the primary browsing route
- Redirect generic "/collections" routes to "/collections/all"
```

### API Routes (Server-side)
```typescript
// AI Generation
api.ai-media-generation.tsx         // Create AI task
api.ai-media-generation.$taskId.tsx // Check status
api.ai-media-generation.auth.tsx    // Auth check

// File & Design Management
api.upload-image.tsx                 // Image uploads
api.save-design.tsx                  // Save custom designs
```

### Specialty Routes
```typescript
// Product Customization
customize-product.$productHandle.tsx
customize-products.tsx

// AI Photo Generator
ai-photo-generator.tsx

// SEO & Technical
($locale).[sitemap.xml].tsx
[robots.txt].tsx
```

---

## 🎛️ Configuration System

### Central Config Usage
```typescript
// Get config in components
const config = useConfig();

// Available config properties
config.brandName              // Brand name
config.influencerName         // Influencer name  
config.brandStyle             // Style theme
config.heroTitle             // Homepage title
config.showAIMediaGeneration // Feature flags
config.layout.cart.width     // Layout settings
```

### Theme System
```typescript
// Access theme utilities
import { useTheme, useUpdateConfig } from '~/utils/themeContext';

const { theme, setTheme } = useTheme();
const updateConfig = useUpdateConfig();

// CSS variables available
className="bg-primary text-primary border-primary"
```

### Customization Approach
1. **Start with config** for rapid changes
2. **Override in components** for custom needs
3. **Edit components directly** for unique requirements
4. **Full customization** always possible

---

## 🤖 AI Features Implementation

### AI Media Generation Flow
1. **Route**: `ai-photo-generator.tsx` - Main interface
2. **API**: `api.ai-media-generation.tsx` - Create tasks
3. **Polling**: `api.ai-media-generation.$taskId.tsx` - Check status
4. **Auth**: `api.ai-media-generation.auth.tsx` - Verify access

### KlingAI API Status Codes
- **submitted**: Initial state when task is created
- **processing**: Task is actively being processed by KlingAI
- **succeed**: Task has completed successfully ✅ (Note: NOT "completed")
- **failed**: Task has failed to process ❌

### KlingAI Polling Best Practices
```typescript
// Start polling with a shorter interval (3 seconds) 
pollInterval = setInterval(poll, 3000);

// Check for both status conditions
if (statusResult.status === 'completed' || statusResult.status === 'succeed') {
  console.log('✅ AI generation completed successfully!');
  clearInterval(pollInterval);
  // Process result
}

// Include timeout safety
const MAX_POLL_ATTEMPTS = 200; // 10 minutes max
let pollAttempts = 0;

// Within poll function
pollAttempts++;
if (pollAttempts > MAX_POLL_ATTEMPTS) {
  clearInterval(pollInterval);
  console.error('❌ Polling timeout - reached maximum attempts');
  // Handle timeout error
}
```

### KlingAI Integration Points
- JWT token generation for authentication
- Multiple generation types: virtual-try-on, fan-together, logo-design
- Task status polling system
- Usage tracking and limits

### AI Component Integration
```typescript
// Add AI generation to any component
import { AIMediaGeneration } from '~/components/AIMediaGeneration';

// Use in layout
{config.showAIMediaGeneration && <AIMediaGeneration />}
```

---

## 🎨 Styling Quick Reference

### Tailwind v4 Classes
```css
/* Primary colors (from config) */
bg-primary text-primary border-primary

/* Responsive design */
md:text-lg lg:text-xl xl:text-2xl

/* Layout utilities */
container mx-auto px-4
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

### CSS Variables Available
```css
--color-primary       /* Main brand color */
--color-secondary     /* Secondary color */
--color-accent        /* Accent color */
--cart-width-mobile   /* Cart sizing */
--header-height-desktop /* Layout dimensions */
```

### Component Styling Patterns
1. **Use Tailwind classes** for standard styling
2. **Reference CSS variables** for theme colors
3. **Add custom CSS** for complex animations
4. **Follow responsive patterns**: mobile-first

---

## 🔧 Common Coding Scenarios

### Adding a New Component
1. Create in `app/components/ComponentName.tsx`
2. Import `useConfig` for theme integration
3. Use React Router imports for navigation
4. Export and use in routes or other components

### Creating a New Route
1. Follow naming pattern: `($locale).route-name.tsx`
2. Import from `'react-router'` (not Remix)
3. Add loader/action functions if needed
4. Use `context.env` for environment variables

### Adding API Endpoints
1. Create `api.endpoint-name.tsx` in routes
2. Export `action` and/or `loader` functions
3. Access Cloudflare env via `context.env`
4. Return proper JSON responses

### GraphQL Integration
1. Add queries to `app/graphql/`
2. Use generated types from `storefrontapi.generated.d.ts`
3. Run `npm run codegen` to regenerate types
4. Access via `context.storefront.query()`

---

## 🚨 Troubleshooting Guide

### Import Errors
- **Problem**: Remix imports not working
- **Solution**: Change to `'react-router'` imports

### Type Errors
- **Problem**: Missing Cloudflare types
- **Solution**: Run `npm run cf-typegen`

### Build Errors
- **Problem**: Canvas/Node.js modules
- **Solution**: Check `utils/canvas-mock.js` alias in `vite.config.ts`

### Config Not Working
- **Problem**: `useConfig` returns undefined
- **Solution**: Ensure component is wrapped in `ThemeProvider`

### AI Generation Failing
- **Problem**: KlingAI API errors
- **Solution**: Check environment variables `KLING_ACCESS_KEY` and `KLING_SECRET_KEY`
- **Problem**: Status handling issues
- **Solution**: Check for both 'completed' AND 'succeed' status values

---

## 📋 Development Checklist

### Before Starting New Feature
- [ ] Check if component already exists (40+ available)
- [ ] Determine if config integration needed
- [ ] Plan responsive design approach
- [ ] Consider AI integration opportunities

### Component Development
- [ ] Use correct React Router imports
- [ ] Integrate `useConfig` hook if needed
- [ ] Add proper TypeScript types
- [ ] Follow Tailwind v4 patterns
- [ ] Test responsive design

### Route Development  
- [ ] Follow naming conventions
- [ ] Add proper loader/action functions
- [ ] Handle environment variables correctly
- [ ] Add error handling
- [ ] Test with Cloudflare Workers

### Before Deployment
- [ ] Run `npm run typecheck`
- [ ] Run `npm run build`
- [ ] Test locally with `npm run preview`
- [ ] Deploy with `npm run deploy`

---

## 🎯 Performance Optimization

### Cloudflare Workers Benefits
- **Edge computing**: Code runs globally
- **Zero cold starts**: Instant response
- **Auto-scaling**: Handles traffic spikes
- **Global CDN**: Integrated caching

### Code Optimization
- **Use dynamic imports** for large components
- **Optimize images** with Cloudinary integration
- **Leverage CSS variables** for consistent theming
- **Minimize bundle size** with proper imports

---

## 📚 Quick Reference Links

### Documentation
- **Hydrogen docs**: `docs/hydrogen-2025-05/`
- **GraphQL schema**: `docs/graphql-schema/`
- **KlingAI API**: `docs/klingai.md`

### Generated Files (Don't Edit)
- `storefrontapi.generated.d.ts`
- `customer-accountapi.generated.d.ts`
- `types/worker-configuration.d.ts`

### Config Files
- `wrangler.jsonc` - Cloudflare Workers
- `react-router.config.ts` - Router setup
- `vite.config.ts` - Build configuration
- `package.json` - Dependencies and scripts

---

## 🛒 Cart & Checkout Implementation

### Custom Design Cart Implementation
```typescript
// Key components for custom designs
app/components/ProductDesigner.tsx     // Main design editor
app/components/AddToCartButton.tsx     // Cart submission handling
app/components/CartLineItem.tsx        // Cart line item display
app/routes/($locale).checkout.tsx      // Checkout flow
app/routes/api.cart-prepare-checkout.tsx // Design preparation for checkout
```

### Design Storage Strategy
1. **Primary**: Upload to Cloudinary with optimized URLs
2. **Secondary**: Store in cart line item attributes:
   - `_design_image_url`: Main design URL
   - `_custom_design`: 'true' to flag as custom
   - `_customized_image`: Base image URL
   - `_checkout_image`: Checkout-specific URL
3. **Fallback**: Store in localStorage for persistence:
   - `cart-line-design-{lineId}`: Per-line item designs
   - `cart-line-design-temp-latest`: Latest design as backup

### Common Cart & Checkout Issues
- **Problem**: Race condition between design capture and cart submission
- **Solution**: Create sequential workflow that captures design first

- **Problem**: Cart drawer not updating after design changes
- **Solution**: Use Shopify CartForm component + custom fetchers properly

- **Problem**: Custom designs disappearing on checkout
- **Solution**: Use api.cart-prepare-checkout.tsx to prepare checkout attributes

- **Problem**: Images not showing on checkout page
- **Solution**: Add multiple attribute types + localStorage fallback strategy

- **Problem**: Header covering checkout page content 
- **Solution**: Add proper spacing (pt-16 mt-6) to container elements

### Canvas Rendering & Konva Implementation
- **Problem**: Canvas not working in Cloudflare Workers
- **Solution**: Add canvas-mock.js + SSR optimization in vite.config.ts

```typescript
// Konva SSR optimization in vite.config.ts
ssr: {
  noExternal: ['react-konva', 'konva', ...],
}
```

### Layer Management in ProductDesigner
- **CRITICAL**: Background images with cutouts MUST be on top of user elements
```typescript
// Correct layer ordering in ProductDesigner.tsx
<Layer>
  {/* First layer: User Elements - Sorted by zIndex */}
  {elements
    .sort((a, b) => a.zIndex - b.zIndex)
    .map((element) => {
      // User elements rendering
    })}
    
  {/* Top layer: Background Product Image with transparent cutouts */}
  <KonvaImage
    image={backgroundImage}
    width={stageSize.width}
    height={stageSize.height}
    listening={false}
  />
</Layer>
```

### API Response Patterns
- **API Routes Pattern**: Use standard Response objects (not json helper)
```typescript
// ✅ CORRECT - Direct Response objects
return new Response(JSON.stringify({
  success: true,
  data: result
}), {
  status: 200,
  headers: {'Content-Type': 'application/json'},
});

// ❌ INCORRECT - Don't use Remix json helper
return json({ success: true, data: result });
```

### Cloudinary Integration
- **Config**: Stored in environment variables as `CLOUDINARY_URL`
- **Upload Flow**:
  1. Capture canvas as data URL
  2. Upload to Cloudinary via api.upload-image.tsx
  3. Store resulting URL in cart attributes
  4. Create localStorage backup
- **Utils**: 
  - `app/utils/cloudinaryUpload.ts`: Main upload functions
  - `app/utils/cloudinaryConfig.ts`: Config extraction
  - `app/utils/storageManager.ts`: Multi-source storage

### Error Handling & Debugging
- **Logging Conventions**: Use emoji prefixes for log categories
```typescript
console.log('🛒 [Cart] Processing items:', items.length);
console.error('❌ [Cart] Failed to process item:', error);
console.warn('⚠️ [Checkout] Missing design URL, using fallback');
```

- **Fallback Strategy**: Always implement multi-layered fallbacks
```typescript
// Example fallback pattern for images
try {
  // Primary source
  let imageUrl = await fetchPrimaryImage();
  if (!imageUrl) {
    // Secondary source
    imageUrl = getFromAttributes();
  }
  if (!imageUrl) {
    // Tertiary source
    imageUrl = getFromLocalStorage();
  }
  if (!imageUrl) {
    // Final fallback
    imageUrl = defaultProductImage;
  }
} catch (error) {
  console.error('Image retrieval error:', error);
  // Safety fallback
  imageUrl = defaultProductImage;
}
```

- **Component State Debugging**: Add transparent debug overlays when needed
```typescript
{process.env.NODE_ENV === 'development' && (
  <div className="fixed bottom-0 left-0 bg-black/80 text-white text-xs p-1 max-w-xs overflow-auto z-50">
    <pre>{JSON.stringify({state, props, calculated}, null, 2)}</pre>
  </div>
)}
```

---

## 🎨 Customization Philosophy

**Remember**: This template provides a **foundation with intelligent defaults** while maintaining **complete customizability**. 

- **Central config**: Accelerates development
- **Component editing**: Unlimited customization
- **Cloudflare Workers**: Enterprise-grade performance
- **AI integration**: Modern e-commerce features

**Every UI component can be completely customized** to create unique experiences that perfectly match any influencer's aesthetic, brand, and audience expectations.
