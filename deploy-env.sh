#!/bin/bash

# 🔐 Production Environment Setup Script for Cloudflare Workers
# Run this script when deploying to production to set all environment variables securely

echo "🚀 Setting up production environment variables for Cloudflare Workers..."
echo ""

# Load variables from .dev.vars file (Cloudflare Workers standard)
if [ -f .dev.vars ]; then
    export $(cat .dev.vars | grep -v '^#' | xargs)
    echo "✅ Loaded variables from .dev.vars file"
else
    echo "❌ .dev.vars file not found. Please ensure it exists."
    exit 1
fi

echo ""
echo "🔑 Setting SECRETS (encrypted, not visible in dashboard):"

# Set sensitive secrets (these are encrypted and secure)
echo "Setting PRIVATE_STOREFRONT_API_TOKEN..."
echo "$PRIVATE_STOREFRONT_API_TOKEN" | wrangler secret put PRIVATE_STOREFRONT_API_TOKEN --env production

echo "Setting SESSION_SECRET..."
echo "$SESSION_SECRET" | wrangler secret put SESSION_SECRET --env production

echo "Setting KLING_ACCESS_KEY..."
echo "$KLING_ACCESS_KEY" | wrangler secret put KLING_ACCESS_KEY --env production

echo "Setting KLING_SECRET_KEY..."
echo "$KLING_SECRET_KEY" | wrangler secret put KLING_SECRET_KEY --env production

echo "Setting PUBLIC_STOREFRONT_API_TOKEN..."
echo "$PUBLIC_STOREFRONT_API_TOKEN" | wrangler secret put PUBLIC_STOREFRONT_API_TOKEN --env production

echo "Setting PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID..."
echo "$PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID" | wrangler secret put PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID --env production

echo "Setting CLOUDINARY_URL..."
echo "$CLOUDINARY_URL" | wrangler secret put CLOUDINARY_URL --env production

echo ""
echo "📝 Setting PUBLIC VARIABLES (visible in dashboard, non-sensitive):"

# Set public variables (these are visible in the Cloudflare dashboard)
wrangler var put PUBLIC_STORE_DOMAIN "$PUBLIC_STORE_DOMAIN" --env production
wrangler var put PUBLIC_STOREFRONT_ID "$PUBLIC_STOREFRONT_ID" --env production
wrangler var put PUBLIC_CHECKOUT_DOMAIN "$PUBLIC_CHECKOUT_DOMAIN" --env production
wrangler var put PUBLIC_CUSTOMER_ACCOUNT_API_URL "$PUBLIC_CUSTOMER_ACCOUNT_API_URL" --env production
wrangler var put SHOP_ID "$SHOP_ID" --env production

echo ""
echo "✅ All environment variables have been set for production!"
echo ""
echo "📋 Summary:"
echo "   🔐 Secrets (encrypted): 7 variables"
echo "   📝 Public vars: 5 variables"
echo ""
echo "🚀 You can now deploy with: wrangler deploy --env production" 