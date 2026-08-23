import ServiceCard from './ServiceCard.jsx'
import { useSiteContent } from '../../hooks/useSiteContent.js'
import { getIcon } from '../../lib/icons.js'
import './ServicesSection.css'

function ServicesSection() {
  const { services } = useSiteContent()

  return (
    <section id="servicios" className="services-section">
      <div className="container">
        <span className="eyebrow">Servicios</span>
        <h2 className="section-heading">Soluciones que se adaptan a tu negocio</h2>
        <p className="section-subheading">
          No necesitas adaptar tu negocio a un software genérico. Construimos lo que tu operación necesita.
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard
              key={service.key}
              index={index}
              icon={getIcon(service.iconKey)}
              title={service.title}
              description={service.description}
              imageUrl={service.imageAsset?.secureUrl}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
