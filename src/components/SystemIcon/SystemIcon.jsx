const icons = {
  control: (
    <><circle cx="17" cy="17" r="10" /><path d="M17 10v7l5 3M7 17H3M31 17h-4" /><rect x="14.5" y="14.5" width="5" height="5" transform="rotate(45 17 17)" /></>
  ),
  private: (
    <><path d="M5 6h24v23H5zM10 20v-5l7-5 7 5v9H10z" /><path d="M5 11H2M32 11h-3M10 29v3M24 29v3" /><rect x="14.5" y="18.5" width="5" height="5" transform="rotate(45 17 21)" /></>
  ),
  business: (
    <><path d="M7 29V10h12V5h9v24M3 29h28" /><path d="M11 15h4M11 20h4M11 25h4M23 10h5M23 15h5M23 20h5" /><rect x="20.5" y="24.5" width="5" height="5" transform="rotate(45 23 27)" /></>
  ),
  monitor: (
    <><path d="M4 12V5h7M23 5h7v7M30 22v7h-7M11 29H4v-7" /><circle cx="17" cy="17" r="7" /><rect x="14.5" y="14.5" width="5" height="5" transform="rotate(45 17 17)" /></>
  ),
  reaction: (
    <><circle cx="7" cy="17" r="3" /><path d="M10 17h16M21 11l6 6-6 6M7 10V6M7 28v-4" /><rect x="23.5" y="14.5" width="5" height="5" transform="rotate(45 26 17)" /></>
  ),
  protection: (
    <><path d="M5 6h24v22H5zM10 11h14v12H10z" /><path d="M5 11H2M32 11h-3M10 28v3M24 28v3" /><rect x="14.5" y="14.5" width="5" height="5" transform="rotate(45 17 17)" /></>
  ),
  system: (
    <><path d="M8 9h9v8h9M8 26h9v-9M26 17v9h-9" /><circle cx="8" cy="9" r="3" /><circle cx="8" cy="26" r="3" /><circle cx="26" cy="26" r="3" /><rect x="14.5" y="14.5" width="5" height="5" transform="rotate(45 17 17)" /></>
  ),
}

export default function SystemIcon({ type, className = '' }) {
  return (
    <svg className={`system-icon ${className}`.trim()} viewBox="0 0 34 34" fill="none" aria-hidden="true" focusable="false">
      <g className="system-icon__geometry" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" strokeLinejoin="miter">
        {icons[type] || icons.system}
      </g>
    </svg>
  )
}
