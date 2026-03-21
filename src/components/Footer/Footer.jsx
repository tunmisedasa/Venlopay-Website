import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaXTwitter, FaLinkedinIn, FaTelegram, FaInstagram } from 'react-icons/fa6'
import styles from './Footer.module.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' } })
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <motion.div
            className={styles.col}
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link to="/" className={styles.logo}>
              <svg width="24" height="18" viewBox="0 0 28 20" fill="none">
                <rect y="0" width="28" height="4" rx="2" fill="#7B4FBF"/>
                <rect y="8" width="28" height="4" rx="2" fill="white"/>
                <rect y="16" width="28" height="4" rx="2" fill="white"/>
              </svg>
              <span className={styles.wordmark}>venlopay</span>
            </Link>
            <p className={styles.tagline}>Your Global Payment Passport</p>
            <div className={styles.socials}>
              <a href="#" aria-label="Twitter/X" className={styles.socialIcon}><FaXTwitter /></a>
              <a href="#" aria-label="LinkedIn" className={styles.socialIcon}><FaLinkedinIn /></a>
              <a href="#" aria-label="Telegram" className={styles.socialIcon}><FaTelegram /></a>
              <a href="#" aria-label="Instagram" className={styles.socialIcon}><FaInstagram /></a>
            </div>
          </motion.div>

          <motion.div className={styles.col} custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className={styles.colLabel}>Products</p>
            <Link to="/global-accounts" className={styles.footerLink}>Global Accounts</Link>
            <Link to="/card" className={styles.footerLink}>Card</Link>
            <Link to="/send" className={styles.footerLink}>Send Money</Link>
            <Link to="/business" className={styles.footerLink}>Business</Link>
          </motion.div>

          <motion.div className={styles.col} custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className={styles.colLabel}>Company</p>
            <a href="#" className={styles.footerLink}>About</a>
            <a href="#" className={styles.footerLink}>Blog</a>
            <a href="#" className={styles.footerLink}>Careers</a>
            <a href="#" className={styles.footerLink}>Media Kit</a>
          </motion.div>

          <motion.div className={styles.col} custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className={styles.colLabel}>Support</p>
            <a href="#" className={styles.footerLink}>FAQ</a>
            <a href="#" className={styles.footerLink}>Contact</a>
            <a href="#" className={styles.footerLink}>Privacy Policy</a>
            <a href="#" className={styles.footerLink}>Terms of Service</a>
          </motion.div>
        </div>

        <div className={styles.disclaimer}>
          Venlopay is a financial technology platform, not a bank. Financial services are provided through licensed and regulated partners. Availability of services may vary by jurisdiction and is subject to regulatory approval.
        </div>

        <div className={styles.bottom}>
          <span className={styles.copy}>© 2025 Venlopay. All rights reserved.</span>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>Privacy Policy</a>
            <a href="#" className={styles.bottomLink}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
