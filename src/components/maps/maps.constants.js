export const DEFAULT_CENTER = { lat: 33.6844, lng: 73.0479 } // Islamabad
export const DEFAULT_ZOOM   = 13
export const RADIUS_OPTIONS = [1, 3, 5, 10, 25]             // km

export const ROLE_FILTER_OPTIONS = [
  { value: 'all',      label: 'All'       },
  { value: 'seller',   label: 'Sellers'   },
  { value: 'provider', label: 'Providers' },
]

export const MARKER_COLORS = {
  seller:   '#1976d2',  // primary blue
  provider: '#9c27b0',  // secondary purple
  selected: '#f44336',  // red
}

export const CIRCLE_OPTIONS = {
  fillColor:     '#1976d2',
  fillOpacity:   0.07,
  strokeColor:   '#1976d2',
  strokeOpacity: 0.4,
  strokeWeight:  1.5,
}

export const LIBRARIES = ['places']