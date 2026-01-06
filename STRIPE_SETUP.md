# Stripe Payment Integration Setup

## Overview

The booking form now includes Stripe payment processing with:
- **50% upfront payment** when booking
- **50% remainder** due upon delivery
- Secure card processing via Stripe

## Step 1: Create Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Sign up for an account
3. Complete account verification

## Step 2: Get Your API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **API keys**
3. Copy your **Publishable key** (starts with `pk_`)
4. Copy your **Secret key** (starts with `sk_`) - keep this secret!

## Step 3: Configure Environment Variables

### For Local Development

Add to your `.env.local` file:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

**Note**: Use `pk_test_` for testing, `pk_live_` for production

### For Production (Vercel)

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - Key: `VITE_STRIPE_PUBLISHABLE_KEY`
   - Value: Your Stripe publishable key
   - Environment: Production, Preview, Development
3. Redeploy your site

## Step 4: Set Up Backend (Required for Production)

**IMPORTANT**: For security, payment intents MUST be created server-side.

### Option A: Use n8n to Create Payment Intents (Recommended)

1. **Import the workflow**:
   - Go to n8n → Workflows → Import from File
   - Import `n8n-workflows/stripe-payment-intent-workflow.json`

2. **Configure Stripe credentials**:
   - In the "Stripe - Create Payment Intent" node, add your Stripe API credentials
   - Use your **Secret key** (starts with `sk_`) - NOT the publishable key
   - Test keys: `sk_test_...` for testing
   - Live keys: `sk_live_...` for production

3. **Activate the workflow**:
   - Toggle the workflow to "Active"
   - Copy the webhook URL (from the Webhook node)
   - Update your booking workflow to call this URL when `action: 'create_payment_intent'` is received

4. **Update PaymentForm.tsx**:
   - The PaymentForm already calls the booking webhook with `action: 'create_payment_intent'`
   - You can either:
     - Update your existing booking workflow to handle payment intent creation
     - Or create a separate webhook URL specifically for payment intents

### Option B: Create Serverless Function

Create a serverless function (Vercel Functions, Netlify Functions, etc.) that:
1. Receives payment request
2. Uses Stripe API to create payment intent
3. Returns client secret to frontend

## Step 5: Update n8n Workflow

Update your booking workflow to:
1. Receive payment intent ID
2. Store payment status
3. Track which bookings have been paid

## Current Implementation

The current code will:
- ✅ Collect card information securely
- ✅ Create payment method
- ⚠️ **Needs backend** to create payment intents securely

## Security Notes

- **Never** expose your Stripe secret key in frontend code
- Always create payment intents server-side
- Use test keys (`pk_test_`) for development
- Switch to live keys (`pk_live_`) only in production

## Testing

1. Use Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code

2. Test the payment flow:
   - Submit booking form
   - Enter test card details
   - Complete payment
   - Verify webhook receives payment info

## Payment Flow

1. User fills booking form → Step 1
2. User enters card details → Step 2 (Payment)
3. Payment processed (50% of package price)
4. Booking confirmed → Step 3 (Success)
5. Webhook receives booking + payment data
6. Remaining 50% collected upon delivery

## Troubleshooting

- **"Stripe not configured"**: Add `VITE_STRIPE_PUBLISHABLE_KEY` to environment variables
- **Payment fails**: Check Stripe dashboard for error logs
- **CORS errors**: Ensure Stripe keys are correct
- **Payment intent errors**: Set up backend endpoint to create payment intents

