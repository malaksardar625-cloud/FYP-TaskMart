import {
  Box,
  Stack,
  Typography,
  IconButton,
  Button,
  Avatar,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Drawer,
} from '@mui/material'
import { ShoppingCart, Close, Add, Remove, Delete } from '@mui/icons-material'
import * as S from './FloatingCart.styles'

export function FloatingCart({ cart, setCart, open, setOpen }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const count = cart.reduce((sum, item) => sum + item.qty, 0)

  const updateQty = (id, delta) =>
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    )

  const handleDecrement = (e) =>
    updateQty(Number(e.currentTarget.dataset.id), -1)
  const handleIncrement = (e) =>
    updateQty(Number(e.currentTarget.dataset.id), 1)
  const handleRemove = (e) => {
    const id = Number(e.currentTarget.dataset.id)
    const item = cart.find((i) => i.id === id)
    if (item) updateQty(id, -item.qty)
  }
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Box sx={S.cartFabWrapper}>
        <Badge
          badgeContent={count}
          color="error"
          overlap="circular"
          sx={{ '& .MuiBadge-badge': { fontSize: '0.75rem', fontWeight: 700 } }}
        >
          <IconButton onClick={handleOpen} sx={S.cartFabBtn}>
            <ShoppingCart />
          </IconButton>
        </Badge>
      </Box>

      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: S.cartDrawerPaper }}
      >
        <Box sx={S.cartInner}>
          <Stack sx={S.cartHeader}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              🛒 Your Cart
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Stack>
          <Divider />

          {cart.length === 0 ? (
            <Box sx={S.cartEmpty}>
              <ShoppingCart sx={S.cartEmptyIcon} />
              <Typography>Your cart is empty</Typography>
            </Box>
          ) : (
            <List sx={{ flex: 1, overflowY: 'auto' }}>
              {cart.map((item) => (
                <ListItem
                  key={item.id}
                  alignItems="flex-start"
                  sx={S.cartListItem}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={item.image}
                      variant="rounded"
                      sx={{ width: 56, height: 56, mr: 1 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 0.5 }}
                      >
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <Stack
                        sx={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 1,
                          mt: 0.5,
                        }}
                      >
                        <IconButton
                          size="small"
                          data-id={item.id}
                          onClick={handleDecrement}
                          sx={S.cartQtyBtn}
                        >
                          <Remove sx={{ fontSize: 14 }} />
                        </IconButton>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {item.qty}
                        </Typography>
                        <IconButton
                          size="small"
                          data-id={item.id}
                          onClick={handleIncrement}
                          sx={S.cartQtyBtn}
                        >
                          <Add sx={{ fontSize: 14 }} />
                        </IconButton>
                        <Typography variant="body2" sx={S.cartItemPrice}>
                          PKR {(item.price * item.qty).toLocaleString()}
                        </Typography>
                      </Stack>
                    }
                  />
                  <IconButton
                    size="small"
                    data-id={item.id}
                    onClick={handleRemove}
                    sx={S.cartRemoveBtn}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}

          {cart.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Divider sx={{ mb: 2 }} />
              <Stack sx={S.cartTotalRow}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" sx={S.cartTotalValue}>
                  PKR {total.toLocaleString()}
                </Typography>
              </Stack>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ py: 1.5 }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  )
}
