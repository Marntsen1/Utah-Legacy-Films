# Quick Payment Fix Guide

## What Was Fixed

1. ✅ **Payment Amount Bug** - Fixed calculation that was dividing by 2 twice
2. ✅ **Better Error Handling** - Added clearer error messages
3. ✅ **Updated Webhook URL** - Uses your Hostinger n8n instance
4. ✅ **Unified Workflow** - Created workflow that handles both payment intent creation AND booking submission

---

## Quick Setup (5 Minutes)

### 1. Add Stripe Key to Environment

**Local (.env.local):**
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
```

**Vercel:**
- Settings → Environment Variables → Add `VITE_STRIPE_PUBLISHABLE_KEY`

### 2. Import n8n Workflow

1. Open n8n
2. Workflows → + → Import from File
3. Select: `n8n-workflows/booking-with-payment-intent-workflow.json`
4. Configure:
   - **Stripe API node**: Add your Stripe Secret Key (`sk_test_...`)
   - **Email node**: Add your email addresses
5. Activate workflow
6. Copy webhook URL (should match: `https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request`)

### 3. Test

1. Restart dev server: `npm run dev`
2. Go to website → Book a package
3. Fill form → Continue to Reserve
4. Use test card: `4242 4242 4242 4242`
5. Complete payment

---

## Common Issues

### "Payment processing requires backend setup"
- ✅ Check n8n workflow is **Active**
- ✅ Verify webhook URL matches in `.env.local`
- ✅ Check Stripe Secret Key in n8n workflow

### "Failed to create payment intent"
- ✅ Check n8n execution logs
- ✅ Verify Stripe Secret Key is correct
- ✅ Make sure workflow handles `action: 'create_payment_intent'`

### Payment amount shows $0.00
- ✅ Already fixed! Amount calculation corrected

---

## Need Help?

See `PAYMENT_SETUP_GUIDE.md` for detailed instructions.
