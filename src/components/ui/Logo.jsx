function Logo({ size = 32, withWordmark = true, className = '' }) {
  return (
    <span className={`xilot-logo ${className}`}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="2" y="2" width="36" height="36" rx="9" stroke="#B7FF00" strokeWidth="2" />
        <path d="M13 13L20 20L13 27" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 27H27" stroke="#B7FF00" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      {withWordmark && (
        <span className="xilot-logo-text">
          Xilot<span className="xilot-logo-accent">Code</span>
        </span>
      )}
    </span>
  )
}

export default Logo
