#!/bin/bash

# Firebase Functions Deployment Script for WebsDee Stripe Integration
# This script deploys Firebase Functions to Singapore region for Stripe payment processing

echo "🚀 Deploying WebsDee Stripe Functions to Singapore..."
echo ""

# Check if Firebase CLI is logged in
if ! firebase projects:list &> /dev/null; then
    echo "❌ You need to login to Firebase first:"
    echo "   firebase login"
    exit 1
fi

# Check if environment variables are set
echo "📋 Checking environment variables..."
if ! firebase functions:config:get | grep -q "stripe"; then
    echo "⚠️  Stripe environment variables not set. Please run:"
    echo "   firebase functions:config:set stripe.secret_key=\"sk_test_your_key_here\""
    echo "   firebase functions:config:set stripe.webhook_secret=\"whsec_your_secret_here\""
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Install dependencies if needed
echo "📦 Installing function dependencies..."
cd functions
npm install
cd ..

# Deploy functions
echo "🚀 Deploying functions to asia-southeast1..."
firebase deploy --only functions

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "📍 Your functions are now available at:"
    echo "   https://asia-southeast1-websdee-blog.cloudfunctions.net/createPaymentIntent"
    echo "   https://asia-southeast1-websdee-blog.cloudfunctions.net/createCustomer"
    echo "   https://asia-southeast1-websdee-blog.cloudfunctions.net/createSubscription"
    echo "   https://asia-southeast1-websdee-blog.cloudfunctions.net/stripeWebhook"
    echo "   https://asia-southeast1-websdee-blog.cloudfunctions.net/testStripe"
    echo ""
    echo "🧪 Test your deployment:"
    echo "   curl https://asia-southeast1-websdee-blog.cloudfunctions.net/testStripe"
    echo ""
    echo "📖 Next steps:"
    echo "   1. Set up Stripe webhooks with the stripeWebhook URL"
    echo "   2. Test payments on your website"
    echo "   3. Check Firebase Console for logs and monitoring"
else
    echo ""
    echo "❌ Deployment failed!"
    echo "Check the error messages above and try again."
    exit 1
fi 