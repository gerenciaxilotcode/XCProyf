import { Helmet } from 'react-helmet-async'
import Hero from '../components/hero/Hero.jsx'
import ServicesSection from '../components/services/ServicesSection.jsx'
import ProcessSection from '../components/process/ProcessSection.jsx'
import SectorsSection from '../components/sectors/SectorsSection.jsx'
import DifferentiatorsSection from '../components/differentiators/DifferentiatorsSection.jsx'
import CtaSection from '../components/cta/CtaSection.jsx'

function Home() {
  return (
    <>
      <Helmet>
        <title>XilotCode | Desarrollo de Software a la Medida</title>
        <meta
          name="description"
          content="Desarrollamos sitios web, sistemas administrativos, plataformas y soluciones de software a la medida para pequeños y medianos negocios en Querétaro y México."
        />
      </Helmet>

      <Hero />
      <ServicesSection />
      <ProcessSection />
      <SectorsSection />
      <DifferentiatorsSection />
      <CtaSection />
    </>
  )
}

export default Home
