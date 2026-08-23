import tacosflow from './tacosflow/index.js'
import hotelia from './hotelia/index.js'
import inventario from './inventario/index.js'

export const PROJECTS = [tacosflow, hotelia, inventario]

export function getProjectBySlug(slug) {
  return PROJECTS.find((project) => project.slug === slug) || null
}

export function getCategories() {
  return [...new Set(PROJECTS.map((project) => project.category))]
}
