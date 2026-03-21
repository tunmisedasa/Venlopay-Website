import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import WaitlistForm from '../../../components/WaitlistForm/WaitlistForm'
import { COIN_LOGOS, FLAG } from '../../../constants/coinLogos'
import styles from './Hero.module.css'



/* ── Bottom nav bar ─────────────────────────────────────── */
function BottomNav({ s, active = 0 }) {
  const tabs = [
    { icon: '⊞', label: 'Home' },
    { icon: '↑↓', label: 'Send' },
    { icon: '💳', label: 'Card' },
    { icon: '⚙', label: 'More' },
  ]
  return (
    <div className={s.bottomNav}>
      {tabs.map((t, i) => (
        <div key={i} className={`${s.navTab} ${i === active ? s.navTabActive : ''}`}>
          <span className={s.navIcon}>{t.icon}</span>
          <span className={s.navLabel}>{t.label}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Screen 1: Home Dashboard ───────────────────────────── */
function ScreenHome({ s }) {
  return (
    <div className={s.screen}>
      {/* Status bar */}
      <div className={s.statusBar}>
        <span className={s.statusTime}>9:41</span>
        <div className={s.statusIcons}>
          <span>▲▲▲</span>
          <span>WiFi</span>
          <span>⬛</span>
        </div>
      </div>
      {/* App bar */}
      <div className={s.appBar}>
        <div>
          <p className={s.greet}>Good morning 👋</p>
          <p className={s.userName}>Alex Johnson</p>
        </div>
        <div className={s.avatarWrap}>
          <div className={s.avatar}>AJ</div>
          <div className={s.notifDot} />
        </div>
      </div>
      {/* Balance card */}
      <div className={s.balCard}>
        <div className={s.balCardInner}>
          <div className={s.balTop}>
            <span className={s.balLabel}>TOTAL BALANCE</span>
            <span className={s.balBadge}>● LIVE</span>
          </div>
          <motion.p className={s.balAmt} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            $12,480.00
          </motion.p>
        </div>
        <div className={s.balCardGlow} />
      </div>
      {/* Quick actions */}
      <div className={s.quickRow}>
        {[
          { icon: '↓', label: 'Deposit', color: '#4ADE80' },
          { icon: '↑', label: 'Pay', color: '#9B6FDF' },
          { icon: '💳', label: 'Card', color: '#60A5FA' },
          { icon: '⋯', label: 'More', color: '#F59E0B' },
        ].map(({ icon, label, color }) => (
          <div key={label} className={s.quickBtn}>
            <div className={s.quickIconWrap} style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
              <span className={s.quickIcon} style={{ color }}>{icon}</span>
            </div>
            <span className={s.quickLabel}>{label}</span>
          </div>
        ))}
      </div>
      {/* Recent activity */}
      <div className={s.txSection}>
        <div className={s.txSectionHead}>
          <span className={s.txHeading}>Recent Activity</span>
          <span className={s.txSeeAll}>See all</span>
        </div>
        {[
          { flagCode: 'US', bank: 'Chase Bank', sub: 'ACH Deposit', time: '1h ago', amt: '+$2,400', up: true },
          { flagCode: 'GB', bank: 'Barclays UK', sub: 'Faster Payments', time: '3h ago', amt: '+£1,850', up: true },
          { flagCode: 'DE', bank: 'Deutsche Bank', sub: 'SEPA Transfer', time: '5h ago', amt: '-€600', up: false },
        ].map((tx, i) => (
          <motion.div key={i} className={s.txRow} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 + 0.15 }}>
            <div className={s.txIconWrap}>
              <img src={FLAG[tx.flagCode]} alt={tx.flagCode} className={s.txFlag} width={22} height={15} style={{ objectFit: 'cover', borderRadius: 2 }} />
            </div>
            <div className={s.txInfo}>
              <span className={s.txBank}>{tx.bank}</span>
              <span className={s.txSub}>{tx.sub} · {tx.time}</span>
            </div>
            <span className={tx.up ? s.txAmtDep : s.txAmtOut}>{tx.amt}</span>
          </motion.div>
        ))}
      </div>
      <BottomNav s={s} active={0} />
    </div>
  )
}

/* ── Screen 2: Deposit (stablecoin) ─────────────────────── */
function ScreenDeposit({ s }) {
  return (
    <div className={s.screen}>
      <div className={s.statusBar}><span className={s.statusTime}>9:41</span></div>
      <div className={s.sendHeader}>
        <span className={s.sendBack}>←</span>
        <span className={s.sendTitle}>Add Funds</span>
        <span />
      </div>
      <div className={s.depTabRow}>
        <div className={`${s.depTab} ${s.depTabActive}`}>Stablecoin</div>
        <div className={s.depTab}>Bank Transfer</div>
      </div>
      {/* Single coin display */}
      <div className={s.depSingleCoin}>
        <div className={s.depCoinLogoWrap}>
          <img src={COIN_LOGOS.USDT} alt="USDT" className={s.depCoinLogoImg} />
        </div>
        <span className={s.depCoinTicker}>USDT</span>
        <span className={s.depCoinName}>· Tether USD</span>
      </div>
      <div className={s.depNetRow}>
        <span className={s.depNetLabel}>Network</span>
        <div className={s.depNetPicker}>
          <span className={s.depNetVal}>Base</span>
          <span className={s.depNetChevron}>▾</span>
        </div>
      </div>
      {/* QR */}
      <motion.div className={s.qrContainer} initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.12, type: 'spring', stiffness: 180 }}>
        <QRCode />
        <div className={s.qrOverlayLogo}>V</div>
      </motion.div>
      <div className={s.depAddrBox}>
        <span className={s.depAddrLabel}>WALLET ADDRESS</span>
        <div className={s.depAddrRow}>
          <span className={s.depAddr}>0x4f2a…c819</span>
          <div className={s.depCopyBtn}><span>⧉ Copy</span></div>
        </div>
      </div>
      <div className={s.depNote}>Only send USDT on Base to this address. Other assets may be lost.</div>
    </div>
  )
}

/* ── Screen 3: Deposit confirmed ────────────────────────── */
function ScreenDepositConfirmed({ s }) {
  return (
    <div className={s.successScreen}>
      <div className={s.statusBar}><span className={s.statusTime}>9:41</span></div>
      <motion.div className={s.depConfirmRing} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}>
        <motion.div className={s.depConfirmInner} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 240, delay: 0.25 }}>
          <span className={s.depConfirmIcon}>↓</span>
        </motion.div>
      </motion.div>
      <motion.p className={s.successTitle} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>Deposit Received</motion.p>
      <motion.p className={s.successAmt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>500 USDT</motion.p>
      <motion.p className={s.successBank} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Credited to your USD balance</motion.p>
      <motion.div className={s.depCreditRow} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <div className={s.depCreditItem}>
          <span className={s.depCreditLabel}>You deposited</span>
          <span className={s.depCreditVal}>500 USDT</span>
        </div>
        <div className={s.depCreditDivider} />
        <div className={s.depCreditItem}>
          <span className={s.depCreditLabel}>Added to balance</span>
          <span className={s.depCreditValGreen}>+$500.00</span>
        </div>
        <div className={s.depCreditDivider} />
        <div className={s.depCreditItem}>
          <span className={s.depCreditLabel}>Network</span>
          <span className={s.depCreditVal}>Base · USDT</span>
        </div>
      </motion.div>
      <motion.div className={s.deliveredBadge} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72 }}>
        <span className={s.deliveredIcon}>⚡</span>
        <div>
          <p className={s.deliveredTitle}>Instantly credited</p>
          <p className={s.deliveredSub}>Balance updated · 9:41 AM</p>
        </div>
      </motion.div>
    </div>
  )
}

/* ── Screen 4: Send Money ───────────────────────────────── */
function ScreenSend({ s }) {
  return (
    <div className={s.screen}>
      <div className={s.statusBar}><span className={s.statusTime}>9:41</span></div>
      <div className={s.sendHeader}>
        <span className={s.sendBack}>←</span>
        <span className={s.sendTitle}>Send Money</span>
        <span />
      </div>
      {/* Recipient */}
      <div className={s.recipientRow}>
        <div className={s.recipientAvatar}>JT</div>
        <div className={s.recipientInfo}>
          <span className={s.recipientName}>James T.</span>
          <span className={s.recipientAcct}>
            <img src={FLAG.GB} alt="GB" width={16} height={11} style={{ objectFit: 'cover', borderRadius: 1, verticalAlign: 'middle', marginRight: 3 }} />
            Barclays UK · Sort: 20-00-00
          </span>
        </div>
        <div className={s.recipientVerified}>
          <span className={s.recipientCheck}>✓</span>
          <span className={s.recipientVerifiedLabel}>Verified</span>
        </div>
      </div>
      {/* Amount input */}
      <div className={s.amtInputBox}>
        <span className={s.amtCurrency}>£</span>
        <span className={s.amtBig}>630.00</span>
        <span className={s.amtCurrencyCode}>GBP</span>
      </div>
      {/* Details card */}
      <div className={s.amountBox}>
        <div className={s.amtRow}>
          <span className={s.amtLabel}>They receive</span>
          <span className={s.amtReceive}>£630.00 GBP</span>
        </div>
        <div className={s.amtDivider} />
        <div className={s.amtRow}>
          <span className={s.amtLabel}>Arrives via</span>
          <div className={s.amtRailBadge}><span>⚡</span><span>Faster Payments</span></div>
        </div>
        <div className={s.amtDivider} />
        <div className={s.amtRow}>
          <span className={s.amtLabel}>Estimated arrival</span>
          <span className={s.amtEta}>{'< 1 min'}</span>
        </div>
        <div className={s.amtDivider} />
        <div className={s.amtRow}>
          <span className={s.amtLabel}>Fee</span>
          <span className={s.amtFeeGreen}>Shown at confirm</span>
        </div>
      </div>
      <button className={s.confirmBtn}>
        <span>Review Send</span>
        <span className={s.confirmArrow}>→</span>
      </button>
      <BottomNav s={s} active={1} />
    </div>
  )
}

/* ── Screen 5: Send success ─────────────────────────────── */
function ScreenSendSuccess({ s }) {
  return (
    <div className={s.successScreen}>
      <div className={s.statusBar}><span className={s.statusTime}>9:41</span></div>
      <motion.div className={s.successRing} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220, delay: 0.1 }}>
        <motion.div className={s.successRingInner} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, delay: 0.25 }}>
          <span className={s.successCheck}>✓</span>
        </motion.div>
      </motion.div>
      <motion.p className={s.successTitle} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>Money Sent!</motion.p>
      <motion.p className={s.successAmt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>£630.00</motion.p>
      <motion.div className={s.successRecipRow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.52 }}>
        <img src={FLAG.GB} alt="GB" className={s.successRecipFlag} width={24} height={16} style={{ objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
        <span className={s.successRecipName}>James T. · Barclays UK</span>
      </motion.div>
      <motion.div className={s.depCreditRow} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <div className={s.depCreditItem}>
          <span className={s.depCreditLabel}>You sent</span>
          <span className={s.depCreditVal}>£630.00 GBP</span>
        </div>
        <div className={s.depCreditDivider} />
        <div className={s.depCreditItem}>
          <span className={s.depCreditLabel}>Delivered to</span>
          <span className={s.depCreditValGreen}>Barclays · Sort 20-00-00</span>
        </div>
      </motion.div>
      <motion.div className={s.deliveredBadge} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72 }}>
        <span className={s.deliveredIcon}>⚡</span>
        <div>
          <p className={s.deliveredTitle}>Delivered in {'<'} 1 min</p>
          <p className={s.deliveredSub}>via Faster Payments · 9:41 AM</p>
        </div>
      </motion.div>
    </div>
  )
}

/* ── Screen 6: Updated balance ──────────────────────────── */
function ScreenBalanceFinal({ s }) {
  return (
    <div className={s.screen}>
      <div className={s.statusBar}><span className={s.statusTime}>9:41</span></div>
      <div className={s.appBar}>
        <div>
          <p className={s.greet}>Good morning 👋</p>
          <p className={s.userName}>Alex Johnson</p>
        </div>
        <div className={s.avatarWrap}>
          <div className={s.avatar}>AJ</div>
        </div>
      </div>
      <div className={s.balCard}>
        <div className={s.balCardInner}>
          <div className={s.balTop}>
            <span className={s.balLabel}>TOTAL BALANCE</span>
            <span className={s.balBadge}>● LIVE</span>
          </div>
          <p className={s.balAmt}>$12,180.00</p>
        </div>
        <div className={s.balCardGlow} />
      </div>
      <div className={s.quickRow}>
        {[
          { icon: '↓', label: 'Deposit', color: '#4ADE80' },
          { icon: '↑', label: 'Pay', color: '#9B6FDF' },
          { icon: '💳', label: 'Card', color: '#60A5FA' },
          { icon: '⋯', label: 'More', color: '#F59E0B' },
        ].map(({ icon, label, color }) => (
          <div key={label} className={s.quickBtn}>
            <div className={s.quickIconWrap} style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
              <span className={s.quickIcon} style={{ color }}>{icon}</span>
            </div>
            <span className={s.quickLabel}>{label}</span>
          </div>
        ))}
      </div>
      <div className={s.txSection}>
        <div className={s.txSectionHead}>
          <span className={s.txHeading}>Recent Activity</span>
          <span className={s.txSeeAll}>See all</span>
        </div>
        {[
          { flagCode: 'GB', bank: 'Barclays UK', sub: 'Faster Payments', time: 'Just now', amt: '-£630.00', up: false },
          { flagCode: null, bank: 'USDT · Base', sub: 'Stablecoin deposit', time: '10m ago', amt: '+$500.00', up: true, coinLogo: COIN_LOGOS.USDT },
          { flagCode: 'US', bank: 'Chase Bank', sub: 'ACH Deposit', time: '1h ago', amt: '+$2,400', up: true },
        ].map((tx, i) => (
          <div key={i} className={s.txRow}>
            <div className={s.txIconWrap}>
              {tx.coinLogo
                ? <img src={tx.coinLogo} alt="USDT" className={s.txFlag} width={22} height={22} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                : <img src={FLAG[tx.flagCode]} alt={tx.flagCode} className={s.txFlag} width={22} height={15} style={{ objectFit: 'cover', borderRadius: 2 }} />
              }
            </div>
            <div className={s.txInfo}>
              <span className={s.txBank}>{tx.bank}</span>
              <span className={s.txSub}>{tx.sub} · {tx.time}</span>
            </div>
            <span className={tx.up ? s.txAmtDep : s.txAmtOut}>{tx.amt}</span>
          </div>
        ))}
      </div>
      <BottomNav s={s} active={0} />
    </div>
  )
}

/* ── QR Code ────────────────────────────────────────────── */
function QRCode() {
  const C = 4, P = 4, N = 21, W = N * C + P * 2
  const rows = [
    [1,1,1,1,1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,1,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,0,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,1,0,0,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1],
    [0,1,1,0,1,0,0,0,1,0,1,1,0,1,0,0,1,0,1,1,0],
    [1,1,0,0,1,1,1,0,0,1,1,0,1,0,1,0,0,1,1,0,1],
    [0,0,1,1,0,0,0,1,1,0,0,1,0,1,1,1,0,1,0,0,1],
    [1,0,1,0,1,1,1,0,0,1,0,0,1,0,0,1,1,0,1,1,0],
    [0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,0,1,0,0,1,1],
    [1,1,1,1,1,1,1,0,0,1,1,0,1,0,1,0,1,1,0,0,1],
    [1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,1,0,0,1,0,1],
    [1,0,1,1,1,0,1,0,0,0,1,0,1,0,1,0,0,1,0,1,0],
    [1,0,1,1,1,0,1,0,1,1,0,1,1,0,0,1,1,0,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
    [1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,1,0,1,0,1,1],
    [1,1,1,1,1,1,1,0,0,1,1,0,1,0,1,0,1,0,1,0,0],
  ]
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${W}`} style={{ display: 'block', borderRadius: 4 }}>
      <rect width={W} height={W} fill="white" />
      {rows.map((row, ri) => row.map((cell, ci) => cell ? (
        <rect key={`${ri}-${ci}`} x={P + ci * C} y={P + ri * C} width={C - 0.3} height={C - 0.3} fill="#080808" rx="0.4" />
      ) : null))}
    </svg>
  )
}

/* ── Screens registry ───────────────────────────────────── */
const screens = [
  { id: 'home',      Component: ScreenHome },
  { id: 'deposit',   Component: ScreenDeposit },
  { id: 'depDone',   Component: ScreenDepositConfirmed },
  { id: 'send',      Component: ScreenSend },
  { id: 'sendDone',  Component: ScreenSendSuccess },
  { id: 'balance',   Component: ScreenBalanceFinal },
]

/* ── Hero ───────────────────────────────────────────────── */
export default function Hero() {
  const [showForm, setShowForm] = useState(false)
  const [screenIdx, setScreenIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setScreenIdx(i => (i + 1) % screens.length), 3600)
    return () => clearInterval(t)
  }, [])

  const { Component } = screens[screenIdx]

  return (
    <section className={styles.hero}>
      <div className={styles.noise} />
      <div className={styles.glow1} />
      <div className={styles.glow2} />

      <div className={styles.inner}>
        {/* LEFT */}
        <div className={styles.left}>
          <motion.div className={styles.eyebrow} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <span className={styles.eyebrowDot} />
            Now accepting waitlist applications
          </motion.div>

          <motion.h1 className={styles.headline} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.5 }}>
            IT'S A WILD WORLD.<br />
            <span className={styles.headlineAccent}>KEEP IT MOVING.</span>
          </motion.h1>

          <motion.p className={styles.sub} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
            The global payment account. Fund with any stablecoin, send to any local bank in 190+ countries, and spend anywhere with your Venlopay card.
          </motion.p>

          <motion.div className={styles.ctaRow} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <button className={styles.primaryBtn} onClick={() => setShowForm(s => !s)}>
              Join The Waitlist
            </button>
            <Link to="/global-accounts" className={styles.ghostBtn}>
              See how it works →
            </Link>
          </motion.div>

          <AnimatePresence>
            {showForm && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.28 }} style={{ overflow: 'hidden', maxWidth: 440 }}>
                <div style={{ paddingTop: 12 }}><WaitlistForm /></div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div className={styles.stats} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
            {[['190+', 'Countries'], ['30+', 'Currencies'], ['14', 'Stablecoins accepted']].map(([n, l]) => (
              <div key={l} className={styles.stat}>
                <span className={styles.statN}>{n}</span>
                <span className={styles.statL}>{l}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — phone */}
        <motion.div className={styles.right} initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.55 }}>
          <div className={styles.phoneScene}>
            {/* Floating notification chips */}
            <motion.div className={`${styles.chip2} ${styles.chipTL}`} animate={{ y: [0, -7, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}>
              <img src={FLAG.US} alt="US" className={styles.chipFlag} width={22} height={15} style={{ objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
              <div className={styles.chipInfo}>
                <span className={styles.chipLabel}>Chase Bank</span>
                <span className={styles.chipAmt}>+$2,400 received</span>
              </div>
            </motion.div>
            <motion.div className={`${styles.chip2} ${styles.chipBL}`} animate={{ y: [0, -7, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}>
              <img src={FLAG.DE} alt="DE" className={styles.chipFlag} width={22} height={15} style={{ objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
              <div className={styles.chipInfo}>
                <span className={styles.chipLabel}>Deutsche Bank</span>
                <span className={styles.chipAmt}>SEPA · 2m ago</span>
              </div>
            </motion.div>
            <motion.div className={`${styles.chip2} ${styles.chipTR}`} animate={{ y: [0, -7, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}>
              <img src={FLAG.GB} alt="GB" className={styles.chipFlag} width={22} height={15} style={{ objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
              <div className={styles.chipInfo}>
                <span className={styles.chipLabel}>Barclays UK</span>
                <span className={styles.chipAmt}>Faster Payments</span>
              </div>
            </motion.div>
            <motion.div className={`${styles.chip2} ${styles.chipBR}`} animate={{ y: [0, -7, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}>
              <img src={FLAG.SG} alt="SG" className={styles.chipFlag} width={22} height={15} style={{ objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
              <div className={styles.chipInfo}>
                <span className={styles.chipLabel}>DBS Singapore</span>
                <span className={styles.chipAmt}>PayNow · 8m ago</span>
              </div>
            </motion.div>

            <div className={styles.phoneGlow} />

            {/* Phone shell */}
            <div className={styles.phone}>
              {/* Side buttons */}
              <div className={styles.phoneSideLeft} />
              <div className={styles.phoneSideRight} />
              {/* Dynamic island */}
              <div className={styles.dynamicIsland} />
              {/* Screen */}
              <div className={styles.phoneScreen}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={screens[screenIdx].id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22 }}
                    style={{ height: '100%' }}
                  >
                    <Component s={styles} />
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Screen reflection */}
              <div className={styles.phoneReflection} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
