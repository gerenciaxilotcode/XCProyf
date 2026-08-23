import { motion } from 'framer-motion'
import { useSiteContent } from '../../hooks/useSiteContent.js'
import './ProcessSection.css'

function ProcessSection() {
  const { processSteps } = useSiteContent()

  return (
    <section id="nosotros" className="process-section">
      <div className="container">
        <span className="eyebrow">Cómo trabajamos</span>
        <h2 className="section-heading">Un proceso claro, de principio a fin</h2>
        <p className="section-subheading">
          Trabajamos directamente contigo para entender lo que realmente necesitas.
        </p>

        <div className="process-grid">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.key}
              className="process-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
            >
              <span className="process-number">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-desc">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
