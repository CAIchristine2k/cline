# Shopify Integration Guide for Shane Hydrogen

This guide explains how to fully integrate your Shane Hydrogen project with Shopify.

## Prerequisites

1. A Shopify store (Partners account or paid store)
2. Access to create private apps or custom storefronts
3. Basic understanding of Shopify's Storefront API

## Setup Instructions

### 1. Configure Environment Variables

The `.env` file contains all necessary credentials for Shopify integration. Update the following values:

```
SESSION_SECRET="your-session-secret"
PUBLIC_STORE_DOMAIN="your-store.myshopify.com"
PUBLIC_STOREFRONT_API_TOKEN="your-storefront-api-token"
PRIVATE_ADMIN_API_TOKEN="your-admin-api-token"
PUBLIC_STOREFRONT_API_VERSION="2024-01"
PUBLIC_STOREFRONT_ID="your-storefront-id"
PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID="your-customer-account-api-client-id"
PUBLIC_CUSTOMER_ACCOUNT_API_URL="https://shopify.customer-callbacks.com"
```

To obtain these values:
- **SESSION_SECRET**: Generate a random string for session encryption
- **PUBLIC_STORE_DOMAIN**: Your Shopify store domain (e.g., `your-store.myshopify.com`)
- **PUBLIC_STOREFRONT_API_TOKEN**: Create from Shopify Admin → Settings → Apps and sales channels → Develop apps → Create an app → Configure Storefront API → Install app
- **PRIVATE_ADMIN_API_TOKEN**: Create from the same app, but under Admin API access
- **PUBLIC_STOREFRONT_API_VERSION**: Latest Storefront API version (e.g., "2024-01")
- **PUBLIC_STOREFRONT_ID**: Optional - get this from your Shopify Partners dashboard
- **PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID**: For customer accounts integration - from the same app configuration
- **PUBLIC_CUSTOMER_ACCOUNT_API_URL**: Usually "https://shopify.customer-callbacks.com"

### 2. Update Config File

The `app/lib/config.ts` file already contains a section for Shopify configuration:

```typescript
// Shopify Store Configuration
shopDomain: "your-store.myshopify.com",
shopifyCollections?: any[]; // Populated automatically
```

Make sure the `shopDomain` matches your actual Shopify store domain.

### 3. Products and Collections

Products and collections are automatically fetched from your Shopify store in the home page loader. The application will:

1. Fetch best-selling products from your store
2. Fetch available collections
3. Look for a "featured" collection to highlight
4. Fall back to static product data from config if no Shopify products are available

To customize which products appear on the homepage, you can:
- Create a "Featured" collection in Shopify and add products to it
- Tag specific products with "featured" or "homepage"
- Sort your products in Shopify to control which ones appear first

### 4. Product Pages

Product pages use the Shopify Storefront API to display detailed product information, variants, and add-to-cart functionality. The application supports:

- Product images and galleries
- Product variants (size, color, etc.)
- Price display (regular, sale, compare-at)
- Product descriptions
- Add to cart functionality

### 5. Cart Functionality

The cart integration includes:
- Add to cart
- Update quantities
- Remove items
- Cart total calculation
- Checkout via Shopify

### 6. Customer Accounts

Customer account functionality is available through:
- Login/signup
- Order history
- Account details
- Shipping addresses

## Testing the Integration

1. Start the development server:
   ```
   npm run dev
   ```

2. Visit the homepage to see products loaded from Shopify
3. Test creating an account and placing an order
4. Verify orders appear in your Shopify admin

## Troubleshooting

If products aren't appearing:
1. Verify your Storefront API token has the necessary permissions
2. Check that your store has products published to the sales channel
3. Look for any console errors related to API calls

For cart issues:
1. Check browser console for errors
2. Verify your Storefront API token has cart permissions
3. Try clearing your browser's local storage

## Further Customization

You can customize how Shopify products are displayed by editing:
- `ProductCard.tsx` - For product grid displays
- `ProductDetail.tsx` - For individual product pages
- `ProductShowcase.tsx` - For the homepage showcase