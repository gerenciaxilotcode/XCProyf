import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Hammer } from 'lucide-react'
import { buildWhatsAppLink } from '../lib/whatsapp.js'
import './Projects.css'

function Projects() {
  return (
    <section className="projects-coming-soon">
      <Helmet>
        <title>Trabajos Anteriores | XilotCode</title>
        <meta name="description" content="Muy pronto encontrarás aquí los proyectos y demos desarrollados por XilotCode." />
      </Helmet>

      <div className="container">
        <motion.div
          className="coming-soon-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="coming-soon-icon">
            <Hammer size={26} />
          </div>
          <span className="eyebrow">Trabajos Anteriores</span>
          <h1 className="section-heading">Estamos preparando esta sección</h1>
          <p className="section-subheading">
            Muy pronto podrás ver aquí demos y proyectos de portafolio desarrollados por XilotCode.
            Mientras tanto, cuéntanos sobre tu proyecto y lo platicamos directamente.
          </p>
          <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Hablar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
