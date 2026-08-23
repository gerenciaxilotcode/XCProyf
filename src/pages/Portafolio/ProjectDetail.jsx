import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Code2 } from 'lucide-react'
import { getProjectBySlug } from './projects/index.js'
import { buildWhatsAppLink } from '../../lib/whatsapp.js'
import { useSiteContent } from '../../hooks/useSiteContent.js'
import './components/ProjectCard.css'
import './ProjectDetail.css'

function ProjectDetail() {
  const { slug } = useParams()
  const { contact } = useSiteContent()
  const project = getProjectBySlug(slug)

  if (!project) {
    return <Navigate to="/portafolio" replace />
  }

  return (
    <section className="project-detail">
      <Helmet>
        <title>{project.category} | {project.name} — XilotCode</title>
        <meta name="description" content={project.shortDescription} />
      </Helmet>

      <div className="container">
        <Link to="/portafolio" className="project-detail-back">
          <ArrowLeft size={16} /> Volver al portafolio
        </Link>

        <motion.div
          className="project-detail-hero"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="project-detail-cover">
            {project.coverImage ? (
              <img src={project.coverImage} alt={project.name} />
            ) : (
              <div className="project-detail-placeholder">
                <Code2 size={32} />
              </div>
            )}
          </div>

          <div>
            {project.status === 'demo' && <span className="project-detail-badge">Proyecto de demostración</span>}
            <span className="project-card-category">{project.category}</span>
            <h1 className="section-heading">{project.name}</h1>
            <p className="section-subheading">{project.description}</p>

            <div className="project-detail-links">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Ver Demo <ExternalLink size={16} />
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Ver código <Github size={16} />
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {(project.problem || project.solution) && (
          <div className="project-detail-grid">
            {project.problem && (
              <div className="project-detail-card">
                <h3>Problema</h3>
                <p>{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div className="project-detail-card">
                <h3>Solución</h3>
                <p>{project.solution}</p>
              </div>
            )}
          </div>
        )}

        {project.features?.length > 0 && (
          <div className="project-detail-section">
            <h2>Funcionalidades</h2>
            <ul className="project-detail-list">
              {project.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>
        )}

        {project.technologies?.length > 0 && (
          <div className="project-detail-section">
            <h2>Tecnologías</h2>
            <div className="project-card-tech">
              {project.technologies.map((tech) => <span key={tech} className="tech-badge">{tech}</span>)}
            </div>
          </div>
        )}

        <div className="project-detail-cta">
          <p>¿Quieres algo parecido para tu negocio?</p>
          <a
            href={buildWhatsAppLink(contact.whatsappMessage, contact.whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

export default ProjectDetail
