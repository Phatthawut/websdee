# Setting Up Stripe Live Keys for Production

This guide will help you transition from test mode to live mode in Stripe for your WebsDee payment system.

## 1. Local Development Environment

First, create a `.env` file in the root of your project with the following content:

```
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-live-publishable-key

# Other Configuration
VITE_UNSPLASH_ACCESS_KEY=your-unsplash-access-key
```

Replace `your-stripe-live-publishable-key` with your actual Stripe live publishable key (starts with `pk_live_`).

## 2. Firebase Functions Environment

For your Firebase Functions, you need to set the Stripe secret key as an environment variable:

```bash
firebase functions:config:set stripe.secret_key="your-stripe-live-secret-key" stripe.webhook_secret="your-stripe-live-webhook-secret"
```

Replace `your-stripe-live-secret-key` with your actual Stripe live secret key (starts with `sk_live_`).
Replace `your-stripe-live-webhook-secret` with your actual Stripe live webhook secret.

## 3. Deploy Firebase Functions

After setting the environment variables, deploy your Firebase Functions:

```bash
firebase deploy --only functions
```

## 4. Verify Stripe Configuration

To verify that your Stripe configuration is working correctly:

1. Visit the Stripe Dashboard and ensure you're in "Live" mode (not "Test" mode)
2. Make a test payment on your live site
3. Check that the payment appears in your Stripe Dashboard
4. Verify that the payment data is stored in your Firestore database

## 5. Update Webhook Endpoints

Make sure your Stripe webhook endpoints are configured correctly:

1. Go to the Stripe Dashboard > Developers > Webhooks
2. Update the endpoint URL to your production Firebase Function URL
3. Select the relevant events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

## 6. Testing Live Mode

Before going fully live, perform these tests:

1. Make a small test payment using your own card
2. Verify the payment flow works end-to-end
3. Check that the payment appears in your Firestore database
4. Test the webhook by triggering a payment and ensuring the data is updated

## 7. Going Live

Once everything is tested and working correctly:

1. Update your website to use the live Stripe keys
2. Deploy your website to production
3. Monitor the first few payments to ensure everything is working correctly

## Important Notes

- **Never commit your Stripe secret keys to version control**
- Keep your webhook secret secure
- Regularly rotate your webhook secrets for security
- Monitor your Stripe Dashboard for any unusual activity
- Set up Stripe notifications for important events

## Troubleshooting

If you encounter issues:

1. Check the Firebase Functions logs for any errors
2. Verify your Stripe API keys are correct
3. Ensure your webhook endpoints are properly configured
4. Test with Stripe's webhook tester to ensure events are being received
