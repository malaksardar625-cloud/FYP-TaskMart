import { useCallback } from 'react'
import { Box, Typography, Stack, Avatar, Chip } from '@mui/material'
import {
  StorefrontOutlined,
  HandymanOutlined,
  PlaceOutlined,
  SearchOffOutlined,
} from '@mui/icons-material'
import { formatDistance } from '../maps.utils'
import { styles } from './resultsSidebar.Styles'

function ResultCard({ entry, selected, onClick }) {
  const isSeller = entry._role === 'seller'
  const name = isSeller ? entry.shopName : entry.title
  const src = isSeller ? entry.logoUrl : entry.profileImageUrl

  const handleClick = useCallback(() => onClick(entry), [onClick, entry])

  return (
    <Box
      sx={{ ...styles.card, ...(selected ? styles.cardActive : {}) }}
      onClick={handleClick}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
        <Avatar src={src} variant="rounded" sx={styles.avatar}>
          {isSeller ? <StorefrontOutlined /> : <HandymanOutlined />}
        </Avatar>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" fontWeight={600} noWrap>
            {name}
          </Typography>

          <Box sx={styles.distRow}>
            <PlaceOutlined sx={{ fontSize: 12, color: 'text.disabled' }} />
            <Typography variant="caption" color="text.secondary">
              {formatDistance(entry._distance)}
            </Typography>
            <Chip
              label={isSeller ? 'Seller' : 'Provider'}
              size="small"
              color={isSeller ? 'primary' : 'secondary'}
              variant="outlined"
              sx={{ ...styles.chip, ml: 0.5 }}
            />
            {entry.isApproved && (
              <Chip label="✓" size="small" color="success" sx={styles.chip} />
            )}
          </Box>

          {!isSeller && entry.skills?.length > 0 && (
            <Stack
              direction="row"
              spacing={0.5}
              sx={{ flexWrap: 'wrap', mt: 0.5 }}
            >
              {entry.skills.slice(0, 3).map((s) => (
                <Chip key={s} label={s} size="small" sx={styles.chip} />
              ))}
              {entry.skills.length > 3 && (
                <Chip
                  label={`+${entry.skills.length - 3}`}
                  size="small"
                  sx={styles.chip}
                />
              )}
            </Stack>
          )}
        </Box>
      </Stack>
    </Box>
  )
}

export function ResultsSidebar({ results, selectedId, onSelect }) {
  return (
    <Box sx={styles.sidebar}>
      <Box sx={styles.header}>
        <Typography variant="subtitle2" fontWeight={700} color="text.primary">
          Nearby Results
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {results.length} found in this area
        </Typography>
      </Box>

      <Box sx={styles.list}>
        {results.length === 0 ? (
          <Box sx={styles.empty}>
            <SearchOffOutlined
              sx={{ fontSize: 40, color: 'text.disabled', mb: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              No results in this area.
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Try increasing the radius or moving the map.
            </Typography>
          </Box>
        ) : (
          results.map((entry) => (
            <ResultCard
              key={entry._id}
              entry={entry}
              selected={selectedId === entry._id}
              onClick={onSelect}
            />
          ))
        )}
      </Box>
    </Box>
  )
}
