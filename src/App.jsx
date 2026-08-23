import { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes.jsx'
import EntryExperience from './components/intro/EntryExperience.jsx'
import { useSiteContent } from './hooks/useSiteContent.js'

function FaviconSync() {
  const { brand } = useSiteContent()

  useEffect(() => {
    const url = brand.faviconAsset?.secureUrl
    if (!url) return

    let link = document.querySelector("link[rel='icon']")
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.type = ''
    link.href = url
  }, [brand.faviconAsset])

  return null
}

function App() {
  return (
    <EntryExperience>
      <FaviconSync />
      <AppRoutes />
    </EntryExperience>
  )
}

export default App
