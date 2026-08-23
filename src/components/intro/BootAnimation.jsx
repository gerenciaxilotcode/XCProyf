import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../ui/Logo.jsx'
import { shuffleScenarios } from './scenarios.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import './BootAnimation.css'

const MIN_DURATION_MS = 4200
const MAX_DURATION_MS = 15000
const SCENARIO_INTERVAL_MS = 2100

function BootAnimation({ warmupStatus, onComplete }) {
  const scenarios = useMemo(() => shuffleScenarios(), [])
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [minElapsed, setMinElapsed] = useState(false)
  const completedRef = useRef(false)
  const reducedMotion = useReducedMotion()

  function complete() {
    if (completedRef.current) return
    completedRef.current = true
    onComplete()
  }

  useEffect(() => {
    const minTimer = setTimeout(() => setMinElapsed(true), reducedMotion ? 800 : MIN_DURATION_MS)
    const maxTimer = setTimeout(complete, reducedMotion ? 2000 : MAX_DURATION_MS)
    return () => {
      clearTimeout(minTimer)
      clearTimeout(maxTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (minElapsed && (warmupStatus === 'ready' || warmupStatus === 'timeout')) {
      complete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minElapsed, warmupStatus])

  useEffect(() => {
    if (reducedMotion) return undefined
    const interval = setInterval(() => {
      setScenarioIndex((prev) => (prev + 1) % scenarios.length)
    }, SCENARIO_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [scenarios.length, reducedMotion])

  const scenario = scenarios[scenarioIndex]

  return (
    <div className="boot-screen">
      <div className="boot-grid" />
      <div className="boot-glow" />

      <motion.div
        className="boot-logo"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Logo size={44} />
      </motion.div>

      <div className="boot-scenario">
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="boot-scenario-card"
          >
            <p className="boot-scenario-title">{scenario.title}</p>
            <p className="boot-scenario-desc">{scenario.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="boot-dots" aria-hidden="true">
        {scenarios.map((item, index) => (
          <span key={item.title} className={`boot-dot ${index === scenarioIndex ? 'boot-dot-active' : ''}`} />
        ))}
      </div>

      <motion.p
        className="boot-tagline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Automatiza. Optimiza. Crece.
      </motion.p>
    </div>
  )
}

export default BootAnimation
