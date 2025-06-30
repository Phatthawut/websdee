# Stripe Payment Methods Domain Setup Guide

## Overview

This guide will help you configure payment methods domains in your Stripe Dashboard to ensure your WebsDee payment system works properly in production and supports Thai payment methods.

## Why Payment Methods Domains Matter

### Security & Compliance

- **Prevents unauthorized use** of your Stripe publishable keys
- **Required for production** live payments
- **PCI compliance** for handling payment data
- **Fraud prevention** by restricting valid domains

### Thai Market Requirements

- **PromptPay integration** requires domain verification
- **Local payment methods** need proper domain setup
- **Bank transfer options** require secure domains
- **Compliance with Thai regulations**

## Step-by-Step Setup

### 1. Access Stripe Dashboard

```
🔗 https://dashboard.stripe.com/settings/payment_methods
```

### 2. Navigate to Payment Method Domains

1. **Login** to your Stripe Dashboard
2. **Settings** → **Payment methods**
3. **Payment method domains** tab
4. **Add domain** button

### 3. Add Your Domains

#### Development Domains

```
http://localhost:5173
http://localhost:3000
http://127.0.0.1:5173
```

#### Production Domains (Add your actual domains)

```
https://websdee.com
https://www.websdee.com
https://your-actual-domain.com
https://subdomain.your-domain.com
```

#### Deployment Platforms (if using)

```
https://your-project.vercel.app
https://your-project.netlify.app
https://your-project.pages.dev (Cloudflare Pages)
```

### 4. Enable Thai Payment Methods

#### In Payment Methods Settings:

**Core Payment Methods:**

- ✅ **Cards** (Visa, Mastercard, JCB, American Express)
- ✅ **PromptPay** (Most popular in Thailand)
- ✅ **Bank transfers** (if supported in your region)

**Currency & Country:**

- ✅ **THB (Thai Baht)** - Primary currency
- ✅ **Thailand** - Country support
- ✅ **USD** - Optional for international customers

### 5. Configure Payment Method Types

#### Card Payments

```javascript
// Your current setup supports:
payment_method_types: ["card", "promptpay"];
```

#### PromptPay Configuration

- **Minimum**: ฿10 THB
- **Maximum**: ฿2,000,000 THB per transaction
- **Processing time**: Instant
- **Fees**: Check Stripe pricing for Thailand

#### Bank Transfers (if available)

- **Processing time**: 1-3 business days
- **Supported banks**: Major Thai banks
- **Customer verification**: Required

### 6. Test Payment Methods

#### Test Cards for Development

```javascript
// Successful payments
"4242424242424242"; // Visa
"5555555555554444"; // Mastercard
"378282246310005"; // American Express

// Failed payments (for testing)
"4000000000000002"; // Card declined
"4000000000009995"; // Insufficient funds
```

#### PromptPay Testing

- Use Stripe test mode
- Simulate QR code scanning
- Test timeout scenarios

### 7. Production Checklist

#### Before Going Live:

- [ ] **Add production domains** to Stripe
- [ ] **Switch to live keys** in environment variables
- [ ] **Enable HTTPS** on your domain
- [ ] **Test with real bank account** (small amounts)
- [ ] **Verify webhook endpoints** are working
- [ ] **Set up monitoring** and alerts

#### Domain Verification:

- [ ] **SSL certificate** installed and valid
- [ ] **Domain ownership** verified
- [ ] **DNS settings** properly configured
- [ ] **Firewall rules** allow Stripe webhooks

### 8. Update Environment Variables

#### Development (.env)

```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

#### Production (Vercel/Netlify/etc)

```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
```

#### Firebase Functions Environment

```bash
# Set live Stripe secret key for production
firebase functions:config:set stripe.secret_key="sk_live_your_live_key_here"
```

### 9. Monitor and Maintain

#### Regular Checks:

- **Domain expiration** dates
- **SSL certificate** renewal
- **Payment success rates**
- **Thai payment method** availability
- **Stripe fee changes**

#### Analytics to Monitor:

- **Payment conversion rates**
- **Popular payment methods** (PromptPay vs Cards)
- **Failed payment reasons**
- **Customer geographic distribution**

### 10. Thailand-Specific Considerations

#### Legal & Compliance:

- **VAT handling** (7% in Thailand)
- **Business registration** requirements
- **Payment processing** licenses
- **Data protection** compliance

#### Customer Experience:

- **Thai language** support (✅ Already implemented)
- **Local currency** display (฿ THB)
- **Familiar payment methods** (PromptPay priority)
- **Mobile-optimized** checkout

### 11. Troubleshooting

#### Common Issues:

**Domain Not Working:**

- Check if domain is added to Stripe Dashboard
- Verify HTTPS is enabled
- Clear browser cache and cookies

**PromptPay Issues:**

- Ensure Thailand is enabled in Stripe settings
- Check minimum/maximum amount limits
- Verify customer's banking app supports QR codes

**CORS Errors:**

- Update Firebase Functions CORS configuration
- Add all necessary domains to allowed origins
- Check preflight request handling

#### Getting Help:

- **Stripe Support**: Live chat in Dashboard
- **Documentation**: https://stripe.com/docs/payments
- **Community**: https://stackoverflow.com/questions/tagged/stripe-payments

## Next Steps

1. **Complete the Stripe Dashboard setup** following this guide
2. **Test thoroughly** with all payment methods
3. **Deploy to production** with live keys
4. **Monitor payment success rates**
5. **Gather customer feedback** on payment experience

Your WebsDee payment system will then be fully optimized for the Thai market! 🇹🇭🎉

## Contact Stripe Support

For Thailand-specific questions:

- **Email**: support@stripe.com
- **Mention**: Thailand market, PromptPay, THB currency
- **Include**: Your business type and expected volume
