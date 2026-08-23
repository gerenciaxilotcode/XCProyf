import { motion } from 'framer-motion'
import Logo from '../ui/Logo.jsx'
import './KnowUsPrompt.css'

function KnowUsPrompt({ onAnswer }) {
  return (
    <div className="know-screen">
      <div className="boot-grid" />

      <motion.div
        className="know-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Logo size={40} />
        <h1 className="know-title">¿Ya conoces XilotCode?</h1>
        <p className="know-subtitle">
          Desarrollamos software a la medida para pequeños y medianos negocios.
        </p>

        <div className="know-actions">
          <button className="btn-primary" onClick={() => onAnswer(true)}>
            Sí, ya la conozco
          </button>
          <button className="btn-secondary" onClick={() => onAnswer(false)}>
            No, es mi primera vez
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default KnowUsPrompt
