"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, cardHover, staggerContainer, scrollReveal } from "../lib/animations";
import { useStaggeredReveal, useHoverState } from "../hooks/useAdvancedAnimations";
import { useDeviceCapabilities } from "../hooks/useDeviceCapabilities";
import { useGestures } from "../hooks/useGestures";
import { ProgressiveImage, SkeletonGallery } from "./SkeletonLoaders";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";

const images = [
  { src: "/assets/topview.jpg", alt: "Top View", category: "Architecture" },
  { src: "/assets/view2.jpg", alt: "View 2", category: "Interior" },
  { src: "/assets/view3.jpg", alt: "View 3", category: "Interior" },
  { src: "/assets/sunset.jpg", alt: "Sunset View", category: "Exterior" },
  { src: "/assets/weddingpic.jpg", alt: "Wedding", category: "Events" },
  { src: "/assets/coffeandclub.jpg", alt: "Coffee and Club", category: "Amenities" },
];

const categories = ["All", "Architecture", "Interior", "Exterior", "Events", "Amenities"];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  
  const { shouldReduceMotion } = useDeviceCapabilities();
  const { setHover, isHovered } = useHoverState();
  const { ref, visibleItems, isItemVisible } = useStaggeredReveal(images.length, 0.15);

  const filteredImages = selectedCategory === "All" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }));
  };

  // Navigation functions for lightbox
  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex((_, index) => index === selectedImage);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex + 1 >= filteredImages.length ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex - 1 < 0 ? filteredImages.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage(newIndex);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  }, [selectedImage, filteredImages]);

  const handleZoom = useCallback((delta: number) => {
    setZoomLevel(prev => Math.max(0.5, Math.min(3, prev + delta)));
  }, []);

  // Gesture handlers for lightbox
  const lightboxGestures = useGestures({
    enableSwipe: true,
    enablePinch: true,
    enableLongPress: false,
    swipeThreshold: 50,
    onSwipeLeft: () => navigateImage('next'),
    onSwipeRight: () => navigateImage('prev'),
    onPinch: (scale) => {
      setZoomLevel(prev => Math.max(0.5, Math.min(3, scale)));
    },
  });

  // Gallery item gesture handlers
  const createItemGestures = useCallback((index: number) => {
    return useGestures({
      enableSwipe: false,
      enablePinch: false,
      enableLongPress: true,
      longPressDelay: 300,
      onLongPress: () => {
        setSelectedImage(index);
      },
    });
  }, []);

  const lightboxVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-6">
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={shouldReduceMotion ? {} : fadeIn("up", "spring", 0.2, 0.75)}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Gallery
            </span>
          </motion.h2>
          <motion.p 
            variants={shouldReduceMotion ? {} : fadeIn("up", "spring", 0.4, 0.75)}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Discover the beauty and elegance of Maria Lourdes Mansion through our curated collection of images.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          variants={shouldReduceMotion ? {} : fadeIn("up", "spring", 0.6, 0.75)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700 shadow-md'
              }`}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          ref={ref}
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredImages.map((image, index) => {
            const itemGestures = createItemGestures(index);
            
            return (
              <motion.div
                key={`${image.src}-${selectedCategory}`}
                variants={shouldReduceMotion ? {} : imageVariants}
                custom={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                {...itemGestures.gestureHandlers}
                onMouseEnter={() => setHover(`gallery-${index}`)}
                onMouseLeave={() => setHover(null)}
              >
                <div className="aspect-[4/3] relative">
                  {!imagesLoaded[index] && <SkeletonGallery />}
                  
                  <ProgressiveImage
                    src={image.src}
                    alt={image.alt}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 cursor-pointer ${
                      imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(index)}
                  />
                  
                  {/* Click overlay for mobile */}
                  <div 
                    className="absolute inset-0 cursor-pointer"
                    onClick={() => setSelectedImage(index)}
                  />
                  
                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered(`gallery-${index}`) ? 1 : 0 }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: isHovered(`gallery-${index}`) ? 1 : 0 }}
                      className="bg-white/20 backdrop-blur-sm rounded-full p-4"
                    >
                      <ZoomIn className="w-8 h-8 text-white" />
                    </motion.div>
                  </motion.div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-500/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      {image.category}
                    </span>
                  </div>
                  
                  {/* Touch indicator for mobile */}
                  <div className="absolute bottom-4 right-4 md:hidden">
                    <div className="bg-black/50 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
                      Long press to view
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              variants={lightboxVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
              {...lightboxGestures.gestureHandlers}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Zoom Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
                <button
                  onClick={() => handleZoom(-0.2)}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <span className="bg-white/20 text-white px-3 py-2 rounded-full backdrop-blur-sm text-sm">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => handleZoom(0.2)}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>

              {/* Image */}
              <motion.div
                className="relative max-w-[90vw] max-h-[90vh]"
                style={{
                  transform: `scale(${zoomLevel}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                }}
              >
                <Image
                  src={filteredImages[selectedImage].src}
                  alt={filteredImages[selectedImage].alt}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>

              {/* Gesture Instructions */}
              <div className="absolute bottom-4 right-4 z-10 bg-white/20 text-white px-3 py-2 rounded-lg backdrop-blur-sm text-sm">
                <div className="hidden md:block">
                  Swipe or use arrows to navigate • Pinch to zoom
                </div>
                <div className="md:hidden">
                  Swipe to navigate • Pinch to zoom
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;