#!/bin/bash

# Deploy Live Stripe Keys and Functions
# This script helps deploy Firebase Functions with live Stripe keys

# Text colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}WebsDee Stripe Live Keys Deployment${NC}"
echo -e "${YELLOW}=====================================${NC}"
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo -e "${RED}Firebase CLI not found. Please install it first:${NC}"
    echo "npm install -g firebase-tools"
    exit 1
fi

# Check if user is logged in to Firebase
echo -e "${GREEN}Checking Firebase login status...${NC}"
firebase login:list

echo ""
echo -e "${YELLOW}This script will set up Stripe live keys for your Firebase Functions.${NC}"
echo -e "${YELLOW}Make sure you have your Stripe live keys ready.${NC}"
echo ""

# Ask for confirmation
read -p "Do you want to continue? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Deployment cancelled.${NC}"
    exit 1
fi

# Ask for Stripe live secret key
echo ""
echo -e "${GREEN}Enter your Stripe live secret key (starts with sk_live_):${NC}"
read -s STRIPE_SECRET_KEY
echo ""

# Ask for Stripe live webhook secret
echo -e "${GREEN}Enter your Stripe live webhook secret:${NC}"
read -s STRIPE_WEBHOOK_SECRET
echo ""

# Validate inputs
if [[ ! $STRIPE_SECRET_KEY == sk_live_* ]]; then
    echo -e "${RED}Error: Stripe secret key should start with 'sk_live_'${NC}"
    exit 1
fi

if [[ -z "$STRIPE_WEBHOOK_SECRET" ]]; then
    echo -e "${RED}Error: Webhook secret cannot be empty${NC}"
    exit 1
fi

# Set Firebase Functions config
echo ""
echo -e "${GREEN}Setting Firebase Functions configuration...${NC}"
firebase functions:config:set stripe.secret_key="$STRIPE_SECRET_KEY" stripe.webhook_secret="$STRIPE_WEBHOOK_SECRET"

# Deploy Firebase Functions
echo ""
echo -e "${GREEN}Deploying Firebase Functions...${NC}"
firebase deploy --only functions

echo ""
echo -e "${GREEN}Deployment completed!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update your frontend .env file with the Stripe live publishable key"
echo "2. Deploy your frontend application"
echo "3. Test the payment flow with a small transaction"
echo ""
echo -e "${YELLOW}For more information, see stripe-live-keys-setup.md${NC}" 