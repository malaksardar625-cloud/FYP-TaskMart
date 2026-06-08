import { useCallback } from 'react'
import { Box, Typography, Slider } from '@mui/material'
import { RADIUS_OPTIONS } from '../maps.constants'
import { styles } from './radiusControl.Styles'

const MARKS = RADIUS_OPTIONS.map((v) => ({ value: v, label: `${v}` }))

export function RadiusControl({ value, onChange }) {
  const handleChange = useCallback((_, v) => onChange(v), [onChange])

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.header}>
        <Typography variant="caption" fontWeight={600} color="text.primary">
          Radius
        </Typography>
        <Typography variant="caption" fontWeight={700} color="primary.main">
          {value} km
        </Typography>
      </Box>
      <Slider
        value={value}
        onChange={handleChange}
        min={RADIUS_OPTIONS[0]}
        max={RADIUS_OPTIONS[RADIUS_OPTIONS.length - 1]}
        step={null}
        marks={MARKS}
        size="small"
        sx={{ py: 0.5 }}
      />
    </Box>
  )
}
