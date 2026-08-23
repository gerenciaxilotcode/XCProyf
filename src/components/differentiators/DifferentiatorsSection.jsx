import { motion } from 'framer-motion'
import { Target, Wallet, TrendingUp, Handshake } from 'lucide-react'
import './DifferentiatorsSection.css'

const ITEMS = [
  { icon: Target, title: 'A medida', description: 'No necesitas adaptar tu negocio a un software genérico.' },
  { icon: Wallet, title: 'Presupuesto', description: 'Desarrollamos soluciones considerando el tamaño y presupuesto de tu negocio.' },
  { icon: TrendingUp, title: 'Escalable', description: 'Construimos pensando en que tu negocio pueda crecer.' },
  { icon: Handshake, title: 'Cercano', description: 'Trabajamos directamente contigo para entender lo que realmente necesitas.' }
]

function DifferentiatorsSection() {
  return (
    <section className="differentiators-section">
      <div className="container">
        <span className="eyebrow">¿Por qué XilotCode?</span>
        <h2 className="section-heading">Desarrollo de software accesible y cercano</h2>

        <div className="differentiators-grid">
          {ITEMS.map((diff, index) => (
            <motion.div
              key={diff.title}
              className="differentiator-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <diff.icon size={22} />
              <h3>{diff.title}</h3>
              <p>{diff.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DifferentiatorsSection
