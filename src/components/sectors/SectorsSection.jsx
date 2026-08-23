import { motion } from 'framer-motion'
import { buildWhatsAppLink } from '../../lib/whatsapp.js'
import './SectorsSection.css'

const SECTORS = [
  'Taquerías', 'Restaurantes', 'Hoteles', 'Colegios', 'Inmobiliarias',
  'Agencias de viajes', 'Clínicas', 'Despachos contables', 'Salones de belleza',
  'Tiendas', 'Talleres automotrices', 'Ferreterías', 'Servicios profesionales'
]

function SectorsSection() {
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
          {SECTORS.map((sector) => (
            <span key={sector} className="sector-tag">{sector}</span>
          ))}
        </motion.div>

        <p className="sectors-note">
          Si tu negocio es diferente, también podemos desarrollar una solución personalizada.
        </p>

        <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          Cuéntanos qué necesitas
        </a>
      </div>
    </section>
  )
}

export default SectorsSection
