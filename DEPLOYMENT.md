# Deployment Guide

This guide will walk you through deploying your Utah Legacy Films website.

## Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is the easiest option with automatic deployments from Git.

### Steps:

1. **Push your code to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"
   - Your site will be live in ~2 minutes!

3. **Custom Domain** (Optional):
   - In Vercel dashboard, go to your project → Settings → Domains
   - Add your custom domain (e.g., utahlegacyfilms.com)
   - Follow DNS configuration instructions

**That's it!** Vercel handles everything automatically.

---

## Option 2: Deploy to Netlify

Similar to Vercel, great for static sites.

### Steps:

1. **Push your code to GitHub** (same as above)

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Custom Domain**:
   - Site settings → Domain management
   - Add your custom domain

---

## Option 3: Deploy to GitHub Pages

Free hosting directly from GitHub.

### Steps:

1. **Install gh-pages package**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   Add to scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. **Update vite.config.ts**:
   Add `base: '/your-repo-name/'` to the config (or `base: '/'` if using custom domain)

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to your repo → Settings → Pages
   - Select source: `gh-pages` branch
   - Your site will be at: `https://yourusername.github.io/your-repo-name/`

---

## Option 4: Manual Build & Deploy

Build locally and upload to any hosting service.

### Steps:

1. **Build the project**:
   ```bash
   npm run build
   ```
   This creates a `dist` folder with all production files.

2. **Preview locally** (optional):
   ```bash
   npm run preview
   ```
   Visit http://localhost:4173 to test the build.

3. **Upload to hosting**:
   - Upload the entire contents of the `dist` folder to your hosting service
   - Popular options:
     - **Cloudflare Pages**: Drag & drop the dist folder
     - **AWS S3 + CloudFront**: Upload to S3 bucket
     - **Traditional hosting**: Upload via FTP/SFTP

---

## Pre-Deployment Checklist

Before deploying, make sure to:

- [ ] Update `index.html` with your actual domain in meta tags
- [ ] Update structured data in `index.html` with real business info
- [ ] Add your logo image to `/public/logo.png`
- [ ] Test the build locally: `npm run build && npm run preview`
- [ ] Update any placeholder content (phone numbers, addresses, etc.)
- [ ] Set up environment variables if needed (for API keys)

---

## Environment Variables

If you need environment variables (like API keys):

### Vercel:
- Project Settings → Environment Variables
- Add your variables there

### Netlify:
- Site settings → Build & deploy → Environment
- Add your variables

### Local:
- Create `.env.local` file:
  ```
  GEMINI_API_KEY=your_key_here
  ```

---

## Post-Deployment

After deploying:

1. **Test everything**:
   - Check all pages load correctly
   - Test forms
   - Test mobile navigation
   - Check images load

2. **Set up analytics** (optional):
   - Google Analytics
   - Vercel Analytics (if using Vercel)

3. **Set up custom domain**:
   - Configure DNS records
   - Enable SSL (usually automatic)

4. **Monitor**:
   - Check for errors in hosting dashboard
   - Monitor performance

---

## Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server

# Build
npm run build            # Build for production
npm run preview          # Preview production build

# Type checking
npm run type-check       # Check TypeScript types
```

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html

