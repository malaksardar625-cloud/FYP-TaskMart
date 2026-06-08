import { Stack, Typography, Button, Divider } from '@mui/material'
import { styles } from './cartSummary.Styles'

export function CartSummary({ total, onClear, onCheckout }) {
  return (
    <>
      <Divider sx={styles.divider} />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={700}>
          Total: PKR {total.toLocaleString()}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={onClear}>
            Clear Cart
          </Button>
          <Button variant="contained" size="large" onClick={onCheckout}>
            Proceed to Checkout
          </Button>
        </Stack>
      </Stack>
    </>
  )
}
