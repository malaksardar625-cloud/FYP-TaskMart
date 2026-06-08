import { useRef } from 'react'
import {
  Paper,
  Stack,
  Box,
  Typography,
  Avatar,
  Button,
  Chip,
} from '@mui/material'
import {
  StorefrontOutlined,
  UploadFileOutlined,
  CloseOutlined,
} from '@mui/icons-material'
import { styles } from './logoUpload.Styles'

export function LogoUpload({
  logoFile,
  logoPreview,
  error,
  onLogoChange,
  onClear,
}) {
  const fileRef = useRef(null) // ref lives here, not in the page

  return (
    <Paper
      elevation={0}
      sx={{ ...styles.paper, borderColor: error ? 'error.main' : 'divider' }}
    >
      <Typography
        variant="subtitle1"
        fontWeight={600}
        color="text.primary"
        mb={0.5}
      >
        Shop Logo
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        A square image (min 200×200 px). PNG, JPG or WEBP, max 5 MB.
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={logoPreview}
          sx={{
            ...styles.avatar,
            borderColor: error ? 'error.main' : 'divider',
          }}
          onClick={() => fileRef.current?.click()}
        >
          {!logoPreview && (
            <StorefrontOutlined sx={{ color: 'text.disabled', fontSize: 32 }} />
          )}
        </Avatar>
        <Box>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={onLogoChange}
          />
          <Button
            variant="outlined"
            size="small"
            startIcon={<UploadFileOutlined />}
            onClick={() => fileRef.current?.click()}
          >
            {logoFile ? 'Change Logo' : 'Upload Logo'}
          </Button>
          {logoFile && (
            <Stack direction="row" spacing={0.5} alignItems="center" mt={1}>
              <Chip
                label={logoFile.name}
                size="small"
                onDelete={onClear}
                deleteIcon={<CloseOutlined />}
                sx={{ maxWidth: 200, fontSize: '0.7rem' }}
              />
            </Stack>
          )}
          {error && (
            <Typography
              variant="caption"
              color="error"
              sx={{ display: 'block', mt: 0.5 }}
            >
              {error}
            </Typography>
          )}
        </Box>
      </Stack>
    </Paper>
  )
}
