import { useEffect, useRef, useState } from 'react'

const HEALTH_URL = import.meta.env.VITE_API_HEALTH_URL
const RETRY_DELAYS_MS = [1500, 2500, 4000, 6500, 10000]
const REQUEST_TIMEOUT_MS = 8000

async function pingHealth() {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(HEALTH_URL, { signal: controller.signal })
    return response.ok
  } catch {
    return false
  } finally {
    clearTimeout(timer)
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function useRenderWarmup() {
  const [status, setStatus] = useState('waking')
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current || !HEALTH_URL) {
      if (!HEALTH_URL) setStatus('ready')
      return
    }
    startedRef.current = true

    let cancelled = false

    async function run() {
      const firstAttemptOk = await pingHealth()

      if (cancelled) return

      if (firstAttemptOk) {
        setStatus('ready')
        return
      }

      for (const delay of RETRY_DELAYS_MS) {
        await wait(delay)
        if (cancelled) return

        const ok = await pingHealth()
        if (cancelled) return

        if (ok) {
          setStatus('ready')
          return
        }
      }

      if (!cancelled) {
        setStatus('timeout')
      }
    }

    run()

    return () => {
      cancelled = true
    }
  }, [])

  return status
}
