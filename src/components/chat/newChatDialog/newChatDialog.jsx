import { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import * as S from './newChatDialog.styles'

export default function NewChatDialog({ open, onClose, onStart, isLoading }) {
  const [recipientId, setRecipientId] = useState('')

  const handleStart = () => {
    if (!recipientId.trim()) return
    onStart({ recipientId: recipientId.trim() })
  }

  const handleClose = () => {
    setRecipientId('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} sx={S.newChatDialog}>
      <Box sx={S.newChatDialogHeader}>
        <Typography variant="h6" fontWeight={700}>
          New Conversation
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <Close fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Enter the user ID of the seller or service provider you want to
          contact.
        </Typography>
        <TextField
          fullWidth
          label="Recipient User ID"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          placeholder="e.g. 64ab12cd…"
          size="small"
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button variant="outlined" onClick={handleClose} sx={{ flex: 1 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleStart}
          disabled={!recipientId.trim() || isLoading}
          sx={{ flex: 1 }}
        >
          {isLoading ? 'Starting…' : 'Start Chat'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
