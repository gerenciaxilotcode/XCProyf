import { motion } from 'framer-motion'
import { useSiteContent } from '../../hooks/useSiteContent.js'
import { getIcon } from '../../lib/icons.js'
import './DifferentiatorsSection.css'

function DifferentiatorsSection() {
  const { differentiators } = useSiteContent()

  if (!differentiators || differentiators.length === 0) {
    return null
  }

  return (
    <section className="differentiators-section">
      <div className="container">
        <span className="eyebrow">¿Por qué XilotCode?</span>
        <h2 className="section-heading">Desarrollo de software accesible y cercano</h2>

        <div className="differentiators-grid">
          {differentiators.map((diff, index) => {
            const Icon = getIcon(diff.iconKey)
            return (
              <motion.div
                key={diff.key}
                className="differentiator-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Icon size={22} />
                <h3>{diff.title}</h3>
                <p>{diff.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default DifferentiatorsSection
