import { Link } from 'react-router-dom'
import { ArrowRight, Code2 } from 'lucide-react'
import './ProjectCard.css'

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card-cover">
        {project.coverImage ? (
          <img src={project.coverImage} alt={project.name} loading="lazy" />
        ) : (
          <div className="project-card-placeholder">
            <Code2 size={22} />
            <span>{project.name.charAt(0)}</span>
          </div>
        )}
        {project.status === 'demo' && <span className="project-card-badge">Proyecto de demostración</span>}
      </div>

      <div className="project-card-body">
        <span className="project-card-category">{project.category}</span>
        <h3>{project.name}</h3>
        <p>{project.shortDescription}</p>

        <div className="project-card-tech">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="tech-badge">{tech}</span>
          ))}
        </div>

        <Link to={`/portafolio/${project.slug}`} className="project-card-link">
          Ver proyecto <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  )
}

export default ProjectCard
