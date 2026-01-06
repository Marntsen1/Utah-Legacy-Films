# Fix for Stripe Payment Intent in n8n

## Problem

The n8n Stripe node doesn't support "Payment Intent" as a resource option. The workflow has been updated to use an **HTTP Request** node instead, which calls Stripe's API directly.

## Solution

The workflow now uses:
1. **Code Node** - Prepares the payment intent data
2. **HTTP Request Node** - Calls Stripe API directly to create payment intent
3. **Code Node** - Parses the response to extract `client_secret`
4. **Respond Node** - Returns the `client_secret` to the frontend

## Setup Instructions

### Option 1: Use HTTP Header Auth Credential (Recommended)

1. In n8n, go to **Credentials** → **Add Credential**
2. Search for **"Header Auth"** or **"HTTP Header Auth"**
3. Create a new credential:
   - **Name**: `Stripe API Key`
   - **Name**: `Authorization`
   - **Value**: `Bearer sk_test_YOUR_SECRET_KEY_HERE`
     - Replace `sk_test_YOUR_SECRET_KEY_HERE` with your actual Stripe Secret Key
     - Get it from: https://dashboard.stripe.com/apikeys
4. Save the credential

5. In the workflow, click on **"Stripe API - Create Payment Intent"** node
6. In **"Credential to connect with"**, select **"Stripe API Key"** (the credential you just created)
7. Save the workflow

### Option 2: Use Generic Credential Type

If Header Auth isn't available:

1. In the **"Stripe API - Create Payment Intent"** node
2. Set **Authentication** to **"Generic Credential Type"**
3. Set **Generic Auth Type** to **"Header Auth"**
4. In the **Header Parameters**, you'll see:
   - **Name**: `Authorization`
   - **Value**: `=Bearer {{ $credentials.stripeSecretKey }}`
5. Create a credential with the name `stripeSecretKey` containing your Stripe Secret Key

### Option 3: Manual Header (Simplest)

1. In the **"Stripe API - Create Payment Intent"** node
2. Find **"Header Parameters"** section
3. Update the **Authorization** header value:
   - Change from: `=Bearer {{ $credentials.stripeSecretKey }}`
   - To: `Bearer sk_test_YOUR_ACTUAL_SECRET_KEY`
   - Replace `YOUR_ACTUAL_SECRET_KEY` with your real Stripe Secret Key
4. Save the workflow

**Note**: Option 3 is simpler but less secure (key is visible in workflow). Use Option 1 or 2 for better security.

## Testing

1. Activate the workflow
2. Test by submitting a booking form
3. Check the execution logs:
   - Should see HTTP Request to Stripe API
   - Should see `client_secret` in the response
4. Payment form should initialize correctly

## Troubleshooting

### "401 Unauthorized" Error
- ✅ Check that your Stripe Secret Key is correct
- ✅ Verify it starts with `sk_test_` (test) or `sk_live_` (production)
- ✅ Ensure there are no extra spaces in the key

### "client_secret is undefined"
- ✅ Check the "Parse Stripe Response" node
- ✅ Verify the HTTP Request is returning JSON
- ✅ Check execution logs to see the actual response structure

### "Payment processing requires backend setup"
- ✅ Verify the HTTP Request node is working
- ✅ Check that `client_secret` is being returned
- ✅ Verify the workflow is Active

## Alternative: Use Stripe Charge (Not Recommended)

**Note**: The user mentioned "charge" as an alternative, but this won't work with PaymentElement. PaymentElement specifically requires Payment Intents. If you must use charges, you'd need to switch to the older CardElement, which is less secure and doesn't support modern payment methods.

The HTTP Request approach is the correct solution for Payment Intents.

