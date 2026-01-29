# Webhook "Failed to Fetch" Troubleshooting Guide

## Quick Fixes

### 1. Check n8n Workflow Status
- ✅ Go to your n8n dashboard
- ✅ Find the "Booking Request" workflow
- ✅ Make sure it's **ACTIVE** (toggle should be green/blue)
- ✅ If inactive, click the toggle to activate it

### 2. Verify Webhook URL
Check your `.env.local` file:
```env
VITE_N8N_WEBHOOK_BOOKING=https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request
```

**Important:** 
- Make sure the URL matches exactly what's in your n8n workflow
- Restart your dev server after changing: `npm run dev`

### 3. Test Webhook Directly

Open your browser console (F12) and run:
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

**Expected:** Should return a response (even if error)
**If fails:** Webhook is not accessible or CORS issue

---

## Common Issues & Solutions

### Issue: "Failed to fetch" Error

**Possible Causes:**
1. n8n workflow is not active
2. Webhook URL is incorrect
3. CORS not configured in n8n
4. Network/firewall blocking request

**Solutions:**

#### Solution 1: Check n8n Workflow
1. Open n8n dashboard
2. Find your booking workflow
3. Click on the **Webhook** node
4. Verify:
   - Path matches: `/webhook-test/booking-request`
   - HTTP Method: `POST`
   - Response Mode: `Respond to Webhook`
5. Check if workflow is **Active**

#### Solution 2: Add CORS Headers to n8n
In your n8n workflow, make sure the **Respond to Webhook** node has:
- **Response Headers**:
  - `Access-Control-Allow-Origin: *`
  - `Access-Control-Allow-Methods: POST, OPTIONS`
  - `Access-Control-Allow-Headers: Content-Type`

#### Solution 3: Test Webhook Manually
Use curl or Postman to test:
```bash
curl -X POST https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

---

## Updated Code Behavior

The code has been updated to:
- ✅ **Not block success** if webhook fails (payment still succeeded)
- ✅ **Log errors** to console for debugging
- ✅ **Handle timeouts** (10 second limit)
- ✅ **Show success** even if webhook fails

**Why?** Because the payment already succeeded, so the booking is valid. The webhook failure just means you won't get an immediate email notification, but you can still:
- See the booking in Stripe Dashboard
- Retrieve booking data from payment metadata
- Manually process the booking

---

## For Production (Vercel)

1. **Add Environment Variable:**
   - Go to Vercel → Settings → Environment Variables
   - Add: `VITE_N8N_WEBHOOK_BOOKING` = your webhook URL
   - Redeploy

2. **Check Vercel Logs:**
   - Go to Vercel → Your Project → Functions
   - Check for any errors

---

## Alternative: Use Stripe Webhooks

Instead of relying on the booking webhook, you can:
1. Set up Stripe webhooks to notify you of payments
2. Retrieve booking data from Stripe payment metadata
3. This is more reliable than client-side webhooks

**Stripe Webhook Setup:**
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: Your n8n webhook URL
3. Select events: `payment_intent.succeeded`
4. Stripe will send payment data to your webhook automatically

---

## Still Having Issues?

1. **Check Browser Console:**
   - Open DevTools (F12) → Console
   - Look for specific error messages
   - Share the error with support

2. **Check n8n Execution Logs:**
   - Go to n8n → Executions
   - See if requests are reaching n8n
   - Check for errors in workflow execution

3. **Verify Network:**
   - Try accessing webhook URL directly in browser
   - Check if it's accessible from your network
   - Some corporate networks block external webhooks

---

## Quick Test Checklist

- [ ] n8n workflow is **Active**
- [ ] Webhook URL matches exactly
- [ ] CORS headers are set in n8n
- [ ] `.env.local` has correct URL
- [ ] Dev server restarted after `.env.local` change
- [ ] Can access webhook URL directly (test with curl)
- [ ] Browser console shows specific error (not just "Failed to fetch")

---

## Note About Payment Success

**Important:** Even if the webhook fails, the payment still succeeded. The booking is valid. The error just means:
- You won't get an immediate email notification
- But you can still see the booking in Stripe
- And manually process it

The code now handles this gracefully - it shows success even if webhook fails, because the payment is what matters.
