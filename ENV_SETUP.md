# Environment Variables Setup Guide

## Problem: "Webhook URL not configured"

This error means the environment variables aren't being loaded. Here's how to fix it:

## For Local Development

### Step 1: Create `.env.local` file

Create a file named `.env.local` in the project root (same folder as `package.json`):

```env
VITE_N8N_WEBHOOK_CTA=https://mattarntsen.app.n8n.cloud/webhook-test/free-questions
VITE_N8N_WEBHOOK_BOOKING=https://mattarntsen.app.n8n.cloud/webhook-test/booking-request
```

### Step 2: Restart Dev Server

**IMPORTANT**: After creating or modifying `.env.local`, you MUST restart your dev server:

1. Stop the current server (Ctrl+C)
2. Start it again:
   ```bash
   npm run dev
   ```

Vite only reads environment variables when it starts, so changes won't take effect until you restart.

### Step 3: Verify It's Working

1. Open browser DevTools (F12)
2. Go to Console tab
3. Submit the form
4. You should see: `Webhook URL: https://mattarntsen.app.n8n.cloud/webhook-test/booking-request`

## For Production (Vercel)

### Step 1: Add Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project: `utah-legacy-films`
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add these two variables:

   **Variable 1:**
   - Key: `VITE_N8N_WEBHOOK_CTA`
   - Value: `https://mattarntsen.app.n8n.cloud/webhook-test/free-questions`
   - Environment: Select all (Production, Preview, Development)

   **Variable 2:**
   - Key: `VITE_N8N_WEBHOOK_BOOKING`
   - Value: `https://mattarntsen.app.n8n.cloud/webhook-test/booking-request`
   - Environment: Select all (Production, Preview, Development)

6. Click **Save**

### Step 2: Redeploy

After adding environment variables, you need to redeploy:

1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic deployment

## Troubleshooting

### Issue: Still says "not configured" after adding to Vercel

**Solution**: 
- Make sure variable names start with `VITE_`
- Make sure you selected all environments (Production, Preview, Development)
- Make sure you redeployed after adding variables

### Issue: Works locally but not in production

**Solution**:
- Check Vercel environment variables are set correctly
- Make sure you redeployed after adding them
- Check Vercel deployment logs for errors

### Issue: Can't see `.env.local` file

**Solution**:
- The file might be hidden (starts with `.`)
- In your file explorer, enable "Show hidden files"
- Or create it manually in the project root

## Quick Test

To test if environment variables are loading:

1. Open browser console
2. Type: `console.log(import.meta.env)`
3. You should see your `VITE_` variables listed

## Current Configuration

The code now has fallback URLs hardcoded, so it should work even if environment variables aren't set. But it's better to use environment variables for flexibility.

