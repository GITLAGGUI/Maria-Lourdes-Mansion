// Performance optimization utilities for smooth 90fps experience
export const performanceConfig = {
  // Optimize for 90fps (11.1ms per frame)
  targetFrameTime: 11.1,
  
  // GPU acceleration settings
  gpuAcceleration: {
    transform: 'translateZ(0)',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    perspective: '1000px'
  },
  
  // Animation settings for smooth performance
  animations: {
    fast: '0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    ultraFast: '0.1s cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: '0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  }
};

// Apply GPU acceleration to element
export const applyGPUAcceleration = (element: HTMLElement) => {
  if (!element) return;
  
  Object.assign(element.style, performanceConfig.gpuAcceleration);
};

// Optimize images for performance
export const optimizeImages = () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.loading = 'lazy';
    img.decoding = 'async';
  });
};

// Debounce function for scroll events
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for high-frequency events
export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Optimize scroll performance
export const optimizeScroll = () => {
  const scrollElements = document.querySelectorAll('[data-scroll]');
  scrollElements.forEach(element => {
    (element as HTMLElement).style.willChange = 'transform';
  });
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalImages = [
    '/images/hero-bg.jpg',
    '/images/logo.png'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Monitor performance
export const monitorPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure') {
          console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
        }
      }
    });
    
    observer.observe({ entryTypes: ['measure'] });
  }
};

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  if (typeof window !== 'undefined') {
    // Apply optimizations on DOM content loaded
    document.addEventListener('DOMContentLoaded', () => {
      optimizeImages();
      optimizeScroll();
      preloadCriticalResources();
      monitorPerformance();
    });
    
    // Optimize on page load
    window.addEventListener('load', () => {
      // Additional optimizations after page load
      const allElements = document.querySelectorAll('*');
      allElements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.style.contain = 'layout style paint';
        }
      });
    });
  }
};