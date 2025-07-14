'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useInView } from 'framer-motion';
import { useDeviceCapabilities } from './useDeviceCapabilities';

// Advanced Scroll-Triggered Animations Hook
export const useScrollReveal = (threshold = 0.1, triggerOnce = true) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: triggerOnce,
    margin: "0px 0px -100px 0px",
    amount: threshold
  });
  const { shouldReduceMotion } = useDeviceCapabilities();

  return {
    ref,
    isInView: shouldReduceMotion ? true : isInView,
    controls: isInView ? 'visible' : 'hidden'
  };
};

// Staggered Animation Hook
export const useStaggeredReveal = (itemCount: number, delay = 0.1) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const { isInView, ref } = useScrollReveal();
  const { shouldReduceMotion } = useDeviceCapabilities();

  useEffect(() => {
    if (isInView && !shouldReduceMotion) {
      const timeouts: NodeJS.Timeout[] = [];
      
      for (let i = 0; i < itemCount; i++) {
        const timeout = setTimeout(() => {
          setVisibleItems(prev => [...prev, i]);
        }, i * delay * 1000);
        timeouts.push(timeout);
      }

      return () => timeouts.forEach(clearTimeout);
    } else if (shouldReduceMotion) {
      setVisibleItems(Array.from({ length: itemCount }, (_, i) => i));
    }
  }, [isInView, itemCount, delay, shouldReduceMotion]);

  return {
    ref,
    visibleItems,
    isItemVisible: (index: number) => visibleItems.includes(index)
  };
};

// Progressive Image Loading Hook
export const useProgressiveImage = (src: string, placeholder?: string) => {
  const [loading, setLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(placeholder || '');
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    
    img.onload = () => {
      setCurrentSrc(src);
      setLoading(false);
    };
    
    img.onerror = () => {
      setError(true);
      setLoading(false);
    };
    
    img.src = src;
  }, [src]);

  return {
    src: currentSrc,
    loading,
    error,
    blur: loading
  };
};

// Intersection Observer with Multiple Thresholds
export const useAdvancedIntersection = (
  thresholds = [0, 0.25, 0.5, 0.75, 1],
  rootMargin = '0px'
) => {
  const [intersectionRatio, setIntersectionRatio] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIntersectionRatio(entry.intersectionRatio);
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: thresholds,
        rootMargin
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [thresholds, rootMargin]);

  return {
    ref,
    intersectionRatio,
    isIntersecting,
    visibility: intersectionRatio
  };
};

// Parallax Scroll Hook
export const useParallax = (speed = 0.5, direction: 'vertical' | 'horizontal' = 'vertical') => {
  const [offset, setOffset] = useState(0);
  const { shouldReduceMotion } = useDeviceCapabilities();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      setOffset(rate);
    };

    const throttledHandleScroll = throttle(handleScroll, 16); // ~60fps
    
    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [speed, shouldReduceMotion]);

  return {
    ref,
    offset: shouldReduceMotion ? 0 : offset,
    transform: direction === 'vertical' 
      ? `translate3d(0, ${offset}px, 0)` 
      : `translate3d(${offset}px, 0, 0)`
  };
};

// Loading State Management Hook
export const useLoadingState = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: loading
    }));
  }, []);

  const isLoading = useCallback((key: string) => {
    return loadingStates[key] || false;
  }, [loadingStates]);

  const isAnyLoading = useCallback(() => {
    return Object.values(loadingStates).some(Boolean);
  }, [loadingStates]);

  return {
    setLoading,
    isLoading,
    isAnyLoading,
    loadingStates
  };
};

// Hover State Management Hook
export const useHoverState = () => {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  const setHover = useCallback((elementId: string | null) => {
    setHoveredElement(elementId);
  }, []);

  const isHovered = useCallback((elementId: string) => {
    return hoveredElement === elementId;
  }, [hoveredElement]);

  return {
    setHover,
    isHovered,
    hoveredElement
  };
};

// Animation Sequence Hook
export const useAnimationSequence = (steps: string[], duration = 1000) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { shouldReduceMotion } = useDeviceCapabilities();

  const play = useCallback(() => {
    if (shouldReduceMotion) {
      setCurrentStep(steps.length - 1);
      return;
    }

    setIsPlaying(true);
    setCurrentStep(0);

    const stepDuration = duration / steps.length;
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [steps, duration, shouldReduceMotion]);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  return {
    currentStep: steps[currentStep],
    stepIndex: currentStep,
    isPlaying,
    play,
    reset,
    progress: (currentStep + 1) / steps.length
  };
};

// Utility function for throttling
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Phase 3: Advanced Animation Management Hook
export const useAdvancedAnimations = () => {
  const { shouldReduceMotion, hasHardwareAcceleration, isLowEndDevice } = useDeviceCapabilities();
  const [animationState, setAnimationState] = useState({
    containerQueries: false,
    customProperties: false,
    motionPath: false,
    glassMorphism: false
  });
  
  const animationRef = useRef<HTMLElement | null>(null);
  const performanceRef = useRef({ frameCount: 0, lastTime: 0 });

  // Feature Detection
  useEffect(() => {
    const checkFeatureSupport = () => {
      // Check for container query support
      const containerSupport = CSS.supports('container-type: inline-size');
      
      // Check for @property support
      const propertySupport = CSS.supports('(--test: 0)') && 
                             typeof CSS !== 'undefined' && 
                             typeof CSS.registerProperty === 'function';
      
      // Check for motion path support
      const motionPathSupport = CSS.supports('offset-path: circle()');
      
      // Check for backdrop filter support
      const backdropFilterSupport = CSS.supports('backdrop-filter: blur(10px)');
      
      // Check for advanced backdrop filter support
      const advancedGlassSupport = backdropFilterSupport && 
                                  CSS.supports('backdrop-filter: blur(10px) brightness(1.1)');

      setAnimationState({
        containerQueries: containerSupport,
        customProperties: propertySupport,
        motionPath: motionPathSupport,
        glassMorphism: advancedGlassSupport
      });
    };

    checkFeatureSupport();
  }, []);

  // Container Query Animation Handler
  const setupContainerAnimation = useCallback((element: HTMLElement, options = {}) => {
    if (!animationState.containerQueries || shouldReduceMotion) return;

    const defaultOptions = {
      breakpoints: [300, 500, 800],
      animations: ['fade', 'scale', 'slide'],
      timing: 'ease-out',
      duration: '0.3s'
    };

    const config = { ...defaultOptions, ...options };
    
    // Apply container query setup
    element.style.containerType = 'inline-size';
    element.style.containerName = 'responsive';
    
    return () => {
      element.style.containerType = '';
      element.style.containerName = '';
    };
  }, [animationState.containerQueries, shouldReduceMotion]);

  // Glass Morphism Effect Handler
  const applyGlassMorphism = useCallback((
    element: HTMLElement,
    variant: 'ultra' | 'frosted' | 'liquid' | 'dynamic' = 'ultra'
  ) => {
    if (!animationState.glassMorphism || shouldReduceMotion) {
      // Fallback for unsupported browsers
      element.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      element.style.border = '1px solid rgba(255, 255, 255, 0.2)';
      return;
    }

    const glassStyles = {
      ultra: {
        backdropFilter: 'blur(20px) saturate(180%) brightness(1.1)',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
      },
      frosted: {
        backdropFilter: 'blur(15px) contrast(1.2)',
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.25)'
      },
      liquid: {
        backdropFilter: 'blur(25px) hue-rotate(10deg)',
        background: 'rgba(255, 255, 255, 0.12)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.45)'
      },
      dynamic: {
        backdropFilter: 'blur(18px) brightness(1.2) contrast(1.1)',
        background: 'rgba(255, 255, 255, 0.09)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 6px 24px 0 rgba(31, 38, 135, 0.3)'
      }
    };

    const styles = glassStyles[variant];
    Object.assign(element.style, styles);

    if (variant === 'dynamic') {
      // Add dynamic animation for the dynamic variant
      element.style.animation = 'glass-depth-shift 5s ease-in-out infinite';
    }
  }, [animationState.glassMorphism, shouldReduceMotion]);

  // Gradient Animation Handler
  const animateGradient = useCallback((
    element: HTMLElement,
    type: 'mesh' | 'angle' | 'position' = 'mesh'
  ) => {
    if (shouldReduceMotion) return;

    const animations = {
      mesh: 'gradient-mesh-morph 15s ease-in-out infinite',
      angle: 'gradient-angle-rotation 12s linear infinite',
      position: 'gradient-position-shift 6s ease-in-out infinite'
    };

    element.style.animation = animations[type];
    
    return () => {
      element.style.animation = '';
    };
  }, [shouldReduceMotion]);

  // Utility function to get optimal animation settings
  const getOptimalAnimationSettings = useCallback(() => {
    const isHighPerformance = hasHardwareAcceleration && !isLowEndDevice;
    
    return {
      reduceMotion: shouldReduceMotion,
      enableAdvanced: isHighPerformance && !shouldReduceMotion,
      containerQueries: animationState.containerQueries,
      customProperties: animationState.customProperties,
      motionPath: animationState.motionPath,
      glassMorphism: animationState.glassMorphism,
      recommendedDuration: isHighPerformance ? 'normal' : 'fast',
      recommendedEasing: isHighPerformance ? 'cubic-bezier(0.4, 0, 0.2, 1)' : 'ease-out'
    };
  }, [shouldReduceMotion, hasHardwareAcceleration, isLowEndDevice, animationState]);

  return {
    // State
    animationState,
    shouldReduceMotion,
    isHighPerformance: hasHardwareAcceleration && !isLowEndDevice,
    
    // Handlers
    setupContainerAnimation,
    applyGlassMorphism,
    animateGradient,
    
    // Utilities
    getOptimalAnimationSettings,
    animationRef
  };
};