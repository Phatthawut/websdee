# Firebase Functions Setup for Stripe Payments

## Overview

This guide will help you deploy Firebase Functions in Singapore (asia-southeast1) to handle Stripe payments for your WebsDee website.

## Prerequisites

- Firebase CLI installed (you already have v13.34.0)
- Firebase project created (websdee-blog)
- Stripe account with test/live keys

## 1. Environment Variables Setup

Firebase Functions require environment variables to be set using the Firebase CLI:

```bash
# Set Stripe Secret Key (Test)
firebase functions:config:set stripe.secret_key="sk_test_your_stripe_secret_key_here"

# Set Stripe Webhook Secret (get this after creating webhook in Stripe Dashboard)
firebase functions:config:set stripe.webhook_secret="whsec_your_webhook_secret_here"
```

**For Production:**

```bash
# Set Stripe Secret Key (Live)
firebase functions:config:set stripe.secret_key="sk_live_your_stripe_secret_key_here"
```

## 2. Deploy Functions to Singapore

Deploy your functions to the Singapore region:

```bash
# Deploy all functions
firebase deploy --only functions

# Or deploy specific function
firebase deploy --only functions:createPaymentIntent
```

## 3. Frontend Configuration

Update your `.env` file to include the Firebase Functions URL:

```bash
# Existing Stripe config
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# Firebase Functions URL (optional - defaults to your project URL)
VITE_FIREBASE_FUNCTIONS_URL=https://asia-southeast1-websdee-blog.cloudfunctions.net
```

## 4. Available Endpoints

After deployment, your functions will be available at:

- **createPaymentIntent**: `https://asia-southeast1-websdee-blog.cloudfunctions.net/createPaymentIntent`
- **createCustomer**: `https://asia-southeast1-websdee-blog.cloudfunctions.net/createCustomer`
- **createSubscription**: `https://asia-southeast1-websdee-blog.cloudfunctions.net/createSubscription`
- **stripeWebhook**: `https://asia-southeast1-websdee-blog.cloudfunctions.net/stripeWebhook`
- **testStripe**: `https://asia-southeast1-websdee-blog.cloudfunctions.net/testStripe`

## 5. Stripe Webhook Configuration

1. Go to your Stripe Dashboard → Webhooks
2. Create a new webhook endpoint with URL:
   `https://asia-southeast1-websdee-blog.cloudfunctions.net/stripeWebhook`
3. Select these events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `invoice.payment_succeeded`
   - `customer.subscription.deleted`
4. Copy the webhook signing secret and set it in Firebase config:
   ```bash
   firebase functions:config:set stripe.webhook_secret="whsec_your_webhook_secret"
   ```

## 6. Testing the Setup

### Test the functions are deployed:

```bash
curl https://asia-southeast1-websdee-blog.cloudfunctions.net/testStripe
```

### Test payment intent creation:

```bash
curl -X POST https://asia-southeast1-websdee-blog.cloudfunctions.net/createPaymentIntent \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 300000,
    "currency": "thb",
    "payment_method_types": ["card", "promptpay"]
  }'
```

## 7. Local Development (Optional)

For local development, you can use Firebase Emulator:

```bash
# Install and start emulator
firebase emulators:start --only functions

# Your functions will be available at:
# http://localhost:5001/websdee-blog/asia-southeast1/createPaymentIntent
```

Update your `.env` for local development:

```bash
VITE_FIREBASE_FUNCTIONS_URL=http://localhost:5001/websdee-blog/asia-southeast1
```

## 8. Security and CORS

The functions are configured with CORS to allow requests from your domain. For production, consider:

- Restricting CORS to your specific domain
- Adding API key authentication
- Implementing rate limiting
- Adding request validation

## 9. Monitoring

Monitor your functions in the Firebase Console:

- Go to Firebase Console → Functions
- View logs, performance, and usage
- Set up alerts for errors

## 10. Thai Payment Methods

For Thai payment methods (PromptPay, Bank Transfer):

1. Contact Stripe to enable Thai payment methods for your account
2. The functions are already configured to support them
3. Test with Stripe's test payment methods

## Troubleshooting

### Common Issues:

1. **CORS errors**: Make sure your domain is allowed in CORS configuration
2. **Environment variables not set**: Use `firebase functions:config:get` to check
3. **Function not found**: Ensure functions are deployed to the correct region
4. **Stripe errors**: Check your API keys and webhook secrets

### Logs:

```bash
# View function logs
firebase functions:log

# Or view in Firebase Console → Functions → Logs
```

## Next Steps

1. Deploy the functions: `firebase deploy --only functions`
2. Test the payment flow on your website
3. Set up Stripe webhooks
4. Configure production environment variables
5. Test with real payments in Stripe test mode

Your Stripe payment system will now be fully functional with Firebase Functions in Singapore! 🎉
