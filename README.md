# Maria Lourdes Mansion Website

A high-performance, modern website for Maria Lourdes Mansion featuring:

## ✨ Key Features Implemented

### 🔄 Sticky Header
- Header follows user when scrolling
- Smooth glass morphism effect
- Optimized for 90fps performance

### 📱 Mobile Optimizations
- Fixed mobile menu button with proper Font Awesome list icon
- Removed "Get Quote" button from mobile view (hidden on mobile)
- Responsive design improvements
- Touch-friendly interactions

### ⚡ Performance Optimizations
- GPU acceleration for smooth 90fps experience
- Throttled scroll events for better performance
- Optimized fonts with `display: swap`
- Early performance optimization scripts
- Lazy loading and preloading strategies
- CSS containment for better rendering performance

### 🔒 Security & Deployment
- Comprehensive `.gitignore` to protect environment variables
- Netlify deployment configuration
- Security headers and caching optimization
- Environment variable protection

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd maria-lourdes-mansion

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Build the project
npm run build

# Start production server
npm start
```

## 🌐 Deployment to Netlify

### Method 1: Automatic Deployment (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Netlify will automatically deploy using the included `netlify.toml` configuration

### Method 2: Manual Deployment
1. Run the deployment script:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

### Environment Variables
1. Copy `.env.example` to `.env.local`
2. Fill in your actual environment variables
3. In Netlify dashboard, go to Site Settings > Environment Variables
4. Add your environment variables there

## 📁 Project Structure

```
maria-lourdes-mansion/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility libraries
├── public/                 # Static assets
├── .gitignore             # Git ignore rules
├── netlify.toml           # Netlify configuration
├── deploy.sh              # Deployment script
└── package.json           # Dependencies
```

## 🎨 Key Components

### Header Component
- **Sticky Navigation**: Follows user scroll
- **Mobile Menu**: Optimized with Font Awesome icons
- **Performance**: GPU accelerated with throttled events
- **Responsive**: Hides "Get Quote" on mobile

### Performance Optimizations
- **GPU Acceleration**: All animations use `translateZ(0)`
- **Throttled Events**: Scroll events limited to 60fps
- **Lazy Loading**: Images and components load on demand
- **Font Optimization**: Display swap for faster loading

## 🔧 Configuration Files

### `netlify.toml`
- Build settings and redirects
- Security headers
- Caching optimization
- Asset compression

### `.gitignore`
- Protects environment variables
- Excludes build artifacts
- Ignores IDE and OS files

## 📊 Performance Features

### 90fps Optimization
- GPU acceleration for all animations
- Optimized CSS with `will-change` properties
- Throttled scroll events
- Efficient re-rendering strategies

### Loading Performance
- Font display swap
- Image lazy loading
- Code splitting
- Asset preloading

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Performance Monitoring
The site includes built-in performance monitoring that logs:
- Animation frame rates
- Loading times
- Scroll performance
- User interactions

## 🔐 Security

### Environment Variables
- All sensitive data is protected via `.gitignore`
- Use `.env.example` as a template
- Set variables in Netlify dashboard for production

### Security Headers
- X-Frame-Options: DENY
- X-XSS-Protection: enabled
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## 📱 Mobile Optimizations

### Responsive Design
- Mobile-first approach
- Touch-friendly interactions
- Optimized button sizes
- Simplified mobile navigation

### Performance on Mobile
- Reduced animations for better battery life
- Optimized images for mobile screens
- Efficient touch event handling

## 🎯 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📞 Support

For any issues or questions regarding the website implementation, please refer to the code comments or create an issue in the repository.

## 🚀 Deployment Status

✅ Sticky header implemented
✅ Mobile optimizations complete
✅ Performance optimized for 90fps
✅ Environment variables secured
✅ Netlify deployment ready

The website is now ready for deployment to Netlify with all requested features implemented and optimized for the best user experience.