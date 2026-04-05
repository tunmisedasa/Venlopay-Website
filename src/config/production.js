// Production configuration for Venlopay
// Update these values for your live deployment

export const PRODUCTION_CONFIG = {
  // Domain configuration
  DOMAIN: 'https://www.venlopay.com',
  
  // Email service configuration
  EMAIL: {
    WEB3FORMS_API_KEY: '4512abe2-60cc-4364-94fd-7273e9f4022b',
    ADMIN_EMAIL: 'emmanuelogheneovo17@gmail.com',
    FORMSPREE_ENDPOINT: 'https://formspree.io/f/xpwaqjqw', // You may want to create a new one for production
  },
  
  // Analytics (add when ready)
  ANALYTICS: {
    GOOGLE_ANALYTICS_ID: '', // Add your GA4 ID
    FACEBOOK_PIXEL_ID: '', // Add if using Facebook ads
  },
  
  // Feature flags
  FEATURES: {
    REFERRAL_SYSTEM: true,
    EMAIL_NOTIFICATIONS: true,
    ANALYTICS_TRACKING: false, // Enable when analytics are configured
  },
  
  // Rate limiting (for production)
  RATE_LIMITS: {
    WAITLIST_SUBMISSIONS_PER_HOUR: 5, // Prevent spam
    REFERRAL_CHECKS_PER_MINUTE: 10,
  },
  
  // Social media links (update when ready)
  SOCIAL: {
    TWITTER: 'https://twitter.com/venlopay',
    LINKEDIN: 'https://linkedin.com/company/venlopay',
    DISCORD: '', // Add if you create a Discord
  }
}

// Environment detection
export const IS_PRODUCTION = window.location.hostname === 'www.venlopay.com' || 
                            window.location.hostname === 'venlopay.com' ||
                            window.location.hostname.includes('vercel.app')
export const IS_DEVELOPMENT = window.location.hostname === 'localhost'

// Get the appropriate domain for the current environment
export const getCurrentDomain = () => {
  if (window.location.hostname === 'www.venlopay.com' || window.location.hostname === 'venlopay.com') {
    return PRODUCTION_CONFIG.DOMAIN
  }
  return window.location.origin
}

// Get referral link for current environment
export const getReferralLink = (referralId) => {
  return `${getCurrentDomain()}/ref/${referralId}`
}