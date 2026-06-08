import { useContext } from 'react'
import { Box, Container, Typography, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/cartContext'
import Navbar from '../../components/navbar/navbar'
import { EmptyCart, CartItem, CartSummary } from '../../components/cart'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQty, clearCart } =
    useContext(CartContext)
  const navigate = useNavigate()

  const total = cartItems.reduce(
    (sum, i) => sum + (i.price || 0) * (i.qty || 1),
    0
  )

  if (cartItems.length === 0) {
    return <EmptyCart onBrowse={() => navigate('/products')} />
  }

  return (
    <Box>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          Your Cart
        </Typography>
        <Stack spacing={2}>
          {cartItems.map((item) => (
            <CartItem
              key={item._id || item.id}
              item={item}
              onUpdateQty={updateQty}
              onRemove={removeFromCart}
            />
          ))}
        </Stack>
        <CartSummary
          total={total}
          onClear={clearCart}
          onCheckout={() => navigate('/checkout')}
        />
      </Container>
    </Box>
  )
}
