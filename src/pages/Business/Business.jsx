import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WaitlistForm from '../../components/WaitlistForm/WaitlistForm'
import StablecoinStrip from '../../components/StablecoinStrip/StablecoinStrip'
import { COIN_LOGOS, FLAG } from '../../constants/coinLogos'
import styles from './Business.module.css'

const spring = { type: 'spring', stiffness: 260, damping: 28 }
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { ...spring, delay } }
})
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}
const cardItem = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: spring }
}

const useCases = [
  {
    icon: '🌍', title: 'Global Payroll',
    desc: 'Pay your remote team in 190+ countries. Every employee gets local currency in their local bank — on time, every time. No wire fees, no FX markups, no delays.',
    tags: ['190+ countries', 'Local currency', 'Instant settlement'],
  },
  {
    icon: '🤝', title: 'Supplier Payments',
    desc: 'Pay suppliers and vendors anywhere in the world. Send from your Venlopay balance, they receive local fiat. Transparent fees, real-time tracking.',
    tags: ['Any currency', 'Real-time tracking', 'Transparent fees'],
  },
  {
    icon: '💻', title: 'Freelancer & Contractor Payouts',
    desc: 'Pay freelancers and contractors globally without the banking friction. They get paid in their local currency — you pay from stablecoins.',
    tags: ['Instant payouts', 'No banking friction', 'Global reach'],
  },
  {
    icon: '🏪', title: 'Accept Stablecoin Payments',
    desc: 'Accept payments from customers in any stablecoin. Every payment converts to your Venlopay balance instantly — ready to send as fiat to any bank.',
    tags: ['14 stablecoins', '11 chains', 'Flexible settlement'],
  },
]

const steps = [
  { num: '01', icon: '🏢', title: 'Create Your Business Account', body: 'Sign up and complete business verification. Takes minutes.' },
  { num: '02', icon: '💰', title: 'Fund With Stablecoins', body: 'Deposit any stablecoin from any wallet or exchange. Your balance is ready instantly.' },
  { num: '03', icon: '📋', title: 'Add Your Recipients', body: 'Add employees, suppliers, or contractors. Venlopay auto-detects their local currency and rails.' },
  { num: '04', icon: '👁', title: 'Review Fees & Rates', body: 'See exact fees and exchange rates before every payment. No surprises.' },
  { num: '05', icon: '✅', title: 'Send & Track', body: 'Confirm and send. Track every payment in real-time from your business dashboard.' },
]

const stablecoins = [
  { symbol: 'USDT', name: 'Tether',                logo: COIN_LOGOS.USDT, chains: ['Ethereum', 'Tron', 'BNB Chain', 'Solana', 'Arbitrum', 'Polygon', 'Avalanche'] },
  { symbol: 'USDC', name: 'USD Coin',               logo: COIN_LOGOS.USDC, chains: ['Ethereum', 'Solana', 'Arbitrum', 'Base', 'Polygon', 'Avalanche', 'BNB Chain'] },
  { symbol: 'EURC', name: 'Euro Coin',              logo: COIN_LOGOS.EURC, chains: ['Ethereum', 'Solana', 'Base', 'Avalanche'] },
  { symbol: 'CADC', name: 'Canadian Dollar Coin',   logo: COIN_LOGOS.CADC, chains: ['Ethereum', 'Polygon'] },
  { symbol: 'XSGD', name: 'Singapore Dollar',       logo: COIN_LOGOS.XSGD, chains: ['Ethereum', 'Polygon', 'Zilliqa', 'XRPL'] },
  { symbol: 'JPYC', name: 'Japanese Yen Coin',      logo: COIN_LOGOS.JPYC, chains: ['Ethereum', 'Polygon', 'Avalanche'] },
  { symbol: 'BRZ',  name: 'Brazilian Real Token',   logo: COIN_LOGOS.BRZ,  chains: ['Ethereum', 'Solana', 'BNB Chain'] },
  { symbol: 'MXNT', name: 'Mexican Peso Tether',    logo: COIN_LOGOS.MXNT, chains: ['Ethereum', 'Tron', 'Polygon'] },
  { symbol: 'IDRT', name: 'Rupiah Token',           logo: COIN_LOGOS.IDRT, chains: ['Ethereum', 'Tron', 'BNB Chain'] },
  { symbol: 'TRYB', name: 'BiLira',                 logo: COIN_LOGOS.TRYB, chains: ['Ethereum', 'BNB Chain'] },
  { symbol: 'cNGN', name: 'Crypto Nigerian Naira',  logo: COIN_LOGOS.cNGN, chains: ['Ethereum', 'BNB Chain', 'Base'] },
  { symbol: 'ZARP', name: 'ZARP Stablecoin',        logo: COIN_LOGOS.ZARP, chains: ['Ethereum', 'Base', 'Polygon'] },
  { symbol: 'cKES', name: 'Crypto Kenyan Shilling', logo: COIN_LOGOS.cKES, chains: ['Celo'] },
  { symbol: 'eXOF', name: 'West African CFA Franc', logo: COIN_LOGOS.eXOF, chains: ['Celo'] },
]

const faqs = [
  { q: 'What is Venlopay Business?', a: 'Venlopay Business is a global payment platform for companies. Fund your account with stablecoins and pay employees, suppliers, and contractors in 190+ countries — they receive local currency in their local bank.' },
  { q: 'How do I pay my global team with Venlopay?', a: 'Add your team members, enter their bank details, and send from your Venlopay balance. Each recipient gets local currency via local payment rails — ACH, Faster Payments, SEPA, and more.' },
  { q: 'Can I accept stablecoin payments from customers?', a: 'Yes. Venlopay Business lets you accept payments in any of 14 supported stablecoins across 11 chains. Every payment converts to your Venlopay balance instantly — ready to send as fiat to any bank in 190+ countries.' },
  { q: 'Are fees shown upfront?', a: 'Yes. Every fee and exchange rate is shown before you confirm any payment. No hidden charges, no surprise deductions.' },
  { q: 'What currencies can I pay out in?', a: 'You can pay out in 30+ local currencies to 190+ countries. Your recipients always receive their local currency via local payment rails.' },
  { q: 'How do I track payments?', a: 'Every payment is tracked in real-time from your business dashboard. You get status updates from send to delivery for every transaction.' },
]

const comparisonRows = [
  { feature: 'Settlement speed', venlopay: 'Instant to same day', traditional: '2–5 business days' },
  { feature: 'Countries covered', venlopay: '190+', traditional: '30–60 typically' },
  { feature: 'Fees shown upfront', venlopay: 'Always', traditional: 'Often hidden' },
  { feature: 'FX markup', venlopay: 'None', traditional: '2–4% typically' },
  { feature: 'Stablecoin funding', venlopay: '14 stablecoins, 11 chains', traditional: 'Not supported' },
  { feature: 'Real-time tracking', venlopay: 'Every payment', traditional: 'Limited' },
]

/* ── Mini sparkline for dashboard ─────────────────────────── */
function DashSparkline({ color = '#4ADE80', up = true }) {
  const pts = up
    ? '0,20 10,16 20,18 30,11 40,13 50,7 60,9 70,4 80,6'
    : '0,6 10,10 20,7 30,13 40,10 50,16 60,13 70,18 80,16'
  return (
    <svg width="80" height="24" viewBox="0 0 80 24" fill="none">
      <defs>
        <linearGradient id={`dsg${up}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points={`0,24 ${pts} 80,24`} fill={`url(#dsg${up})`} />
    </svg>
  )
}

/* ── Dashboard Mockup ──────────────────────────────────────── */
function DashboardMockup() {
  const s = styles
  const payments = [
    { flagCode: 'US', name: 'Sarah M.', role: 'Engineering · NYC', amount: '-$2,400.00', rail: 'ACH', status: 'Delivered', statusColor: '#4ADE80', time: '2m ago' },
    { flagCode: 'GB', name: 'James T.', role: 'Design · London', amount: '-£1,850.00', rail: 'Faster Payments', status: 'Delivered', statusColor: '#4ADE80', time: '14m ago' },
    { flagCode: 'EU', name: 'Marie D.', role: 'Marketing · Paris', amount: '-€2,100.00', rail: 'SEPA Instant', status: 'Delivered', statusColor: '#4ADE80', time: '1h ago' },
    { flagCode: 'JP', name: 'Kenji W.', role: 'Dev · Tokyo', amount: '-¥320,000', rail: 'Zengin', status: 'In Transit', statusColor: '#F59E0B', time: '2h ago' },
  ]

  return (
    <motion.div className={s.dashboardMockup}
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      transition={{ ...spring, delay: 0.5 }}>

      {/* Window chrome */}
      <div className={s.dashHeader}>
        <div className={s.dashDots}>
          <span className={s.dashDot} style={{ background: '#FF5F57' }} />
          <span className={s.dashDot} style={{ background: '#FEBC2E' }} />
          <span className={s.dashDot} style={{ background: '#28C840' }} />
        </div>
        <div className={s.dashTitleBar}>
          <span className={s.dashTitleIcon}>⬡</span>
          <span className={s.dashTitle}>Venlopay Business</span>
        </div>
        <div className={s.dashHeaderRight}>
          <span className={s.dashLiveBadge}>
            <span className={s.dashLiveDot} />
            Live
          </span>
        </div>
      </div>

      {/* Sidebar + main */}
      <div className={s.dashLayout}>
        {/* Sidebar */}
        <div className={s.dashSidebar}>
          <div className={s.dashOrgRow}>
            <div className={s.dashOrgIcon}>V</div>
            <div className={s.dashOrgInfo}>
              <span className={s.dashOrgName}>Venlopay Co.</span>
              <span className={s.dashOrgPlan}>Business Pro</span>
            </div>
          </div>
          <nav className={s.dashNav}>
            {[
              { icon: '⊞', label: 'Overview', active: true },
              { icon: '↑↓', label: 'Payments', active: false },
              { icon: '👥', label: 'Recipients', active: false },
              { icon: '💳', label: 'Cards', active: false },
              { icon: '📊', label: 'Analytics', active: false },
              { icon: '⚙', label: 'Settings', active: false },
            ].map((item) => (
              <div key={item.label} className={`${s.dashNavItem} ${item.active ? s.dashNavItemActive : ''}`}>
                <span className={s.dashNavIcon}>{item.icon}</span>
                <span className={s.dashNavLabel}>{item.label}</span>
              </div>
            ))}
          </nav>
          <div className={s.dashSidebarBottom}>
            <div className={s.dashUserRow}>
              <div className={s.dashUserAvatar}>AJ</div>
              <div className={s.dashUserInfo}>
                <span className={s.dashUserName}>Alex J.</span>
                <span className={s.dashUserRole}>Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className={s.dashMain}>
          {/* Top bar */}
          <div className={s.dashTopBar}>
            <div>
              <p className={s.dashPageTitle}>Overview</p>
              <p className={s.dashPageSub}>Thursday, March 19, 2026</p>
            </div>
            <div className={s.dashTopActions}>
              <button className={s.dashSendBtn}>
                <span>↑</span> Send Payment
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className={s.dashStatsRow}>
            {[
              { label: 'Total Balance', val: '$248,500', sub: '+$12,400 today', up: true, spark: true },
              { label: 'Sent This Month', val: '$84,200', sub: '47 payments', up: null, spark: false },
              { label: 'Active Recipients', val: '128', sub: 'across 34 countries', up: null, spark: false },
            ].map((stat, i) => (
              <motion.div key={i} className={s.dashStatCard}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.65 + i * 0.08 }}>
                <div className={s.dashStatTop}>
                  <span className={s.dashStatLabel}>{stat.label}</span>
                  {stat.spark && <DashSparkline color="#4ADE80" up={true} />}
                </div>
                <span className={s.dashStatVal}>{stat.val}</span>
                <span className={stat.up ? s.dashStatUp : s.dashStatSub}>{stat.sub}</span>
              </motion.div>
            ))}
          </div>

          {/* Payments table */}
          <div className={s.dashPaymentsCard}>
            <div className={s.dashPaymentsHead}>
              <span className={s.dashPaymentsTitle}>Recent Payments</span>
              <span className={s.dashPaymentsLink}>View all →</span>
            </div>
            <div className={s.dashPayTableHeader}>
              <span className={s.dashPayColRecipient}>Recipient</span>
              <span className={s.dashPayColRail}>Rail</span>
              <span className={s.dashPayColAmount}>Amount</span>
              <span className={s.dashPayColStatus}>Status</span>
            </div>
            {payments.map((p, i) => (
              <motion.div key={i} className={s.dashPayRow}
                initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ ...spring, delay: 0.8 + i * 0.09 }}>
                <div className={s.dashPayRecipient}>
                  <div className={s.dashPayAvatar}>
                    <img src={FLAG[p.flagCode]} alt={p.flagCode} width={22} height={15} style={{ objectFit: 'cover', borderRadius: 2 }} />
                  </div>
                  <div className={s.dashPayInfo}>
                    <span className={s.dashPayName}>{p.name}</span>
                    <span className={s.dashPayRole}>{p.role}</span>
                  </div>
                </div>
                <span className={s.dashPayRailBadge}>{p.rail}</span>
                <div className={s.dashPayAmountCol}>
                  <span className={s.dashPayAmount}>{p.amount}</span>
                  <span className={s.dashPayTime}>{p.time}</span>
                </div>
                <div className={s.dashPayStatusCol}>
                  <span className={s.dashPayStatusDot} style={{ background: p.statusColor }} />
                  <span className={s.dashPayStatusText} style={{ color: p.statusColor }}>{p.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Business() {
  const [showForm, setShowForm] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <motion.div className={styles.pill} variants={fadeUp(0.15)}>VENLOPAY BUSINESS</motion.div>
            <motion.h1 className={styles.heroHeadline} variants={fadeUp(0.3)}>
              Global Payments.<br />Built for Business.
            </motion.h1>
            <motion.p className={styles.heroSub} variants={fadeUp(0.42)}>
              Pay your team, suppliers, and contractors in 190+ countries. Accept stablecoin payments from customers. All from one business account.
            </motion.p>
            <motion.div className={styles.heroStats} variants={fadeUp(0.52)}>
              {[['190+', 'Countries'], ['30+', 'Currencies'], ['14', 'Stablecoins']].map(([n, l], i) => (
                <div key={i} className={styles.statItem}>
                  <span className={styles.statNum}>{n}</span>
                  <span className={styles.statLabel}>{l}</span>
                </div>
              ))}
            </motion.div>
            <motion.button className={styles.heroCta} onClick={() => setShowForm(s => !s)} variants={fadeUp(0.62)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              Join The Waitlist
            </motion.button>
            <AnimatePresence>
              {showForm && (
                <motion.div className={styles.formWrap} initial={{ maxHeight: 0, opacity: 0 }} animate={{ maxHeight: 500, opacity: 1 }} exit={{ maxHeight: 0, opacity: 0 }} transition={{ duration: 0.35 }} style={{ overflow: 'hidden' }}>
                  <WaitlistForm />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <DashboardMockup />
        </div>
      </section>

      <StablecoinStrip label="ACCEPT PAYMENTS IN ANY STABLECOIN" />

      {/* USE CASES */}
      <section className={styles.useCasesSection}>
        <div className={styles.sectionInner}>
          <motion.div className={styles.pill} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>USE CASES</motion.div>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>Four Ways Businesses Use Venlopay</motion.h2>
          <motion.div className={styles.useCasesGrid} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {/* Global Payroll */}
            <motion.div className={styles.useCaseCard} variants={cardItem} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
              <div className={styles.useCaseIcon}>🌍</div>
              <h3 className={styles.useCaseTitle}>Global Payroll</h3>
              <p className={styles.useCaseDesc}>Pay your remote team in 190+ countries. Every employee gets local currency in their local bank — on time, every time. No wire fees, no FX markups, no delays.</p>
              <div className={styles.ucMockup}>
                {[
                  { flagCode: 'US', name: 'Sarah M.', role: 'Engineering', amount: '$2,400', rail: 'ACH' },
                  { flagCode: 'GB', name: 'James T.', role: 'Design', amount: '£1,850', rail: 'Faster Payments' },
                  { flagCode: 'IN', name: 'Priya K.', role: 'Product', amount: '₹185,000', rail: 'UPI' },
                ].map((r, j) => (
                  <div key={j} className={styles.ucRow}>
                    <img src={FLAG[r.flagCode]} alt={r.flagCode} className={styles.ucFlag} width={22} height={15} style={{ objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
                    <div className={styles.ucInfo}><span className={styles.ucName}>{r.name}</span><span className={styles.ucRole}>{r.role}</span></div>
                    <span className={styles.ucAmount}>{r.amount}</span>
                    <span className={styles.ucRail}>{r.rail}</span>
                  </div>
                ))}
              </div>
              <div className={styles.useCaseTags}>{useCases[0].tags.map(t => <span key={t} className={styles.useCaseTag}>{t}</span>)}</div>
            </motion.div>

            {/* Supplier Payments */}
            <motion.div className={styles.useCaseCard} variants={cardItem} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
              <div className={styles.useCaseIcon}>🤝</div>
              <h3 className={styles.useCaseTitle}>Supplier Payments</h3>
              <p className={styles.useCaseDesc}>Pay suppliers and vendors anywhere in the world. Send from your Venlopay balance, they receive local fiat. Transparent fees, real-time tracking.</p>
              <div className={styles.ucMockup}>
                <div className={styles.ucPayDetail}>
                  <div className={styles.ucPayRow}><span className={styles.ucPayLabel}>You send</span><span className={styles.ucPayVal}>5,000 USDT</span></div>
                  <div className={styles.ucPayRow}><span className={styles.ucPayLabel}>They receive</span><span className={styles.ucPayVal} style={{ color: '#4ADE80' }}>€4,620.00</span></div>
                  <div className={styles.ucPayRow}><span className={styles.ucPayLabel}>Rail</span><span className={styles.ucPayVal}>SEPA Instant</span></div>
                  <div className={styles.ucPayRow}><span className={styles.ucPayLabel}>ETA</span><span className={styles.ucPayVal}>Instant</span></div>
                </div>
              </div>
              <div className={styles.useCaseTags}>{useCases[1].tags.map(t => <span key={t} className={styles.useCaseTag}>{t}</span>)}</div>
            </motion.div>

            {/* Freelancer Payouts */}
            <motion.div className={styles.useCaseCard} variants={cardItem} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
              <div className={styles.useCaseIcon}>💻</div>
              <h3 className={styles.useCaseTitle}>Freelancer & Contractor Payouts</h3>
              <p className={styles.useCaseDesc}>Pay freelancers and contractors globally without the banking friction. They get paid in their local currency — you pay from stablecoins.</p>
              <div className={styles.ucMockup}>
                {[
                  { flagCode: 'NG', name: 'Emeka O.', role: 'Dev · Lagos', amount: '₦3,200,000', status: '✓ Delivered' },
                  { flagCode: 'BR', name: 'Lucas F.', role: 'Design · São Paulo', amount: 'R$12,400', status: '✓ Delivered' },
                  { flagCode: 'PH', name: 'Ana R.', role: 'Content · Manila', amount: '₱55,000', status: '⏳ In Transit' },
                ].map((r, j) => (
                  <div key={j} className={styles.ucRow}>
                    <img src={FLAG[r.flagCode]} alt={r.flagCode} className={styles.ucFlag} width={22} height={15} style={{ objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
                    <div className={styles.ucInfo}><span className={styles.ucName}>{r.name}</span><span className={styles.ucRole}>{r.role}</span></div>
                    <span className={styles.ucAmount}>{r.amount}</span>
                    <span className={styles.ucStatus} style={{ color: r.status.startsWith('✓') ? '#4ADE80' : '#F59E0B' }}>{r.status}</span>
                  </div>
                ))}
              </div>
              <div className={styles.useCaseTags}>{useCases[2].tags.map(t => <span key={t} className={styles.useCaseTag}>{t}</span>)}</div>
            </motion.div>

            {/* Accept Stablecoin Payments */}
            <motion.div className={styles.useCaseCard} variants={cardItem} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
              <div className={styles.useCaseIcon}>🏪</div>
              <h3 className={styles.useCaseTitle}>Accept Stablecoin Payments</h3>
              <p className={styles.useCaseDesc}>Accept payments from customers in any stablecoin. Every payment converts to your Venlopay balance instantly — ready to send as fiat to any bank.</p>
              <div className={styles.ucMockup}>
                <div className={styles.ucPayDetail}>
                  <div className={styles.ucPayRow}><span className={styles.ucPayLabel}>Customer sends</span><span className={styles.ucPayVal}>2,000 USDC</span></div>
                  <div className={styles.ucPayRow}><span className={styles.ucPayLabel}>Network</span><span className={styles.ucPayVal}>Ethereum</span></div>
                  <div className={styles.ucPayRow}><span className={styles.ucPayLabel}>Converts to</span><span className={styles.ucPayVal} style={{ color: '#4ADE80' }}>$2,000.00 balance</span></div>
                  <div className={styles.ucPayRow}><span className={styles.ucPayLabel}>Status</span><span className={styles.ucPayVal} style={{ color: '#4ADE80' }}>✓ Ready to send</span></div>
                </div>
              </div>
              <div className={styles.useCaseTags}>{useCases[3].tags.map(t => <span key={t} className={styles.useCaseTag}>{t}</span>)}</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.howSection}>
        <div className={styles.sectionInner}>
          <motion.div className={styles.pill} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>HOW IT WORKS</motion.div>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>Five Steps to Global Payments</motion.h2>
          <motion.div className={styles.stepsRow} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {/* Step 01 */}
            <motion.div className={styles.step} variants={cardItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className={styles.stepNum}>01</div>
              <div className={styles.stepIcon}>🏢</div>
              <h3 className={styles.stepTitle}>Create Your Business Account</h3>
              <p className={styles.stepBody}>Sign up and complete business verification. Takes minutes.</p>
              <div className={styles.stepMini}>
                <div className={styles.stepMiniRow}><span className={styles.stepMiniDot} style={{ background: '#4ADE80' }} /><span className={styles.stepMiniText}>Business verified</span></div>
                <div className={styles.stepMiniRow}><span className={styles.stepMiniDot} style={{ background: '#4ADE80' }} /><span className={styles.stepMiniText}>KYB complete</span></div>
              </div>
            </motion.div>

            {/* Step 02 */}
            <motion.div className={styles.step} variants={cardItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className={styles.stepNum}>02</div>
              <div className={styles.stepIcon}>💰</div>
              <h3 className={styles.stepTitle}>Fund With Stablecoins</h3>
              <p className={styles.stepBody}>Deposit any stablecoin from any wallet or exchange. Your balance is ready instantly.</p>
              <div className={styles.stepMini}>
                <div className={styles.stepMiniRow}>
                  <img src={COIN_LOGOS.USDT} alt="USDT" style={{ width: 14, height: 14, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  <span className={styles.stepMiniText}>USDT deposited</span>
                  <span className={styles.stepMiniVal}>+$50,000</span>
                </div>
                <div className={styles.stepMiniRow}><span className={styles.stepMiniDot} style={{ background: '#4ADE80' }} /><span className={styles.stepMiniText}>Balance ready</span></div>
              </div>
            </motion.div>

            {/* Step 03 */}
            <motion.div className={styles.step} variants={cardItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className={styles.stepNum}>03</div>
              <div className={styles.stepIcon}>📋</div>
              <h3 className={styles.stepTitle}>Add Your Recipients</h3>
              <p className={styles.stepBody}>Add employees, suppliers, or contractors. Venlopay auto-detects their local currency and rails.</p>
              <div className={styles.stepMini}>
                <div className={styles.stepMiniRow}>
                  <img src={FLAG.US} alt="US" width={16} height={11} style={{ objectFit: 'cover', borderRadius: 1, flexShrink: 0 }} />
                  <span className={styles.stepMiniText}>Sarah M. · ACH</span>
                </div>
                <div className={styles.stepMiniRow}>
                  <img src={FLAG.GB} alt="GB" width={16} height={11} style={{ objectFit: 'cover', borderRadius: 1, flexShrink: 0 }} />
                  <span className={styles.stepMiniText}>James T. · Faster Payments</span>
                </div>
              </div>
            </motion.div>

            {/* Step 04 */}
            <motion.div className={styles.step} variants={cardItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className={styles.stepNum}>04</div>
              <div className={styles.stepIcon}>👁</div>
              <h3 className={styles.stepTitle}>Review Fees & Rates</h3>
              <p className={styles.stepBody}>See exact fees and exchange rates before every payment. No surprises.</p>
              <div className={styles.stepMini}>
                <div className={styles.stepMiniRow}><span className={styles.stepMiniText}>Fee</span><span className={styles.stepMiniVal}>$0.80</span></div>
                <div className={styles.stepMiniRow}><span className={styles.stepMiniText}>Rate</span><span className={styles.stepMiniVal}>1 USDT = £0.79</span></div>
              </div>
            </motion.div>

            {/* Step 05 */}
            <motion.div className={styles.step} variants={cardItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className={styles.stepNum}>05</div>
              <div className={styles.stepIcon}>✅</div>
              <h3 className={styles.stepTitle}>Send & Track</h3>
              <p className={styles.stepBody}>Confirm and send. Track every payment in real-time from your business dashboard.</p>
              <div className={styles.stepMini}>
                <div className={styles.stepMiniRow}><span className={styles.stepMiniDot} style={{ background: '#4ADE80' }} /><span className={styles.stepMiniText}>4 payments delivered</span></div>
                <div className={styles.stepMiniRow}><span className={styles.stepMiniDot} style={{ background: '#F59E0B' }} /><span className={styles.stepMiniText}>1 in transit</span></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className={styles.comparisonSection}>
        <div className={styles.sectionInner}>
          <motion.div className={styles.pill} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>COMPARISON</motion.div>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>Venlopay vs Traditional Processors</motion.h2>
          <motion.div className={styles.comparisonTable} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.15 }}>
            <div className={styles.tableHeader}>
              <div className={styles.tableFeatureCol} />
              <div className={styles.tableVenlopay}>Venlopay</div>
              <div className={styles.tableTraditional}>Traditional</div>
            </div>
            {comparisonRows.map((row, i) => (
              <motion.div key={i} className={styles.tableRow}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ ...spring, delay: i * 0.07 }}>
                <div className={styles.tableFeature}>{row.feature}</div>
                <div className={styles.tableVenlopayVal}><span className={styles.checkGreen}>✓</span> {row.venlopay}</div>
                <div className={styles.tableTraditionalVal}><span className={styles.crossRed}>✗</span> {row.traditional}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STABLECOIN ACCEPTANCE */}
      <section className={styles.stablecoinSection}>
        <div className={styles.sectionInner}>
          <motion.div className={styles.pill} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>STABLECOIN ACCEPTANCE</motion.div>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>Accept Any Stablecoin</motion.h2>
          <motion.p className={styles.sectionSub} variants={fadeUp(0.18)} initial="hidden" whileInView="visible" viewport={{ once: true }}>14 stablecoins across 11 chains. If your customer has it, you can accept it.</motion.p>
          <motion.div className={styles.stablecoinGrid} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {stablecoins.map((sc, i) => (
              <motion.div key={i} className={styles.stablecoinCard} variants={cardItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                <div className={styles.scLogoWrap}>
                  <img
                    src={sc.logo}
                    alt={sc.symbol}
                    className={styles.scLogoImg}
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                  />
                  <span className={styles.scLogoFallback} style={{ display: 'none' }}>{sc.symbol.slice(0,1)}</span>
                </div>
                <div className={styles.scSymbol}>{sc.symbol}</div>
                <div className={styles.scName}>{sc.name}</div>
                <div className={styles.scChains}>
                  {sc.chains.map(c => <span key={c} className={styles.scChain}>{c}</span>)}
                </div>
                <div className={styles.scAcceptRow}>
                  <span className={styles.scAcceptDot} />
                  <span className={styles.scAcceptText}>Accepting</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SETTLEMENT DETAIL */}
      <section className={styles.settlementSection}>
        <div className={styles.sectionInner}>
          <motion.div className={styles.pill} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>SETTLEMENT</motion.div>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>Settle Your Way</motion.h2>
          <motion.p className={styles.sectionSub} variants={fadeUp(0.18)} initial="hidden" whileInView="visible" viewport={{ once: true }}>Choose how and when your payments settle. Full flexibility, always transparent.</motion.p>
          <motion.div className={styles.settlementGrid} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { icon: '🏦', title: 'Settle to Local Bank', body: 'Payments received convert to your Venlopay balance instantly — ready to send as fiat to any bank account in your local currency.', rows: [{ label: 'Deposit', val: '5,000 USDT' }, { label: 'Balance', val: '$5,000.00' }, { label: 'Currency', val: 'Your local fiat' }] },
              { icon: '⚡', title: 'Instant Balance Conversion', body: 'Every deposit — stablecoin or bank transfer — converts to your Venlopay balance instantly. Ready to send as fiat to any bank, anywhere.', rows: [{ label: 'Deposit', val: '5,000 USDT' }, { label: 'Balance', val: '$5,000.00' }, { label: 'Ready to send', val: 'Instantly' }] },
              { icon: '🔄', title: 'Multi-Currency Balances', body: 'Maintain balances in multiple currencies simultaneously. Pay out in USD, EUR, GBP — all from one account.', rows: [{ label: 'USD', val: '$84,200' }, { label: 'EUR', val: '€31,400' }, { label: 'GBP', val: '£22,800' }] },
              { icon: '📊', title: 'Real-Time Dashboard', body: 'Every payment, every balance, every settlement — tracked in real-time from your business dashboard.', rows: [{ label: 'Payments today', val: '12 sent' }, { label: 'In transit', val: '3' }, { label: 'Delivered', val: '9 ✓' }] },
            ].map((item, i) => (
              <motion.div key={i} className={styles.settlementCard} variants={cardItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                <div className={styles.settlementIcon}>{item.icon}</div>
                <h3 className={styles.settlementTitle}>{item.title}</h3>
                <p className={styles.settlementBody}>{item.body}</p>
                <div className={styles.settleMini}>
                  {item.rows.map((r, j) => (
                    <div key={j} className={styles.settleMiniRow}>
                      <span className={styles.settleMiniLabel}>{r.label}</span>
                      <span className={styles.settleMiniVal}>{r.val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>Business FAQs</motion.h2>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <motion.div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ ...spring, delay: i * 0.06 }}>
                <button className={styles.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className={`${styles.faqIcon} ${openFaq === i ? styles.faqIconOpen : ''}`}>+</span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ maxHeight: 0, opacity: 0 }} animate={{ maxHeight: 300, opacity: 1 }} exit={{ maxHeight: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                      <p className={styles.faqA}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaGlow} />
        <div className={styles.ctaInner}>
          <motion.h2 className={styles.ctaHeadline} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={spring}>
            Ready to Pay the World?
          </motion.h2>
          <motion.p className={styles.ctaSub} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.1 }}>
            Join businesses already on the Venlopay waitlist.
          </motion.p>
          <motion.button className={styles.ctaBtn} onClick={() => setShowForm(s => !s)}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ ...spring, delay: 0.2 }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            Join The Waitlist
          </motion.button>
          <AnimatePresence>
            {showForm && (
              <motion.div className={styles.formWrap} initial={{ maxHeight: 0, opacity: 0 }} animate={{ maxHeight: 500, opacity: 1 }} exit={{ maxHeight: 0, opacity: 0 }} transition={{ duration: 0.35 }} style={{ overflow: 'hidden', width: '100%', maxWidth: 480 }}>
                <WaitlistForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  )
}
