# Browser Console Test Instructions

## Quick Test - Copy and Paste This

Open your browser console (F12 → Console tab) and paste this code:

### Test Booking Webhook:

```javascript
fetch('https://mattarntsen.app.n8n.cloud/webhook-test/booking-request', {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    selectedDate: '2024-12-20',
    selectedTime: '11:00 AM',
    bookingDateTime: '2024-12-20T11:00:00.000Z',
    package: 'Signature Story',
    packageId: 'signature',
    packagePrice: '$4,500',
    timestamp: new Date().toISOString(),
    source: 'Test'
  }),
})
.then(response => {
  console.log('Status:', response.status);
  console.log('OK:', response.ok);
  return response.json();
})
.then(data => {
  console.log('✅ SUCCESS!', data);
})
.catch(error => {
  console.error('❌ ERROR:', error);
  console.log('This usually means CORS issue or workflow not active');
});
```

### Test Free Questions Webhook:

```javascript
fetch('https://mattarntsen.app.n8n.cloud/webhook-test/free-questions', {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    phone: '555-1234',
    recipient: 'My grandmother',
    timestamp: new Date().toISOString(),
    source: 'Test'
  }),
})
.then(response => {
  console.log('Status:', response.status);
  return response.json();
})
.then(data => {
  console.log('✅ SUCCESS!', data);
})
.catch(error => {
  console.error('❌ ERROR:', error);
});
```

## What to Look For

### ✅ Success:
- Status: 200
- Response with `success: true`
- No errors in console

### ❌ CORS Error:
- "Failed to fetch"
- "CORS policy" error
- **Fix**: Add CORS headers in n8n workflow

### ❌ 404 Error:
- Status: 404
- **Fix**: Check webhook URL is correct, workflow is active

### ❌ 500 Error:
- Status: 500
- **Fix**: Check n8n workflow for errors

## Alternative: Use Test Page

I've created a test page for you. Open:
```
test-webhook.html
```

This page has buttons to test both webhooks with a visual interface.



