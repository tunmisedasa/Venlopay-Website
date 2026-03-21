import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WaitlistForm from '../../components/WaitlistForm/WaitlistForm'
import { COIN_LOGOS, coinImgProps, FLAG } from '../../constants/coinLogos'
import styles from './Send.module.css'

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

const receiveExamples = [
  { flagCode: 'US', name: 'Sarah M.', country: 'New York, USA', amount: '$2,400.00', currency: 'USD', time: '< 1 min', rail: 'ACH' },
  { flagCode: 'GB', name: 'James T.', country: 'London, UK', amount: '£1,850.00', currency: 'GBP', time: 'Instant', rail: 'Faster Payments' },
  { flagCode: 'EU', name: 'Marie D.', country: 'Paris, France', amount: '€2,100.00', currency: 'EUR', time: 'Instant', rail: 'SEPA Instant' },
  { flagCode: 'CA', name: 'Liam K.', country: 'Toronto, Canada', amount: 'CA$3,200.00', currency: 'CAD', time: '< 2 hrs', rail: 'Interac' },
  { flagCode: 'AU', name: 'Emma R.', country: 'Sydney, Australia', amount: 'A$3,600.00', currency: 'AUD', time: '< 1 hr', rail: 'NPP' },
  { flagCode: 'JP', name: 'Kenji W.', country: 'Tokyo, Japan', amount: '¥320,000', currency: 'JPY', time: '< 2 hrs', rail: 'Zengin' },
]

const sendMethods = [
  {
    icon: '🏦', title: 'Bank Transfer',
    desc: 'Send directly to any bank account in 190+ countries. Recipients get local currency via local rails — ACH, Faster Payments, SEPA, and more.',
    tags: ['190+ countries', 'Local rails', 'Local currency'],
  },
  {
    icon: '💳', title: 'Card Spend',
    desc: 'Use your Venlopay card to pay anywhere in the world. Your Venlopay balance converts to local currency at the point of sale.',
    tags: ['Global acceptance', 'Instant conversion', 'Any currency'],
  },
  {
    icon: '🔗', title: 'Stablecoin Transfer',
    desc: 'Send stablecoins directly to any wallet address on any supported chain. 14 stablecoins, 11 chains — fast, borderless, and final.',
    tags: ['14 stablecoins', '11 chains', 'Wallet-to-wallet'],
  },
]

const whyCards = [
  { icon: '⚡', title: 'Instant or Near-Instant', body: 'Most sends arrive in seconds. Even cross-border bank transfers settle in minutes to hours — not days.' },
  { icon: '👁', title: 'Fees Shown Upfront', body: 'See the exact fee and exchange rate before you confirm. No surprises. No hidden spreads. What you see is what you pay.' },
  { icon: '🌍', title: '190+ Countries', body: 'Send to any bank account in 190+ countries. Your recipient gets local currency via local payment rails.' },
  { icon: '🔒', title: 'Secure by Design', body: 'Every transaction is verified and tracked. You get real-time status updates from send to delivery.' },
]

const transactions = [
  { fromCode: 'US', toCode: 'GB', toName: 'James T.', toBank: 'Barclays UK', sentTicker: 'USDC', sentAmt: '2,000', received: '£1,580.00', fee: '$2.00', time: '< 1 min', status: 'Delivered', rail: 'Faster Payments' },
  { fromCode: 'US', toCode: 'EU', toName: 'Marie D.', toBank: 'BNP Paribas', sentTicker: 'USDT', sentAmt: '1,500', received: '€1,380.00', fee: '$1.50', time: 'Instant', status: 'Delivered', rail: 'SEPA Instant' },
  { fromCode: 'US', toCode: 'JP', toName: 'Kenji W.', toBank: 'MUFG Bank', sentTicker: 'USDC', sentAmt: '3,000', received: '¥450,000', fee: '$3.00', time: '< 2 hrs', status: 'Delivered', rail: 'Zengin' },
  { fromCode: 'US', toCode: 'CA', toName: 'Liam K.', toBank: 'TD Canada', sentTicker: 'EURC', sentAmt: '800', received: 'CA$1,160.00', fee: '$1.00', time: '< 2 hrs', status: 'Delivered', rail: 'Interac' },
  { fromCode: 'US', toCode: 'AU', toName: 'Emma R.', toBank: 'Commonwealth', sentTicker: 'USDT', sentAmt: '2,500', received: 'A$3,850.00', fee: '$2.50', time: '< 1 hr', status: 'Delivered', rail: 'NPP' },
  { fromCode: 'US', toCode: 'BR', toName: 'Carlos M.', toBank: 'Itaú', sentTicker: 'USDC', sentAmt: '1,200', received: 'R$6,200.00', fee: '$1.20', time: '< 3 hrs', status: 'Delivered', rail: 'PIX' },
]

const faqs = [
  { q: 'How do I send money with Venlopay?', a: "Fund your Venlopay account with any stablecoin, then choose your recipient's bank account or wallet address. Enter the amount, review the fee and exchange rate, and confirm. That's it." },
  { q: 'How fast do sends arrive?', a: 'Most sends arrive in seconds to minutes. Bank transfers to the US, UK and EU typically arrive instantly or within the hour. Other countries vary by local rail — all times are shown before you confirm.' },
  { q: 'What currencies can I send?', a: 'You can send to 190+ countries in 30+ local currencies. Your recipient always receives their local currency via local payment rails.' },
  { q: 'Are fees shown before I confirm?', a: 'Yes. The exact fee and exchange rate are always shown before you confirm any send. No hidden charges, no surprise deductions.' },
  { q: 'Can I send stablecoins directly to a wallet?', a: 'Yes. You can send any of 14 supported stablecoins to any wallet address on any of 11 supported chains — directly, wallet-to-wallet.' },
]

export default function Send() {
  const [showForm, setShowForm] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [activeExample, setActiveExample] = useState(0)

  return (
    <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroInner}>
          <motion.div className={styles.pill} variants={fadeUp(0.15)}>SEND MONEY</motion.div>
          <motion.h1 className={styles.heroHeadline} variants={fadeUp(0.3)}>
            Send Anywhere.<br />Arrive Instantly.
          </motion.h1>
          <motion.p className={styles.heroSub} variants={fadeUp(0.42)}>
            Fund with any stablecoin. Send to any bank in 190+ countries. Your recipient gets local currency — fast.
          </motion.p>

          <motion.div className={styles.flowDiagram} variants={fadeUp(0.52)}>
            <div className={styles.flowNode}>
              <div className={styles.flowNodeIcon}>💰</div>
              <span className={styles.flowNodeLabel}>Your Stablecoin</span>
            </div>
            <div className={styles.flowArrow}>
              <div className={styles.flowArrowLine} />
              <motion.div className={styles.flowDot} animate={{ x: [0, 80, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
            </div>
            <div className={styles.flowNode}>
              <div className={styles.flowNodeIcon}>⚡</div>
              <span className={styles.flowNodeLabel}>Venlopay</span>
            </div>
            <div className={styles.flowArrow}>
              <div className={styles.flowArrowLine} />
              <motion.div className={styles.flowDot} animate={{ x: [0, 80, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
            </div>
            <div className={styles.flowNode}>
              <div className={styles.flowNodeIcon}>🏦</div>
              <span className={styles.flowNodeLabel}>Any Bank</span>
            </div>
          </motion.div>

          <motion.div className={styles.receiveCarousel} variants={fadeUp(0.62)}>
            <AnimatePresence mode="wait">
              <motion.div key={activeExample} className={styles.receiveCard}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <img src={FLAG[receiveExamples[activeExample].flagCode]} alt={receiveExamples[activeExample].country} className={styles.receiveFlag} width={28} height={19} style={{ objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
                <div className={styles.receiveInfo}>
                  <span className={styles.receiveName}>{receiveExamples[activeExample].name}</span>
                  <span className={styles.receiveCountry}>{receiveExamples[activeExample].country}</span>
                </div>
                <div className={styles.receiveRight}>
                  <span className={styles.receiveAmount}>{receiveExamples[activeExample].amount}</span>
                  <span className={styles.receiveTime}>✓ {receiveExamples[activeExample].time} · {receiveExamples[activeExample].rail}</span>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className={styles.carouselDots}>
              {receiveExamples.map((_, i) => (
                <button key={i} className={`${styles.carouselDot} ${i === activeExample ? styles.carouselDotActive : ''}`} onClick={() => setActiveExample(i)} aria-label={`Example ${i + 1}`} />
              ))}
            </div>
          </motion.div>

          <motion.button className={styles.heroCta} onClick={() => setShowForm(s => !s)} variants={fadeUp(0.75)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
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

      {/* HOW A SEND WORKS — horizontal stepper */}
      <section className={styles.howSection}>
        <div className={styles.sectionInner}>
          <motion.div className={styles.pill} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>HOW IT WORKS</motion.div>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>Four Steps. Any Country.</motion.h2>
          <motion.div className={styles.stepsRow} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>

            {/* Step 01 */}
            <motion.div className={styles.step} variants={cardItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className={styles.stepNum}>01</div>
              <div className={styles.stepIcon}>💰</div>
              <h3 className={styles.stepTitle}>Fund Your Account</h3>
              <p className={styles.stepBody}>Deposit any stablecoin from any wallet or exchange. Your balance is ready instantly.</p>
              <div className={styles.stepMiniUI}>
                <div className={styles.stepMiniRow}>
                  <div className={styles.coinLogoWrap}><img src="https://coin-images.coingecko.com/coins/images/325/small/Tether.png" alt="USDT" className={styles.coinLogoImg} /></div>
                  <span className={styles.stepMiniVal}>USDT</span>
                  <span className={styles.stepMiniGreen}>$2,500 credited</span>
                </div>
              </div>
            </motion.div>

            {/* Step 02 */}
            <motion.div className={styles.step} variants={cardItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className={styles.stepNum}>02</div>
              <div className={styles.stepIcon}>🎯</div>
              <h3 className={styles.stepTitle}>Choose Your Recipient</h3>
              <p className={styles.stepBody}>Enter a bank account, IBAN, or wallet address. Venlopay auto-detects the country and currency.</p>
              <div className={styles.stepMiniUI}>
                <div className={styles.stepMiniRow}>
                  <img src={FLAG.GB} alt="UK" width={18} height={12} style={{ objectFit: 'cover', borderRadius: 1, flexShrink: 0 }} />
                  <span className={styles.stepMiniVal}>James T.</span>
                  <span className={styles.stepMiniLabel}>Barclays UK</span>
                </div>
              </div>
            </motion.div>

            {/* Step 03 */}
            <motion.div className={styles.step} variants={cardItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className={styles.stepNum}>03</div>
              <div className={styles.stepIcon}>👁</div>
              <h3 className={styles.stepTitle}>Review Fee &amp; Rate</h3>
              <p className={styles.stepBody}>See the exact fee and exchange rate before you confirm. No surprises.</p>
              <div className={styles.stepMiniUI}>
                <div className={styles.stepMiniRow}>
                  <span className={styles.stepMiniLabel}>Fee:</span>
                  <span className={styles.stepMiniVal}>$2.00</span>
                </div>
                <div className={styles.stepMiniRow} style={{ marginTop: 4 }}>
                  <span className={styles.stepMiniLabel}>Rate:</span>
                  <span className={styles.stepMiniVal}>1 GBP = 1.26 USD</span>
                  <span className={styles.stepMiniGreen}>Transparent</span>
                </div>
              </div>
            </motion.div>

            {/* Step 04 */}
            <motion.div className={styles.step} variants={cardItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className={styles.stepNum}>04</div>
              <div className={styles.stepIcon}>✅</div>
              <h3 className={styles.stepTitle}>Confirm &amp; Done</h3>
              <p className={styles.stepBody}>Hit send. Your recipient gets local currency in their local bank — fast.</p>
              <div className={styles.stepMiniUI}>
                <div className={styles.stepMiniCheck}>✓</div>
                <div className={styles.stepMiniRow} style={{ justifyContent: 'center', marginTop: 6 }}>
                  <span className={styles.stepMiniGreen}>Delivered · &lt; 1 min</span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* EVERY WAY TO SEND */}
      <section className={styles.methodsSection}>
        <div className={styles.sectionInner}>
          <motion.div className={styles.pill} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>SEND OPTIONS</motion.div>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>Every Way to Send</motion.h2>
          <motion.p className={styles.sectionSub} variants={fadeUp(0.18)} initial="hidden" whileInView="visible" viewport={{ once: true }}>Three paths out. All from your Venlopay balance.</motion.p>
          <motion.div className={styles.methodsGrid} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>

            {/* Bank Transfer */}
            <motion.div className={styles.methodCard} variants={cardItem} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
              <div className={styles.methodIcon}>🏦</div>
              <h3 className={styles.methodTitle}>Bank Transfer</h3>
              <p className={styles.methodDesc}>{sendMethods[0].desc}</p>
              <div className={styles.methodTags}>
                {sendMethods[0].tags.map(t => <span key={t} className={styles.methodTag}>{t}</span>)}
              </div>
              <div className={styles.methodMiniUI}>
                <div className={styles.methodCardRow}>
                  <img src={FLAG.GB} alt="UK" width={18} height={12} style={{ objectFit: 'cover', borderRadius: 1, flexShrink: 0 }} />
                  <span className={styles.stepMiniVal}>Barclays UK</span>
                  <span className={styles.stepMiniLabel}>Faster Payments</span>
                  <span className={styles.stepMiniGreen}>⚡ Instant</span>
                </div>
              </div>
            </motion.div>

            {/* Card Spend */}
            <motion.div className={styles.methodCard} variants={cardItem} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
              <div className={styles.methodIcon}>💳</div>
              <h3 className={styles.methodTitle}>Card Spend</h3>
              <p className={styles.methodDesc}>{sendMethods[1].desc}</p>
              <div className={styles.methodTags}>
                {sendMethods[1].tags.map(t => <span key={t} className={styles.methodTag}>{t}</span>)}
              </div>
              <div className={styles.methodMiniUI}>
                <div className={styles.methodCardStrip}>
                  <div className={styles.methodCardChip} />
                  <span className={styles.methodCardBrand}>venlopay</span>
                </div>
              </div>
            </motion.div>

            {/* Stablecoin Transfer */}
            <motion.div className={styles.methodCard} variants={cardItem} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
              <div className={styles.methodIcon}>🔗</div>
              <h3 className={styles.methodTitle}>Stablecoin Transfer</h3>
              <p className={styles.methodDesc}>{sendMethods[2].desc}</p>
              <div className={styles.methodTags}>
                {sendMethods[2].tags.map(t => <span key={t} className={styles.methodTag}>{t}</span>)}
              </div>
              <div className={styles.methodMiniUI}>
                <div className={styles.methodCardRow}>
                  <div className={styles.coinLogoWrap}><img src="https://coin-images.coingecko.com/coins/images/325/small/Tether.png" alt="USDT" className={styles.coinLogoImg} /></div>
                  <span className={styles.stepMiniVal}>USDT</span>
                  <span className={styles.stepMiniLabel}>→</span>
                  <span className={styles.stepMiniVal}>0x4f2a…c819</span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* WHY VENLOPAY SENDS */}
      <section className={styles.whySection}>
        <div className={styles.sectionInner}>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>Why Venlopay Sends</motion.h2>
          <motion.div className={styles.whyGrid} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>

            {/* Instant */}
            <motion.div className={styles.whyCard} variants={cardItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className={styles.whyIcon}>⚡</div>
              <h3 className={styles.whyTitle}>Instant or Near-Instant</h3>
              <p className={styles.whyBody}>{whyCards[0].body}</p>
              <div className={styles.whyMiniUI}>
                <div className={styles.whyMiniRow}>
                  <span>Send</span>
                  <span>→</span>
                  <span>Arrive</span>
                  <span className={styles.whyMiniGreen}>&lt; 1 min</span>
                </div>
              </div>
            </motion.div>

            {/* Fees */}
            <motion.div className={styles.whyCard} variants={cardItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className={styles.whyIcon}>👁</div>
              <h3 className={styles.whyTitle}>Fees Shown Upfront</h3>
              <p className={styles.whyBody}>{whyCards[1].body}</p>
              <div className={styles.whyMiniUI}>
                <div className={styles.whyMiniRow}>
                  <span>Fee: $2.00</span>
                  <span>·</span>
                  <span>Rate: shown before confirm</span>
                </div>
              </div>
            </motion.div>

            {/* Countries */}
            <motion.div className={styles.whyCard} variants={cardItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className={styles.whyIcon}>🌍</div>
              <h3 className={styles.whyTitle}>190+ Countries</h3>
              <p className={styles.whyBody}>{whyCards[2].body}</p>
              <div className={styles.whyMiniUI}>
                <div className={styles.whyMiniRow}>
                  <img src={FLAG.US} alt="US" width={16} height={11} style={{ objectFit: 'cover', borderRadius: 1 }} />
                  <img src={FLAG.GB} alt="GB" width={16} height={11} style={{ objectFit: 'cover', borderRadius: 1 }} />
                  <img src={FLAG.DE} alt="DE" width={16} height={11} style={{ objectFit: 'cover', borderRadius: 1 }} />
                  <img src={FLAG.NG} alt="NG" width={16} height={11} style={{ objectFit: 'cover', borderRadius: 1 }} />
                  <img src={FLAG.SG} alt="SG" width={16} height={11} style={{ objectFit: 'cover', borderRadius: 1 }} />
                  <span className={styles.whyMiniGreen}>...and 185 more</span>
                </div>
              </div>
            </motion.div>

            {/* Secure */}
            <motion.div className={styles.whyCard} variants={cardItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className={styles.whyIcon}>🔒</div>
              <h3 className={styles.whyTitle}>Secure by Design</h3>
              <p className={styles.whyBody}>{whyCards[3].body}</p>
              <div className={styles.whyMiniUI}>
                <div className={styles.whyMiniRow}>
                  <span className={styles.whyMiniGreen}>✓ Verified</span>
                  <span>·</span>
                  <span className={styles.whyMiniGreen}>✓ Tracked</span>
                  <span>·</span>
                  <span className={styles.whyMiniGreen}>✓ Real-time</span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* SAMPLE TRANSACTIONS — receipt style */}
      <section className={styles.txSection}>
        <div className={styles.sectionInner}>
          <motion.div className={styles.pill} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>SAMPLE TRANSACTIONS</motion.div>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>See It in Action</motion.h2>
          <motion.p className={styles.sectionSub} variants={fadeUp(0.18)} initial="hidden" whileInView="visible" viewport={{ once: true }}>Real-world examples of what a Venlopay send looks like.</motion.p>
          <motion.div className={styles.txGrid} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {transactions.map((tx, i) => (
              <motion.div key={i} className={styles.txCardNew} variants={cardItem} whileHover={{ y: -3, transition: { duration: 0.2 } }}>
                <div className={styles.txCardHeader}>
                  <img src={FLAG[tx.fromCode]} alt={tx.fromCode} className={styles.txCardFlag} width={24} height={16} style={{ objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
                  <span className={styles.txCardArrow}>→</span>
                  <img src={FLAG[tx.toCode]} alt={tx.toCode} className={styles.txCardFlag} width={24} height={16} style={{ objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div className={styles.txCardName}>{tx.toName}</div>
                    <div className={styles.txCardBank}>{tx.toBank}</div>
                  </div>
                </div>
                <div className={styles.txCardAmounts}>
                  <div className={styles.txCardSentRow}>
                    <img {...coinImgProps(tx.sentTicker, 16)} />
                    <div className={styles.txCardSent}>{tx.sentTicker} {tx.sentAmt}</div>
                  </div>
                  <div className={styles.txCardReceived}>{tx.received}</div>
                </div>
                <div className={styles.txCardFooter}>
                  <span className={styles.txCardRail}>{tx.rail}</span>
                  <div className={styles.txCardStatus}>
                    <span className={styles.txCardStatusDot} />
                    {tx.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>Send FAQs</motion.h2>
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
            Start Sending the Smart Way
          </motion.h2>
          <motion.p className={styles.ctaSub} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.1 }}>
            Join thousands already on the waitlist.
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
