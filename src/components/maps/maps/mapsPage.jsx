import { useState, useCallback, useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useJsApiLoader, InfoWindow } from '@react-google-maps/api'
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material'
import { ArrowBackOutlined, PlaceOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../navbar/navbar'
import {
  MapContainer,
  MapMarker,
  MapInfoCard,
  RadiusControl,
  MapFilters,
  ResultsSidebar,
  UserLocationButton,
  LocationSearch,
} from '../index'
import { haversineDistance, normaliseCoords } from '../maps.utils'
import { DEFAULT_CENTER, DEFAULT_ZOOM, LIBRARIES } from '../maps.constants'
import { styles } from './maps.Styles'

const fetchJson = async (url) => {
  const res = await fetch(`http://localhost:5000${url}`, {
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Fetch failed')
  return res.json()
}

export default function MapsPage() {
  const navigate = useNavigate()

  // ── Google Maps loader (hoisted to page so children don't reload) ──
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: LIBRARIES,
  })

  // ── State ─────────────────────────────────────────────────────────
  const [center, setCenter] = useState(DEFAULT_CENTER)
  const [radiusKm, setRadiusKm] = useState(5)
  const [roleFilter, setRoleFilter] = useState('all')
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [locating, setLocating] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  })

  // ── Snackbar helpers ───────────────────────────────────────────────
  const showSnackbar = useCallback((message, severity = 'info') => {
    setSnackbar({ open: true, message, severity })
  }, [])

  const closeSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }))
  }, [])

  // ── Data fetching ──────────────────────────────────────────────────
  const { data: sellersRes } = useQuery({
    queryKey: ['map-sellers'],
    queryFn: () => fetchJson('/api/sellers?limit=500'),
  })

  const { data: providersRes } = useQuery({
    queryKey: ['map-providers'],
    queryFn: () => fetchJson('/api/providers?limit=500'),
  })

  // ── Derived: normalise + tag ───────────────────────────────────────
  const sellers = useMemo(
    () =>
      (sellersRes?.data ?? sellersRes ?? [])
        .map((s) => ({
          ...s,
          _role: 'seller',
          _coords: normaliseCoords(s.location),
        }))
        .filter((s) => s._coords),
    [sellersRes]
  )

  const providers = useMemo(
    () =>
      (providersRes?.data ?? providersRes ?? [])
        .map((p) => ({
          ...p,
          _role: 'provider',
          _coords: normaliseCoords(p.location),
        }))
        .filter((p) => p._coords),
    [providersRes]
  )

  const allEntries = useMemo(
    () => [...sellers, ...providers],
    [sellers, providers]
  )

  // ── Derived: compute distances once, reuse across filter + counts ──
  const allEntriesWithDistance = useMemo(
    () =>
      allEntries.map((e) => ({
        ...e,
        _distance: haversineDistance(
          center.lat,
          center.lng,
          e._coords.lat,
          e._coords.lng
        ),
      })),
    [allEntries, center]
  )

  const withDistanceAndFilter = useMemo(
    () =>
      allEntriesWithDistance
        .filter(
          (e) =>
            (roleFilter === 'all' || e._role === roleFilter) &&
            e._distance <= radiusKm
        )
        .sort((a, b) => a._distance - b._distance),
    [allEntriesWithDistance, roleFilter, radiusKm]
  )

  const counts = useMemo(() => {
    const inRadius = allEntriesWithDistance.filter(
      (e) => e._distance <= radiusKm
    )
    return {
      all: inRadius.length,
      seller: inRadius.filter((e) => e._role === 'seller').length,
      provider: inRadius.filter((e) => e._role === 'provider').length,
    }
  }, [allEntriesWithDistance, radiusKm])

  // ── Geolocation ────────────────────────────────────────────────────
  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) {
      showSnackbar('Geolocation not supported by your browser', 'error')
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCenter({ lat: coords.latitude, lng: coords.longitude })
        setSelectedEntry(null)
        setLocating(false)
        showSnackbar('Location updated to your current position', 'success')
      },
      () => {
        setLocating(false)
        showSnackbar('Could not get your location', 'error')
      },
      { timeout: 8000 }
    )
  }, [showSnackbar])

  // Auto-locate on mount — all setState calls are inside async callbacks only
  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCenter({ lat: coords.latitude, lng: coords.longitude })
      },
      () => {},
      { timeout: 8000 }
    )
  }, [])

  // ── Handlers ───────────────────────────────────────────────────────
  const handleNavigateBack = useCallback(() => navigate(-1), [navigate])

  const handleMarkerClick = useCallback((entry) => setSelectedEntry(entry), [])

  const handleMapClick = useCallback(() => setSelectedEntry(null), [])

  const handleInfoWindowClose = useCallback(() => setSelectedEntry(null), [])

  const handleSidebarSelect = useCallback((entry) => {
    setSelectedEntry(entry)
    setCenter(entry._coords)
  }, [])

  const handlePlaceSelect = useCallback((coords) => {
    setCenter(coords)
    setSelectedEntry(null)
  }, [])

  return (
    <Box sx={styles.root}>
      <Navbar />

      {/* ── Top bar ── */}
      <Box sx={styles.topBar}>
        <IconButton size="small" onClick={handleNavigateBack}>
          <ArrowBackOutlined fontSize="small" />
        </IconButton>
        <Typography
          variant="subtitle1"
          fontWeight={700}
          color="text.primary"
          sx={{ flexShrink: 0 }}
        >
          Explore Nearby
        </Typography>
        <MapFilters
          active={roleFilter}
          onChange={setRoleFilter}
          counts={counts}
        />
      </Box>

      {/* ── Body ── */}
      <Box sx={styles.body}>
        {/* ── Map area ── */}
        <Box sx={styles.mapWrapper}>
          <MapContainer
            isLoaded={isLoaded}
            loadError={loadError}
            center={center}
            zoom={DEFAULT_ZOOM}
            radiusKm={radiusKm}
            onClick={handleMapClick}
          >
            {withDistanceAndFilter.map((entry) => (
              <MapMarker
                key={entry._id}
                entry={entry}
                role={entry._role}
                selected={selectedEntry?._id === entry._id}
                onClick={handleMarkerClick}
              />
            ))}

            {selectedEntry && (
              <InfoWindow
                position={selectedEntry._coords}
                onCloseClick={handleInfoWindowClose}
                options={{ pixelOffset: { width: 0, height: -14 } }}
              >
                <MapInfoCard
                  entry={selectedEntry}
                  role={selectedEntry._role}
                  distance={selectedEntry._distance}
                />
              </InfoWindow>
            )}
          </MapContainer>

          {/* Floating: search + radius */}
          <Box sx={styles.floatingControls}>
            {isLoaded && <LocationSearch onPlaceSelect={handlePlaceSelect} />}
            <RadiusControl value={radiusKm} onChange={setRadiusKm} />
          </Box>

          {/* My location button */}
          <Box sx={styles.locateBtn}>
            <UserLocationButton loading={locating} onClick={handleLocate} />
          </Box>

          {/* Stats bar */}
          <Box sx={styles.statsBar}>
            <Paper elevation={0} sx={styles.statsPaper}>
              <PlaceOutlined sx={{ fontSize: 14, color: 'primary.main' }} />
              <Typography variant="caption" color="text.secondary">
                <strong>{withDistanceAndFilter.length}</strong> result
                {withDistanceAndFilter.length !== 1 ? 's' : ''} within{' '}
                {radiusKm} km
              </Typography>
            </Paper>
          </Box>
        </Box>

        {/* ── Results sidebar ── */}
        <ResultsSidebar
          results={withDistanceAndFilter}
          selectedId={selectedEntry?._id}
          onSelect={handleSidebarSelect}
        />
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={closeSnackbar}
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
