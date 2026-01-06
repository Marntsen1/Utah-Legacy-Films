# Complete n8n Setup Guide for Hostinger

This guide will help you set up all workflows for your Utah Legacy Films website on your new Hostinger n8n instance.

## 📋 Overview

You'll be setting up **3 main workflows**:

1. **Booking Request with Payment** - Handles booking submissions and Stripe payment intents
2. **Free Questions Form** - Handles the CTA form submissions
3. **Daily Booking Summary** - Sends daily email summaries at 5 PM

---

## 🚀 Step 1: Initial Setup

### 1.1 Access Your n8n Instance

1. Log into your Hostinger n8n instance
2. You should see the n8n dashboard

### 1.2 Set Up Credentials (Do This First!)

Before importing workflows, set up these credentials:

#### A. Stripe Credentials

1. Go to **Credentials** → **Add Credential**
2. Search for **"Stripe"**
3. Select **"Stripe API"**
4. Enter your **Stripe Secret Key**:
   - Get it from [Stripe Dashboard](https://dashboard.stripe.com) → Developers → API keys
   - Use `sk_test_...` for testing
   - Use `sk_live_...` for production
5. Name it: **"Stripe Account"**
6. Click **Save**

#### B. SMTP Email Credentials

1. Go to **Credentials** → **Add Credential**
2. Search for **"SMTP"**
3. Select **"SMTP"**
4. Enter your email settings:
   - **Host**: Your SMTP server (e.g., `smtp.gmail.com`, `smtp.hostinger.com`)
   - **Port**: Usually `587` (TLS) or `465` (SSL)
   - **User**: Your email address
   - **Password**: Your email password or app password
   - **Secure**: Choose TLS or SSL based on your port
5. Name it: **"SMTP Account"**
6. Click **Save**

---

## 📥 Step 2: Import Workflows

Import the workflows in this order:

### 2.1 Import Booking Request with Payment Workflow

1. Go to **Workflows** → Click **"+"** → **Import from File**
2. Select: `booking-with-payment-workflow.json`
3. The workflow will open in the editor

**Configure this workflow:**
- Click on **"Stripe - Create Payment Intent"** node
- Select your **Stripe Account** credentials (created in Step 1.2)
- Click on **"Send Booking Email (Async)"** node
- Update **"To Email"** to your personal email
- Update **"From Email"** to your business email
- Select your **SMTP Account** credentials
- Click on **"Save to File"** node
- The file path should be: `bookings.csv` (default is fine)

4. Click **"Save"** (top right)
5. Toggle the workflow to **"Active"** (top right toggle)
6. Click on **"Webhook - Booking Request"** node
7. Copy the **Webhook URL** shown at the bottom
   - Save this URL - you'll need it for environment variables!

### 2.2 Import Free Questions Form Workflow

1. Go to **Workflows** → Click **"+"** → **Import from File**
2. Select: `free-questions-workflow.json`
3. The workflow will open in the editor

**Configure this workflow:**
- Click on **"Send Email Notification"** node
- Update **"To Email"** to your personal email
- Update **"From Email"** to your business email
- Select your **SMTP Account** credentials

4. Click **"Save"**
5. Toggle the workflow to **"Active"**
6. Click on **"Webhook - Free Questions"** node
7. Copy the **Webhook URL**
   - Save this URL for environment variables!

### 2.3 Import Daily Booking Summary Workflow

1. Go to **Workflows** → Click **"+"** → **Import from File**
2. Select: `daily-summary-workflow.json`
3. The workflow will open in the editor

**Configure this workflow:**
- Click on **"Send Summary Email"** node
- Update **"To Email"** to your personal email
- Update **"From Email"** to your business email
- Select your **SMTP Account** credentials
- Click on **"Send No Bookings Email"** node
- Update **"To Email"** to your personal email
- Update **"From Email"** to your business email
- Select your **SMTP Account** credentials
- Click on **"Read Bookings File"** node
- Verify the file name is: `bookings.csv`

4. Click **"Save"**
5. Toggle the workflow to **"Active"**
6. The schedule trigger will automatically run daily at 5 PM

---

## 🔧 Step 3: Update Environment Variables

### 3.1 For Local Development

Update your `.env.local` file:

```env
# n8n Webhook URLs (from Step 2)
VITE_N8N_WEBHOOK_BOOKING=https://your-n8n-instance.com/webhook/booking-request
VITE_N8N_WEBHOOK_CTA=https://your-n8n-instance.com/webhook/free-questions

# Stripe Keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

**Important**: 
- Replace `https://your-n8n-instance.com` with your actual Hostinger n8n URL
- Get your Stripe publishable key from [Stripe Dashboard](https://dashboard.stripe.com) → Developers → API keys

### 3.2 For Production (Vercel)

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Add these variables:
   - `VITE_N8N_WEBHOOK_BOOKING` = Your booking webhook URL
   - `VITE_N8N_WEBHOOK_CTA` = Your free questions webhook URL
   - `VITE_STRIPE_PUBLISHABLE_KEY` = Your Stripe publishable key
3. Select **Production**, **Preview**, and **Development** for each
4. Click **Save**
5. **Redeploy** your site for changes to take effect

---

## ✅ Step 4: Testing

### 4.1 Test Booking Request

1. Go to your website
2. Click on a package → **"Reserve Your Session"**
3. Fill out the booking form
4. When you reach the payment step, check:
   - Browser console for errors
   - n8n execution logs (click workflow → Executions)
5. Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code
6. Complete the booking
7. Check your email for the booking confirmation

### 4.2 Test Free Questions Form

1. Scroll to the bottom of your website
2. Fill out the "Free Interview Questions" form
3. Submit the form
4. Check:
   - Browser console for errors
   - n8n execution logs
   - Your email for the notification

### 4.3 Test Daily Summary

1. The daily summary runs automatically at 5 PM
2. To test manually:
   - Go to the Daily Summary workflow
   - Click **"Execute Workflow"** (play button)
   - Check your email for the summary

---

## 🔍 Troubleshooting

### Workflow Not Triggering

**Problem**: No executions showing in n8n

**Solutions**:
- ✅ Ensure workflow is **Active** (toggle in top right)
- ✅ Check webhook URL matches your environment variable
- ✅ Verify n8n instance is accessible from the internet
- ✅ Check Hostinger firewall settings

### Payment Intent Not Created

**Problem**: Payment form shows "Payment processing requires backend setup"

**Solutions**:
- ✅ Check Stripe credentials are configured correctly
- ✅ Verify Secret key starts with `sk_test_` or `sk_live_`
- ✅ Check n8n execution logs for errors
- ✅ Ensure workflow is Active

### Email Not Sending

**Problem**: No emails received

**Solutions**:
- ✅ Check SMTP credentials are correct
- ✅ Verify email addresses are correct
- ✅ Check n8n execution logs for SMTP errors
- ✅ Test SMTP credentials separately

### CORS Errors

**Problem**: "Failed to fetch" or CORS errors

**Solutions**:
- ✅ Workflows already include CORS headers
- ✅ Verify webhook URLs are correct
- ✅ Check that workflows are Active

---

## 📊 Workflow Details

### Booking Request with Payment Workflow

**What it does:**
- Handles two types of requests:
  1. **Payment Intent Creation** - When `action: 'create_payment_intent'` is received
  2. **Booking Submission** - When booking data is received

**Flow:**
```
Webhook Request
    ↓
IF: Is this a payment intent request?
    ├─ YES → Create Stripe Payment Intent → Return clientSecret
    └─ NO → Process Booking → Send Email → Save to File
```

### Free Questions Form Workflow

**What it does:**
- Receives form submissions from the CTA section
- Sends email notification
- Returns success response

**Flow:**
```
Webhook Request → Set Form Data → Send Email → Respond
```

### Daily Booking Summary Workflow

**What it does:**
- Runs daily at 5 PM
- Reads bookings from CSV file
- Sends formatted email summary
- Handles "no bookings" case

**Flow:**
```
Schedule Trigger (5 PM) → Read File → Process Data → IF Has Bookings?
    ├─ YES → Format Email → Send Summary
    └─ NO → Send No Bookings Email
```

---

## 📝 Checklist

Use this checklist to ensure everything is set up:

- [ ] Stripe credentials configured in n8n
- [ ] SMTP credentials configured in n8n
- [ ] Booking Request workflow imported and configured
- [ ] Booking Request workflow is Active
- [ ] Booking Request webhook URL copied
- [ ] Free Questions workflow imported and configured
- [ ] Free Questions workflow is Active
- [ ] Free Questions webhook URL copied
- [ ] Daily Summary workflow imported and configured
- [ ] Daily Summary workflow is Active
- [ ] Environment variables updated (local and Vercel)
- [ ] Tested booking request
- [ ] Tested free questions form
- [ ] Tested payment processing
- [ ] Received test emails

---

## 🎯 Next Steps

1. **Test Everything**: Complete test bookings and form submissions
2. **Monitor**: Check n8n execution logs regularly
3. **Go Live**: Switch to Stripe live keys when ready
4. **Monitor Payments**: Check Stripe Dashboard regularly

---

## 📞 Need Help?

If you encounter issues:
1. Check n8n execution logs (click workflow → Executions)
2. Check browser console for frontend errors
3. Verify all credentials are configured
4. Ensure all workflows are Active
5. Verify environment variables are set correctly

---

## 🔐 Security Notes

- **Never** expose your Stripe Secret key in frontend code
- Always use environment variables for sensitive data
- Use test keys (`sk_test_`, `pk_test_`) for development
- Switch to live keys only in production
- Keep your n8n instance secure and accessible only to you

---

**You're all set!** Your n8n workflows are now configured and ready to handle bookings, payments, and form submissions. 🎉

