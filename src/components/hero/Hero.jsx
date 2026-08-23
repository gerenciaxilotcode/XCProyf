import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { buildWhatsAppLink } from '../../lib/whatsapp.js'
import { useSiteContent } from '../../hooks/useSiteContent.js'
import './Hero.css'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

function Hero() {
  const { hero, contact } = useSiteContent()

  return (
    <section className="hero">
      <div className="hero-grid" />
      <div className="hero-glow" />

      <motion.div className="container hero-inner" variants={container} initial="hidden" animate="visible">
        <motion.span className="eyebrow" variants={item}>
          {hero.eyebrow}
        </motion.span>

        <motion.h1 className="hero-title" variants={item}>
          {hero.title}
        </motion.h1>

        <motion.p className="hero-subtitle" variants={item}>
          {hero.subtitle}
        </motion.p>

        <motion.div className="hero-actions" variants={item}>
          <a
            href={buildWhatsAppLink(contact.whatsappMessage, contact.whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {hero.ctaPrimaryLabel}
            <ArrowRight size={18} />
          </a>
          <a href="#servicios" className="btn-secondary">
            {hero.ctaSecondaryLabel}
          </a>
        </motion.div>

        <motion.p className="hero-tagline" variants={item}>
          {hero.tagline}
        </motion.p>
      </motion.div>
    </section>
  )
}

export default Hero
