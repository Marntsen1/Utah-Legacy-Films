# Quick Deploy Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `utah-legacy-films` (or your preferred name)
3. **Important**: Don't check any boxes (no README, .gitignore, or license)
4. Click "Create repository"

## Step 2: Push to GitHub

Run this command (replace with your GitHub username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/utah-legacy-films.git
git branch -M main
git push -u origin main
```

**OR** use the automated script:

```bash
./push-to-github.sh
```

## Step 3: Deploy to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" and login with GitHub
3. Click "Add New Project"
4. Import your `utah-legacy-films` repository
5. Vercel will auto-detect settings (already configured in `vercel.json`)
6. Click "Deploy"
7. Wait ~2 minutes for deployment
8. Your site will be live! 🎉

## Alternative: Use GitHub CLI (if installed)

```bash
gh repo create utah-legacy-films --public --source=. --remote=origin --push
```

Then go to Vercel and import the repo.

---

**Need help?** Check `DEPLOYMENT.md` for detailed instructions.



