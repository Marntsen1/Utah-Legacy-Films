# Fixing "Failed to fetch" Error - CORS Configuration

## The Problem

"Failed to fetch" usually means:
1. **CORS (Cross-Origin Resource Sharing) issue** - n8n is blocking requests from your website
2. **Workflow not active** - The n8n workflow needs to be activated
3. **Webhook URL incorrect** - Double-check the URL matches exactly

## Solution 1: Update n8n Workflow - Add CORS Headers

### Option A: In n8n Web Interface (Easiest)

1. **Open your booking workflow in n8n**
2. **Click on the "Respond to Webhook" node**
3. **Click "Options" or expand advanced settings**
4. **Add Response Headers**:
   - Click "Add Header" or find "Response Headers" section
   - Add these three headers:
     - `Access-Control-Allow-Origin` = `*`
     - `Access-Control-Allow-Methods` = `POST, OPTIONS`
     - `Access-Control-Allow-Headers` = `Content-Type`
5. **Save the workflow**
6. **Activate the workflow** (toggle switch at top right)

### Option B: Re-import Updated Workflow

I've updated the workflow JSON files with CORS headers. You can:

1. **Delete your current workflow** (or create a new one)
2. **Import the updated JSON file**: `booking-request-workflow.json`
3. **Configure email settings** (if using email node)
4. **Activate the workflow**

## Solution 2: Verify Workflow is Active

**CRITICAL**: The workflow must be **ACTIVE** (green toggle ON) for webhooks to work!

1. In n8n, look at the top right of your workflow
2. Make sure the toggle is **ON/GREEN** (not gray/off)
3. If it's off, click it to activate

## Solution 3: Test Webhook Directly

Test if the webhook works outside your website:

```bash
curl -X POST https://mattarntsen.app.n8n.cloud/webhook-test/booking-request \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "email": "test@example.com", "selectedDate": "2024-12-20", "selectedTime": "11:00 AM"}'
```

Or test in browser console:
```javascript
fetch('https://mattarntsen.app.n8n.cloud/webhook-test/booking-request', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ test: 'data' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

## Solution 4: Check n8n Instance Settings

Some n8n instances have CORS disabled at the instance level:

1. Check your n8n instance settings
2. Look for "CORS" or "Security" settings
3. Enable CORS if it's disabled
4. Or whitelist your website domain

## What I've Updated

✅ Added CORS headers to workflow JSON files  
✅ Enabled `mode: 'cors'` in fetch requests  
✅ Updated both booking and free questions workflows

## Next Steps

1. **Re-import the updated workflow JSON** (or manually add CORS headers)
2. **Make sure workflow is ACTIVE**
3. **Test the webhook** using curl or browser console
4. **Try submitting the form again**

The code changes are already deployed - you just need to update your n8n workflow!
