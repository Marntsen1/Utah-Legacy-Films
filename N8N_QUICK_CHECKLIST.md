# n8n Setup - Quick Checklist

Use this checklist to make sure everything is set up correctly.

---

## ✅ PART 1: Credentials Setup

### Stripe Credentials
- [ ] Logged into Stripe Dashboard (https://dashboard.stripe.com/apikeys)
- [ ] Found Secret Key (starts with `sk_test_...`)
- [ ] Went to n8n → Credentials → Add Credential
- [ ] Selected "Stripe API"
- [ ] Pasted Secret Key
- [ ] Named it "Stripe Account"
- [ ] Saved it
- [ ] Can see "Stripe Account" in credentials list

### Email (SMTP) Credentials
- [ ] Went to n8n → Credentials → Add Credential
- [ ] Selected "SMTP"
- [ ] Entered email host (e.g., `smtp.gmail.com`)
- [ ] Entered port (`587` for TLS)
- [ ] Entered email address
- [ ] Entered password (or App Password for Gmail)
- [ ] Selected Secure type (`TLS` for port 587)
- [ ] Named it "SMTP Account"
- [ ] Saved it
- [ ] Can see "SMTP Account" in credentials list

---

## ✅ PART 2: Workflow Setup

### Import Workflow
- [ ] Went to n8n → Workflows
- [ ] Clicked "+" → Import from File
- [ ] Found file: `booking-with-payment-intent-workflow.json`
- [ ] Imported it successfully
- [ ] Can see workflow with boxes/nodes

### Configure Webhook Node
- [ ] Clicked on "Webhook - Booking Request" box
- [ ] Verified HTTP Method is `POST`
- [ ] Verified Path is `booking-request` or `webhook-test/booking-request`
- [ ] Copied the webhook URL
- [ ] Saved the URL somewhere safe

### Configure Stripe Node
- [ ] Clicked on "Stripe API - Create Payment Intent" box
- [ ] Found Authentication/Header section
- [ ] Added Authorization header
- [ ] Value is: `Bearer sk_test_YOUR_KEY` (with actual key)
- [ ] Verified URL is: `https://api.stripe.com/v1/payment_intents`
- [ ] Saved the node

### Configure Email Node
- [ ] Clicked on "Send Booking Email" box
- [ ] Set "From Email" address
- [ ] Set "To Email" address (where you want notifications)
- [ ] Selected "SMTP Account" credential
- [ ] Saved the node

### Activate Workflow
- [ ] Saved the entire workflow (Ctrl+S or Cmd+S)
- [ ] Toggled workflow to "Active" (switch is green/blue)
- [ ] Workflow is now running

---

## ✅ PART 3: Testing

### Test Webhook
- [ ] Opened webhook URL in browser
- [ ] Got some response (even if error - means it's working)

### Test from Website
- [ ] Went to website
- [ ] Clicked "Book This Package"
- [ ] Filled out form
- [ ] Completed payment (test card: 4242 4242 4242 4242)
- [ ] Checked n8n Executions - saw new execution
- [ ] Checked email - received notification

---

## ✅ PART 4: Verify Everything Works

- [ ] Webhook URL matches what's in `.env.local` file
- [ ] Workflow is Active
- [ ] All credentials are saved
- [ ] Test booking worked end-to-end
- [ ] Received email notification
- [ ] Payment processed successfully

---

## 🚨 Common Issues to Check

- [ ] Workflow toggle is ON (Active)
- [ ] Stripe key includes `Bearer ` before the key
- [ ] Email uses App Password if Gmail
- [ ] Webhook URL matches exactly in both places
- [ ] All nodes are saved
- [ ] No error messages in n8n Executions

---

## 📝 Notes

**Webhook URL:** _________________________________

**Stripe Key (first 10 chars):** sk_test_...

**Email Address:** _______________________________

**Date Set Up:** _________________________________

---

**If everything is checked ✅, your automation is ready to go!**
