import { Box, Container, Typography, Button } from '@mui/material'
import Navbar from '../../navbar/navbar'
import { styles } from './emptyCart.Styles'

export function EmptyCart({ onBrowse }) {
  return (
    <Box>
      <Navbar />
      <Container maxWidth="sm" sx={styles.container}>
        <Typography variant="h5" fontWeight={700} sx={styles.heading}>
          Your cart is empty
        </Typography>
        <Button variant="contained" onClick={onBrowse}>
          Browse Products
        </Button>
      </Container>
    </Box>
  )
}
