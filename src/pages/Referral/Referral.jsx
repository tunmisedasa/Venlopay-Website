import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { validateReferralId, getReferralInfo } from '../../utils/waitlistApi'
import WaitlistForm from '../../components/WaitlistForm/WaitlistForm'
import styles from './Referral.module.css'

export default function Referral() {
  const { referralId } = useParams()
  const [isValid, setIsValid] = useState(null)
  const [referrerInfo, setReferrerInfo] = useState(null)

  useEffect(() => {
    if (referralId) {
      const valid = validateReferralId(referralId)
      setIsValid(valid)
      
      if (valid) {
        const info = getReferralInfo(referralId)
        setReferrerInfo(info)
        // Store referral ID for the form
        sessionStorage.setItem('referralId', referralId)
      }
    }
  }, [referralId])

  // If invalid referral, redirect to home
  if (isValid === false) {
    return <Navigate to="/" replace />
  }

  // Loading state
  if (isValid === null) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Validating referral link...</p>
      </div>
    )
  }

  return (
    <motion.div 
      className={styles.page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.div 
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            🎉 Referral Invitation
          </motion.div>
          
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            You've been invited to join Venlopay
          </motion.h1>
          
          {referrerInfo && (
            <motion.p 
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className={styles.referrerEmail}>{referrerInfo.email}</span> invited you to get priority access to the global payment passport.
            </motion.p>
          )}
        </div>

        <motion.div 
          className={styles.benefits}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className={styles.benefitsTitle}>Your referral benefits:</h3>
          <div className={styles.benefitsList}>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>⚡</span>
              <span>Priority access to Venlopay</span>
            </div>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>🚀</span>
              <span>Skip ahead in the waitlist</span>
            </div>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>🎁</span>
              <span>Exclusive early adopter perks</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={styles.formSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <WaitlistForm />
        </motion.div>

        <motion.div 
          className={styles.footer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className={styles.footerText}>
            Join thousands of others building the future of global payments
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}