import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion'
import { FLAG } from '../../../constants/coinLogos'
import styles from './DemoSection.module.css'

// Animated counter hook
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

const stats = [
  { value: 190, suffix: '+', label: 'Countries' },
  { value: 30, suffix: '+', label: 'Currencies' },
  { value: 14, suffix: '', label: 'Stablecoins' },
  { value: 11, suffix: '', label: 'Chains' },
]

function StatCounter({ stat, started }) {
  const count = useCounter(stat.value, 1600, started)
  return (
    <div className={styles.statItem}>
      <span className={styles.statNum}>{count}{stat.suffix}</span>
      <span className={styles.statLabel}>{stat.label}</span>
    </div>
  )
}

// Animated transaction feed
const txFeed = [
  { flagCode: 'US', name: 'Sarah M.', bank: 'Chase Bank', amt: '+$2,400', time: 'Just now', color: '#4ADE80' },
  { flagCode: 'GB', name: 'James T.', bank: 'Barclays UK', amt: '-$800', time: '1m ago', color: '#F87171' },
  { flagCode: 'DE', name: 'Klaus B.', bank: 'Deutsche Bank', amt: '+€1,200', time: '3m ago', color: '#4ADE80' },
  { flagCode: 'SG', name: 'Wei L.', bank: 'DBS Singapore', amt: '-$350', time: '5m ago', color: '#F87171' },
  { flagCode: 'NG', name: 'Amara O.', bank: 'GTBank Nigeria', amt: '+$600', time: '7m ago', color: '#4ADE80' },
  { flagCode: 'FR', name: 'Marie D.', bank: 'BNP Paribas', amt: '+€900', time: '9m ago', color: '#4ADE80' },
]

function LiveFeed() {
  const [visible, setVisible] = useState(txFeed.slice(0, 3))
  const [idx, setIdx] = useState(3)

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(prev => {
        const next = txFeed[idx % txFeed.length]
        return [next, ...prev.slice(0, 3)]
      })
      setIdx(i => i + 1)
    }, 2200)
    return () => clearInterval(t)
  }, [idx])

  return (
    <div className={styles.feedWrap}>
      <div className={styles.feedHeader}>
        <span className={styles.feedTitle}>Live Transactions</span>
        <span className={styles.feedLive}><span className={styles.liveDot} />LIVE</span>
      </div>
      <div className={styles.feedList}>
        <AnimatePresence initial={false}>
          {visible.map((tx, i) => (
            <motion.div key={`${tx.name}-${i}`} className={styles.feedRow}
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}>
              <img src={FLAG[tx.flagCode]} alt={tx.flagCode} className={styles.feedFlag} width={22} height={15} style={{ objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
              <div className={styles.feedInfo}>
                <span className={styles.feedName}>{tx.name}</span>
                <span className={styles.feedBank}>{tx.bank}</span>
              </div>
              <span className={styles.feedAmt} style={{ color: tx.color }}>{tx.amt}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Animated send flow
const sendSteps = [
  { label: 'Enter amount', icon: '💵', detail: '$500.00 USD' },
  { label: 'Choose recipient', icon: null, flagCode: 'GB', detail: 'James T. · Barclays UK' },
  { label: 'Confirm & send', icon: '⚡', detail: 'Faster Payments' },
  { label: 'Delivered', icon: '✓', detail: 'In < 1 minute', done: true },
]

function SendFlow() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % sendSteps.length), 1800)
    return () => clearInterval(t)
  }, [])

  return (
    <div className={styles.sendFlow}>
      <div className={styles.sendFlowTitle}>Send Money Flow</div>
      {sendSteps.map((s, i) => (
        <motion.div key={i} className={`${styles.sendStep} ${i === step ? styles.sendStepActive : ''} ${i < step || (step === 0 && i === sendSteps.length - 1) ? styles.sendStepDone : ''}`}
          animate={{ opacity: i <= step ? 1 : 0.3 }}
          transition={{ duration: 0.4 }}>
          <div className={styles.sendStepIcon}>
            {s.flagCode
              ? <img src={FLAG[s.flagCode]} alt={s.flagCode} width={20} height={14} style={{ objectFit: 'cover', borderRadius: 2 }} />
              : s.icon
            }
          </div>
          <div className={styles.sendStepInfo}>
            <span className={styles.sendStepLabel}>{s.label}</span>
            <span className={styles.sendStepDetail}>{s.detail}</span>
          </div>
          {i < step && <span className={styles.sendStepCheck}>✓</span>}
        </motion.div>
      ))}
    </div>
  )
}

export default function DemoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.inner}>
        {/* Header */}
        <motion.div className={styles.header}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <span className={styles.tag}>SEE IT IN ACTION</span>
          <h2 className={styles.headline}>Money moving in real time.</h2>
          <p className={styles.sub}>Watch how Venlopay moves money across borders — instantly, reliably, globally.</p>
        </motion.div>

        {/* Stats strip */}
        <motion.div className={styles.statsRow}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.15 }}>
          {stats.map((s, i) => (
            <StatCounter key={i} stat={s} started={isInView} />
          ))}
        </motion.div>

        {/* Demo panels */}
        <div className={styles.panels}>
          {/* Left: live feed */}
          <motion.div className={styles.panel}
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.55 }}>
            <LiveFeed />
          </motion.div>

          {/* Center: video placeholder with animated overlay */}
          <motion.div className={styles.videoPanel}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}>
            <div className={styles.videoFrame}>
              <div className={styles.videoNoise} />
              {/* Animated globe lines */}
              <svg className={styles.globeSvg} viewBox="0 0 320 320" fill="none">
                <circle cx="160" cy="160" r="120" stroke="rgba(123,79,191,0.15)" strokeWidth="1"/>
                <circle cx="160" cy="160" r="80" stroke="rgba(123,79,191,0.1)" strokeWidth="1"/>
                <circle cx="160" cy="160" r="40" stroke="rgba(123,79,191,0.08)" strokeWidth="1"/>
                <ellipse cx="160" cy="160" rx="120" ry="48" stroke="rgba(123,79,191,0.12)" strokeWidth="1"/>
                <ellipse cx="160" cy="160" rx="120" ry="80" stroke="rgba(123,79,191,0.08)" strokeWidth="1"/>
                <line x1="40" y1="160" x2="280" y2="160" stroke="rgba(123,79,191,0.1)" strokeWidth="1"/>
                <line x1="160" y1="40" x2="160" y2="280" stroke="rgba(123,79,191,0.1)" strokeWidth="1"/>
              </svg>
              {/* Animated payment arcs */}
              <svg className={styles.arcSvg} viewBox="0 0 320 320" fill="none">
                <motion.path d="M 80 200 Q 160 80 240 200"
                  stroke="#7B4FBF" strokeWidth="1.5" strokeDasharray="8 4"
                  animate={{ strokeDashoffset: [0, -48] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}/>
                <motion.path d="M 60 160 Q 160 60 260 160"
                  stroke="#9B6FDF" strokeWidth="1" strokeDasharray="6 6" opacity="0.5"
                  animate={{ strokeDashoffset: [0, -48] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', delay: 0.5 }}/>
                <motion.path d="M 100 220 Q 160 120 220 220"
                  stroke="#4ADE80" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6"
                  animate={{ strokeDashoffset: [0, -40] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: 1 }}/>
              </svg>
              {/* Floating nodes */}
              {[
                { x: '18%', y: '30%', flagCode: 'US', delay: 0 },
                { x: '72%', y: '25%', flagCode: 'GB', delay: 0.4 },
                { x: '80%', y: '65%', flagCode: 'DE', delay: 0.8 },
                { x: '15%', y: '68%', flagCode: 'NG', delay: 1.2 },
                { x: '50%', y: '78%', flagCode: 'SG', delay: 0.6 },
              ].map((n, i) => (
                <motion.div key={i} className={styles.globeNode}
                  style={{ left: n.x, top: n.y }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: n.delay }}>
                  <img src={FLAG[n.flagCode]} alt={n.flagCode} width={20} height={14} style={{ objectFit: 'cover', borderRadius: 2 }} />
                </motion.div>
              ))}
              <div className={styles.videoCenter}>
                <motion.div className={styles.videoCenterRing}
                  animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                  <span className={styles.videoCenterLogo}>V</span>
                </motion.div>
                <p className={styles.videoCenterLabel}>venlopay</p>
              </div>
            </div>
          </motion.div>

          {/* Right: send flow */}
          <motion.div className={styles.panel}
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.55 }}>
            <SendFlow />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
