// Simulated API for waitlist functionality
// In production, this would connect to your actual backend

import { sendRealConfirmationEmail, sendRealReferralNotification, sendAdminNotification } from './realEmailService'
import { getReferralLink } from '../config/production.js'

const STORAGE_KEY = 'venlopay_waitlist'
const REFERRALS_KEY = 'venlopay_referrals'

// Generate a unique referral ID
export const generateReferralId = (email) => {
  const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
  const randomNum = Math.floor(Math.random() * 9000 + 1000)
  return `${username}${randomNum}`
}

// Get stored waitlist data
const getWaitlistData = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

// Get stored referral data
const getReferralData = () => {
  try {
    return JSON.parse(localStorage.getItem(REFERRALS_KEY)) || {}
  } catch {
    return {}
  }
}

// Save waitlist data
const saveWaitlistData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// Save referral data
const saveReferralData = (data) => {
  localStorage.setItem(REFERRALS_KEY, JSON.stringify(data))
}

// Submit to waitlist
export const submitToWaitlist = async (email, referralId = null) => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const waitlist = getWaitlistData()
        const referrals = getReferralData()
        
        // Check if email already exists
        const existingUser = waitlist.find(user => user.email === email)
        if (existingUser) {
          reject(new Error('Email already registered'))
          return
        }

        // Generate new referral ID for this user
        const newReferralId = generateReferralId(email)
        
        // Calculate position (referrals get priority)
        let position = waitlist.length + 1
        if (referralId && referrals[referralId]) {
          // Move up by 10 positions for referrals, but not below 1
          position = Math.max(1, position - 10)
        }
        
        // Create user entry
        const newUser = {
          email,
          referralId: newReferralId,
          referredBy: referralId,
          timestamp: new Date().toISOString(),
          position
        }

        // Add to waitlist
        waitlist.push(newUser)
        saveWaitlistData(waitlist)

        // Update referral counts and send notification
        if (referralId && referrals[referralId]) {
          referrals[referralId].count += 1
          referrals[referralId].referrals.push(email)
          
          // Send notification to referrer
          try {
            await sendRealReferralNotification(referrals[referralId].email, email)
          } catch (emailError) {
            console.warn('Failed to send referral notification:', emailError)
          }
        }

        // Initialize referral tracking for new user
        referrals[newReferralId] = {
          email,
          count: 0,
          referrals: []
        }
        
        saveReferralData(referrals)

        const referralLink = getReferralLink(newReferralId)

        // Send REAL confirmation email to user
        try {
          const emailResult = await sendRealConfirmationEmail(email, newReferralId, position)
          console.log('📧 User confirmation email sent:', emailResult)
        } catch (emailError) {
          console.warn('Failed to send user confirmation email:', emailError)
        }

        // Send admin notification email
        try {
          const adminResult = await sendAdminNotification(email, newReferralId, position, referralId)
          console.log('📧 Admin notification sent:', adminResult)
        } catch (adminError) {
          console.warn('Failed to send admin notification:', adminError)
        }

        resolve({
          success: true,
          referralId: newReferralId,
          position: position,
          referralLink: referralLink
        })
      } catch (error) {
        reject(error)
      }
    }, 1000) // Simulate network delay
  })
}

// Get referral info
export const getReferralInfo = (referralId) => {
  const referrals = getReferralData()
  return referrals[referralId] || null
}

// Validate referral ID
export const validateReferralId = (referralId) => {
  const referrals = getReferralData()
  return !!referrals[referralId]
}

// Get waitlist position
export const getWaitlistPosition = (email) => {
  const waitlist = getWaitlistData()
  const user = waitlist.find(u => u.email === email)
  return user ? user.position : null
}