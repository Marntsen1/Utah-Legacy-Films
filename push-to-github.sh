#!/bin/bash

# Script to push to GitHub and deploy to Vercel
# Run this after creating your GitHub repository

echo "🚀 Pushing to GitHub..."

# Check if remote is already set
if git remote get-url origin &> /dev/null; then
    echo "✅ Remote 'origin' already exists"
    git remote -v
else
    echo "📝 Please create a GitHub repository first:"
    echo "   1. Go to https://github.com/new"
    echo "   2. Name it 'utah-legacy-films' (or your preferred name)"
    echo "   3. Don't initialize with README, .gitignore, or license"
    echo "   4. Click 'Create repository'"
    echo ""
    read -p "Enter your GitHub repository URL (e.g., https://github.com/username/utah-legacy-films.git): " REPO_URL
    
    if [ -z "$REPO_URL" ]; then
        echo "❌ No URL provided. Exiting."
        exit 1
    fi
    
    git remote add origin "$REPO_URL"
    echo "✅ Remote added: $REPO_URL"
fi

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🌐 Next steps to deploy to Vercel:"
    echo "   1. Go to https://vercel.com"
    echo "   2. Sign up/login with GitHub"
    echo "   3. Click 'New Project'"
    echo "   4. Import your repository"
    echo "   5. Click 'Deploy'"
    echo ""
    echo "Your site will be live in ~2 minutes! 🎉"
else
    echo ""
    echo "❌ Failed to push. Please check:"
    echo "   - You're authenticated with GitHub (git config --global user.name/email)"
    echo "   - The repository URL is correct"
    echo "   - You have push access to the repository"
fi



