import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (p) => location.pathname === p

  const links = [
    { to: '/global-accounts', label: 'Global Accounts' },
    { to: '/card', label: 'Card' },
    { to: '/send', label: 'Send' },
    { to: '/business', label: 'Business' },
  ]

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <svg width="22" height="16" viewBox="0 0 28 20" fill="none">
            <rect y="0" width="28" height="4" rx="2" fill="#7B4FBF"/>
            <rect y="8" width="28" height="4" rx="2" fill="white"/>
            <rect y="16" width="28" height="4" rx="2" fill="white"/>
          </svg>
          <span className={styles.wordmark}>venlopay</span>
        </Link>

        <div className={styles.links}>
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`${styles.link} ${isActive(l.to) ? styles.active : ''}`}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.themeToggle} onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <Link to="/" className={styles.ctaBtn}>Join The Waitlist</Link>
          <button className={styles.burger} onClick={() => setMenuOpen(true)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className={styles.drawer}
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className={styles.drawerTop}>
              <Link to="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
                <svg width="22" height="16" viewBox="0 0 28 20" fill="none">
                  <rect y="0" width="28" height="4" rx="2" fill="#7B4FBF"/>
                  <rect y="8" width="28" height="4" rx="2" fill="white"/>
                  <rect y="16" width="28" height="4" rx="2" fill="white"/>
                </svg>
                <span className={styles.wordmark}>venlopay</span>
              </Link>
              <button className={styles.closeBtn} onClick={() => setMenuOpen(false)} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5l10 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className={styles.drawerLinks}>
              <Link to="/" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>Home</Link>
              {links.map(l => (
                <Link key={l.to} to={l.to} className={styles.drawerLink} onClick={() => setMenuOpen(false)}>{l.label}</Link>
              ))}
            </div>
            <Link to="/" className={styles.drawerCta} onClick={() => setMenuOpen(false)}>Join The Waitlist</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
