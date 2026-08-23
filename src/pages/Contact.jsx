import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import ContactForm from '../components/contact/ContactForm.jsx'
import { buildWhatsAppLink } from '../lib/whatsapp.js'
import './Contact.css'

function Contact() {
  return (
    <section className="contact-page">
      <Helmet>
        <title>Contacto | XilotCode</title>
        <meta
          name="description"
          content="Cuéntanos qué necesita tu negocio y encontraremos una solución de software que se adapte a tu presupuesto."
        />
      </Helmet>

      <div className="container contact-page-inner">
        <motion.div
          className="contact-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">Contacto</span>
          <h1 className="section-heading">Hablemos de tu proyecto</h1>
          <p className="section-subheading">
            Cuéntanos qué necesitas y encontraremos una solución que se adapte a tu negocio y presupuesto.
          </p>

          <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            Escríbenos por WhatsApp
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
