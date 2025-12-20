# n8n Webhook Setup Guide

## Step 1: Create n8n Workflows

### Workflow 1: Free Questions Form
1. Create a new workflow in n8n
2. Add a **Webhook** node
3. Configure:
   - **HTTP Method**: POST
   - **Path**: `/webhook/free-questions` (or your preferred path)
   - **Response Mode**: Respond to Webhook
4. Copy the webhook URL (e.g., `https://your-n8n-instance.com/webhook/free-questions`)
5. Add processing nodes (email, database, etc.) as needed

### Workflow 2: Booking Request Form
1. Create another workflow
2. Add a **Webhook** node
3. Configure:
   - **HTTP Method**: POST
   - **Path**: `/webhook/booking-request` (or your preferred path)
   - **Response Mode**: Respond to Webhook
4. Copy the webhook URL
5. Add processing nodes as needed

## Step 2: Configure Environment Variables

1. Create a `.env.local` file in the project root (if it doesn't exist)
2. Add your webhook URLs:

```env
VITE_N8N_WEBHOOK_CTA=https://your-n8n-instance.com/webhook/free-questions
VITE_N8N_WEBHOOK_BOOKING=https://your-n8n-instance.com/webhook/booking-request
```

3. **Important**: Restart your dev server after adding environment variables:
   ```bash
   npm run dev
   ```

## Step 3: For Production (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the same variables:
   - `VITE_N8N_WEBHOOK_CTA` = your webhook URL
   - `VITE_N8N_WEBHOOK_BOOKING` = your webhook URL
4. Redeploy your site

## Data Structure

### Free Questions Form sends:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234" or "Not provided",
  "recipient": "My grandmother",
  "timestamp": "2024-12-17T19:00:00.000Z",
  "source": "Free Questions Form"
}
```

### Booking Request Form sends:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "preferredMonth": "As soon as possible",
  "package": "Signature Story",
  "packageId": "signature",
  "packagePrice": "$4,500",
  "timestamp": "2024-12-17T19:00:00.000Z",
  "source": "Booking Request Form"
}
```

## Testing

1. Test locally with your `.env.local` file
2. Check n8n workflow execution logs
3. Verify data is received correctly
4. Test in production after deploying

## Troubleshooting

- **CORS errors**: Make sure your n8n instance allows requests from your domain
- **404 errors**: Verify the webhook URLs are correct
- **Environment variables not working**: Make sure they start with `VITE_` and restart the dev server

