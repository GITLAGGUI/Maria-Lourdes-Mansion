import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom color palette for luxury hotel
        primary: {
          50: '#fef7ee',
          100: '#fdedd3',
          200: '#fad7a5',
          300: '#f6ba6d',
          400: '#f19333',
          500: '#ed7611',
          600: '#de5a07',
          700: '#b84208',
          800: '#93350e',
          900: '#772c0f',
          950: '#411405',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        // Phase 3: Advanced Modern Animations
        'morphing-gradient': 'morphing-gradient 10s linear infinite',
        'elastic-scale': 'elastic-scale 2s ease-in-out infinite',
        'dynamic-blur': 'dynamic-blur 4s ease-in-out infinite',
        'color-cycle': 'color-cycle 5s linear infinite',
        'liquid-morph': 'liquid-morph 8s ease-in-out infinite',
        'floating-particles': 'floating-particles 6s ease-in-out infinite',
        'text-reveal': 'text-reveal 1s ease-out',
        'glass-reflection': 'glass-reflection 3s ease-in-out infinite',
        'magnetic-hover': 'magnetic-hover 0.6s ease-in-out',
        'container-responsive-scale': 'container-responsive-scale 0.3s ease-out',
        'container-adaptive-fade': 'container-adaptive-fade 0.5s ease-out',
        // Phase 3: Advanced Modern Animations with Custom Properties
        'dynamic-hue-shift': 'dynamic-hue-shift 8s linear infinite',
        'color-morph': 'color-morph 10s ease-in-out infinite',
        'gradient-angle-rotation': 'gradient-angle-rotation 12s linear infinite',
        'gradient-position-shift': 'gradient-position-shift 6s ease-in-out infinite',
        'dynamic-scale-pulse': 'dynamic-scale-pulse 3s ease-in-out infinite',
        'dynamic-rotation': 'dynamic-rotation 15s linear infinite',
        'dynamic-blur-focus': 'dynamic-blur-focus 4s ease-in-out infinite',
        'motion-path-circle': 'motion-path-circle 8s linear infinite',
        'motion-path-wave': 'motion-path-wave 10s ease-in-out infinite',
        'glass-reflection-sweep': 'glass-reflection-sweep 3s ease-in-out infinite',
        'glass-depth-shift': 'glass-depth-shift 5s ease-in-out infinite',
        'gradient-mesh-morph': 'gradient-mesh-morph 15s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center bottom'
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': 'right center'
          },
        },
        // Phase 3: Advanced Modern Animation Keyframes
        'morphing-gradient': {
          '0%': {
            'background': 'conic-gradient(from 0deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea)',
          },
          '100%': {
            'background': 'conic-gradient(from 360deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea)',
          },
        },
        'elastic-scale': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        'dynamic-blur': {
          '0%': { backdropFilter: 'blur(0px)' },
          '50%': { backdropFilter: 'blur(20px)' },
          '100%': { backdropFilter: 'blur(10px)' },
        },
        'color-cycle': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        'liquid-morph': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        'floating-particles': {
          '0%, 100%': { 
            transform: 'translate3d(0, 0, 0) rotate(0deg)',
            opacity: '0.7'
          },
          '33%': { 
            transform: 'translate3d(30px, -30px, 0) rotate(120deg)',
            opacity: '1'
          },
          '66%': { 
            transform: 'translate3d(-20px, 20px, 0) rotate(240deg)',
            opacity: '0.8'
          },
        },
        'text-reveal': {
          '0%': { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
          '100%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
        },
        'glass-reflection': {
          '0%': { 
            transform: 'translateX(-100%) skewX(-15deg)',
            opacity: '0'
          },
          '50%': { opacity: '1' },
          '100%': { 
            transform: 'translateX(100%) skewX(-15deg)',
            opacity: '0'
          },
        },
        'magnetic-hover': {
          '0%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(-2px, -2px, 0) scale(1.02)' },
          '100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
        },
        'container-responsive-scale': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        'container-adaptive-fade': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        // Phase 3: Advanced Animation Keyframes with Custom Properties
        'dynamic-hue-shift': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        'color-morph': {
          '0%': { background: 'hsl(220, 70%, 50%)' },
          '33%': { background: 'hsl(300, 85%, 60%)' },
          '66%': { background: 'hsl(120, 75%, 55%)' },
          '100%': { background: 'hsl(220, 70%, 50%)' },
        },
        'gradient-angle-rotation': {
          '0%': { backgroundImage: 'linear-gradient(0deg, #667eea, #764ba2)' },
          '100%': { backgroundImage: 'linear-gradient(360deg, #667eea, #764ba2)' },
        },
        'dynamic-scale-pulse': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        'dynamic-rotation': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'dynamic-blur-focus': {
          '0%': { filter: 'blur(0px)' },
          '50%': { filter: 'blur(20px)' },
          '100%': { filter: 'blur(0px)' },
        },
        'glass-reflection-sweep': {
          '0%': { backgroundPosition: '-200% 0', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { backgroundPosition: '200% 0', opacity: '0' },
        },
        'glass-depth-shift': {
          '0%': { 
            backdropFilter: 'blur(10px) brightness(1.1)',
            borderColor: 'rgba(255, 255, 255, 0.2)'
          },
          '50%': { 
            backdropFilter: 'blur(20px) brightness(1.3)',
            borderColor: 'rgba(255, 255, 255, 0.4)'
          },
          '100%': { 
            backdropFilter: 'blur(10px) brightness(1.1)',
            borderColor: 'rgba(255, 255, 255, 0.2)'
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'neumorphism-light': '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
        'neumorphism-dark': '20px 20px 60px #1a1a1a, -20px -20px 60px #2e2e2e',
        'glow-sm': '0 0 10px rgba(59, 130, 246, 0.5)',
        'glow-md': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-lg': '0 0 30px rgba(59, 130, 246, 0.5)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
}

export default config