import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './FAQs.module.css'

const faqs = [
  { cat: 'GENERAL', q: 'What is Venlopay?', a: 'Venlopay is your Global Payment Passport — a stablecoin-to-fiat payment platform that lets you fund your account with any stablecoin and send, spend, and receive fiat money anywhere in the world.' },
  { cat: 'GENERAL', q: 'Is Venlopay a bank?', a: 'No. Venlopay is a financial technology platform, not a bank. We partner with licensed and regulated financial institutions to deliver payment and settlement services globally.' },
  { cat: 'GENERAL', q: 'Which countries is Venlopay available in?', a: 'Venlopay is built for a global audience. Users from 190+ countries can access the platform, fund their accounts, send fiat, receive virtual account details, and spend globally with their Venlopay card.' },
  { cat: 'GENERAL', q: 'Who is Venlopay for?', a: 'Venlopay is for anyone who wants to use stablecoins to move money in the real world — send money to family, pay suppliers, receive client payments, or spend anywhere globally. It\'s also built for businesses that need to accept and settle global payments.' },
  { cat: 'STABLECOINS & FUNDING', q: 'Which stablecoins does Venlopay support?', a: 'Venlopay supports 14 stablecoins: USDT, USDC, EURC, CADC, XSGD, JPYC, BRZ, MXNT, IDRT, TRYB, cNGN, ZARP, cKES and eXOF — across 11 chains: Ethereum, Tron, Solana, BNB Chain, Arbitrum, Base, Polygon, Avalanche, Celo, Zilliqa and XRPL.' },
  { cat: 'STABLECOINS & FUNDING', q: 'How do I fund my Venlopay account?', a: 'You can fund your account by depositing any supported stablecoin from your wallet or exchange, sending crypto directly, or depositing via bank transfer — ACH, FedWire, Faster Payments, or SEPA depending on your region.' },
  { cat: 'STABLECOINS & FUNDING', q: 'Are there hidden fees when I deposit?', a: 'No. All fees are shown clearly before you confirm any transaction. What you see is what you pay — no hidden spreads, no surprise deductions.' },
  { cat: 'VIRTUAL ACCOUNTS', q: 'What is a Venlopay virtual account?', a: 'Venlopay connects you to local banking systems in 190+ countries — so anyone can send money to your local bank account in your local currency. Additionally, Venlopay offers flagship virtual accounts in the US, UK and EU: a real US account number and routing number for ACH and FedWire, a UK sort code and account number for Faster Payments, and an EU IBAN for SEPA. These flagship accounts are available to every Venlopay user regardless of their country.' },
  { cat: 'VIRTUAL ACCOUNTS', q: 'Do I need to be a US resident to get a US virtual account?', a: 'No. Any Venlopay user regardless of their country can get a US virtual account and receive ACH and FedWire transfers just like a local.' },
  { cat: 'VIRTUAL ACCOUNTS', q: 'Can I have virtual accounts in multiple currencies simultaneously?', a: 'Yes. Venlopay gives every user access to flagship virtual accounts in the US, UK and EU simultaneously — all under one Venlopay account. On top of that, Venlopay connects to local banking systems in 190+ countries so you can send and receive in any local currency globally.' },
  { cat: 'SENDING MONEY', q: 'Who can I send money to?', a: 'You can send fiat directly to any bank account in the world. The recipient does not need a Venlopay account — they just receive money in their local currency to their existing bank account.' },
  { cat: 'SENDING MONEY', q: 'What currencies can I send?', a: 'Venlopay supports 30+ local currencies across 190+ countries. Your recipient receives their local currency — not dollars forced on them.' },
  { cat: 'SENDING MONEY', q: 'How long do transfers take?', a: 'Most transfers settle instantly or within minutes depending on the destination country and local payment rail.' },
  { cat: 'VENLOPAY CARD', q: 'What is the Venlopay card?', a: 'The Venlopay card is your physical and virtual spending card. It draws from your Venlopay balance — fund your account with any stablecoin and spend anywhere in the world or withdraw local currencies at ATMs globally.' },
  { cat: 'VENLOPAY CARD', q: 'Where can I use the Venlopay card?', a: 'Everywhere cards are accepted globally — in-store, online, and at ATMs worldwide. You can withdraw in local currencies wherever you are.' },
  { cat: 'VENLOPAY CARD', q: 'How do I fund my Venlopay card?', a: 'Your card draws from your Venlopay balance. Deposit any supported stablecoin to your account and your card is ready to spend instantly.' },
  { cat: 'BUSINESS', q: 'Does Venlopay work for businesses?', a: 'Yes. Venlopay for Business lets companies receive payments from anywhere in the world, accept stablecoin payments from customers and clients globally, and get settled directly in fiat to their bank account. Visit our Business page to learn more.' },
  { cat: 'SECURITY', q: 'Is my money safe on Venlopay?', a: 'Venlopay is built on licensed and regulated partners with full KYC and compliance coverage. Your account is protected with multiple layers of security including identity verification, transaction monitoring, and real-time account controls.' },
]

const categories = [...new Set(faqs.map(f => f.cat))]

export default function FAQs() {
  const [open, setOpen] = useState(null)

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div className={styles.header} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className={styles.label}>FAQs</span>
          <h2 className={styles.headline}>Everything you need to know.</h2>
        </motion.div>

        <div className={styles.list}>
          {categories.map(cat => (
            <div key={cat} className={styles.catGroup}>
              <p className={styles.catLabel}>{cat}</p>
              {faqs.filter(f => f.cat === cat).map((faq, i) => {
                const id = `${cat}-${i}`
                return (
                  <div key={id} className={`${styles.item} ${open === id ? styles.itemOpen : ''}`}>
                    <button
                      className={styles.question}
                      onClick={() => setOpen(open === id ? null : id)}
                      aria-expanded={open === id}
                    >
                      <span>{faq.q}</span>
                      <span className={`${styles.icon} ${open === id ? styles.iconOpen : ''}`}>+</span>
                    </button>
                    <AnimatePresence>
                      {open === id && (
                        <motion.div
                          className={styles.answer}
                          initial={{ maxHeight: 0, opacity: 0 }}
                          animate={{ maxHeight: 300, opacity: 1 }}
                          exit={{ maxHeight: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p className={styles.answerText}>{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
