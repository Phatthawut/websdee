# Stripe Environment Setup Guide

## Quick Fix for Current Error

The error you're seeing occurs because the Stripe publishable key environment variable is not set. To fix this immediately:

1. Create a `.env` file in your project root (same directory as `package.json`)
2. Add the following line with your Stripe test key:

```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key_here
```

## Getting Your Stripe Keys

1. **Sign up for Stripe** (if you haven't already):

   - Go to https://stripe.com
   - Create a free account

2. **Get your test keys**:

   - Go to https://dashboard.stripe.com/test/apikeys
   - Copy your "Publishable key" (starts with `pk_test_`)
   - Copy your "Secret key" (starts with `sk_test_`)

3. **For Thailand market setup**:
   - Contact Stripe support to enable Thai payment methods
   - Or use the test keys to develop and test

## Environment Variables Template

Create a `.env` file in your project root with these variables:

```bash
# Stripe Configuration (Required)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51234567890abcdef...

# Optional: For backend API (if you implement it)
STRIPE_SECRET_KEY=sk_test_51234567890abcdef...
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdef...

# Application URLs
VITE_APP_URL=http://localhost:5173
VITE_API_URL=http://localhost:3001
```

## Testing Without Backend

The current implementation will work for frontend testing even without a backend API. The payment processing will fail gracefully and show appropriate error messages.

## Security Notes

- **Never commit `.env` files to git**
- The `.env` file is already in `.gitignore`
- Only the `VITE_` prefixed variables are exposed to the browser
- Keep your secret key secure and never expose it in frontend code

## Production Setup

For production deployment:

1. Use live keys (starting with `pk_live_` and `sk_live_`)
2. Set environment variables in your hosting platform (Vercel, Netlify, etc.)
3. Ensure SSL is enabled
4. Configure Stripe webhooks for your production domain

## Immediate Action

To stop the current error:

1. Create `.env` file
2. Add: `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder_key_for_testing`
3. Restart your dev server (`npm run dev`)

The error will be gone, and you'll see a warning in the payment modal that Stripe is not configured.
