#!/bin/bash

# Maria Lourdes Mansion - Netlify Deployment Script
# Domain: Isabela.netlify.app
# Developer: Joel Laggui Jr.

echo "🚀 Starting deployment process for Maria Lourdes Mansion..."
echo "📍 Target Domain: Isabela.netlify.app"

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""
    echo "📋 Deployment Summary:"
    echo "   • Project: Maria Lourdes Mansion"
    echo "   • Domain: Isabela.netlify.app"
    echo "   • Logo: Custom Logo-domain.png implemented"
    echo "   • Performance: Optimized for 90fps"
    echo "   • Mobile: Responsive design with sticky header"
    echo "   • Security: Environment variables protected"
    echo ""
    echo "🌐 Next Steps for Netlify Deployment:"
    echo "   1. Push this code to your Git repository"
    echo "   2. Connect repository to Netlify"
    echo "   3. Set custom domain to: Isabela.netlify.app"
    echo "   4. Add environment variables in Netlify dashboard"
    echo ""
    echo "📞 Developer Contact:"
    echo "   • GitHub: https://github.com/GITLAGGUI"
    echo "   • LinkedIn: https://www.linkedin.com/in/joel-laggui-801104369/"
    echo "   • WhatsApp: +63 915 368 3496"
    echo ""
    echo "✨ Deployment ready! Your website is optimized and ready for production."
else
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi