import { motion } from 'framer-motion'
import { buildWhatsAppLink } from '../../lib/whatsapp.js'
import { useSiteContent } from '../../hooks/useSiteContent.js'
import './OffersSection.css'

function OffersSection() {
  const { offers, contact } = useSiteContent()

  if (!offers || offers.length === 0) {
    return null
  }

  return (
    <section className="offers-section">
      <div className="container">
        <span className="eyebrow">Ofertas</span>
        <h2 className="section-heading">Promociones activas</h2>

        <div className="offers-grid">
          {offers.map((offer, index) => (
            <motion.article
              key={offer.id}
              className="offer-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {offer.imageAsset?.secureUrl && (
                <img src={offer.imageAsset.secureUrl} alt="" className="offer-image" loading="lazy" />
              )}
              <div className="offer-body">
                <h3>{offer.title}</h3>
                {offer.priceText && <span className="offer-price">{offer.priceText}</span>}
                <p>{offer.description}</p>
                <a
                  href={offer.ctaLink || buildWhatsAppLink(contact.whatsappMessage, contact.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  {offer.ctaLabel || 'Más información'}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OffersSection
