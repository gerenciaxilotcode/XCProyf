import { motion } from 'framer-motion'
import './ServiceCard.css'

function ServiceCard({ icon: Icon, title, description, index = 0 }) {
  return (
    <motion.article
      className="service-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
    >
      <div className="service-icon">
        <Icon size={22} />
      </div>
      <h3 className="service-title">{title}</h3>
      <p className="service-desc">{description}</p>
    </motion.article>
  )
}

export default ServiceCard
