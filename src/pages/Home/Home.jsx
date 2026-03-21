import { motion } from 'framer-motion'
import Hero from './sections/Hero'
import StablecoinStrip from '../../components/StablecoinStrip/StablecoinStrip'
import ProductOverview from './sections/ProductOverview'
import DemoSection from './sections/DemoSection'
import HowItWorks from './sections/HowItWorks'
import GlobalReach from './sections/GlobalReach'
import FAQs from './sections/FAQs'
import FinalCTA from './sections/FinalCTA'
import styles from './Home.module.css'

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function Home() {
  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" className={styles.page}>
      <Hero />
      <StablecoinStrip />
      <ProductOverview />
      <DemoSection />
      <HowItWorks />
      <GlobalReach />
      <FAQs />
      <FinalCTA />
    </motion.div>
  )
}
