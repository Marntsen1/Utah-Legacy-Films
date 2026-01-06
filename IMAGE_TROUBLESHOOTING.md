# Image Troubleshooting Guide

## Issue: Images showing as placeholders instead of actual photos

### Quick Fixes to Try:

1. **Hard Refresh Browser**
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`
   - This clears cached files

2. **Restart Dev Server**
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart:
   npm run dev
   ```

3. **Clear Browser Cache**
   - Open DevTools (F12)
   - Right-click the refresh button
   - Select "Empty Cache and Hard Reload"

4. **Check Browser Console**
   - Open DevTools (F12) → Console tab
   - Look for 404 errors or image loading errors
   - The code now logs success/failure messages

5. **Verify Images Are Accessible**
   - Try accessing directly in browser:
     - `http://localhost:3000/logo.png`
     - `http://localhost:3000/interview-setup.png`
     - `http://localhost:3000/family-watching.png`
   - If these don't work, there's a server issue

### Common Issues:

#### Issue: 404 Errors in Console
**Solution**: 
- Verify images are in `/public` folder (not `/src`)
- Check file names match exactly (case-sensitive)
- Restart dev server

#### Issue: Images load but are blank/white
**Solution**:
- Check file permissions
- Verify images aren't corrupted
- Try opening images directly in an image viewer

#### Issue: Images work locally but not in production
**Solution**:
- Ensure images are committed to git
- Check Vercel build logs
- Verify public folder is included in build

### Debug Steps:

1. **Check Console Logs**
   - The code now logs when images load successfully
   - Look for: "Successfully loaded [image-name].png"
   - If you see errors, check the error message

2. **Verify File Paths**
   - Images should be in: `/public/logo.png`
   - Code references: `src="/logo.png"`
   - The leading `/` is important!

3. **Test Direct Access**
   - Open browser to: `http://localhost:3000/logo.png`
   - If this works, the issue is in the component
   - If this doesn't work, the issue is with the server

### Still Not Working?

1. Check the browser Network tab:
   - Open DevTools → Network tab
   - Filter by "Img"
   - Look for failed requests (red)
   - Check the Request URL

2. Verify image files:
   ```bash
   ls -lh public/*.png
   file public/*.png
   ```

3. Try a different image format:
   - Convert PNG to JPG if needed
   - Update file extensions in code

4. Check Vite configuration:
   - Ensure `public` folder is configured correctly
   - Vite should serve public folder at root by default

