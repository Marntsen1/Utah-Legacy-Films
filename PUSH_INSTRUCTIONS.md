# Push to GitHub - Instructions

Your code is ready to push! You just need to authenticate with GitHub.

## Option 1: Use Personal Access Token (Recommended)

1. **Create a Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name it: "utah-legacy-films"
   - Select scopes: Check `repo` (this gives full repository access)
   - Click "Generate token"
   - **Copy the token** (you won't see it again!)

2. **Push using the token:**
   ```bash
   git push -u origin main
   ```
   - Username: `marntsen1`
   - Password: **Paste your personal access token** (not your GitHub password)

## Option 2: Use GitHub Desktop

1. Open GitHub Desktop
2. File → Add Local Repository
3. Select this folder: `/Users/matt_arnt/Desktop/My-Website/utah-legacy-films`
4. Click "Publish repository"

## Option 3: Set up SSH (One-time setup)

If you want to use SSH in the future:

1. Generate SSH key:
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. Add to GitHub:
   - Copy: `cat ~/.ssh/id_ed25519.pub`
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste and save

3. Then push:
   ```bash
   git remote set-url origin git@github.com:marntsen1/utah-legacy-films.git
   git push -u origin main
   ```

---

**Once pushed, deploy to Vercel:**
1. Go to https://vercel.com
2. Sign in with GitHub
3. Import your `utah-legacy-films` repository
4. Click "Deploy"



