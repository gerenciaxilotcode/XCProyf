import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return undefined

    const id = hash.slice(1)
    let attempts = 0
    let timer

    function tryScroll() {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      attempts += 1
      if (attempts < 20) {
        timer = setTimeout(tryScroll, 100)
      }
    }

    tryScroll()
    return () => clearTimeout(timer)
  }, [pathname, hash])

  return null
}

export default ScrollToHash
