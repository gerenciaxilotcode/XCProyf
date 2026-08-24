function Logo({ size = 32, withWordmark = true, src, className = '' }) {
  return (
    <span className={`xilot-logo ${className}`}>
      {src ? (
        <img src={src} alt="XilotCode" width={size} height={size} className="xilot-logo-image" />
      ) : (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="1.5" y="1.5" width="37" height="37" rx="10" fill="var(--xilot-navy)" stroke="var(--xilot-acid)" strokeWidth="1.5" />
          <path d="M11 11L20 20L11 29" stroke="var(--xilot-acid)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M29 11L20 20L29 29" stroke="var(--xilot-lime)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="11" cy="11" r="1.6" fill="var(--xilot-acid)" />
          <circle cx="11" cy="29" r="1.6" fill="var(--xilot-acid)" />
          <circle cx="29" cy="11" r="1.6" fill="var(--xilot-lime)" />
          <circle cx="29" cy="29" r="1.6" fill="var(--xilot-lime)" />
          <circle cx="20" cy="20" r="2" fill="var(--xilot-white)" />
        </svg>
      )}
      {withWordmark && (
        <span className="xilot-logo-text">
          Xilot<span className="xilot-logo-accent">Code</span>
        </span>
      )}
    </span>
  )
}

export default Logo
