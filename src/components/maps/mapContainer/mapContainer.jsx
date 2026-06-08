import { GoogleMap, Circle } from '@react-google-maps/api'
import { Box, CircularProgress, Typography } from '@mui/material'
import { CIRCLE_OPTIONS } from '../maps.constants'
import { styles } from './mapContainer.styles'

const MAP_OPTIONS = {
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  zoomControl: true,
}

export function MapContainer({
  isLoaded,
  loadError,
  center,
  zoom,
  radiusKm,
  onClick,
  children,
}) {
  if (loadError) {
    return (
      <Box sx={styles.loadBox}>
        <Typography color="error">
          Failed to load Google Maps. Check your API key.
        </Typography>
      </Box>
    )
  }
  if (!isLoaded) {
    return (
      <Box sx={styles.loadBox}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={styles.wrapper}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={zoom}
        options={MAP_OPTIONS}
        onClick={onClick}
      >
        {center && radiusKm && (
          <Circle
            center={center}
            radius={radiusKm * 1000}
            options={CIRCLE_OPTIONS}
          />
        )}
        {children}
      </GoogleMap>
    </Box>
  )
}
