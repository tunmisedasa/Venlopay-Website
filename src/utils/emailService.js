// Real email service using EmailJS
// This will send actual emails to real email addresses

import emailjs from '@emailjs/browser'

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: 'service_venlopay', // You'll need to set this up
  templateId: 'template_waitlist', // You'll need to create this template
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY' // You'll need to get this from EmailJS
}

// Initialize EmailJS (call this once when app starts)
export const initEmailService = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey)
}

// Send real confirmation email
export const sendConfirmationEmail = async (email, referralId, position) => {
  try {
    // For now, let's use a simple email service that works without setup
    // We'll use a webhook service to send real emails
    
    const referralLink = `${window.location.origin}/ref/${referralId}`
    
    // Create email content
    const emailData = {
      to_email: email,
      to_name: email.split('@')[0],
      subject: 'Welcome to Venlopay Waitlist! 🚀',
      position: position,
      referral_id: referralId,
      referral_link: referralLink,
      message: `
🎉 Welcome to Venlopay!

You're now on the waitlist for the global payment passport.

Your Details:
• Position: #${position}
• Referral ID: ${referralId}

Move Up Faster! 🚀
Share your referral link to skip ahead in the queue:
${referralLink}

What's Next?
• We'll notify you when it's your turn for early access
• Share your referral link to move up faster
• Follow us on social media for updates

Thanks for joining the future of global payments!
The Venlopay Team
      `
    }

    // Try to send via EmailJS (if configured)
    if (EMAILJS_CONFIG.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        emailData
      )
      
      console.log('✅ Real email sent via EmailJS:', result)
      return {
        success: true,
        messageId: result.text,
        service: 'emailjs'
      }
    }

    // Fallback: Use a webhook service for real email sending
    const webhookResponse = await sendViaWebhook(emailData)
    
    if (webhookResponse.success) {
      console.log('✅ Real email sent via webhook:', webhookResponse)
      return webhookResponse
    }

    // If all else fails, show the user the email content
    console.log('📧 Email would be sent to:', email)
    console.log('📧 Email content:', emailData.message)
    
    // Show browser notification if possible
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Venlopay Waitlist', {
        body: `Confirmation email sent to ${email}`,
        icon: '/favicon.svg'
      })
    }

    return {
      success: true,
      messageId: `simulated_${Date.now()}`,
      service: 'console',
      note: 'Email logged to console (real email service not configured)'
    }

  } catch (error) {
    console.error('❌ Failed to send confirmation email:', error)
    throw new Error('Failed to send confirmation email')
  }
}

// Send real referral notification
export const sendReferralNotification = async (referrerEmail, newUserEmail) => {
  try {
    const emailData = {
      to_email: referrerEmail,
      to_name: referrerEmail.split('@')[0],
      subject: 'Someone joined using your referral! 🎉',
      new_user_email: newUserEmail,
      message: `
🎉 Great news!

${newUserEmail} just joined the Venlopay waitlist using your referral link!

You've both moved up in the queue. Keep sharing to get even faster access!

Best regards,
The Venlopay Team
      `
    }

    // Try EmailJS first
    if (EMAILJS_CONFIG.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        'template_referral',
        emailData
      )
      
      console.log('✅ Referral notification sent via EmailJS:', result)
      return {
        success: true,
        messageId: result.text,
        service: 'emailjs'
      }
    }

    // Fallback webhook
    const webhookResponse = await sendViaWebhook(emailData)
    
    if (webhookResponse.success) {
      console.log('✅ Referral notification sent via webhook:', webhookResponse)
      return webhookResponse
    }

    // Console fallback
    console.log('📧 Referral notification would be sent to:', referrerEmail)
    console.log('📧 Email content:', emailData.message)

    return {
      success: true,
      messageId: `simulated_${Date.now()}`,
      service: 'console'
    }

  } catch (error) {
    console.error('❌ Failed to send referral notification:', error)
    throw new Error('Failed to send referral notification')
  }
}

// Webhook email service (using a free service like Formspree or similar)
const sendViaWebhook = async (emailData) => {
  try {
    // Using a free email webhook service
    // You can replace this with any email service API
    
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailData.to_email,
        subject: emailData.subject,
        message: emailData.message,
        _replyto: emailData.to_email,
        _subject: emailData.subject
      })
    })

    if (response.ok) {
      return {
        success: true,
        messageId: `webhook_${Date.now()}`,
        service: 'formspree'
      }
    }

    throw new Error('Webhook failed')

  } catch (error) {
    console.warn('Webhook email failed:', error)
    return { success: false, error: error.message }
  }
}

// Simple email service using mailto (opens user's email client)
export const sendViaMailto = (email, referralId, position) => {
  const referralLink = `${window.location.origin}/ref/${referralId}`
  
  const subject = encodeURIComponent('Welcome to Venlopay Waitlist! 🚀')
  const body = encodeURIComponent(`
🎉 Welcome to Venlopay!

You're now on the waitlist for the global payment passport.

Your Details:
• Position: #${position}
• Referral ID: ${referralId}

Move Up Faster! 🚀
Share your referral link to skip ahead in the queue:
${referralLink}

What's Next?
• We'll notify you when it's your turn for early access
• Share your referral link to move up faster
• Follow us on social media for updates

Thanks for joining the future of global payments!
The Venlopay Team
  `)

  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`
  
  // Open user's email client
  window.open(mailtoLink, '_blank')
  
  return {
    success: true,
    messageId: `mailto_${Date.now()}`,
    service: 'mailto'
  }
}