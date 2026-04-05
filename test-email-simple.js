// Simple test for email functionality without ES modules

// Mock email service
const sendConfirmationEmail = async (email, referralId, position) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const referralLink = `http://localhost:5173/ref/${referralId}`
  
  const emailContent = {
    to: email,
    subject: "Welcome to Venlopay Waitlist! 🚀",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #7B4FBF, #9B6FDF); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Venlopay!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
            You're now on the waitlist for the global payment passport
          </p>
        </div>
        
        <div style="padding: 30px 20px; background: #f8f9fa;">
          <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
            <h2 style="color: #333; margin: 0 0 15px 0;">Your Waitlist Details</h2>
            <p style="margin: 8px 0; color: #666;">
              <strong>Position:</strong> #${position}
            </p>
            <p style="margin: 8px 0; color: #666;">
              <strong>Referral ID:</strong> ${referralId}
            </p>
          </div>
          
          <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
            <h3 style="color: #333; margin: 0 0 15px 0;">Move Up Faster! 🚀</h3>
            <p style="color: #666; margin-bottom: 15px;">
              Share your referral link and skip ahead in the queue for every person who joins:
            </p>
            <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 14px; word-break: break-all;">
              ${referralLink}
            </div>
          </div>
        </div>
      </div>
    `
  }
  
  console.log('📧 Confirmation email sent:', {
    to: emailContent.to,
    subject: emailContent.subject,
    referralLink: referralLink
  })
  
  return {
    success: true,
    messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}

const sendReferralNotification = async (referrerEmail, newUserEmail) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const emailContent = {
    to: referrerEmail,
    subject: "Someone joined using your referral! 🎉",
    html: `Great news! ${newUserEmail} just joined using your referral link!`
  }
  
  console.log('📧 Referral notification sent:', emailContent)
  
  return {
    success: true,
    messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}

// Mock waitlist API
const generateReferralId = (email) => {
  const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
  const randomNum = Math.floor(Math.random() * 9000 + 1000)
  return `${username}${randomNum}`
}

let mockWaitlist = []
let mockReferrals = {}

const submitToWaitlist = async (email, referralId = null) => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        // Check if email already exists
        const existingUser = mockWaitlist.find(user => user.email === email)
        if (existingUser) {
          reject(new Error('Email already registered'))
          return
        }

        // Generate new referral ID for this user
        const newReferralId = generateReferralId(email)
        
        // Calculate position (referrals get priority)
        let position = mockWaitlist.length + 1
        if (referralId && mockReferrals[referralId]) {
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
        mockWaitlist.push(newUser)

        // Update referral counts and send notification
        if (referralId && mockReferrals[referralId]) {
          mockReferrals[referralId].count += 1
          mockReferrals[referralId].referrals.push(email)
          
          // Send notification to referrer
          try {
            await sendReferralNotification(mockReferrals[referralId].email, email)
          } catch (emailError) {
            console.warn('Failed to send referral notification:', emailError)
          }
        }

        // Initialize referral tracking for new user
        mockReferrals[newReferralId] = {
          email,
          count: 0,
          referrals: []
        }

        const referralLink = `http://localhost:5173/ref/${newReferralId}`

        // Send confirmation email
        try {
          await sendConfirmationEmail(email, newReferralId, position)
        } catch (emailError) {
          console.warn('Failed to send confirmation email:', emailError)
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
    }, 1000)
  })
}

// Test function
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
    
    // Test 4: Check referral tracking
    console.log('🔍 Test 4: Testing referral tracking...')
    
    console.log('✅ Referral tracking for first user:', mockReferrals[referralId])
    console.log('✅ Total waitlist entries:', mockWaitlist.length)
    console.log('✅ Waitlist data:', mockWaitlist.map(u => ({ email: u.email, position: u.position, referredBy: u.referredBy })))
    
    console.log('\n' + '='.repeat(50) + '\n')
    
    // Test 5: Error handling
    console.log('❌ Test 5: Testing error handling...')
    
    try {
      await submitToWaitlist('user1@example.com') // Duplicate email
    } catch (error) {
      console.log('✅ Duplicate email error handled:', error.message)
    }
    
    console.log('\n' + '🎉 All tests completed successfully! 🎉')
    
  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

// Run the tests
testEmailFunctionality()