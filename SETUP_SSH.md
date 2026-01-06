# Quick SSH Setup for GitHub

## Step 1: Generate SSH Key

Run this command in your terminal:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/id_ed25519
```

- Press Enter to accept default location
- Press Enter twice for no passphrase (or set one if you prefer)

## Step 2: Add SSH Key to GitHub

1. **Copy your public key:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
   Copy the entire output (starts with `ssh-ed25519`)

2. **Add to GitHub:**
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Title: "Mac - utah-legacy-films"
   - Key: Paste the copied key
   - Click "Add SSH key"

## Step 3: Update Remote and Push

```bash
cd /Users/matt_arnt/Desktop/My-Website/utah-legacy-films
git remote set-url origin git@github.com:marntsen1/utah-legacy-films.git
git push -u origin main
```

---

## Alternative: Use GitHub Desktop

If SSH seems complicated, use GitHub Desktop:

1. Download: https://desktop.github.com
2. Sign in with GitHub
3. File → Add Local Repository
4. Select: `/Users/matt_arnt/Desktop/My-Website/utah-legacy-films`
5. Click "Publish repository"



