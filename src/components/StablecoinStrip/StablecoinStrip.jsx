import { COIN_LOGOS } from '../../constants/coinLogos'
import styles from './StablecoinStrip.module.css'

const stablecoins = [
  { ticker: 'USDT', name: 'Tether',               logo: COIN_LOGOS.USDT },
  { ticker: 'USDC', name: 'USD Coin',              logo: COIN_LOGOS.USDC },
  { ticker: 'EURC', name: 'Euro Coin',             logo: COIN_LOGOS.EURC },
  { ticker: 'CADC', name: 'CAD Coin',              logo: COIN_LOGOS.CADC },
  { ticker: 'XSGD', name: 'XSGD',                  logo: COIN_LOGOS.XSGD },
  { ticker: 'JPYC', name: 'JPY Coin',              logo: COIN_LOGOS.JPYC },
  { ticker: 'BRZ',  name: 'BRZ',                   logo: COIN_LOGOS.BRZ  },
  { ticker: 'MXNT', name: 'Mexican Peso Tether',   logo: COIN_LOGOS.MXNT },
  { ticker: 'IDRT', name: 'Rupiah Token',          logo: COIN_LOGOS.IDRT },
  { ticker: 'TRYB', name: 'BiLira',                logo: COIN_LOGOS.TRYB },
  { ticker: 'cNGN', name: 'cNGN',                  logo: COIN_LOGOS.cNGN },
  { ticker: 'ZARP', name: 'ZARP',                  logo: COIN_LOGOS.ZARP },
  { ticker: 'cKES', name: 'cKES',                  logo: COIN_LOGOS.cKES },
  { ticker: 'eXOF', name: 'eXOF',                  logo: COIN_LOGOS.eXOF },
]

function CoinItem({ coin }) {
  return (
    <div className={styles.item}>
      <div className={styles.logo}>
        <img
          src={coin.logo}
          alt={coin.ticker}
          className={styles.logoImg}
          onError={(e) => {
            // Fallback to colored initial if image fails
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <span className={styles.logoFallback} style={{ display: 'none' }}>
          {coin.ticker.slice(0, 1)}
        </span>
      </div>
      <span className={styles.ticker}>{coin.ticker}</span>
      <span className={styles.dot}>·</span>
    </div>
  )
}

export default function StablecoinStrip({ label = 'FUND WITH ANY STABLECOIN' }) {
  const repeated = [...stablecoins, ...stablecoins, ...stablecoins]
  return (
    <div className={styles.strip}>
      {label && <p className={styles.label}>{label}</p>}
      <div className={styles.marqueeWrapper}>
        <div className={styles.marquee}>
          {repeated.map((coin, i) => <CoinItem key={i} coin={coin} />)}
        </div>
      </div>
    </div>
  )
}
