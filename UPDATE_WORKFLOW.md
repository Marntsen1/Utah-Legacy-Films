# How to Update Your Website

## Quick Update Workflow

Since your site is connected to GitHub and Vercel, updates are automatic! Here's how:

### 1. Make Your Changes

Edit any files in your project:
- `components/` - Update React components
- `index.html` - Change meta tags, title, etc.
- `index.css` - Update styles
- Any other files

### 2. Test Locally (Optional but Recommended)

```bash
npm run dev
```

Visit http://localhost:3000 to see your changes before deploying.

### 3. Commit and Push

```bash
git add .
git commit -m "Description of your changes"
git push
```

### 4. Automatic Deployment! 🚀

Vercel will automatically:
- Detect the push to GitHub
- Build your site
- Deploy the new version
- Your site updates in ~2 minutes!

You can watch the deployment progress in your Vercel dashboard.

---

## Common Updates

### Update Content

**Change Hero Text:**
- Edit: `components/Hero.tsx`
- Find the text you want to change
- Save and push

**Update Pricing:**
- Edit: `components/Pricing.tsx`
- Modify the `packages` array
- Save and push

**Change Colors:**
- Edit: `tailwind.config.js`
- Update the color values
- Save and push

**Update Meta Tags/SEO:**
- Edit: `index.html`
- Update description, title, etc.
- Save and push

### Add New Sections

1. Create new component in `components/`
2. Import and add to `App.tsx`
3. Push to GitHub

### Update Images

1. Add image to `public/` folder
2. Reference it in your component: `/your-image.jpg`
3. Push to GitHub

---

## Preview Before Deploying

### Option 1: Local Preview

```bash
npm run dev
```

### Option 2: Vercel Preview Deployments

When you push to a branch (not main), Vercel creates a preview URL so you can test before merging to main.

---

## Rollback if Something Breaks

In Vercel dashboard:
1. Go to your project
2. Click "Deployments"
3. Find the previous working version
4. Click "..." → "Promote to Production"

---

## Tips

- **Small, frequent commits** are better than large ones
- **Test locally** before pushing
- **Check Vercel dashboard** for build errors
- **Use descriptive commit messages**

---

## Need Help?

- Check build logs in Vercel dashboard
- Test locally first: `npm run dev`
- Check browser console for errors
- Review Vercel deployment logs



