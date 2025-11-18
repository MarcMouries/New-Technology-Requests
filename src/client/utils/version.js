/*
 * Cache-Busting Version Utility
 * Used to ensure latest files are always loaded
 */

// Current version timestamp - update this when making changes
export const APP_VERSION = '2024122001'

// Generate cache-busting URL parameters
export const getCacheBustedUrl = (url) => {
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}v=${APP_VERSION}&t=${Date.now()}`
}

// Get version info for debugging
export const getVersionInfo = () => ({
  version: APP_VERSION,
  timestamp: new Date().toISOString(),
  userAgent: navigator.userAgent,
  buildTime: '2024-12-20T00:00:00Z'
})

// Add version to console for debugging
console.log('🏗️ New Technology Request App Version:', APP_VERSION)
console.log('📅 Build Time: 2024-12-20')
console.log('🔄 Cache-busting enabled')