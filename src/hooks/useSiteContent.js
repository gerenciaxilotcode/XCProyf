import { useContext } from 'react'
import { SiteContentContext } from '../context/SiteContentContext.jsx'

export function useSiteContent() {
  const context = useContext(SiteContentContext)
  if (!context) {
    throw new Error('useSiteContent debe usarse dentro de SiteContentProvider')
  }
  return context
}
