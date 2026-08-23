import { motion } from 'framer-motion'
import './ProcessSection.css'

const STEPS = [
  { number: '01', title: 'Analizamos', description: 'Conocemos tu negocio y entendemos qué necesitas.' },
  { number: '02', title: 'Diseñamos', description: 'Convertimos tus necesidades en una experiencia digital clara.' },
  { number: '03', title: 'Desarrollamos', description: 'Construimos el sistema utilizando tecnologías modernas.' },
  { number: '04', title: 'Probamos', description: 'Validamos funcionalidades, seguridad y experiencia.' },
  { number: '05', title: 'Entregamos', description: 'Ponemos tu solución en funcionamiento y te acompañamos.' }
]

function ProcessSection() {
  return (
    <section id="nosotros" className="process-section">
      <div className="container">
        <span className="eyebrow">Cómo trabajamos</span>
        <h2 className="section-heading">Un proceso claro, de principio a fin</h2>
        <p className="section-subheading">
          Trabajamos directamente contigo para entender lo que realmente necesitas.
        </p>

        <div className="process-grid">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              className="process-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
            >
              <span className="process-number">{step.number}</span>
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
