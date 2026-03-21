import { motion } from 'framer-motion'
import { coinImgProps, FLAG } from '../../../constants/coinLogos'
import styles from './HowItWorks.module.css'

/* ── Step visuals ─────────────────────────────────────────── */
function VisualVerify() {
  return (
    <div className={styles.visual}>
      <div className={styles.idCard}>
        <div className={styles.idTop}>
          <div className={styles.idAvatar}>AJ</div>
          <div className={styles.idInfo}>
            <span className={styles.idName}>Alex Johnson</span>
            <span className={styles.idSub}>Identity Verified</span>
          </div>
          <motion.div className={styles.idCheck}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, delay: 0.3 }}>✓</motion.div>
        </div>
        <div className={styles.idBars}>
          <div className={styles.idBar} style={{ width: '100%', background: 'rgba(74,222,128,0.5)' }} />
          <div className={styles.idBar} style={{ width: '100%', background: 'rgba(74,222,128,0.3)' }} />
          <div className={styles.idBar} style={{ width: '60%', background: 'rgba(74,222,128,0.2)' }} />
        </div>
      </div>
      <div className={styles.visualBadge} style={{ color: '#4ADE80', borderColor: 'rgba(74,222,128,0.25)', background: 'rgba(74,222,128,0.07)' }}>
        ✓ KYC complete · 2 min
      </div>
    </div>
  )
}

function VisualFund() {
  return (
    <div className={styles.visual}>
      <div className={styles.fundCard}>
        <div className={styles.fundRow}>
          <div className={styles.fundCoin}>
            <img {...coinImgProps('USDT', 18)} />
            <span className={styles.fundTicker}>USDT</span>
          </div>
          <span className={styles.fundArrow}>→</span>
          <div className={styles.fundDest}>
            <span className={styles.fundDestIcon}>⊞</span>
            <span className={styles.fundDestLabel}>Venlopay</span>
          </div>
        </div>
        <div className={styles.fundAmt}>
          <span className={styles.fundAmtNum}>$2,500.00</span>
          <span className={styles.fundAmtSub}>credited instantly</span>
        </div>
        <div className={styles.fundChains}>
          {['Base', 'Ethereum', 'Tron', 'Solana'].map(c => (
            <span key={c} className={styles.fundChip}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function VisualSend() {
  return (
    <div className={styles.visual}>
      <div className={styles.sendMini}>
        {[
          { flagCode: 'GB', name: 'James T.', bank: 'Barclays', amt: '£630', rail: 'Faster Payments', color: '#4ADE80' },
          { flagCode: 'DE', name: 'Marie D.', bank: 'Deutsche', amt: '€900', rail: 'SEPA', color: '#4ADE80' },
          { flagCode: 'NG', name: 'Amara O.', bank: 'GTBank', amt: '₦850k', rail: 'NIP', color: '#4ADE80' },
        ].map((tx, i) => (
          <motion.div key={i} className={styles.sendMiniRow}
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}>
            <img src={FLAG[tx.flagCode]} alt={tx.flagCode} className={styles.sendMiniFlag} width={22} height={15} style={{ objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
            <div className={styles.sendMiniInfo}>
              <span className={styles.sendMiniName}>{tx.name} · {tx.bank}</span>
              <span className={styles.sendMiniRail}>{tx.rail}</span>
            </div>
            <span className={styles.sendMiniAmt} style={{ color: tx.color }}>{tx.amt}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function VisualGlobal() {
  return (
    <div className={styles.visual}>
      <div className={styles.passportCard}>
        <div className={styles.passportTop}>
          <span className={styles.passportIcon}>🌍</span>
          <div>
            <p className={styles.passportTitle}>Global Payment Passport</p>
            <p className={styles.passportSub}>Alex Johnson</p>
          </div>
        </div>
        <div className={styles.passportStats}>
          {[['190+', 'Countries'], ['30+', 'Currencies'], ['14', 'Stablecoins']].map(([n, l]) => (
            <div key={l} className={styles.passportStat}>
              <span className={styles.passportStatN}>{n}</span>
              <span className={styles.passportStatL}>{l}</span>
            </div>
          ))}
        </div>
        <div className={styles.passportActive}>
          <span className={styles.passportDot} />
          Active · Ready to send
        </div>
      </div>
    </div>
  )
}

const steps = [
  {
    num: '01', title: 'Create Your Account',
    desc: 'Sign up and complete identity verification in minutes. No paperwork, no branch visits.',
    Visual: VisualVerify,
  },
  {
    num: '02', title: 'Fund with Any Stablecoin',
    desc: 'Deposit from any wallet, exchange or chain. USDT, USDC, EURC, cNGN — if it exists, we accept it.',
    Visual: VisualFund,
  },
  {
    num: '03', title: 'Send, Spend or Receive',
    desc: 'Move fiat to any bank account globally, spend with your Venlopay card, or receive money like a local.',
    Visual: VisualSend,
  },
  {
    num: '04', title: "You're Global",
    desc: "Your Global Payment Passport is active. The world's payment systems are now yours.",
    Visual: VisualGlobal,
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.inner}>
        <motion.div className={styles.header}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <span className={styles.tag}>HOW IT WORKS</span>
          <h2 className={styles.headline}>Up and running in minutes.</h2>
        </motion.div>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <motion.div key={i} className={styles.step}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1 }}>
              <div className={styles.stepVisualWrap}>
                <step.Visual />
              </div>
              <span className={styles.num}>{step.num}</span>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
