# How to Import n8n Workflows

## Quick Import Steps

### Option 1: Import JSON Files (Recommended)

1. **Open n8n**
   - Go to your n8n instance
   - Click "Workflows" in the sidebar

2. **Import Workflow**
   - Click the **"+"** button (or "Add Workflow")
   - Click **"Import from File"** or **"Import from URL"**
   - Select the JSON file:
     - `free-questions-workflow.json` for the Free Questions form
     - `booking-request-workflow.json` for the Booking Request form
   - Click **"Import"**

3. **Configure Webhook URLs**
   - After importing, click on the **Webhook** node
   - Copy the **Production URL** (or Test URL if testing)
   - This is the URL you'll use in your environment variables

4. **Set Up Email (Optional but Recommended)**
   - Click on the **Send Email** node
   - Click **"Create New Credential"** or select existing SMTP credentials
   - Configure your email settings:
     - **SMTP Host**: e.g., `smtp.gmail.com`, `smtp.sendgrid.net`
     - **SMTP Port**: e.g., `587` or `465`
     - **User**: Your email address
     - **Password**: Your email password or app password
   - Update the **"To Email"** field with your actual email address
   - Update **"From Email"** with your sending email

5. **Activate Workflow**
   - Toggle the **"Active"** switch at the top right
   - The workflow is now live and ready to receive webhooks!

### Option 2: Manual Setup (If Import Doesn't Work)

#### Free Questions Workflow:

1. **Create New Workflow**
   - Name: "Utah Legacy Films - Free Questions Form"

2. **Add Webhook Node**
   - Drag "Webhook" node onto canvas
   - Settings:
     - **HTTP Method**: POST
     - **Path**: `free-questions`
     - **Response Mode**: "Respond to Webhook"

3. **Add Set Node**
   - Drag "Set" node after Webhook
   - Add these fields:
     - Name: `={{ $json.body.name }}`
     - Email: `={{ $json.body.email }}`
     - Phone: `={{ $json.body.phone }}`
     - Recipient: `={{ $json.body.recipient }}`
     - Timestamp: `={{ $json.body.timestamp }}`
     - Source: `={{ $json.body.source }}`

4. **Add Email Node** (Optional)
   - Drag "Send Email" node after Set
   - Configure your email settings
   - Set recipient email

5. **Add Respond to Webhook Node**
   - Drag "Respond to Webhook" node at the end
   - Set response: `{ "success": true, "message": "Thank you!" }`

6. **Connect Nodes**
   - Connect Webhook → Set → Email → Respond to Webhook

#### Booking Request Workflow:

Same steps as above, but:
- Path: `booking-request`
- Set node fields:
  - Name, Email, PreferredMonth, Package, PackageId, PackagePrice, Timestamp, Source

## Getting Your Webhook URLs

After importing/creating workflows:

1. Click on the **Webhook** node
2. You'll see two URLs:
   - **Test URL**: For testing (only works when workflow is open)
   - **Production URL**: For live use (works when workflow is active)

3. **Copy the Production URL** - this is what you'll use in your environment variables

## Testing

1. **Test the Webhook**
   - Keep the workflow open in n8n
   - Use the **Test URL** from the Webhook node
   - Send a test POST request (you can use Postman, curl, or test from your website)

2. **Check Execution**
   - Click "Executions" tab in n8n
   - You should see the webhook request and data flow through

3. **Verify Email** (if configured)
   - Check your email inbox for the notification

## Environment Variables

Once you have the webhook URLs, add them to:

**Local (.env.local):**
```env
VITE_N8N_WEBHOOK_CTA=https://your-n8n-instance.com/webhook/free-questions
VITE_N8N_WEBHOOK_BOOKING=https://your-n8n-instance.com/webhook/booking-request
```

**Vercel (Production):**
- Settings → Environment Variables
- Add both variables
- Redeploy

## Troubleshooting

- **404 Error**: Make sure the workflow is **Active** (toggle switch)
- **CORS Error**: Check n8n CORS settings in your instance configuration
- **Email Not Sending**: Verify SMTP credentials are correct
- **Data Not Appearing**: Check the Set node expressions match the JSON structure

## Next Steps

1. Import both workflows
2. Configure email notifications
3. Get webhook URLs
4. Add URLs to environment variables
5. Test from your website
6. Activate workflows for production

