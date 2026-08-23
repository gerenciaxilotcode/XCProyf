import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { PROJECTS, getCategories } from './projects/index.js'
import ProjectCard from './components/ProjectCard.jsx'
import './Portafolio.css'

function Portafolio() {
  const categories = useMemo(() => ['Todos', ...getCategories()], [])
  const [activeCategory, setActiveCategory] = useState('Todos')

  const filtered = activeCategory === 'Todos'
    ? PROJECTS
    : PROJECTS.filter((project) => project.category === activeCategory)

  return (
    <section className="portafolio-page">
      <Helmet>
        <title>Portafolio | XilotCode</title>
        <meta
          name="description"
          content="Proyectos y demos de desarrollo de software realizados por XilotCode para distintos tipos de negocio."
        />
      </Helmet>

      <div className="container">
        <span className="eyebrow">Portafolio</span>
        <h1 className="section-heading">Proyectos y demostraciones</h1>
        <p className="section-subheading">
          Ejemplos de soluciones desarrolladas para distintos tipos de negocio. Los proyectos marcados como
          &ldquo;demostración&rdquo; son ejercicios de portafolio, no clientes reales.
        </p>

        <div className="portafolio-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`portafolio-filter ${activeCategory === category ? 'portafolio-filter-active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="admin-empty">
            <p>No encontramos proyectos con esos filtros.</p>
            <button className="btn-secondary" onClick={() => setActiveCategory('Todos')}>Limpiar filtros</button>
          </div>
        ) : (
          <motion.div
            className="portafolio-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Portafolio
