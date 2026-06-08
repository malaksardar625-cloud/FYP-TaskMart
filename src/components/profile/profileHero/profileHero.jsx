import { useRef } from 'react'
import {
  Box,
  Paper,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Chip,
  CircularProgress,
  Tooltip,
} from '@mui/material'
import { CameraAltOutlined } from '@mui/icons-material'
import { styles } from './profileHero.Styles'

export function ProfileHero({
  coverUrl,
  avatarUrl,
  fullName,
  userName,
  roles,
  initials,
  onAvatarChange,
  onCoverChange,
  avatarPending,
  coverPending,
}) {
  const avatarRef = useRef(null)
  const coverRef = useRef(null)

  return (
    <Paper elevation={0} sx={styles.paper}>
      {/* Cover */}
      <Box sx={styles.coverBox}>
        {coverUrl ? (
          <Box
            component="img"
            src={coverUrl}
            alt="cover"
            sx={styles.coverImg}
          />
        ) : (
          <Box sx={styles.coverGradient} />
        )}
        <Tooltip title="Change cover photo">
          <IconButton
            size="small"
            onClick={() => coverRef.current?.click()}
            disabled={coverPending}
            sx={styles.coverUploadBtn}
          >
            {coverPending ? (
              <CircularProgress size={16} />
            ) : (
              <CameraAltOutlined fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
        <input
          ref={coverRef}
          type="file"
          accept="image/*"
          hidden
          onChange={onCoverChange}
        />
      </Box>

      {/* Avatar + name */}
      <Box sx={{ px: { xs: 2, sm: 3 }, pb: 3 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'center', sm: 'flex-end' }}
          sx={{ mt: { xs: -6, sm: -7 } }}
        >
          <Box sx={{ position: 'relative', flexShrink: 0 }}>
            <Avatar src={avatarUrl} sx={styles.avatar}>
              {!avatarUrl && initials}
            </Avatar>
            <Tooltip title="Change profile photo">
              <IconButton
                size="small"
                onClick={() => avatarRef.current?.click()}
                disabled={avatarPending}
                sx={styles.avatarUploadBtn}
              >
                {avatarPending ? (
                  <CircularProgress size={14} />
                ) : (
                  <CameraAltOutlined sx={{ fontSize: 15 }} />
                )}
              </IconButton>
            </Tooltip>
            <input
              ref={avatarRef}
              type="file"
              accept="image/*"
              hidden
              onChange={onAvatarChange}
            />
          </Box>

          <Box sx={styles.nameBox}>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              {fullName || 'Your Name'}
            </Typography>
            {userName && (
              <Typography variant="body2" color="text.secondary">
                @{userName}
              </Typography>
            )}
            <Stack
              direction="row"
              spacing={0.75}
              flexWrap="wrap"
              mt={0.75}
              justifyContent={{ xs: 'center', sm: 'flex-start' }}
            >
              {roles?.map((r) => (
                <Chip
                  key={r}
                  label={r}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={styles.chip}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Paper>
  )
}
