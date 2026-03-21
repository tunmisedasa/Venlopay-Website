import { motion } from 'framer-motion'
import { COIN_LOGOS, FLAG } from '../../../constants/coinLogos'
import styles from './GlobalReach.module.css'

const row1 = [
  { flag: FLAG.US, name: 'United States' },
  { flag: FLAG.GB, name: 'United Kingdom' },
  { flag: FLAG.DE, name: 'Germany' },
  { flag: FLAG.FR, name: 'France' },
  { flag: FLAG.JP, name: 'Japan' },
  { flag: FLAG.CA, name: 'Canada' },
  { flag: FLAG.AU, name: 'Australia' },
  { flag: FLAG.SG, name: 'Singapore' },
  { flag: FLAG.AE, name: 'UAE' },
  { flag: FLAG.BR, name: 'Brazil' },
  { flag: FLAG.MX, name: 'Mexico' },
  { flag: FLAG.IN, name: 'India' },
]

const row2 = [
  { flag: FLAG.NG, name: 'Nigeria' },
  { flag: FLAG.ZA, name: 'South Africa' },
  { flag: FLAG.KE, name: 'Kenya' },
  { flag: FLAG.PH, name: 'Philippines' },
  { flag: FLAG.ID, name: 'Indonesia' },
  { flag: FLAG.TR, name: 'Turkey' },
  { flag: FLAG.PL, name: 'Poland' },
  { flag: FLAG.CO, name: 'Colombia' },
  { flag: FLAG.AR, name: 'Argentina' },
  { flag: FLAG.EG, name: 'Egypt' },
  { flag: FLAG.GH, name: 'Ghana' },
  { flag: FLAG.TZ, name: 'Tanzania' },
]

const stablecoins = [
  { t: 'USDT', logo: COIN_LOGOS.USDT },
  { t: 'USDC', logo: COIN_LOGOS.USDC },
  { t: 'EURC', logo: COIN_LOGOS.EURC },
  { t: 'CADC', logo: COIN_LOGOS.CADC },
  { t: 'XSGD', logo: COIN_LOGOS.XSGD },
  { t: 'JPYC', logo: COIN_LOGOS.JPYC },
  { t: 'BRZ',  logo: COIN_LOGOS.BRZ  },
  { t: 'MXNT', logo: COIN_LOGOS.MXNT },
  { t: 'IDRT', logo: COIN_LOGOS.IDRT },
  { t: 'TRYB', logo: COIN_LOGOS.TRYB },
  { t: 'cNGN', logo: COIN_LOGOS.cNGN },
  { t: 'ZARP', logo: COIN_LOGOS.ZARP },
  { t: 'cKES', logo: COIN_LOGOS.cKES },
  { t: 'eXOF', logo: COIN_LOGOS.eXOF },
]

const chains = ['Ethereum', 'Tron', 'Solana', 'BNB Chain', 'Arbitrum', 'Base', 'Polygon', 'Avalanche', 'Celo', 'Zilliqa', 'XRPL']

export default function GlobalReach() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.span
          className={styles.tag}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          GLOBAL REACH
        </motion.span>

        <motion.h2
          className={styles.headline}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          190+ COUNTRIES. ONE ACCOUNT.
        </motion.h2>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Send and receive in local currencies across every major market on earth.
        </motion.p>
      </div>

      {/* Marquee rows */}
      <div className={styles.marqueeWrap}>
        <div className={styles.marqueeRow}>
          <div className={styles.track}>
            {[...row1, ...row1].map((c, i) => (
              <div key={i} className={styles.countryChip}>
                <img src={c.flag} alt={c.name} className={styles.chipFlag} width={24} height={16} style={{ objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
                <span className={styles.chipName}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.marqueeRow} ${styles.marqueeReverse}`}>
          <div className={styles.track}>
            {[...row2, ...row2].map((c, i) => (
              <div key={i} className={styles.countryChip}>
                <img src={c.flag} alt={c.name} className={styles.chipFlag} width={24} height={16} style={{ objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
                <span className={styles.chipName}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stablecoins + chains */}
      <div className={styles.inner}>
        <div className={styles.bottomGrid}>
          <div className={styles.dataPanel}>
            <div className={styles.dataPanelHead}>
              <span className={styles.dataPanelTitle}>14 Stablecoins Accepted</span>
              <span className={styles.dataPanelBadge}>Any stablecoin · Any chain</span>
            </div>
            <div className={styles.coinRow}>
              {stablecoins.map((coin, i) => (
                <motion.div
                  key={i} className={styles.coinItem}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}>
                  <div className={styles.coinLogoWrap}>
                    <img src={coin.logo} alt={coin.t} className={styles.coinLogoImg}
                      onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} />
                    <span className={styles.coinLogoFallback} style={{ display: 'none' }}>{coin.t.slice(0,1)}</span>
                  </div>
                  <span className={styles.coinTicker}>{coin.t}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className={styles.dataPanel}>
            <div className={styles.dataPanelHead}>
              <span className={styles.dataPanelTitle}>11 Chains Supported</span>
              <span className={styles.dataPanelBadge}>Deposit from anywhere</span>
            </div>
            <div className={styles.chainRow}>
              {chains.map((c, i) => (
                <span key={i} className={styles.chainChip}>{c}</span>
              ))}
            </div>
          </div>

          <div className={styles.dataPanel} style={{ gridColumn: '1 / -1' }}>
            <div className={styles.dataPanelHead}>
              <span className={styles.dataPanelTitle}>Local Payment Rails</span>
              <span className={styles.dataPanelBadge}>Recipients get local currency</span>
            </div>
            <div className={styles.railsRow}>
              {[
                { name: 'ACH', region: 'United States', regionCode: 'US', color: '#60A5FA' },
                { name: 'Faster Payments', region: 'United Kingdom', regionCode: 'GB', color: '#A78BFA' },
                { name: 'SEPA Instant', region: 'Europe', regionCode: 'EU', color: '#34D399' },
                { name: 'IMPS / UPI', region: 'India', regionCode: 'IN', color: '#F59E0B' },
                { name: 'PayNow', region: 'Singapore', regionCode: 'SG', color: '#F87171' },
                { name: 'NIP', region: 'Nigeria', regionCode: 'NG', color: '#4ADE80' },
                { name: 'Zengin', region: 'Japan', regionCode: 'JP', color: '#E879F9' },
                { name: 'PIX', region: 'Brazil', regionCode: 'BR', color: '#22D3EE' },
              ].map((r, i) => (
                <motion.div key={i} className={styles.railChip}
                  initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                  <span className={styles.railDot} style={{ background: r.color }} />
                  <div className={styles.railInfo}>
                    <span className={styles.railName}>{r.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <img src={FLAG[r.regionCode]} alt={r.region} width={16} height={11} style={{ objectFit: 'cover', borderRadius: 1, flexShrink: 0 }} />
                      <span className={styles.railRegion}>{r.region}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
