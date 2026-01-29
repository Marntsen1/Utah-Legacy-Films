# Webhook URL Setup - Complete ✅

## ✅ Already Implemented!

Your webhook URL `https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request` is already implemented in the code as the fallback URL.

## Current Status

The code will use this URL in two ways:

1. **If `.env.local` is set**: Uses `VITE_N8N_WEBHOOK_BOOKING` from environment variable
2. **If not set**: Uses fallback: `https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request`

## Update Your .env.local File (Recommended)

To make it explicit, update your `.env.local` file:

```env
VITE_N8N_WEBHOOK_BOOKING=https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request
VITE_N8N_WEBHOOK_CTA=https://mattarntsen.app.n8n.cloud/webhook-test/free-questions
```

**Then restart your dev server:**
```bash
npm run dev
```

## Where It's Used

The webhook URL is used in:

1. **`components/Pricing.tsx`** (line 265)
   - Sends booking data after payment succeeds
   - Fallback: `https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request`

2. **`components/PaymentForm.tsx`** (line 37)
   - Creates Stripe payment intent
   - Fallback: `https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request`

## For Production (Vercel)

1. Go to Vercel → Your Project → Settings → Environment Variables
2. Add:
   - **Key**: `VITE_N8N_WEBHOOK_BOOKING`
   - **Value**: `https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request`
   - **Environment**: Production, Preview, Development (check all)
3. Click **Save**
4. Redeploy your site

## Testing

To test if the webhook is working:

1. **Browser Console Test:**
   ```javascript
   fetch('https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ test: true })
   })
   .then(r => r.json())
   .then(console.log)
   .catch(console.error);
   ```

2. **Test the Booking Flow:**
   - Go to your website
   - Click "Book This Package"
   - Fill out the form
   - Complete payment
   - Check n8n dashboard for the webhook execution

## Verify It's Working

1. Check browser console (F12) for any errors
2. Check n8n dashboard → Executions to see if requests are received
3. Check that your n8n workflow is **Active**

---

**Status:** ✅ Webhook URL is implemented and ready to use!
