type ScreenTooltipProps = {
  label: string
  visible: boolean
  external?: boolean
  download?: boolean
}

const iconClassName = "ml-1.5 opacity-85 shrink-0"

const externalLinkIcon = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClassName}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const downloadIcon = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClassName}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

export function ScreenTooltip({ label, visible, external, download }: ScreenTooltipProps) {
  return (
    <span
      className={`inline-flex items-center text-left whitespace-nowrap font-medium text-[15px] tracking-wide text-white/92 transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {label}
      {download ? downloadIcon : external ? externalLinkIcon : null}
    </span>
  )
}
