# Testing Your n8n Webhooks

## Webhook URLs Configured

- **Booking Request**: `https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request`
- **Free Questions**: `https://n8n.srv1250103.hstgr.cloud/webhook-test/free-questions` (needs to be set up)

## Quick Test Steps

### 1. Test Booking Request Webhook

1. **Start your dev server** (if not running):
   ```bash
   npm run dev
   ```

2. **Open your website** in browser: `http://localhost:3000`

3. **Test the booking flow**:
   - Click on any package → "Reserve Your Session"
   - Fill out the form:
     - Name: Test User
     - Email: your-email@example.com
     - Select a date and time
   - Click "Continue to Reserve"
   - You should see the payment form (if Stripe is configured)

4. **Check n8n**:
   - Go to your n8n instance
   - Open the "Booking Request with Payment" workflow
   - Click "Executions" tab
   - You should see a new execution
   - Click on it to see the details

5. **Check your email**:
   - You should receive a booking confirmation email

### 2. Test Payment Intent Creation

When you reach the payment step:

1. **Check browser console** (F12 → Console tab):
   - Look for any errors
   - Should see "Initializing payment..." message

2. **Check n8n execution**:
   - Look for an execution with `action: 'create_payment_intent'`
   - Should see HTTP Request to Stripe API
   - Should see `clientSecret` in the response

3. **If payment form loads**:
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry (e.g., `12/25`)
   - Any CVC (e.g., `123`)
   - Any ZIP (e.g., `12345`)

### 3. Test Free Questions Form

1. **Scroll to bottom** of your website
2. **Fill out the form**:
   - Name: Test User
   - Email: your-email@example.com
   - Phone: (optional)
   - Interview For: Test Recipient
3. **Submit the form**
4. **Check n8n**:
   - Open "Free Questions Form" workflow
   - Check Executions tab
5. **Check your email** for notification

## Troubleshooting

### Webhook Not Triggering

- ✅ Check workflow is **Active** in n8n
- ✅ Verify webhook URL matches exactly
- ✅ Check browser console for errors
- ✅ Check n8n execution logs

### Payment Intent Not Created

- ✅ Check "Stripe API - Create Payment Intent" node
- ✅ Verify Authorization header has your Stripe Secret Key
- ✅ Check execution logs for HTTP errors
- ✅ Verify Stripe Secret Key is correct (starts with `sk_test_`)

### CORS Errors

- ✅ Workflows should have CORS headers
- ✅ Check webhook URLs are correct
- ✅ Verify workflows are Active

## Next Steps

1. **Set up Free Questions webhook** (if not done):
   - Import `free-questions-workflow.json`
   - Configure and activate
   - Get webhook URL
   - Update `.env.local` with the URL

2. **Add Stripe Publishable Key**:
   - Get from: https://dashboard.stripe.com/apikeys
   - Update `VITE_STRIPE_PUBLISHABLE_KEY` in `.env.local`
   - Restart dev server

3. **Test complete flow**:
   - Submit a test booking
   - Complete payment with test card
   - Verify email received

4. **Update Vercel** (for production):
   - Add environment variables in Vercel dashboard
   - Redeploy site

