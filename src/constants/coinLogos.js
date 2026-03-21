/**
 * CoinGecko CDN logo URLs for all 14 supported stablecoins.
 * Source: coin-images.coingecko.com (current CoinGecko image CDN)
 */
export const COIN_LOGOS = {
  USDT: 'https://coin-images.coingecko.com/coins/images/325/small/Tether.png',
  USDC: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',
  EURC: 'https://coin-images.coingecko.com/coins/images/26045/small/euro-coin.png',
  CADC: 'https://coin-images.coingecko.com/coins/images/14149/small/CADC_2.png',
  XSGD: 'https://coin-images.coingecko.com/coins/images/12832/small/XSGD_Logo_Full_Colour_1.png',
  JPYC: 'https://coin-images.coingecko.com/coins/images/70314/small/JPYC_400x400.jpg',
  BRZ:  'https://coin-images.coingecko.com/coins/images/8472/small/MicrosoftTeams-image_%286%29.png',
  MXNT: 'https://coin-images.coingecko.com/coins/images/25485/small/MXNT.png',
  IDRT: 'https://coin-images.coingecko.com/coins/images/9441/small/57421944_1371636006308255_3647136573922738176_n.jpg',
  TRYB: 'https://coin-images.coingecko.com/coins/images/10119/small/JBs9jiXO_400x400.jpg',
  cNGN: 'https://coin-images.coingecko.com/coins/images/34155/small/cNGN.png',
  ZARP: 'https://coin-images.coingecko.com/coins/images/29316/small/ZARP_Stablecoin_Logo.png',
  cKES: 'https://coin-images.coingecko.com/coins/images/36413/small/cKES.png',
  eXOF: 'https://coin-images.coingecko.com/coins/images/31216/small/exof.png',
}

/**
 * Country flag image URLs via flagcdn.com (ISO 3166-1 alpha-2 codes).
 * Usage: <img src={FLAG['US']} alt="United States" />
 * Format: https://flagcdn.com/w40/{cc}.png  (40px wide, auto height)
 */
export const FLAG = {
  US: 'https://flagcdn.com/w40/us.png',
  GB: 'https://flagcdn.com/w40/gb.png',
  DE: 'https://flagcdn.com/w40/de.png',
  FR: 'https://flagcdn.com/w40/fr.png',
  JP: 'https://flagcdn.com/w40/jp.png',
  CA: 'https://flagcdn.com/w40/ca.png',
  AU: 'https://flagcdn.com/w40/au.png',
  SG: 'https://flagcdn.com/w40/sg.png',
  AE: 'https://flagcdn.com/w40/ae.png',
  BR: 'https://flagcdn.com/w40/br.png',
  MX: 'https://flagcdn.com/w40/mx.png',
  IN: 'https://flagcdn.com/w40/in.png',
  NG: 'https://flagcdn.com/w40/ng.png',
  ZA: 'https://flagcdn.com/w40/za.png',
  KE: 'https://flagcdn.com/w40/ke.png',
  PH: 'https://flagcdn.com/w40/ph.png',
  ID: 'https://flagcdn.com/w40/id.png',
  TR: 'https://flagcdn.com/w40/tr.png',
  PL: 'https://flagcdn.com/w40/pl.png',
  CO: 'https://flagcdn.com/w40/co.png',
  AR: 'https://flagcdn.com/w40/ar.png',
  EG: 'https://flagcdn.com/w40/eg.png',
  GH: 'https://flagcdn.com/w40/gh.png',
  TZ: 'https://flagcdn.com/w40/tz.png',
  EU: 'https://flagcdn.com/w40/eu.png',
}

/**
 * Helper: returns <img> props for a flag image.
 * Usage: <img {...flagImgProps('US')} />
 */
export function flagImgProps(code, size = 24) {
  return {
    src: FLAG[code] ?? `https://flagcdn.com/w40/${code.toLowerCase()}.png`,
    alt: code,
    width: size,
    height: size * 0.67,
    style: { objectFit: 'cover', display: 'inline-block', flexShrink: 0, borderRadius: 2 },
    onError: (e) => { e.currentTarget.style.display = 'none' },
  }
}

/**
 * Reusable inline coin logo component helper — returns props for an <img> tag.
 * Usage: <img {...coinImgProps('USDT', 20)} />
 */
export function coinImgProps(ticker, size = 20) {
  return {
    src: COIN_LOGOS[ticker] ?? COIN_LOGOS.USDT,
    alt: ticker,
    width: size,
    height: size,
    style: { borderRadius: '50%', objectFit: 'cover', display: 'block', flexShrink: 0 },
    onError: (e) => { e.currentTarget.style.display = 'none' },
  }
}
