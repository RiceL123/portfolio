type ScreenTooltipProps = {
  label: string
  visible: boolean
  external?: boolean
  download?: boolean
}

const iconStyle = { marginLeft: 6, opacity: 0.85, flexShrink: 0 }

const externalLinkIcon = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const downloadIcon = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

export function ScreenTooltip({ label, visible, external, download }: ScreenTooltipProps) {
  return (
    <span
      style={{
        color: 'rgba(255,255,255,0.92)',
        fontFamily: 'system-ui, sans-serif',
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: '0.02em',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s ease',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      {label}
      {download ? downloadIcon : external ? externalLinkIcon : null}
    </span>
  )
}
