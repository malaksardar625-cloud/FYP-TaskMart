import { Box, Stack, Typography } from '@mui/material'
import { Storefront } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import * as S from './logo.Styles'

export function Logo({ size = 'h5' }) {
  const navigate = useNavigate()

  const handleNavigateHome = () => navigate('/')

  return (
    <Stack
      direction="row"
      onClick={handleNavigateHome}
      spacing={1}
      sx={{ alignItems: 'center', cursor: 'pointer' }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 2,
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Storefront sx={{ color: 'white', fontSize: 20 }} />
      </Box>

      <Typography variant={size} sx={{ fontWeight: 800 }}>
        Task
        <Box component="span" sx={{ color: 'secondary.main' }}>
          Mart
        </Box>
      </Typography>
    </Stack>
  )
}
