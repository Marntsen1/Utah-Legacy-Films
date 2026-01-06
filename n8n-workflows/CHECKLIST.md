# n8n Setup Checklist

Print this out or keep it open while setting up. Check off each item as you complete it.

## 🔐 Credentials Setup

- [ ] Stripe credentials created
  - [ ] Secret key added (`sk_test_...` or `sk_live_...`)
  - [ ] Named "Stripe Account" (or similar)
  - [ ] Saved successfully

- [ ] SMTP credentials created
  - [ ] Host, Port, User, Password configured
  - [ ] Named "SMTP Account" (or similar)
  - [ ] Saved successfully

## 📥 Workflow 1: Booking Request with Payment

- [ ] Workflow imported from `booking-with-payment-workflow.json`
- [ ] Stripe node configured with credentials
- [ ] Email node configured:
  - [ ] From email set
  - [ ] To email set
  - [ ] SMTP credentials selected
- [ ] File save node verified (bookings.csv)
- [ ] Workflow saved
- [ ] Workflow activated (toggle ON)
- [ ] Webhook URL copied: _________________________

## 📥 Workflow 2: Free Questions Form

- [ ] Workflow imported from `free-questions-workflow.json`
- [ ] Email node configured:
  - [ ] From email set
  - [ ] To email set
  - [ ] SMTP credentials selected
- [ ] Workflow saved
- [ ] Workflow activated (toggle ON)
- [ ] Webhook URL copied: _________________________

## 📥 Workflow 3: Daily Booking Summary

- [ ] Workflow imported from `daily-summary-workflow.json`
- [ ] "Send Summary Email" node configured:
  - [ ] From email set
  - [ ] To email set
  - [ ] SMTP credentials selected
- [ ] "Send No Bookings Email" node configured:
  - [ ] From email set
  - [ ] To email set
  - [ ] SMTP credentials selected
- [ ] File read node verified (bookings.csv)
- [ ] Workflow saved
- [ ] Workflow activated (toggle ON)

## 🔧 Environment Variables

### Local (.env.local)
- [ ] `VITE_N8N_WEBHOOK_BOOKING` added
- [ ] `VITE_N8N_WEBHOOK_CTA` added
- [ ] `VITE_STRIPE_PUBLISHABLE_KEY` added
- [ ] File saved

### Vercel
- [ ] `VITE_N8N_WEBHOOK_BOOKING` added
  - [ ] Production checked
  - [ ] Preview checked
  - [ ] Development checked
- [ ] `VITE_N8N_WEBHOOK_CTA` added
  - [ ] Production checked
  - [ ] Preview checked
  - [ ] Development checked
- [ ] `VITE_STRIPE_PUBLISHABLE_KEY` added
  - [ ] Production checked
  - [ ] Preview checked
  - [ ] Development checked
- [ ] Site redeployed

## 🧪 Testing

- [ ] Booking request tested
  - [ ] Form submitted successfully
  - [ ] Payment form appeared
  - [ ] n8n execution logged
- [ ] Payment processing tested
  - [ ] Test card used (4242 4242 4242 4242)
  - [ ] Payment completed
  - [ ] Booking email received
- [ ] Free questions form tested
  - [ ] Form submitted successfully
  - [ ] n8n execution logged
  - [ ] Email notification received
- [ ] Daily summary tested (manual execution)
  - [ ] Workflow executed manually
  - [ ] Summary email received

## 📝 Notes

**Webhook URLs:**
- Booking: _________________________________
- Free Questions: _________________________________

**Stripe Keys:**
- Publishable: pk_..._________________________________
- Secret: sk_..._________________________________ (stored in n8n)

**Email Settings:**
- From: _________________________________
- To: _________________________________

**Issues/Notes:**
_________________________________
_________________________________
_________________________________

---

**Setup Date:** _______________
**Completed:** [ ] Yes [ ] No

