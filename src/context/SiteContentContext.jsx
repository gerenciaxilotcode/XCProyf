import { createContext, useEffect, useMemo, useState } from 'react'
import { fetchPublicContent } from '../services/contentService.js'
import {
  DEFAULT_HERO,
  DEFAULT_CTA,
  DEFAULT_BRAND,
  DEFAULT_CONTACT,
  DEFAULT_PROCESS_STEPS,
  DEFAULT_SERVICES,
  DEFAULT_SECTORS,
  DEFAULT_DIFFERENTIATORS,
  DEFAULT_OFFERS
} from '../lib/defaultContent.js'

export const SiteContentContext = createContext(null)

export function SiteContentProvider({ children }) {
  const [state, setState] = useState({ data: null, status: 'loading' })

  useEffect(() => {
    let cancelled = false

    fetchPublicContent()
      .then((data) => {
        if (!cancelled) setState({ data, status: 'ready' })
      })
      .catch(() => {
        if (!cancelled) setState({ data: null, status: 'error' })
      })

    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(() => {
    const live = state.data
    const isReady = state.status === 'ready'

    return {
      status: state.status,
      hero: live?.hero || DEFAULT_HERO,
      cta: live?.cta || DEFAULT_CTA,
      brand: live?.brand || DEFAULT_BRAND,
      contact: live?.contact || DEFAULT_CONTACT,
      processSteps: isReady ? live.processSteps || [] : DEFAULT_PROCESS_STEPS,
      services: isReady ? live.services || [] : DEFAULT_SERVICES,
      sectors: isReady ? live.sectors || [] : DEFAULT_SECTORS,
      differentiators: isReady ? live.differentiators || [] : DEFAULT_DIFFERENTIATORS,
      offers: isReady ? live.offers || [] : DEFAULT_OFFERS
    }
  }, [state])

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}
