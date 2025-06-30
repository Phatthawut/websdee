# Stripe Payment Setup Instructions

## Environment Variables Setup

Create a `.env` file in the project root with the following variables:

```bash
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# API Base URL for backend integration
VITE_API_BASE_URL=http://localhost:3000/api

# Environment
NODE_ENV=development
```

## Stripe Account Setup

1. **Create Stripe Account**

   - Go to https://dashboard.stripe.com/register
   - Complete account verification
   - Get your API keys from the Developers section

2. **Configure Thai Payment Methods**

   - Enable PromptPay in your Stripe dashboard
   - Configure supported card types for Thailand
   - Set up bank transfer options

3. **Create Products in Stripe Dashboard**

   ```javascript
      // Starter Package
   {
     name: "Starter Website Package",
     description: "5-page responsive website",
     default_price_data: {
       currency: "thb",
       unit_amount: 300000 // ฿3,000 in satang
     }
   }

   // E-commerce Package
   {
     name: "E-commerce Website Package",
     description: "Online store with payment gateway",
     default_price_data: {
       currency: "thb",
       unit_amount: 450000 // ฿4,500 in satang
     }
   }

   // Premium Package
   {
     name: "Premium Website Package",
     description: "Custom design and advanced features",
     default_price_data: {
       currency: "thb",
       unit_amount: 1590000 // ฿15,900 in satang
     }
   }
   ```

4. **Maintenance Subscription Plans**

   ```javascript
   // Basic Plan
   {
     name: "Basic Maintenance",
     recurring: {
       interval: "month"
     },
     currency: "thb",
     unit_amount: 99000 // ฿990/month
   }

   // Pro Plan
   {
     name: "Professional Maintenance",
     recurring: {
       interval: "month"
     },
     currency: "thb",
     unit_amount: 199000 // ฿1,990/month
   }

   // Enterprise Plan
   {
     name: "Enterprise Maintenance",
     recurring: {
       interval: "month"
     },
     currency: "thb",
     unit_amount: 349000 // ฿3,490/month
   }
   ```

## Backend API Requirements

You'll need to create these API endpoints:

### 1. Create Payment Intent

```javascript
POST /api/create-payment-intent
{
  "amount": 300000,
  "currency": "thb",
  "payment_method_types": ["card", "promptpay"],
  "metadata": {
    "package": "starter",
    "vat_included": "true"
  }
}
```

### 2. Create Subscription

```javascript
POST /api/create-subscription
{
  "price_id": "price_xxxxx",
  "customer_id": "cus_xxxxx"
}
```

### 3. Create Customer

```javascript
POST /api/create-customer
{
  "email": "customer@example.com",
  "name": "Customer Name",
  "address": {
    "country": "TH"
  }
}
```

## Testing

1. **Test Mode Setup**

   - Use test API keys during development
   - Test with Stripe test card numbers
   - Verify PromptPay test flow

2. **Test Card Numbers for Thailand**
   ```
   Success: 4000 0007 6000 0002
   Decline: 4000 0000 0000 0002
   PromptPay: Use test phone numbers
   ```

## Production Deployment

1. **Switch to Live Keys**

   - Replace test keys with live keys
   - Update environment variables
   - Configure webhooks for payment confirmations

2. **VAT Compliance**

   - Ensure proper VAT calculation (7%)
   - Generate tax-compliant receipts
   - Register with Thai tax authorities if required

3. **Security**
   - Never expose secret keys on frontend
   - Use HTTPS in production
   - Implement proper error handling

## Current Implementation Status

✅ **Completed:**

- Stripe service integration
- Payment modal with Thai methods
- Package pricing with VAT
- Maintenance subscription UI
- Thai/English localization
- Add-on services selection

🚧 **Needs Backend Implementation:**

- Payment intent creation API
- Subscription management API
- Customer creation API
- Webhook handling for payment events
- Order/project management system

🔄 **Future Enhancements:**

- Customer dashboard
- Invoice generation
- Automatic project creation
- Email notifications
- Advanced analytics

## Support

For technical support with Stripe integration:

- Stripe Documentation: https://stripe.com/docs
- Thai Payment Methods: https://stripe.com/docs/payments/payment-methods/overview#thailand
- PromptPay Guide: https://stripe.com/docs/payments/promptpay
