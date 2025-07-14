/**
 * Enhanced Animation Hooks for Maria Lourdes Mansion
 * Phase 1: Performance and Accessibility Foundation
 */

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Device capability detection types
interface DeviceCapabilities {
  supportsHardwareAcceleration: boolean;
  prefersReducedMotion: boolean;
  supportsBackdropFilter: boolean;
  isLowEndDevice: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
}

// Device capability detection utility
const detectDeviceCapabilities = (): DeviceCapabilities => {
  if (typeof window === 'undefined') {
    return {
      supportsHardwareAcceleration: false,
      prefersReducedMotion: false,
      supportsBackdropFilter: false,
      isLowEndDevice: false,
      connectionSpeed: 'unknown',
    };
  }

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Check for hardware acceleration support
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  const supportsHardwareAcceleration = !!gl;

  // Check for backdrop filter support
  const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(1px)') || 
                                  CSS.supports('-webkit-backdrop-filter', 'blur(1px)');

  // Detect low-end devices
  const isLowEndDevice = navigator.hardwareConcurrency <= 2 || 
                        (navigator as any).deviceMemory <= 2;

  // Detect connection speed
  const connection = (navigator as any).connection;
  let connectionSpeed: 'slow' | 'fast' | 'unknown' = 'unknown';
  
  if (connection) {
    const effectiveType = connection.effectiveType;
    connectionSpeed = ['slow-2g', '2g', '3g'].includes(effectiveType) ? 'slow' : 'fast';
  }

  return {
    supportsHardwareAcceleration,
    prefersReducedMotion,
    supportsBackdropFilter,
    isLowEndDevice,
    connectionSpeed,
  };
};

// Legacy hook (maintaining backward compatibility)
export const useAnimations = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return { ref, controls };
};

// Hook for device-aware animations
export const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    supportsHardwareAcceleration: false,
    prefersReducedMotion: false,
    supportsBackdropFilter: false,
    isLowEndDevice: false,
    connectionSpeed: 'unknown',
  });

  useEffect(() => {
    setCapabilities(detectDeviceCapabilities());

    // Listen for changes in motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      setCapabilities(prev => ({
        ...prev,
        prefersReducedMotion: mediaQuery.matches,
      }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return capabilities;
};

// Hook for scroll-triggered animations with performance optimization
export const useScrollAnimation = (threshold = 0.1, triggerOnce = true) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  const capabilities = useDeviceCapabilities();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!triggerOnce) {
      controls.start('hidden');
    }
  }, [controls, inView, triggerOnce]);

  // Return adapted controls based on device capabilities
  return {
    ref,
    controls: capabilities.prefersReducedMotion ? undefined : controls,
    inView,
    capabilities,
  };
};

// Hook for performance monitoring
export const usePerformanceMonitor = () => {
  const [fps, setFps] = useState(60);
  const [isGoodPerformance, setIsGoodPerformance] = useState(true);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const currentFps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setFps(currentFps);
        setIsGoodPerformance(currentFps >= 55);
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    animationId = requestAnimationFrame(measureFPS);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return { fps, isGoodPerformance };
};

// Hook for loading animations with skeleton support
export const useLoadingAnimation = (isLoading: boolean) => {
  const capabilities = useDeviceCapabilities();
  
  const skeletonVariant = useMemo(() => {
    if (capabilities.prefersReducedMotion) {
      return {
        loading: { opacity: 0.7 },
        loaded: { opacity: 1 },
      };
    }
    
    return {
      loading: {
        opacity: [0.6, 1, 0.6],
        transition: {
          duration: 1.5,
          ease: 'easeInOut',
          repeat: Infinity,
        },
      },
      loaded: {
        opacity: 1,
        transition: { duration: 0.3 },
      },
    };
  }, [capabilities.prefersReducedMotion]);

  return {
    variant: skeletonVariant,
    animate: isLoading ? 'loading' : 'loaded',
    isReducedMotion: capabilities.prefersReducedMotion,
  };
};