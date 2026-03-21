import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WaitlistForm from '../../components/WaitlistForm/WaitlistForm'
import StablecoinStrip from '../../components/StablecoinStrip/StablecoinStrip'
import { COIN_LOGOS, FLAG } from '../../constants/coinLogos'
import styles from './GlobalAccounts.module.css'

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

const accounts = [
  {
    flagCode: 'US', country: 'United States', name: 'Virtual US Account',
    d1: 'Account: •••• 4821', d2: 'Routing: •••• 0072',
    rails: ['ACH', 'FedWire'],
    body: 'Get a real US account number and routing number. Receive ACH payments from American clients and platforms — just like a local US account holder. No US residency required.'
  },
  {
    flagCode: 'GB', country: 'United Kingdom', name: 'Virtual UK Account',
    d1: 'Sort Code: **-**-**', d2: 'Account: **** 7634',
    rails: ['Faster Payments', 'BACS'],
    body: 'A real UK sort code and account number. Receive GBP payments instantly from UK clients, employers, and platforms. No UK residency required.'
  },
  {
    flagCode: 'EU', country: 'European Union', name: 'Virtual EU Account',
    d1: 'IBAN: GB** **** **** ****', d2: 'BIC: VNL****',
    rails: ['SEPA', 'SEPA Instant'],
    body: 'A real EU IBAN. Accept euro payments from across 36 SEPA countries. Pan-European reach, instant payments, zero borders. No EU residency required.'
  },
]

const depositMethods = [
  {
    label: 'BANK TRANSFER', title: 'Deposit From Your Bank',
    desc: 'Send from your existing bank account. US, UK and EU bank transfers all land directly in your Venlopay balance.',
    features: ['ACH transfers (US — same day)', 'FedWire (US — instant)', 'Faster Payments (UK — instant)', 'SEPA (EU — same day)', 'Real-time deposit tracking', 'Fees shown upfront'],
  },
  {
    label: 'STABLECOINS', title: 'Deposit Any Stablecoin',
    desc: 'Send from any wallet, any exchange, on any supported chain. 14 stablecoins, 11 chains — if it exists, we accept it.',
    features: ['14 supported stablecoins', '11 supported chains', 'Balance reflects instantly', 'Rate shown before confirming', 'No hidden spreads', 'QR code or address copy'],
  },
  {
    label: 'CRYPTO', title: 'Deposit Crypto Directly',
    desc: 'Send crypto directly to your Venlopay account. It settles to your balance automatically — ready to send as fiat or spend with your card.',
    features: ['Send crypto from any wallet', 'Auto-settles to your balance', 'Send out as fiat to any bank', 'Spend via your Venlopay card'],
  },
  {
    label: 'EXCHANGES & WALLETS', title: 'Direct from Your Exchange or Wallet',
    desc: 'Simple wallet-to-wallet transfers. No middlemen, no extra steps. Works with every major exchange and self-custody wallet.',
    features: ['Works with all major exchanges', 'Works with all self-custody wallets', 'QR code or address copy flow', 'Auto-detects network and status', 'No middlemen — direct only'],
  },
]

const faqs = [
  { q: 'What is a Venlopay virtual account?', a: 'Venlopay connects you to local banking systems in 190+ countries — so anyone can send money to your local bank account in your local currency. Additionally, Venlopay offers flagship virtual accounts in the US, UK and EU available to every user regardless of their country.' },
  { q: 'Do I need to be a US resident to get a US virtual account?', a: 'No. Any Venlopay user regardless of their country can get a US virtual account and receive ACH and FedWire transfers just like a local.' },
  { q: 'Can I have virtual accounts in multiple currencies simultaneously?', a: 'Yes. Venlopay gives every user access to flagship virtual accounts in the US, UK and EU simultaneously — all under one Venlopay account.' },
  { q: 'Which countries can I receive money from?', a: 'You can receive money from 190+ countries. Venlopay connects to local banking systems globally, so senders can use their local payment rails to send to your Venlopay account.' },
  { q: 'How do I fund my Venlopay account?', a: 'You can fund via bank transfer (ACH, FedWire, Faster Payments, SEPA), stablecoin deposit from any wallet or exchange, or direct crypto deposit.' },
  { q: 'Are fees shown upfront?', a: 'Yes. All fees are shown clearly before you confirm any transaction. What you see is what you pay — no hidden spreads, no surprise deductions.' },
]

export default function GlobalAccounts() {
  const [showForm, setShowForm] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroInner}>
          <motion.div className={styles.pill} variants={fadeUp(0.15)}>GLOBAL ACCOUNTS</motion.div>
          <motion.h1 className={styles.heroHeadline} variants={fadeUp(0.3)}>Make Money Move</motion.h1>
          <motion.p className={styles.heroSub} variants={fadeUp(0.42)}>
            Effortlessly fund your account with any stablecoin and send, spend, and receive fiat with no limits.
          </motion.p>

          <motion.div className={styles.statsStrip} variants={fadeUp(0.52)}>
            {[['190+', 'Countries'], ['30+', 'Currencies'], ['Instant', 'Settlement']].map(([n, l], i) => (
              <div key={i} className={styles.statItem}>
                <span className={styles.statNum}>{n}</span>
                <span className={styles.statLabel}>{l}</span>
              </div>
            ))}
          </motion.div>

          <motion.button className={styles.heroCta} onClick={() => setShowForm(s => !s)} variants={fadeUp(0.65)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
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
      </section>

      <StablecoinStrip label="FUND YOUR ACCOUNT WITH ANY STABLECOIN" />

      {/* LOCAL BANKING + FLAGSHIP ACCOUNTS */}
      <section className={styles.accountsSection}>
        <div className={styles.sectionInner}>
          <motion.div className={styles.pill} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>GLOBAL ACCOUNTS</motion.div>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Every Local Bank. Every Country. One Account.
          </motion.h2>
          <motion.p className={styles.sectionSub} variants={fadeUp(0.18)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Venlopay connects you to local banking systems in 190+ countries — so your recipient in Japan gets yen, your client in Brazil gets reais, and your supplier in Germany gets euros. All from your one Venlopay account. Plus, get exclusive access to flagship virtual accounts in the US, UK and EU.
          </motion.p>

          <motion.p className={styles.globalStatement} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.1 }}>
            "Wherever they bank. Whatever their currency. Venlopay gets it there."
          </motion.p>

          <div className={styles.flagsPill}>
            <span className={styles.flagsLabel}>FLAGSHIP VIRTUAL ACCOUNTS</span>
          </div>

          <motion.div className={styles.accountCards} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {accounts.map((acc, i) => (
              <motion.div key={i} className={styles.accountCard} variants={cardItem} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <div className={styles.accTop}>
                  <img src={FLAG[acc.flagCode]} alt={acc.country} className={styles.accFlag} width={32} height={21} style={{ objectFit: 'cover', borderRadius: 3, flexShrink: 0 }} />
                  <div>
                    <p className={styles.accCountry}>{acc.country}</p>
                    <p className={styles.accName}>{acc.name}</p>
                  </div>
                  <span className={styles.flagshipBadge}>Flagship Account</span>
                </div>
                <div className={styles.accDetails}>
                  <div className={styles.accDetailRow}>
                    <span className={styles.accDetailVal}>{acc.d1}</span>
                    <span className={styles.accDetailCopy}>Copy</span>
                  </div>
                  <div className={styles.accDetailDivider} />
                  <div className={styles.accDetailRow}>
                    <span className={styles.accDetailVal}>{acc.d2}</span>
                    <span className={styles.accDetailCopy}>Copy</span>
                  </div>
                </div>
                <div className={styles.railsRow}>
                  {acc.rails.map(r => <span key={r} className={styles.railChip}>{r}</span>)}
                </div>
                <p className={styles.accBody}>{acc.body}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p className={styles.everyoneText} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.2 }}>
            "Every user. Every country. Same access. No exceptions."
          </motion.p>
          <p className={styles.comingSoon}>
            More flagship regions coming —{' '}
            <img src={FLAG.SG} alt="SG" width={16} height={11} style={{ objectFit: 'cover', borderRadius: 1, verticalAlign: 'middle' }} /> Singapore ·{' '}
            <img src={FLAG.AE} alt="AE" width={16} height={11} style={{ objectFit: 'cover', borderRadius: 1, verticalAlign: 'middle' }} /> UAE ·{' '}
            <img src={FLAG.CA} alt="CA" width={16} height={11} style={{ objectFit: 'cover', borderRadius: 1, verticalAlign: 'middle' }} /> Canada ·{' '}
            <img src={FLAG.AU} alt="AU" width={16} height={11} style={{ objectFit: 'cover', borderRadius: 1, verticalAlign: 'middle' }} /> Australia
          </p>
        </div>
      </section>

      {/* DEPOSIT SOURCES */}
      <section className={styles.depositSection}>
        <div className={styles.sectionInner}>
          <motion.div className={styles.pill} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>FUNDING YOUR ACCOUNT</motion.div>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>Your Money, Every Way In</motion.h2>
          <motion.p className={styles.sectionSub} variants={fadeUp(0.18)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Four ways to put money into your Venlopay account — every path leads to the same powerful global balance.
          </motion.p>

          <div className={styles.depositMethods}>
            {/* BANK TRANSFER */}
            <motion.div className={styles.depositRow} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.1 }}>
              <div className={styles.depositLeft}>
                <span className={styles.depositLabel}>BANK TRANSFER</span>
                <h3 className={styles.depositTitle}>Deposit From Your Bank</h3>
                <p className={styles.depositDesc}>Send from your existing bank account. US, UK and EU bank transfers all land directly in your Venlopay balance.</p>
                <ul className={styles.featureList}>
                  {depositMethods[0].features.map((f, j) => <li key={j} className={styles.featureItem}><span className={styles.checkMark}>✓</span>{f}</li>)}
                </ul>
              </div>
              <div className={styles.depositRight}>
                <div className={styles.depositMockup}>
                  <div className={styles.depositMockupHead}>Incoming Transfer</div>
                  <div className={styles.depositMockupBody}>
                    <div className={styles.depositMockupRow}>
                      <div className={styles.depositMockupLeft}>
                        <img src={FLAG.US} alt="US" width={16} height={11} style={{ objectFit: 'cover', borderRadius: 1, flexShrink: 0 }} />
                        <span>ACH</span>
                      </div>
                      <span className={styles.depositMockupRight}>⚡ Same day</span>
                    </div>
                    <div className={styles.depositMockupDivider} />
                    <div className={styles.depositMockupRow}>
                      <div className={styles.depositMockupLeft}>
                        <img src={FLAG.GB} alt="GB" width={16} height={11} style={{ objectFit: 'cover', borderRadius: 1, flexShrink: 0 }} />
                        <span>Faster Payments</span>
                      </div>
                      <span className={styles.depositMockupRight}>⚡ Instant</span>
                    </div>
                    <div className={styles.depositMockupDivider} />
                    <div className={styles.depositMockupRow}>
                      <div className={styles.depositMockupLeft}>
                        <img src={FLAG.EU} alt="EU" width={16} height={11} style={{ objectFit: 'cover', borderRadius: 1, flexShrink: 0 }} />
                        <span>SEPA</span>
                      </div>
                      <span className={styles.depositMockupRight}>⚡ Same day</span>
                    </div>
                  </div>
                  <div className={styles.depositMockupStatus}><div className={styles.depositMockupStatusDot} />Lands in your balance instantly</div>
                </div>
              </div>
            </motion.div>

            {/* STABLECOINS */}
            <motion.div className={styles.depositRow} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.1 }}>
              <div className={styles.depositLeft}>
                <span className={styles.depositLabel}>STABLECOINS</span>
                <h3 className={styles.depositTitle}>Deposit Any Stablecoin</h3>
                <p className={styles.depositDesc}>Send from any wallet, any exchange, on any supported chain. 14 stablecoins, 11 chains — if it exists, we accept it.</p>
                <ul className={styles.featureList}>
                  {depositMethods[1].features.map((f, j) => <li key={j} className={styles.featureItem}><span className={styles.checkMark}>✓</span>{f}</li>)}
                </ul>
              </div>
              <div className={styles.depositRight}>
                <div className={styles.depositMockup}>
                  <div className={styles.depositMockupHead}>Deposit Stablecoin</div>
                  <div className={styles.depositMockupBody}>
                    <div className={styles.depositMockupRow}>
                      <div className={styles.depositMockupLeft}>
                        <img src={COIN_LOGOS.USDT} alt="USDT" style={{ width: 18, height: 18, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                        <span>USDT</span><span className={styles.depositMockupChip}>Tether</span>
                      </div>
                    </div>
                    <div className={styles.depositMockupDivider} />
                    <div className={styles.depositMockupRow}>
                      <div className={styles.depositMockupLeft}><span>Network</span></div>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {['ERC-20', 'TRC-20', 'BEP-20'].map(n => <span key={n} className={styles.depositMockupChip}>{n}</span>)}
                      </div>
                    </div>
                    <div className={styles.depositMockupDivider} />
                    <div className={styles.depositMockupRow}>
                      <span className={styles.depositMockupAddr}>0x4f3a…c82d</span>
                      <span className={styles.depositMockupCopy}>Copy</span>
                    </div>
                  </div>
                  <div className={styles.depositMockupStatus}><div className={styles.depositMockupStatusDot} />Balance reflects instantly</div>
                </div>
              </div>
            </motion.div>

            {/* CRYPTO */}
            <motion.div className={styles.depositRow} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.1 }}>
              <div className={styles.depositLeft}>
                <span className={styles.depositLabel}>CRYPTO</span>
                <h3 className={styles.depositTitle}>Deposit Crypto Directly</h3>
                <p className={styles.depositDesc}>Send crypto directly to your Venlopay account. It settles to your balance automatically — ready to send as fiat or spend with your card.</p>
                <ul className={styles.featureList}>
                  {depositMethods[2].features.map((f, j) => <li key={j} className={styles.featureItem}><span className={styles.checkMark}>✓</span>{f}</li>)}
                </ul>
              </div>
              <div className={styles.depositRight}>
                <div className={styles.depositMockup}>
                  <div className={styles.depositMockupHead}>Crypto Deposit</div>
                  <div className={styles.depositMockupBody}>
                    <div className={styles.depositMockupRow}>
                      <div className={styles.depositMockupLeft}><span>From</span></div>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}>Your Wallet</span>
                    </div>
                    <div className={styles.depositMockupArrow}>↓</div>
                    <div className={styles.depositMockupRow}>
                      <div className={styles.depositMockupLeft}><span>To</span></div>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}>Venlopay Account</span>
                    </div>
                    <div className={styles.depositMockupDivider} />
                    <div className={styles.depositMockupRow}>
                      <div className={styles.depositMockupLeft}><span>Settlement</span></div>
                      <span className={styles.depositMockupRight}>✓ Auto-settles</span>
                    </div>
                  </div>
                  <div className={styles.depositMockupStatus}><div className={styles.depositMockupStatusDot} />Ready to send as fiat</div>
                </div>
              </div>
            </motion.div>

            {/* EXCHANGES & WALLETS */}
            <motion.div className={styles.depositRow} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.1 }}>
              <div className={styles.depositLeft}>
                <span className={styles.depositLabel}>EXCHANGES & WALLETS</span>
                <h3 className={styles.depositTitle}>Direct from Your Exchange or Wallet</h3>
                <p className={styles.depositDesc}>Simple wallet-to-wallet transfers. No middlemen, no extra steps. Works with every major exchange and self-custody wallet.</p>
                <ul className={styles.featureList}>
                  {depositMethods[3].features.map((f, j) => <li key={j} className={styles.featureItem}><span className={styles.checkMark}>✓</span>{f}</li>)}
                </ul>
              </div>
              <div className={styles.depositRight}>
                <div className={styles.depositMockup}>
                  <div className={styles.depositMockupHead}>From Exchange or Wallet</div>
                  <div className={styles.depositMockupBody}>
                    <div className={styles.depositMockupRow}>
                      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                        {['Binance', 'Coinbase', 'MetaMask', 'Kraken'].map(e => <span key={e} className={styles.depositMockupChip}>{e}</span>)}
                      </div>
                    </div>
                    <div className={styles.depositMockupDivider} />
                    <div className={styles.depositMockupRow}>
                      <span className={styles.depositMockupAddr}>0x4f3a…c82d</span>
                      <span className={styles.depositMockupCopy}>Copy</span>
                    </div>
                    <div className={styles.depositMockupDivider} />
                    <div className={styles.depositMockupRow}>
                      <div className={styles.depositMockupLeft}><span>Route</span></div>
                      <span className={styles.depositMockupRight}>✓ Direct · No middlemen</span>
                    </div>
                  </div>
                  <div className={styles.depositMockupStatus}><div className={styles.depositMockupStatusDot} />Auto-detects network & status</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY VENLOPAY */}
      <section className={styles.whySection}>
        <div className={styles.sectionInner}>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>Move Money At The Speed of You</motion.h2>
          <motion.p className={styles.sectionSub} variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>Venlopay connects traditional banking to the speed of stablecoins.</motion.p>
          <motion.div className={styles.whyGrid} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { icon: '💱', title: 'Every Local Currency', body: 'Your recipient in Japan gets yen. Your client in Brazil gets reais. Your supplier in Germany gets euros. 30+ currencies covered.', chips: ['JPY', 'BRL', 'EUR', 'NGN', 'INR', 'GBP', '+25 more'] },
              { icon: '🔄', title: 'Any Stablecoin In, Any Fiat Out', body: 'Deposit any of 14 stablecoins across 11 chains. Your balance is instantly ready to send as local fiat to any bank anywhere.', chips: ['USDT → USD', 'USDC → EUR', 'USDT → GBP', 'USDC → NGN'] },
              { icon: '🌍', title: 'No Geographic Limits', body: 'Every user from every country gets the same access — send to any local bank, receive into your local bank, and access flagship virtual accounts in the US, UK and EU.', chips: ['US Account', 'UK Account', 'EU Account', '190+ countries'] },
              { icon: '👁', title: 'Always Transparent', body: 'Fees, exchange rates and transaction status are always visible before you confirm. No surprises. Ever.', chips: ['Fee shown upfront', 'Live FX rate', 'No hidden spreads', 'Real-time status'] },
            ].map((card, i) => (
              <motion.div key={i} className={styles.whyCard} variants={cardItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                <div className={styles.whyIcon}>{card.icon}</div>
                <h3 className={styles.whyTitle}>{card.title}</h3>
                <p className={styles.whyBody}>{card.body}</p>
                <div className={styles.whyDataRow}>
                  {card.chips.map(c => <span key={c} className={styles.whyDataChip}>{c}</span>)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>Frequently Asked Questions</motion.h2>
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
            Your Global Payment Passport Starts Here
          </motion.h2>
          <motion.p className={styles.ctaSub} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.1 }}>
            Join thousands of people already on the waitlist.
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
