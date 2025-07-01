# VAT Implementation Guide

## Overview

VAT (Value Added Tax) calculation utilities have been separated from the Stripe service into `src/utils/vatUtils.js` for future use. Currently, VAT is **disabled** across the WebsDee payment system.

## Current Status

- **VAT Rate**: 7% (Thailand standard)
- **VAT Status**: DISABLED
- **Location**: `src/utils/vatUtils.js`

## Available Functions

### Core VAT Calculations

```javascript
import {
  calculatePriceWithVAT,
  calculateVATAmount,
  calculateBasePriceFromVAT,
} from "@/utils/vatUtils";

// Calculate price including VAT
const priceWithVAT = calculatePriceWithVAT(1000); // Returns 1000 (VAT disabled)

// Calculate VAT amount only
const vatAmount = calculateVATAmount(1000); // Returns 0 (VAT disabled)

// Calculate base price from VAT-inclusive price
const basePrice = calculateBasePriceFromVAT(1070); // Returns 1070 (VAT disabled)
```

### Deposit Calculations

```javascript
import { calculateDeposit, calculateRemainingAmount } from "@/utils/vatUtils";

// Calculate 50% deposit (including VAT when enabled)
const deposit = calculateDeposit(1000); // Returns 500

// Calculate remaining amount after deposit
const remaining = calculateRemainingAmount(1000); // Returns 500
```

### Price Breakdown

```javascript
import { getPriceBreakdown } from "@/utils/vatUtils";

const breakdown = getPriceBreakdown(1000);
// Returns:
// {
//   basePrice: 1000,
//   vatAmount: 0,
//   totalPrice: 1000,
//   vatRate: 0,
//   vatEnabled: false
// }
```

## How to Enable VAT (Future Implementation)

### Step 1: Update VAT Configuration

Edit `src/utils/vatUtils.js`:

```javascript
// Change this line:
export const VAT_ENABLED = false;
// To:
export const VAT_ENABLED = true;
```

### Step 2: Update Payment Store

In `src/stores/paymentStore.js`, import and use VAT utilities:

```javascript
import { calculatePriceWithVAT, calculateVATAmount } from "@/utils/vatUtils";

const vatAmount = computed(() => {
  return calculateVATAmount(baseAmount.value + addonsTotal.value);
});

const totalAmount = computed(() => {
  let baseTotal = baseAmount.value + addonsTotal.value;

  if (paymentType.value === "full") {
    baseTotal = Math.round(baseTotal * 0.95); // 5% discount
  }

  return calculatePriceWithVAT(baseTotal);
});
```

### Step 3: Update Payment Modal

In `src/components/PaymentModal.vue`, replace the hardcoded VAT calculation:

```javascript
import { calculateVATAmount } from "@/utils/vatUtils";

const vatAmount = computed(() => {
  let baseTotal = paymentStore.baseAmount + paymentStore.addonsTotal;
  if (paymentStore.paymentType === "full") {
    baseTotal = Math.round(baseTotal * 0.95); // Apply 5% discount
  }
  return calculateVATAmount(baseTotal);
});
```

### Step 4: Update Stripe Metadata

In `src/services/stripeService.js`, update metadata to include VAT information:

```javascript
metadata: {
  vat_included: "true",
  vat_rate: "0.07",
  ...metadata,
},
```

### Step 5: Update Firebase Functions

Update your Firebase Functions to handle VAT calculations in `functions/index.js`.

## Testing VAT Implementation

### Test Cases

1. **Base Price Calculation**: ฿1,000 → ฿1,070 (with VAT)
2. **Deposit Calculation**: ฿1,000 → ฿535 (50% of ฿1,070)
3. **Discount + VAT**: ฿1,000 → 5% discount → ฿950 → VAT → ฿1,016.50
4. **Price Breakdown Display**: Show base price, VAT amount, and total separately

### Validation Points

- Ensure all prices display correctly with VAT
- Verify Stripe receives correct VAT-inclusive amounts
- Check that invoices and receipts show VAT breakdown
- Test both full payment and deposit scenarios

## Files Modified for VAT Separation

### Created

- `src/utils/vatUtils.js` - All VAT calculation logic

### Modified

- `src/services/stripeService.js` - Removed VAT functions, kept core Stripe functionality
- `src/components/PaymentModal.vue` - Simplified VAT calculation to return 0

### No Changes Required

- `src/stores/paymentStore.js` - Uses separate discount logic, no VAT dependency
- Firebase Functions - Already handle VAT via metadata
- Database structure - Supports VAT data fields

## Benefits of Separation

1. **Clean Architecture**: Stripe service focuses only on payment processing
2. **Reusability**: VAT utilities can be used across components
3. **Easy Toggle**: Enable/disable VAT with single configuration change
4. **Better Testing**: VAT logic can be tested independently
5. **Future Flexibility**: Easy to modify VAT rates or add multiple tax types

## Notes

- Thailand VAT rate is currently 7%
- VAT calculations use `Math.round()` for proper currency formatting
- When enabled, VAT applies to base price + addons, then discounts are applied
- Deposit is always 50% of the final amount (including VAT when enabled)
