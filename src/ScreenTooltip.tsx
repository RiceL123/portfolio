type ScreenTooltipProps = {
  label: string
  visible: boolean
}

export function ScreenTooltip({ label, visible }: ScreenTooltipProps) {
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
      }}
    >
      {label}
    </span>
  )
}
