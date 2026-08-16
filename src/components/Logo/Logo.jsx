import LogoMark from './LogoMark.jsx'
import './Logo.css'

export default function Logo({ compact = false, markOnly = false, accent = true }) {
  const variant = markOnly ? 'mark-only' : compact ? 'compact' : 'full'

  return (
    <span className={`logo logo--${variant}`} aria-hidden="true">
      <LogoMark accent={accent} />
      {!markOnly && <span className="logo__wordmark">
        <span className="logo__name">SPIDER</span>
        {!compact && <span className="logo__descriptor">Security</span>}
      </span>}
    </span>
  )
}
