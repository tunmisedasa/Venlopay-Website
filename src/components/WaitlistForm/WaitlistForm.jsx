import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitToWaitlist } from '../../utils/waitlistApi'
import { useReferral } from '../../hooks/useReferral'
import styles from './WaitlistForm.module.css'

export default function WaitlistForm({ onSuccess, alreadySubmitted }) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(alreadySubmitted || false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [result, setResult] = useState(null)
  
  const { referralId, isValidReferral } = useReferral()

  useEffect(() => {
    // Clear any previous errors when email changes
    if (error) setError('')
  }, [email])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    setError('')

    try {
      const response = await submitToWaitlist(
        email, 
        isValidReferral ? referralId : null
      )
      
      setResult(response)
      setSubmitted(true)
      if (onSuccess) onSuccess(response)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopy = () => {
    if (result?.referralLink) {
      navigator.clipboard.writeText(result.referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const tweetText = encodeURIComponent(
    `Just joined the @venlopay waitlist — the Global Payment Passport for everyone. Join me: ${result?.referralLink || ''} #Venlopay #Web3`
  )

  return (
    <AnimatePresence mode="wait">
      {!submitted ? (
        <motion.form
          key="form"
          className={styles.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {isValidReferral && (
            <motion.div 
              className={styles.referralNotice}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <span className={styles.referralIcon}>🎉</span>
              <span>You're using a referral link! You'll get priority access.</span>
            </motion.div>
          )}
          
          <input
            type="email"
            className={styles.input}
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            aria-label="Email address"
          />
          
          {error && (
            <motion.div 
              className={styles.error}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}
          
          <button 
            type="submit" 
            className={`${styles.submitBtn} ${isSubmitting ? styles.submitting : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={styles.spinner} />
                Joining...
              </>
            ) : (
              'Join The Waitlist'
            )}
          </button>
        </motion.form>
      ) : (
        <motion.div
          key="success"
          className={styles.success}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.checkIcon}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="19" stroke="#7B4FBF" strokeWidth="2"/>
              <path d="M12 20l6 6 10-12" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h3 className={styles.successTitle}>You're on the list!</h3>
          
          <div className={styles.positionInfo}>
            <span className={styles.positionLabel}>Your position:</span>
            <span className={styles.positionNumber}>#{result?.position || '---'}</span>
          </div>
          
          <p className={styles.successSub}>
            Check your email for confirmation. Share your referral link to move up the queue faster!
          </p>
          
          {result?.referralLink && (
            <>
              <div className={styles.referralBox}>
                <span className={styles.referralLink}>{result.referralLink}</span>
                <button 
                  className={`${styles.copyBtn} ${copied ? styles.copied : ''}`} 
                  onClick={handleCopy} 
                  type="button"
                >
                  {copied ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
              
              <a
                href={`https://twitter.com/intent/tweet?text=${tweetText}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.tweetBtn}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Share on X
              </a>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
