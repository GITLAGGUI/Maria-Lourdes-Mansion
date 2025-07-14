'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { shimmerEffect, skeletonPulse } from '../lib/animations';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'image';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'shimmer' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width = '100%',
  height,
  animation = 'shimmer'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded';
      case 'rectangular':
        return 'rounded-lg';
      case 'circular':
        return 'rounded-full';
      case 'image':
        return 'rounded-lg aspect-video';
      default:
        return 'h-4 rounded';
    }
  };

  const getAnimationProps = () => {
    switch (animation) {
      case 'pulse':
        return {
          variants: skeletonPulse,
          initial: 'initial',
          animate: 'animate'
        };
      case 'shimmer':
        return {
          variants: shimmerEffect,
          initial: 'initial',
          animate: 'animate',
          style: {
            background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%)',
            backgroundSize: '200px 100%'
          }
        };
      case 'none':
      default:
        return {};
    }
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined
  };

  return (
    <motion.div
      className={`bg-white/10 ${getVariantClasses()} ${className}`}
      style={style}
      {...getAnimationProps()}
    />
  );
};

// Skeleton Card Component
export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 ${className}`}>
    <Skeleton variant="image" className="mb-4" />
    <Skeleton variant="text" width="80%" className="mb-2" />
    <Skeleton variant="text" width="60%" className="mb-4" />
    <div className="flex gap-2">
      <Skeleton variant="rectangular" width={80} height={32} />
      <Skeleton variant="rectangular" width={100} height={32} />
    </div>
  </div>
);

// Skeleton List Component
export const SkeletonList: React.FC<{ 
  items?: number; 
  className?: string;
  itemClassName?: string;
}> = ({ 
  items = 3, 
  className = '',
  itemClassName = ''
}) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className={`flex items-center space-x-4 ${itemClassName}`}>
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="75%" />
          <Skeleton variant="text" width="50%" />
        </div>
      </div>
    ))}
  </div>
);

// Skeleton Gallery Component
export const SkeletonGallery: React.FC<{ 
  columns?: number; 
  rows?: number;
  className?: string;
}> = ({ 
  columns = 3, 
  rows = 2,
  className = ''
}) => (
  <div className={`grid gap-4 ${className}`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
    {Array.from({ length: columns * rows }).map((_, index) => (
      <Skeleton 
        key={index} 
        variant="image" 
        className="aspect-square"
      />
    ))}
  </div>
);

// Progressive Image Loader Component
interface ProgressiveImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  placeholder,
  className = '',
  onLoad,
  onError
}) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState(placeholder || '');

  React.useEffect(() => {
    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setLoading(false);
      onLoad?.();
    };
    
    img.onerror = () => {
      setError(true);
      setLoading(false);
      onError?.();
    };
    
    img.src = src;
  }, [src, onLoad, onError]);

  if (error) {
    return (
      <div className={`bg-white/10 rounded-lg flex items-center justify-center ${className}`}>
        <span className="text-white/60">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {loading && (
        <motion.div
          className="absolute inset-0 z-10"
          initial={{ opacity: 1 }}
          animate={{ opacity: loading ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Skeleton variant="image" className="w-full h-full" />
        </motion.div>
      )}
      
      <motion.img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover ${loading ? 'opacity-0' : 'opacity-100'}`}
        initial={{ scale: 1.1, filter: 'blur(10px)' }}
        animate={{ 
          scale: loading ? 1.1 : 1,
          filter: loading ? 'blur(10px)' : 'blur(0px)'
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  );
};

// Loading Button Component
interface LoadingButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  loading = false,
  disabled = false,
  onClick,
  className = '',
  variant = 'primary'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white';
      case 'secondary':
        return 'bg-white/10 hover:bg-white/20 text-white border border-white/20';
      case 'ghost':
        return 'hover:bg-white/10 text-white';
      default:
        return 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white';
    }
  };

  return (
    <motion.button
      className={`
        relative px-6 py-3 rounded-lg font-semibold transition-all duration-300
        ${getVariantClasses()}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
    >
      <motion.span
        className="flex items-center justify-center gap-2"
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}
    </motion.button>
  );
};

// Content Placeholder Component
export const ContentPlaceholder: React.FC<{
  title?: string;
  description?: string;
  className?: string;
}> = ({
  title = 'Loading content...',
  description = 'Please wait while we prepare your experience',
  className = ''
}) => (
  <motion.div
    className={`text-center py-12 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <motion.div
      className="w-16 h-16 mx-auto mb-6 border-4 border-white/20 border-t-amber-500 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
    />
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-white/70">{description}</p>
  </motion.div>
);