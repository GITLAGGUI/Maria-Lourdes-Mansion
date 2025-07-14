"use client";
import { useRef, useEffect, useState, useCallback } from 'react';

export interface GestureState {
  isSwipeLeft: boolean;
  isSwipeRight: boolean;
  isSwipeUp: boolean;
  isSwipeDown: boolean;
  isPinching: boolean;
  isLongPress: boolean;
  scale: number;
  velocity: { x: number; y: number };
  distance: { x: number; y: number };
}

export interface GestureOptions {
  swipeThreshold?: number;
  velocityThreshold?: number;
  longPressDelay?: number;
  pinchThreshold?: number;
  enableSwipe?: boolean;
  enablePinch?: boolean;
  enableLongPress?: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  onLongPress?: () => void;
}

export const useGestures = (options: GestureOptions = {}) => {
  const {
    swipeThreshold = 50,
    velocityThreshold = 0.3,
    longPressDelay = 500,
    pinchThreshold = 0.1,
    enableSwipe = true,
    enablePinch = true,
    enableLongPress = true,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onPinch,
    onLongPress,
  } = options;

  const [gestureState, setGestureState] = useState<GestureState>({
    isSwipeLeft: false,
    isSwipeRight: false,
    isSwipeUp: false,
    isSwipeDown: false,
    isPinching: false,
    isLongPress: false,
    scale: 1,
    velocity: { x: 0, y: 0 },
    distance: { x: 0, y: 0 },
  });

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchesRef = useRef<Touch[]>([]);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initialDistanceRef = useRef<number>(0);
  const lastScaleRef = useRef<number>(1);

  const resetGestureState = useCallback(() => {
    setGestureState({
      isSwipeLeft: false,
      isSwipeRight: false,
      isSwipeUp: false,
      isSwipeDown: false,
      isPinching: false,
      isLongPress: false,
      scale: 1,
      velocity: { x: 0, y: 0 },
      distance: { x: 0, y: 0 },
    });
  }, []);

  const getDistance = useCallback((touch1: Touch, touch2: Touch): number => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };

    touchesRef.current = Array.from(e.touches);

    // Handle pinch gesture
    if (enablePinch && e.touches.length === 2) {
      initialDistanceRef.current = getDistance(e.touches[0], e.touches[1]);
      lastScaleRef.current = 1;
      setGestureState(prev => ({ ...prev, isPinching: true }));
    }

    // Handle long press
    if (enableLongPress && e.touches.length === 1) {
      longPressTimerRef.current = setTimeout(() => {
        setGestureState(prev => ({ ...prev, isLongPress: true }));
        onLongPress?.();
      }, longPressDelay);
    }
  }, [enablePinch, enableLongPress, longPressDelay, getDistance, onLongPress]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;

    // Calculate velocity
    const velocityX = Math.abs(deltaX) / deltaTime;
    const velocityY = Math.abs(deltaY) / deltaTime;

    setGestureState(prev => ({
      ...prev,
      distance: { x: deltaX, y: deltaY },
      velocity: { x: velocityX, y: velocityY },
    }));

    // Handle pinch gesture
    if (enablePinch && e.touches.length === 2 && initialDistanceRef.current > 0) {
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      const scale = currentDistance / initialDistanceRef.current;
      
      if (Math.abs(scale - lastScaleRef.current) > pinchThreshold) {
        setGestureState(prev => ({ ...prev, scale }));
        onPinch?.(scale);
        lastScaleRef.current = scale;
      }
    }

    // Clear long press timer on move
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, [enablePinch, pinchThreshold, getDistance, onPinch]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStartRef.current || !enableSwipe) {
      resetGestureState();
      return;
    }

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;

    const velocityX = Math.abs(deltaX) / deltaTime;
    const velocityY = Math.abs(deltaY) / deltaTime;

    // Determine swipe direction
    if (Math.abs(deltaX) > swipeThreshold || velocityX > velocityThreshold) {
      if (deltaX > 0) {
        setGestureState(prev => ({ ...prev, isSwipeRight: true }));
        onSwipeRight?.();
      } else {
        setGestureState(prev => ({ ...prev, isSwipeLeft: true }));
        onSwipeLeft?.();
      }
    }

    if (Math.abs(deltaY) > swipeThreshold || velocityY > velocityThreshold) {
      if (deltaY > 0) {
        setGestureState(prev => ({ ...prev, isSwipeDown: true }));
        onSwipeDown?.();
      } else {
        setGestureState(prev => ({ ...prev, isSwipeUp: true }));
        onSwipeUp?.();
      }
    }

    // Clear long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // Reset after a delay to allow animations to complete
    setTimeout(resetGestureState, 300);
  }, [enableSwipe, swipeThreshold, velocityThreshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, resetGestureState]);

  const gestureHandlers = {
    onTouchStart: (e: React.TouchEvent) => handleTouchStart(e.nativeEvent),
    onTouchMove: (e: React.TouchEvent) => handleTouchMove(e.nativeEvent),
    onTouchEnd: (e: React.TouchEvent) => handleTouchEnd(e.nativeEvent),
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, []);

  return {
    gestureState,
    gestureHandlers,
    resetGestureState,
  };
};

export default useGestures;