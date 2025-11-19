// 7-Eleven Brand Theme for styled-components
// Version: 2024122001
// This eliminates CSS caching issues completely!

export const theme = {
  colors: {
    // Official 7-Eleven Brand Colors
    primary: {
      viridian: '#007A53',      // Spanish Viridian - Primary green
      red: '#DA291C',           // Maximum Red - Primary red  
      orange: '#FF6720',        // Orange Red - Primary orange
      white: '#FFFFFF'          // Primary white
    },
    
    // Supporting UI Colors
    gray: {
      light: '#F8F9FA',
      medium: '#E9ECEF', 
      dark: '#343A40'
    },
    
    // Semantic Colors
    success: '#007A53',
    danger: '#DA291C',
    warning: '#FF6720',
    info: '#3498db'
  },
  
  shadows: {
    default: '0 2px 8px rgba(218, 41, 28, 0.1)',
    hover: '0 4px 16px rgba(218, 41, 28, 0.15)',
    card: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  
  borderRadius: {
    small: '4px',
    medium: '8px', 
    large: '12px',
    pill: '50px',
    round: '14px',
    button: '20px'
  },
  
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px  
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    xxl: '3rem'      // 48px
  },
  
  typography: {
    fontFamily: "Arial, sans-serif",
    fontSize: {
      xs: '0.65rem',
      sm: '0.7rem', 
      base: '0.75rem',
      md: '0.8rem',
      lg: '0.85rem',
      xl: '0.9rem',
      '2xl': '0.95rem',
      '3xl': '1rem',
      '4xl': '1.25rem',
      '5xl': '1.5rem',
      '6xl': '1.75rem',
      '7xl': '2rem'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },
    lineHeight: {
      tight: 1.3,
      normal: 1.4,
      relaxed: 1.5
    }
  },
  
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease', 
    slow: '0.5s ease'
  },
  
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px'
  },
  
  zIndex: {
    header: 100,
    modal: 1000,
    tooltip: 2000
  }
}

// Helper functions for common styling patterns
export const getColor = (colorPath) => {
  return colorPath.split('.').reduce((obj, key) => obj[key], theme.colors)
}

export const getSpacing = (size) => theme.spacing[size] || size

export const mediaQuery = (breakpoint) => `@media (max-width: ${theme.breakpoints[breakpoint]})`