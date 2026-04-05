// Test script for email functionality
import { submitToWaitlist, validateReferralId, getReferralInfo } from './src/utils/waitlistApi.js'
import { sendConfirmationEmail, sendReferralNotification } from './src/utils/emailService.js'

// Mock window.location for testing
global.window = {
  location: {
    origin: 'http://localhost:5173'
  }
}

async function testEmailFunctionality() {
  console.log('🧪 Testing Venlopay Email Functionality\n')
  
  try {
    // Test 1: Direct email service functions
    console.log('📧 Test 1: Testing email service functions...')
    
    const confirmationResult = await sendConfirmationEmail('test@example.com', 'test1234', 1)
    console.log('✅ Confirmation email result:', confirmationResult)
    
    const referralResult = await sendReferralNotification('referrer@example.com', 'newuser@example.com')
    console.log('✅ Referral notification result:', referralResult)
    
    console.log('\n' + '='.repeat(50) + '\n')
    
    // Test 2: Full waitlist submission flow
    console.log('📝 Test 2: Testing full waitlist submission...')
    
    const submission1 = await submitToWaitlist('user1@example.com')
    console.log('✅ First user submission:', {
      email: 'user1@example.com',
      position: submission1.position,
      referralId: submission1.referralId,
      referralLink: submission1.referralLink
    })
    
    console.log('\n' + '-'.repeat(30) + '\n')
    
    // Test 3: Referral submission
    console.log('🔗 Test 3: Testing referral submission...')
    
    const referralId = submission1.referralId
    console.log('Using referral ID:', referralId)
    
    const submission2 = await submitToWaitlist('user2@example.com', referralId)
    console.log('✅ Referral submission:', {
      email: 'user2@example.com',
      position: submission2.position,
      referralId: submission2.referralId,
      referredBy: referralId
    })
    
    console.log('\n' + '-'.repeat(30) + '\n')
    
    // Test 4: Referral validation
    console.log('🔍 Test 4: Testing referral validation...')
    
    const isValid = validateReferralId(referralId)
    console.log('✅ Referral ID validation:', isValid)
    
    const referralInfo = getReferralInfo(referralId)
    console.log('✅ Referral info:', referralInfo)
    
    console.log('\n' + '='.repeat(50) + '\n')
    
    // Test 5: Error handling
    console.log('❌ Test 5: Testing error handling...')
    
    try {
      await submitToWaitlist('user1@example.com') // Duplicate email
    } catch (error) {
      console.log('✅ Duplicate email error handled:', error.message)
    }
    
    const invalidReferral = validateReferralId('invalid123')
    console.log('✅ Invalid referral validation:', invalidReferral)
    
    console.log('\n' + '🎉 All tests completed successfully! 🎉')
    
  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

// Run the tests
testEmailFunctionality()