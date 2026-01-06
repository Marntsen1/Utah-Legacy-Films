#!/bin/bash

echo "🔍 Image Troubleshooting Verification"
echo "======================================"
echo ""

# Check if images exist
echo "1. Checking if images exist in public folder..."
if [ -f "public/logo.png" ] && [ -f "public/interview-setup.png" ] && [ -f "public/family-watching.png" ]; then
    echo "   ✅ All images found in public folder"
else
    echo "   ❌ Missing images!"
    exit 1
fi

# Check image file types
echo ""
echo "2. Verifying image file types..."
file public/*.png | grep -q "PNG image" && echo "   ✅ All files are valid PNG images" || echo "   ❌ Invalid image files!"

# Check image sizes
echo ""
echo "3. Image file sizes:"
ls -lh public/*.png | awk '{print "   - " $9 ": " $5}'

# Check if images are tracked in git
echo ""
echo "4. Checking git tracking..."
if git ls-files public/*.png | grep -q "\.png"; then
    echo "   ✅ Images are tracked in git"
else
    echo "   ⚠️  Images not tracked in git (may need to be added)"
fi

# Check code references
echo ""
echo "5. Checking code references..."
if grep -r 'src="/logo.png"' components/ > /dev/null; then
    echo "   ✅ logo.png referenced in code"
else
    echo "   ❌ logo.png not found in code"
fi

if grep -r 'src="/interview-setup.png"' components/ > /dev/null; then
    echo "   ✅ interview-setup.png referenced in code"
else
    echo "   ❌ interview-setup.png not found in code"
fi

if grep -r 'src="/family-watching.png"' components/ > /dev/null; then
    echo "   ✅ family-watching.png referenced in code"
else
    echo "   ❌ family-watching.png not found in code"
fi

# Check Vite config
echo ""
echo "6. Checking Vite configuration..."
if [ -f "vite.config.ts" ]; then
    echo "   ✅ vite.config.ts exists"
    if grep -q "public" vite.config.ts || [ ! -z "$(grep -i 'publicDir' vite.config.ts)" ]; then
        echo "   ✅ Public folder configuration found"
    else
        echo "   ℹ️  Using default Vite public folder (public/)"
    fi
else
    echo "   ❌ vite.config.ts not found"
fi

echo ""
echo "======================================"
echo "✅ Verification complete!"
echo ""
echo "Next steps:"
echo "1. Restart dev server: npm run dev"
echo "2. Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)"
echo "3. Check browser console for image loading messages"
echo "4. Try accessing images directly:"
echo "   - http://localhost:3000/logo.png"
echo "   - http://localhost:3000/interview-setup.png"
echo "   - http://localhost:3000/family-watching.png"

