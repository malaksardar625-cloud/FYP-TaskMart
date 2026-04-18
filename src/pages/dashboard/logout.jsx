import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from '@mui/material'
import { LogoutOutlined, WarningAmberRounded } from '@mui/icons-material'

export default function LogoutButton({ styles }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleCancel = () => setOpen(false)
  const handleLogout = () => {
    setOpen(false)
    navigate('/login')
  }

  return (
    <>
      {/* ── Logout Nav Item ── */}
      <Box sx={styles?.navItem} onClick={handleOpen}>
        <LogoutOutlined sx={{ color: 'error.main', fontSize: 20 }} />
        <Typography variant="body2" color="error.main">
          Logout
        </Typography>
      </Box>

      {/* ── Confirmation Dialog ── */}
      <Dialog
        open={open}
        onClose={handleCancel}
        PaperProps={{
          sx: {
            borderRadius: 3,
            width: 360,
            px: 1,
            py: 0.5,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            pt: 3,
            pb: 1,
            fontWeight: 700,
            fontSize: '1.1rem',
          }}
        >
          <WarningAmberRounded sx={{ color: 'warning.main', fontSize: 26 }} />
          Log out of your account?
        </DialogTitle>

        <DialogContent sx={{ pb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            You will be logged out of your account. Any unsaved changes will be
            lost.
          </Typography>
        </DialogContent>

        <Divider sx={{ mx: 2, mb: 1 }} />

        <DialogActions sx={{ px: 2, pb: 2.5, gap: 1 }}>
          {/* Cancel Button */}
          <Button
            fullWidth
            variant="outlined"
            onClick={handleCancel}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              py: 1,
            }}
          >
            Cancel
          </Button>

          {/* Confirm Logout Button */}
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              py: 1,
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
