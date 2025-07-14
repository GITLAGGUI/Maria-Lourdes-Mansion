'use client';

import { useState, useEffect } from 'react';

interface DeviceCapabilities {
  hasHardwareAcceleration: boolean;
  shouldReduceMotion: boolean;
  isLowEndDevice: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
  supportsIntersectionObserver: boolean;
  supportsWebP: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
  pixelRatio: number;
}

export const useDeviceCapabilities = (): DeviceCapabilities => {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    hasHardwareAcceleration: true,
    shouldReduceMotion: false,
    isLowEndDevice: false,
    connectionSpeed: 'unknown',
    supportsIntersectionObserver: true,
    supportsWebP: true,
    screenSize: 'desktop',
    pixelRatio: 1
  });

  useEffect(() => {
    const detectCapabilities = () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Detect low-end device based on hardware concurrency and memory
      const isLowEnd = (
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
        // @ts-ignore - memory is not in TypeScript types but exists in some browsers
        (navigator.deviceMemory && navigator.deviceMemory <= 2)
      );

      // Detect connection speed
      let connectionSpeed: 'slow' | 'fast' | 'unknown' = 'unknown';
      // @ts-ignore - connection is not in TypeScript types but exists
      if (navigator.connection) {
        // @ts-ignore
        const connection = navigator.connection;
        const effectiveType = connection.effectiveType;
        connectionSpeed = ['slow-2g', '2g', '3g'].includes(effectiveType) ? 'slow' : 'fast';
      }

      // Check for hardware acceleration support
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const hasHardwareAcceleration = !!gl;

      // Check for Intersection Observer support
      const supportsIntersectionObserver = 'IntersectionObserver' in window;

      // Check for WebP support
      const supportsWebP = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;

      // Detect screen size
      const screenWidth = window.innerWidth;
      let screenSize: 'mobile' | 'tablet' | 'desktop' = 'desktop';
      if (screenWidth < 768) {
        screenSize = 'mobile';
      } else if (screenWidth < 1024) {
        screenSize = 'tablet';
      }

      // Get pixel ratio
      const pixelRatio = window.devicePixelRatio || 1;

      setCapabilities({
        hasHardwareAcceleration,
        shouldReduceMotion: prefersReducedMotion || isLowEnd,
        isLowEndDevice: isLowEnd,
        connectionSpeed,
        supportsIntersectionObserver,
        supportsWebP,
        screenSize,
        pixelRatio
      });
    };

    // Initial detection
    detectCapabilities();

    // Listen for media query changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => detectCapabilities();
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Listen for resize to update screen size
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let screenSize: 'mobile' | 'tablet' | 'desktop' = 'desktop';
      if (screenWidth < 768) {
        screenSize = 'mobile';
      } else if (screenWidth < 1024) {
        screenSize = 'tablet';
      }

      setCapabilities(prev => ({ ...prev, screenSize }));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return capabilities;
};

// Additional utility hooks for specific capabilities

export const useReducedMotion = (): boolean => {
  const { shouldReduceMotion } = useDeviceCapabilities();
  return shouldReduceMotion;
};

export const useScreenSize = (): 'mobile' | 'tablet' | 'desktop' => {
  const { screenSize } = useDeviceCapabilities();
  return screenSize;
};

export const useConnectionSpeed = (): 'slow' | 'fast' | 'unknown' => {
  const { connectionSpeed } = useDeviceCapabilities();
  return connectionSpeed;
};

export const useHardwareAcceleration = (): boolean => {
  const { hasHardwareAcceleration } = useDeviceCapabilities();
  return hasHardwareAcceleration;
};