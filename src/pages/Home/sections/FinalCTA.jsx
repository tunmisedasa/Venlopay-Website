import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WaitlistForm from '../../../components/WaitlistForm/WaitlistForm'
import styles from './FinalCTA.module.css'

export default function FinalCTA() {
  const [showForm, setShowForm] = useState(false)
  const tweetText = encodeURIComponent('Just joined the @venlopay waitlist — the Global Payment Passport for everyone. #Venlopay #Web3')

  return (
    <section className={styles.section}>
      <div className={styles.glow} />
      <div className={styles.inner}>
        <motion.span className={styles.tag}
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          GET STARTED
        </motion.span>

        <motion.h2 className={styles.headline}
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.55 }}>
          YOUR GLOBAL PAYMENT<br />PASSPORT STARTS HERE.
        </motion.h2>

        <motion.p className={styles.sub}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}>
          Join the waitlist. Be first to access the platform built to move money without limits.
        </motion.p>

        <motion.div className={styles.actions}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <button className={styles.mainCta} onClick={() => setShowForm(s => !s)}>
            Join The Waitlist
          </button>
          <a href={`https://twitter.com/intent/tweet?text=${tweetText}`}
            target="_blank" rel="noopener noreferrer" className={styles.tweetBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Share on X
          </a>
        </motion.div>

        <AnimatePresence>
          {showForm && (
            <motion.div className={styles.formWrap}
              initial={{ maxHeight: 0, opacity: 0 }} animate={{ maxHeight: 500, opacity: 1 }}
              exit={{ maxHeight: 0, opacity: 0 }} transition={{ duration: 0.35 }}
              style={{ overflow: 'hidden' }}>
              <WaitlistForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
