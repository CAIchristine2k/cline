#!/bin/bash

# Script de déploiement automatique pour Cline Shop sur Cloudflare Workers
# Usage: ./scripts/deploy.sh [--full]

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Cline Shop - Cloudflare Deployment  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Check if wrangler is authenticated
echo -e "${YELLOW}🔐 Checking authentication...${NC}"
if ! npx wrangler whoami &> /dev/null; then
    echo -e "${RED}❌ Not authenticated with Cloudflare${NC}"
    echo -e "${YELLOW}Running: npm run cf-login${NC}"
    npm run cf-login
    echo ""
fi

# Check if account_id is set
echo -e "${YELLOW}🔍 Checking wrangler configuration...${NC}"
if grep -q '"account_id": ""' wrangler.jsonc; then
    echo -e "${RED}❌ Account ID not set in wrangler.jsonc${NC}"
    echo -e "${YELLOW}Getting your Account ID...${NC}"
    npx wrangler whoami
    echo ""
    echo -e "${YELLOW}Please copy your Account ID from above and paste it in wrangler.jsonc${NC}"
    echo -e "${YELLOW}Then run this script again.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Configuration looks good!${NC}"
echo ""

# Build the project
echo -e "${BLUE}🔨 Building project...${NC}"
npm run build

# Upload secrets if --full flag is provided
if [ "$1" == "--full" ]; then
    echo ""
    echo -e "${BLUE}🔑 Uploading secrets...${NC}"
    if [ -f ".env" ]; then
        npm run deploy:secrets
    else
        echo -e "${YELLOW}⚠️  No .env file found, skipping secrets upload${NC}"
    fi
fi

# Deploy to Cloudflare
echo ""
echo -e "${BLUE}🚀 Deploying to Cloudflare Workers...${NC}"
npx wrangler deploy

echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✨ Deployment Successful! ✨         ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}💡 Useful commands:${NC}"
echo -e "   ${BLUE}npm run cf-tail${NC}     - View real-time logs"
echo -e "   ${BLUE}npm run deploy${NC}      - Deploy again"
echo -e "   ${BLUE}npm run cf-whoami${NC}   - Check your Cloudflare info"
echo ""
