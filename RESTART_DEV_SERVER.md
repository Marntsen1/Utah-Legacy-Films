# How to Restart Your Dev Server

## Quick Steps:

### 1. Stop the Current Server

**If the server is running in a terminal window:**
- Click on the terminal window where `npm run dev` is running
- Press `Ctrl + C` (Mac: `Cmd + C`)
- Wait for it to stop (you'll see a message like "Process terminated")

**If you can't find the terminal:**
- Look for a terminal tab/window with output showing "Local: http://localhost:3000"
- Or check if port 3000 is in use

### 2. Start the Server Again

In your terminal, run:
```bash
npm run dev
```

You should see output like:
```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

### 3. Open Your Browser

- Go to: `http://localhost:3000`
- **Hard refresh**: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)

## Alternative: Kill Process and Restart

If `Ctrl + C` doesn't work:

**Mac/Linux:**
```bash
# Find the process
lsof -ti:3000

# Kill it (replace PID with the number from above)
kill -9 $(lsof -ti:3000)

# Or kill all node processes (be careful!)
pkill -f "vite"
```

**Windows:**
```bash
# Find the process
netstat -ano | findstr :3000

# Kill it (replace PID with the number from above)
taskkill /PID <PID> /F
```

Then restart:
```bash
npm run dev
```

## Verify It's Working

After restarting:
1. Check terminal shows "ready in xxx ms"
2. Open `http://localhost:3000` in browser
3. Hard refresh: `Cmd + Shift + R` or `Ctrl + Shift + R`
4. Check browser console (F12) for image loading messages

