# n8n Stripe Payment Setup Guide

This guide will walk you through setting up the n8n workflow to handle Stripe payment intents for your booking system.

## Overview

The workflow handles two types of requests:
1. **Payment Intent Creation** - When the payment form needs to create a payment intent
2. **Booking Submission** - When a booking is completed with payment

## Step-by-Step Setup

### Step 1: Get Your Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **API keys**
3. Copy your **Secret key** (starts with `sk_test_` for testing or `sk_live_` for production)
   - ⚠️ **Important**: Use the **Secret key**, NOT the publishable key
   - For testing, use `sk_test_...`
   - For production, use `sk_live_...`

### Step 2: Import the Workflow

1. Open your n8n instance
2. Go to **Workflows** → Click **Import from File**
3. Select `n8n-workflows/booking-with-payment-workflow.json`
4. The workflow will be imported with all nodes configured

### Step 3: Configure Stripe Credentials

1. In the imported workflow, find the **"Stripe - Create Payment Intent"** node
2. Click on the node to open its settings
3. Click **"Create New Credential"** or select existing Stripe credentials
4. Enter your Stripe **Secret key**:
   - For testing: `sk_test_...`
   - For production: `sk_live_...`
5. Click **"Save"** to save the credentials
6. The node should now show your Stripe account name

### Step 4: Update Email Settings

1. Find the **"Send Booking Email (Async)"** node
2. Update the email fields:
   - **From Email**: Your business email (e.g., `noreply@utahlegacyfilms.com`)
   - **To Email**: Your personal email where you want to receive bookings
   - **Subject**: Customize if needed
3. Make sure your SMTP credentials are configured in n8n

### Step 5: Activate the Workflow

1. Toggle the workflow to **"Active"** (top right of the workflow editor)
2. Click on the **"Webhook - Booking Request"** node
3. Copy the **Webhook URL** shown at the bottom of the node
   - It will look like: `https://your-n8n-instance.com/webhook/booking-request`
4. This is the URL you'll use in your environment variables

### Step 6: Update Environment Variables

#### For Local Development

Add to your `.env.local` file:

```env
VITE_N8N_WEBHOOK_BOOKING=https://your-n8n-instance.com/webhook/booking-request
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

#### For Production (Vercel)

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add these variables:
   - `VITE_N8N_WEBHOOK_BOOKING` = Your webhook URL
   - `VITE_STRIPE_PUBLISHABLE_KEY` = Your Stripe publishable key
3. Select **Production**, **Preview**, and **Development** environments
4. Click **Save**
5. **Redeploy** your site for changes to take effect

### Step 7: Test the Workflow

1. **Test Payment Intent Creation**:
   - Open your website
   - Go through the booking form
   - When you reach the payment step, check the browser console
   - You should see the payment form initialize
   - Check n8n execution logs to see if the payment intent was created

2. **Test Complete Booking**:
   - Complete a test booking with Stripe test card: `4242 4242 4242 4242`
   - Use any future expiry date, any CVC, any ZIP
   - Check your email for the booking confirmation
   - Check n8n execution logs to verify the booking was saved

## Workflow Structure

The workflow uses an **IF node** to route requests:

```
Webhook Request
    ↓
IF: Is this a payment intent request?
    ├─ YES → Create Payment Intent → Return clientSecret
    └─ NO → Process Booking → Send Email → Save to File
```

### Payment Intent Flow

When `action: 'create_payment_intent'` is received:
1. Extract amount and package name
2. Create Stripe payment intent
3. Return `clientSecret` to frontend

### Booking Flow

When booking data is received:
1. Extract booking information
2. Respond immediately (fast response)
3. Send email asynchronously
4. Save to file for daily summary

## Troubleshooting

### Payment Intent Not Created

**Problem**: Payment form shows "Payment processing requires backend setup"

**Solutions**:
- Check that Stripe credentials are configured correctly
- Verify the Secret key starts with `sk_test_` or `sk_live_`
- Check n8n execution logs for errors
- Ensure the workflow is **Active**

### CORS Errors

**Problem**: "Failed to fetch" or CORS errors in browser console

**Solutions**:
- The workflow already includes CORS headers
- If issues persist, check that the webhook URL is correct
- Verify the workflow is active and accessible

### Payment Succeeds but Booking Not Saved

**Problem**: Payment goes through but no email received

**Solutions**:
- Check n8n execution logs
- Verify SMTP credentials are configured
- Check that the booking data is being sent correctly
- Look for errors in the "Set Booking Data" node

### Workflow Not Triggering

**Problem**: No executions showing in n8n

**Solutions**:
- Ensure workflow is **Active** (toggle in top right)
- Check webhook URL matches your environment variable
- Verify the webhook path is correct: `booking-request`
- Check n8n instance is accessible from the internet

## Testing with Stripe Test Mode

1. Use Stripe test cards:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **3D Secure**: `4000 0025 0000 3155`

2. Use any:
   - Future expiry date (e.g., `12/25`)
   - Any 3-digit CVC
   - Any ZIP code

3. Check Stripe Dashboard → **Payments** to see test transactions

## Going Live

When ready for production:

1. **Switch to Live Keys**:
   - Get live keys from Stripe Dashboard
   - Update Stripe credentials in n8n workflow
   - Update `VITE_STRIPE_PUBLISHABLE_KEY` in Vercel

2. **Test Thoroughly**:
   - Test complete booking flow
   - Verify emails are received
   - Check payment processing
   - Monitor n8n execution logs

3. **Monitor**:
   - Check Stripe Dashboard regularly
   - Monitor n8n execution logs
   - Set up Stripe webhooks for payment events (optional)

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [n8n Documentation](https://docs.n8n.io)
- [Stripe Test Cards](https://stripe.com/docs/testing)

## Need Help?

If you encounter issues:
1. Check n8n execution logs for detailed error messages
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Ensure all credentials are configured in n8n

