// Real email service using multiple methods
// This will attempt to send actual emails to real email addresses

import { getCurrentDomain, PRODUCTION_CONFIG } from '../config/production.js'

// Method 1: Using EmailJS (requires free account setup)
const EMAILJS_CONFIG = {
  serviceId: 'service_venlopay',
  templateId: 'template_waitlist', 
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY' // Get from https://emailjs.com
}

// Method 2: Using Netlify Forms (works if deployed on Netlify)
const NETLIFY_FORM_NAME = 'venlopay-waitlist'

// Send real confirmation email
export const sendRealConfirmationEmail = async (email, referralId, position) => {
  const referralLink = `${getCurrentDomain()}/ref/${referralId}`
  
  const emailContent = `🎉 Welcome to Venlopay!

You're now on the waitlist for the global payment passport.

Your Details:
• Position: #${position}
• Referral ID: ${referralId}

Move Up Faster! 🚀
Share your referral link to skip ahead in the queue:
${referralLink}

What's Next:
• We'll notify you when it's your turn for early access
• Share your referral link to move up faster  
• Follow us on social media for updates

Thanks for joining the future of global payments!
The Venlopay Team`

  console.log(`📧 Sending USER confirmation email to: ${email}`)
  
  try {
    // Method 1: Try Formspree for user emails (more reliable for different recipients)
    const formspreeResult = await sendViaFormspreeUser(email, emailContent, 'Welcome to Venlopay Waitlist! 🚀')
    if (formspreeResult.success) {
      console.log('✅ User email sent via Formspree')
      return formspreeResult
    }

    // Method 2: Try Netlify Forms (if available)
    if (window.location.hostname.includes('netlify') || window.location.hostname.includes('venlopay.com')) {
      const result = await sendViaNetlify(email, emailContent, 'Welcome to Venlopay Waitlist! 🚀')
      if (result.success) {
        console.log('✅ User email sent via Netlify Forms')
        return result
      }
    }

    // Method 3: Fallback to mailto (opens email client)
    console.log('📧 Falling back to mailto method for user')
    return openEmailClient(email, emailContent, 'Welcome to Venlopay Waitlist! 🚀')

  } catch (error) {
    console.error('❌ All user email methods failed:', error)
    
    // Show user the email content
    showEmailNotification(email, emailContent)
    
    return {
      success: true,
      messageId: `fallback_${Date.now()}`,
      service: 'notification',
      note: 'Email content shown to user'
    }
  }
}

// Send referral notification
export const sendRealReferralNotification = async (referrerEmail, newUserEmail) => {
  const emailContent = `🎉 Great news!

${newUserEmail} just joined the Venlopay waitlist using your referral link!

You've both moved up in the queue. Keep sharing to get even faster access!

Best regards,
The Venlopay Team`

  console.log(`📧 Sending referral notification to: ${referrerEmail}`)
  
  try {
    // Try the same methods as confirmation email
    const result = await sendViaFormspree(referrerEmail, emailContent, 'Someone joined using your referral! 🎉')
    if (result.success) {
      return result
    }

    // Fallback to console log
    console.log('📧 Referral notification (console):', { to: referrerEmail, content: emailContent })
    return {
      success: true,
      messageId: `console_${Date.now()}`,
      service: 'console'
    }

  } catch (error) {
    console.error('❌ Referral notification failed:', error)
    return { success: false, error: error.message }
  }
}

// Method: Netlify Forms
const sendViaNetlify = async (email, message, subject) => {
  try {
    const formData = new FormData()
    formData.append('form-name', NETLIFY_FORM_NAME)
    formData.append('email', email)
    formData.append('subject', subject)
    formData.append('message', message)

    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })

    if (response.ok) {
      return {
        success: true,
        messageId: `netlify_${Date.now()}`,
        service: 'netlify'
      }
    }
    throw new Error('Netlify form submission failed')
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Method: Formspree (free email service)
const sendViaFormspree = async (email, message, subject) => {
  try {
    // Using a demo Formspree endpoint - replace with your own
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpwaqjqw' // Demo endpoint
    
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        subject: subject,
        message: message,
        _replyto: email,
        _subject: subject
      })
    })

    if (response.ok) {
      return {
        success: true,
        messageId: `formspree_${Date.now()}`,
        service: 'formspree'
      }
    }
    throw new Error('Formspree failed')
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Method: Web3Forms for Admin (works reliably)
const sendViaWeb3FormsAdmin = async (message, subject) => {
  try {
    const WEB3FORMS_KEY = PRODUCTION_CONFIG.EMAIL.WEB3FORMS_API_KEY
    const adminEmail = PRODUCTION_CONFIG.EMAIL.ADMIN_EMAIL
    
    const formData = new FormData()
    formData.append('access_key', WEB3FORMS_KEY)
    formData.append('name', 'Venlopay System')
    formData.append('email', adminEmail)
    formData.append('subject', subject)
    formData.append('message', message)
    formData.append('from_name', 'Venlopay System')

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })

    const result = await response.json()
    
    if (result.success) {
      return {
        success: true,
        messageId: result.message,
        service: 'web3forms-admin'
      }
    }
    throw new Error('Web3Forms Admin failed: ' + (result.message || 'Unknown error'))
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Method: Alternative email service for users (Formspree)
const sendViaFormspreeUser = async (email, message, subject) => {
  try {
    // Using Formspree for user emails
    const response = await fetch(PRODUCTION_CONFIG.EMAIL.FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        subject: subject,
        message: message,
        _replyto: email,
        _subject: subject
      })
    })

    if (response.ok) {
      return {
        success: true,
        messageId: `formspree_user_${Date.now()}`,
        service: 'formspree-user'
      }
    }
    throw new Error('Formspree User failed')
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Method: Open email client (mailto)
const openEmailClient = (email, message, subject) => {
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
  
  // Try to open email client
  const link = document.createElement('a')
  link.href = mailtoLink
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // Show confirmation to user
  showEmailNotification(email, message, true)
  
  return {
    success: true,
    messageId: `mailto_${Date.now()}`,
    service: 'mailto'
  }
}

// Show email notification to user
const showEmailNotification = (email, content, isMailto = false) => {
  // Create notification
  const notification = document.createElement('div')
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #7B4FBF, #9B6FDF);
    color: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    z-index: 10000;
    max-width: 400px;
    font-family: Arial, sans-serif;
    animation: slideIn 0.3s ease-out;
  `
  
  notification.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
      <h3 style="margin: 0; font-size: 16px;">📧 ${isMailto ? 'Email Client Opened' : 'Email Ready'}</h3>
      <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; padding: 0; margin-left: 10px;">&times;</button>
    </div>
    <p style="margin: 0 0 10px 0; font-size: 14px; opacity: 0.9;">
      ${isMailto ? `Email client opened for: ${email}` : `Email would be sent to: ${email}`}
    </p>
    <div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 6px; font-size: 12px; max-height: 100px; overflow-y: auto; white-space: pre-line;">
      ${content.substring(0, 200)}${content.length > 200 ? '...' : ''}
    </div>
    ${!isMailto ? `<button onclick="openEmailClientFromNotification('${email}', \`${content.replace(/`/g, '\\`')}\`)" style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 8px 16px; border-radius: 6px; cursor: pointer; margin-top: 10px; font-size: 12px;">Open Email Client</button>` : ''}
  `
  
  // Add CSS animation
  const style = document.createElement('style')
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `
  document.head.appendChild(style)
  
  document.body.appendChild(notification)
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 10000)
}

// Global function for opening email client from notification
window.openEmailClientFromNotification = (email, content) => {
  openEmailClient(email, content, 'Welcome to Venlopay Waitlist! 🚀')
}

// Test function
export const testRealEmail = async (testEmail = "emmanuelogheneovo17@gmail.com") => {
  console.log('🧪 Testing real email to:', testEmail)
  
  try {
    const result = await sendRealConfirmationEmail(testEmail, 'test1234', 1)
    console.log('✅ Test email result:', result)
    return result
  } catch (error) {
    console.error('❌ Test email failed:', error)
    return { success: false, error: error.message }
  }
}

// Send admin notification when someone joins waitlist
export const sendAdminNotification = async (userEmail, referralId, position, referredBy = null) => {
  const adminEmail = PRODUCTION_CONFIG.EMAIL.ADMIN_EMAIL // Your admin email
  
  const emailContent = `🚨 New Waitlist Signup!

A new user has joined the Venlopay waitlist:

User Details:
• Email: ${userEmail}
• Position: #${position}
• Referral ID: ${referralId}
• Referred by: ${referredBy || 'Direct signup'}
• Time: ${new Date().toLocaleString()}

Referral Link: ${getCurrentDomain()}/ref/${referralId}

Total waitlist members: ${position}

Admin Dashboard: https://www.venlopay.com/admin (when available)

Best regards,
Venlopay System`

  console.log(`📧 Sending ADMIN notification to: ${adminEmail}`)
  
  try {
    // Use Web3Forms for admin emails (configured for your email)
    const result = await sendViaWeb3FormsAdmin(emailContent, `New Waitlist Signup: ${userEmail}`)
    if (result.success) {
      console.log('✅ Admin notification sent successfully via Web3Forms')
      return result
    }

    // Fallback
    console.log('📧 Admin notification (console):', { to: adminEmail, content: emailContent })
    return {
      success: true,
      messageId: `admin_console_${Date.now()}`,
      service: 'console'
    }

  } catch (error) {
    console.error('❌ Admin notification failed:', error)
    return { success: false, error: error.message }
  }
}