import { useRef, useCallback } from 'react'
import { StandaloneSearchBox } from '@react-google-maps/api'
import { Box, TextField, InputAdornment } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
import { styles } from './locationSearch.Styles'

export function LocationSearch({ onPlaceSelect }) {
  const searchRef = useRef(null)

  const handleLoad = useCallback((ref) => {
    searchRef.current = ref
  }, [])

  const handlePlacesChanged = useCallback(() => {
    const places = searchRef.current?.getPlaces()
    if (!places?.length) return
    const loc = places[0].geometry?.location
    if (loc) onPlaceSelect({ lat: loc.lat(), lng: loc.lng() })
  }, [onPlaceSelect])

  return (
    <StandaloneSearchBox
      onLoad={handleLoad}
      onPlacesChanged={handlePlacesChanged}
    >
      <Box sx={styles.wrapper}>
        <TextField
          fullWidth
          placeholder="Search a city, area or address…"
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined
                    fontSize="small"
                    sx={{ color: 'text.disabled' }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </StandaloneSearchBox>
  )
}
