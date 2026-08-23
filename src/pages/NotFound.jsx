import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Braces } from 'lucide-react'
import './NotFound.css'

function NotFound() {
  return (
    <section className="not-found">
      <Helmet>
        <title>Página no encontrada | XilotCode</title>
      </Helmet>

      <motion.div
        className="not-found-icon"
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Braces size={48} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Ups... parece que este código no existe.
      </motion.p>

      <Link to="/" className="btn-primary">Volver al inicio</Link>
    </section>
  )
}

export default NotFound
