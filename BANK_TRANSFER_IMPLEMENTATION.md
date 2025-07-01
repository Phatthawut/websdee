# Manual Bank Transfer Implementation

This document outlines the implementation of manual bank transfers as a payment option for WebsDee customers.

## Overview

The manual bank transfer implementation allows customers to pay for WebsDee services via direct bank transfer to our TMB bank account. This implementation is completely separate from the Stripe payment system and doesn't require any third-party payment processor.

## Bank Details

```
Bank: ธนาคารทหารไทยธนชาต (TMB Bank)
Account Number: 621-2-54406-5
Account Name: น.ส. พัชรีรัตน์ จันทวงศ์
Branch: เซ็นทรัลพลาซ่า เชียงใหม่ แอร์พอร์ต
```

## Implementation Components

1. **Unified Payment Store** (`src/stores/paymentStore.js`)

   - Handles both Stripe and bank transfer payments
   - Manages customer information and package selection
   - Calculates prices (including discounts)
   - Stores all payment data in unified `payments` Firestore collection
   - Generates unique reference numbers for bank transfers

2. **Firebase Functions** (`functions/index.js`)

   - `storeBankTransferData` function
   - Stores bank transfer data in unified `payments` collection
   - Generates reference numbers in format: `BT-TIMESTAMP-RANDOM`
   - Maintains data consistency with Stripe payments

3. **Bank Transfer Thank You Page** (`src/views/BankTransferThankYou.vue`)

   - Displays bank transfer instructions
   - Shows customer and order information
   - Provides bank account details with copy functionality
   - Mobile-friendly design with sharing capabilities

4. **Test Page** (`src/views/BankTransferTest.vue`)
   - Simple interface for testing bank transfers
   - Allows selecting packages and payment types
   - Redirects to thank you page with order details

## Flow

1. Customer selects a package and payment type (full payment or 50% deposit)
2. Customer fills in their information
3. Customer selects "Bank Transfer" as payment method
4. System generates a unique reference number
5. Bank transfer instructions are displayed with account details
6. Customer makes the transfer using their banking app
7. Customer sends the transfer slip to WebsDee via Line or email
8. WebsDee confirms the payment and begins work on the project

## Reference Number Format

Reference numbers are generated in the format: `BT-TIMESTAMP-RANDOM`

- Prefix: BT (Bank Transfer)
- Timestamp: Current timestamp for uniqueness
- Random: Random 6-character string for additional uniqueness

Example: `BT-1703123456-A1B2C3`

This ensures unique tracking across all payment methods in the unified `payments` collection.

## Testing

You can test the bank transfer implementation by visiting:
`/bank-transfer-test`

This page allows you to:

- Enter customer information
- Select a package
- Choose payment type (full or deposit)
- Generate bank transfer instructions

## Integration with Main Payment Flow

The bank transfer option appears alongside other payment methods in the PaymentModal component. When selected, it:

1. Syncs customer information to the bank transfer store
2. Processes the bank transfer through the bank transfer store
3. Displays the bank transfer instructions modal
4. Tracks the selection in analytics

## Future Improvements

- Add email notifications for bank transfers
- Create admin interface for tracking and managing bank transfers
- Implement automatic payment verification (if possible)
- Add QR code generation for Thai banking apps

## Security Considerations

- Reference numbers help track payments and reduce errors
- Customer data is stored securely
- No sensitive bank information is exposed in client-side code
- Instructions emphasize the importance of including the reference number
