export const textVariant = (delay: number) => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay: delay,
      },
    },
  };
};
// Phase 2: Advanced Modern Animations

// Sophisticated Micro-Interactions
export const buttonHover = {
  rest: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      type: "tween",
      ease: "easeInOut"
    }
  },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      duration: 0.2,
      type: "tween",
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: {
      duration: 0.1,
      type: "tween",
      ease: "easeInOut"
    }
  }
};

export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    transition: {
      duration: 0.3,
      type: "tween",
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    y: -8,
    rotateX: 5,
    rotateY: 5,
    transition: {
      duration: 0.3,
      type: "tween",
      ease: "easeOut"
    }
  }
};

export const navigationLink = {
  rest: {
    scale: 1,
    opacity: 0.8,
    transition: {
      duration: 0.2,
      type: "tween",
      ease: "easeInOut"
    }
  },
  hover: {
    scale: 1.1,
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "tween",
      ease: "easeInOut"
    }
  }
};

export const formInput = {
  rest: {
    scale: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    transition: {
      duration: 0.2,
      type: "tween",
      ease: "easeInOut"
    }
  },
  focus: {
    scale: 1.02,
    borderColor: "rgba(245, 158, 11, 0.8)",
    transition: {
      duration: 0.2,
      type: "tween",
      ease: "easeInOut"
    }
  }
};

// Advanced Loading States
export const shimmerEffect = {
  initial: {
    backgroundPosition: "-200px 0"
  },
  animate: {
    backgroundPosition: "calc(200px + 100%) 0",
    transition: {
      duration: 1.5,
      ease: "linear",
      repeat: Infinity
    }
  }
};

export const skeletonPulse = {
  initial: {
    opacity: 0.6
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
};

export const progressiveImageLoad = {
  blur: {
    filter: "blur(10px)",
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  sharp: {
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const contentReveal = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Enhanced Scroll-Triggered Animations
export const scrollReveal = (delay = 0) => ({
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: "easeOut"
    }
  }
});

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const parallaxVariant = (offset = 50) => ({
  initial: {
    y: 0
  },
  animate: (scrollY: number) => ({
    y: scrollY * offset,
    transition: {
      type: "tween",
      ease: "linear"
    }
  })
});

export const scaleOnScroll = {
  initial: {
    scale: 0.8,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Advanced Animation Orchestration
export const sequentialReveal = {
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  },
  item: {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }
};

export const morphingButton = {
  initial: {
    borderRadius: "8px",
    backgroundColor: "rgba(245, 158, 11, 0.8)"
  },
  loading: {
    borderRadius: "50%",
    backgroundColor: "rgba(245, 158, 11, 0.6)",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  success: {
    borderRadius: "8px",
    backgroundColor: "rgba(34, 197, 94, 0.8)",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

export const floatingElement = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

// Performance-Optimized Variants
export const gpuAccelerated = {
  transform: "translate3d(0, 0, 0)",
  willChange: "transform, opacity"
};

export const smoothTransition = {
  transition: {
    type: "tween",
    ease: [0.25, 0.1, 0.25, 1],
    duration: 0.3
  }
};

export const fadeIn = (direction: string, type: string, delay: number, duration: number) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

export const slideIn = (direction: string, type: string, delay: number, duration: number) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

// Phase 3: Advanced Container Query Animations
export const containerResponsiveScale = (breakpoint = 300) => ({
  initial: {
    scale: 1,
    opacity: 0.8
  },
  animate: {
    scale: 1.05,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
});

export const containerAdaptiveText = {
  initial: {
    fontSize: "1rem",
    lineHeight: 1.5
  },
  animate: {
    fontSize: "clamp(1rem, 4cqw, 2rem)",
    lineHeight: "clamp(1.5, 1.2 + 0.5cqw, 1.8)",
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const containerParallax = (scrollFactor = 1) => ({
  animate: (scrollY: number) => ({
    y: scrollY * scrollFactor * 0.1,
    transition: {
      type: "tween",
      ease: "linear"
    }
  })
});

// Advanced CSS Custom Property Animations
export const dynamicColorMorph = {
  initial: {
    background: "hsl(220, 70%, 50%)"
  },
  animate: {
    background: [
      "hsl(220, 70%, 50%)",
      "hsl(300, 85%, 60%)",
      "hsl(120, 75%, 55%)",
      "hsl(220, 70%, 50%)"
    ],
    transition: {
      duration: 10,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

export const gradientAngleRotation = {
  initial: {
    backgroundImage: "linear-gradient(0deg, #667eea, #764ba2)"
  },
  animate: {
    backgroundImage: [
      "linear-gradient(0deg, #667eea, #764ba2)",
      "linear-gradient(90deg, #667eea, #764ba2)",
      "linear-gradient(180deg, #667eea, #764ba2)",
      "linear-gradient(270deg, #667eea, #764ba2)",
      "linear-gradient(360deg, #667eea, #764ba2)"
    ],
    transition: {
      duration: 12,
      ease: "linear",
      repeat: Infinity
    }
  }
};

export const dynamicBlurFocus = {
  initial: {
    filter: "blur(0px)"
  },
  animate: {
    filter: ["blur(0px)", "blur(20px)", "blur(0px)"],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

// Enhanced Glass Morphism Effects
export const glassReflectionSweep = {
  initial: {
    backgroundPosition: "-200% 0",
    opacity: 0
  },
  animate: {
    backgroundPosition: ["-200% 0", "0% 0", "200% 0"],
    opacity: [0, 1, 0],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

export const glassDepthShift = {
  initial: {
    backdropFilter: "blur(10px) brightness(1.1)",
    borderColor: "rgba(255, 255, 255, 0.2)"
  },
  animate: {
    backdropFilter: [
      "blur(10px) brightness(1.1)",
      "blur(20px) brightness(1.3)",
      "blur(10px) brightness(1.1)"
    ],
    borderColor: [
      "rgba(255, 255, 255, 0.2)",
      "rgba(255, 255, 255, 0.4)",
      "rgba(255, 255, 255, 0.2)"
    ],
    transition: {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

export const gradientMeshMorph = {
  initial: {
    background: `
      radial-gradient(circle at 20% 80%, #667eea 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, #764ba2 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, #f093fb 0%, transparent 50%)
    `
  },
  animate: {
    background: [
      `radial-gradient(circle at 20% 80%, #667eea 0%, transparent 50%),
       radial-gradient(circle at 80% 20%, #764ba2 0%, transparent 50%),
       radial-gradient(circle at 40% 40%, #f093fb 0%, transparent 50%)`,
      `radial-gradient(circle at 60% 20%, #667eea 0%, transparent 50%),
       radial-gradient(circle at 20% 60%, #764ba2 0%, transparent 50%),
       radial-gradient(circle at 80% 80%, #f093fb 0%, transparent 50%)`,
      `radial-gradient(circle at 80% 80%, #667eea 0%, transparent 50%),
       radial-gradient(circle at 40% 20%, #764ba2 0%, transparent 50%),
       radial-gradient(circle at 20% 60%, #f093fb 0%, transparent 50%)`,
      `radial-gradient(circle at 20% 80%, #667eea 0%, transparent 50%),
       radial-gradient(circle at 80% 20%, #764ba2 0%, transparent 50%),
       radial-gradient(circle at 40% 40%, #f093fb 0%, transparent 50%)`
    ],
    transition: {
      duration: 15,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

// Performance-Optimized Animation Variants
export const performanceOptimized = {
  transform: "translate3d(0, 0, 0)",
  willChange: "transform, opacity",
  backfaceVisibility: "hidden" as const,
  perspective: 1000
};

export const containerQuerySupport = {
  containerType: "inline-size",
  containerName: "responsive"
};

// Advanced Motion Path Animations
export const motionPathCircle = {
  initial: {
    offsetDistance: "0%"
  },
  animate: {
    offsetDistance: "100%",
    transition: {
      duration: 8,
      ease: "linear",
      repeat: Infinity
    }
  }
};

export const motionPathWave = {
  initial: {
    offsetDistance: "0%",
    rotate: 0
  },
  animate: {
    offsetDistance: "100%",
    rotate: 360,
    transition: {
      duration: 10,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};