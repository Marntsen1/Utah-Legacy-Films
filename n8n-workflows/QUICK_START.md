# Quick Start Guide - n8n Setup

## 🚀 Fast Setup (5 Minutes)

### Step 1: Set Up Credentials (2 min)

1. **Stripe**: Credentials → Add → Stripe API → Enter Secret Key (`sk_test_...`)
2. **SMTP**: Credentials → Add → SMTP → Enter your email settings

### Step 2: Import Workflows (2 min)

1. Import `booking-with-payment-workflow.json` → Configure → Activate → Copy Webhook URL
2. Import `free-questions-workflow.json` → Configure → Activate → Copy Webhook URL
3. Import `daily-summary-workflow.json` → Configure → Activate

### Step 3: Update Environment Variables (1 min)

Add to `.env.local` and Vercel:
```env
VITE_N8N_WEBHOOK_BOOKING=your-webhook-url-1
VITE_N8N_WEBHOOK_CTA=your-webhook-url-2
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**Done!** 🎉

For detailed instructions, see `HOSTINGER_SETUP_COMPLETE.md`

