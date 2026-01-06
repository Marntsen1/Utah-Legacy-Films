# Step-by-Step n8n Setup - Follow Exactly

This guide walks you through every single click. Follow it in order.

---

## PART 1: Set Up Credentials (Do This First!)

### Step 1.1: Set Up Stripe Credentials

1. In n8n, click **"Credentials"** in the left sidebar
2. Click **"+ Add Credential"** button (top right)
3. In the search box, type: `stripe`
4. Click on **"Stripe API"** from the results
5. You'll see a form with fields:
   - **Secret Key**: Paste your Stripe Secret Key here
     - Get it from: https://dashboard.stripe.com/apikeys
     - Use `sk_test_...` for testing
     - Use `sk_live_...` for production
   - **Name**: Type `Stripe Account` (or any name you prefer)
6. Click **"Save"** button
7. ✅ You should see "Stripe Account" in your credentials list

### Step 1.2: Set Up SMTP Email Credentials

1. Still in **Credentials**, click **"+ Add Credential"** again
2. In the search box, type: `smtp`
3. Click on **"SMTP"** from the results
4. Fill in the form:
   - **Host**: Your SMTP server
     - Gmail: `smtp.gmail.com`
     - Hostinger: `smtp.hostinger.com`
     - Or check your email provider's settings
   - **Port**: Usually `587` (TLS) or `465` (SSL)
   - **User**: Your email address (e.g., `yourname@utahlegacyfilms.com`)
   - **Password**: Your email password (or app password for Gmail)
   - **Secure**: Select `TLS` if port is 587, or `SSL` if port is 465
   - **Name**: Type `SMTP Account`
5. Click **"Save"** button
6. ✅ You should see "SMTP Account" in your credentials list

---

## PART 2: Import and Configure Workflows

### Step 2.1: Import Booking Request with Payment Workflow

1. Click **"Workflows"** in the left sidebar
2. Click **"+"** button (top right) → Select **"Import from File"**
3. Navigate to your project folder: `n8n-workflows/booking-with-payment-workflow.json`
4. Click **"Open"** or **"Import"**
5. The workflow will open in the editor

**Now configure it:**

6. **Configure Stripe HTTP Request Node:**
   - Click on the node labeled **"Stripe API - Create Payment Intent"**
   - This node uses HTTP Request to call Stripe's API directly
   - **Option A (Recommended)**: Set up HTTP Header Auth credential:
     - Go to Credentials → Add → Search "Header Auth"
     - Name: `Stripe API Key`
     - Name field: `Authorization`
     - Value: `Bearer sk_test_YOUR_SECRET_KEY` (replace with your actual key)
     - Save, then select this credential in the node
   - **Option B (Simpler)**: Manually set the header:
     - In the node, find **"Header Parameters"**
     - Find the **Authorization** header
     - Change the value to: `Bearer sk_test_YOUR_ACTUAL_SECRET_KEY`
     - Replace with your real Stripe Secret Key from https://dashboard.stripe.com/apikeys
   - Save the node

7. **Configure Email Node:**
   - Click on **"Send Booking Email (Async)"** node
   - In the settings:
     - **From Email**: Change to your business email (e.g., `noreply@utahlegacyfilms.com`)
     - **To Email**: Change to your personal email (where you want to receive bookings)
     - **Subject**: You can leave as is or customize
     - **Credential to connect with**: Select **"SMTP Account"**

8. **Configure File Save Node:**
   - Click on **"Save to File (for daily summary)"** node
   - **File Name**: Should be `bookings.csv` (verify this)
   - This is where bookings are stored for the daily summary

9. **Save the Workflow:**
   - Click **"Save"** button (top right, or Ctrl+S / Cmd+S)

10. **Activate the Workflow:**
    - Toggle the switch in the top right from **"Inactive"** to **"Active"**
    - The switch should turn green/blue

11. **Get the Webhook URL:**
    - Click on **"Webhook - Booking Request"** node
    - Look at the bottom of the node or in the right panel
    - You'll see a URL like: `https://your-n8n-instance.com/webhook/booking-request`
    - **COPY THIS URL** - You'll need it later!
    - Save it somewhere safe (notepad, notes app, etc.)

### Step 2.2: Import Free Questions Form Workflow

1. Click **"Workflows"** in the left sidebar
2. Click **"+"** button → **"Import from File"**
3. Select: `n8n-workflows/free-questions-workflow.json`
4. Click **"Open"** or **"Import"**

**Configure it:**

5. **Configure Email Node:**
   - Click on **"Send Email Notification"** node
   - **From Email**: Your business email
   - **To Email**: Your personal email
   - **Credential to connect with**: Select **"SMTP Account"**

6. **Save the Workflow:**
   - Click **"Save"** button

7. **Activate the Workflow:**
   - Toggle to **"Active"**

8. **Get the Webhook URL:**
    - Click on **"Webhook - Free Questions"** node
    - **COPY THE URL** - Save it!

### Step 2.3: Import Daily Booking Summary Workflow

1. Click **"Workflows"** in the left sidebar
2. Click **"+"** button → **"Import from File"**
3. Select: `n8n-workflows/daily-summary-workflow.json`
4. Click **"Open"** or **"Import"**

**Configure it:**

5. **Configure First Email Node:**
   - Click on **"Send Summary Email"** node
   - **From Email**: Your business email
   - **To Email**: Your personal email
   - **Credential to connect with**: Select **"SMTP Account"**

6. **Configure Second Email Node:**
   - Click on **"Send No Bookings Email"** node
   - **From Email**: Your business email
   - **To Email**: Your personal email
   - **Credential to connect with**: Select **"SMTP Account"**

7. **Verify File Path:**
   - Click on **"Read Bookings File"** node
   - **File Name**: Should be `bookings.csv`
   - This must match the file name in the booking workflow!

8. **Save the Workflow:**
   - Click **"Save"** button

9. **Activate the Workflow:**
   - Toggle to **"Active"**
   - This workflow will run automatically at 5 PM daily

---

## PART 3: Update Environment Variables

### Step 3.1: Update Local Environment (.env.local)

1. Open your project folder
2. Open the file `.env.local` (create it if it doesn't exist)
3. Add or update these lines:

```env
# n8n Webhook URLs (paste the URLs you copied in Part 2)
VITE_N8N_WEBHOOK_BOOKING=https://your-n8n-instance.com/webhook/booking-request
VITE_N8N_WEBHOOK_CTA=https://your-n8n-instance.com/webhook/free-questions

# Stripe Publishable Key (get from Stripe Dashboard)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

4. **Replace the URLs** with the actual webhook URLs you copied
5. **Get your Stripe Publishable Key:**
   - Go to https://dashboard.stripe.com/apikeys
   - Copy the **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - Paste it in the `.env.local` file
6. Save the file

### Step 3.2: Update Vercel Environment Variables

1. Go to https://vercel.com
2. Log in and select your project
3. Go to **Settings** → **Environment Variables**
4. For each variable, click **"Add New"**:

   **Variable 1:**
   - **Key**: `VITE_N8N_WEBHOOK_BOOKING`
   - **Value**: Your booking webhook URL
   - **Environments**: Check all (Production, Preview, Development)
   - Click **"Save"**

   **Variable 2:**
   - **Key**: `VITE_N8N_WEBHOOK_CTA`
   - **Value**: Your free questions webhook URL
   - **Environments**: Check all
   - Click **"Save"**

   **Variable 3:**
   - **Key**: `VITE_STRIPE_PUBLISHABLE_KEY`
   - **Value**: Your Stripe publishable key
   - **Environments**: Check all
   - Click **"Save"**

5. **Redeploy your site:**
   - Go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Click **"Redeploy"**
   - Or push a new commit to trigger a redeploy

---

## PART 4: Testing

### Step 4.1: Test Booking Request

1. Go to your website (local or deployed)
2. Click on any package → **"Reserve Your Session"**
3. Fill out the form:
   - Name: Test Name
   - Email: Your email
   - Select a date and time
4. Click **"Continue to Reserve"**
5. You should see the payment form
6. **Check n8n:**
   - Go to your n8n instance
   - Click on the **"Booking Request with Payment"** workflow
   - Click **"Executions"** tab
   - You should see a new execution - click it to view details
7. **Test Payment:**
   - In the payment form, enter test card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/25`)
   - CVC: Any 3 digits (e.g., `123`)
   - ZIP: Any ZIP code (e.g., `12345`)
   - Click **"Pay $X.XX Now"**
8. **Check Results:**
   - Check your email for booking confirmation
   - Check n8n executions for successful runs
   - Check browser console for any errors

### Step 4.2: Test Free Questions Form

1. Scroll to the bottom of your website
2. Find the **"Free Interview Questions"** form
3. Fill it out and submit
4. **Check:**
   - Browser console for errors
   - n8n executions (Free Questions workflow)
   - Your email for notification

### Step 4.3: Test Daily Summary (Manual)

1. In n8n, go to **"Daily Booking Summary"** workflow
2. Click the **"Execute Workflow"** button (play icon)
3. Check your email for the summary
4. (It will also run automatically at 5 PM daily)

---

## ✅ Verification Checklist

Use this to verify everything is set up:

- [ ] Stripe credentials created in n8n
- [ ] SMTP credentials created in n8n
- [ ] Booking Request workflow imported
- [ ] Booking Request workflow configured (Stripe + Email)
- [ ] Booking Request workflow is Active
- [ ] Booking Request webhook URL copied
- [ ] Free Questions workflow imported
- [ ] Free Questions workflow configured (Email)
- [ ] Free Questions workflow is Active
- [ ] Free Questions webhook URL copied
- [ ] Daily Summary workflow imported
- [ ] Daily Summary workflow configured (Both Email nodes)
- [ ] Daily Summary workflow is Active
- [ ] `.env.local` file updated with all URLs and keys
- [ ] Vercel environment variables updated
- [ ] Site redeployed on Vercel
- [ ] Tested booking request
- [ ] Tested payment processing
- [ ] Tested free questions form
- [ ] Received test emails

---

## 🆘 Troubleshooting

### "Workflow not triggering"
- ✅ Check workflow is Active (toggle in top right)
- ✅ Verify webhook URL matches environment variable
- ✅ Check n8n instance is accessible

### "Payment intent not created"
- ✅ Check Stripe credentials are selected in workflow
- ✅ Verify Secret key is correct (starts with `sk_`)
- ✅ Check n8n execution logs for errors

### "Email not sending"
- ✅ Check SMTP credentials are correct
- ✅ Verify email addresses in workflow nodes
- ✅ Check n8n execution logs for SMTP errors

### "CORS errors"
- ✅ Workflows already include CORS headers
- ✅ Verify webhook URLs are correct
- ✅ Ensure workflows are Active

---

**You're done!** 🎉 All workflows should now be working. If you encounter any issues, check the troubleshooting section or the execution logs in n8n.

