import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FLAG } from '../../../constants/coinLogos'
import styles from './ProductOverview.module.css'

const tabs = [
  {
    id: 'store',
    label: 'STORE',
    tag: 'GLOBAL ACCOUNTS',
    headline: 'Receive like a local, everywhere.',
    body: 'Every Venlopay user gets flagship virtual accounts in the US, UK and EU — plus access to local banking rails in 190+ countries. Receive ACH, Faster Payments, SEPA and more.',
    bullets: ['US account — ACH + FedWire', 'UK account — Faster Payments', 'EU IBAN — SEPA'],
    link: { to: '/global-accounts', label: 'Explore global accounts →' },
  },
  {
    id: 'send',
    label: 'SEND',
    tag: 'SEND MONEY',
    headline: 'Sends directly to any local bank.',
    body: 'Send fiat to any bank account in 190+ countries. Your recipient gets their local currency — no crypto wallet needed, no friction, no surprises.',
    bullets: ['⚡ Instant settlement', '🌍 190+ countries', '🏦 Direct to any local bank'],
    link: { to: '/send', label: 'See how sending works →' },
  },
  {
    id: 'spend',
    label: 'SPEND',
    tag: 'VENLOPAY CARD',
    headline: 'Spend anywhere. Withdraw everywhere.',
    body: 'Your Venlopay card is accepted everywhere globally. It draws from your Venlopay balance — deposit any stablecoin and spend anywhere in the world or withdraw local currencies at ATMs worldwide.',
    bullets: ['💳 Physical + virtual card', '🏧 ATM withdrawals in local currency', '⚡ Spend anywhere, instantly'],
    link: { to: '/card', label: 'Get your card →' },
  },
  {
    id: 'business',
    label: 'BUSINESS',
    tag: 'VENLOPAY FOR BUSINESS',
    headline: 'Get paid from anywhere. Pay out in fiat.',
    body: 'Accept stablecoin payments from clients globally — every deposit converts to your Venlopay balance instantly, ready to pay your team or suppliers in local fiat anywhere in the world.',
    bullets: ['🌐 Global collections', '💸 Instant balance conversion', '👥 Cross-border payroll'],
    link: { to: '/business', label: 'Explore Venlopay Business →' },
  },
]

function StoreVisual() {
  const accounts = [
    { flagCode: 'US', name: 'US Virtual Account', rail: 'ACH + FedWire', num: '•••• 4821' },
    { flagCode: 'GB', name: 'UK Virtual Account', rail: 'Faster Payments', num: 'Sort: 20-00-00' },
    { flagCode: 'EU', name: 'EU IBAN', rail: 'SEPA', num: 'GB•• •••• ••••' },
  ]
  return (
    <div className={styles.visual}>
      {accounts.map((a, i) => (
        <motion.div key={i} className={styles.accountRow}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}>
          <img src={FLAG[a.flagCode]} alt={a.flagCode} className={styles.accFlag} width={28} height={19} style={{ objectFit: 'cover', borderRadius: 3, flexShrink: 0 }} />
          <div className={styles.accInfo}>
            <span className={styles.accName}>{a.name}</span>
            <span className={styles.accNum}>{a.num}</span>
          </div>
          <span className={styles.accRail}>{a.rail}</span>
        </motion.div>
      ))}
      <motion.div className={styles.visualNote} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        Available to every Venlopay user, regardless of country
      </motion.div>
    </div>
  )
}

function SendVisual() {
  return (
    <div className={styles.visual}>
      <motion.div className={styles.sendCard} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className={styles.sendRow}>
          <span className={styles.sendLabel}>You send</span>
          <span className={styles.sendVal}>£630.00 GBP</span>
        </div>
        <div className={styles.sendDivider} />
        <div className={styles.sendRow}>
          <span className={styles.sendLabel}>Recipient</span>
          <div className={styles.sendRecip}>
            <img src={FLAG.GB} alt="GB" width={18} height={12} style={{ objectFit: 'cover', borderRadius: 1, flexShrink: 0 }} />
            <span className={styles.sendVal}>James T.</span>
          </div>
        </div>
        <div className={styles.sendRow}>
          <span className={styles.sendLabel}>Bank</span>
          <span className={styles.sendVal}>Barclays UK · Sort 20-00-00</span>
        </div>
        <div className={styles.sendRow}>
          <span className={styles.sendLabel}>Rail</span>
          <div className={styles.sendRailBadge}><span>⚡</span> Faster Payments</div>
        </div>
        <div className={styles.sendMeta}>
          <span>Arrives in</span>
          <span className={styles.sendDelivered}>{'< 1 minute'}</span>
        </div>
      </motion.div>
      <motion.div className={styles.deliveredTag} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
        ✓ Recipient gets GBP directly to their bank
      </motion.div>
    </div>
  )
}

function SpendVisual() {
  return (
    <div className={styles.visual}>
      <div className={styles.cardStack}>
        <div className={styles.cardMockBack} />
        <motion.div className={styles.cardMock} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className={styles.cardMockWatermark}>venlopay</div>
          <div className={styles.cardMockTop}>
            <div className={styles.cardMockChip} />
            <svg width="28" height="18" viewBox="0 0 32 20" fill="none">
              <circle cx="11" cy="10" r="9" fill="rgba(255,255,255,0.5)" />
              <circle cx="21" cy="10" r="9" fill="rgba(255,255,255,0.35)" />
            </svg>
          </div>
          <div className={styles.cardMockBottom}>
            <span className={styles.cardMockWordmark}>venlopay</span>
          </div>
        </motion.div>
      </div>
      <div className={styles.cardTags}>
        <span className={styles.cardTag}>Physical</span>
        <span className={styles.cardTag}>Virtual</span>
        <span className={styles.cardTag}>Global ATMs</span>
      </div>
    </div>
  )
}

function BusinessVisual() {
  const payments = [
    { flagCode: 'US', name: 'Sarah M.', role: 'Engineering', amt: '$2,400', rail: 'ACH', color: '#4ADE80' },
    { flagCode: 'GB', name: 'James T.', role: 'Design', amt: '£1,850', rail: 'Faster Payments', color: '#4ADE80' },
    { flagCode: 'DE', name: 'Marie D.', role: 'Marketing', amt: '€2,100', rail: 'SEPA', color: '#4ADE80' },
  ]
  return (
    <div className={styles.visual}>
      <div className={styles.bizHeader}>
        <span className={styles.bizHeaderTitle}>Payroll · March 2026</span>
        <span className={styles.bizHeaderBadge}>3 sent</span>
      </div>
      {payments.map((p, i) => (
        <motion.div key={i} className={styles.bizPayRow}
          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}>
          <img src={FLAG[p.flagCode]} alt={p.flagCode} className={styles.bizFlag} width={24} height={16} style={{ objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
          <div className={styles.bizInfo}>
            <span className={styles.bizName}>{p.name}</span>
            <span className={styles.bizRole}>{p.role} · {p.rail}</span>
          </div>
          <div className={styles.bizRight}>
            <span className={styles.bizAmt} style={{ color: p.color }}>{p.amt}</span>
            <span className={styles.bizStatus}>Delivered</span>
          </div>
        </motion.div>
      ))}
      <div className={styles.bizFooter}>
        <span className={styles.bizFooterLabel}>Total sent</span>
        <span className={styles.bizFooterVal}>$6,350 equiv.</span>
      </div>
    </div>
  )
}

const visuals = {
  store: <StoreVisual />,
  send: <SendVisual />,
  spend: <SpendVisual />,
  business: <BusinessVisual />,
}

export default function ProductOverview() {
  const [active, setActive] = useState('store')
  const tab = tabs.find(t => t.id === active)

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div className={styles.header}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <span className={styles.sectionLabel}>ONE ACCOUNT FOR EVERY MOVE</span>
          <h2 className={styles.sectionHeadline}>Everything you need.<br />Nothing you don't.</h2>
        </motion.div>

        {/* Tab bar */}
        <div className={styles.tabBar}>
          {tabs.map(t => (
            <button key={t.id} className={`${styles.tabBtn} ${active === t.id ? styles.tabActive : ''}`}
              onClick={() => setActive(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div key={active} className={styles.tabContent}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>
            <div className={styles.tabText}>
              <span className={styles.rowTag}>{tab.tag}</span>
              <h3 className={styles.rowHeadline}>{tab.headline}</h3>
              <p className={styles.rowBody}>{tab.body}</p>
              <ul className={styles.rowBullets}>
                {tab.bullets.map((b, j) => (
                  <li key={j} className={styles.rowBullet}>{b}</li>
                ))}
              </ul>
              <Link to={tab.link.to} className={styles.rowLink}>{tab.link.label}</Link>
            </div>
            <div className={styles.tabVisual}>
              {visuals[active]}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

