import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WaitlistForm from '../../components/WaitlistForm/WaitlistForm'
import styles from './Card.module.css'

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

const cardDesigns = [
  {
    name: 'The Signature', tagline: 'Refined & Minimal',
    bg: 'linear-gradient(135deg, #0A0A0A 0%, #1C1C1C 60%, #111111 100%)',
    border: 'rgba(255,255,255,0.1)', shimmer: true,
    textColor: 'rgba(255,255,255,0.9)', accentColor: 'rgba(255,255,255,0.06)',
  },
  {
    name: 'The Violet', tagline: 'Bold & Vivid',
    bg: 'linear-gradient(135deg, #3B1F7A 0%, #6B3DB5 50%, #7B4FBF 100%)',
    border: 'rgba(155,111,223,0.5)', glow: 'rgba(123,79,191,0.5)',
    textColor: 'rgba(255,255,255,0.95)', accentColor: 'rgba(255,255,255,0.1)',
  },
  {
    name: 'The Obsidian', tagline: 'Dark & Premium',
    bg: 'linear-gradient(135deg, #0D0D1A 0%, #1A1A2E 50%, #0F0F20 100%)',
    border: 'rgba(100,120,255,0.2)',
    textColor: 'rgba(255,255,255,0.9)', accentColor: 'rgba(100,120,255,0.08)',
  },
  {
    name: 'The Eclipse', tagline: 'Deep & Cinematic',
    bg: 'linear-gradient(135deg, #0D0D0D 0%, #2D1B4E 50%, #0D0D0D 100%)',
    border: 'rgba(123,79,191,0.3)',
    textColor: 'rgba(255,255,255,0.9)', accentColor: 'rgba(123,79,191,0.1)',
  },
]

function NetworkMark({ color = 'rgba(255,255,255,0.5)' }) {
  return (
    <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
      <circle cx="11" cy="10" r="9" fill={color} fillOpacity="0.7" />
      <circle cx="21" cy="10" r="9" fill={color} fillOpacity="0.5" />
    </svg>
  )
}

function CardFace({ card, size = 'large' }) {
  const isLarge = size === 'large'
  const w = isLarge ? 340 : '100%'
  const h = isLarge ? 214 : undefined
  return (
    <div
      className={isLarge ? styles.fanCard : styles.showcaseCard}
      style={{ background: card.bg, border: `1px solid ${card.border}`, width: w, height: h, position: 'relative', overflow: 'hidden' }}
    >
      <div className={styles.cardWatermark} style={{ color: card.accentColor }}>venlopay</div>
      <div className={styles.cardTopRow}>
        <div className={styles.cardChip} />
        <NetworkMark color={card.textColor} />
      </div>
      <div className={styles.cardBottomRow}>
        <span className={styles.cardWordmark} style={{ color: card.textColor }}>venlopay</span>
      </div>
      {card.shimmer && <div className={styles.shimmer} />}
      {card.glow && (
        <div className={styles.cardGlowOverlay} style={{ background: `radial-gradient(ellipse at 60% 40%, ${card.glow} 0%, transparent 70%)` }} />
      )}
    </div>
  )
}

const faqs = [
  { q: 'What is the Venlopay card?', a: 'The Venlopay card is your physical and virtual spending card. Fund it from your Venlopay balance and use it to pay for things anywhere in the world or withdraw local currencies at ATMs globally.' },
  { q: 'Where can I use the Venlopay card?', a: 'Everywhere cards are accepted globally — in-store, online, and at ATMs worldwide. You can withdraw in local currencies wherever you are.' },
  { q: 'How do I fund my Venlopay card?', a: 'Fund it directly from your Venlopay balance — instantly credited to your card.' },
  { q: 'Can I freeze my card?', a: 'Yes. You can freeze and unfreeze your Venlopay card instantly from the app. You can also set spending limits and control where your card can be used.' },
  { q: 'Are there ATM withdrawal fees?', a: 'Fees are shown upfront before you confirm any withdrawal. What you see is what you pay — no hidden charges.' },
  { q: 'When will the card be available?', a: 'Join the waitlist to be among the first to receive your Venlopay card when we launch.' },
]

export default function Card() {
  const [activeCard, setActiveCard] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroInner}>
          <motion.div className={styles.pill} variants={fadeUp(0.15)}>VENLOPAY CARD</motion.div>
          <motion.h1 className={styles.heroHeadline} variants={fadeUp(0.3)}>One Card. The Whole World.</motion.h1>
          <motion.p className={styles.heroSub} variants={fadeUp(0.42)}>
            Fund it from your balance. Spend in any currency. Withdraw cash in any country.
          </motion.p>

          <motion.div className={styles.cardShowcase} variants={fadeUp(0.52)}>
            <div className={styles.cardFanWrap}>
              {cardDesigns.map((card, i) => {
                const offset = i - activeCard
                return (
                  <motion.div
                    key={i}
                    className={styles.fanSlot}
                    animate={{
                      rotate: offset * -14, x: offset * 28,
                      y: Math.abs(offset) * 6,
                      scale: i === activeCard ? 1 : 0.9 - Math.abs(offset) * 0.03,
                      zIndex: i === activeCard ? 10 : 5 - Math.abs(offset),
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    onClick={() => setActiveCard(i)}
                    whileHover={i !== activeCard ? { y: -6, scale: 0.93 } : {}}
                    style={{ cursor: i !== activeCard ? 'pointer' : 'default' }}
                  >
                    <CardFace card={card} size="large" />
                  </motion.div>
                )
              })}
            </div>
            <div className={styles.cardDots}>
              {cardDesigns.map((_, i) => (
                <button key={i} className={`${styles.dot} ${i === activeCard ? styles.dotActive : ''}`} onClick={() => setActiveCard(i)} aria-label={`Select ${cardDesigns[i].name}`} />
              ))}
            </div>
            <p className={styles.activeCardName}>{cardDesigns[activeCard].name} — {cardDesigns[activeCard].tagline}</p>
          </motion.div>

          <motion.button className={styles.heroCta} onClick={() => setShowForm(s => !s)} variants={fadeUp(0.7)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
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

      {/* FEATURE HIGHLIGHTS */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionInner}>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            The Card That Goes Everywhere You Do
          </motion.h2>
          <motion.p className={styles.sectionSub} variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Powered by your Venlopay balance. Accepted in every country.
          </motion.p>
          {[
            { num: '190+', title: 'Global Acceptance', body: 'Pay for anything, anywhere in the world. In-store, online, contactless — wherever cards are accepted, your Venlopay card works.' },
            { num: 'ATM', title: 'Local Currency at Every ATM', body: 'Hit any ATM worldwide and get local cash — in the local currency of wherever you are. Travel with your Venlopay card and always have access to local money.' },
            { num: '⚡', title: 'Funded Instantly from Your Balance', body: 'Your Venlopay balance is always ready. Top up your card instantly from your account — no conversion steps, no delays.' },
          ].map((feat, i) => (
            <motion.div key={i} className={`${styles.featureRow} ${i % 2 === 1 ? styles.featureRowReverse : ''}`}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ ...spring, delay: 0.1 }}>
              <div className={styles.featureText}>
                <span className={styles.featureBigNum}>{feat.num}</span>
                <h3 className={styles.featureTitle}>{feat.title}</h3>
                <p className={styles.featureBody}>{feat.body}</p>
              </div>
              <div className={styles.featureVisual}>
                <div className={styles.featureCardPreview}>
                  <CardFace card={cardDesigns[i % cardDesigns.length]} size="small" />
                </div>
                {i === 0 && <span className={styles.featureChip}>🌍 Accepted in 190+ countries</span>}
                {i === 1 && <span className={styles.featureChip}>🏧 Local cash · Any ATM</span>}
                {i === 2 && <span className={styles.featureChip}>⚡ Funded instantly</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CARD SHOWCASE GRID */}
      <section className={styles.showcaseSection}>
        <div className={styles.sectionInner}>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>Choose Your Style</motion.h2>
          <motion.p className={styles.sectionSub} variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>Four distinct designs. One global payment passport.</motion.p>
          <motion.div className={styles.cardGrid} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {cardDesigns.map((card, i) => (
              <motion.div key={i} className={styles.cardCol} variants={cardItem} whileHover={{ y: -6, transition: { duration: 0.2 } }}>
                <CardFace card={card} size="small" />
                <p className={styles.showcaseCardName}>{card.name}</p>
                <p className={styles.showcaseCardTagline}>{card.tagline}</p>
                <div className={styles.showcaseTags}>
                  {['Global Acceptance', 'ATM Worldwide', 'Instant Top-Up'].map(t => (
                    <span key={t} className={styles.showcaseTag}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CARD MANAGEMENT */}
      <section className={styles.mgmtSection}>
        <div className={styles.sectionInner}>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>Full Control, Always in Your Hands</motion.h2>
          <motion.p className={styles.sectionSub} variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>Manage every aspect of your Venlopay card directly from the app.</motion.p>
          <motion.div className={styles.mgmtGrid} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { icon: '❄️', title: 'Freeze Anytime', body: "Lost your card or want to pause spending? Freeze it instantly from the app. Unfreeze with one tap when you're ready." },
              { icon: '🔔', title: 'Every Transaction, Instantly', body: 'Get real-time push notifications for every transaction — so you always know exactly how your card is being used.' },
              { icon: '🎛️', title: 'Set Your Limits', body: 'Set daily spending limits, enable or disable online payments, and control how and where your card can be used.' },
              { icon: '⚡', title: 'Top Up Instantly', body: 'Add funds from your Venlopay balance to your card in seconds. No waiting, no delays — your card is ready to spend immediately.' },
            ].map((item, i) => (
              <motion.div key={i} className={styles.mgmtCard} variants={cardItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                <div className={styles.mgmtIcon}>{item.icon}</div>
                <h3 className={styles.mgmtTitle}>{item.title}</h3>
                <p className={styles.mgmtBody}>{item.body}</p>
                {i === 0 && (
                  <div className={styles.mgmtMiniUI}>
                    <div className={styles.mgmtFreezeState}>
                      <span className={styles.mgmtFreezeLabel}>Card Status · Tap to unfreeze →</span>
                      <span className={styles.mgmtFreezeBadge}>❄ Frozen</span>
                    </div>
                  </div>
                )}
                {i === 1 && (
                  <div className={styles.mgmtMiniUI}>
                    <div className={styles.mgmtNotifRow}>
                      <span className={styles.mgmtNotifIcon}>🔔</span>
                      <div className={styles.mgmtNotifInfo}>
                        <span className={styles.mgmtNotifTitle}>Barclays UK</span>
                        <span className={styles.mgmtNotifSub}>Just now</span>
                      </div>
                      <span className={styles.mgmtNotifAmt}>-£630.00</span>
                    </div>
                  </div>
                )}
                {i === 2 && (
                  <div className={styles.mgmtMiniUI}>
                    <div className={styles.mgmtLimitRow}>
                      <div className={styles.mgmtLimitLabel}>
                        <span>Daily limit</span>
                        <span className={styles.mgmtLimitVal}>$500</span>
                      </div>
                      <div className={styles.mgmtLimitBar}>
                        <div className={styles.mgmtLimitFill} />
                      </div>
                    </div>
                  </div>
                )}
                {i === 3 && (
                  <div className={styles.mgmtMiniUI}>
                    <div className={styles.mgmtTopupRow}>
                      <span className={styles.mgmtTopupFrom}>Balance $2,480</span>
                      <span className={styles.mgmtTopupArrow}>→</span>
                      <span className={styles.mgmtTopupTo}>Card $500</span>
                      <span className={styles.mgmtTopupBadge}>⚡ Instant</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW TO GET */}
      <section className={styles.stepsSection}>
        <div className={styles.sectionInner}>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>Your Card, in Three Steps</motion.h2>
          <motion.div className={styles.stepsRow} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { icon: '📋', title: 'Join the Waitlist', body: "Sign up for early access. You'll be among the first to get your Venlopay card when we launch." },
              { icon: '🪪', title: 'Verify Your Identity', body: 'Complete a quick identity verification. Takes minutes.' },
              { icon: '💳', title: 'Fund and Activate', body: 'Add money to your Venlopay account, top up your card from your balance, and start spending globally.' },
            ].map((step, i) => (
              <motion.div key={i} className={styles.step} variants={cardItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
                {i === 0 && (
                  <div className={styles.stepMiniUI}>
                    <div className={styles.stepMiniInput}>
                      <span className={styles.stepMiniInputPlaceholder}>your@email.com</span>
                      <span className={styles.stepMiniInputBtn}>Join →</span>
                    </div>
                  </div>
                )}
                {i === 1 && (
                  <div className={styles.stepMiniUI}>
                    <div className={styles.stepMiniKyc}>
                      <div className={styles.stepMiniKycCheck}>✓</div>
                      <div className={styles.stepMiniKycInfo}>
                        <span className={styles.stepMiniKycTitle}>KYC Complete</span>
                        <span className={styles.stepMiniKycSub}>2 min · Identity verified</span>
                      </div>
                    </div>
                  </div>
                )}
                {i === 2 && (
                  <div className={styles.stepMiniUI}>
                    <div className={styles.stepMiniFundRow}>
                      <span className={styles.stepMiniFundFrom}>$2,500 USDT</span>
                      <span className={styles.stepMiniFundArrow}>→</span>
                      <span className={styles.stepMiniFundTo}>Card</span>
                      <span className={styles.stepMiniFundBadge}>⚡ Instant</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
          <motion.button className={styles.stepsCta} onClick={() => setShowForm(s => !s)}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
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

      {/* FAQs */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <motion.h2 className={styles.sectionHeadline} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>Card FAQs</motion.h2>
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

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaGlow} />
        <div className={styles.ctaInner}>
          <motion.h2 className={styles.ctaHeadline} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={spring}>
            Your Global Payment Passport Starts Here
          </motion.h2>
          <motion.button className={styles.ctaBtn} onClick={() => setShowForm(s => !s)}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ ...spring, delay: 0.15 }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            Join The Waitlist
          </motion.button>
        </div>
      </section>
    </motion.div>
  )
}
