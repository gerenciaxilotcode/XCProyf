import { motion } from 'framer-motion'
import { buildWhatsAppLink } from '../../lib/whatsapp.js'
import './CtaSection.css'

function CtaSection() {
  return (
    <section className="cta-section">
      <div className="container">
        <motion.div
          className="cta-box"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h2>¿Tienes una idea para tu negocio?</h2>
          <p>Convirtámosla en software. Sin compromiso, podemos platicarlo en una llamada o videollamada.</p>
          <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Hablar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default CtaSection
