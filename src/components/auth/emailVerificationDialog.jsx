import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  Stack,
  Typography,
} from '@mui/material'
import { MarkEmailReadOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export function EmailVerificationDialog({ open, email }) {
  const navigate = useNavigate()

  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Coloured top band */}
        <Box
          sx={{
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MarkEmailReadOutlined
              sx={{ fontSize: 36, color: 'primary.contrastText' }}
            />
          </Box>

          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ color: '#fff', letterSpacing: '-0.3px' }}
          >
            Check your inbox
          </Typography>
        </Box>

        {/* Body */}
        <Stack spacing={2} sx={{ px: 3.5, py: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
            We've sent a verification link to{' '}
            <Typography
              component="span"
              variant="body2"
              fontWeight={600}
              color="text.primary"
            >
              {email}
            </Typography>
            . Click the link in the email to activate your account.
          </Typography>

          <Alert
            severity="info"
            variant="outlined"
            sx={{ textAlign: 'left', fontSize: 12 }}
          >
            Didn't get it? Check your spam folder, or wait a minute and try
            again.
          </Alert>

          <Typography variant="caption" color="text.disabled">
            The link expires in 10 minutes.
          </Typography>

          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate('/login')}
            sx={{
              borderRadius: 2,
              py: 1.2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Go to Login
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
