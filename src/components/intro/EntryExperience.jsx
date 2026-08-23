import { useState } from 'react'
import KnowUsPrompt from './KnowUsPrompt.jsx'
import BootAnimation from './BootAnimation.jsx'
import { useRenderWarmup } from '../../hooks/useRenderWarmup.js'

const SESSION_KEY = 'xilot_entry_seen'

function getInitialPhase() {
  if (typeof window === 'undefined') return 'ask'
  return window.sessionStorage.getItem(SESSION_KEY) ? 'done' : 'ask'
}

function EntryExperience({ children }) {
  const warmupStatus = useRenderWarmup()
  const [phase, setPhase] = useState(getInitialPhase)

  function handleAnswer(alreadyKnows) {
    window.sessionStorage.setItem(SESSION_KEY, '1')
    setPhase(alreadyKnows ? 'done' : 'animating')
  }

  function handleAnimationComplete() {
    setPhase('done')
  }

  if (phase === 'ask') {
    return <KnowUsPrompt onAnswer={handleAnswer} />
  }

  if (phase === 'animating') {
    return <BootAnimation warmupStatus={warmupStatus} onComplete={handleAnimationComplete} />
  }

  return children
}

export default EntryExperience
