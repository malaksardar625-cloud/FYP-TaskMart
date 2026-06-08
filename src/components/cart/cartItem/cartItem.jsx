import { Box, Paper, Stack, Typography, IconButton } from '@mui/material'
import { Add, Remove, Delete } from '@mui/icons-material'
import { styles } from './cartItem.Styles'

export function CartItem({ item, onUpdateQty, onRemove }) {
  const id = item._id || item.id
  const qty = item.qty || 1

  return (
    <Paper elevation={0} sx={styles.paper}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          component="img"
          src={item.image || item.images?.[0] || ''}
          alt={item.name}
          sx={styles.image}
        />
        <Box flex={1}>
          <Typography fontWeight={600}>{item.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            PKR {item.price?.toLocaleString()}
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton size="small" onClick={() => onUpdateQty(id, qty - 1)}>
            <Remove fontSize="small" />
          </IconButton>
          <Typography>{qty}</Typography>
          <IconButton size="small" onClick={() => onUpdateQty(id, qty + 1)}>
            <Add fontSize="small" />
          </IconButton>
        </Stack>
        <Typography fontWeight={700}>
          PKR {((item.price || 0) * qty).toLocaleString()}
        </Typography>
        <IconButton onClick={() => onRemove(id)} color="error">
          <Delete />
        </IconButton>
      </Stack>
    </Paper>
  )
}
