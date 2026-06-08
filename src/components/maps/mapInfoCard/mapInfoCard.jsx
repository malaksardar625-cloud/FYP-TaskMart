import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Stack, Avatar, Typography, Chip, Button } from '@mui/material'
import {
  StorefrontOutlined,
  HandymanOutlined,
  PlaceOutlined,
} from '@mui/icons-material'
import { formatDistance } from '../maps.utils'
import { styles } from './mapInfoCard.Styles'

export function MapInfoCard({ entry, role, distance }) {
  const navigate = useNavigate()
  const isSeller = role === 'seller'
  const name = isSeller ? entry.shopName : entry.title
  const avatarSrc = isSeller ? entry.logoUrl : entry.profileImageUrl
  const path = isSeller ? `/sellers/${entry._id}` : `/providers/${entry._id}`

  const handleViewClick = useCallback(() => navigate(path), [navigate, path])

  return (
    <Box sx={styles.root}>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
        <Avatar src={avatarSrc} variant="rounded" sx={styles.avatar}>
          {isSeller ? <StorefrontOutlined /> : <HandymanOutlined />}
        </Avatar>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={styles.name}>{name}</Typography>
          {isSeller ? (
            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
              display="block"
            >
              {entry.shopDescription}
            </Typography>
          ) : (
            <Stack
              direction="row"
              spacing={0.5}
              sx={{ flexWrap: 'wrap', mt: 0.25 }}
            >
              {entry.skills?.slice(0, 3).map((s) => (
                <Chip key={s} label={s} size="small" sx={styles.chip} />
              ))}
            </Stack>
          )}
        </Box>
      </Stack>

      {distance != null && (
        <Box sx={styles.distRow}>
          <PlaceOutlined sx={{ fontSize: 13, color: 'text.disabled' }} />
          <Typography variant="caption" color="text.secondary">
            {formatDistance(distance)} away
          </Typography>
          {entry.isApproved && (
            <Chip
              label="Approved"
              size="small"
              color="success"
              sx={{ ...styles.chip, ml: 'auto' }}
            />
          )}
        </Box>
      )}

      <Button
        variant="contained"
        size="small"
        fullWidth
        onClick={handleViewClick}
        sx={styles.viewBtn}
      >
        View {isSeller ? 'Shop' : 'Profile'} →
      </Button>
    </Box>
  )
}
