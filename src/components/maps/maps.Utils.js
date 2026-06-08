export function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function normaliseCoords(location) {
  if (!location) return null
  if (typeof location.lat === 'number')
    return { lat: location.lat, lng: location.lng }
  if (Array.isArray(location.coordinates))
    return { lat: location.coordinates[1], lng: location.coordinates[0] }
  return null
}

export function formatDistance(km) {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`
}
