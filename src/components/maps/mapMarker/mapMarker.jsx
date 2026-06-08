import { Marker } from '@react-google-maps/api'
import { MARKER_COLORS } from '../maps.constants'

function makeIcon(color, scale = 9) {
  return {
    path: window.google?.maps?.SymbolPath?.CIRCLE ?? 0,
    fillColor: color,
    fillOpacity: 1,
    strokeColor: '#ffffff',
    strokeWeight: 2.5,
    scale,
  }
}

export function MapMarker({ entry, role, selected, onClick }) {
  const color = selected
    ? MARKER_COLORS.selected
    : (MARKER_COLORS[role] ?? MARKER_COLORS.seller)
  const scale = selected ? 12 : 9

  return (
    <Marker
      position={entry._coords}
      title={entry.shopName || entry.title || 'Location'}
      icon={makeIcon(color, scale)}
      zIndex={selected ? 10 : 1}
      animation={selected ? window.google?.maps?.Animation?.BOUNCE : undefined}
      onClick={() => onClick(entry)}
    />
  )
}
