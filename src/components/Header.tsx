"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { textVariant, navigationLink, buttonHover } from "../lib/animations";
import { useScrollReveal, useHoverState } from "../hooks/useAdvancedAnimations";
import { useDeviceCapabilities } from "../hooks/useDeviceCapabilities";
import { throttle } from "../lib/performance-optimizations";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setHover, isHovered } = useHoverState();
  const { shouldReduceMotion } = useDeviceCapabilities();

  // Handle scroll effect with throttling for better performance
  const handleScroll = useCallback(
    throttle(() => {
      setIsScrolled(window.scrollY > 50);
    }, 16), // ~60fps throttling
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const navigationItems = [
    { href: "#rooms", label: "Rooms & Suites" },
    { href: "#amenities", label: "Facilities" },
    { href: "#dining", label: "Dining" },
    { href: "#experiences", label: "Experiences" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" }
  ];

  const headerVariants = {
    transparent: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      backdropFilter: "blur(0px)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    solid: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(20px)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 will-change-transform
        ${isScrolled 
          ? 'glass-ultra shadow-2xl border-b border-white/10 backdrop-blur-xl' 
          : 'bg-transparent'
        }
        container-adaptive supports-container-queries
      `}
      variants={headerVariants}
      animate={isScrolled ? "solid" : "transparent"}
      initial="transparent"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        transform: 'translateZ(0)', // GPU acceleration
      }}
    >
      {/* Container Query Responsive Header */}
      <div className="container-adaptive">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo with advanced glass effect */}
            <motion.div
              variants={textVariant(0)}
              initial="hidden"
              animate="show"
              className="flex-shrink-0"
            >
              <Link 
                href="/" 
                className={`
                  text-2xl lg:text-3xl font-serif font-bold text-white
                  hover-magnetic transition-all duration-300
                  ${shouldReduceMotion ? '' : 'animate-text-reveal'}
                `}
                onMouseEnter={() => setHover('logo')}
                onMouseLeave={() => setHover(null)}
              >
                <span className="gradient-text bg-gradient-to-r from-primary-400 to-accent-400">
                  Maria Lourdes Mansion
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation with enhanced glass effects */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={navigationLink}
                    initial="rest"
                    animate="rest"
                    transition={{ delay: index * 0.1 }}
                    whileHover={shouldReduceMotion ? {} : "hover"}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={`
                        text-white hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium
                        transition-all duration-300 relative overflow-hidden
                        glass-frosted hover:glass-ultra
                        ${shouldReduceMotion ? '' : 'hover-magnetic'}
                      `}
                    >
                      <span className="relative z-10">{item.label}</span>
                      {!shouldReduceMotion && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20"
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Get Quote Button - Hidden on mobile */}
                <motion.button
                  variants={buttonHover}
                  whileHover={shouldReduceMotion ? {} : "hover"}
                  whileTap={shouldReduceMotion ? {} : "tap"}
                  className="ml-4 px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-accent-600 transition-all duration-300 shadow-lg hover:shadow-xl hidden lg:block"
                >
                  Get Quote
                </motion.button>
              </div>
            </div>

            {/* Mobile menu button with Font Awesome list icon */}
            <div className="md:hidden">
              <motion.button
                variants={buttonHover}
                whileHover={shouldReduceMotion ? {} : "hover"}
                whileTap={shouldReduceMotion ? {} : "tap"}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`
                  glass-liquid p-3 rounded-md text-white hover:text-primary-400
                  focus:outline-none focus:ring-2 focus:ring-primary-500
                  ${shouldReduceMotion ? '' : 'hover-liquid animate-liquid-morph'}
                `}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation with container queries */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="md:hidden container-adaptive"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 glass-ultra rounded-2xl mt-4 border border-white/10">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      variants={{
                        closed: { opacity: 0, x: -20 },
                        open: { 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: index * 0.1 }
                        }
                      }}
                    >
                      <Link
                        href={item.href}
                        className={`
                          text-white hover:text-primary-400 block px-3 py-2 rounded-md text-base font-medium
                          transition-all duration-300 hover:bg-white/10
                          ${shouldReduceMotion ? '' : 'hover-magnetic animate-container-adaptive-fade'}
                        `}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Scroll progress indicator with advanced animation */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500"
          style={{
            scaleX: isScrolled ? 1 : 0,
            transformOrigin: "left",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}

      {/* Floating particles for enhanced visual effect */}
      {!shouldReduceMotion && isScrolled && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`
                absolute w-2 h-2 bg-primary-400/30 rounded-full
                animate-floating-particles
              `}
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      )}
    </motion.header>
  );
};

export default Header;