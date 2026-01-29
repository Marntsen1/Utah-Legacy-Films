# Payment Setup Guide - Step by Step

This guide will help you set up the payment processing system so customers can pay 50% upfront when booking.

---

## Overview

The payment flow works like this:
1. Customer fills out booking form → submits
2. Customer is taken to payment form
3. Payment form creates a Stripe Payment Intent via n8n
4. Customer enters card details and pays
5. Payment is confirmed and booking is saved

---

## Step 1: Get Your Stripe Keys

1. Go to https://dashboard.stripe.com/apikeys
2. If you don't have a Stripe account, create one (it's free)
3. Copy your **Publishable Key** (starts with `pk_test_...` for testing)
4. Copy your **Secret Key** (starts with `sk_test_...` for testing)
   - ⚠️ **Keep this secret!** Never share it or commit it to Git

---

## Step 2: Set Up Environment Variables

### Local Development (.env.local)

Create or update `.env.local` in your project root:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
VITE_N8N_WEBHOOK_BOOKING=https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request
```

**Important:** Replace `YOUR_PUBLISHABLE_KEY_HERE` with your actual Stripe publishable key.

### Production (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - **Key**: `VITE_STRIPE_PUBLISHABLE_KEY`
   - **Value**: `pk_test_YOUR_KEY` (or `pk_live_...` for production)
   - **Environment**: Production, Preview, Development (check all)
4. Click **Save**
5. Redeploy your site

---

## Step 3: Set Up n8n Workflow

### Option A: Use the Unified Workflow (Recommended)

The unified workflow handles both payment intent creation AND booking submission.

1. **Import the workflow:**
   - In n8n, go to **Workflows** → **+** → **Import from File**
   - Select: `n8n-workflows/booking-with-payment-intent-workflow.json`

2. **Configure Stripe API Node:**
   - Click on **"Stripe API - Create Payment Intent"** node
   - **Method**: POST
   - **URL**: `https://api.stripe.com/v1/payment_intents`
   - **Authentication**: Header Auth
   - **Header Name**: `Authorization`
   - **Header Value**: `Bearer sk_test_YOUR_SECRET_KEY`
     - Replace `YOUR_SECRET_KEY` with your actual Stripe Secret Key
   - Save the node

3. **Configure Email Node:**
   - Click on **"Send Booking Email"** node
   - **From Email**: Your business email (e.g., `noreply@utahlegacyfilms.com`)
   - **To Email**: Your personal email (where you want bookings sent)
   - **SMTP Credentials**: Select your SMTP credential
   - Save the node

4. **Activate the Workflow:**
   - Toggle the switch in the top right to **Active** (green/blue)

5. **Get the Webhook URL:**
   - Click on **"Webhook - Booking Request"** node
   - Copy the webhook URL (should be something like: `https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request`)
   - Make sure this matches your `.env.local` file

---

## Step 4: Test the Payment Flow

### Test Mode (Recommended First)

1. **Use Stripe Test Cards:**
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - 3D Secure: `4000 0025 0000 3155`
   - Use any future expiry date (e.g., `12/34`)
   - Use any 3-digit CVC
   - Use any ZIP code

2. **Test the Flow:**
   - Go to your website
   - Click "Book This Package" on any package
   - Fill out the booking form
   - Click "Continue to Reserve"
   - You should see the payment form
   - Enter test card: `4242 4242 4242 4242`
   - Complete the payment
   - You should see a success message

3. **Check Stripe Dashboard:**
   - Go to https://dashboard.stripe.com/test/payments
   - You should see the test payment

4. **Check Your Email:**
   - You should receive a booking confirmation email

---

## Step 5: Troubleshooting

### Issue: "Payment processing requires backend setup"

**Solution:**
- Check that your n8n workflow is **Active**
- Verify the webhook URL in `.env.local` matches your n8n workflow URL
- Check that the Stripe API node in n8n has the correct Secret Key
- Restart your dev server: `npm run dev`

### Issue: "Failed to create payment intent"

**Solution:**
- Check n8n workflow execution logs
- Verify Stripe Secret Key is correct (starts with `sk_test_...`)
- Check that the HTTP Request node is configured correctly
- Make sure CORS headers are set in the response node

### Issue: Payment form shows "Stripe is not configured"

**Solution:**
- Add `VITE_STRIPE_PUBLISHABLE_KEY` to `.env.local`
- Restart your dev server
- For production, add it to Vercel environment variables

### Issue: Payment succeeds but booking email not sent

**Solution:**
- Check n8n workflow execution logs
- Verify email node is configured correctly
- Check SMTP credentials
- Make sure the workflow path goes through both payment AND booking branches

---

## Step 6: Go Live (Production)

When you're ready to accept real payments:

1. **Switch to Live Keys:**
   - In Stripe Dashboard, toggle to **Live mode**
   - Copy your **Live Publishable Key** (`pk_live_...`)
   - Copy your **Live Secret Key** (`sk_live_...`)

2. **Update Environment Variables:**
   - Update `.env.local` with live publishable key
   - Update Vercel environment variables with live publishable key
   - Update n8n workflow with live secret key

3. **Test with Real Card:**
   - Use a real card with a small amount first
   - Verify payment appears in Stripe Dashboard
   - Verify email is received

---

## Security Checklist

- ✅ Stripe Secret Key is ONLY in n8n (never in client code)
- ✅ Stripe Publishable Key is in environment variables (not hardcoded)
- ✅ `.env.local` is in `.gitignore` (not committed to Git)
- ✅ CORS headers are configured in n8n workflow
- ✅ Input sanitization is enabled (already done)
- ✅ Rate limiting is enabled (already done)

---

## Support

If you're still having issues:

1. Check browser console for errors (F12)
2. Check n8n workflow execution logs
3. Check Stripe Dashboard → Logs for API errors
4. Verify all environment variables are set correctly

---

## Next Steps

After payment is working:

1. Set up Stripe webhooks for payment status updates (optional)
2. Set up email templates for better booking confirmations
3. Add payment receipts
4. Set up refund handling (if needed)
