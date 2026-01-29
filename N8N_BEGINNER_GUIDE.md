# Complete Beginner's Guide - Setting Up Your n8n Automation

## What is n8n? (In Simple Terms)

**n8n** is like a robot assistant that automatically handles tasks for you. When someone books a package on your website, n8n:
1. Receives the booking information
2. Processes the payment
3. Sends you an email notification
4. Saves the booking details

Think of it like having a receptionist who never sleeps - it handles bookings 24/7 automatically!

---

## What You'll Need Before Starting

1. **Your Stripe Account** (for processing payments)
   - Go to: https://dashboard.stripe.com/apikeys
   - You'll need your "Secret Key" (looks like: `sk_test_...`)

2. **Your Email Account** (for receiving notifications)
   - Your email address
   - Your email password (or app password if using Gmail)

3. **Access to Your n8n Dashboard**
   - Go to: https://n8n.srv1250103.hstgr.cloud
   - Log in with your credentials

---

## PART 1: Set Up Your "Credentials" (Like Passwords)

**What are credentials?** They're like saved passwords that n8n uses to connect to other services (like Stripe and your email).

### Step 1: Set Up Stripe Credentials

**What this does:** Tells n8n how to connect to Stripe to process payments.

1. **Open n8n Dashboard**
   - Go to: https://n8n.srv1250103.hstgr.cloud
   - Log in

2. **Find "Credentials"**
   - Look at the left sidebar (the menu on the left side)
   - Click on **"Credentials"**
   - You'll see a list (might be empty if you haven't added any yet)

3. **Add New Credential**
   - Look for a button that says **"+ Add Credential"** or **"New"** (usually in the top right)
   - Click it

4. **Search for Stripe**
   - You'll see a search box
   - Type: `stripe`
   - You should see "Stripe API" appear in the results
   - Click on **"Stripe API"**

5. **Enter Your Stripe Information**
   - **Secret Key**: This is your Stripe secret key
     - Go to: https://dashboard.stripe.com/apikeys
     - Look for "Secret key" (it starts with `sk_test_...` for testing)
     - Click "Reveal" to see it
     - Copy the entire key (it's long!)
     - Paste it into the "Secret Key" field in n8n
   - **Name**: Type `Stripe Account` (or any name you'll remember)

6. **Save**
   - Click the **"Save"** button
   - ✅ You should now see "Stripe Account" in your credentials list

**Troubleshooting:**
- Can't find your Stripe key? Make sure you're logged into Stripe and looking at the "API keys" section
- Key not working? Make sure you copied the ENTIRE key (it's very long, usually starts with `sk_test_`)

---

### Step 2: Set Up Email Credentials

**What this does:** Tells n8n how to send you email notifications when someone books.

1. **Still in Credentials**
   - Click **"+ Add Credential"** again

2. **Search for SMTP**
   - Type: `smtp` in the search box
   - Click on **"SMTP"** from the results

3. **Enter Your Email Information**

   **For Gmail:**
   - **Host**: `smtp.gmail.com`
   - **Port**: `587`
   - **User**: Your Gmail address (e.g., `yourname@gmail.com`)
   - **Password**: Your Gmail password OR an "App Password"
     - If regular password doesn't work, you need an App Password:
       - Go to: https://myaccount.google.com/apppasswords
       - Generate a new app password
       - Use that instead
   - **Secure**: Select `TLS`
   - **Name**: `SMTP Account` (or any name)

   **For Hostinger Email:**
   - **Host**: `smtp.hostinger.com`
   - **Port**: `587`
   - **User**: Your email address (e.g., `yourname@yourdomain.com`)
   - **Password**: Your email password
   - **Secure**: Select `TLS`
   - **Name**: `SMTP Account`

   **For Other Email Providers:**
   - Check your email provider's website for SMTP settings
   - Common settings:
     - Port: `587` (TLS) or `465` (SSL)
     - Secure: `TLS` for port 587, `SSL` for port 465

4. **Save**
   - Click **"Save"** button
   - ✅ You should now see "SMTP Account" in your credentials list

**Troubleshooting:**
- Gmail not working? You probably need an App Password (see above)
- Can't connect? Double-check your email and password
- Still not working? Check your email provider's SMTP settings

---

## PART 2: Import and Set Up Your Workflow

**What is a workflow?** It's like a recipe that tells n8n what to do step-by-step.

### Step 1: Import the Workflow File

1. **Go to Workflows**
   - In the left sidebar, click **"Workflows"**

2. **Import a Workflow**
   - Look for a **"+"** button (usually top right)
   - Click it
   - You'll see options - choose **"Import from File"** or **"Import"**

3. **Find the File**
   - A file browser will open
   - Navigate to your project folder: `utah-legacy-films`
   - Go into the `n8n-workflows` folder
   - Find the file: `booking-with-payment-intent-workflow.json`
   - Click **"Open"** or **"Import"**

4. **Workflow Opens**
   - You should now see a workflow with boxes connected by lines
   - Each box is called a "node" - they do different things
   - Don't worry if it looks confusing - we'll configure it step by step!

---

### Step 2: Understand What Each Box Does

**The workflow has these main boxes:**

1. **"Webhook - Booking Request"** (First box)
   - This is like a mailbox - it receives information from your website

2. **"Check Action Type"** (Decision box)
   - This decides: "Is this a payment request or a booking submission?"

3. **"Prepare Payment Intent Data"** (If it's a payment)
   - Gets the payment amount ready

4. **"Stripe API - Create Payment Intent"** (If it's a payment)
   - Talks to Stripe to create the payment

5. **"Respond with Payment Intent"** (If it's a payment)
   - Sends the payment info back to your website

6. **"Prepare Booking Data"** (If it's a booking)
   - Gets the booking information ready

7. **"Send Booking Email"** (If it's a booking)
   - Sends you an email with the booking details

8. **"Respond to Webhook"** (If it's a booking)
   - Confirms to your website that it received the booking

---

### Step 3: Configure Each Box (Node)

#### Box 1: Webhook - Booking Request

**What to check:**
1. Click on the **"Webhook - Booking Request"** box
2. Look at the settings on the right side
3. Make sure:
   - **HTTP Method**: `POST`
   - **Path**: `booking-request` (or `webhook-test/booking-request`)
4. **IMPORTANT:** Look for the webhook URL at the bottom
   - It should say: `https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request`
   - **Copy this URL** - you'll need it!
   - Save it somewhere (notepad, notes app)

**What this does:** This is your mailbox address. Your website sends booking info here.

---

#### Box 2: Stripe API - Create Payment Intent

**This is the most important one to configure!**

1. **Click on the "Stripe API - Create Payment Intent" box**

2. **Find "Header Parameters" or "Authentication"**
   - Look for a section called "Header Parameters" or "Authentication"
   - You need to add your Stripe Secret Key here

3. **Add Your Stripe Key**

   **Option A: Using Header Auth (Recommended)**
   - Look for "Authentication" dropdown
   - Select "Header Auth" or "Custom Auth"
   - **Name**: `Authorization`
   - **Value**: `Bearer sk_test_YOUR_SECRET_KEY_HERE`
     - Replace `YOUR_SECRET_KEY_HERE` with your actual Stripe Secret Key
     - Make sure to include `Bearer ` (with a space after it)
   - Example: `Bearer sk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz1234567890`

   **Option B: Manual Header (Simpler)**
   - Find "Header Parameters" section
   - Click "Add Header" or "+"
   - **Name**: `Authorization`
   - **Value**: `Bearer sk_test_YOUR_SECRET_KEY_HERE`
     - Replace with your actual key
     - Include `Bearer ` at the beginning

4. **Verify the URL**
   - Make sure it says: `https://api.stripe.com/v1/payment_intents`
   - If it's different, change it to this exact URL

5. **Check the Method**
   - Should be: `POST`

6. **Save the Box**
   - Click "Save" or click outside the box

**Troubleshooting:**
- Can't find where to add the key? Look for "Authentication", "Headers", or "Authorization"
- Key not working? Make sure you included `Bearer ` (with space) before the key
- Still not working? Double-check you copied the entire key from Stripe

---

#### Box 3: Send Booking Email

**This sends you an email when someone books.**

1. **Click on "Send Booking Email" box**

2. **Configure Email Settings**
   - **From Email**: Your business email (e.g., `noreply@utahlegacyfilms.com` or your Gmail)
   - **To Email**: Your personal email (where you want to receive bookings)
   - **Subject**: Something like `New Booking Request - {{ $json.package }}`
     - The `{{ $json.package }}` part automatically fills in the package name
   - **Credential to connect with**: Select **"SMTP Account"** (the one you created earlier)

3. **Check the Email Message**
   - You should see a message template
   - It should include things like:
     - Name: `{{ $json.name }}`
     - Email: `{{ $json.email }}`
     - Package: `{{ $json.package }}`
   - These automatically fill in with the actual booking information

4. **Save the Box**

**Troubleshooting:**
- Can't select SMTP Account? Go back to Credentials and make sure you saved it
- Email not sending? Check your SMTP settings in Credentials
- Want to customize the email? You can edit the message text

---

### Step 4: Save and Activate Your Workflow

1. **Save the Workflow**
   - Look for a **"Save"** button (usually top right)
   - Or press `Ctrl + S` (Windows) or `Cmd + S` (Mac)
   - ✅ You should see a message that it's saved

2. **Activate the Workflow**
   - Look at the top right of the screen
   - You'll see a toggle switch that says **"Inactive"** or **"Active"**
   - Click it to turn it **"Active"**
   - The switch should turn green or blue
   - ✅ The workflow is now running!

**IMPORTANT:** The workflow MUST be Active for it to work. If it's Inactive, your website can't send information to it.

---

## PART 3: Test Your Setup

### Test 1: Check the Webhook URL

1. **Get Your Webhook URL**
   - Click on "Webhook - Booking Request" box
   - Copy the URL (should be: `https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request`)

2. **Test in Browser**
   - Open a new browser tab
   - Go to: https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request
   - You should see a message (might say "Method not allowed" or similar - that's okay!)
   - This means the webhook is working

### Test 2: Test from Your Website

1. **Go to Your Website**
   - Open: http://localhost:3000 (or your live website)

2. **Try Booking a Package**
   - Click "Book This Package" on any package
   - Fill out the form (use test data)
   - Complete the payment (use Stripe test card: `4242 4242 4242 4242`)

3. **Check n8n Dashboard**
   - Go back to n8n
   - Click on "Executions" in the left sidebar
   - You should see a new execution (like a log entry)
   - Click on it to see if it succeeded or failed

4. **Check Your Email**
   - Check the email inbox you set up
   - You should receive a booking notification email

---

## Troubleshooting Common Problems

### Problem: "Workflow is Inactive"

**Solution:**
- Make sure you clicked the toggle switch to turn it "Active"
- The switch should be green/blue, not gray

### Problem: "Payment Intent Creation Failed"

**Solution:**
- Check that your Stripe Secret Key is correct in the "Stripe API" box
- Make sure you included `Bearer ` before the key
- Verify the key starts with `sk_test_` (for testing)
- Check that the URL is: `https://api.stripe.com/v1/payment_intents`

### Problem: "Email Not Sending"

**Solution:**
- Check your SMTP credentials are correct
- For Gmail, make sure you're using an App Password
- Verify the "To Email" address is correct
- Check that you selected "SMTP Account" in the email box

### Problem: "Webhook Not Receiving Data"

**Solution:**
- Make sure the workflow is Active
- Check that the webhook URL matches what's in your website's `.env.local` file
- Verify the path is correct: `webhook-test/booking-request`
- Check n8n Executions to see if there are any error messages

### Problem: "Can't Find the Workflow File"

**Solution:**
- Make sure you're in the right folder: `utah-legacy-films/n8n-workflows/`
- The file is called: `booking-with-payment-intent-workflow.json`
- If you can't find it, you can create the workflow manually (see below)

---

## Quick Checklist

Before you're done, make sure:

- [ ] Stripe credentials are set up and saved
- [ ] Email (SMTP) credentials are set up and saved
- [ ] Workflow is imported
- [ ] Stripe API box has your Secret Key configured
- [ ] Email box has your email addresses configured
- [ ] Workflow is saved
- [ ] Workflow is Active (toggle is green/blue)
- [ ] You copied the webhook URL
- [ ] You tested it and it works

---

## What Happens When Someone Books?

Here's the step-by-step process:

1. **Customer fills out form** on your website
2. **Customer clicks "Continue to Reserve"**
3. **Website sends payment request** to n8n webhook
4. **n8n creates payment intent** with Stripe
5. **n8n sends payment info back** to website
6. **Customer enters card details** and pays
7. **Payment succeeds**
8. **Website sends booking data** to n8n webhook
9. **n8n receives booking data**
10. **n8n sends you an email** with booking details
11. **n8n confirms to website** that it received the booking
12. **Customer sees success message**

All of this happens automatically in seconds!

---

## Need More Help?

If you're stuck:

1. **Check n8n Executions**
   - Go to "Executions" in n8n
   - Click on failed executions to see error messages
   - This tells you exactly what went wrong

2. **Check Browser Console**
   - On your website, press F12
   - Go to "Console" tab
   - Look for error messages (they're usually in red)

3. **Verify Each Step**
   - Go back through this guide
   - Make sure you completed each step
   - Double-check your credentials are saved

4. **Test Each Part Separately**
   - Test the webhook first
   - Then test Stripe connection
   - Then test email sending
   - This helps you find which part isn't working

---

## Summary

You've set up:
- ✅ Stripe connection (for payments)
- ✅ Email connection (for notifications)
- ✅ Workflow automation (to handle bookings)

Your booking system should now work automatically! When someone books a package, you'll receive an email notification and the payment will be processed through Stripe.

**Remember:** Keep your workflow Active, and check n8n Executions regularly to make sure everything is working smoothly.
