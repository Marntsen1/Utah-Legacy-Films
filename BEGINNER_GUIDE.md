# Complete Beginner's Guide - Setting Up Your Booking System

## What Are We Doing?

When someone books a package on your website, we need to send their information to a special address (called a "webhook") so you can receive it. Think of it like giving someone your mailing address so they can send you letters.

## What is a Webhook? (In Simple Terms)

A **webhook** is like a mailbox address on the internet. When someone fills out a form on your website, the website sends that information to this special address. Your n8n system (which is like your mailroom) receives it and processes it.

**Your webhook address is:**
```
https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request
```

This is like your mailbox address - it's where booking information gets delivered.

---

## Step 1: Find the Settings File

Your website has a hidden settings file called `.env.local`. This file tells your website where to send information.

**How to find it:**
1. Open your project folder in Finder (Mac) or File Explorer (Windows)
2. Look for a file named `.env.local`
   - **Note:** Files starting with a dot (.) are hidden files. You might need to:
     - **Mac:** Press `Cmd + Shift + .` (period) to show hidden files
     - **Windows:** Go to View → Show → Hidden items

**If you can't find it:**
- That's okay! We can create it. Just continue to Step 2.

---

## Step 2: Open the Settings File

**Option A: Using a Text Editor (Easiest)**

1. Right-click on `.env.local`
2. Choose "Open With" → "TextEdit" (Mac) or "Notepad" (Windows)
3. You'll see something like this:
   ```
   VITE_N8N_WEBHOOK_BOOKING=https://mattarntsen.app.n8n.cloud/webhook-test/booking-request
   VITE_N8N_WEBHOOK_CTA=https://mattarntsen.app.n8n.cloud/webhook-test/free-questions
   ```

**Option B: Using VS Code (If You Have It)**

1. Right-click on `.env.local`
2. Choose "Open With" → "Visual Studio Code"
3. The file will open in the editor

---

## Step 3: Update the Address

You need to change the old address to your new address.

**Find this line:**
```
VITE_N8N_WEBHOOK_BOOKING=https://mattarntsen.app.n8n.cloud/webhook-test/booking-request
```

**Change it to:**
```
VITE_N8N_WEBHOOK_BOOKING=https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request
```

**What changed?**
- Old: `mattarntsen.app.n8n.cloud`
- New: `n8n.srv1250103.hstgr.cloud`

**The whole file should now look like:**
```
VITE_N8N_WEBHOOK_BOOKING=https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request
VITE_N8N_WEBHOOK_CTA=https://mattarntsen.app.n8n.cloud/webhook-test/free-questions
```

**Important:** 
- Don't change the second line (VITE_N8N_WEBHOOK_CTA) - that's for a different form
- Make sure there are no spaces before or after the `=` sign
- Make sure the address is exactly as shown above

---

## Step 4: Save the File

1. **Mac:** Press `Cmd + S` or go to File → Save
2. **Windows:** Press `Ctrl + S` or go to File → Save
3. Close the file

---

## Step 5: Restart Your Website's Development Server

Your website runs on something called a "development server" - think of it as the engine that makes your website work. When you change settings, you need to restart this engine.

**How to do it:**

1. **Find the Terminal/Command Prompt window** where your website is running
   - You should see something like: `npm run dev` or `vite`
   - There might be text scrolling or it might say "Local: http://localhost:3000"

2. **Stop the server:**
   - Click in that window
   - Press `Ctrl + C` (Windows) or `Cmd + C` (Mac)
   - Wait until it stops (you'll see a prompt like `$` or `>`)

3. **Start it again:**
   - Type: `npm run dev`
   - Press Enter
   - Wait until you see "Local: http://localhost:3000" or similar

**What just happened?**
- Your website stopped running
- It read the new settings file
- It started running again with the new address

---

## Step 6: Test It (Optional but Recommended)

Let's make sure everything works!

1. **Open your website** in a browser: `http://localhost:3000`

2. **Test the booking form:**
   - Click "Book This Package" on any package
   - Fill out the form (you can use test data)
   - Try to submit it

3. **Check if it works:**
   - If you see a payment form or success message = ✅ It's working!
   - If you see an error = ⚠️ Something needs fixing

---

## Troubleshooting

### "I can't find the .env.local file"

**Solution:** Create it!
1. In your project folder, create a new file
2. Name it exactly: `.env.local` (including the dot at the beginning)
3. Add this line:
   ```
   VITE_N8N_WEBHOOK_BOOKING=https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request
   ```
4. Save it

### "I don't know how to restart the server"

**Solution:**
1. Close the terminal window completely
2. Open a new terminal/command prompt
3. Navigate to your project folder:
   - Type: `cd Desktop/My-Website/utah-legacy-films`
   - Press Enter
4. Type: `npm run dev`
5. Press Enter

### "I made a mistake and broke something"

**Don't worry!** The code already has the correct address built-in as a backup. Even if your `.env.local` file is wrong, the website will still work using the backup address.

### "I'm not sure if I did it right"

**Check:**
1. Open `.env.local` again
2. Look for this exact line:
   ```
   VITE_N8N_WEBHOOK_BOOKING=https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request
   ```
3. If it matches exactly = ✅ You did it right!

---

## What Happens Now?

Once you've updated the file and restarted:

1. **Someone books a package** on your website
2. **They fill out the form** (name, email, date, time)
3. **They complete payment**
4. **The website sends their information** to: `https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request`
5. **Your n8n system receives it** and processes it (sends you an email, saves the data, etc.)

---

## Summary (Quick Checklist)

- [ ] Found or created `.env.local` file
- [ ] Opened it in a text editor
- [ ] Changed the webhook address to: `https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request`
- [ ] Saved the file
- [ ] Restarted the development server (`npm run dev`)
- [ ] Tested the booking form

---

## Need More Help?

If you're still stuck:
1. Make sure you saved the file
2. Make sure you restarted the server
3. Check that the address is exactly: `https://n8n.srv1250103.hstgr.cloud/webhook-test/booking-request`
4. Try closing everything and starting fresh

Remember: Even if something goes wrong, the website has a backup address built-in, so it will still work!
