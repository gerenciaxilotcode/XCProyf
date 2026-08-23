import { motion } from 'framer-motion'
import { buildWhatsAppLink } from '../../lib/whatsapp.js'
import { useSiteContent } from '../../hooks/useSiteContent.js'
import './CtaSection.css'

function CtaSection() {
  const { cta, contact } = useSiteContent()

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
          <h2>{cta.title}</h2>
          <p>{cta.description}</p>
          <a
            href={buildWhatsAppLink(contact.whatsappMessage, contact.whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {cta.buttonLabel}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default CtaSection
