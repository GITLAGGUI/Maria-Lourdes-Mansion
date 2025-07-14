# Maria Lourdes Mansion Website

A high-performance, modern website for Maria Lourdes Mansion featuring responsive design, optimized performance, and professional user experience.

## Key Features Implemented

### Sticky Header Navigation
- Header follows user when scrolling with smooth transitions
- Glass morphism effect with GPU acceleration
- Optimized for 90fps performance

### Mobile Optimizations
- Fixed mobile menu button with proper Font Awesome list icon
- Responsive "Get Quote" button (hidden on mobile devices)
- Touch-friendly interactions and improved mobile navigation
- Optimized layout for various screen sizes

### Performance Optimizations
- GPU acceleration for smooth 90fps experience
- Throttled scroll events for enhanced performance
- Optimized fonts with display swap functionality
- Early performance optimization scripts
- Lazy loading and preloading strategies
- CSS containment for improved rendering performance

### Security & Deployment
- Comprehensive .gitignore to protect environment variables
- Netlify deployment configuration with security headers
- Caching optimization and asset compression
- Environment variable protection for production

## Quick Start Guide

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

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

## Deployment Information

### Live Website
The website is deployed at: **https://Isabela.netlify.app**

### Netlify Deployment

#### Method 1: Automatic Deployment (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Netlify will automatically deploy using the included netlify.toml configuration

#### Method 2: Manual Deployment
1. Run the deployment script:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

### Environment Variables Setup
1. Copy .env.example to .env.local
2. Fill in your actual environment variables
3. In Netlify dashboard, navigate to Site Settings > Environment Variables
4. Add your environment variables for production deployment

## Project Structure

```
maria-lourdes-mansion/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility libraries
├── public/
│   └── assets/             # Static assets including Logo-domain.png
├── .gitignore             # Git ignore rules
├── netlify.toml           # Netlify configuration
├── deploy.sh              # Deployment script
└── package.json           # Dependencies and scripts
```

## Technical Components

### Header Component
- **Sticky Navigation**: Follows user scroll with smooth animations
- **Mobile Menu**: Optimized with Font Awesome icons and responsive behavior
- **Performance**: GPU accelerated with throttled scroll events
- **Responsive Design**: Adaptive layout for desktop and mobile devices

### Performance Features
- **GPU Acceleration**: All animations utilize translateZ(0) for hardware acceleration
- **Throttled Events**: Scroll events optimized and limited to 60fps
- **Lazy Loading**: Images and components load on demand
- **Font Optimization**: Display swap for faster initial page loading

## Configuration Files

### netlify.toml
- Build settings and URL redirects
- Security headers implementation
- Caching optimization rules
- Asset compression settings

### .gitignore
- Protects sensitive environment variables
- Excludes build artifacts and temporary files
- Ignores IDE and operating system files

## Performance Specifications

### 90fps Optimization
- GPU acceleration for all animations and transitions
- Optimized CSS with will-change properties
- Throttled scroll events for smooth performance
- Efficient re-rendering strategies

### Loading Performance
- Font display swap for faster text rendering
- Image lazy loading implementation
- Code splitting for optimal bundle sizes
- Strategic asset preloading

## Development Information

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint code analysis

### Performance Monitoring
The website includes built-in performance monitoring that tracks:
- Animation frame rates and smoothness
- Page loading times and metrics
- Scroll performance optimization
- User interaction responsiveness

## Security Implementation

### Environment Variables
- All sensitive data protected via .gitignore
- Template provided in .env.example
- Production variables configured in Netlify dashboard

### Security Headers
- X-Frame-Options: DENY
- X-XSS-Protection: enabled with blocking
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## Mobile Optimization Details

### Responsive Design
- Mobile-first development approach
- Touch-friendly interaction elements
- Optimized button sizes for mobile devices
- Simplified navigation for smaller screens

### Mobile Performance
- Reduced animations for better battery efficiency
- Optimized images for mobile screen resolutions
- Efficient touch event handling
- Responsive loading strategies

## Browser Compatibility

- Chrome 90 and above
- Firefox 88 and above
- Safari 14 and above
- Microsoft Edge 90 and above

## Contact Information

### Developer: Joel Laggui Jr.

- **GitHub**: [https://github.com/GITLAGGUI](https://github.com/GITLAGGUI)
- **LinkedIn**: [https://www.linkedin.com/in/joel-laggui-801104369/](https://www.linkedin.com/in/joel-laggui-801104369/)
- **Facebook**: [https://www.facebook.com/joellagguijr](https://www.facebook.com/joellagguijr)
- **Instagram**: [https://www.instagram.com/jlaggui.jr/](https://www.instagram.com/jlaggui.jr/)
- **WhatsApp**: +63 915 368 3496

For technical support, feature requests, or project inquiries, please reach out through any of the above channels.

## Deployment Status

- Sticky header implementation: Complete
- Mobile optimizations: Complete
- Performance optimization for 90fps: Complete
- Environment variables security: Complete
- Netlify deployment configuration: Complete
- Custom logo implementation: Complete

The website is fully optimized and ready for production deployment at https://Isabela.netlify.app with all requested features implemented and tested.