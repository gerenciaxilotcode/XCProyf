import { motion } from 'framer-motion'
import { buildWhatsAppLink } from '../../lib/whatsapp.js'
import { useSiteContent } from '../../hooks/useSiteContent.js'
import './SectorsSection.css'

function SectorsSection() {
  const { sectors, contact } = useSiteContent()

  return (
    <section className="sectors-section">
      <div className="container">
        <span className="eyebrow">Sectores</span>
        <h2 className="section-heading">Soluciones para diferentes negocios</h2>

        <motion.div
          className="sectors-tags"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {sectors.map((sector) => (
            <span key={sector.key} className="sector-tag">{sector.name}</span>
          ))}
        </motion.div>

        <p className="sectors-note">
          Si tu negocio es diferente, también podemos desarrollar una solución personalizada.
        </p>

        <a
          href={buildWhatsAppLink(contact.whatsappMessage, contact.whatsappNumber)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          Cuéntanos qué necesitas
        </a>
      </div>
    </section>
  )
}

export default SectorsSection
