"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { slideIn, textVariant, floatingElement, sequentialReveal } from "../lib/animations";
import { useScrollReveal, useParallax } from "../hooks/useAdvancedAnimations";
import { useDeviceCapabilities } from "../hooks/useDeviceCapabilities";
import { ProgressiveImage, LoadingButton } from "./SkeletonLoaders";

const Welcome = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { shouldReduceMotion } = useDeviceCapabilities();
  const { ref: parallaxRef, offset } = useParallax(0.3);
  const { ref: contentRef, isInView } = useScrollReveal(0.2);

  const heroContent = {
    title: "Welcome to Maria Lourdes Mansion",
    subtitle: "Your perfect getaway for relaxation and events.",
    description: "Experience luxury and comfort in our beautifully designed spaces, perfect for creating unforgettable memories.",
    cta: "Explore Our Amenities"
  };

  const floatingElements = [
    { delay: 0, duration: 3, offset: { x: 20, y: 30 } },
    { delay: 1, duration: 4, offset: { x: -15, y: 25 } },
    { delay: 2, duration: 3.5, offset: { x: 25, y: -20 } }
  ];

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden container-adaptive">
      {/* Background Image with Parallax and Advanced Effects */}
      <motion.div 
        ref={parallaxRef}
        className="absolute inset-0 w-full h-full"
        style={{
          transform: shouldReduceMotion ? 'none' : `translateY(${offset * 0.5}px)`
        }}
      >
        <ProgressiveImage
          src="/assets/pic2.jpg"
          alt="Welcome background"
          placeholder="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          className={`
            w-full h-full object-cover transition-all duration-1000
            ${shouldReduceMotion ? '' : 'animate-color-cycle'}
          `}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Advanced Gradient Overlay with Morphing Effect */}
        <motion.div
          className={`
            absolute inset-0 
            ${shouldReduceMotion 
              ? 'bg-gradient-to-b from-black/40 via-black/30 to-black/60' 
              : 'gradient-morphing opacity-60'
            }
          `}
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Glass overlay for enhanced depth */}
        <div className="absolute inset-0 glass-dynamic" />
      </motion.div>

      {/* Floating Background Elements with Advanced Animations */}
      {!shouldReduceMotion && floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`
            absolute w-32 h-32 rounded-full blur-xl
            ${index % 2 === 0 ? 'glass-ultra' : 'gradient-elastic'}
            animate-floating-particles
          `}
          style={{
            left: `${10 + index * 25}%`,
            top: `${20 + index * 15}%`,
          }}
          variants={floatingElement}
          initial="hidden"
          animate="visible"
          transition={{
            delay: element.delay,
            duration: element.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Liquid Morph Decorative Elements */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-1/4 w-64 h-64 glass-liquid opacity-20 animate-liquid-morph"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/5 w-48 h-48 gradient-elastic opacity-30"
            animate={{
              scale: [1, 0.8, 1],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      )}

      {/* Main Content with Container Queries */}
      <motion.div
        ref={contentRef}
        className="relative z-10 flex items-center justify-center h-full container-adaptive"
        variants={sequentialReveal}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title with Text Reveal Animation */}
          <motion.h1
            className={`
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6
              ${shouldReduceMotion ? '' : 'animate-text-reveal'}
            `}
            variants={textVariant(0)}
            initial="hidden"
            animate="show"
          >
            <span className="gradient-text bg-gradient-to-r from-primary-300 via-accent-300 to-primary-300">
              {heroContent.title}
            </span>
          </motion.h1>

          {/* Subtitle with Container Query Responsive Sizing */}
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl mb-8 text-gray-200 font-light container-adaptive"
            variants={textVariant(0.2)}
            initial="hidden"
            animate="show"
          >
            {heroContent.subtitle}
          </motion.p>

          {/* Description with Advanced Typography */}
          <motion.p
            className={`
              text-lg sm:text-xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed
              ${shouldReduceMotion ? '' : 'text-color-cycle'}
            `}
            variants={textVariant(0.4)}
            initial="hidden"
            animate="show"
          >
            {heroContent.description}
          </motion.p>

          {/* CTA Button with Advanced Hover Effects */}
          <motion.div
            variants={slideIn('up', 'spring', 0.6, 0.8)}
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <LoadingButton
              onClick={() => {
                document.getElementById('amenities')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
              className={`
                btn-primary text-lg px-8 py-4 rounded-2xl font-semibold
                glass-ultra border border-white/20 backdrop-blur-xl
                hover:scale-105 hover:shadow-2xl transition-all duration-300
                ${shouldReduceMotion ? '' : 'hover-magnetic animate-elastic-scale'}
              `}
            >
              {heroContent.cta}
            </LoadingButton>

            {/* Secondary Action with Liquid Morph */}
            <motion.button
              className={`
                glass-frosted text-white border border-white/30 px-8 py-4 rounded-2xl
                hover:glass-ultra transition-all duration-300
                ${shouldReduceMotion ? '' : 'hover-liquid animate-magnetic-hover'}
              `}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              View Gallery
            </motion.button>
          </motion.div>

          {/* Scroll Indicator with Advanced Animation */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <motion.div
                className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  className="w-1 h-3 bg-white rounded-full mt-2 animate-floating-particles"
                />
              </motion.div>
              <p className="text-white/70 text-sm mt-2 animate-pulse">Scroll Down</p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Particle System for Enhanced Visual Effects */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`
                absolute w-2 h-2 rounded-full
                ${i % 3 === 0 ? 'bg-primary-400/40' : i % 3 === 1 ? 'bg-accent-400/40' : 'bg-white/30'}
                animate-floating-particles
              `}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Advanced Glass Reflection Effect */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 3, duration: 2 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 5,
            }}
          />
        </motion.div>
      )}
    </section>
  );
};

export default Welcome;