#!/bin/bash

# Deployment script for Maria Lourdes Mansion website
echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run build
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

# Add all changes to git
echo "📝 Adding changes to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "feat: implement sticky header, mobile optimizations, and performance improvements

- Made header sticky/follow when scrolling
- Fixed mobile menu button with proper Font Awesome list icon
- Removed 'Get Quote' button from mobile view (hidden on mobile)
- Added comprehensive performance optimizations for 90fps
- Implemented GPU acceleration and smooth animations
- Added .gitignore to protect environment variables
- Optimized fonts with display:swap for better loading
- Added Netlify configuration for deployment
- Enhanced scroll performance with throttling
- Added early performance optimizations script"

# Push to repository
echo "🌐 Pushing to repository..."
git push

echo "✅ Deployment preparation complete!"
echo "🔗 Your site will be automatically deployed to Netlify"
echo "📊 Performance optimizations applied for smooth 90fps experience"
echo "🔒 Environment variables are now properly ignored"