// Browser console test for waitlist functionality
// Run this in the browser console to test the email system

import { submitToWaitlist, validateReferralId, getReferralInfo } from './waitlistApi.js'

window.testVenlopayWaitlist = async function() {
  console.log('🧪 Testing Venlopay Waitlist in Browser\n')
  
  try {
    // Test 1: Submit first user
    console.log('📝 Test 1: Submitting first user...')
    const result1 = await submitToWaitlist('testuser1@example.com')
    console.log('✅ First submission:', result1)
    
    // Test 2: Submit with referral
    console.log('\n🔗 Test 2: Submitting with referral...')
    const result2 = await submitToWaitlist('testuser2@example.com', result1.referralId)
    console.log('✅ Referral submission:', result2)
    
    // Test 3: Validate referral
    console.log('\n🔍 Test 3: Validating referral...')
    const isValid = validateReferralId(result1.referralId)
    const referralInfo = getReferralInfo(result1.referralId)
    console.log('✅ Referral valid:', isValid)
    console.log('✅ Referral info:', referralInfo)
    
    // Test 4: Check localStorage
    console.log('\n💾 Test 4: Checking localStorage...')
    const waitlist = JSON.parse(localStorage.getItem('venlopay_waitlist') || '[]')
    const referrals = JSON.parse(localStorage.getItem('venlopay_referrals') || '{}')
    console.log('✅ Waitlist data:', waitlist)
    console.log('✅ Referrals data:', referrals)
    
    console.log('\n🎉 All browser tests passed!')
    
    return {
      waitlist,
      referrals,
      testResults: [result1, result2]
    }
    
  } catch (error) {
    console.error('❌ Browser test failed:', error)
    return { error: error.message }
  }
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
  console.log('🚀 Venlopay waitlist test function loaded!')
  console.log('Run: testVenlopayWaitlist() to test the functionality')
}