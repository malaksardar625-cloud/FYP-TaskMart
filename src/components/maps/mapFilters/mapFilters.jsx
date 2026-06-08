import { useCallback } from 'react'
import { Stack, Chip } from '@mui/material'
import {
  StorefrontOutlined,
  HandymanOutlined,
  GridViewOutlined,
} from '@mui/icons-material'
import { ROLE_FILTER_OPTIONS } from '../maps.constants'
import { styles } from './mapFilters.Styles'

const ICONS = {
  all: <GridViewOutlined sx={{ fontSize: 15 }} />,
  seller: <StorefrontOutlined sx={{ fontSize: 15 }} />,
  provider: <HandymanOutlined sx={{ fontSize: 15 }} />,
}

function FilterChip({ opt, isActive, count, onChange }) {
  const handleClick = useCallback(
    () => onChange(opt.value),
    [onChange, opt.value]
  )
  const label = count != null ? `${opt.label} (${count})` : opt.label

  return (
    <Chip
      label={label}
      icon={ICONS[opt.value]}
      clickable
      color={isActive ? 'primary' : 'default'}
      variant={isActive ? 'filled' : 'outlined'}
      onClick={handleClick}
      sx={{ ...styles.chip, fontWeight: isActive ? 700 : 400 }}
    />
  )
}

export function MapFilters({ active, onChange, counts }) {
  return (
    <Stack direction="row" sx={styles.wrapper}>
      {ROLE_FILTER_OPTIONS.map((opt) => (
        <FilterChip
          key={opt.value}
          opt={opt}
          isActive={active === opt.value}
          count={counts?.[opt.value]}
          onChange={onChange}
        />
      ))}
    </Stack>
  )
}
