import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { buildWhatsAppLink } from '../../lib/whatsapp.js'
import { useSiteContent } from '../../hooks/useSiteContent.js'
import './OffersSection.css'

function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return null
  }
}

function OfferValidity({ startDate, endDate }) {
  if (!startDate && !endDate) return null

  if (endDate) {
    return <span className="offer-validity">Vigente hasta {formatDate(endDate)}</span>
  }

  return <span className="offer-validity">Disponible desde {formatDate(startDate)}</span>
}

function OffersSection() {
  const { offers, contact } = useSiteContent()
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  function updateScrollState() {
    const track = trackRef.current
    if (!track) return
    setCanScrollLeft(track.scrollLeft > 4)
    setCanScrollRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 4)
  }

  useEffect(() => {
    updateScrollState()
    const track = trackRef.current
    if (!track) return undefined

    track.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      track.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [offers])

  function scrollByCard(direction) {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.offer-card')
    const step = card ? card.getBoundingClientRect().width + 20 : track.clientWidth * 0.8
    track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  if (!offers || offers.length === 0) {
    return null
  }

  return (
    <section className="offers-section" id="ofertas">
      <div className="container">
        <div className="offers-header">
          <div>
            <span className="eyebrow">Ofertas XilotCode</span>
            <h2 className="section-heading">Aprovecha nuestras promociones</h2>
          </div>

          {offers.length > 1 && (
            <div className="offers-nav">
              <button
                type="button"
                className="offers-nav-btn"
                onClick={() => scrollByCard(-1)}
                disabled={!canScrollLeft}
                aria-label="Ver ofertas anteriores"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="offers-nav-btn"
                onClick={() => scrollByCard(1)}
                disabled={!canScrollRight}
                aria-label="Ver más ofertas"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="offers-track" ref={trackRef}>
          {offers.map((offer, index) => (
            <motion.article
              key={offer.id}
              className="offer-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.08 }}
            >
              <div className="offer-image-wrap">
                {offer.imageAsset?.secureUrl ? (
                  <img src={offer.imageAsset.secureUrl} alt={offer.title} className="offer-image" loading="lazy" />
                ) : (
                  <div className="offer-image-placeholder" aria-hidden="true" />
                )}
              </div>
              <div className="offer-body">
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
                <div className="offer-meta">
                  {offer.priceText && <span className="offer-price">{offer.priceText}</span>}
                  <OfferValidity startDate={offer.startDate} endDate={offer.endDate} />
                </div>
                <a
                  href={offer.ctaLink || buildWhatsAppLink(contact.whatsappMessage, contact.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary offer-cta"
                >
                  {offer.ctaLabel || 'Consultar'}
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
