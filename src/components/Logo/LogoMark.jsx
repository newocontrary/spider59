import './Logo.css'
import { logoGeometry } from './logoGeometry.js'

export default function LogoMark({ accent = true, className = '' }) {
  return (
    <svg className={`logo-mark ${className}`.trim()} viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
      <path className="logo-mark__route" d={logoGeometry.route} pathLength="100" />
      {logoGeometry.branches.map((branch) => <path className="logo-mark__branch" d={branch} pathLength="20" key={branch} />)}
      <rect className={`logo-mark__node${accent ? ' logo-mark__node--accent' : ''}`} x="14.25" y="14.25" width="3.5" height="3.5" transform="rotate(45 16 16)" />
    </svg>
  )
}
