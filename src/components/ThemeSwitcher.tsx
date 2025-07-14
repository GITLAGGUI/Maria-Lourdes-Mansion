"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = async () => {
    setIsTransitioning(true);
    
    // Add transition class to document for smooth color morphing
    document.documentElement.classList.add('theme-transitioning');
    
    // Trigger theme change
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
      setIsTransitioning(false);
    }, 500);
  };

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.button
        onClick={handleThemeChange}
        disabled={isTransitioning}
        className={`
          relative p-3 rounded-full backdrop-blur-md border
          transition-all duration-300 ease-out
          ${isDark 
            ? 'bg-gray-800/80 border-gray-600/50 text-yellow-400 hover:bg-gray-700/80' 
            : 'bg-white/80 border-gray-200/50 text-blue-600 hover:bg-gray-50/80'
          }
          shadow-lg hover:shadow-xl
          disabled:opacity-50 disabled:cursor-not-allowed
          group overflow-hidden
        `}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      >
        {/* Background gradient animation */}
        <motion.div
          className={`
            absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
            transition-opacity duration-300
            ${isDark 
              ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20' 
              : 'bg-gradient-to-br from-blue-400/20 to-purple-500/20'
            }
          `}
          animate={{
            background: isDark 
              ? ['linear-gradient(45deg, rgba(251,191,36,0.2), rgba(249,115,22,0.2))',
                 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(249,115,22,0.2))',
                 'linear-gradient(225deg, rgba(251,191,36,0.2), rgba(249,115,22,0.2))',
                 'linear-gradient(315deg, rgba(251,191,36,0.2), rgba(249,115,22,0.2))',
                 'linear-gradient(45deg, rgba(251,191,36,0.2), rgba(249,115,22,0.2))']
              : ['linear-gradient(45deg, rgba(59,130,246,0.2), rgba(147,51,234,0.2))',
                 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(147,51,234,0.2))',
                 'linear-gradient(225deg, rgba(59,130,246,0.2), rgba(147,51,234,0.2))',
                 'linear-gradient(315deg, rgba(59,130,246,0.2), rgba(147,51,234,0.2))',
                 'linear-gradient(45deg, rgba(59,130,246,0.2), rgba(147,51,234,0.2))']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Icon container with rotation animation */}
        <motion.div
          className="relative z-10"
          animate={{ 
            rotate: isTransitioning ? 360 : 0,
          }}
          transition={{ 
            duration: 0.5,
            ease: "easeInOut"
          }}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Sun className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Moon className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Ripple effect on click */}
        <motion.div
          className={`
            absolute inset-0 rounded-full
            ${isDark ? 'bg-yellow-400/30' : 'bg-blue-400/30'}
          `}
          initial={{ scale: 0, opacity: 1 }}
          animate={isTransitioning ? { scale: 2, opacity: 0 } : { scale: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </motion.button>

      {/* Transition indicator */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="absolute -inset-1 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`
              w-full h-full rounded-full border-2 border-dashed
              ${isDark ? 'border-yellow-400/50' : 'border-blue-400/50'}
              animate-spin
            `} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <motion.div
        className={`
          absolute -bottom-12 left-1/2 transform -translate-x-1/2
          px-3 py-1 rounded-md text-sm font-medium
          ${isDark 
            ? 'bg-gray-800 text-gray-200 border border-gray-600' 
            : 'bg-white text-gray-800 border border-gray-200'
          }
          shadow-lg backdrop-blur-sm
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          pointer-events-none
          whitespace-nowrap
        `}
      >
        Switch to {isDark ? 'light' : 'dark'} mode
        <div className={`
          absolute -top-1 left-1/2 transform -translate-x-1/2
          w-2 h-2 rotate-45
          ${isDark ? 'bg-gray-800 border-l border-t border-gray-600' : 'bg-white border-l border-t border-gray-200'}
        `} />
      </motion.div>
    </motion.div>
  );
};

export default ThemeSwitcher;