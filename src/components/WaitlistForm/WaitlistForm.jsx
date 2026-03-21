import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './WaitlistForm.module.css'

export default function WaitlistForm({ onSuccess, alreadySubmitted }) {
  const [email, setEmail] = useState('')
  const [hasReferral, setHasReferral] = useState(false)
  const [referralId, setReferralId] = useState('')
  const [submitted, setSubmitted] = useState(alreadySubmitted || false)
  const [copied, setCopied] = useState(false)
  const referralLink = `https://venlopay.com/ref/${email.split('@')[0] || 'user'}${Math.floor(Math.random() * 9000 + 1000)}`

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    if (onSuccess) onSuccess()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tweetText = encodeURIComponent(`Just joined the @venlopay waitlist — the Global Payment Passport for everyone. Join me: ${referralLink} #Venlopay #Web3`)

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
          <input
            type="email"
            className={styles.input}
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            aria-label="Email address"
          />
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={hasReferral}
              onChange={e => setHasReferral(e.target.checked)}
            />
            <span>I have a referral ID</span>
          </label>
          <AnimatePresence>
            {hasReferral && (
              <motion.div
                initial={{ maxHeight: 0, opacity: 0 }}
                animate={{ maxHeight: 80, opacity: 1 }}
                exit={{ maxHeight: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Enter referral ID"
                  value={referralId}
                  onChange={e => setReferralId(e.target.value)}
                  aria-label="Referral ID"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <button type="submit" className={styles.submitBtn}>Join The Waitlist</button>
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
          <h3 className={styles.successTitle}>You're on the list.</h3>
          <p className={styles.successSub}>Share your referral link and move up the queue.</p>
          <div className={styles.referralBox}>
            <span className={styles.referralLink}>{referralLink}</span>
            <button className={`${styles.copyBtn} ${copied ? styles.copied : ''}`} onClick={handleCopy} type="button">
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <a
            href={`https://twitter.com/intent/tweet?text=${tweetText}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.tweetBtn}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Share on X
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
