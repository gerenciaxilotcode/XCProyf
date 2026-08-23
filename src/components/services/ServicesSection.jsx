import { Globe, LayoutDashboard, ShoppingCart, Boxes, Workflow, Wrench } from 'lucide-react'
import ServiceCard from './ServiceCard.jsx'
import './ServicesSection.css'

const SERVICES = [
  {
    icon: Globe,
    title: 'Sitios web profesionales',
    description: 'Presencia digital clara y rápida que representa lo que tu negocio realmente hace.'
  },
  {
    icon: LayoutDashboard,
    title: 'Sistemas administrativos',
    description: 'Centraliza clientes, ventas, inventario, usuarios y procesos en una sola plataforma.'
  },
  {
    icon: ShoppingCart,
    title: 'Tiendas en línea',
    description: 'Vende tus productos o servicios con un flujo de compra simple y confiable.'
  },
  {
    icon: Boxes,
    title: 'Plataformas digitales',
    description: 'Herramientas a medida para operar, coordinar equipos y dar seguimiento a tu negocio.'
  },
  {
    icon: Workflow,
    title: 'Automatización de procesos',
    description: 'Reduce tareas repetitivas y libera tiempo para lo que realmente importa.'
  },
  {
    icon: Wrench,
    title: 'Sistemas personalizados',
    description: 'Cuando ninguna herramienta genérica se ajusta a tu operación, construimos una que sí.'
  }
]

function ServicesSection() {
  return (
    <section id="servicios" className="services-section">
      <div className="container">
        <span className="eyebrow">Servicios</span>
        <h2 className="section-heading">Soluciones que se adaptan a tu negocio</h2>
        <p className="section-subheading">
          No necesitas adaptar tu negocio a un software genérico. Construimos lo que tu operación necesita.
        </p>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
